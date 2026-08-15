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
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Favorites operations
  async getUserFavorites(userId: string): Promise<Favorite[]> {
    return await db.select().from(favorites).where(eq(favorites.userId, userId));
  }

  async addToFavorites(userId: string, favorite: InsertFavorite): Promise<Favorite> {
    const [newFavorite] = await db
      .insert(favorites)
      .values({ ...favorite, userId })
      .returning();
    return newFavorite;
  }

  async removeFromFavorites(userId: string, itemId: string, itemType: string): Promise<void> {
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

  // Repair Guides operations
  async getRepairGuides(filters?: { deviceType?: string; category?: string; difficulty?: string }): Promise<RepairGuide[]> {
    let query = db.select().from(repairGuides);
    
    if (filters?.deviceType) {
      query = query.where(eq(repairGuides.deviceType, filters.deviceType));
    }
    if (filters?.category) {
      query = query.where(eq(repairGuides.category, filters.category));
    }
    if (filters?.difficulty) {
      query = query.where(eq(repairGuides.difficulty, filters.difficulty));
    }
    
    return await query;
  }

  async getRepairGuide(id: string): Promise<RepairGuide | undefined> {
    const [guide] = await db.select().from(repairGuides).where(eq(repairGuides.id, id));
    return guide;
  }

  async createRepairGuide(guide: InsertRepairGuide): Promise<RepairGuide> {
    const [newGuide] = await db.insert(repairGuides).values(guide).returning();
    return newGuide;
  }

  async updateViewCount(id: string): Promise<void> {
    await db
      .update(repairGuides)
      .set({ viewCount: sql`${repairGuides.viewCount} + 1` })
      .where(eq(repairGuides.id, id));
  }

  async updateDownloadCount(id: string): Promise<void> {
    await db
      .update(repairGuides)
      .set({ downloadCount: sql`${repairGuides.downloadCount} + 1` })
      .where(eq(repairGuides.id, id));
  }

  async toggleBookmark(id: string): Promise<RepairGuide | undefined> {
    const [guide] = await db
      .update(repairGuides)
      .set({ isBookmarked: sql`NOT ${repairGuides.isBookmarked}` })
      .where(eq(repairGuides.id, id))
      .returning();
    return guide;
  }

  async searchRepairGuides(query: string): Promise<RepairGuide[]> {
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

  // Troubleshooting Flows operations
  async getTroubleshootingFlows(): Promise<TroubleshootingFlow[]> {
    return await db.select().from(troubleshootingFlows);
  }

  async getTroubleshootingFlow(id: string): Promise<TroubleshootingFlow | undefined> {
    const [flow] = await db.select().from(troubleshootingFlows).where(eq(troubleshootingFlows.id, id));
    return flow;
  }

  async createTroubleshootingFlow(flow: InsertTroubleshootingFlow): Promise<TroubleshootingFlow> {
    const [newFlow] = await db.insert(troubleshootingFlows).values(flow).returning();
    return newFlow;
  }

  // Device Components operations
  async getDeviceComponents(deviceType?: string): Promise<DeviceComponent[]> {
    if (deviceType) {
      return await db.select().from(deviceComponents).where(eq(deviceComponents.deviceType, deviceType));
    }
    return await db.select().from(deviceComponents);
  }

  async getDeviceComponent(id: string): Promise<DeviceComponent | undefined> {
    const [component] = await db.select().from(deviceComponents).where(eq(deviceComponents.id, id));
    return component;
  }

  async createDeviceComponent(component: InsertDeviceComponent): Promise<DeviceComponent> {
    const [newComponent] = await db.insert(deviceComponents).values(component).returning();
    return newComponent;
  }

  // Device Brands and Models
  async getDeviceBrands(deviceType?: string): Promise<DeviceBrand[]> {
    const query = db.select().from(deviceBrands);
    if (deviceType) {
      return await query.where(eq(deviceBrands.deviceType, deviceType)).orderBy(sql`${deviceBrands.popularity} DESC`);
    }
    return await query.orderBy(sql`${deviceBrands.popularity} DESC`);
  }

  async getDeviceModels(brandId?: string, deviceType?: string): Promise<DeviceModel[]> {
    let query = db.select().from(deviceModels);
    
    if (brandId) {
      query = query.where(eq(deviceModels.brandId, brandId));
    }
    
    return await query.orderBy(sql`${deviceModels.year} DESC, ${deviceModels.name} ASC`);
  }

  async getDeviceModel(id: string): Promise<DeviceModel | undefined> {
    const [model] = await db.select().from(deviceModels).where(eq(deviceModels.id, id));
    return model;
  }

  async getModelsByBrand(brandId: string): Promise<DeviceModel[]> {
    return await db.select()
      .from(deviceModels)
      .where(eq(deviceModels.brandId, brandId))
      .orderBy(sql`${deviceModels.year} DESC, ${deviceModels.name} ASC`);
  }

  async searchDeviceModels(query: string, deviceType?: string): Promise<DeviceModel[]> {
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

  // Guide Compatibility
  async getCompatibleGuides(modelId: string): Promise<RepairGuide[]> {
    return await db.select()
      .from(repairGuides)
      .innerJoin(guideCompatibility, eq(repairGuides.id, guideCompatibility.guideId))
      .where(
        and(
          eq(guideCompatibility.modelId, modelId),
          eq(guideCompatibility.compatibility, 'compatible')
        )
      )
      .orderBy(sql`${repairGuides.viewCount} DESC`);
  }

  async getModelCompatibility(guideId: string): Promise<DeviceModel[]> {
    return await db.select()
      .from(deviceModels)
      .innerJoin(guideCompatibility, eq(deviceModels.id, guideCompatibility.modelId))
      .where(eq(guideCompatibility.guideId, guideId))
      .orderBy(sql`${deviceModels.name} ASC`);
  }

  async createUserGuide(guide: InsertRepairGuide): Promise<RepairGuide> {
    const [createdGuide] = await db
      .insert(repairGuides)
      .values(guide)
      .returning();
    return createdGuide;
  }
}

export const storage = new DatabaseStorage();
