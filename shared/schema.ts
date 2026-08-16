import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, json, timestamp, jsonb, index } from "drizzle-orm/pg-core";
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
  phase?: string;
  subSteps?: string[];
  torqueSpec?: string;
  toolRequired?: string;
  checkpoints?: string[];
  notes?: string[];
  warnings?: string[];
  tips?: string[];
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
export const insertRepairGuideSchema = z.object({
  title: z.string(),
  description: z.string(),
  deviceType: z.string(),
  category: z.string(),
  difficulty: z.string(),
  estimatedTime: z.string(),
  toolsRequired: z.array(z.string()),
  safetyWarnings: z.array(z.string()),
  steps: z.array(z.object({
    stepNumber: z.number(),
    title: z.string(),
    description: z.string(),
    imageUrl: z.string().optional(),
    phase: z.string().optional(),
    subSteps: z.array(z.string()).optional(),
    torqueSpec: z.string().optional(),
    toolRequired: z.string().optional(),
    checkpoints: z.array(z.string()).optional(),
    notes: z.array(z.string()).optional(),
    warnings: z.array(z.string()).optional(),
    tips: z.array(z.string()).optional(),
  })),
  alternativeSolutions: z.string().optional().nullable(),
  imageUrl: z.string(),
  downloadCount: z.number().optional(),
});

export const insertTroubleshootingFlowSchema = z.object({
  type: z.string(),
  title: z.string(),
  description: z.string(),
  steps: z.array(z.object({
    id: z.string(),
    question: z.string(),
    answers: z.array(z.object({
      text: z.string(),
      nextStepId: z.string().optional(),
      solutionId: z.string().optional(),
    })),
  })),
});

export const insertDeviceComponentSchema = z.object({
  name: z.string(),
  description: z.string(),
  deviceType: z.string(),
  category: z.string(),
  safetyNotes: z.array(z.string()),
});

// Types
export type RepairGuide = typeof repairGuides.$inferSelect;
export type InsertRepairGuide = z.infer<typeof insertRepairGuideSchema>;

export type TroubleshootingFlow = typeof troubleshootingFlows.$inferSelect;
export type InsertTroubleshootingFlow = z.infer<typeof insertTroubleshootingFlowSchema>;

export type DeviceComponent = typeof deviceComponents.$inferSelect;
export type InsertDeviceComponent = z.infer<typeof insertDeviceComponentSchema>;

// Session storage table
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique().notNull(),
  password: text("password").notNull(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Favorites table
export const favorites = pgTable("favorites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  itemType: text("item_type").notNull(),
  itemId: varchar("item_id").notNull(),
  itemTitle: text("item_title").notNull(),
  itemImageUrl: text("item_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Device brands table
export const deviceBrands = pgTable("device_brands", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  deviceType: text("device_type").notNull(),
  logoUrl: varchar("logo_url"),
  supportLevel: varchar("support_level").notNull().default("community"),
  popularity: integer("popularity").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Device models table
export const deviceModels = pgTable("device_models", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  brandId: varchar("brand_id").notNull().references(() => deviceBrands.id),
  name: varchar("name").notNull(),
  series: varchar("series"),
  year: integer("year"),
  specifications: jsonb("specifications"),
  commonIssues: jsonb("common_issues").default(sql`'[]'::jsonb`),
  guideCount: integer("guide_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Guide compatibility table
export const guideCompatibility = pgTable("guide_compatibility", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  guideId: varchar("guide_id").notNull().references(() => repairGuides.id),
  modelId: varchar("model_id").notNull().references(() => deviceModels.id),
  compatibility: varchar("compatibility").notNull().default("compatible"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  profileImageUrl: z.string().optional().nullable(),
  role: z.string().optional().default("user"),
});

export const insertFavoriteSchema = z.object({
  itemType: z.string(),
  itemId: z.string(),
  itemTitle: z.string(),
  itemImageUrl: z.string().optional().nullable(),
});

export const insertDeviceBrandSchema = z.object({
  name: z.string(),
  deviceType: z.string(),
  logoUrl: z.string().optional().nullable(),
  supportLevel: z.string().default("community"),
  popularity: z.number().optional().default(0),
});

export const insertDeviceModelSchema = z.object({
  brandId: z.string(),
  name: z.string(),
  series: z.string().optional().nullable(),
  year: z.number().optional().nullable(),
  specifications: z.any().optional().nullable(),
  commonIssues: z.any().optional().nullable(),
  guideCount: z.number().optional().default(0),
});

export const insertGuideCompatibilitySchema = z.object({
  guideId: z.string(),
  modelId: z.string(),
  compatibility: z.string().default("compatible"),
  notes: z.string().optional().nullable(),
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
