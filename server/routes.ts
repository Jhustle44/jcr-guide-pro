import type { Express, RequestHandler } from "express";
import { createServer, type Server } from "http";
import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";
import { storage } from "./storage";
import { insertRepairGuideSchema, insertTroubleshootingFlowSchema, insertDeviceComponentSchema, insertFavoriteSchema } from "@shared/schema";
import { TECHNICAL_MANUALS, getManualById, getManualsByCategory } from "../shared/technical-manuals";
import { requireAdmin } from "./middleware/adminAuth";
import { isAuthenticated } from "./auth";
import { upload } from "./middleware/upload";
import { runAIDiagnostics, runTechnicalAIChat, type DiagnosticsRequest, type TechnicalChatRequest } from "./ai-diagnostics";

export async function registerRoutes(app: Express): Promise<Server> {
  // System Health & Version Connectivity Check Endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "online",
      version: "2026.4.2",
      guidesCount: 624,
      manualsCount: TECHNICAL_MANUALS.length,
      timestamp: new Date().toISOString()
    });
  });

  app.get("/api/version", (_req, res) => {
    res.json({
      version: "2026.4.2",
      status: "operational",
      mode: process.env.NODE_ENV || "development",
      features: {
        aiAssistant: true,
        offlineSync: true,
        totalGuides: 624,
        totalManuals: 8
      }
    });
  });

  // Technical Manuals Endpoints
  app.get("/api/technical-manuals", (req, res) => {
    try {
      res.setHeader("Cache-Control", "public, max-age=120, stale-while-revalidate=600");
      const { category } = req.query;
      if (category && typeof category === "string") {
        return res.json(getManualsByCategory(category));
      }
      res.json(TECHNICAL_MANUALS);
    } catch (error) {
      console.error("Error fetching technical manuals:", error);
      res.status(500).json({ message: "Failed to fetch technical manuals" });
    }
  });

  app.get("/api/technical-manuals/:id", (req, res) => {
    try {
      const { id } = req.params;
      const manual = getManualById(id);
      if (!manual) {
        return res.status(404).json({ message: "Technical manual not found" });
      }
      res.json(manual);
    } catch (error) {
      console.error("Error fetching manual by id:", error);
      res.status(500).json({ message: "Failed to fetch technical manual" });
    }
  });

  // Technical AI Conversational Chat Endpoint (Grounding in 624 Guides & Manuals)
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { messages, deviceContext, categoryContext } = req.body;
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ message: "Valid messages array is required." });
      }

      const chatPayload: TechnicalChatRequest = {
        messages,
        deviceContext,
        categoryContext
      };

      const reply = await runTechnicalAIChat(chatPayload);
      res.json(reply);
    } catch (error) {
      console.error("Technical AI Chat Error:", error);
      res.status(500).json({ message: "An unexpected error occurred during AI chat." });
    }
  });

  // AI Diagnostics Assistant Endpoint
  app.post("/api/ai/troubleshoot", async (req, res) => {
    try {
      const { symptoms, deviceType, brand, model, os, category, errorCode } = req.body;
      if (!symptoms || typeof symptoms !== "string" || symptoms.trim().length === 0) {
        return res.status(400).json({ message: "Symptoms or issue description is required." });
      }

      const diagnosticPayload: DiagnosticsRequest = {
        symptoms: symptoms.trim(),
        deviceType: deviceType || "all",
        brand: brand || "",
        model: model || "",
        os: os || "",
        category: category || "all",
        errorCode: errorCode || ""
      };

      const result = await runAIDiagnostics(diagnosticPayload);
      res.json(result);
    } catch (error) {
      console.error("AI Diagnostics Endpoint Error:", error);
      res.status(500).json({ message: "An unexpected error occurred during diagnostics." });
    }
  });

  // Auth & Profile routes
  app.get('/api/auth/user', isAuthenticated, (req, res) => {
    res.json(req.user);
  });

  app.patch('/api/user/profile', isAuthenticated, async (req, res) => {
    try {
      const updatedUser = await storage.updateUser(req.user!.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  app.post('/api/user/profile/photo', isAuthenticated, upload.single('photo'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const photoUrl = `/uploads/profiles/${req.file.filename}`;
      const updatedUser = await storage.updateUser(req.user!.id, { profileImageUrl: photoUrl });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to upload photo" });
    }
  });

  // Favorites routes
  app.get('/api/favorites', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const favorites = await storage.getUserFavorites(userId);
      res.json(favorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });

  app.post('/api/favorites', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const favoriteData = insertFavoriteSchema.parse(req.body);
      const favorite = await storage.addToFavorites(userId, favoriteData);
      res.json(favorite);
    } catch (error) {
      console.error("Error adding favorite:", error);
      res.status(500).json({ message: "Failed to add favorite" });
    }
  });

  app.delete('/api/favorites/:itemId/:itemType', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const { itemId, itemType } = req.params;
      await storage.removeFromFavorites(userId, itemId, itemType);
      res.json({ success: true });
    } catch (error) {
      console.error("Error removing favorite:", error);
      res.status(500).json({ message: "Failed to remove favorite" });
    }
  });

  app.get('/api/favorites/check/:itemId/:itemType', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const { itemId, itemType } = req.params;
      const isFavorited = await storage.isFavorited(userId, itemId, itemType);
      res.json({ isFavorited });
    } catch (error) {
      console.error("Error checking favorite:", error);
      res.status(500).json({ message: "Failed to check favorite status" });
    }
  });
  // Repair Guides
  app.get("/api/repair-guides", async (req, res) => {
    try {
      res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
      const { deviceType, category, difficulty } = req.query;
      const guides = await storage.getRepairGuides({
        deviceType: deviceType as string,
        category: category as string,
        difficulty: difficulty as string,
      });
      res.json(guides);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch repair guides" });
    }
  });

  app.get("/api/repair-guides/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ message: "Search query is required" });
      }
      const guides = await storage.searchRepairGuides(q);
      res.json(guides);
    } catch (error) {
      res.status(500).json({ message: "Failed to search repair guides" });
    }
  });

  app.get("/api/repair-guides/:id", async (req, res) => {
    try {
      const guide = await storage.getRepairGuide(req.params.id);
      if (!guide) {
        return res.status(404).json({ message: "Repair guide not found" });
      }
      // Increment view count when guide is viewed
      await storage.updateViewCount(req.params.id);
      res.json(guide);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch repair guide" });
    }
  });

  app.post("/api/repair-guides", async (req, res) => {
    try {
      const validatedData = insertRepairGuideSchema.parse(req.body);
      const guide = await storage.createRepairGuide(validatedData);
      res.status(201).json(guide);
    } catch (error) {
      res.status(400).json({ message: "Invalid repair guide data" });
    }
  });

  // User-created guides endpoint
  app.post("/api/user-guides", async (req, res) => {
    try {
      const validatedData = insertRepairGuideSchema.parse(req.body);
      const guide = await storage.createUserGuide(validatedData);
      res.status(201).json(guide);
    } catch (error) {
      console.error("Error creating user guide:", error);
      res.status(400).json({ message: "Invalid user guide data" });
    }
  });

  // Track download for a specific guide
  app.post("/api/repair-guides/:id/download", async (req, res) => {
    try {
      const guide = await storage.getRepairGuide(req.params.id);
      if (!guide) {
        return res.status(404).json({ message: "Repair guide not found" });
      }
      // Increment download count when guide is downloaded
      await storage.updateDownloadCount(req.params.id);
      res.json({ success: true, message: "Download tracked" });
    } catch (error) {
      res.status(500).json({ message: "Failed to track download" });
    }
  });

  // Version endpoint
  app.get("/api/version", async (req, res) => {
    try {
      const versionInfo = {
        version: "1.0.0",
        name: "JCR Guide Pro",
        build: "2025.08.18",
        release: "Major Release"
      };
      res.json(versionInfo);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch version info" });
    }
  });

  // Admin routes
  app.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      res.json({ message: "Admin access confirmed", adminEmail: req.adminUser?.email });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch admin data" });
    }
  });

  app.get("/api/admin/stats", requireAdmin, async (req, res) => {
    try {
      const guides = await storage.getRepairGuides();
      const totalViews = guides.reduce((sum, guide) => sum + (guide.viewCount || 0), 0);
      const totalDownloads = guides.reduce((sum, guide) => sum + (guide.downloadCount || 0), 0);
      
      res.json({
        totalGuides: guides.length,
        totalViews,
        totalDownloads,
        adminUser: req.adminUser?.email
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch admin stats" });
    }
  });

  // Bulk download endpoint
  app.post("/api/download/bulk", async (req, res) => {
    try {
      const { type, filters } = req.body;
      let data: any[] = [];

      switch (type) {
        case 'repair-guides':
          data = await storage.getRepairGuides(filters || {});
          break;
        case 'troubleshooting-flows':
          data = await storage.getTroubleshootingFlows();
          break;
        case 'device-components':
          data = await storage.getDeviceComponents();
          break;
        case 'complete':
          const [guides, flows, components] = await Promise.all([
            storage.getRepairGuides({}),
            storage.getTroubleshootingFlows(),
            storage.getDeviceComponents()
          ]);
          const exportData = {
            exportInfo: {
              title: 'JCR Guide Pro Complete Export',
              version: '1.0',
              exportedAt: new Date().toISOString(),
              totalItems: guides.length + flows.length + components.length
            },
            repairGuides: guides,
            troubleshootingFlows: flows,
            deviceComponents: components
          };
          data = exportData as any;
          break;
        default:
          return res.status(400).json({ message: "Invalid download type" });
      }

      res.json({
        success: true,
        data,
        count: Array.isArray(data) ? data.length : Object.keys(data).length - 1,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Bulk download error:", error);
      res.status(500).json({ message: "Failed to prepare bulk download" });
    }
  });

  app.patch("/api/repair-guides/:id/bookmark", async (req, res) => {
    try {
      const guide = await storage.toggleBookmark(req.params.id);
      if (!guide) {
        return res.status(404).json({ message: "Repair guide not found" });
      }
      res.json(guide);
    } catch (error) {
      res.status(500).json({ message: "Failed to toggle bookmark" });
    }
  });

  // Troubleshooting Flows
  app.get("/api/troubleshooting-flows", async (req, res) => {
    try {
      const flows = await storage.getTroubleshootingFlows();
      res.json(flows);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch troubleshooting flows" });
    }
  });

  app.get("/api/troubleshooting-flows/:id", async (req, res) => {
    try {
      const flow = await storage.getTroubleshootingFlow(req.params.id);
      if (!flow) {
        return res.status(404).json({ message: "Troubleshooting flow not found" });
      }
      res.json(flow);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch troubleshooting flow" });
    }
  });

  app.post("/api/troubleshooting-flows", async (req, res) => {
    try {
      const validatedData = insertTroubleshootingFlowSchema.parse(req.body);
      const flow = await storage.createTroubleshootingFlow(validatedData);
      res.status(201).json(flow);
    } catch (error) {
      res.status(400).json({ message: "Invalid troubleshooting flow data" });
    }
  });

  // Device Components
  app.get("/api/device-components", async (req, res) => {
    try {
      const { deviceType } = req.query;
      const components = await storage.getDeviceComponents(deviceType as string);
      res.json(components);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch device components" });
    }
  });

  app.get("/api/device-components/:id", async (req, res) => {
    try {
      const component = await storage.getDeviceComponent(req.params.id);
      if (!component) {
        return res.status(404).json({ message: "Device component not found" });
      }
      res.json(component);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch device component" });
    }
  });

  app.post("/api/device-components", async (req, res) => {
    try {
      const validatedData = insertDeviceComponentSchema.parse(req.body);
      const component = await storage.createDeviceComponent(validatedData);
      res.status(201).json(component);
    } catch (error) {
      res.status(400).json({ message: "Invalid device component data" });
    }
  });

  // Device Brands routes
  app.get("/api/device-brands", async (req, res) => {
    try {
      const { deviceType } = req.query;
      const brands = await storage.getDeviceBrands(deviceType as string);
      res.json(brands);
    } catch (error) {
      console.error("Error fetching device brands:", error);
      res.status(500).json({ message: "Failed to fetch device brands" });
    }
  });

  // Device Models routes
  app.get("/api/device-models", async (req, res) => {
    try {
      const { brandId, deviceType, search } = req.query;
      
      if (search) {
        const models = await storage.searchDeviceModels(search as string, deviceType as string);
        res.json(models);
      } else {
        const models = await storage.getDeviceModels(brandId as string, deviceType as string);
        res.json(models);
      }
    } catch (error) {
      console.error("Error fetching device models:", error);
      res.status(500).json({ message: "Failed to fetch device models" });
    }
  });

  app.get("/api/device-models/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const model = await storage.getDeviceModel(id);
      if (!model) {
        return res.status(404).json({ message: "Device model not found" });
      }
      res.json(model);
    } catch (error) {
      console.error("Error fetching device model:", error);
      res.status(500).json({ message: "Failed to fetch device model" });
    }
  });

  app.get("/api/brands/:brandId/models", async (req, res) => {
    try {
      const { brandId } = req.params;
      const models = await storage.getModelsByBrand(brandId);
      res.json(models);
    } catch (error) {
      console.error("Error fetching models by brand:", error);
      res.status(500).json({ message: "Failed to fetch models by brand" });
    }
  });

  // Guide Compatibility routes
  app.get("/api/models/:modelId/guides", async (req, res) => {
    try {
      const { modelId } = req.params;
      const guides = await storage.getCompatibleGuides(modelId);
      res.json(guides);
    } catch (error) {
      console.error("Error fetching compatible guides:", error);
      res.status(500).json({ message: "Failed to fetch compatible guides" });
    }
  });

  app.get("/api/guides/:guideId/models", async (req, res) => {
    try {
      const { guideId } = req.params;
      const models = await storage.getModelCompatibility(guideId);
      res.json(models);
    } catch (error) {
      console.error("Error fetching model compatibility:", error);
      res.status(500).json({ message: "Failed to fetch model compatibility" });
    }
  });

  // Digital Asset Links for TWA
  app.get("/.well-known/assetlinks.json", (req, res) => {
    res.json([{
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "com.jcrguidepro.app",
        sha256_cert_fingerprints: ["73:8B:D2:DB:FC:57:4D:5B:F1:A5:28:C5:01:B6:17:C7:7F:80:74:EE:B5:FD:0C:DB:12:CE:03:C8:35:D3:08:BE"]
      }
    }]);
  });

  // Dynamic ZIP Exporter for Android Studio & Offline Project Bundle
  app.get(["/api/export-android-zip", "/api/export-zip", "/api/download/android-studio-zip"], (_req, res) => {
    try {
      const filename = "JCR-Guide-Pro-Android-Studio.zip";
      const prebuiltPath = path.join(process.cwd(), "public", "JCR-Guide-Pro-Android-Studio.zip");

      if (fs.existsSync(prebuiltPath)) {
        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        return res.sendFile(prebuiltPath);
      }

      // Generate on-the-fly if prebuilt is not found
      const zip = new AdmZip();
      const rootDir = process.cwd();

      // Folders to include in the Android Studio & project export
      const foldersToInclude = ["android", "src", "shared", "server"];
      foldersToInclude.forEach((folder) => {
        const folderPath = path.join(rootDir, folder);
        if (fs.existsSync(folderPath)) {
          zip.addLocalFolder(folderPath, folder);
        }
      });

      // Include public assets (excluding zip files)
      const pubDir = path.join(rootDir, "public");
      if (fs.existsSync(pubDir)) {
        fs.readdirSync(pubDir).forEach((f) => {
          if (!f.endsWith(".zip")) {
            const full = path.join(pubDir, f);
            if (fs.statSync(full).isDirectory()) {
              zip.addLocalFolder(full, `public/${f}`);
            } else {
              zip.addLocalFile(full, "public");
            }
          }
        });
      }

      // Essential root configuration files
      const filesToInclude = [
        "package.json",
        "tsconfig.json",
        "vite.config.ts",
        "capacitor.config.json",
        "index.html",
        "README.md",
        "metadata.json",
        ".env.example"
      ];

      filesToInclude.forEach((file) => {
        const filePath = path.join(rootDir, file);
        if (fs.existsSync(filePath)) {
          zip.addLocalFile(filePath);
        }
      });

      const zipBuffer = zip.toBuffer();
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Length", zipBuffer.length.toString());
      res.send(zipBuffer);
    } catch (error) {
      console.error("Export ZIP route error:", error);
      if (!res.headersSent) {
        res.status(500).json({ message: "Could not create zip archive" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
