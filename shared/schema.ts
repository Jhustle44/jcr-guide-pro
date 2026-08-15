import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, json, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const repairGuides = pgTable("repair_guides", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  deviceType: text("device_type").notNull(), // "laptop" | "desktop"
  category: text("category").notNull(), // "hardware" | "software" | "cleaning" | "upgrades"
  difficulty: text("difficulty").notNull(), // "easy" | "medium" | "hard"
  estimatedTime: text("estimated_time").notNull(), // "30-45 min"
  toolsRequired: json("tools_required").$type<string[]>().notNull(),
  safetyWarnings: json("safety_warnings").$type<string[]>().notNull(),
  steps: json("steps").$type<RepairStep[]>().notNull(),
  alternativeSolutions: text("alternative_solutions"),
  imageUrl: text("image_url").notNull(),
  viewCount: integer("view_count").default(0),
  downloadCount: integer("download_count").default(0),
  isBookmarked: boolean("is_bookmarked").default(false),
});

export const troubleshootingFlows = pgTable("troubleshooting_flows", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // "power" | "performance" | "display"
  title: text("title").notNull(),
  description: text("description").notNull(),
  steps: json("steps").$type<TroubleshootingStep[]>().notNull(),
});

export const deviceComponents = pgTable("device_components", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  deviceType: text("device_type").notNull(),
  category: text("category").notNull(),
  safetyNotes: json("safety_notes").$type<string[]>().notNull(),
});

// Type definitions for complex JSON fields
export type RepairStep = {
  stepNumber: number;
  title: string;
  description: string;
  imageUrl?: string;
  notes?: string[];
  warnings?: string[];
};

export type TroubleshootingStep = {
  id: string;
  question: string;
  answers: {
    text: string;
    nextStepId?: string;
    solutionId?: string;
  }[];
};

// Insert schemas
export const insertRepairGuideSchema = createInsertSchema(repairGuides).omit({
  id: true,
  viewCount: true,
  isBookmarked: true,
});

export const insertTroubleshootingFlowSchema = createInsertSchema(troubleshootingFlows).omit({
  id: true,
});

export const insertDeviceComponentSchema = createInsertSchema(deviceComponents).omit({
  id: true,
});

// Types
export type RepairGuide = typeof repairGuides.$inferSelect;
export type InsertRepairGuide = z.infer<typeof insertRepairGuideSchema>;

export type TroubleshootingFlow = typeof troubleshootingFlows.$inferSelect;
export type InsertTroubleshootingFlow = z.infer<typeof insertTroubleshootingFlowSchema>;

export type DeviceComponent = typeof deviceComponents.$inferSelect;
export type InsertDeviceComponent = z.infer<typeof insertDeviceComponentSchema>;

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique().notNull(),
  password: text("password").notNull(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").default("user"), // "admin" gets extra powers
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Favorites table to store user's favorite guides and videos
export const favorites = pgTable("favorites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  itemType: text("item_type").notNull(), // "guide" | "video" | "troubleshooting"
  itemId: varchar("item_id").notNull(), // ID of the favorited item
  itemTitle: text("item_title").notNull(), // Cache the title for quick display
  itemImageUrl: text("item_image_url"), // Cache image URL
  createdAt: timestamp("created_at").defaultNow(),
});

// Device brands table
export const deviceBrands = pgTable("device_brands", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  deviceType: text("device_type").notNull(), // 'laptop' or 'desktop'
  logoUrl: varchar("logo_url"),
  supportLevel: varchar("support_level").notNull().default("community"), // 'official', 'community', 'basic'
  popularity: integer("popularity").default(0), // For sorting brands by popularity
  createdAt: timestamp("created_at").defaultNow(),
});

// Device models table
export const deviceModels = pgTable("device_models", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  brandId: varchar("brand_id").notNull().references(() => deviceBrands.id),
  name: varchar("name").notNull(),
  series: varchar("series"), // e.g., "ThinkPad", "Inspiron", "Pavilion"
  year: integer("year"),
  specifications: jsonb("specifications"), // CPU, RAM, storage, etc.
  commonIssues: jsonb("common_issues").default(sql`'[]'::jsonb`), // Array of common problems
  guideCount: integer("guide_count").default(0), // Number of compatible guides
  createdAt: timestamp("created_at").defaultNow(),
});

// Guide compatibility table (many-to-many between guides and models)
export const guideCompatibility = pgTable("guide_compatibility", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  guideId: varchar("guide_id").notNull().references(() => repairGuides.id),
  modelId: varchar("model_id").notNull().references(() => deviceModels.id),
  compatibility: varchar("compatibility").notNull().default("compatible"), // 'compatible', 'partial', 'not_compatible'
  notes: text("notes"), // Specific notes about compatibility
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas for new tables
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFavoriteSchema = createInsertSchema(favorites).omit({
  id: true,
  createdAt: true,
});

export const insertDeviceBrandSchema = createInsertSchema(deviceBrands).omit({
  id: true,
  createdAt: true,
});

export const insertDeviceModelSchema = createInsertSchema(deviceModels).omit({
  id: true,
  createdAt: true,
});

export const insertGuideCompatibilitySchema = createInsertSchema(guideCompatibility).omit({
  id: true,
  createdAt: true,
});

// Types for new tables
export type User = typeof users.$inferSelect;
export type UpsertUser = typeof users.$inferInsert;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;

export type DeviceBrand = typeof deviceBrands.$inferSelect;
export type InsertDeviceBrand = z.infer<typeof insertDeviceBrandSchema>;

export type DeviceModel = typeof deviceModels.$inferSelect;
export type InsertDeviceModel = z.infer<typeof insertDeviceModelSchema>;

export type GuideCompatibility = typeof guideCompatibility.$inferSelect;
export type InsertGuideCompatibility = z.infer<typeof insertGuideCompatibilitySchema>;
