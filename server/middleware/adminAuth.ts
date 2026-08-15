import type { RequestHandler } from "express";
import { storage } from "../storage";

export const requireAdmin: RequestHandler = async (req, res, next) => {
  const user = req.user as any;

  // Firebase auth attaches user object with id to request
  if (!user || !user.id) {
    return res.status(401).json({ message: "Unauthorized: Admin access requires authentication" });
  }

  try {
    const dbUser = await storage.getUser(user.id);
    
    if (!dbUser || dbUser.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    // Attach user info to request for convenience
    req.adminUser = dbUser;
    next();
  } catch (error) {
    console.error("Error checking admin status:", error);
    res.status(500).json({ message: "Failed to verify admin status" });
  }
};

// Type declaration for TypeScript
declare global {
  namespace Express {
    interface Request {
      adminUser?: {
        id: string;
        email: string | null;
        firstName: string | null;
        lastName: string | null;
        profileImageUrl: string | null;
        role: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
      };
    }
  }
}
