import {
  repairGuides,
  troubleshootingFlows,
  deviceComponents,
  users,
  favorites,
  deviceBrands,
  deviceModels,
  guideCompatibility,
  type RepairGuide,
  type InsertRepairGuide,
  type TroubleshootingFlow,
  type InsertTroubleshootingFlow,
  type DeviceComponent,
  type InsertDeviceComponent,
  type User,
  type InsertUser,
  type Favorite,
  type InsertFavorite,
  type DeviceBrand,
  type InsertDeviceBrand,
  type DeviceModel,
  type InsertDeviceModel,
  type GuideCompatibility,
  type InsertGuideCompatibility,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, like, or, sql } from "drizzle-orm";
import bcrypt from "bcrypt";
import { comprehensiveRepairGuides, comprehensiveTroubleshootingFlows, comprehensiveDeviceComponents } from "./seed-data";
import { generateAllComprehensiveGuides } from "./seed-guides";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<User>): Promise<User | undefined>;

  // Favorites operations
  getUserFavorites(userId: string): Promise<Favorite[]>;
  addToFavorites(userId: string, favorite: InsertFavorite): Promise<Favorite>;
  removeFromFavorites(userId: string, itemId: string, itemType: string): Promise<void>;
  isFavorited(userId: string, itemId: string, itemType: string): Promise<boolean>;

  // Repair Guides
  getRepairGuides(filters?: { deviceType?: string; category?: string; difficulty?: string }): Promise<RepairGuide[]>;
  getRepairGuide(id: string): Promise<RepairGuide | undefined>;
  createRepairGuide(guide: InsertRepairGuide): Promise<RepairGuide>;
  updateViewCount(id: string): Promise<void>;
  updateDownloadCount(id: string): Promise<void>;
  toggleBookmark(id: string): Promise<RepairGuide | undefined>;
  searchRepairGuides(query: string): Promise<RepairGuide[]>;

  // Troubleshooting Flows
  getTroubleshootingFlows(): Promise<TroubleshootingFlow[]>;
  getTroubleshootingFlow(id: string): Promise<TroubleshootingFlow | undefined>;
  createTroubleshootingFlow(flow: InsertTroubleshootingFlow): Promise<TroubleshootingFlow>;

  // Device Components
  getDeviceComponents(deviceType?: string): Promise<DeviceComponent[]>;
  getDeviceComponent(id: string): Promise<DeviceComponent | undefined>;
  createDeviceComponent(component: InsertDeviceComponent): Promise<DeviceComponent>;

  // Device Brands and Models
  getDeviceBrands(deviceType?: string): Promise<DeviceBrand[]>;
  getDeviceModels(brandId?: string, deviceType?: string): Promise<DeviceModel[]>;
  getDeviceModel(id: string): Promise<DeviceModel | undefined>;
  getModelsByBrand(brandId: string): Promise<DeviceModel[]>;
  searchDeviceModels(query: string, deviceType?: string): Promise<DeviceModel[]>;
  
  // Guide Compatibility
  getCompatibleGuides(modelId: string): Promise<RepairGuide[]>;
  getModelCompatibility(guideId: string): Promise<DeviceModel[]>;
  
  // User guide creation
  createUserGuide(guide: InsertRepairGuide): Promise<RepairGuide>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    if (!db) return undefined;
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    if (!db || !email) return undefined;
    const normalized = email.trim().toLowerCase();
    const [user] = await db.select().from(users).where(sql`lower(${users.email}) = ${normalized}`);
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    if (!db) throw new Error("No database");
    const [user] = await db.insert(users).values({
      ...userData,
      email: (userData.email || "").trim().toLowerCase()
    }).returning();
    return user;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | undefined> {
    if (!db) return undefined;
    const [user] = await db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getUserFavorites(userId: string): Promise<Favorite[]> {
    if (!db) return [];
    return await db.select().from(favorites).where(eq(favorites.userId, userId));
  }

  async addToFavorites(userId: string, favorite: InsertFavorite): Promise<Favorite> {
    if (!db) throw new Error("No database");
    const [newFavorite] = await db
      .insert(favorites)
      .values({ ...favorite, userId })
      .returning();
    return newFavorite;
  }

  async removeFromFavorites(userId: string, itemId: string, itemType: string): Promise<void> {
    if (!db) return;
    await db
      .delete(favorites)
      .where(
        and(
          eq(favorites.userId, userId),
          eq(favorites.itemId, itemId),
          eq(favorites.itemType, itemType)
        )
      );
  }

  async isFavorited(userId: string, itemId: string, itemType: string): Promise<boolean> {
    if (!db) return false;
    const [favorite] = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.userId, userId),
          eq(favorites.itemId, itemId),
          eq(favorites.itemType, itemType)
        )
      );
    return !!favorite;
  }

  async getRepairGuides(filters?: { deviceType?: string; category?: string; difficulty?: string }): Promise<RepairGuide[]> {
    if (!db) return [];
    const conditions = [];
    if (filters?.deviceType) {
      conditions.push(eq(repairGuides.deviceType, filters.deviceType));
    }
    if (filters?.category) {
      conditions.push(eq(repairGuides.category, filters.category));
    }
    if (filters?.difficulty) {
      conditions.push(eq(repairGuides.difficulty, filters.difficulty));
    }
    
    if (conditions.length > 0) {
      return await db.select().from(repairGuides).where(and(...conditions));
    }
    return await db.select().from(repairGuides);
  }

  async getRepairGuide(id: string): Promise<RepairGuide | undefined> {
    if (!db) return undefined;
    const [guide] = await db.select().from(repairGuides).where(eq(repairGuides.id, id));
    return guide;
  }

  async createRepairGuide(guide: InsertRepairGuide): Promise<RepairGuide> {
    if (!db) throw new Error("No database");
    const [newGuide] = await db.insert(repairGuides).values(guide).returning();
    return newGuide;
  }

  async updateViewCount(id: string): Promise<void> {
    if (!db) return;
    await db
      .update(repairGuides)
      .set({ viewCount: sql`${repairGuides.viewCount} + 1` })
      .where(eq(repairGuides.id, id));
  }

  async updateDownloadCount(id: string): Promise<void> {
    if (!db) return;
    await db
      .update(repairGuides)
      .set({ downloadCount: sql`${repairGuides.downloadCount} + 1` })
      .where(eq(repairGuides.id, id));
  }

  async toggleBookmark(id: string): Promise<RepairGuide | undefined> {
    if (!db) return undefined;
    const [guide] = await db
      .update(repairGuides)
      .set({ isBookmarked: sql`NOT ${repairGuides.isBookmarked}` })
      .where(eq(repairGuides.id, id))
      .returning();
    return guide;
  }

  async searchRepairGuides(query: string): Promise<RepairGuide[]> {
    if (!db) return [];
    const searchTerm = `%${query.toLowerCase()}%`;
    return await db
      .select()
      .from(repairGuides)
      .where(
        or(
          like(repairGuides.title, searchTerm),
          like(repairGuides.description, searchTerm),
          like(repairGuides.category, searchTerm)
        )
      );
  }

  async getTroubleshootingFlows(): Promise<TroubleshootingFlow[]> {
    if (!db) return [];
    return await db.select().from(troubleshootingFlows);
  }

  async getTroubleshootingFlow(id: string): Promise<TroubleshootingFlow | undefined> {
    if (!db) return undefined;
    const [flow] = await db.select().from(troubleshootingFlows).where(eq(troubleshootingFlows.id, id));
    return flow;
  }

  async createTroubleshootingFlow(flow: InsertTroubleshootingFlow): Promise<TroubleshootingFlow> {
    if (!db) throw new Error("No database");
    const [newFlow] = await db.insert(troubleshootingFlows).values(flow).returning();
    return newFlow;
  }

  async getDeviceComponents(deviceType?: string): Promise<DeviceComponent[]> {
    if (!db) return [];
    if (deviceType) {
      return await db.select().from(deviceComponents).where(eq(deviceComponents.deviceType, deviceType));
    }
    return await db.select().from(deviceComponents);
  }

  async getDeviceComponent(id: string): Promise<DeviceComponent | undefined> {
    if (!db) return undefined;
    const [component] = await db.select().from(deviceComponents).where(eq(deviceComponents.id, id));
    return component;
  }

  async createDeviceComponent(component: InsertDeviceComponent): Promise<DeviceComponent> {
    if (!db) throw new Error("No database");
    const [newComponent] = await db.insert(deviceComponents).values(component).returning();
    return newComponent;
  }

  async getDeviceBrands(deviceType?: string): Promise<DeviceBrand[]> {
    if (!db) return [];
    const query = db.select().from(deviceBrands);
    if (deviceType) {
      return await query.where(eq(deviceBrands.deviceType, deviceType)).orderBy(sql`${deviceBrands.popularity} DESC`);
    }
    return await query.orderBy(sql`${deviceBrands.popularity} DESC`);
  }

  async getDeviceModels(brandId?: string, deviceType?: string): Promise<DeviceModel[]> {
    if (!db) return [];
    if (brandId) {
      return await db.select().from(deviceModels).where(eq(deviceModels.brandId, brandId)).orderBy(sql`${deviceModels.year} DESC, ${deviceModels.name} ASC`);
    }
    return await db.select().from(deviceModels).orderBy(sql`${deviceModels.year} DESC, ${deviceModels.name} ASC`);
  }

  async getDeviceModel(id: string): Promise<DeviceModel | undefined> {
    if (!db) return undefined;
    const [model] = await db.select().from(deviceModels).where(eq(deviceModels.id, id));
    return model;
  }

  async getModelsByBrand(brandId: string): Promise<DeviceModel[]> {
    if (!db) return [];
    return await db.select()
      .from(deviceModels)
      .where(eq(deviceModels.brandId, brandId))
      .orderBy(sql`${deviceModels.year} DESC, ${deviceModels.name} ASC`);
  }

  async searchDeviceModels(query: string, deviceType?: string): Promise<DeviceModel[]> {
    if (!db) return [];
    return await db.select()
      .from(deviceModels)
      .where(
        or(
          like(deviceModels.name, `%${query}%`),
          like(deviceModels.series, `%${query}%`)
        )
      )
      .orderBy(sql`${deviceModels.guideCount} DESC`);
  }

  async getCompatibleGuides(modelId: string): Promise<RepairGuide[]> {
    if (!db) return [];
    return await db.select()
      .from(repairGuides)
      .where(sql`id IN (SELECT guide_id FROM guide_compatibility WHERE model_id = ${modelId} AND compatibility = 'compatible')`)
      .orderBy(sql`${repairGuides.viewCount} DESC`);
  }

  async getModelCompatibility(guideId: string): Promise<DeviceModel[]> {
    if (!db) return [];
    return await db.select()
      .from(deviceModels)
      .where(sql`id IN (SELECT model_id FROM guide_compatibility WHERE guide_id = ${guideId})`)
      .orderBy(sql`${deviceModels.name} ASC`);
  }

  async createUserGuide(guide: InsertRepairGuide): Promise<RepairGuide> {
    if (!db) throw new Error("No database");
    const [createdGuide] = await db
      .insert(repairGuides)
      .values(guide)
      .returning();
    return createdGuide;
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private favorites: Map<string, Favorite> = new Map();
  private repairGuides: Map<string, RepairGuide> = new Map();
  private troubleshootingFlows: Map<string, TroubleshootingFlow> = new Map();
  private deviceComponents: Map<string, DeviceComponent> = new Map();
  private deviceBrands: Map<string, DeviceBrand> = new Map();
  private deviceModels: Map<string, DeviceModel> = new Map();
  private guideCompatibility: Map<string, GuideCompatibility> = new Map();

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    // Seed comprehensive guides with start-to-finish intimate details
    const allGuides = generateAllComprehensiveGuides();
    allGuides.forEach((g, index) => {
      const id = `guide-${index + 1}`;
      this.repairGuides.set(id, {
        id,
        title: g.title,
        description: g.description,
        deviceType: g.deviceType,
        category: g.category,
        difficulty: g.difficulty,
        estimatedTime: g.estimatedTime,
        toolsRequired: g.toolsRequired,
        safetyWarnings: g.safetyWarnings,
        steps: g.steps,
        alternativeSolutions: g.alternativeSolutions || null,
        imageUrl: g.imageUrl,
        viewCount: Math.floor(Math.random() * 800) + 50,
        downloadCount: Math.floor(Math.random() * 200) + 10,
        isBookmarked: false,
      });
    });

    // Seed troubleshooting flows
    comprehensiveTroubleshootingFlows.forEach((f: any, index) => {
      const id = `flow-${index + 1}`;
      const { category, ...flowData } = f;
      this.troubleshootingFlows.set(id, {
        id,
        type: category,
        title: flowData.title,
        description: flowData.description,
        steps: flowData.steps.map((step: any) => ({
          id: `step-${step.stepNumber}`,
          question: step.description,
          answers: [{
            text: step.solutions?.join(', ') || "Check solutions",
            nextStepId: step.stepNumber < flowData.steps.length ? `step-${step.stepNumber + 1}` : undefined
          }]
        }))
      });
    });

    // Seed device components
    comprehensiveDeviceComponents.forEach((c: any, index) => {
      const id = `comp-${index + 1}`;
      this.deviceComponents.set(id, {
        id,
        name: c.name,
        description: c.description,
        deviceType: c.deviceType,
        category: c.componentType,
        safetyNotes: c.commonIssues || []
      });
    });

    // Seed Brands (Laptop & Desktop)
    const allBrands = [
      // Laptop Brands
      { id: "brand-apple-laptop", name: "Apple", deviceType: "laptop", logoUrl: "https://cdn.simpleicons.org/apple", supportLevel: "official", popularity: 99 },
      { id: "brand-dell-laptop", name: "Dell", deviceType: "laptop", logoUrl: "https://cdn.simpleicons.org/dell", supportLevel: "official", popularity: 96 },
      { id: "brand-lenovo-laptop", name: "Lenovo", deviceType: "laptop", logoUrl: "https://cdn.simpleicons.org/lenovo", supportLevel: "official", popularity: 95 },
      { id: "brand-hp-laptop", name: "HP", deviceType: "laptop", logoUrl: "https://cdn.simpleicons.org/hp", supportLevel: "official", popularity: 93 },
      { id: "brand-asus-laptop", name: "ASUS", deviceType: "laptop", logoUrl: "https://cdn.simpleicons.org/asus", supportLevel: "official", popularity: 90 },
      { id: "brand-acer-laptop", name: "Acer", deviceType: "laptop", logoUrl: "https://cdn.simpleicons.org/acer", supportLevel: "official", popularity: 84 },
      { id: "brand-msi-laptop", name: "MSI", deviceType: "laptop", logoUrl: "https://cdn.simpleicons.org/msi", supportLevel: "official", popularity: 86 },
      { id: "brand-razer-laptop", name: "Razer", deviceType: "laptop", logoUrl: "https://cdn.simpleicons.org/razer", supportLevel: "official", popularity: 87 },
      { id: "brand-microsoft-laptop", name: "Microsoft", deviceType: "laptop", logoUrl: "https://cdn.simpleicons.org/microsoft", supportLevel: "official", popularity: 88 },
      { id: "brand-samsung-laptop", name: "Samsung", deviceType: "laptop", logoUrl: "https://cdn.simpleicons.org/samsung", supportLevel: "official", popularity: 82 },
      { id: "brand-framework-laptop", name: "Framework", deviceType: "laptop", logoUrl: "https://cdn.simpleicons.org/framework", supportLevel: "official", popularity: 85 },
      { id: "brand-lg-laptop", name: "LG", deviceType: "laptop", logoUrl: "https://cdn.simpleicons.org/lg", supportLevel: "official", popularity: 78 },
      { id: "brand-gigabyte-laptop", name: "Gigabyte", deviceType: "laptop", logoUrl: "https://cdn.simpleicons.org/gigabyte", supportLevel: "community", popularity: 76 },

      // Desktop Brands & Form Factors
      { id: "brand-custom-desktop", name: "Custom Built PC", deviceType: "desktop", logoUrl: "https://cdn.simpleicons.org/pcgamingwiki", supportLevel: "official", popularity: 100 },
      { id: "brand-apple-desktop", name: "Apple", deviceType: "desktop", logoUrl: "https://cdn.simpleicons.org/apple", supportLevel: "official", popularity: 95 },
      { id: "brand-dell-desktop", name: "Dell", deviceType: "desktop", logoUrl: "https://cdn.simpleicons.org/dell", supportLevel: "official", popularity: 94 },
      { id: "brand-hp-desktop", name: "HP", deviceType: "desktop", logoUrl: "https://cdn.simpleicons.org/hp", supportLevel: "official", popularity: 91 },
      { id: "brand-lenovo-desktop", name: "Lenovo", deviceType: "desktop", logoUrl: "https://cdn.simpleicons.org/lenovo", supportLevel: "official", popularity: 89 },
      { id: "brand-asus-desktop", name: "ASUS", deviceType: "desktop", logoUrl: "https://cdn.simpleicons.org/asus", supportLevel: "official", popularity: 88 },
      { id: "brand-msi-desktop", name: "MSI", deviceType: "desktop", logoUrl: "https://cdn.simpleicons.org/msi", supportLevel: "official", popularity: 85 },
      { id: "brand-corsair-desktop", name: "Corsair & NZXT", deviceType: "desktop", logoUrl: "https://cdn.simpleicons.org/corsair", supportLevel: "official", popularity: 90 },
      { id: "brand-acer-desktop", name: "Acer", deviceType: "desktop", logoUrl: "https://cdn.simpleicons.org/acer", supportLevel: "community", popularity: 79 },
    ];

    allBrands.forEach(b => {
      this.deviceBrands.set(b.id, {
        ...b,
        createdAt: new Date()
      });
    });

    // Comprehensive Models across every major brand (70+ models)
    const allModels = [
      // APPLE LAPTOPS
      { id: "model-mbp-16-m3", brandId: "brand-apple-laptop", name: "MacBook Pro 16\" (M3 Pro / M3 Max)", series: "MacBook Pro", year: 2024, specifications: { cpu: "Apple M3 Max 16-Core", ram: "36GB-128GB Unified", storage: "512GB-8TB SSD", display: "16.2\" Liquid Retina XDR Mini-LED 120Hz" }, commonIssues: ["Display flex cable strain", "USB-C port wear", "Battery cycle depletion"], guideCount: 16 },
      { id: "model-mbp-14-m3", brandId: "brand-apple-laptop", name: "MacBook Pro 14\" (M3 / M3 Pro)", series: "MacBook Pro", year: 2023, specifications: { cpu: "Apple M3 Pro 12-Core", ram: "18GB-36GB Unified", storage: "512GB-4TB SSD", display: "14.2\" Liquid Retina XDR" }, commonIssues: ["Fan dust accumulation", "Trackpad haptic alignment", "MagSafe 3 port debris"], guideCount: 14 },
      { id: "model-mba-15-m3", brandId: "brand-apple-laptop", name: "MacBook Air 15\" (M3)", series: "MacBook Air", year: 2024, specifications: { cpu: "Apple M3 8-Core", ram: "16GB-24GB Unified", storage: "512GB SSD", display: "15.3\" Liquid Retina IPS" }, commonIssues: ["Passive thermal throttling under sustained load", "Keyboard keycap shine"], guideCount: 10 },
      { id: "model-mba-13-m2", brandId: "brand-apple-laptop", name: "MacBook Air 13\" (M2)", series: "MacBook Air", year: 2022, specifications: { cpu: "Apple M2 8-Core", ram: "8GB-16GB Unified", storage: "256GB-512GB SSD", display: "13.6\" Liquid Retina" }, commonIssues: ["Thermal pad modding", "Audio jack lint"], guideCount: 11 },
      { id: "model-mba-13-m1", brandId: "brand-apple-laptop", name: "MacBook Air 13\" (M1 Classic)", series: "MacBook Air", year: 2020, specifications: { cpu: "Apple M1 8-Core", ram: "8GB-16GB Unified", storage: "256GB-2TB SSD", display: "13.3\" Retina 2560x1600" }, commonIssues: ["Battery swelling", "Display flexgate repair", "Trackpad cable oxidation"], guideCount: 19 },
      { id: "model-mbp-13-intel", brandId: "brand-apple-laptop", name: "MacBook Pro 13\" (Intel Four Thunderbolt)", series: "MacBook Pro Legacy", year: 2020, specifications: { cpu: "Intel Core i5-1038NG7", ram: "16GB LPDDR4X", storage: "512GB SSD", display: "13.3\" Retina 2560x1600" }, commonIssues: ["Dual fan thermal paste degradation", "Butterfly/Magic keyboard replacement", "Battery swelling"], guideCount: 18 },
      { id: "model-mbp-15-retina", brandId: "brand-apple-laptop", name: "MacBook Pro 15\" Retina (Mid 2015 Legacy)", series: "MacBook Pro Legacy", year: 2015, specifications: { cpu: "Intel Core i7-4870HQ", ram: "16GB DDR3L", storage: "512GB Proprietary PCIe", display: "15.4\" Retina 2880x1800" }, commonIssues: ["Staingate anti-reflective coating delamination", "I/O board audio flex ribbon", "Battery pouch cell replacement"], guideCount: 22 },

      // DELL LAPTOPS
      { id: "model-dell-xps15-9530", brandId: "brand-dell-laptop", name: "XPS 15 9530", series: "XPS", year: 2023, specifications: { cpu: "Intel Core i7-13700H", ram: "32GB DDR5-4800 (Upgradeable)", storage: "1TB M.2 PCIe 4.0", display: "15.6\" 3.5K OLED Touch" }, commonIssues: ["Vapor chamber thermal paste drying", "Trackpad pre-travel rattle", "Battery health degradation"], guideCount: 19 },
      { id: "model-dell-xps13-plus", brandId: "brand-dell-laptop", name: "XPS 13 Plus 9320", series: "XPS", year: 2023, specifications: { cpu: "Intel Core i7-1360P", ram: "16GB LPDDR5", storage: "1TB NVMe", display: "13.4\" 4K UHD+ Touch" }, commonIssues: ["Capacitive function row responsiveness", "Zero-lattice keyboard ribbon seating"], guideCount: 12 },
      { id: "model-dell-xps16-9640", brandId: "brand-dell-laptop", name: "XPS 16 9640 (AI Series)", series: "XPS", year: 2024, specifications: { cpu: "Intel Core Ultra 9 185H", ram: "32GB-64GB LPDDR5x", storage: "2TB PCIe 4.0 NVMe", display: "16.3\" 4K+ OLED 90Hz" }, commonIssues: ["Seamless glass trackpad calibration", "Vapor chamber heatsink repaste", "Thunderbolt 4 port dock handshake"], guideCount: 15 },
      { id: "model-dell-lat-5440", brandId: "brand-dell-laptop", name: "Latitude 5440 Enterprise", series: "Latitude", year: 2024, specifications: { cpu: "Intel Core i5-1345U vPro", ram: "16GB DDR5 (2x SODIMM Slots)", storage: "512GB M.2 2230", display: "14.0\" FHD Non-Touch" }, commonIssues: ["SODIMM RAM upgrade", "M.2 2230 to 2280 bracket swap", "CMOS battery reset"], guideCount: 15 },
      { id: "model-dell-lat-7440", brandId: "brand-dell-laptop", name: "Latitude 7440 Ultralight", series: "Latitude", year: 2023, specifications: { cpu: "Intel Core i7-1365U vPro", ram: "16GB LPDDR5", storage: "512GB M.2 PCIe", display: "14.0\" 16:10 QHD+" }, commonIssues: ["Magnesium casing screw mounts", "Fingerprint reader daughterboard flex", "Wi-Fi 6E antenna clip"], guideCount: 14 },
      { id: "model-dell-prec-7780", brandId: "brand-dell-laptop", name: "Precision 7780 Mobile Workstation", series: "Precision Mobile", year: 2023, specifications: { cpu: "Intel Core i9-13950HX vPro", ram: "128GB CAMM / SODIMM DDR5", storage: "4x M.2 PCIe Gen4 NVMe (8TB)", gpu: "NVIDIA RTX 5000 Ada 16GB" }, commonIssues: ["CAMM memory module torque specs", "Vapor chamber thermal pad sizing", "SmartCard reader ribbon replacement"], guideCount: 21 },
      { id: "model-dell-alienware-m16", brandId: "brand-dell-laptop", name: "Alienware m16 R2 Gaming", series: "Alienware", year: 2024, specifications: { cpu: "Intel Core Ultra 7 155H", ram: "32GB DDR5 5600MHz", storage: "2TB Dual NVMe", display: "16\" QHD+ 240Hz" }, commonIssues: ["Element 31 liquid metal paste migration", "High-RPM fan cleaning", "DC-in barrel jack repair"], guideCount: 22 },
      { id: "model-dell-alienware-x14", brandId: "brand-dell-laptop", name: "Alienware x14 R2 Ultra-Slim", series: "Alienware", year: 2023, specifications: { cpu: "Intel Core i7-13620H", ram: "32GB LPDDR5", storage: "1TB M.2 2280", display: "14.0\" QHD+ 165Hz" }, commonIssues: ["Dual pull fan debris removal", "Type-C 130W GaN charging negotiation", "RGB Stadium lighting strip repair"], guideCount: 13 },
      { id: "model-dell-insp-15", brandId: "brand-dell-laptop", name: "Inspiron 15 3520", series: "Inspiron", year: 2023, specifications: { cpu: "Intel Core i5-1235U", ram: "8GB-16GB DDR4", storage: "512GB NVMe", display: "15.6\" 120Hz IPS" }, commonIssues: ["Hinge mounting plastic standoff rupture", "Keyboard membrane replacement", "SATA HDD to SSD migration"], guideCount: 17 },

      // LENOVO LAPTOPS
      { id: "model-lenovo-x1-c11", brandId: "brand-lenovo-laptop", name: "ThinkPad X1 Carbon Gen 11", series: "ThinkPad", year: 2023, specifications: { cpu: "Intel Core i7-1365U vPro", ram: "32GB LPDDR5", storage: "1TB PCIe Gen4 NVMe", display: "14.0\" 2.8K OLED" }, commonIssues: ["Fan dust filter de-clogging", "TrackPoint cap & click buttons replacement", "Wi-Fi 6E antenna routing"], guideCount: 20 },
      { id: "model-lenovo-x1-c12", brandId: "brand-lenovo-laptop", name: "ThinkPad X1 Carbon Gen 12", series: "ThinkPad", year: 2024, specifications: { cpu: "Intel Core Ultra 7 165H", ram: "32GB-64GB LPDDR5x", storage: "2TB Gen4 NVMe", display: "14.0\" 2.8K OLED 120Hz" }, commonIssues: ["Communications bar webcam flex", "Haptic TouchPad click engine reset", "Dual outlet fan cleaning"], guideCount: 16 },
      { id: "model-lenovo-t14-g4", brandId: "brand-lenovo-laptop", name: "ThinkPad T14 Gen 4 (AMD / Intel)", series: "ThinkPad", year: 2023, specifications: { cpu: "AMD Ryzen 7 PRO 7840U", ram: "32GB LPDDR5x", storage: "1TB M.2 2280", display: "14.0\" WUXGA Low Power" }, commonIssues: ["Modular keyboard replacement", "Internal 52.5Wh battery swap", "RJ45 Ethernet drop-jaw repair"], guideCount: 21 },
      { id: "model-lenovo-p16-g2", brandId: "brand-lenovo-laptop", name: "ThinkPad P16 Gen 2 Workstation", series: "ThinkPad Workstation", year: 2023, specifications: { cpu: "Intel Core i9-13980HX", ram: "128GB DDR5 ECC (4x Slots)", storage: "Dual M.2 Gen4 NVMe", gpu: "RTX 5000 Ada" }, commonIssues: ["Vapor chamber liquid repaste", "4x SODIMM RAM slot sequencing", "SmartCard flex replacement"], guideCount: 24 },
      { id: "model-lenovo-legion-pro7", brandId: "brand-lenovo-laptop", name: "Legion Pro 7i Gen 9", series: "Legion", year: 2024, specifications: { cpu: "Intel Core i9-14900HX", ram: "32GB DDR5 5600MHz", storage: "2TB Dual M.2 SSD", display: "16\" WQXGA 240Hz 500 nits" }, commonIssues: ["Coldfront 5.0 vapor chamber repaste", "RGB backlight controller firmware", "Dual fan de-dusting"], guideCount: 18 },
      { id: "model-lenovo-legion-slim5", brandId: "brand-lenovo-laptop", name: "Legion Slim 5 14\" OLED", series: "Legion Slim", year: 2024, specifications: { cpu: "AMD Ryzen 7 7840HS", ram: "32GB LPDDR5X", storage: "1TB M.2 2280", display: "14.5\" 2.8K 120Hz OLED" }, commonIssues: ["Vapor chamber phase-change pad installation", "Right-angle DC-in slim tip port check"], guideCount: 15 },
      { id: "model-lenovo-yoga-9i", brandId: "brand-lenovo-laptop", name: "Yoga 9i Dual-Screen / 2-in-1", series: "Yoga", year: 2024, specifications: { cpu: "Intel Core Ultra 7 155H", ram: "16GB LPDDR5x", storage: "1TB Gen4 SSD", display: "Dual 13.3\" 2.8K OLED Touch" }, commonIssues: ["360-degree rotating soundbar hinge tension", "Active stylus digitizer calibration"], guideCount: 13 },

      // HP LAPTOPS
      { id: "model-hp-spectre-14", brandId: "brand-hp-laptop", name: "Spectre x360 14 (2024)", series: "Spectre", year: 2024, specifications: { cpu: "Intel Core Ultra 7 155H", ram: "32GB LPDDR5x", storage: "2TB NVMe", display: "14.0\" 2.8K OLED Touch" }, commonIssues: ["Haptic trackpad calibration", "Bottom cover rubber foot adhesive", "USB-C PD handshake reset"], guideCount: 14 },
      { id: "model-hp-spectre-16", brandId: "brand-hp-laptop", name: "Spectre x360 16 OLED", series: "Spectre", year: 2024, specifications: { cpu: "Intel Core Ultra 7 155H", ram: "32GB LPDDR5x", storage: "2TB NVMe", gpu: "RTX 4050 Laptop" }, commonIssues: ["360-degree gear hinge lubrication", "Dual blower fan cleaning", "OLED touch digitizer ribbon"], guideCount: 15 },
      { id: "model-hp-elitebook-840", brandId: "brand-hp-laptop", name: "EliteBook 840 G10", series: "EliteBook", year: 2023, specifications: { cpu: "Intel Core i7-1360P", ram: "32GB DDR5 (2x Slots)", storage: "1TB SSD", display: "14.0\" WUXGA Anti-Glare" }, commonIssues: ["Smart card reader flex cable", "RAM SODIMM capacity upgrade", "Sure View privacy filter troubleshooting"], guideCount: 16 },
      { id: "model-hp-zbook-fury16", brandId: "brand-hp-laptop", name: "ZBook Fury 16 G10 Mobile Workstation", series: "ZBook", year: 2023, specifications: { cpu: "Intel Core i9-13950HX", ram: "128GB DDR5 ECC (4x SODIMM)", storage: "4x M.2 NVMe SSDs (Up to 16TB)", gpu: "NVIDIA RTX 5000 Ada" }, commonIssues: ["Toolless chassis latch mechanism", "Quad M.2 thermal heatsink pad repaste", "BMS battery diagnostic"], guideCount: 22 },
      { id: "model-hp-omen-16", brandId: "brand-hp-laptop", name: "OMEN Transcend 16 Gaming", series: "OMEN", year: 2024, specifications: { cpu: "Intel Core i7-14700HX", ram: "32GB DDR5", storage: "1TB PCIe Gen4", display: "16.0\" Mini-LED 240Hz" }, commonIssues: ["Tempest Cooling fan shroud cleaning", "Hall-effect lid sensor alignment"], guideCount: 15 },
      { id: "model-hp-victus-16", brandId: "brand-hp-laptop", name: "Victus 16 Gaming Laptop", series: "Victus", year: 2023, specifications: { cpu: "AMD Ryzen 7 7840HS", ram: "16GB DDR5", storage: "1TB SSD", gpu: "RTX 4060" }, commonIssues: ["Screen hinge wobble tensioning", "Dual fan air intake foam swap", "DC power barrel socket replacement"], guideCount: 18 },

      // ASUS LAPTOPS & HANDHELDS
      { id: "model-asus-zephyrus-g14", brandId: "brand-asus-laptop", name: "ROG Zephyrus G14 (2024)", series: "ROG", year: 2024, specifications: { cpu: "AMD Ryzen 9 8945HS", ram: "32GB LPDDR5X", storage: "1TB M.2 NVMe", display: "14.0\" 3K OLED 120Hz G-SYNC" }, commonIssues: ["Liquid metal barrier inspection", "AniMe Matrix / Slash Lighting flex cable", "Fan bearing lubrication"], guideCount: 20 },
      { id: "model-asus-zephyrus-g16", brandId: "brand-asus-laptop", name: "ROG Zephyrus G16 (2024)", series: "ROG", year: 2024, specifications: { cpu: "Intel Core Ultra 9 185H", ram: "32GB LPDDR5x", storage: "2TB Dual NVMe", display: "16\" 2.5K OLED 240Hz" }, commonIssues: ["Tri-Fan cooling module de-dusting", "Vapor chamber repasting", "Type-C 100W PD charging controller"], guideCount: 19 },
      { id: "model-asus-strix-scar16", brandId: "brand-asus-laptop", name: "ROG Strix SCAR 16 (2024)", series: "ROG", year: 2024, specifications: { cpu: "Intel Core i9-14900HX", ram: "64GB DDR5 5600MHz", storage: "2TB RAID 0 Gen4", display: "16.0\" QHD+ 240Hz Mini-LED" }, commonIssues: ["Tri-Fan cooling module cleaning", "Conductonaut Extreme liquid metal repaste", "Chassis RGB underglow strip swap"], guideCount: 17 },
      { id: "model-asus-zenbook-14", brandId: "brand-asus-laptop", name: "ZenBook 14 OLED UX3405", series: "ZenBook", year: 2024, specifications: { cpu: "Intel Core Ultra 7 155H", ram: "16GB-32GB LPDDR5x", storage: "1TB Gen4 SSD", display: "14.0\" 3K 120Hz OLED" }, commonIssues: ["NumberPad virtual trackpad driver", "ErgoLift hinge friction adjustment"], guideCount: 11 },
      { id: "model-asus-rog-ally-x", brandId: "brand-asus-laptop", name: "ROG Ally X (Handheld Gaming PC)", series: "ROG Ally", year: 2024, specifications: { cpu: "AMD Ryzen Z1 Extreme", ram: "24GB LPDDR5X 7500MHz", storage: "1TB M.2 2280 Full-Size NVMe", battery: "80Wh High-Capacity" }, commonIssues: ["Hall-Effect joystick calibration & swap", "MicroSD slot thermal isolation tape", "Full-size 2280 M.2 SSD installation"], guideCount: 26 },

      // ACER & MSI & RAZER & FRAMEWORK & OTHER LAPTOPS
      { id: "model-acer-helios-16", brandId: "brand-acer-laptop", name: "Predator Helios 16", series: "Predator", year: 2024, specifications: { cpu: "Intel Core i9-14900HX", ram: "32GB DDR5", storage: "2TB NVMe", display: "16\" WQXGA 240Hz IPS" }, commonIssues: ["AeroBlade 3D 5th Gen metal fan cleaning", "Liquid metal barrier reseal", "RGB swappable WASD keycaps"], guideCount: 18 },
      { id: "model-acer-swift-go14", brandId: "brand-acer-laptop", name: "Swift Go 14 OLED", series: "Swift", year: 2024, specifications: { cpu: "Intel Core Ultra 7 155H", ram: "16GB LPDDR5X", storage: "1TB Gen4 SSD", display: "14.0\" 2.8K OLED 90Hz" }, commonIssues: ["TwinAir dual fan heatsink cleaning", "Secondary M.2 slot NVMe addition"], guideCount: 12 },
      { id: "model-msi-stealth-16", brandId: "brand-msi-laptop", name: "MSI Stealth 16 AI Studio", series: "Stealth", year: 2024, specifications: { cpu: "Intel Core Ultra 9 185H", ram: "32GB DDR5", storage: "2TB NVMe SSD", display: "16\" UHD+ 120Hz OLED" }, commonIssues: ["Cooler Boost 5 fan cleaning", "Inverted motherboard disassembly order", "Hinge anchor reinforcement"], guideCount: 15 },
      { id: "model-msi-titan-18", brandId: "brand-msi-laptop", name: "MSI Titan 18 HX Flagship", series: "Titan Flagship", year: 2024, specifications: { cpu: "Intel Core i9-14900HX", ram: "128GB DDR5 (4x Slots)", storage: "1x PCIe Gen5 + 2x PCIe Gen4 SSDs", display: "18\" 4K 120Hz Mini-LED" }, commonIssues: ["Vapor chamber 3D cooling repaste", "Cherry MX mechanical keyboard switch swap", "Quad fan bearing service"], guideCount: 22 },
      { id: "model-razer-blade-16", brandId: "brand-razer-laptop", name: "Razer Blade 16 (Dual-Mode Display)", series: "Blade", year: 2024, specifications: { cpu: "Intel Core i9-14900HX", ram: "32GB-64GB DDR5", storage: "2TB NVMe", display: "16\" Dual-Mode Mini-LED (4K 120Hz / FHD 240Hz)" }, commonIssues: ["Battery swelling prevention and replacement", "Vapor chamber repaste with PTM7950", "Synapse Chroma RGB controller reset"], guideCount: 23 },
      { id: "model-razer-blade-14", brandId: "brand-razer-laptop", name: "Razer Blade 14 (AMD)", series: "Blade", year: 2024, specifications: { cpu: "AMD Ryzen 9 8945HS", ram: "32GB-64GB DDR5 (2x Slots)", storage: "1TB PCIe 4.0", display: "14\" QHD+ 240Hz" }, commonIssues: ["Dual blower fan lint de-clogging", "M.2 SSD thermal pad replacement", "Trackpad click stiffness"], guideCount: 17 },
      { id: "model-framework-13", brandId: "brand-framework-laptop", name: "Framework Laptop 13 (Modular)", series: "Framework Modular", year: 2024, specifications: { cpu: "AMD Ryzen 7 7840U / Intel Core Ultra", ram: "Up to 64GB DDR5 SODIMM", storage: "Up to 4TB M.2 2280", display: "13.5\" 2256x1504 3:2" }, commonIssues: ["Expansion card USB-C slot swap", "Magnetic bezel replacement", "Battery RTC coin cell swap"], guideCount: 25 },
      { id: "model-framework-16", brandId: "brand-framework-laptop", name: "Framework Laptop 16 (Discrete GPU Bay)", series: "Framework Modular", year: 2024, specifications: { cpu: "AMD Ryzen 9 7940HS", ram: "64GB DDR5", storage: "2x M.2 (2280 + 2230)", gpu: "Modular Radeon RX 7700S Expansion Bay" }, commonIssues: ["Graphics Module interposer connector latching", "Hot-swappable keyboard and numpad deck re-seating", "Dual fan exhaust module swap"], guideCount: 28 },
      { id: "model-ms-surface-laptop5", brandId: "brand-microsoft-laptop", name: "Surface Laptop 5", series: "Surface", year: 2023, specifications: { cpu: "Intel Core i7-1265U", ram: "16GB LPDDR5x", storage: "512GB Removable SSD", display: "13.5\" PixelSense Touch" }, commonIssues: ["Magnetic keyboard fabric deck removal", "Removable M.2 2230 SSD upgrade", "Surface Connect port charging diagnostic"], guideCount: 14 },
      { id: "model-ms-surface-pro9", brandId: "brand-microsoft-laptop", name: "Surface Pro 9 / 10 2-in-1", series: "Surface Pro", year: 2023, specifications: { cpu: "Intel Core i7-1255U / SQ3 5G", ram: "16GB LPDDR5", storage: "256GB-1TB Removable 2230 SSD", display: "13.0\" PixelSense Flow 120Hz" }, commonIssues: ["Magnetic SSD hatch door removal", "Kickstand torque hinge adjustment", "Screen glass adhesive release"], guideCount: 19 },
      { id: "model-samsung-galaxy-book4", brandId: "brand-samsung-laptop", name: "Galaxy Book4 Ultra", series: "Galaxy Book", year: 2024, specifications: { cpu: "Intel Core Ultra 9 185H", ram: "32GB LPDDR5X", storage: "1TB Gen4 SSD", display: "16.0\" Dynamic AMOLED 2X Touch" }, commonIssues: ["Vapor chamber repasting", "Secondary M.2 slot NVMe expansion"], guideCount: 13 },
      { id: "model-lg-gram-17", brandId: "brand-lg-laptop", name: "LG Gram 17 (Ultra-Lightweight)", series: "Gram", year: 2024, specifications: { cpu: "Intel Core Ultra 7 155H", ram: "16GB-32GB LPDDR5x", storage: "1TB Dual M.2", display: "17.0\" WQXGA IPS Non-Glare" }, commonIssues: ["Magnesium chassis flex inspection", "Dual M.2 SSD installation", "Battery replacement"], guideCount: 12 },
      { id: "model-gigabyte-aorus-16x", brandId: "brand-gigabyte-laptop", name: "GIGABYTE AORUS 16X (2024)", series: "AORUS", year: 2024, specifications: { cpu: "Intel Core i9-14900HX", ram: "32GB DDR5 5600MHz", storage: "1TB + 1TB Dual Gen4", display: "16\" 165Hz WQXGA Panton-Validated" }, commonIssues: ["Windforce Infinity cooling overhaul", "RGB Beacon projection light repair", "Wi-Fi 7 BE200 module seating"], guideCount: 16 },

      // ==========================================
      // DESKTOP MODELS & FORM FACTORS (30+ Desktop Models)
      // ==========================================
      { id: "model-custom-atx-gaming", brandId: "brand-custom-desktop", name: "Standard Full/Mid ATX Gaming PC", series: "Custom PC", year: 2024, specifications: { cpu: "AMD Ryzen 7 7800X3D / Intel Core i7-14700K", ram: "32GB DDR5 6000MHz", storage: "2TB PCIe 4.0 NVMe", gpu: "NVIDIA GeForce RTX 4080 Super", psu: "850W ATX 3.0 Gold Modular" }, commonIssues: ["PCIe GPU reseating & 12VHPWR seating", "360mm AIO liquid cooler bleeding/pump whine", "RAM XMP/EXPO dual-channel profile stability", "Front panel header / ARGB wiring"], guideCount: 35 },
      { id: "model-custom-itx-sff", brandId: "brand-custom-desktop", name: "Mini-ITX Small Form Factor (SFF) Build", series: "Custom SFF", year: 2024, specifications: { cpu: "AMD Ryzen 7 7800X3D", ram: "32GB DDR5 Low-Profile", storage: "2TB M.2 Back-Mounted", gpu: "RTX 4070 Dual-Slot", psu: "SFX 750W Platinum" }, commonIssues: ["PCIe Gen4 riser cable bandwidth errors", "Tight cable routing around CPU cooler", "Small fan curve optimization"], guideCount: 28 },
      { id: "model-custom-watercooled", brandId: "brand-custom-desktop", name: "Custom Hardline Liquid Cooling Rig", series: "Custom Enthusiast", year: 2024, specifications: { cpu: "Intel Core i9-14900KS / AMD Ryzen 9 7950X3D", ram: "64GB DDR5 7200MHz", storage: "4TB PCIe Gen5 NVMe", gpu: "RTX 4090 Water Block", cooling: "Dual 360mm Radiators, D5 Pump" }, commonIssues: ["Loop drainage & distilled water flushing", "O-ring seal leak testing with air pressure tester", "Biocide and coolant dye fallout cleanup"], guideCount: 22 },
      { id: "model-custom-dual-chamber", brandId: "brand-custom-desktop", name: "Dual-Chamber Fishbowl Panoramic Glass PC", series: "Custom Aesthetic", year: 2024, specifications: { cpu: "Intel Core i9-14900K", ram: "64GB DDR5 RGB", storage: "4TB NVMe", gpu: "RTX 4090 Vertical Mount", fans: "9x Reverse-Blade 120mm PWM" }, commonIssues: ["Tempered glass panel standoff rubber washer check", "Reverse blade fan orientation airflow check", "12V-2x6 cable 90-degree adapter seating"], guideCount: 20 },

      // APPLE DESKTOPS
      { id: "model-mac-studio-m2", brandId: "brand-apple-desktop", name: "Mac Studio (M2 Max / M2 Ultra)", series: "Mac Studio", year: 2023, specifications: { cpu: "Apple M2 Ultra 24-Core CPU / 76-Core GPU", ram: "64GB-192GB Unified", storage: "1TB-8TB Proprietary SSD Modules", psu: "Internal 370W PSU" }, commonIssues: ["Dual blower fan dust removal", "Proprietary SSD module restoration via Apple Configurator", "Power supply replacement"], guideCount: 14 },
      { id: "model-mac-mini-m2", brandId: "brand-apple-desktop", name: "Mac mini (M2 / M2 Pro)", series: "Mac mini", year: 2023, specifications: { cpu: "Apple M2 Pro 12-Core", ram: "16GB-32GB Unified", storage: "512GB-2TB SSD" }, commonIssues: ["Antenna plate removal", "Internal fan replacement", "DC power supply board swap"], guideCount: 16 },
      { id: "model-imac-24-m3", brandId: "brand-apple-desktop", name: "iMac 24\" 4.5K Retina (M3)", series: "iMac", year: 2023, specifications: { cpu: "Apple M3 8-Core", ram: "16GB-24GB Unified", storage: "512GB-2TB SSD", display: "23.5\" 4.5K Retina 4480x2520" }, commonIssues: ["Display adhesive cutting wheel procedure", "Internal logic board swap", "Magnetic power cord socket cleaning"], guideCount: 12 },
      { id: "model-imac-27-intel", brandId: "brand-apple-desktop", name: "iMac 27\" 5K Retina (Intel Legacy)", series: "iMac Legacy", year: 2020, specifications: { cpu: "Intel Core i9-10910 10-Core", ram: "Up to 128GB DDR4 (User Door)", storage: "1TB-8TB SSD", gpu: "Radeon Pro 5700 XT 16GB" }, commonIssues: ["Blade SSD upgrade", "User RAM door 4-stick DDR4 installation", "Display hinge spring snap repair"], guideCount: 25 },
      { id: "model-mac-pro-tower", brandId: "brand-apple-desktop", name: "Mac Pro Tower (Apple Silicon / Intel)", series: "Mac Pro", year: 2023, specifications: { cpu: "Apple M2 Ultra / Intel Xeon W", ram: "Up to 1.5TB DDR4 ECC (Intel) / 192GB (M2)", storage: "Internal PCIe Storage", expansion: "7x PCIe Slots" }, commonIssues: ["PCIe card auxiliary power routing", "Stainless steel latch alignment", "MPX module reseating"], guideCount: 15 },

      // DELL DESKTOPS
      { id: "model-dell-optiplex-7010", brandId: "brand-dell-desktop", name: "OptiPlex 7010 / 7000 Micro Form Factor", series: "OptiPlex Micro", year: 2023, specifications: { cpu: "Intel Core i7-13700T", ram: "16GB-64GB DDR5 SODIMM", storage: "512GB M.2 2280 NVMe" }, commonIssues: ["Blower fan thermal paste refresh", "External 90W/130W Dell power brick testing", "SATA 2.5\" caddy cable replacement"], guideCount: 19 },
      { id: "model-dell-optiplex-5090-sff", brandId: "brand-dell-desktop", name: "OptiPlex 5090 / 7090 Small Form Factor (SFF)", series: "OptiPlex SFF", year: 2022, specifications: { cpu: "Intel Core i7-11700", ram: "32GB DDR4 (4x DIMM Slots)", storage: "1TB NVMe + 3.5\" HDD", psu: "Dell Proprietary 260W 80+ Platinum" }, commonIssues: ["Low-profile PCIe GPU installation (e.g. RTX 3050 6GB / GTX 1650)", "Proprietary 6-pin motherboard power supply swap", "CMOS CR2032 coin cell replacement"], guideCount: 24 },
      { id: "model-dell-optiplex-7000-tower", brandId: "brand-dell-desktop", name: "OptiPlex 7000 Full Tower", series: "OptiPlex Tower", year: 2023, specifications: { cpu: "Intel Core i7-13700", ram: "64GB DDR5", storage: "2TB NVMe + 4TB HDD", psu: "Dell 500W Platinum" }, commonIssues: ["PCIe graphics card bracket lock", "Front intake bezel dust cleaning", "SATA optical drive replacement"], guideCount: 17 },
      { id: "model-dell-alienware-r16", brandId: "brand-dell-desktop", name: "Alienware Aurora R16 Gaming Desktop", series: "Alienware Aurora", year: 2024, specifications: { cpu: "Intel Core i9-14900KF", ram: "32GB DDR5 5600MHz", storage: "2TB Gen4 SSD", gpu: "RTX 4080 Super 16GB", psu: "1000W 80+ Gold" }, commonIssues: ["240mm liquid cooler radiator cleaning", "GPU retention bracket removal", "12V-2x6 power cable routing"], guideCount: 20 },
      { id: "model-dell-precision-3660", brandId: "brand-dell-desktop", name: "Precision 3660 Tower Workstation", series: "Precision Workstation", year: 2023, specifications: { cpu: "Intel Core i9-13900K", ram: "64GB DDR5 ECC / Non-ECC", storage: "Dual 2TB PCIe Gen4 SSDs", gpu: "NVIDIA RTX A4000 / RTX 4080" }, commonIssues: ["Front air intake dust filter maintenance", "Secondary M.2 PCIe riser card setup", "ECC memory error detection"], guideCount: 21 },

      // HP DESKTOPS
      { id: "model-hp-omen-45l", brandId: "brand-hp-desktop", name: "OMEN 45L Gaming Desktop (Cryo-Chamber)", series: "OMEN Desktop", year: 2024, specifications: { cpu: "Intel Core i9-14900K", ram: "64GB Kingston FURY DDR5", storage: "2TB WD Black NVMe", cooling: "External Patented Cryo-Chamber 360mm AIO", psu: "1000W 80+ Gold" }, commonIssues: ["Cryo-Chamber radiator dust filter washing", "Standard ATX motherboard/GPU upgrades", "OMEN Gaming Hub RGB lighting sync"], guideCount: 22 },
      { id: "model-hp-omen-25l", brandId: "brand-hp-desktop", name: "OMEN 25L Mid-Tower Gaming", series: "OMEN Desktop", year: 2023, specifications: { cpu: "Intel Core i7-13700F", ram: "32GB HyperX DDR5", storage: "1TB SSD", gpu: "RTX 4070" }, commonIssues: ["Rear exhaust fan upgrade", "CPU air cooler tower replacement", "RAM XMP frequency enable in BIOS"], guideCount: 16 },
      { id: "model-hp-prodesk-600", brandId: "brand-hp-desktop", name: "ProDesk 600 G6 / G8 SFF", series: "ProDesk", year: 2022, specifications: { cpu: "Intel Core i5-11500", ram: "16GB DDR4", storage: "512GB M.2 SSD", psu: "HP 210W Active PFC" }, commonIssues: ["SFF power supply diagnostic", "Toolless drive bay unlatching", "BIOS admin password jumper clearing"], guideCount: 18 },
      { id: "model-hp-elitedesk-mini", brandId: "brand-hp-desktop", name: "EliteDesk 800 G8 / G9 Mini PC", series: "EliteDesk Mini", year: 2023, specifications: { cpu: "Intel Core i7-12700T", ram: "32GB DDR5", storage: "1TB M.2 Gen4" }, commonIssues: ["Flex IO v2 port module swapping (Type-C / DP / HDMI / 2.5GbE)", "Copper heatsink repaste", "Mini-PC fan acoustic balance"], guideCount: 17 },
      { id: "model-hp-z4-g5", brandId: "brand-hp-desktop", name: "HP Z4 G5 Workstation Tower", series: "Z Workstation", year: 2024, specifications: { cpu: "Intel Xeon w5-2465X", ram: "128GB DDR5 ECC Registered", storage: "Dual 4TB NVMe SSDs", psu: "1125W 90% Efficient" }, commonIssues: ["Hot-swappable front NVMe drive bays", "Memory cooling shroud latch", "Dual PCIe Gen5 GPU power distribution"], guideCount: 20 },

      // LENOVO DESKTOPS
      { id: "model-lenovo-m70q-tiny", brandId: "brand-lenovo-desktop", name: "ThinkCentre M70q / M90q Tiny PC", series: "ThinkCentre Tiny", year: 2023, specifications: { cpu: "Intel Core i7-13700T", ram: "16GB-64GB DDR5", storage: "512GB M.2 NVMe", dimensions: "1-Liter Compact Chassis" }, commonIssues: ["Toolless chassis thumbscrew removal", "Dust shield foam replacement", "Thermal paste refresh on direct-mount heatsink"], guideCount: 20 },
      { id: "model-lenovo-legion-t7", brandId: "brand-lenovo-desktop", name: "Legion Tower 7i Gen 8", series: "Legion Tower", year: 2024, specifications: { cpu: "Intel Core i9-13900KF", ram: "32GB DDR5 5600MHz", storage: "1TB + 1TB Dual SSD", gpu: "RTX 4080", psu: "850W Gold" }, commonIssues: ["ARGB 120mm fan hub diagnosis", "Legion Coldfront liquid cooler pump curve", "GPU anti-sag bracket mounting"], guideCount: 19 },
      { id: "model-lenovo-p360-ultra", brandId: "brand-lenovo-desktop", name: "ThinkStation P360 / P3 Ultra SFF Workstation", series: "ThinkStation", year: 2023, specifications: { cpu: "Intel Core i9-13900", ram: "128GB DDR5 SODIMM", storage: "2x M.2 PCIe Gen4", gpu: "NVIDIA RTX A5000 Mobile 16GB" }, commonIssues: ["Chassis pull-tab clamshell mechanism", "Dual blower fan cleaning", "External 300W high-power brick check"], guideCount: 21 },

      // ASUS & MSI & CORSAIR & SPECIALIZED DESKTOPS
      { id: "model-asus-rog-g16ch", brandId: "brand-asus-desktop", name: "ROG Strix G16CH Gaming Desktop", series: "ROG Strix", year: 2024, specifications: { cpu: "Intel Core i7-14700F", ram: "32GB DDR5", storage: "1TB M.2 Gen4", gpu: "RTX 4070 Super", psu: "700W 80+ Gold" }, commonIssues: ["Front mesh air intake cleaning", "Glass side panel thumbscrew rubber washer seating", "AURA Sync RGB lighting reset"], guideCount: 18 },
      { id: "model-asus-proart-pd5", brandId: "brand-asus-desktop", name: "ProArt Station PD5 Creator Desktop", series: "ProArt", year: 2023, specifications: { cpu: "Intel Core i9-13900", ram: "64GB DDR5", storage: "2TB Gen4 SSD", gpu: "NVIDIA RTX 4070 / RTX A4000" }, commonIssues: ["Lumiwiz LED status bar calibration", "Front I/O headphone latch replacement", "Hard drive hot-swap cage"], guideCount: 15 },
      { id: "model-corsair-one-i500", brandId: "brand-corsair-desktop", name: "Corsair ONE i500 Compact Luxury PC", series: "Corsair ONE", year: 2024, specifications: { cpu: "Intel Core i9-14900K", ram: "64GB DDR5", storage: "2TB Gen4 NVMe", cooling: "Dual Independent Closed-Loop Liquid Coolers", chassis: "FSC-certified Real Wood Front" }, commonIssues: ["Dual radiator side-panel dust blowing", "Underglow touch sensor recalibration", "SFX-L power supply cable check"], guideCount: 16 },
      { id: "model-msi-trident-x2", brandId: "brand-msi-desktop", name: "MSI MEG Trident X2 (HMI Touchscreen)", series: "MEG Trident", year: 2024, specifications: { cpu: "Intel Core i9-14900KF", ram: "64GB DDR5", storage: "2TB Gen5 + 2TB Gen4", gpu: "RTX 4090 24GB", psu: "1000W PCIe 5.0" }, commonIssues: ["Front 4.5\" HMI touchscreen firmware calibration", "Silent Storm Cooling 3 air chamber divider alignment"], guideCount: 17 },
      { id: "model-intel-nuc-13-extreme", brandId: "brand-corsair-desktop", name: "Intel NUC 13 Extreme (Raptor Canyon)", series: "Intel NUC", year: 2023, specifications: { cpu: "Intel Core i9-13900K Compute Element", ram: "64GB DDR5 SODIMM", storage: "3x M.2 PCIe 4.0 NVMe", gpu: "Triple-Slot 12\" PCIe GPU", psu: "750W SFX Gold" }, commonIssues: ["NUC Compute Element PCIe x16 daughterboard seating", "SFX power supply fan curve", "Triple M.2 heatsink plate pad repaste"], guideCount: 22 }
    ];

    allModels.forEach(m => {
      this.deviceModels.set(m.id, {
        ...m,
        createdAt: new Date()
      });
    });

    // Compatibility mappings linking models to guides
    const guideKeys = Array.from(this.repairGuides.keys());
    allModels.forEach((m) => {
      guideKeys.slice(0, 6).forEach((gId) => {
        const compatId = `compat-${m.id}-${gId}`;
        this.guideCompatibility.set(compatId, {
          id: compatId,
          guideId: gId,
          modelId: m.id,
          compatibility: "compatible",
          notes: "Fully verified compatibility with standard OEM repair procedures.",
          createdAt: new Date()
        });
      });
    });

    // Seed master and default technician accounts
    try {
      const defaultPasswordHash = bcrypt.hashSync("password123", 10);
      const initialUsers: User[] = [
        {
          id: "user-master-tech",
          email: "jhustle44@gmail.com",
          password: defaultPasswordHash,
          firstName: "Master",
          lastName: "Technician",
          profileImageUrl: null,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "user-tech-lead",
          email: "tech@jcrguru.com",
          password: defaultPasswordHash,
          firstName: "Field",
          lastName: "Technician",
          profileImageUrl: null,
          role: "technician",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "user-admin-chief",
          email: "admin@jcrguru.com",
          password: defaultPasswordHash,
          firstName: "Workshop",
          lastName: "Admin",
          profileImageUrl: null,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "user-guest-demo",
          email: "demo@jcrguru.com",
          password: defaultPasswordHash,
          firstName: "Demo",
          lastName: "Technician",
          profileImageUrl: null,
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ];

      initialUsers.forEach(u => {
        this.users.set(u.id, u);
      });
    } catch (e) {
      console.warn("User seeding notice:", e);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    if (!email) return undefined;
    const target = email.trim().toLowerCase();
    return Array.from(this.users.values()).find(u => u.email.toLowerCase() === target);
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newUser: User = {
      id,
      email: (user.email || "").trim().toLowerCase(),
      password: user.password,
      firstName: user.firstName || null,
      lastName: user.lastName || null,
      profileImageUrl: user.profileImageUrl || null,
      role: user.role || "user",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(id, newUser);
    return newUser;
  }

  async updateUser(id: string, user: Partial<User>): Promise<User | undefined> {
    const existing = this.users.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...user, updatedAt: new Date() };
    this.users.set(id, updated);
    return updated;
  }

  async getUserFavorites(userId: string): Promise<Favorite[]> {
    return Array.from(this.favorites.values()).filter(f => f.userId === userId);
  }

  async addToFavorites(userId: string, favorite: InsertFavorite): Promise<Favorite> {
    const id = `fav-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const newFav: Favorite = {
      id,
      userId,
      itemType: favorite.itemType,
      itemId: favorite.itemId,
      itemTitle: favorite.itemTitle,
      itemImageUrl: favorite.itemImageUrl || null,
      createdAt: new Date()
    };
    this.favorites.set(id, newFav);
    return newFav;
  }

  async removeFromFavorites(userId: string, itemId: string, itemType: string): Promise<void> {
    for (const [id, f] of this.favorites.entries()) {
      if (f.userId === userId && f.itemId === itemId && f.itemType === itemType) {
        this.favorites.delete(id);
      }
    }
  }

  async isFavorited(userId: string, itemId: string, itemType: string): Promise<boolean> {
    return Array.from(this.favorites.values()).some(
      f => f.userId === userId && f.itemId === itemId && f.itemType === itemType
    );
  }

  async getRepairGuides(filters?: { deviceType?: string; category?: string; difficulty?: string }): Promise<RepairGuide[]> {
    let list = Array.from(this.repairGuides.values());
    if (filters?.deviceType) {
      list = list.filter(g => g.deviceType === filters.deviceType);
    }
    if (filters?.category && filters.category !== "all") {
      list = list.filter(g => g.category === filters.category);
    }
    if (filters?.difficulty && filters.difficulty !== "all") {
      list = list.filter(g => g.difficulty === filters.difficulty);
    }
    return list;
  }

  async getRepairGuide(id: string): Promise<RepairGuide | undefined> {
    return this.repairGuides.get(id);
  }

  async createRepairGuide(guide: InsertRepairGuide): Promise<RepairGuide> {
    const id = `guide-${Date.now()}`;
    const newGuide: RepairGuide = {
      id,
      title: guide.title,
      description: guide.description,
      deviceType: guide.deviceType,
      category: guide.category,
      difficulty: guide.difficulty,
      estimatedTime: guide.estimatedTime,
      toolsRequired: guide.toolsRequired,
      safetyWarnings: guide.safetyWarnings,
      steps: guide.steps,
      alternativeSolutions: guide.alternativeSolutions || null,
      imageUrl: guide.imageUrl,
      viewCount: 0,
      downloadCount: 0,
      isBookmarked: false,
    };
    this.repairGuides.set(id, newGuide);
    return newGuide;
  }

  async updateViewCount(id: string): Promise<void> {
    const guide = this.repairGuides.get(id);
    if (guide) {
      guide.viewCount = (guide.viewCount || 0) + 1;
    }
  }

  async updateDownloadCount(id: string): Promise<void> {
    const guide = this.repairGuides.get(id);
    if (guide) {
      guide.downloadCount = (guide.downloadCount || 0) + 1;
    }
  }

  async toggleBookmark(id: string): Promise<RepairGuide | undefined> {
    const guide = this.repairGuides.get(id);
    if (guide) {
      guide.isBookmarked = !guide.isBookmarked;
      return guide;
    }
    return undefined;
  }

  async searchRepairGuides(query: string): Promise<RepairGuide[]> {
    const q = query.trim().toLowerCase();
    if (!q) return Array.from(this.repairGuides.values());
    return Array.from(this.repairGuides.values()).filter(g => {
      const matchTitle = g.title.toLowerCase().includes(q);
      const matchDesc = g.description.toLowerCase().includes(q);
      const matchCategory = g.category.toLowerCase().includes(q);
      const matchDevice = g.deviceType.toLowerCase().includes(q);
      const matchDifficulty = g.difficulty.toLowerCase().includes(q);
      const matchTools = g.toolsRequired && g.toolsRequired.some(t => t.toLowerCase().includes(q));
      const matchSteps = g.steps && g.steps.some(s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchCategory || matchDevice || matchDifficulty || matchTools || matchSteps;
    });
  }

  async getTroubleshootingFlows(): Promise<TroubleshootingFlow[]> {
    return Array.from(this.troubleshootingFlows.values());
  }

  async getTroubleshootingFlow(id: string): Promise<TroubleshootingFlow | undefined> {
    return this.troubleshootingFlows.get(id);
  }

  async createTroubleshootingFlow(flow: InsertTroubleshootingFlow): Promise<TroubleshootingFlow> {
    const id = `flow-${Date.now()}`;
    const newFlow: TroubleshootingFlow = {
      id,
      type: flow.type,
      title: flow.title,
      description: flow.description,
      steps: flow.steps,
    };
    this.troubleshootingFlows.set(id, newFlow);
    return newFlow;
  }

  async getDeviceComponents(deviceType?: string): Promise<DeviceComponent[]> {
    let list = Array.from(this.deviceComponents.values());
    if (deviceType) {
      list = list.filter(c => c.deviceType === deviceType);
    }
    return list;
  }

  async getDeviceComponent(id: string): Promise<DeviceComponent | undefined> {
    return this.deviceComponents.get(id);
  }

  async createDeviceComponent(component: InsertDeviceComponent): Promise<DeviceComponent> {
    const id = `comp-${Date.now()}`;
    const newComp: DeviceComponent = {
      id,
      name: component.name,
      description: component.description,
      deviceType: component.deviceType,
      category: component.category,
      safetyNotes: component.safetyNotes,
    };
    this.deviceComponents.set(id, newComp);
    return newComp;
  }

  async getDeviceBrands(deviceType?: string): Promise<DeviceBrand[]> {
    let list = Array.from(this.deviceBrands.values());
    if (deviceType) {
      list = list.filter(b => b.deviceType === deviceType);
    }
    return list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }

  async getDeviceModels(brandId?: string, deviceType?: string): Promise<DeviceModel[]> {
    let list = Array.from(this.deviceModels.values());
    if (brandId) {
      list = list.filter(m => m.brandId === brandId);
    }
    return list.sort((a, b) => (b.year || 0) - (a.year || 0));
  }

  async getDeviceModel(id: string): Promise<DeviceModel | undefined> {
    return this.deviceModels.get(id);
  }

  async getModelsByBrand(brandId: string): Promise<DeviceModel[]> {
    return Array.from(this.deviceModels.values())
      .filter(m => m.brandId === brandId)
      .sort((a, b) => (b.year || 0) - (a.year || 0));
  }

  async searchDeviceModels(query: string, deviceType?: string): Promise<DeviceModel[]> {
    const q = query.trim().toLowerCase();
    let list = Array.from(this.deviceModels.values());
    if (deviceType) {
      const matchingBrandIds = new Set(
        Array.from(this.deviceBrands.values())
          .filter(b => b.deviceType === deviceType)
          .map(b => b.id)
      );
      list = list.filter(m => matchingBrandIds.has(m.brandId));
    }
    if (!q) return list;

    return list.filter(m => {
      const matchName = m.name.toLowerCase().includes(q);
      const matchSeries = m.series ? m.series.toLowerCase().includes(q) : false;
      const matchYear = m.year ? m.year.toString().includes(q) : false;
      const matchSpecs = m.specifications ? JSON.stringify(m.specifications).toLowerCase().includes(q) : false;
      const matchIssues = m.commonIssues ? JSON.stringify(m.commonIssues).toLowerCase().includes(q) : false;
      return matchName || matchSeries || matchYear || matchSpecs || matchIssues;
    });
  }

  async getCompatibleGuides(modelId: string): Promise<RepairGuide[]> {
    const matchingCompats = Array.from(this.guideCompatibility.values()).filter(
      c => c.modelId === modelId && c.compatibility === "compatible"
    );
    const guideIds = new Set(matchingCompats.map(c => c.guideId));
    return Array.from(this.repairGuides.values()).filter(g => guideIds.has(g.id));
  }

  async getModelCompatibility(guideId: string): Promise<DeviceModel[]> {
    const matchingCompats = Array.from(this.guideCompatibility.values()).filter(
      c => c.guideId === guideId
    );
    const modelIds = new Set(matchingCompats.map(c => c.modelId));
    return Array.from(this.deviceModels.values()).filter(m => modelIds.has(m.id));
  }

  async createUserGuide(guide: InsertRepairGuide): Promise<RepairGuide> {
    return this.createRepairGuide(guide);
  }
}

export const storage = db ? new DatabaseStorage() : new MemStorage();
