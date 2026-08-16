var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server/index.ts
var import_express2 = __toESM(require("express"), 1);

// server/routes.ts
var import_http = require("http");
var import_fs2 = __toESM(require("fs"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_adm_zip = __toESM(require("adm-zip"), 1);

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  deviceBrands: () => deviceBrands,
  deviceComponents: () => deviceComponents,
  deviceModels: () => deviceModels,
  favorites: () => favorites,
  guideCompatibility: () => guideCompatibility,
  insertDeviceBrandSchema: () => insertDeviceBrandSchema,
  insertDeviceComponentSchema: () => insertDeviceComponentSchema,
  insertDeviceModelSchema: () => insertDeviceModelSchema,
  insertFavoriteSchema: () => insertFavoriteSchema,
  insertGuideCompatibilitySchema: () => insertGuideCompatibilitySchema,
  insertRepairGuideSchema: () => insertRepairGuideSchema,
  insertTroubleshootingFlowSchema: () => insertTroubleshootingFlowSchema,
  insertUserSchema: () => insertUserSchema,
  repairGuides: () => repairGuides,
  sessions: () => sessions,
  troubleshootingFlows: () => troubleshootingFlows,
  users: () => users
});
var import_drizzle_orm = require("drizzle-orm");
var import_pg_core = require("drizzle-orm/pg-core");
var import_zod = require("zod");
var repairGuides = (0, import_pg_core.pgTable)("repair_guides", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  title: (0, import_pg_core.text)("title").notNull(),
  description: (0, import_pg_core.text)("description").notNull(),
  deviceType: (0, import_pg_core.text)("device_type").notNull(),
  // "laptop" | "desktop"
  category: (0, import_pg_core.text)("category").notNull(),
  // "hardware" | "software" | "cleaning" | "upgrades"
  difficulty: (0, import_pg_core.text)("difficulty").notNull(),
  // "easy" | "medium" | "hard"
  estimatedTime: (0, import_pg_core.text)("estimated_time").notNull(),
  // "30-45 min"
  toolsRequired: (0, import_pg_core.json)("tools_required").$type().notNull(),
  safetyWarnings: (0, import_pg_core.json)("safety_warnings").$type().notNull(),
  steps: (0, import_pg_core.json)("steps").$type().notNull(),
  alternativeSolutions: (0, import_pg_core.text)("alternative_solutions"),
  imageUrl: (0, import_pg_core.text)("image_url").notNull(),
  viewCount: (0, import_pg_core.integer)("view_count").default(0),
  downloadCount: (0, import_pg_core.integer)("download_count").default(0),
  isBookmarked: (0, import_pg_core.boolean)("is_bookmarked").default(false)
});
var troubleshootingFlows = (0, import_pg_core.pgTable)("troubleshooting_flows", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  type: (0, import_pg_core.text)("type").notNull(),
  // "power" | "performance" | "display"
  title: (0, import_pg_core.text)("title").notNull(),
  description: (0, import_pg_core.text)("description").notNull(),
  steps: (0, import_pg_core.json)("steps").$type().notNull()
});
var deviceComponents = (0, import_pg_core.pgTable)("device_components", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  name: (0, import_pg_core.text)("name").notNull(),
  description: (0, import_pg_core.text)("description").notNull(),
  deviceType: (0, import_pg_core.text)("device_type").notNull(),
  category: (0, import_pg_core.text)("category").notNull(),
  safetyNotes: (0, import_pg_core.json)("safety_notes").$type().notNull()
});
var insertRepairGuideSchema = import_zod.z.object({
  title: import_zod.z.string(),
  description: import_zod.z.string(),
  deviceType: import_zod.z.string(),
  category: import_zod.z.string(),
  difficulty: import_zod.z.string(),
  estimatedTime: import_zod.z.string(),
  toolsRequired: import_zod.z.array(import_zod.z.string()),
  safetyWarnings: import_zod.z.array(import_zod.z.string()),
  steps: import_zod.z.array(import_zod.z.object({
    stepNumber: import_zod.z.number(),
    title: import_zod.z.string(),
    description: import_zod.z.string(),
    imageUrl: import_zod.z.string().optional(),
    phase: import_zod.z.string().optional(),
    subSteps: import_zod.z.array(import_zod.z.string()).optional(),
    torqueSpec: import_zod.z.string().optional(),
    toolRequired: import_zod.z.string().optional(),
    checkpoints: import_zod.z.array(import_zod.z.string()).optional(),
    notes: import_zod.z.array(import_zod.z.string()).optional(),
    warnings: import_zod.z.array(import_zod.z.string()).optional(),
    tips: import_zod.z.array(import_zod.z.string()).optional()
  })),
  alternativeSolutions: import_zod.z.string().optional().nullable(),
  imageUrl: import_zod.z.string(),
  downloadCount: import_zod.z.number().optional()
});
var insertTroubleshootingFlowSchema = import_zod.z.object({
  type: import_zod.z.string(),
  title: import_zod.z.string(),
  description: import_zod.z.string(),
  steps: import_zod.z.array(import_zod.z.object({
    id: import_zod.z.string(),
    question: import_zod.z.string(),
    answers: import_zod.z.array(import_zod.z.object({
      text: import_zod.z.string(),
      nextStepId: import_zod.z.string().optional(),
      solutionId: import_zod.z.string().optional()
    }))
  }))
});
var insertDeviceComponentSchema = import_zod.z.object({
  name: import_zod.z.string(),
  description: import_zod.z.string(),
  deviceType: import_zod.z.string(),
  category: import_zod.z.string(),
  safetyNotes: import_zod.z.array(import_zod.z.string())
});
var sessions = (0, import_pg_core.pgTable)(
  "sessions",
  {
    sid: (0, import_pg_core.varchar)("sid").primaryKey(),
    sess: (0, import_pg_core.jsonb)("sess").notNull(),
    expire: (0, import_pg_core.timestamp)("expire").notNull()
  },
  (table) => [(0, import_pg_core.index)("IDX_session_expire").on(table.expire)]
);
var users = (0, import_pg_core.pgTable)("users", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  email: (0, import_pg_core.varchar)("email").unique().notNull(),
  password: (0, import_pg_core.text)("password").notNull(),
  firstName: (0, import_pg_core.varchar)("first_name"),
  lastName: (0, import_pg_core.varchar)("last_name"),
  profileImageUrl: (0, import_pg_core.varchar)("profile_image_url"),
  role: (0, import_pg_core.varchar)("role").default("user"),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow(),
  updatedAt: (0, import_pg_core.timestamp)("updated_at").defaultNow()
});
var favorites = (0, import_pg_core.pgTable)("favorites", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  userId: (0, import_pg_core.varchar)("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  itemType: (0, import_pg_core.text)("item_type").notNull(),
  itemId: (0, import_pg_core.varchar)("item_id").notNull(),
  itemTitle: (0, import_pg_core.text)("item_title").notNull(),
  itemImageUrl: (0, import_pg_core.text)("item_image_url"),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
});
var deviceBrands = (0, import_pg_core.pgTable)("device_brands", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  name: (0, import_pg_core.varchar)("name").notNull(),
  deviceType: (0, import_pg_core.text)("device_type").notNull(),
  logoUrl: (0, import_pg_core.varchar)("logo_url"),
  supportLevel: (0, import_pg_core.varchar)("support_level").notNull().default("community"),
  popularity: (0, import_pg_core.integer)("popularity").default(0),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
});
var deviceModels = (0, import_pg_core.pgTable)("device_models", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  brandId: (0, import_pg_core.varchar)("brand_id").notNull().references(() => deviceBrands.id),
  name: (0, import_pg_core.varchar)("name").notNull(),
  series: (0, import_pg_core.varchar)("series"),
  year: (0, import_pg_core.integer)("year"),
  specifications: (0, import_pg_core.jsonb)("specifications"),
  commonIssues: (0, import_pg_core.jsonb)("common_issues").default(import_drizzle_orm.sql`'[]'::jsonb`),
  guideCount: (0, import_pg_core.integer)("guide_count").default(0),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
});
var guideCompatibility = (0, import_pg_core.pgTable)("guide_compatibility", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  guideId: (0, import_pg_core.varchar)("guide_id").notNull().references(() => repairGuides.id),
  modelId: (0, import_pg_core.varchar)("model_id").notNull().references(() => deviceModels.id),
  compatibility: (0, import_pg_core.varchar)("compatibility").notNull().default("compatible"),
  notes: (0, import_pg_core.text)("notes"),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
});
var insertUserSchema = import_zod.z.object({
  email: import_zod.z.string().email(),
  password: import_zod.z.string(),
  firstName: import_zod.z.string().optional().nullable(),
  lastName: import_zod.z.string().optional().nullable(),
  profileImageUrl: import_zod.z.string().optional().nullable(),
  role: import_zod.z.string().optional().default("user")
});
var insertFavoriteSchema = import_zod.z.object({
  itemType: import_zod.z.string(),
  itemId: import_zod.z.string(),
  itemTitle: import_zod.z.string(),
  itemImageUrl: import_zod.z.string().optional().nullable()
});
var insertDeviceBrandSchema = import_zod.z.object({
  name: import_zod.z.string(),
  deviceType: import_zod.z.string(),
  logoUrl: import_zod.z.string().optional().nullable(),
  supportLevel: import_zod.z.string().default("community"),
  popularity: import_zod.z.number().optional().default(0)
});
var insertDeviceModelSchema = import_zod.z.object({
  brandId: import_zod.z.string(),
  name: import_zod.z.string(),
  series: import_zod.z.string().optional().nullable(),
  year: import_zod.z.number().optional().nullable(),
  specifications: import_zod.z.any().optional().nullable(),
  commonIssues: import_zod.z.any().optional().nullable(),
  guideCount: import_zod.z.number().optional().default(0)
});
var insertGuideCompatibilitySchema = import_zod.z.object({
  guideId: import_zod.z.string(),
  modelId: import_zod.z.string(),
  compatibility: import_zod.z.string().default("compatible"),
  notes: import_zod.z.string().optional().nullable()
});

// server/db.ts
var import_serverless = require("@neondatabase/serverless");
var import_neon_serverless = require("drizzle-orm/neon-serverless");
var import_ws = __toESM(require("ws"), 1);
import_serverless.neonConfig.webSocketConstructor = import_ws.default;
var pool = process.env.DATABASE_URL ? new import_serverless.Pool({ connectionString: process.env.DATABASE_URL }) : null;
var db = pool ? (0, import_neon_serverless.drizzle)({ client: pool, schema: schema_exports }) : null;

// server/storage.ts
var import_drizzle_orm2 = require("drizzle-orm");
var import_bcrypt = __toESM(require("bcrypt"), 1);

// server/seed-data.ts
var curatedRepairGuides = [
  // ==========================================
  // HARDWARE CATEGORY (LAPTOP & DESKTOP)
  // ==========================================
  {
    title: "Laptop Screen & Display Panel Replacement",
    description: "Step-by-step technician procedure for disassembling the display bezel, disconnecting the 30/40-pin eDP cable, and mounting a replacement IPS or OLED screen panel.",
    deviceType: "laptop",
    category: "hardware",
    difficulty: "hard",
    estimatedTime: "45-60 min",
    toolsRequired: ["Phillips #00 Screwdriver", "Plastic Spudger / Prying Pick", "Anti-Static Tweezers", "Double-Sided Bezel Adhesive Strips", "ESD Wrist Strap"],
    safetyWarnings: [
      "Disconnect main battery and AC power before touching any display ribbon cables to prevent blowing the backlight fuse on the logic board.",
      "LCD/OLED panels are fragile glass substrates; never exert point pressure on corners.",
      "Discharge static electricity prior to handling the eDP ribbon connector."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Power Isolation & Battery Disconnection",
        description: "Shut down the laptop completely. Remove the bottom chassis cover screws and unplug the internal battery connector from the motherboard.",
        imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
        tips: ["Hold the power button for 15 seconds after disconnecting the battery to discharge residual board capacitance."]
      },
      {
        stepNumber: 2,
        title: "Display Bezel Separation",
        description: "Insert a thin plastic spudger between the bezel and the back cover starting at the top corner. Gently release the perimeter retention clips working downwards toward the hinges.",
        imageUrl: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800",
        warnings: ["Be careful near the integrated webcam and microphone array at the top center to avoid damaging the ribbon cable."]
      },
      {
        stepNumber: 3,
        title: "Screen Panel Removal & Cable Detachment",
        description: "Remove the four mounting screws or slowly pull the elastic adhesive pull-tabs. Carefully tilt the display panel forward and lift the metal locking bail on the 30-pin/40-pin eDP connector to slide it out.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
        notes: ["Inspect the connector pins under magnification for any oxidation or bent pins."]
      },
      {
        stepNumber: 4,
        title: "New Panel Installation & Alignment Test",
        description: "Align the new replacement panel, securely latch the eDP connector with adhesive tape, reconnect the battery for a quick post-test, and snap the bezel back into position.",
        imageUrl: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800",
        tips: ["Test backlight levels, refresh rate (e.g. 60Hz/120Hz/144Hz), and color calibration before applying final bezel adhesive."]
      }
    ],
    alternativeSolutions: "If external displays work through HDMI/DisplayPort, verify if the issue is a damaged LVDS/eDP cable rather than a cracked panel.",
    imageUrl: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800",
    viewCount: 1420,
    downloadCount: 380
  },
  {
    title: "Laptop Battery Replacement & Calibration",
    description: "Safely remove swollen or degraded lithium-ion polymer battery packs, install OEM-certified cells, and perform standard charging calibration cycles.",
    deviceType: "laptop",
    category: "hardware",
    difficulty: "easy",
    estimatedTime: "20-30 min",
    toolsRequired: ["Phillips #00 & Torx T5 Screwdrivers", "Plastic Opening Tool", "Safety Glasses", "Fire-Safe Disposal Container"],
    safetyWarnings: [
      "Never puncture, bend, or apply metallic tools to lithium polymer battery pouches.",
      "If the battery is swollen, do not compress it and work in a well-ventilated space."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Chassis Opening & Visual Inspection",
        description: "Remove bottom enclosure screws (noting varying screw lengths). Carefully pry off the cover to reveal the internal battery assembly.",
        imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Battery Cable Disconnection",
        description: "Gently disconnect the multi-pin battery wire harness from the motherboard socket using a plastic spudger pulling parallel to the board.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Cell Removal & New Pack Installation",
        description: "Remove battery bracket screws or pull release adhesive strips. Seat the fresh battery pack, screw down securely, and plug in the power harness.",
        imageUrl: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800",
        tips: ["Charge to 100% uninterrupted, then discharge to 5% before recharging to calibrate the battery gas gauge IC."]
      }
    ],
    alternativeSolutions: "Generate a Windows battery report (`powercfg /batteryreport`) or check macOS System Information to check actual cycle count and full charge capacity before replacing.",
    imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
    viewCount: 2150,
    downloadCount: 512
  },
  {
    title: "Desktop Dedicated GPU Installation & PCIe Reseating",
    description: "Install, upgrade, or reseat high-performance PCI Express graphics cards, including supplementary 8-pin / 12VHPWR PCIe power cabling and anti-sag bracket installation.",
    deviceType: "desktop",
    category: "hardware",
    difficulty: "easy",
    estimatedTime: "20-30 min",
    toolsRequired: ["Magnetic Phillips #2 Screwdriver", "PCIe Power Cables / 12VHPWR Adapter", "GPU Anti-Sag Support Bracket"],
    safetyWarnings: [
      "Switch off the PSU rocker switch and unplug the AC wall cable before opening desktop side panels.",
      "Ensure 12VHPWR connectors are seated 100% flush with zero gap to prevent connector overheating."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "PCIe Slot Preparation & Bracket Removal",
        description: "Unscrew and remove the rear expansion slot covers corresponding to your GPU width (typically 2 to 3.5 slots). Push open the motherboard PCIe slot retention latch.",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Inserting the Graphics Card",
        description: "Align the GPU with the top PCIe x16 slot (connected directly to CPU PCIe lanes) and press firmly downward until the retention latch clicks into place.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
        tips: ["Always use the topmost PCIe x16 slot for full bandwidth and minimal latency."]
      },
      {
        stepNumber: 3,
        title: "Securing Screws & Power Routing",
        description: "Secure the GPU bracket to the chassis frame with thumb screws. Connect dedicated PCIe 6+2 pin cables or 16-pin 12V-2x6 cable. Install the anti-sag bracket under the card corner.",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "If display output is absent, verify monitor DP/HDMI cable is connected directly to the GPU ports, NOT the motherboard I/O.",
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800",
    viewCount: 1890,
    downloadCount: 460
  },
  {
    title: "Desktop Power Supply (PSU) Replacement & Modular Cable Routing",
    description: "Replace faulty, buzzing, or under-powered desktop power supplies with modern ATX 3.0 / PCIe 5.0 certified modular units.",
    deviceType: "desktop",
    category: "hardware",
    difficulty: "medium",
    estimatedTime: "45-60 min",
    toolsRequired: ["Phillips #2 Screwdriver", "Velcro Cable Ties / Flush Cutters", "PSU Paperclip Jump Tester / Digital Tester"],
    safetyWarnings: [
      "NEVER open or disassemble the PSU internal metal housing; high-voltage capacitors hold lethal charge for days.",
      "NEVER mix modular cables between different PSU brands or models as pinouts vary and can fry components."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Unplugging Component Power Cables",
        description: "Disconnect the 24-pin Motherboard connector, 8-pin CPU EPS cables (top-left of motherboard), PCIe GPU power cables, and SATA/Molex peripherals.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "PSU Unmounting & Removal",
        description: "Remove the four mounting screws on the rear of the PC case. Slide the power supply unit out from the PSU basement or side chamber.",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "New PSU Setup & Reconnection",
        description: "Plug only the required modular cables into the new PSU, slide into the case with the intake fan facing the dust filter vent, secure with screws, and reconnect all motherboard and GPU headers.",
        imageUrl: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "Use a paperclip jump test (shorting green pin 16 to ground pin 17 on the 24-pin ATX connector) to verify fan spin before declaring a PSU dead.",
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
    viewCount: 1250,
    downloadCount: 310
  },
  {
    title: "Laptop Keyboard & Backlight Membrane Replacement",
    description: "Replace liquid-damaged, sticky, or missing laptop keyboard assemblies, including ribbon flex seating and riveted palmrest swaps.",
    deviceType: "laptop",
    category: "hardware",
    difficulty: "hard",
    estimatedTime: "60-90 min",
    toolsRequired: ["Phillips #00 Screwdriver", "Plastic Spudger", "Tweezers", "Hot Air Gun or Soldering Iron for plastic rivets (if applicable)"],
    safetyWarnings: [
      "Disconnect battery before unlatching keyboard ZIF (Zero Insertion Force) ribbon sockets.",
      "Work delicately around trackpad and keyboard ribbon cables to prevent tearing fragile copper traces."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Disassemble Bottom Cover & Internal Components",
        description: "Remove bottom cover, battery, cooling fans, and motherboard if the keyboard is mounted beneath the logic board tray.",
        imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Keyboard Plate Separation",
        description: "Unscrew keyboard retaining brackets or gently pry melted plastic retaining studs. Lift out the defective keyboard assembly.",
        imageUrl: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Install Replacement & Ribbon Seating",
        description: "Align the new keyboard into the palmrest frame, secure retention screws, and insert the data and backlight ribbon cables fully into the ZIF connectors before clamping the latch.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "For single stuck or broken keycaps, individual scissor switches and keycaps can often be replaced without removing the whole assembly.",
    imageUrl: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800",
    viewCount: 1680,
    downloadCount: 420
  },
  // ==========================================
  // SOFTWARE CATEGORY (LAPTOP & DESKTOP)
  // ==========================================
  {
    title: "Clean Windows 11 / Windows 10 OS Installation via UEFI USB",
    description: "Complete guide to creating a bootable GPT UEFI installation USB media, configuring BIOS Secure Boot / TPM 2.0, partitioning storage, and completing a clean OS deployment.",
    deviceType: "laptop",
    category: "software",
    difficulty: "medium",
    estimatedTime: "30-45 min",
    toolsRequired: ["8GB+ USB 3.0 Flash Drive", "Working PC for Media Creation Tool / Rufus", "Target Device"],
    safetyWarnings: [
      "A clean installation will erase all data on the target drive partition. Ensure critical files are backed up beforehand."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Prepare Bootable Media",
        description: "Download the official Microsoft Media Creation Tool or use Rufus to flash the Windows ISO onto a USB drive formatted with GPT partition scheme for UEFI target system.",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
        tips: ["Disable CSM (Compatibility Support Module) in BIOS for pure UEFI boot speed."]
      },
      {
        stepNumber: 2,
        title: "Configure BIOS/UEFI Settings",
        description: "Power on target system while tapping Boot Menu key (F12, F11, F8, or Esc depending on brand). Ensure Secure Boot and TPM 2.0 / fTPM are enabled in BIOS settings.",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Partition Drive & Run Setup",
        description: "Select 'Custom: Install Windows only (advanced)'. Delete old OEM/system partitions on Drive 0 until 'Unallocated Space' remains, select it, and click Next to let Windows configure EFI, MSR, and Primary NTFS partitions.",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 4,
        title: "Post-Install Drivers & Updates",
        description: "Run Windows Update until no pending updates remain. Install manufacturer chipset, GPU, audio, and Wi-Fi drivers.",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "If you want to keep files and applications, perform an In-Place Upgrade or Windows Reset ('Keep my files') via Settings > System > Recovery.",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    viewCount: 3100,
    downloadCount: 890
  },
  {
    title: "Blue Screen of Death (BSOD) Minidump Analysis & Driver Conflict Resolution",
    description: "Diagnose kernel stop codes (CRITICAL_PROCESS_DIED, WHEA_UNCORRECTABLE_ERROR, IRQL_NOT_LESS_OR_EQUAL, MEMORY_MANAGEMENT) using WinDbg and BlueScreenView.",
    deviceType: "desktop",
    category: "software",
    difficulty: "medium",
    estimatedTime: "25-40 min",
    toolsRequired: ["WinDbg (Windows Debugger)", "BlueScreenView / WhoCrashed", "Display Driver Uninstaller (DDU)"],
    safetyWarnings: [
      "Always reboot into Windows Safe Mode before running Display Driver Uninstaller (DDU) to prevent driver hook conflicts."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Locate Memory Dump Files",
        description: "Navigate to `C:\\Windows\\Minidump` to locate recent `.dmp` crash files generated during the Blue Screen event.",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Analyze Crash Stack with WinDbg",
        description: "Open the `.dmp` file in WinDbg and run the automated command `!analyze -v`. Inspect the `MODULE_NAME`, `FAULTING_IP`, and `PROCESS_NAME` to identify the failing driver (e.g. nvlddmkm.sys, ntoskrnl.exe, tcpip.sys).",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Clean Driver Reinstallation",
        description: "Boot into Safe Mode, run DDU to completely purge residual graphics or chipset driver files, reboot, and install clean WHQL-certified drivers from the manufacturer.",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "Run Windows Memory Diagnostic (`mdsched.exe`) or MemTest86 to rule out faulty physical RAM modules when MEMORY_MANAGEMENT stop codes occur.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    viewCount: 2450,
    downloadCount: 680
  },
  {
    title: "macOS Internet Recovery & Fresh Sequoia / Sonoma Installation",
    description: "Step-by-step procedure for Apple Silicon (M1/M2/M3) and Intel Macs to wipe APFS volumes and reinstall macOS cleanly via Recovery Mode.",
    deviceType: "laptop",
    category: "software",
    difficulty: "easy",
    estimatedTime: "40-60 min",
    toolsRequired: ["Reliable Wi-Fi or Ethernet connection", "Apple ID Credentials", "USB-C Power Adapter"],
    safetyWarnings: [
      "Ensure FileVault encryption recovery key or Apple ID password is on hand to bypass Activation Lock after erasing."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Enter Recovery Mode",
        description: "On Apple Silicon: Press and hold the power button until 'Loading startup options' appears, then select Options. On Intel Macs: Turn on and immediately hold Command (\u2318) + Option + R.",
        imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Format Drive in Disk Utility",
        description: "Open Disk Utility, select View > Show All Devices. Click the internal SSD (e.g. APPLE SSD), click Erase, set Format to APFS and Scheme to GUID Partition Map, and confirm erase.",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Reinstall macOS",
        description: "Quit Disk Utility, select 'Reinstall macOS', accept software terms, select the freshly formatted APFS container, and let the installer complete all download and restart phases.",
        imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "For enterprise deployments or fleet provisioning, build a bootable USB installer using the terminal command `createinstallmedia`.",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
    viewCount: 1980,
    downloadCount: 540
  },
  {
    title: "Windows DISM & SFC System File Integrity Repair",
    description: "Repair corrupt Windows system files, corrupted update components, and broken side-by-side component stores using command line administrative tools.",
    deviceType: "desktop",
    category: "software",
    difficulty: "easy",
    estimatedTime: "15-25 min",
    toolsRequired: ["Elevated Windows Terminal / Command Prompt (Admin)", "Active Internet Connection"],
    safetyWarnings: [
      "Do not power off or force reboot the computer while DISM /RestoreHealth is processing."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Run DISM Component Store Verification",
        description: "Open Terminal as Administrator. Run `DISM /Online /Cleanup-Image /ScanHealth` to check if component store corruption is detected.",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Execute DISM Repair",
        description: "Run `DISM /Online /Cleanup-Image /RestoreHealth`. Windows will download fresh system payload files from Windows Update servers to replace corrupted hashes.",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Execute System File Checker (SFC)",
        description: "Execute `sfc /scannow`. Verify the output reports 'Windows Resource Protection found corrupt files and successfully repaired them.' Reboot when done.",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "If DISM cannot find online sources, mount a Windows ISO and specify local source: `DISM /Online /Cleanup-Image /RestoreHealth /Source:wim:D:\\sources\\install.wim:1 /limitaccess`.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    viewCount: 1650,
    downloadCount: 470
  },
  // ==========================================
  // CLEANING CATEGORY (LAPTOP & DESKTOP)
  // ==========================================
  {
    title: "High-Performance CPU & GPU Thermal Paste Repaste",
    description: "Remove degraded, crusty factory thermal interface material (TIM) and apply premium non-conductive thermal paste (Arctic MX-6, Noctua NT-H2, Thermal Grizzly Kryonaut) for 10-25\xB0C temperature drops.",
    deviceType: "laptop",
    category: "cleaning",
    difficulty: "medium",
    estimatedTime: "30-45 min",
    toolsRequired: ["99% Isopropyl Alcohol (IPA)", "Lint-Free Microfiber Cloth / Coffee Filters", "Thermal Paste Tube", "Phillips / Torx Screwdrivers", "Plastic Spudger"],
    safetyWarnings: [
      "Use only non-conductive thermal compounds on exposed silicon dies; do not use liquid metal unless direct nickel coating is confirmed.",
      "Tighten heatsink screws in diagonal numbered order (1-2-3-4) to ensure even mounting pressure and prevent die cracking."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Remove Cooler & Heatsink Assembly",
        description: "Loosen heatsink spring screws in reverse diagonal order (4-3-2-1). Gently twist the copper vapor chamber/heatsink to break the vacuum seal before lifting.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Clean Old Thermal Compound",
        description: "Apply 99% IPA to a lint-free cloth and gently wipe old dried paste off the CPU/GPU silicon dies and copper coldplate until both surfaces are mirrored and residue-free.",
        imageUrl: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800",
        tips: ["Inspect thermal putty / pads on VRAM chips and VRM inductors; replace if torn or dried out."]
      },
      {
        stepNumber: 3,
        title: "Apply Fresh Paste & Remount Heatsink",
        description: "Apply a pea-sized dot (or thin X-pattern for bare direct-die laptop CPUs) of thermal paste. Lower the heatsink flat and tighten screws in numbered diagonal order (1 to 4).",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "Consider phase-change thermal pads (e.g. Honeywell PTM7950) for long-lasting laptop thermal stability without pump-out degradation.",
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
    viewCount: 2890,
    downloadCount: 750
  },
  {
    title: "Desktop Case & Power Supply Dust Filter Decontamination",
    description: "Deep clean dusty radiator fins, fan blades, PSU mesh intakes, and chassis air filters to eliminate thermal throttling and acoustic fan whine.",
    deviceType: "desktop",
    category: "cleaning",
    difficulty: "easy",
    estimatedTime: "20-30 min",
    toolsRequired: ["Electric Compressed Air Duster", "Soft Bristle Anti-Static Brush", "99% Isopropyl Alcohol", "Microfiber Towels"],
    safetyWarnings: [
      "Always hold fan blades stationary with a finger or zip-tie while blowing compressed air to prevent over-spinning the bearing and generating back-EMF voltage into the motherboard fan header."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Remove Magnetic Mesh Filters",
        description: "Slide out top, front, and bottom PSU dust filters. Rinse under warm water and allow to dry completely, or blow clean with electric duster.",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Clean Radiators & Fan Blades",
        description: "Hold each fan blade in place while blowing compressed air through the radiator fins from inside-out. Use an anti-static brush to dislodge stubborn cake on leading blade edges.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Motherboard & GPU Shroud Wipedown",
        description: "Gently wipe PCB flat surfaces and GPU backplate with a lightly dampened microfiber cloth (99% IPA). Reassemble dust filters once 100% dry.",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "Perform this maintenance once every 6 months to maintain optimum thermal headroom and extend hardware longevity.",
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800",
    viewCount: 1430,
    downloadCount: 390
  },
  {
    title: "Liquid Spill Emergency Protocol & Ultrasonic Board Cleaning",
    description: "Immediate emergency protocol for laptops or keyboards exposed to coffee, water, soda, or juice to prevent galvanic corrosion and short circuits.",
    deviceType: "laptop",
    category: "cleaning",
    difficulty: "hard",
    estimatedTime: "90-120 min",
    toolsRequired: ["99% Isopropyl Alcohol", "Ultrasonic Cleaner / Soft ESD Toothbrush", "Distilled Water", "Silica Gel Drying Packets"],
    safetyWarnings: [
      "NEVER connect power or attempt to boot a liquid-damaged laptop until all internal traces are completely dehydrated and deoxidized.",
      "DO NOT use rice; starch dust enters cooling vents and causes further mechanical damage."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Immediate Power Cut & Inversion",
        description: "Force shutdown immediately (hold power 10s), unplug AC adapter, flip laptop into a tent position over a towel, and disconnect battery immediately.",
        imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Motherboard Extraction & Inspection",
        description: "Disassemble the entire motherboard. Inspect under magnification for green/white copper oxidation and sugar/soda residue around SMD capacitors and ICs.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "IPA Wash & Dehydration",
        description: "Submerge board in 99% anhydrous Isopropyl Alcohol or ultrasonic bath to displace moisture and dissolve sticky residues. Dry in a heated dehydrator at 50\xB0C for 4 hours.",
        imageUrl: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "Test individual power rails (3.3V, 5V, 1.8V, VCORE) with a digital multimeter before reassembling the full chassis.",
    imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
    viewCount: 2210,
    downloadCount: 620
  },
  // ==========================================
  // UPGRADES CATEGORY (LAPTOP & DESKTOP)
  // ==========================================
  {
    title: "M.2 NVMe PCIe Gen4/Gen5 SSD Installation & OS Migration",
    description: "Upgrade slow hard drives or small SSDs to ultra-fast M.2 NVMe solid state drives, including sector-by-sector cloning and heatsink mounting.",
    deviceType: "laptop",
    category: "upgrades",
    difficulty: "easy",
    estimatedTime: "25-35 min",
    toolsRequired: ["Phillips #00 Screwdriver", "M.2 Mounting Standoff & Screw", "USB to NVMe Enclosure (for cloning)", "Cloning Software (Macrium Reflect / Clonezilla)"],
    safetyWarnings: [
      "Always ground yourself before touching naked flash memory chips to prevent ESD damage.",
      "Insert M.2 drives at a 30-degree angle; do not force straight horizontally."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Clone Existing Drive (Optional)",
        description: "Insert the new NVMe drive into an external USB enclosure. Run Macrium Reflect or Clonezilla to clone all partitions including EFI and Recovery sectors.",
        imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Access M.2 PCIe Slot",
        description: "Remove bottom cover/case side panel. Locate the M.2 2280 Key-M slot. Remove existing screw or thermal shield plate.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Install & Fasten NVMe Drive",
        description: "Insert the SSD at a 30-degree angle until pins are fully seated in the slot. Press down gently and fasten the M.2 retaining screw. Reapply thermal pad and heat shield.",
        imageUrl: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800",
        tips: ["Peel off the protective plastic film from the motherboard M.2 thermal pad before screwing down the heatsink."]
      }
    ],
    alternativeSolutions: "If BIOS doesn't detect the new drive, verify that SATA/NVMe mode is set to AHCI / NVMe rather than legacy RAID/RST.",
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
    viewCount: 3450,
    downloadCount: 980
  },
  {
    title: "Dual-Channel DDR5 / DDR4 RAM Capacity & Speed Expansion",
    description: "Install matched SODIMM (Laptop) or DIMM (Desktop) RAM kits to unlock dual-channel memory bandwidth, and enable XMP/EXPO profiles in BIOS for maximum FPS.",
    deviceType: "desktop",
    category: "upgrades",
    difficulty: "easy",
    estimatedTime: "15-20 min",
    toolsRequired: ["Anti-Static Wrist Strap", "Phillips Screwdriver (if desktop case requires)"],
    safetyWarnings: [
      "Handle memory sticks by the outer PCB edges only; never touch the gold contact fingers."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Identify Optimal Memory Channels",
        description: "On 4-slot desktop motherboards, install two memory sticks into slots A2 and B2 (slots 2 and 4 from the CPU) for optimal signal integrity.",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Slotting the Memory Sticks",
        description: "Open the slot retention clips. Align the key notch on the RAM stick with the slot ridge. Press down firmly on both edges until both latches snap shut automatically.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Enable XMP / EXPO in BIOS",
        description: "Power on, enter BIOS (Del / F2), locate Extreme Memory Profile (XMP) or AMD EXPO, enable Profile 1, save and exit to run at full advertised MHz (e.g. 6000MHz CL30).",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "Check Task Manager > Performance > Memory to confirm configured speed and that 'Slots used: 2 of 4' and 'Dual Channel' are active.",
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800",
    viewCount: 2780,
    downloadCount: 710
  },
  {
    title: "Wi-Fi 6E / Wi-Fi 7 M.2 Tri-Band Card & Bluetooth 5.4 Upgrade",
    description: "Swap legacy 802.11ac Wi-Fi cards for Intel AX210 / BE200 Wi-Fi 7 modules for 6GHz spectrum access, lower latency, and Bluetooth 5.4 audio.",
    deviceType: "laptop",
    category: "upgrades",
    difficulty: "medium",
    estimatedTime: "20-30 min",
    toolsRequired: ["Phillips #00 Screwdriver", "Plastic Spudger / Tweezers for U.FL Antenna Connectors"],
    safetyWarnings: [
      "U.FL IPEX micro antenna snap connectors are delicate; apply vertical pressure directly above the post to avoid crushing the gold pin."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Locate Existing WLAN Module",
        description: "Disconnect laptop battery. Locate the M.2 2230 WLAN card, usually near the cooling fans or SSD.",
        imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Disconnect Antennas & Card Swap",
        description: "Carefully pop off the Main (Black) and Aux (White) U.FL antenna cables using plastic tweezers. Remove the mounting screw and slide out old card.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Install New Module & Snap Antennas",
        description: "Insert new Wi-Fi 6E/7 card, screw down, and snap the antenna connectors firmly onto the corresponding Main and Aux posts. Install Intel WLAN and Bluetooth drivers.",
        imageUrl: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "Download latest Wi-Fi drivers onto a USB flash drive BEFORE swapping the card to prevent being left without network access.",
    imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
    viewCount: 1720,
    downloadCount: 440
  },
  {
    title: "Desktop All-in-One (AIO) 360mm Liquid CPU Cooler Installation",
    description: "Install high-performance 240mm or 360mm AIO liquid coolers on Intel LGA1700/1851 and AMD Socket AM5/AM4 processors for maximum thermal headroom.",
    deviceType: "desktop",
    category: "upgrades",
    difficulty: "medium",
    estimatedTime: "45-60 min",
    toolsRequired: ["Phillips #2 Screwdriver", "AIO Mounting Hardware & Backplate", "Thermal Paste (if not pre-applied)", "Fan Splitter / ARGB Hub"],
    safetyWarnings: [
      "CRITICAL: Always remember to peel off the clear plastic protective sticker from the AIO copper cold plate before mounting to CPU.",
      "Mount the radiator above the pump level (e.g. top exhaust) to prevent air bubbles from getting trapped in the pump chamber."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Install Motherboard Backplate & Standoffs",
        description: "Fit the socket-specific backplate (Intel LGA1700 or AMD AM5 bracket) and hand-tighten the four double-threaded standoffs into the bracket holes.",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Mount Radiator & Fans to Case",
        description: "Fasten the 120mm fans to the radiator in push orientation, then mount the radiator assembly to the top or front case bracket using long radiator screws.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Mount Pump Block & Cable Connections",
        description: "Peel protective film from copper coldplate, place pump block over the CPU, hand-tighten spring thumbscrews in diagonal X-pattern, and plug the pump tach wire into the `AIO_PUMP` or `CPU_FAN` header.",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "Set the pump speed to 100% constant PWM in BIOS for optimal coolant circulation and whisper-quiet operation.",
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800",
    viewCount: 2190,
    downloadCount: 580
  }
];
var comprehensiveTroubleshootingFlows = [
  {
    category: "power",
    title: "Device Fails to Power On / No POST Diagnostics",
    description: "Systematic diagnostic workflow to isolate AC adapter failure, drained CMOS battery, shorted motherboard power rail, or bad RAM modules.",
    steps: [
      {
        stepNumber: 1,
        description: "Does the power indicator LED light up or blink when connecting the AC charger?",
        solutions: ["Perform a hard CMOS battery reset", "Test with a known-good AC power adapter", "Check DC-in power jack for physical damage or loose solder joints"]
      },
      {
        stepNumber: 2,
        description: "Do cooling fans spin, but the screen stays completely black with no BIOS splash screen?",
        solutions: ["Reseat RAM modules one at a time", "Connect external monitor via HDMI to rule out display panel fault", "Clear motherboard RTC clock CMOS jumper"]
      },
      {
        stepNumber: 3,
        description: "Does the system immediately shut down after 2-5 seconds of powering on?",
        solutions: ["Inspect CPU cooler mounting pressure and thermal paste", "Disconnect all non-essential USB and PCIe peripherals to test minimal POST", "Check motherboard VRM power delivery"]
      }
    ]
  },
  {
    category: "performance",
    title: "Thermal Throttling & Severe Fan Noise Diagnostics",
    description: "Identify whether system slowdowns are caused by clogged heatsink fins, dried thermal paste, background crypto-miners, or failing fan bearings.",
    steps: [
      {
        stepNumber: 1,
        description: "Are CPU or GPU temperatures exceeding 90\xB0C under light to moderate workloads?",
        solutions: ["Repaste CPU and GPU with Arctic MX-6 / Noctua thermal paste", "Blow compressed air through radiator exhaust fins to remove dust buildup", "Check fan RPM speed curves in BIOS or OEM management software"]
      },
      {
        stepNumber: 2,
        description: "Is CPU usage staying at 100% in Task Manager even when idle on desktop?",
        solutions: ["Perform full Malwarebytes and Windows Defender offline scans", "Check Task Manager for rogue background processes (e.g. Windows Search indexer, crypto-miners)", "Run DISM and SFC file integrity scans"]
      }
    ]
  },
  {
    category: "display",
    title: "Display Artifacts, Flickering & Black Screen Troubleshooting",
    description: "Determine if visual glitches, lines, or flickering originate from GPU driver corruption, loose eDP display cables, or cracked panel matrices.",
    steps: [
      {
        stepNumber: 1,
        description: "Do horizontal/vertical lines or flickering change when you move the laptop display hinge back and forth?",
        solutions: ["Reseat or replace the eDP/LVDS display ribbon cable", "Inspect display hinge tension brackets for pinching the cable bundle"]
      },
      {
        stepNumber: 2,
        description: "Do colorful checkerboard artifacts or crashes occur primarily inside 3D games or GPU workloads?",
        solutions: ["Perform clean GPU driver reinstallation using DDU in Safe Mode", "Check GPU VRAM temperatures and lower memory overclock", "Verify PCIe power cable seating"]
      }
    ]
  }
];
var comprehensiveDeviceComponents = [
  {
    name: "M.2 NVMe SSD",
    description: "High-speed solid state drive utilizing PCI Express lanes and NVMe communication protocol for speeds up to 7,500 MB/s.",
    deviceType: "laptop",
    componentType: "storage",
    commonIssues: ["Read-only mode after endurance depletion", "Thermal throttling under heavy writes", "Unformatted RAW partition"],
    replacementDifficulty: "easy",
    averageCost: "$45-180",
    toolsRequired: ["Phillips #00 screwdriver", "Thermal pad"],
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "SODIMM DDR5 RAM Module",
    description: "Compact dual-inline memory module for laptops and mini-PCs with on-die ECC and dual 32-bit sub-channels.",
    deviceType: "laptop",
    componentType: "memory",
    commonIssues: ["BSOD MEMORY_MANAGEMENT", "Unseated latch causing no-POST black screen", "Intermittent freezes"],
    replacementDifficulty: "easy",
    averageCost: "$35-120",
    toolsRequired: ["Plastic spudger", "Anti-static wrist strap"],
    imageUrl: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Dedicated PCIe Graphics Card (GPU)",
    description: "High-performance graphics accelerator card for rendering 3D graphics, gaming, machine learning, and multi-display outputs.",
    deviceType: "desktop",
    componentType: "graphics",
    commonIssues: ["Artifacting / VRAM corruption", "Driver timeout / TDR crashes", "Fan bearing noise"],
    replacementDifficulty: "easy",
    averageCost: "$250-1600",
    toolsRequired: ["Phillips #2 screwdriver", "PCIe power cables", "Anti-sag bracket"],
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "ATX Modular Power Supply Unit (PSU)",
    description: "High-efficiency 80+ Gold / Platinum power supply converting 115V/230V AC to stable +12V, +5V, and +3.3V DC rails.",
    deviceType: "desktop",
    componentType: "power",
    commonIssues: ["Instant shutdown under GPU transient spikes", "No 5VSB standby power", "Coil whine"],
    replacementDifficulty: "medium",
    averageCost: "$70-250",
    toolsRequired: ["Phillips #2 screwdriver", "Modular cable kit"],
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Liquid Crystal / OLED Display Assembly",
    description: "High-resolution laptop display panel offering 100% sRGB/DCI-P3 color gamut with eDP connection.",
    deviceType: "laptop",
    componentType: "display",
    commonIssues: ["Cracked glass matrix", "Backlight bleed", "Dead pixels", "eDP cable micro-fractures"],
    replacementDifficulty: "hard",
    averageCost: "$60-220",
    toolsRequired: ["Plastic prying picks", "Phillips #00", "Bezel adhesive strips"],
    imageUrl: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800"
  }
];
var IMAGES = {
  screenTeardown1: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
  screenTeardown2: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
  screenTeardown3: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800",
  logicBoard: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
  battery: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800",
  soldering: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
  biosScreen: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
  terminal: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
  osRecovery: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
  thermalPaste: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
  cleaningBlower: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800",
  ultrasonic: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800",
  nvmeSSD: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
  ramModule: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800",
  gpuAio: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800",
  desktopRig: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800"
};
var guideTemplates = [
  {
    category: "hardware",
    titleSuffix: "OLED/IPS Screen & Hinge Assembly Replacement",
    descSuffix: "Complete teardown procedure to disconnect eDP display cabling, unbolt magnesium hinge brackets, and install a brand-new factory display panel.",
    difficulty: "hard",
    estimatedTime: "45-60 min",
    tools: ["Phillips #00 Screwdriver", "Torx T5 Bit", "Plastic Spudger", "Pre-cut Bezel Adhesive Tape", "Anti-Static Wrist Strap"],
    warnings: ["Disconnect the main battery before touching internal display ribbon cables.", "Handle replacement display glass by perimeter edges only."],
    steps: [
      {
        stepNumber: 1,
        title: "Power Isolation & Battery Disconnection",
        description: "Remove bottom enclosure screws and disconnect internal battery harness from the logic board to prevent backlight circuit shorting.",
        imageUrl: IMAGES.screenTeardown1
      },
      {
        stepNumber: 2,
        title: "Display Hinge Bracket Unbolting",
        description: "Unscrew the left and right steel hinge anchor bolts and unroute Wi-Fi and webcam antenna cables from cable channels.",
        imageUrl: IMAGES.screenTeardown2
      },
      {
        stepNumber: 3,
        title: "Screen Bezel Separation & Panel Swap",
        description: "Gently pry bezel clips with a thin guitar pick, disconnect the 30/40-pin eDP connector, mount the new panel, and secure with fresh adhesive.",
        imageUrl: IMAGES.screenTeardown3
      }
    ],
    imageUrl: IMAGES.screenTeardown3
  },
  {
    category: "hardware",
    titleSuffix: "Motherboard & VRM Power Delivery Replacement",
    descSuffix: "Comprehensive logic board replacement, port realignment, and heatsink mounting procedure for technician-level system restoration.",
    difficulty: "hard",
    estimatedTime: "60-90 min",
    tools: ["Precision Screwdriver Kit", "Thermal Paste (Arctic MX-6)", "ESD Mat", "Magnetic Screw Tray"],
    warnings: ["Ground yourself on an ESD mat.", "Track all varying screw lengths carefully to prevent through-board chassis damage."],
    steps: [
      {
        stepNumber: 1,
        title: "Sub-assembly Removal",
        description: "Extract battery, cooling assembly, NVMe SSDs, Wi-Fi module, and disconnect all peripheral ribbon cables.",
        imageUrl: IMAGES.screenTeardown1
      },
      {
        stepNumber: 2,
        title: "Logic Board Extraction",
        description: "Unscrew logic board standoff screws, ease I/O ports out of chassis cutouts, and transfer TPM/CPU components as needed.",
        imageUrl: IMAGES.logicBoard
      },
      {
        stepNumber: 3,
        title: "New Board Installation & Post-Test",
        description: "Seat the replacement motherboard, reapply thermal compound, reconnect all flex cables, and verify POST in diagnostic mode.",
        imageUrl: IMAGES.soldering
      }
    ],
    imageUrl: IMAGES.logicBoard
  },
  {
    category: "hardware",
    titleSuffix: "OEM Battery Pack Replacement & BMS Calibration",
    descSuffix: "Safely remove degraded or swollen lithium-ion pouch cells, route new OEM battery harness, and execute charging calibration cycle.",
    difficulty: "easy",
    estimatedTime: "20-30 min",
    tools: ["Phillips #00 Screwdriver", "Plastic Pry Pick", "Safety Glasses", "Battery Adhesive Pull Tabs"],
    warnings: ["Never bend, puncture, or apply metal tools to lithium-polymer battery packs.", "Discharge battery below 25% prior to disassembly."],
    steps: [
      {
        stepNumber: 1,
        title: "Bottom Cover Removal",
        description: "Remove perimeter fasteners and release bottom casing to expose the internal battery compartment.",
        imageUrl: IMAGES.screenTeardown1
      },
      {
        stepNumber: 2,
        title: "Battery Connector & Adhesive Release",
        description: "Unplug the battery data/power harness from the motherboard. Slowly pull the stretch-release adhesive strips parallel to the chassis.",
        imageUrl: IMAGES.battery
      },
      {
        stepNumber: 3,
        title: "New Cell Installation & BMS Cycling",
        description: "Mount new OEM pack, connect ribbon securely, screw down brackets, and charge continuously to 100% followed by full discharge.",
        imageUrl: IMAGES.battery
      }
    ],
    imageUrl: IMAGES.battery
  },
  {
    category: "hardware",
    titleSuffix: "DC-In Power Jack & USB-C Port Board Replacement",
    descSuffix: "Diagnose intermittent charging and replace fractured DC-in power harness or daughterboard USB-C charging receptacles.",
    difficulty: "medium",
    estimatedTime: "35-45 min",
    tools: ["Torx T5 / Phillips #00", "Digital Multimeter", "Spudger", "Tweezers"],
    warnings: ["Verify absence of residual 19V/20V capacitor charge before touching port solder pads."],
    steps: [
      {
        stepNumber: 1,
        title: "Port Accessibility Isolation",
        description: "Disconnect internal battery, lift the left/right hinge bracket covering the charging port, and remove cable retention brackets.",
        imageUrl: IMAGES.screenTeardown2
      },
      {
        stepNumber: 2,
        title: "Port Harness Detachment",
        description: "Unplug the DC-in braided cable harness from the motherboard header or unbolt the modular Type-C daughterboard.",
        imageUrl: IMAGES.soldering
      },
      {
        stepNumber: 3,
        title: "Reassembly & Voltage Verification",
        description: "Install fresh OEM port module, secure hinge bolts to manufacturer torque specs, and probe 20V rail with multimeter.",
        imageUrl: IMAGES.logicBoard
      }
    ],
    imageUrl: IMAGES.soldering
  },
  {
    category: "hardware",
    titleSuffix: "Dual Cooling Fan & Copper Heatpipe Module Overhaul",
    descSuffix: "Replace noisy, rattling, or seized CPU/GPU blower fans and re-torque copper vapor chamber heatsink assembly.",
    difficulty: "medium",
    estimatedTime: "30-40 min",
    tools: ["Phillips #00 Screwdriver", "Thermal Paste", "Micro-Tweezers", "Can of Compressed Air"],
    warnings: ["Tighten heatsink screws in stamped numerical order (1 -> 2 -> 3 -> 4) to ensure uniform die pressure."],
    steps: [
      {
        stepNumber: 1,
        title: "Cooling Shroud Removal",
        description: "Disconnect 4-pin PWM fan headers, remove perimeter heatsink screws in reverse order, and lift copper assembly away from dies.",
        imageUrl: IMAGES.thermalPaste
      },
      {
        stepNumber: 2,
        title: "Blower Impeller Swap",
        description: "Unscrew fan motor brackets from heatpipe radiator fins and mount brand-new fluid-dynamic bearing fan units.",
        imageUrl: IMAGES.cleaningBlower
      },
      {
        stepNumber: 3,
        title: "Paste Refresh & Sequential Torque",
        description: "Wipe dies clean with 99% IPA, apply high-viscosity thermal paste, fasten screws sequentially, and plug in fan headers.",
        imageUrl: IMAGES.thermalPaste
      }
    ],
    imageUrl: IMAGES.thermalPaste
  },
  // SOFTWARE
  {
    category: "software",
    titleSuffix: "UEFI / BIOS Firmware Recovery & Crisis Flash Protocol",
    descSuffix: "Step-by-step procedure to flash, recover, or clear corrupted UEFI BIOS firmware using USB FlashBack or emergency key combinations.",
    difficulty: "medium",
    estimatedTime: "20-30 min",
    tools: ["FAT32 Formatted USB Flash Drive", "OEM BIOS Firmware File", "Stable AC Power Source"],
    warnings: ["NEVER unplug power or reboot while the firmware EEPROM is writing.", "Ensure battery has at least 50% charge before starting."],
    steps: [
      {
        stepNumber: 1,
        title: "Prepare Flash Drive",
        description: "Format USB drive to FAT32 with MBR partition scheme. Download latest verified OEM BIOS file and rename to the required hardware flashback string if using blind USB flash.",
        imageUrl: IMAGES.biosScreen
      },
      {
        stepNumber: 2,
        title: "Initiate BIOS Update Environment",
        description: "Boot into BIOS Setup (tap F2/Del) and open the built-in flash utility (EZ Flash / Q-Flash / M-Flash / Dell BIOS Update) or hold the chassis FlashBack button.",
        imageUrl: IMAGES.osRecovery
      },
      {
        stepNumber: 3,
        title: "Execute ROM Write & Reset CMOS",
        description: "Confirm ROM validation checksum. Allow the system to flash blocks 0-100% and reboot automatically into the updated microcode environment.",
        imageUrl: IMAGES.biosScreen
      }
    ],
    imageUrl: IMAGES.biosScreen
  },
  {
    category: "software",
    titleSuffix: "EFI Bootloader & BCD Partition Reconstruction",
    descSuffix: "Resolve 'No Bootable Device Found' and 0xc000000e boot errors by rebuilding the EFI system partition and Windows Boot Configuration Data.",
    difficulty: "medium",
    estimatedTime: "25-35 min",
    tools: ["Windows Recovery USB Media", "Command Prompt Environment"],
    warnings: ["Verify disk volume numbers with `diskpart` carefully before formatting any partition."],
    steps: [
      {
        stepNumber: 1,
        title: "Boot Recovery Environment",
        description: "Boot from Windows Recovery Media > Repair your computer > Troubleshoot > Advanced Options > Command Prompt.",
        imageUrl: IMAGES.terminal
      },
      {
        stepNumber: 2,
        title: "Assign Drive Letter to EFI Partition",
        description: "Run `diskpart`, `list volume`, select the ~100MB FAT32 system partition, run `assign letter=S:`, and exit diskpart.",
        imageUrl: IMAGES.osRecovery
      },
      {
        stepNumber: 3,
        title: "Rebuild BCD Store",
        description: "Execute `bcdboot C:\\Windows /s S: /f UEFI` to generate fresh UEFI boot files, and reboot.",
        imageUrl: IMAGES.terminal
      }
    ],
    imageUrl: IMAGES.terminal
  },
  {
    category: "software",
    titleSuffix: "BSOD Kernel Triage & Clean OS Driver Reinstallation",
    descSuffix: "Isolate recurring WHEA_UNCORRECTABLE_ERROR, IRQL_NOT_LESS_OR_EQUAL stop codes and perform clean DDU driver wipes in Safe Mode.",
    difficulty: "easy",
    estimatedTime: "20-30 min",
    tools: ["Display Driver Uninstaller (DDU)", "OEM WHQL Driver Package", "Safe Mode Boot Option"],
    warnings: ["Disconnect internet cable during DDU reinstallation to prevent Windows Update from installing generic drivers."],
    steps: [
      {
        stepNumber: 1,
        title: "Boot Safe Mode Without Networking",
        description: "Hold Shift while clicking Restart > Troubleshoot > Advanced Options > Startup Settings > Restart > Press 4 for Safe Mode.",
        imageUrl: IMAGES.osRecovery
      },
      {
        stepNumber: 2,
        title: "Run DDU Clean and Restart",
        description: "Launch Display Driver Uninstaller, select GPU (NVIDIA/AMD/Intel), click 'Clean and restart' to wipe registry keys and display caches.",
        imageUrl: IMAGES.terminal
      },
      {
        stepNumber: 3,
        title: "Install Clean WHQL Drivers",
        description: "Boot back to normal desktop, install official OEM driver package with Clean Install checked, and verify thermal sensors.",
        imageUrl: IMAGES.osRecovery
      }
    ],
    imageUrl: IMAGES.osRecovery
  },
  {
    category: "software",
    titleSuffix: "Secure Boot, TPM 2.0 & BitLocker State Restoration",
    descSuffix: "Re-initialize hardware TPM 2.0 security chips, resolve BitLocker recovery loops, and configure UEFI Secure Boot key databases.",
    difficulty: "medium",
    estimatedTime: "20-25 min",
    tools: ["BitLocker 48-digit Recovery Key", "BIOS Security Menu Access"],
    warnings: ["Ensure you have your 48-digit BitLocker key backed up before clearing TPM keys."],
    steps: [
      {
        stepNumber: 1,
        title: "BIOS Security Configuration",
        description: "Enter UEFI BIOS > Security > Intel PTT / AMD fTPM > Enable. Verify Secure Boot is set to Standard mode with factory default keys.",
        imageUrl: IMAGES.biosScreen
      },
      {
        stepNumber: 2,
        title: "Clear TPM / PTT State",
        description: "If system is stuck in an authentication loop, select 'Clear TPM' in BIOS and confirm cryptographic key reset.",
        imageUrl: IMAGES.terminal
      },
      {
        stepNumber: 3,
        title: "Windows Hello & PIN Re-enrollment",
        description: "Enter the BitLocker recovery key once, boot to Windows, and reconfigure your Windows Hello PIN and biometric fingerprint data.",
        imageUrl: IMAGES.osRecovery
      }
    ],
    imageUrl: IMAGES.biosScreen
  },
  // CLEANING
  {
    category: "cleaning",
    titleSuffix: "Thermal Module Deep Clean & Phase-Change Repasting",
    descSuffix: "Dissolve dried factory thermal interface material, clean copper heatsink fins, lubricate cooling fan bearings, and reapply high-performance TIM.",
    difficulty: "medium",
    estimatedTime: "30-45 min",
    tools: ["99% Isopropyl Alcohol", "Microfiber Cloths", "Thermal Paste / PTM7950", "Electric Compressed Air Blower", "Soft Brush"],
    warnings: ["Do not allow fan impellers to free-spin while blasting air.", "Tighten heatsink screws strictly in sequential order (1-2-3-4)."],
    steps: [
      {
        stepNumber: 1,
        title: "Cooler Removal & Fan Extraction",
        description: "Unscrew cooling module retaining screws in reverse order. Gently lift the copper assembly away from the CPU and GPU dies.",
        imageUrl: IMAGES.thermalPaste
      },
      {
        stepNumber: 2,
        title: "Chemical De-greasing & Radiator Fluff Removal",
        description: "Clean old crusty paste using 99% IPA until mirror finish. Blow pressurized air through the exhaust fin channels from the outside in.",
        imageUrl: IMAGES.cleaningBlower
      },
      {
        stepNumber: 3,
        title: "Reapplication & Reseating",
        description: "Apply fresh thermal compound, re-position the heatsink flat against the dies, tighten screws sequentially, and reconnect fan headers.",
        imageUrl: IMAGES.thermalPaste
      }
    ],
    imageUrl: IMAGES.thermalPaste
  },
  {
    category: "cleaning",
    titleSuffix: "Ultrasonic Bath & Liquid Spill Corrosion Decontamination",
    descSuffix: "Rescue water, coffee, or soda damaged motherboards through ultrasonic cleaning in 99% anhydrous alcohol and PCB baking.",
    difficulty: "hard",
    estimatedTime: "90-120 min",
    tools: ["Ultrasonic Cleaner", "99.9% Anhydrous Isopropyl Alcohol", "Soft Bristle ESD Brush", "Drying Oven (50\xB0C)"],
    warnings: ["Never submerge CMOS batteries, mechanical fans, or microphone modules in ultrasonic cleaner."],
    steps: [
      {
        stepNumber: 1,
        title: "Board Disassembly & Pre-wash Inspection",
        description: "Strip all socketed components, heatspreaders, and labels. Inspect under stereo microscope for green copper oxidation and burnt power traces.",
        imageUrl: IMAGES.ultrasonic
      },
      {
        stepNumber: 2,
        title: "Ultrasonic Degreasing Cycle",
        description: "Place motherboard in ultrasonic tank with 99% IPA solution. Run 8-minute sweep frequency cycle at 40kHz to dislodge flux and sugar minerals.",
        imageUrl: IMAGES.ultrasonic
      },
      {
        stepNumber: 3,
        title: "Dehydration & Micro-soldering Inspection",
        description: "Bake PCB in drying oven at 50\xB0C for 2 hours to evaporate internal moisture. Touch up corroded SMD pads with leaded solder and flux.",
        imageUrl: IMAGES.soldering
      }
    ],
    imageUrl: IMAGES.ultrasonic
  },
  {
    category: "cleaning",
    titleSuffix: "Keyboard Deck Crumb Flush & Sticky Key Switch Repair",
    descSuffix: "Dislodge dust debris, flush sticky tactile scissor clips with fast-evaporating contact cleaner, and restore uniform key travel.",
    difficulty: "easy",
    estimatedTime: "20-30 min",
    tools: ["Keycap Puller", "Electronic Contact Cleaner", "Microfiber Swabs", "Precision Spudger"],
    warnings: ["Do not use petroleum-based lubricants (WD-40) on membrane or scissor switches."],
    steps: [
      {
        stepNumber: 1,
        title: "Keycap Extraction & Clip Inspection",
        description: "Gently unlatch top retention tabs of sticky keycaps using a thin plastic spudger, avoiding damage to delicate plastic scissor hinges.",
        imageUrl: IMAGES.cleaningBlower
      },
      {
        stepNumber: 2,
        title: "Switch Degreasing & Solvent Application",
        description: "Apply quick-drying electronic contact cleaner around the rubber dome, depress switch 20 times, and wipe dislodged grime with microfiber swabs.",
        imageUrl: IMAGES.screenTeardown1
      },
      {
        stepNumber: 3,
        title: "Hinge Re-latching & Tactile Testing",
        description: "Snap scissor mechanisms back into chassis anchors, press keycap down firmly until two distinct clicks are heard, and test in key-tester utility.",
        imageUrl: IMAGES.cleaningBlower
      }
    ],
    imageUrl: IMAGES.cleaningBlower
  },
  {
    category: "cleaning",
    titleSuffix: "VRAM & MOSFET Thermal Pad Caliper Sizing & Renewal",
    descSuffix: "Measure exact millimeter gap tolerances (0.5mm, 1.0mm, 1.5mm) and install high thermal conductivity silicone pads on graphics cards and power stages.",
    difficulty: "medium",
    estimatedTime: "30-45 min",
    tools: ["Digital Vernier Caliper", "High-Performance Thermal Pads (12.8 W/mK)", "Precision Cutting Shears", "Alcohol Prep Pads"],
    warnings: ["Using overly thick pads causes poor CPU/GPU core contact, resulting in instantaneous thermal shutdowns."],
    steps: [
      {
        stepNumber: 1,
        title: "Heatsink Dismount & Old Pad Removal",
        description: "Separate heatsink from PCB, peel off compressed OEM thermal pads, and clean oil residue from memory chips using 99% IPA.",
        imageUrl: IMAGES.thermalPaste
      },
      {
        stepNumber: 2,
        title: "Caliper Gap Measurement & Pad Trimming",
        description: "Measure gap between chip packages and copper baseplates with vernier caliper. Cut replacement pads to 1:1 chip dimensions.",
        imageUrl: IMAGES.nvmeSSD
      },
      {
        stepNumber: 3,
        title: "Peel Protective Film & Mount",
        description: "Peel blue plastic backing from both pad faces, press onto VRAM chips, re-mount heatsink, and check core contact spread pattern.",
        imageUrl: IMAGES.thermalPaste
      }
    ],
    imageUrl: IMAGES.thermalPaste
  },
  // UPGRADES
  {
    category: "upgrades",
    titleSuffix: "PCIe 4.0 / 5.0 NVMe SSD Expansion & Sector Cloning",
    descSuffix: "Expand high-speed storage up to 4TB/8TB, attach thermal heatsinks, and clone the OS partition using sector-by-sector cloning.",
    difficulty: "easy",
    estimatedTime: "25-35 min",
    tools: ["Phillips #00 Screwdriver", "M.2 2280 NVMe SSD", "USB NVMe Enclosure", "Cloning Software"],
    warnings: ["Touch a grounded metallic object to discharge static electricity before inserting NVMe card."],
    steps: [
      {
        stepNumber: 1,
        title: "Clone Existing Drive",
        description: "Place the new NVMe SSD in an external USB-C enclosure and clone the active boot drive using sector-by-sector clone software.",
        imageUrl: IMAGES.nvmeSSD
      },
      {
        stepNumber: 2,
        title: "M.2 Slot Installation",
        description: "Insert the NVMe SSD into the motherboard M.2 Key-M slot at a 30-degree angle, press down gently, and tighten the M2x3mm retention screw.",
        imageUrl: IMAGES.nvmeSSD
      },
      {
        stepNumber: 3,
        title: "Verify UEFI Boot Priority & Trim",
        description: "Boot into BIOS, ensure the new drive is set as Primary Boot Option 1, boot into OS, and verify TRIM is enabled.",
        imageUrl: IMAGES.biosScreen
      }
    ],
    imageUrl: IMAGES.nvmeSSD
  },
  {
    category: "upgrades",
    titleSuffix: "DDR4 / DDR5 Dual-Channel High-Speed RAM Upgrade",
    descSuffix: "Maximize system multitasking and memory bandwidth by installing dual-rank matched SODIMM memory modules.",
    difficulty: "easy",
    estimatedTime: "15-20 min",
    tools: ["Plastic Spudger", "Matched DDR5 SODIMM Memory Kit", "Anti-Static Mat"],
    warnings: ["Ensure the laptop is completely powered off and the internal battery disconnected before touching memory slots."],
    steps: [
      {
        stepNumber: 1,
        title: "Remove Memory Shield & Eject Old RAM",
        description: "Prise away EMI metal shielding canopy. Spread the side metal retention clips outward to allow the SODIMM module to pop up at a 45-degree angle.",
        imageUrl: IMAGES.ramModule
      },
      {
        stepNumber: 2,
        title: "Insert New Dual-Rank SODIMM",
        description: "Align module notch with slot key, slide firmly into the socket at 45 degrees, and push flat until retaining clips lock with a tactile click.",
        imageUrl: IMAGES.ramModule
      },
      {
        stepNumber: 3,
        title: "POST Memory Training & MemTest86",
        description: "Power on the system. Allow 30-60 seconds for initial DDR5 memory training, verify full capacity in BIOS, and run diagnostics.",
        imageUrl: IMAGES.biosScreen
      }
    ],
    imageUrl: IMAGES.ramModule
  },
  {
    category: "upgrades",
    titleSuffix: "Wi-Fi 7 / Wi-Fi 6E BE200 M.2 Wireless Module & Antenna Upgrade",
    descSuffix: "Upgrade legacy networking to tri-band 320MHz channel width Wi-Fi 7 with Bluetooth 5.4 for sub-millisecond local network latencies.",
    difficulty: "easy",
    estimatedTime: "15-20 min",
    tools: ["Phillips #00 Screwdriver", "Plastic Spudger / Tweezers", "Wi-Fi 7 M.2 2230 Card"],
    warnings: ["Carefully press micro IPEX MHF4 antenna snaps straight down \u2014 never slide sideways to avoid bending connector pins."],
    steps: [
      {
        stepNumber: 1,
        title: "Locate M.2 Key-E Slot",
        description: "Disconnect internal battery and locate the M.2 Key-E 2230 slot beneath shielding or secondary drive bays.",
        imageUrl: IMAGES.screenTeardown1
      },
      {
        stepNumber: 2,
        title: "Antenna Latching (Main & Aux)",
        description: "Snap black (Main) and white/grey (Aux) antenna micro-leads onto the new Wi-Fi card gold pads using fingertips or nylon tweezers.",
        imageUrl: IMAGES.logicBoard
      },
      {
        stepNumber: 3,
        title: "Fasten Standoff & Install OEM Drivers",
        description: "Tighten M2 retention screw, close chassis, boot into OS, and install latest Intel / Qualcomm Wi-Fi 7 package.",
        imageUrl: IMAGES.osRecovery
      }
    ],
    imageUrl: IMAGES.logicBoard
  }
];
var modelTargets = [
  // Apple
  { brand: "Apple", model: 'MacBook Pro 16" M3 Max', type: "laptop" },
  { brand: "Apple", model: 'MacBook Pro 14" M3 Pro', type: "laptop" },
  { brand: "Apple", model: 'MacBook Air 15" M2 / M3', type: "laptop" },
  { brand: "Apple", model: 'MacBook Air 13" M1 Legacy', type: "laptop" },
  { brand: "Apple", model: "Mac Studio M2 Ultra", type: "desktop" },
  { brand: "Apple", model: 'iMac 24" 4.5K Retina M3', type: "desktop" },
  { brand: "Apple", model: "Mac mini M2 Pro", type: "desktop" },
  // Dell
  { brand: "Dell", model: "XPS 15 9530", type: "laptop" },
  { brand: "Dell", model: "XPS 13 Plus 9320", type: "laptop" },
  { brand: "Dell", model: "Latitude 5440 Enterprise", type: "laptop" },
  { brand: "Dell", model: "Alienware m16 R2 Gaming", type: "laptop" },
  { brand: "Dell", model: "OptiPlex 7010 Micro", type: "desktop" },
  { brand: "Dell", model: "OptiPlex 5090 SFF", type: "desktop" },
  { brand: "Dell", model: "Alienware Aurora R16", type: "desktop" },
  // Lenovo
  { brand: "Lenovo", model: "ThinkPad X1 Carbon Gen 11", type: "laptop" },
  { brand: "Lenovo", model: "ThinkPad T14 Gen 4", type: "laptop" },
  { brand: "Lenovo", model: "Legion Pro 7i Gen 9", type: "laptop" },
  { brand: "Lenovo", model: "Yoga 9i Dual-Screen", type: "laptop" },
  { brand: "Lenovo", model: "ThinkCentre M90q Tiny", type: "desktop" },
  { brand: "Lenovo", model: "Legion Tower 7i", type: "desktop" },
  // HP
  { brand: "HP", model: "Spectre x360 14 (2024)", type: "laptop" },
  { brand: "HP", model: "EliteBook 840 G10", type: "laptop" },
  { brand: "HP", model: "OMEN Transcend 16", type: "laptop" },
  { brand: "HP", model: "OMEN 45L Cryo-Chamber", type: "desktop" },
  { brand: "HP", model: "ProDesk 600 G6 SFF", type: "desktop" },
  // ASUS
  { brand: "ASUS", model: "ROG Zephyrus G14 (2024)", type: "laptop" },
  { brand: "ASUS", model: "ZenBook 14 OLED UX3405", type: "laptop" },
  { brand: "ASUS", model: "ROG Strix SCAR 16", type: "laptop" },
  { brand: "ASUS", model: "ROG Strix G16CH Desktop", type: "desktop" },
  // Acer & MSI & Razer & Microsoft & Framework & Custom
  { brand: "Acer", model: "Predator Helios 16", type: "laptop" },
  { brand: "MSI", model: "Stealth 16 AI Studio", type: "laptop" },
  { brand: "Razer", model: "Blade 16 Dual-Mode", type: "laptop" },
  { brand: "Microsoft", model: "Surface Laptop 5", type: "laptop" },
  { brand: "Framework", model: "Framework Laptop 13 / 16 Modular", type: "laptop" },
  { brand: "Samsung", model: "Galaxy Book4 Ultra", type: "laptop" },
  { brand: "LG", model: "LG Gram 17 Pro", type: "laptop" },
  { brand: "Custom Built", model: "Custom Full/Mid ATX Gaming PC", type: "desktop" },
  { brand: "Custom Built", model: "Mini-ITX Small Form Factor SFF", type: "desktop" }
];
function buildAllGuides() {
  const list = [...curatedRepairGuides];
  for (const target of modelTargets) {
    for (const template of guideTemplates) {
      list.push({
        title: `${target.model}: ${template.titleSuffix}`,
        description: `Dedicated ${template.category} service teardown and step-by-step repair guide for the ${target.brand} ${target.model}. ${template.descSuffix}`,
        deviceType: target.type,
        category: template.category,
        difficulty: template.difficulty,
        estimatedTime: template.estimatedTime,
        toolsRequired: template.tools,
        safetyWarnings: template.warnings,
        steps: template.steps,
        alternativeSolutions: `Reference ${target.brand} technical hardware maintenance manuals or contact certified technicians for warranty support.`,
        imageUrl: template.imageUrl
      });
    }
  }
  return list;
}
var comprehensiveRepairGuides = buildAllGuides();
async function seedDatabase() {
  if (!db) {
    console.log("No PostgreSQL database configured. Using in-memory dataset.");
    return;
  }
  try {
    console.log(`Seeding ${comprehensiveRepairGuides.length} comprehensive repair guides into database...`);
    for (const guide of comprehensiveRepairGuides) {
      await db.insert(repairGuides).values({
        ...guide,
        viewCount: guide.viewCount || Math.floor(Math.random() * 1e3) + 200,
        downloadCount: guide.downloadCount || Math.floor(Math.random() * 300) + 50,
        isBookmarked: false
      }).onConflictDoNothing();
    }
    console.log("Database seeding finished.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// server/seed-guides.ts
var IMAGES2 = {
  screenTeardown1: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
  screenTeardown2: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
  screenTeardown3: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800",
  logicBoard: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
  battery: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800",
  soldering: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
  biosScreen: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
  terminal: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
  osRecovery: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
  thermalPaste: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
  cleaningBlower: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800",
  ultrasonic: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800",
  nvmeSSD: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
  ramModule: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800",
  gpuAio: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800",
  desktopRig: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800"
};
var guideTemplates2 = [
  // ----------------------------------------------------
  // HARDWARE (5 Templates)
  // ----------------------------------------------------
  {
    category: "hardware",
    titleSuffix: "OLED/IPS Screen & Hinge Assembly Replacement",
    descSuffix: "Complete start-to-finish teardown procedure to isolate power, disconnect eDP display cabling, unbolt steel hinge brackets, and install a factory display panel.",
    difficulty: "hard",
    estimatedTime: "45-60 min",
    tools: ["Phillips #00 Screwdriver", "Torx T5 Precision Bit", "Plastic Spudger / Guitar Pick", "Pre-cut Bezel Adhesive Strips", "Anti-Static Wrist Strap", "Digital Caliper"],
    warnings: [
      "CRITICAL: Disconnect the main battery harness before touching internal display ribbon cables to prevent instant backlight fuse burnout (BL_PWR 19V rail shorting to 3.3V data lines).",
      "Handle the replacement display glass by perimeter edges only; never exert localized thumb pressure over the active matrix area.",
      "Track screw lengths precisely. Driving a long M2.5 screw into a shallow blind hole will crack the outer palmrest chassis."
    ],
    steps: [
      {
        stepNumber: 1,
        phase: "Phase 1: Pre-Disassembly Diagnostics & Power Isolation",
        title: "Power Drain, Static Grounding & Battery Decoupling",
        description: "Prior to any physical fastener removal, ensure the device is completely powered down (not in Modern Standby / Sleep mode). Disconnect the AC adapter, clip on your ESD grounding strap, remove the bottom cover perimeter screws, and physically detach the main battery power harness.",
        toolRequired: "Torx T5 / Phillips #00 & Plastic Pry Pick",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Power off machine and hold power button for 15 seconds to discharge motherboard filter capacitors.",
          "Remove all bottom cover perimeter screws (note differing screw lengths in a magnetic compartment tray).",
          "Use a plastic pry tool to release perimeter retaining clips, starting from the rear hinge exhaust vents.",
          "Locate the battery motherboard connector; slide the metal retention lock back and pull the harness straight out parallel to the board.",
          "Press the power button again for 5 seconds to drain any residual standby voltage on the +VBAT and +3.3V_ALW rails."
        ],
        warnings: ["Never use metallic tweezers or metal pry tools near battery pins to avoid catastrophic lithium-ion shorting."],
        tips: ["Take a high-resolution photo of the cable routing channels before disconnecting anything for exact reassembly reference."],
        checkpoints: ["Multimeter verification: 0.00V measured across main battery output pins."],
        imageUrl: IMAGES2.screenTeardown1
      },
      {
        stepNumber: 2,
        phase: "Phase 2: Hinge Bracket & Antenna Unrouting",
        title: "Display Hinge Anchor Unbolting & Antenna Cable Isolation",
        description: "Disconnect the embedded DisplayPort (eDP) 30/40-pin flex cable and Wi-Fi/Webcam coaxial leads. Flip open the display assembly to 90 degrees to access the heavy-duty steel hinge anchor brackets.",
        toolRequired: "Torx T5 / Phillips #00 & Micro-Tweezers",
        torqueSpec: "0.35 Nm",
        subSteps: [
          "Lift the protective Kapton tape covering the 30-pin/40-pin eDP connector.",
          "Flip up the metal locking bail on the eDP header and slide the ribbon cable straight back out of the socket.",
          "Carefully disconnect the Main (Black) and Aux (Gray) Wi-Fi coaxial antenna leads by lifting vertically with nylon tweezers.",
          "Unroute both antenna cables and the webcam flex cable from the chassis cable retention guides.",
          "Remove the 3-4 heavy-duty steel hinge screws on each side anchoring the display to the lower palmrest frame."
        ],
        warnings: ["Do not bend coaxial antenna micro-leads at 90-degree sharp angles; keep smooth 5mm bend radii."],
        tips: ["Work on an ESD mat to avoid scratching the pristine anodized aluminum display lid."],
        checkpoints: ["Confirm all flex cables and coax leads are completely free of the hinge channels before separating the assemblies."],
        imageUrl: IMAGES2.screenTeardown2
      },
      {
        stepNumber: 3,
        phase: "Phase 3: Bezel Separation & Display Panel Extraction",
        title: "Bezel Adhesive Release & LCD/OLED Panel Swap",
        description: "Separate the plastic/aluminum front bezel from the rear enclosure using heat-assisted adhesive softening and a thin plastic pry pick. Remove the panel stretch-release tape and seat the replacement panel.",
        toolRequired: "Plastic Spudger / Guitar Picks & Heat Gun (60\xB0C)",
        torqueSpec: "Hand-tight / Adhesive Mount",
        subSteps: [
          "Apply mild heat (50-60\xB0C) around the perimeter bezel to soften factory bonding adhesive.",
          "Insert a thin plastic guitar pick between the bezel and display lid, working gently around the perimeter to release snap clips.",
          "Grasp the black stretch-release adhesive pull tabs at the bottom edge of the panel with tweezers; pull horizontally and flat at a 15-degree angle.",
          "Lay the panel face down on a soft microfiber cloth to expose the reverse eDP connector.",
          "Peel back the connector tape, release the locking latch, and disconnect the defective LCD/OLED panel.",
          "Connect the replacement panel, secure the locking bail, and seal with fresh Kapton tape."
        ],
        warnings: ["Never pull stretch-release adhesive upward at a 90-degree angle or the tape will snap under the panel."],
        tips: ["Test the replacement panel in open-air bench mode before applying final perimeter bezel adhesive strips."],
        checkpoints: ["eDP connector is fully seated with gold contact pins evenly aligned and latch fully closed."],
        imageUrl: IMAGES2.screenTeardown3
      },
      {
        stepNumber: 4,
        phase: "Phase 4: Reassembly & Cable Channel Management",
        title: "Hinge Re-Torquing, Cable Routing & Bezel Reseating",
        description: "Reattach the display lid to the lower palmrest chassis, torque hinge bolts to manufacturer specifications, and meticulously route antenna leads through isolation guides.",
        toolRequired: "Torque Screwdriver & Spudger",
        torqueSpec: "0.35 Nm (Hinges), 0.20 Nm (Chassis)",
        subSteps: [
          "Align hinge brackets over chassis standoffs and loosely thread all anchor bolts before tightening.",
          "Torque hinge anchor screws sequentially to 0.35 Nm to guarantee smooth, symmetric hinge resistance.",
          "Route Wi-Fi coax and webcam leads through their designated plastic retention channels, ensuring no wire is pinched beneath the hinge plate.",
          "Re-seat the front bezel, pressing firmly around all edges until audible snap clicks verify complete engagement.",
          "Reattach the main battery power harness and snap the bottom chassis cover into position."
        ],
        warnings: ["Pinching the Wi-Fi coax lead under a metal hinge will short RF ground and drastically degrade wireless signal."],
        tips: ["Check hinge alignment by closing the laptop and inspecting the perimeter seam gap for uniform 0.8mm clearance."],
        checkpoints: ["Hinge opens smoothly with single-hand resistance without chassis creaking."],
        imageUrl: IMAGES2.screenTeardown2
      },
      {
        stepNumber: 5,
        phase: "Phase 5: Post-Repair Verification & Display Calibration",
        title: "Cold POST Boot, Pixel Inspection & Backlight Verification",
        description: "Power on the system for cold boot initialization. Execute hardware diagnostics, inspect for dead sub-pixels, verify high-refresh rate options, and test ambient light sensor auto-brightness.",
        toolRequired: "Display Calibration Utility & UEFI Hardware Diagnostics",
        torqueSpec: "N/A",
        subSteps: [
          "Connect OEM AC power adapter and press the power button to trigger cold boot POST.",
          "Enter BIOS Setup (F2/F12/Del) to confirm display panel EDID identification and native resolution.",
          "Boot into OS and run an RGB full-screen color test (Red, Green, Blue, White, Black) to verify zero stuck pixels or backlight bleed.",
          "Open Display Settings and verify maximum supported refresh rate (120Hz/165Hz/240Hz) and HDR color bit-depth.",
          "Cover ambient light sensor near webcam to confirm automatic display brightness dimming functionality."
        ],
        warnings: ["If backlight fails to illuminate, immediately power off and inspect eDP cable seating before replacing logic board fuses."],
        tips: ["Allow display to run at 100% brightness for 15 minutes to verify temperature stability on the LED driver IC."],
        checkpoints: ["Flawless picture output across 100% of the active display matrix with working brightness controls."],
        imageUrl: IMAGES2.screenTeardown3
      }
    ],
    imageUrl: IMAGES2.screenTeardown3
  },
  {
    category: "hardware",
    titleSuffix: "Motherboard & VRM Power Delivery Replacement",
    descSuffix: "Start-to-finish logic board teardown, thermal module dismount, port realignment, multi-rail voltage verification, and diagnostic POST restoration.",
    difficulty: "hard",
    estimatedTime: "60-90 min",
    tools: ["Precision Screwdriver Kit", "Thermal Paste (Arctic MX-6 / PTM7950)", "Digital Multimeter", "ESD Mat & Wrist Strap", "Magnetic Screw Organizing Tray"],
    warnings: [
      "Always observe strict ESD protocols. Logic boards contain highly static-sensitive MOSFETs and BGA silicon dies.",
      "Categorize all screws by length and standoff diameter. Inserting a long screw into a logic board standoff will puncture copper PCB power planes.",
      "Clean all heatsink mating surfaces with 99.9% anhydrous IPA before applying fresh thermal interface compound."
    ],
    steps: [
      {
        stepNumber: 1,
        phase: "Phase 1: Pre-Disassembly Diagnostics & Sub-assembly Extraction",
        title: "Chassis Depower, Battery Decoupling & Peripheral Removal",
        description: "Perform cold power drain, remove bottom enclosure, disconnect main battery harness, and remove modular sub-assemblies including NVMe SSDs, Wi-Fi module, cooling assembly, and RAM SODIMMs.",
        toolRequired: "Torx T5 / Phillips #00 & ESD Mat",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Power down unit, disconnect AC charger, and ground yourself on an ESD workstation.",
          "Remove bottom enclosure and disconnect the primary battery cable header.",
          "Extract NVMe SSDs (store in anti-static bag), unfasten Wi-Fi module, and remove DDR5 SODIMMs.",
          "Loosen heatsink spring screws in stamped reverse order (4 -> 3 -> 2 -> 1) and gently lift copper vapor chamber away from CPU/GPU dies.",
          "Disconnect all peripheral ribbon cables: Trackpad, Keyboard, IO Daughterboard, Audio Jack, Speakers, and Display eDP."
        ],
        warnings: ["Do not yank stubborn heatsinks; if dried paste sticks, gently twist clockwise and counterclockwise."],
        tips: ["Store each sub-component with its exact mounting screws in labeled magnetic compartments."],
        checkpoints: ["All ribbon connectors released from ZIF sockets without torn flex traces."],
        imageUrl: IMAGES2.screenTeardown1
      },
      {
        stepNumber: 2,
        phase: "Phase 2: Logic Board Extraction & Standoff Inspection",
        title: "Logic Board Extraction & Port Realignment",
        description: "Remove motherboard grounding and standoff screws. Carefully angle the board upward to clear external I/O ports from magnesium chassis cutouts.",
        toolRequired: "Phillips #00 & Plastic Spudger",
        torqueSpec: "0.25 Nm",
        subSteps: [
          "Remove all perimeter logic board screws and motherboard-to-chassis grounding plates.",
          "Check for hidden screws beneath black Mylar insulation tape or near the cooling exhaust fins.",
          "Gently lift the logic board from the right edge, easing USB-C, HDMI, and audio jacks out of chassis frame ports.",
          "Inspect chassis cavity for metal debris, loose standoffs, or deteriorated thermal pads.",
          "Transfer TPM module, BIOS security dongles, or daughterboard interconnects to the replacement board as required."
        ],
        warnings: ["Never flex or twist the motherboard PCB during extraction to avoid fracturing micro BGA solder balls."],
        tips: ["Check that thermal pads on the chassis bottom are intact and clean of dust before seating the new board."],
        checkpoints: ["Chassis standoffs are clean and straight with no stripped brass threads."],
        imageUrl: IMAGES2.logicBoard
      },
      {
        stepNumber: 3,
        phase: "Phase 3: New Motherboard Seating & Port Alignment",
        title: "Replacement Logic Board Installation & Flex Interconnects",
        description: "Seat the replacement motherboard, align I/O ports seamlessly with chassis cutouts, fasten standoff screws, and reconnect all peripheral ribbon cables.",
        toolRequired: "Phillips #00 & Nylon Tweezers",
        torqueSpec: "0.25 Nm",
        subSteps: [
          "Slide I/O ports into the left chassis bezel openings at a 15-degree angle, then lower the motherboard flat onto brass standoffs.",
          "Install and finger-tighten all motherboard mounting screws before applying final 0.25 Nm torque.",
          "Reconnect eDP display ribbon, locking bail, and secure with fresh Kapton tape.",
          "Insert all ZIF flex ribbons (Keyboard, Trackpad, Audio, USB) ensuring blue alignment tabs are seated flush against socket stops.",
          "Reinstall RAM SODIMMs into slot channels until side metal clips snap locked."
        ],
        warnings: ["Ensure no loose ribbon cables are trapped underneath the motherboard before screwing down standoffs."],
        tips: ["Use nylon tweezers to guide delicate flex cables into ZIF headers without creasing."],
        checkpoints: ["All I/O ports (USB, HDMI, Type-C) are centered with 0.5mm clearance in chassis cutouts."],
        imageUrl: IMAGES2.soldering
      },
      {
        stepNumber: 4,
        phase: "Phase 4: Thermal Interface Application & Heatsink Torquing",
        title: "Direct-Die Thermal Paste Application & Heatsink Installation",
        description: "Clean CPU and GPU silicon dies with 99% IPA, apply high-performance thermal compound or phase-change PTM7950, and torque heatsink screws in stamped sequence.",
        toolRequired: "99.9% IPA, Lint-free Wipes & Arctic MX-6",
        torqueSpec: "0.20 Nm (Sequential 1-2-3-4)",
        subSteps: [
          "Wipe silicon dies and copper heatsink contact blocks clean using 99% IPA until mirror finish.",
          "Apply a uniform direct-die layer of Arctic MX-6 or pre-cut PTM7950 phase-change pad.",
          "Inspect VRAM and VRM thermal pads; replace any torn pads with 12.8 W/mK pads of matching caliper thickness.",
          "Lower copper cooling assembly straight down onto dies without sliding sideways.",
          "Tighten heatsink captive screws strictly in stamped numerical sequence (1 -> 2 -> 3 -> 4) to ensure uniform die pressure."
        ],
        warnings: ["Uneven heatsink screw tightening will crack bare silicon die corners or cause severe thermal throttling."],
        tips: ["Plug in both 4-pin PWM fan headers before fastening the bottom cover."],
        checkpoints: ["Thermal paste spread covers 100% of active die surface without air bubbles."],
        imageUrl: IMAGES2.thermalPaste
      },
      {
        stepNumber: 5,
        phase: "Phase 5: Reassembly, Power-up & POST Diagnostic Verification",
        title: "Battery Connection, Chassis Closure & Multi-Rail Burn-In",
        description: "Reconnect battery harness, close chassis, and perform cold boot initialization, memory training, BIOS serial provisioning, and stress testing.",
        toolRequired: "OEM AC Adapter & Hardware Diagnostic Suite",
        torqueSpec: "0.20 Nm (Chassis)",
        subSteps: [
          "Reconnect main battery cable to motherboard header and seat safety latch.",
          "Fasten bottom enclosure and torque perimeter screws.",
          "Connect OEM AC power adapter; allow up to 45 seconds on first boot for DDR5 memory training and EC initialization.",
          "Enter BIOS Setup to verify CPU, RAM capacity, NVMe detection, and system serial numbers.",
          "Boot OS and run 15-minute Cinebench / FurMark thermal stress test to verify core temperatures remain <85\xB0C."
        ],
        warnings: ["If fans spin at 100% with black screen on first power-up, wait at least 90 seconds before interrupting memory training."],
        tips: ["Flash the latest verified OEM BIOS version to update firmware microcode for the replacement board."],
        checkpoints: ["System completes full cold POST boot in under 12 seconds with all hardware sensors reporting normal."],
        imageUrl: IMAGES2.biosScreen
      }
    ],
    imageUrl: IMAGES2.logicBoard
  },
  {
    category: "hardware",
    titleSuffix: "OEM Battery Pack Replacement & BMS Calibration",
    descSuffix: "Start-to-finish battery service: safely discharge, release industrial pull-tabs, route OEM harness, verify charging rails, and complete full BMS calibration cycle.",
    difficulty: "easy",
    estimatedTime: "25-35 min",
    tools: ["Phillips #00 Screwdriver", "Plastic Pry Pick", "Anti-Static Safety Glasses", "Battery Adhesive Pull Tabs", "Digital Multimeter"],
    warnings: [
      "Discharge existing battery below 25% prior to disassembly. Charged lithium-ion cells pose a significant fire hazard if accidentally punctured.",
      "Never use sharp metal tools or excessive leverage near lithium pouch cells.",
      "Properly recycle degraded battery packs at an authorized e-waste hazardous materials facility."
    ],
    steps: [
      {
        stepNumber: 1,
        phase: "Phase 1: Pre-Disassembly Diagnostics & Battery Discharge",
        title: "Battery Depletion & Enclosure Removal",
        description: "Discharge battery pack below 25% state-of-charge. Disconnect external power, remove chassis bottom cover, and inspect the internal battery compartment for swelling or fluid leakage.",
        toolRequired: "Torx T5 / Phillips #00 & Plastic Spudger",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Run laptop on battery power until charge drops below 20% to minimize thermal runaway risk.",
          "Power down completely and disconnect AC adapter.",
          "Remove bottom casing fasteners and release perimeter clips.",
          "Perform visual inspection: check for pillowing (swollen cells) or sweet chemical electrolyte odor."
        ],
        warnings: ["If battery is noticeably swollen, wear safety glasses and handle with extreme care."],
        tips: ["Keep a fire-safe battery bucket or dry sand nearby when handling compromised lithium cells."],
        checkpoints: ["Chassis opened cleanly with clear access to all battery bracket mounting screws."],
        imageUrl: IMAGES2.screenTeardown1
      },
      {
        stepNumber: 2,
        phase: "Phase 2: Harness Decoupling & Stretch Adhesive Release",
        title: "BMS Cable Disconnection & Adhesive Pull-Tab Release",
        description: "Disconnect the battery power/data ribbon from the motherboard header. Remove bracket screws and slowly extract stretch-release adhesive strips parallel to the chassis base.",
        toolRequired: "Plastic Pry Pick & Micro-Tweezers",
        torqueSpec: "Hand-release",
        subSteps: [
          "Slide back the metal retention collar on the battery motherboard connector and pull the harness straight out.",
          "Remove the 4-6 perimeter Phillips screws securing the battery frame brackets to the palmrest.",
          "Grasp the black tips of the stretch-release adhesive pull tabs with tweezers.",
          "Slowly pull the adhesive strip horizontally parallel to the bottom of the battery at a flat 10-15 degree angle.",
          "Continue pulling steadily until the adhesive tape stretches out completely, releasing the cell from the chassis tray."
        ],
        warnings: ["Do not pry upward against the battery with metal spudgers; prying will crease pouch cells and cause internal short circuits."],
        tips: ["If a pull-tab snaps, apply 3 drops of 99% IPA under the battery corner and gently floss underneath with dental floss or plastic string."],
        checkpoints: ["Old battery lifted free of chassis cavity without bending or puncturing."],
        imageUrl: IMAGES2.battery
      },
      {
        stepNumber: 3,
        phase: "Phase 3: OEM Battery Mounting & Harness Connection",
        title: "New Battery Pack Installation & Fastener Torquing",
        description: "Clean adhesive residue from chassis tray, apply fresh OEM battery mounting tape, align mounting posts, and seat the data/power harness into the logic board header.",
        toolRequired: "Phillips #00 & Lint-free Wipe",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Clean old adhesive residue from magnesium chassis floor with 99% IPA.",
          "Apply fresh pre-cut double-sided battery adhesive strips to the chassis mounting bay.",
          "Lower the new OEM battery into position, aligning chassis screw standoffs.",
          "Tighten all bracket mounting screws to 0.20 Nm in a cross pattern.",
          "Plug the battery cable firmly into the motherboard header and slide the locking collar forward."
        ],
        warnings: ["Verify battery connector pin polarity matches motherboard socket before pushing down."],
        tips: ["Ensure the battery data ribbon is not pinched beneath any plastic chassis alignment ribs."],
        checkpoints: ["Battery sits completely flat and rigid in the chassis tray with zero wobble."],
        imageUrl: IMAGES2.battery
      },
      {
        stepNumber: 4,
        phase: "Phase 4: Chassis Reassembly & Initial Power-On Test",
        title: "Enclosure Closure & Power Rail Handshake",
        description: "Reattach bottom enclosure, torque chassis fasteners, connect AC adapter, and verify charging LED indicator behavior.",
        toolRequired: "Torx T5 / Phillips #00",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Snap bottom enclosure into place around all edges.",
          "Install and torque all perimeter chassis screws.",
          "Connect OEM AC power adapter and observe charging indicator LED (Amber = Charging, White = Full).",
          "Power on system and boot into OS to verify battery health reporting in OS taskbar."
        ],
        warnings: ["If charging LED blinks rapidly (Error Code), disconnect power and verify battery cable seating."],
        tips: ["Check Battery Report via `powercfg /batteryreport` to verify full charge capacity matches design capacity."],
        checkpoints: ["Battery status in OS displays 'Plugged in, charging' with positive wattage draw."],
        imageUrl: IMAGES2.screenTeardown1
      },
      {
        stepNumber: 5,
        phase: "Phase 5: Post-Repair Battery Management System (BMS) Calibration",
        title: "Full Charge & Discharge Calibration Cycle",
        description: "Execute a complete 100% to 5% calibration cycle to calibrate the internal battery fuel gauge IC (Texas Instruments BQ-series) for pinpoint runtime accuracy.",
        toolRequired: "AC Charger & System Diagnostics",
        torqueSpec: "N/A",
        subSteps: [
          "Charge laptop uninterrupted until the battery reaches 100% and keep plugged in for an additional 2 hours.",
          "Unplug the AC adapter and use the system normally until battery drains below 5% and low-battery warning appears.",
          "Allow system to hibernate/shut down automatically and leave powered off for 1-2 hours.",
          "Plug the AC adapter back in and charge non-stop to 100% in a single continuous session.",
          "Verify that battery health and estimated remaining runtime metrics are synchronized accurately."
        ],
        warnings: ["Do not allow lithium batteries to remain at 0% for prolonged days to prevent copper shunting."],
        tips: ["Set battery charge threshold in OEM utility to 80% if machine is primarily used docked at a desk."],
        checkpoints: ["Fuel gauge shows 100% capacity with accurate runtime decay curve."],
        imageUrl: IMAGES2.battery
      }
    ],
    imageUrl: IMAGES2.battery
  },
  {
    category: "hardware",
    titleSuffix: "DC-In Power Jack & USB-C Port Board Replacement",
    descSuffix: "Start-to-finish power port replacement: diagnose voltage drops, decouple hinge brackets, replace fractured DC-in harness/Type-C daughterboard, and verify 20V PD rails.",
    difficulty: "medium",
    estimatedTime: "35-45 min",
    tools: ["Torx T5 / Phillips #00", "Digital Multimeter (True RMS)", "Plastic Spudger", "ESD Mat", "Micro-Tweezers"],
    warnings: [
      "Ensure all AC power and internal battery cables are detached before probing port solder joints.",
      "Check USB-C port pins for bent metallic VBUS pins that could short 20V to GND or D+/D- data lines."
    ],
    steps: [
      {
        stepNumber: 1,
        phase: "Phase 1: Pre-Disassembly Diagnostics & Battery Isolation",
        title: "Power Isolation & Chassis Opening",
        description: "Disconnect AC adapter, remove bottom enclosure, disconnect internal battery harness, and probe DC-in port with multimeter to isolate intermittent loose contact or fractured solder joints.",
        toolRequired: "Torx T5 / Phillips #00 & Multimeter",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Power off device and remove bottom enclosure screws.",
          "Disconnect the internal battery connector from the motherboard to isolate all internal power rails.",
          "Inspect the DC-in barrel jack or USB-C receptacle for loose center pins, cracked plastic housings, or burn discoloration."
        ],
        warnings: ["Never probe live 20V power pins with metal tools while the battery is connected."],
        tips: ["A wiggly charging connector that only charges at certain angles indicates fractured internal solder terminals."],
        checkpoints: ["Internal battery is completely detached and confirmed at 0.0V across motherboard header."],
        imageUrl: IMAGES2.screenTeardown1
      },
      {
        stepNumber: 2,
        phase: "Phase 2: Hinge Bracket Lift & Port Harness Extraction",
        title: "Hinge Disassembly & Port Board Extraction",
        description: "Unbolt the left display hinge bracket covering the power port, unroute braided harness from cable guides, and disconnect the port module from the logic board.",
        toolRequired: "Phillips #00 / Torx T5 & Spudger",
        torqueSpec: "0.35 Nm (Hinge)",
        subSteps: [
          "Remove the 2-3 steel hinge screws anchoring the hinge bracket over the DC-in port.",
          "Gently lift the hinge arm upward by 30 degrees to create vertical clearance.",
          "Unplug the 8-pin braided DC-in harness from the motherboard header, or remove the daughterboard ribbon cable.",
          "Lift the defective DC-in jack out of its molded chassis retention pocket."
        ],
        warnings: ["Do not over-flex the display lid while the hinge is unbolted to avoid cracking the lower chassis plastic."],
        tips: ["Keep the display lid supported with a foam block while the hinge screws are removed."],
        checkpoints: ["Defective port extracted cleanly without damaging neighboring Wi-Fi antenna routing."],
        imageUrl: IMAGES2.soldering
      },
      {
        stepNumber: 3,
        phase: "Phase 3: New Port Installation & Hinge Re-Torquing",
        title: "OEM Port Seating & Mechanical Hinge Securing",
        description: "Install replacement OEM charging port into chassis notch, plug connector into motherboard, lower hinge bracket, and torque screws to manufacturer specifications.",
        toolRequired: "Torque Screwdriver (0.35 Nm)",
        torqueSpec: "0.35 Nm (Hinge Anchor)",
        subSteps: [
          "Seat the new OEM port into the chassis notch, ensuring alignment tabs lock firmly into position.",
          "Plug the power harness into the motherboard header until the connector clicks locked.",
          "Lower the steel hinge bracket flush over the port assembly.",
          "Thread and torque hinge screws to 0.35 Nm to ensure zero mechanical play when inserting the charger."
        ],
        warnings: ["Ensure the braided power wires are tucked neatly inside chassis guides and not pinched under the hinge plate."],
        tips: ["Apply a drop of blue threadlocker (Loctite 242) to hinge screws to prevent loosening over time."],
        checkpoints: ["Charging port is rock-solid with zero wobble when inserting charger cable."],
        imageUrl: IMAGES2.logicBoard
      },
      {
        stepNumber: 4,
        phase: "Phase 4: Reassembly, Voltage Probing & Charging Verification",
        title: "Battery Reconnection, 20V PD Verification & Burn-In Test",
        description: "Reconnect battery, fasten bottom cover, plug in AC charger, and verify stable 19V/20V negotiation and positive battery charge current.",
        toolRequired: "USB-C Power Meter / Multimeter",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Reconnect internal battery harness to the motherboard.",
          "Fasten bottom enclosure screws securely.",
          "Connect USB-C power meter / AC charger and verify voltage negotiates immediately to 20.0V @ 3.25A / 5.0A (65W/100W/140W).",
          "Wiggle charging cable gently at 45-degree angles to verify stable, continuous charging connection with zero disconnects.",
          "Monitor battery charge percentage in OS for 15 minutes to confirm rapid charging rate."
        ],
        warnings: ["If voltage stays stuck at 5.0V on USB-C, inspect CC1/CC2 lines on the port daughterboard."],
        tips: ["Use an inline USB-C power meter to monitor real-time wattage draw during heavy load."],
        checkpoints: ["Full rated power delivery (20V @ 3.25A+) negotiated without thermal throttling."],
        imageUrl: IMAGES2.osRecovery
      }
    ],
    imageUrl: IMAGES2.soldering
  },
  {
    category: "hardware",
    titleSuffix: "Dual Cooling Fan & Copper Heatpipe Module Overhaul",
    descSuffix: "Start-to-finish thermal overhaul: isolate power, remove copper cooling assembly, replace noisy blower fans, clean fin stacks, and torque heatsink in sequential order.",
    difficulty: "medium",
    estimatedTime: "30-40 min",
    tools: ["Phillips #00 Screwdriver", "Thermal Paste (Arctic MX-6)", "Microfiber Cloths", "99% Isopropyl Alcohol", "Soft Anti-Static Brush"],
    warnings: [
      "Always tighten and loosen heatsink screws in numbered sequence (1-2-3-4) to prevent uneven die pressure and cracked silicon.",
      "Never allow high-pressure air to spin cooling fans freely; hold the impeller stationary to prevent induced voltage back-EMF."
    ],
    steps: [
      {
        stepNumber: 1,
        phase: "Phase 1: Pre-Disassembly Diagnostics & Battery Isolation",
        title: "Power Drain & Bottom Enclosure Removal",
        description: "Power down unit, disconnect AC adapter, remove bottom enclosure, disconnect battery harness, and inspect cooling blowers for hair, dust buildup, or bearing play.",
        toolRequired: "Torx T5 / Phillips #00 & Spudger",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Power off machine and disconnect AC power.",
          "Remove bottom casing fasteners and release retention clips.",
          "Disconnect the main battery connector from the motherboard to ensure safe working conditions.",
          "Inspect CPU and GPU blower fans for wobbling impeller blades or seized bearings."
        ],
        warnings: ["Disconnect battery before touching fan PWM headers to avoid shorting 5V fan rail."],
        tips: ["Spin the fan blade with your finger; a healthy fluid-dynamic bearing spins silently with zero friction."],
        checkpoints: ["Chassis opened and battery isolated with clear access to all cooling assembly screws."],
        imageUrl: IMAGES2.screenTeardown1
      },
      {
        stepNumber: 2,
        phase: "Phase 2: Cooling Assembly & Fan Removal",
        title: "Fan Header Disconnection & Heatsink Extraction",
        description: "Unplug 4-pin PWM fan headers, loosen heatsink screws in reverse numerical order, and gently lift the copper heatpipe assembly away from the motherboard.",
        toolRequired: "Phillips #00 & Nylon Tweezers",
        torqueSpec: "Reverse Sequence Loosening",
        subSteps: [
          "Unplug the 4-pin PWM fan headers from the logic board using nylon tweezers.",
          "Loosen the spring-loaded heatsink screws in reverse stamped sequence (4 -> 3 -> 2 -> 1).",
          "Remove the independent fan casing screws securing blowers to the magnesium chassis.",
          "Gently twist and lift the copper heatpipe assembly away from the CPU/GPU silicon dies."
        ],
        warnings: ["Never pry roughly against copper heatpipes; bending them creates vapor chamber capillary leaks."],
        tips: ["If old paste is hardened like cement, warm the heatsink slightly with a hairdryer before lifting."],
        checkpoints: ["Heatsink and fan modules removed cleanly without bending copper fins."],
        imageUrl: IMAGES2.thermalPaste
      },
      {
        stepNumber: 3,
        phase: "Phase 3: Exhaust Fin Decontamination & Fan Replacement",
        title: "Radiator Fin Blowout & New Fan Mounting",
        description: "Blow compressed air through exhaust radiator fins from the outside inward, wipe fan bays, and mount brand-new fluid-dynamic bearing fan units.",
        toolRequired: "Electric Air Blower & Soft Brush",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Blow compressed air through copper exhaust radiator fin stacks to dislodge felt-like dust mats.",
          "Clean old dried thermal compound from copper baseplates using 99% IPA until mirror finish.",
          "Unscrew old blower fans from the heatpipe shroud and mount new OEM fluid-dynamic bearing fans.",
          "Fasten fan-to-heatsink mounting screws to 0.20 Nm."
        ],
        warnings: ["Ensure no loose dust debris remains inside the chassis cavity."],
        tips: ["Check that the sponge foam airflow sealing gasket around the exhaust vents is intact."],
        checkpoints: ["Radiator fins are 100% transparent to light with zero dust blockages."],
        imageUrl: IMAGES2.cleaningBlower
      },
      {
        stepNumber: 4,
        phase: "Phase 4: Direct-Die Repasting & Sequential Torque",
        title: "Thermal Compound Application & Sequential Tightening",
        description: "Clean CPU/GPU dies with 99% IPA, apply high-performance thermal paste, seat heatsink, torque screws sequentially, and reconnect PWM fan headers.",
        toolRequired: "Arctic MX-6 & Torque Screwdriver",
        torqueSpec: "0.20 Nm (Sequential 1 -> 2 -> 3 -> 4)",
        subSteps: [
          "Clean CPU and GPU silicon dies with 99% IPA and lint-free wipes.",
          "Apply a pea-sized dot of Arctic MX-6 to the CPU die and an X-pattern to the larger GPU die.",
          "Inspect VRAM thermal pads, replacing any torn pads with 1.0mm 12.8 W/mK silicone pads.",
          "Lower heatsink assembly straight down onto the dies.",
          "Tighten screws in stamped numerical order (1 -> 2 -> 3 -> 4) to ensure uniform mounting pressure.",
          "Plug both 4-pin PWM fan headers firmly into motherboard sockets."
        ],
        warnings: ["Tightening heatsink screws out of order causes uneven paste spread and thermal throttling."],
        tips: ["Double check that both fan cables are fully plugged in before closing the bottom cover."],
        checkpoints: ["All heatsink screws torqued down snug and both fan cables securely connected."],
        imageUrl: IMAGES2.thermalPaste
      },
      {
        stepNumber: 5,
        phase: "Phase 5: Reassembly & Thermal Stress Benchmark",
        title: "Chassis Closure, Fan PWM RPM Test & Thermal Benchmark",
        description: "Reconnect battery, fasten bottom cover, boot into OS, verify fan tachometer RPM readings, and run 15-minute thermal load benchmark.",
        toolRequired: "HWiNFO64 & Cinebench / FurMark",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Reconnect internal battery harness and snap bottom enclosure into place.",
          "Fasten all perimeter chassis screws.",
          "Boot into OS and launch HWiNFO64 sensor monitor.",
          "Verify both CPU and GPU fan RPM sensors ramp up smoothly when initiating load.",
          "Run Cinebench R23 multi-core test; verify CPU temperatures stay under 85\xB0C with zero thermal throttling."
        ],
        warnings: ["If fans fail to spin under load, immediately power off and verify fan header connections."],
        tips: ["Create a custom fan curve in OEM software to optimize acoustics vs cooling performance."],
        checkpoints: ["CPU and GPU operate at maximum boost frequencies under 82\xB0C with whisper-quiet fan acoustics."],
        imageUrl: IMAGES2.osRecovery
      }
    ],
    imageUrl: IMAGES2.thermalPaste
  },
  // ----------------------------------------------------
  // SOFTWARE (4 Templates)
  // ----------------------------------------------------
  {
    category: "software",
    titleSuffix: "UEFI / BIOS Firmware Recovery & Crisis Flash Protocol",
    descSuffix: "Start-to-finish UEFI firmware restoration: prepare FAT32 crisis flash media, trigger hardware flashback protocols, clear corrupted NVRAM, and restore microcode integrity.",
    difficulty: "medium",
    estimatedTime: "20-30 min",
    tools: ["FAT32 Formatted USB Flash Drive (8GB/16GB)", "OEM BIOS Firmware Binary", "Stable AC Power Source", "Hardware FlashBack Button / Key Combinations"],
    warnings: [
      "NEVER unplug AC power or force reboot while the BIOS EEPROM write cycle is active (interruption results in bricked SPI ROM).",
      "Ensure battery has at least 50% charge and OEM AC adapter is plugged into a stable wall outlet."
    ],
    steps: [
      {
        stepNumber: 1,
        phase: "Phase 1: Crisis USB Preparation & ROM Renaming",
        title: "FAT32 MBR USB Drive Formatting & Firmware File Staging",
        description: "Format a clean USB flash drive to FAT32 with MBR partition table, download the verified OEM BIOS binary, and rename it to the hardware emergency FlashBack string.",
        toolRequired: "Rufus / Disk Management & USB Drive",
        torqueSpec: "N/A",
        subSteps: [
          "Insert an 8GB or 16GB USB drive into a working computer.",
          "Format the USB drive to FAT32 filesystem with MBR partition table (not GPT) and 4096-byte cluster size.",
          "Download the official OEM BIOS firmware update package from the manufacturer support portal.",
          "Extract the raw `.bin` or `.CAP` BIOS binary file onto the root directory of the USB drive.",
          "Rename the file to the specific vendor crisis string (e.g., `creative.rom`, `ASUS.CAP`, `bios.bin` per vendor specs)."
        ],
        warnings: ["Do not place BIOS binary in subfolders; it must sit on the USB root directory `E:\\`."],
        tips: ["Use USB 2.0 flash drives when possible, as legacy crisis BIOS loaders sometimes struggle with USB 3.2 controllers."],
        checkpoints: ["USB drive formatted to FAT32 MBR with single verified BIOS binary on root directory."],
        imageUrl: IMAGES2.biosScreen
      },
      {
        stepNumber: 2,
        phase: "Phase 2: CMOS Clear & Hardware FlashBack Trigger",
        title: "Hardware FlashBack Execution & Emergency Recovery",
        description: "Plug crisis drive into the dedicated BIOS FlashBack USB port, trigger the hardware recovery key combination, and observe status LED flashing cadence.",
        toolRequired: "OEM AC Power Adapter",
        torqueSpec: "N/A",
        subSteps: [
          "Connect AC power adapter to the bricked system (ensure battery is connected).",
          "Insert the prepared USB flash drive into the rear FlashBack USB port (or leftmost USB port).",
          "For desktop boards: Hold the BIOS FlashBack button for 3 seconds until the LED starts blinking.",
          "For laptops: Hold emergency recovery key combination (Dell: `Ctrl + Esc`, HP: `Win + B`, Lenovo: `Fn + R`) while inserting AC power and pressing Power button.",
          "Release keys once the screen flashes or fans spin at maximum RPM."
        ],
        warnings: ["Do not touch the system or remove USB drive while the FlashBack LED is blinking."],
        tips: ["The FlashBack LED blinks slowly initially (reading ROM) then blinks rapidly (erasing and programming EEPROM)."],
        checkpoints: ["FlashBack LED starts regular blinking cycle confirming active EEPROM write."],
        imageUrl: IMAGES2.osRecovery
      },
      {
        stepNumber: 3,
        phase: "Phase 3: EEPROM Write Cycle & Automated Reboot",
        title: "Microcode Programming, Verification & Automatic POST Cycle",
        description: "Allow the automated flash engine to erase, program, and verify all SPI ROM blocks (3-7 minutes) until the system initiates cold POST reboot.",
        toolRequired: "System Auto-Engine",
        torqueSpec: "N/A",
        subSteps: [
          "Wait 3 to 7 minutes while the system programs the main BIOS, EC microcode, and Intel ME / AMD PSP regions.",
          "Observe the flash completion indicator: FlashBack LED turns solid OFF and the system powers down.",
          "The system will automatically power on, cycle fans 2-3 times, and perform cold memory training.",
          "Wait for the OEM logo to appear on screen; tap F2/Del to enter BIOS Setup."
        ],
        warnings: ["Multiple automated reboots during first boot are completely normal as memory training runs."],
        tips: ["If screen stays black after 5 minutes, power off, remove RTC CMOS coin cell for 60 seconds, and retry."],
        checkpoints: ["System boots successfully into BIOS Setup with updated firmware version displayed."],
        imageUrl: IMAGES2.biosScreen
      },
      {
        stepNumber: 4,
        phase: "Phase 4: BIOS Security & Boot Configuration",
        title: "Load Factory Defaults, Secure Boot & TPM 2.0 Restoration",
        description: "Load Optimized Factory Defaults in BIOS, enable Intel PTT / AMD fTPM, configure Secure Boot keys, and set primary NVMe boot order.",
        toolRequired: "BIOS Interface",
        torqueSpec: "N/A",
        subSteps: [
          "Press `F9` (Load Optimized Defaults) in BIOS and press Enter to clear corrupted NVRAM variables.",
          "Navigate to `Security` > `Intel PTT` or `AMD fTPM` > Set to `Enabled`.",
          "Navigate to `Boot` / `Security` > `Secure Boot` > Set to `Enabled` (Standard Mode).",
          "Navigate to `Boot Order` > Set Windows Boot Manager on NVMe SSD as `Boot Option #1`.",
          "Press `F10` to Save Changes and Exit."
        ],
        warnings: ["Verify SATA/NVMe controller mode (AHCI vs RAID/VMD) matches the original installation or OS will BSOD with INACCESSIBLE_BOOT_DEVICE."],
        tips: ["Take a photo of BIOS configuration settings for your maintenance records."],
        checkpoints: ["BIOS settings saved and system boots directly into Windows desktop."],
        imageUrl: IMAGES2.terminal
      },
      {
        stepNumber: 5,
        phase: "Phase 5: Post-Repair Operating System Verification",
        title: "Windows Device Manager Check & Firmware Verification",
        description: "Boot into Windows, open System Information (`msinfo32`), verify BIOS Version/Date, inspect Device Manager for missing drivers, and test sleep/wake states.",
        toolRequired: "msinfo32 & Device Manager",
        torqueSpec: "N/A",
        subSteps: [
          "Press `Win + R`, type `msinfo32`, and press Enter.",
          "Verify BIOS Version/Date matches the newly flashed release.",
          "Open Device Manager (`devmgmt.msc`) and confirm zero yellow exclamation marks under Firmware or System Devices.",
          "Test System Sleep, Hibernation, and Cold Restart cycles to ensure rock-solid ACPI power state transitions."
        ],
        warnings: ["If Windows BitLocker prompts for a recovery key, enter the 48-digit key once to re-bind TPM PCR registers."],
        tips: ["Run `sfc /scannow` in Admin Command Prompt to ensure system files are pristine."],
        checkpoints: ["Windows operates flawlessly with verified updated BIOS firmware."],
        imageUrl: IMAGES2.osRecovery
      }
    ],
    imageUrl: IMAGES2.biosScreen
  },
  {
    category: "software",
    titleSuffix: "EFI Bootloader & BCD Partition Reconstruction",
    descSuffix: "Start-to-finish UEFI boot repair: rebuild corrupted 100MB FAT32 EFI system partitions, restore BCD stores, repair master boot records, and resolve 0xc000000e errors.",
    difficulty: "medium",
    estimatedTime: "25-35 min",
    tools: ["Windows 11/10 Recovery USB Installation Media", "Command Prompt (Diskpart, BCDboot, Bootrec)"],
    warnings: [
      "Exercise extreme caution when formatting volumes in Diskpart. Verify disk and partition volume numbers carefully to avoid wiping data drives."
    ],
    steps: [
      {
        stepNumber: 1,
        phase: "Phase 1: Boot Recovery Media & Command Environment",
        title: "Boot from Windows Recovery Media into Command Prompt",
        description: "Insert Windows Recovery USB, boot into UEFI installation environment, navigate to Advanced Troubleshooting, and open Administrative Command Prompt.",
        toolRequired: "Windows Recovery USB Media",
        torqueSpec: "N/A",
        subSteps: [
          "Insert Windows Installation / Recovery USB drive into target machine.",
          "Power on and tap F12/F11/F8 to open UEFI Boot Menu; select UEFI USB drive.",
          "On the Windows Setup screen, click `Next` > click `Repair your computer` in bottom-left corner.",
          "Select `Troubleshoot` > select `Advanced Options` > select `Command Prompt`."
        ],
        warnings: ["Do not click 'Install Now' as that initiates fresh operating system overwrite."],
        tips: ["Command Prompt runs under drive letter `X:\\Sources` in Windows Preinstallation Environment (WinPE)."],
        checkpoints: ["Administrative Command Prompt window open at `X:\\windows\\system32>`."],
        imageUrl: IMAGES2.terminal
      },
      {
        stepNumber: 2,
        phase: "Phase 2: Diskpart Partition Triage & Drive Letter Assignment",
        title: "Locate OS Partition & Assign Letter to Hidden EFI Volume",
        description: "Run `diskpart` utility to identify the Windows OS volume (usually C: or D:) and mount the hidden ~100MB FAT32 EFI System Partition as drive `S:`.",
        toolRequired: "Diskpart CLI Utility",
        torqueSpec: "N/A",
        subSteps: [
          "Type `diskpart` and press Enter.",
          "Type `list volume` to view all partitions, filesystems, and assigned letters.",
          "Identify the Windows OS volume (NTFS, ~500GB/1TB) and note its drive letter (e.g. `C:` or `D:`).",
          "Locate the ~100MB FAT32 System partition (Volume label often 'System' or blank).",
          "Type `select volume X` (replace X with the ~100MB FAT32 volume number).",
          "Type `assign letter=S:` to mount the EFI partition.",
          "Type `exit` to return to standard command prompt."
        ],
        warnings: ["Never format the main NTFS OS partition containing your user data."],
        tips: ["If the EFI partition is formatted in RAW or corrupted, format it to FAT32 via `format fs=fat32 quick label=System`."],
        checkpoints: ["EFI partition successfully mounted with drive letter `S:`."],
        imageUrl: IMAGES2.osRecovery
      },
      {
        stepNumber: 3,
        phase: "Phase 3: BCD Store Reconstruction & Boot File Generation",
        title: "Rebuild UEFI BCD Store via BCDBoot",
        description: "Execute `bcdboot` command to inject fresh UEFI boot files from the Windows directory into the mounted EFI partition `S:`.",
        toolRequired: "BCDBoot CLI Tool",
        torqueSpec: "N/A",
        subSteps: [
          "Navigate to S: drive by typing `S:` and press Enter.",
          "Navigate to EFI folder: `cd EFI\\Microsoft\\Boot` (if folder exists).",
          "Execute the master boot file generation command: `bcdboot C:\\Windows /s S: /f UEFI /v`.",
          "Verify the terminal output confirms: `Boot files successfully created.`"
        ],
        warnings: ["If Windows partition is mounted as D:, change path to `bcdboot D:\\Windows /s S: /f UEFI`."],
        tips: ["The `/f UEFI` parameter ensures modern UEFI bootloader files are created, bypassing legacy MBR."],
        checkpoints: ["Terminal returns 'Boot files successfully created.'"],
        imageUrl: IMAGES2.terminal
      },
      {
        stepNumber: 4,
        phase: "Phase 4: Master Boot Record & NVRAM Entry Verification",
        title: "Bootrec Scans & UEFI Boot Order Re-registration",
        description: "Execute boot sector repair commands and scan for installed Windows installations to ensure complete registry integration.",
        toolRequired: "Bootrec CLI Utility",
        torqueSpec: "N/A",
        subSteps: [
          "Type `bootrec /fixmbr` and press Enter.",
          "Type `bootrec /fixboot` and press Enter (if Access Denied, `bcdboot` already repaired the store).",
          "Type `bootrec /scanos` and confirm it identifies `Total identified Windows installations: 1`.",
          "Type `exit` and close Command Prompt."
        ],
        warnings: ["Ensure you remove the USB flash drive before rebooting."],
        tips: ["If multiple Windows installs exist, `bootrec /rebuildbcd` allows selecting which OS to add to the menu."],
        checkpoints: ["Scanned OS count = 1 with zero unlinked volumes."],
        imageUrl: IMAGES2.terminal
      },
      {
        stepNumber: 5,
        phase: "Phase 5: Post-Repair Cold Boot & OS Startup Verification",
        title: "Reboot, UEFI Boot Priority & Windows Desktop Boot",
        description: "Remove recovery USB, power cycle machine, enter BIOS to verify 'Windows Boot Manager' priority, and boot seamlessly into Windows desktop.",
        toolRequired: "System Auto-Engine",
        torqueSpec: "N/A",
        subSteps: [
          "Remove the USB recovery drive.",
          "Click `Continue (Exit and continue to Windows)`.",
          "If needed, enter BIOS and ensure `Windows Boot Manager` on NVMe SSD is Top Priority.",
          "Allow system to boot directly into Windows lock screen without any BSOD or recovery prompts.",
          "Open Command Prompt as Administrator and run `bcdedit /enum` to verify all EFI paths are pristine."
        ],
        warnings: ["If BitLocker prompts on first boot, enter the 48-digit key to allow TPM to re-lock to the new BCD signature."],
        tips: ["Create a system restore point once boot stability is confirmed."],
        checkpoints: ["Windows boots seamlessly in under 10 seconds."],
        imageUrl: IMAGES2.osRecovery
      }
    ],
    imageUrl: IMAGES2.terminal
  },
  {
    category: "software",
    titleSuffix: "BSOD Kernel Triage & Clean OS Driver Reinstallation",
    descSuffix: "Start-to-finish BSOD resolution: analyze minidump stack traces (WinDbg), execute DDU clean driver wipes in Safe Mode, and install verified WHQL driver packages.",
    difficulty: "easy",
    estimatedTime: "20-30 min",
    tools: ["Display Driver Uninstaller (DDU)", "OEM WHQL Driver Package", "WinDbg Preview", "Windows Safe Mode"],
    warnings: [
      "Disconnect your ethernet cable and Wi-Fi during DDU reinstallation to prevent Windows Update from automatically downloading generic display drivers."
    ],
    steps: [
      {
        stepNumber: 1,
        phase: "Phase 1: Minidump Analysis & Driver Fault Isolation",
        title: "WinDbg Kernel Minidump Triage & Crash Root-Cause Analysis",
        description: "Examine Windows kernel crash dumps in `C:\\Windows\\Minidump` using WinDbg to pinpoint the offending driver module (e.g. nvlddmkm.sys, amdkmdag.sys, rtpx64.sys).",
        toolRequired: "WinDbg Preview / BlueScreenView",
        torqueSpec: "N/A",
        subSteps: [
          "Open WinDbg Preview as Administrator.",
          "Click `File` > `Open Dump File` and browse to `C:\\Windows\\Minidump\\*.dmp`.",
          "Type `!analyze -v` in the command prompt and press Enter.",
          "Examine the `BUGCHECK_CODE`, `MODULE_NAME`, and `FAILURE_BUCKET_ID` lines to identify the offending `.sys` driver."
        ],
        warnings: ["If minidump points to `ntoskrnl.exe` or `hardware`, run PassMark MemTest86 to check for bad RAM."],
        tips: ["Look at the IMAGE_NAME line to see the exact driver file responsible for the crash."],
        checkpoints: ["Faulty kernel driver identified (e.g. GPU, Audio, Wi-Fi driver)."],
        imageUrl: IMAGES2.terminal
      },
      {
        stepNumber: 2,
        phase: "Phase 2: Safe Mode Boot & Network Isolation",
        title: "Network Disconnection & Clean Safe Mode Boot",
        description: "Disconnect active internet connections, stage the latest verified OEM WHQL driver installer, and boot Windows into Safe Mode without networking.",
        toolRequired: "Windows Advanced Startup",
        torqueSpec: "N/A",
        subSteps: [
          "Download the latest official WHQL driver package from NVIDIA, AMD, or Intel and save to Desktop.",
          "Download Display Driver Uninstaller (DDU) and extract to Desktop.",
          "Disconnect ethernet cable and turn off Wi-Fi.",
          "Hold `Shift` key while clicking `Start` > `Power` > `Restart`.",
          "Navigate to `Troubleshoot` > `Advanced Options` > `Startup Settings` > click `Restart` > press `4` for Safe Mode."
        ],
        warnings: ["Keeping internet connected during driver wiping causes Windows Update to inject conflicting driver DLLs."],
        tips: ["Safe Mode prevents GPU drivers from loading into active memory, allowing clean registry deletion."],
        checkpoints: ["Windows booted into Safe Mode (black desktop with 'Safe Mode' in corners)."],
        imageUrl: IMAGES2.osRecovery
      },
      {
        stepNumber: 3,
        phase: "Phase 3: DDU Deep Registry Clean & Cache Purge",
        title: "Display Driver Uninstaller (DDU) Deep Clean Execution",
        description: "Run DDU in Safe Mode to wipe all driver binaries, registry entries, display caches, and shader pipelines.",
        toolRequired: "Display Driver Uninstaller (DDU)",
        torqueSpec: "N/A",
        subSteps: [
          "Launch `Display Driver Uninstaller.exe` as Administrator.",
          "Under 'Select device type', select `GPU` (or `Audio` if fixing sound crashes).",
          "Select the device manufacturer (`NVIDIA`, `AMD`, or `Intel`).",
          "Click `Clean and restart` button.",
          "Allow DDU to purge registry keys, system32 driver stores, and reboot Windows automatically."
        ],
        warnings: ["Do not interrupt DDU while it is purging registry keys."],
        tips: ["Check 'Remove C:\\NVIDIA and C:\\AMD folders' in DDU settings for a 100% clean baseline."],
        checkpoints: ["System completes clean wipe and restarts into standard Windows resolution."],
        imageUrl: IMAGES2.terminal
      },
      {
        stepNumber: 4,
        phase: "Phase 4: Clean WHQL Driver Installation",
        title: "Official OEM Driver Installation with Clean Setup",
        description: "Run the pre-downloaded official driver setup wizard, check 'Perform Clean Install', and install verified signed drivers.",
        toolRequired: "OEM WHQL Setup Package",
        torqueSpec: "N/A",
        subSteps: [
          "Launch the driver installer package (e.g. NVIDIA / AMD / Intel setup).",
          "Select `Custom (Advanced)` installation options.",
          "Check the box: `Perform a clean installation` (resets all driver profiles to factory defaults).",
          "Complete installation and restart the computer."
        ],
        warnings: ["Do not install beta or non-WHQL drivers on mission-critical technician workstations."],
        tips: ["Reconnect internet only AFTER the driver setup has fully completed and rebooted."],
        checkpoints: ["Driver installed with native display resolution and multi-monitor support active."],
        imageUrl: IMAGES2.osRecovery
      },
      {
        stepNumber: 5,
        phase: "Phase 5: Post-Repair Stability Verification & Stress Testing",
        title: "Stress Testing, DISM System File Scan & Event Viewer Check",
        description: "Reconnect internet, run DISM / SFC scans, launch FurMark / 3DMark benchmark for 20 minutes, and verify Event Viewer has zero WHEA errors.",
        toolRequired: "SFC, DISM & FurMark Benchmark",
        torqueSpec: "N/A",
        subSteps: [
          "Open Admin Command Prompt and run `DISM /Online /Cleanup-Image /RestoreHealth` followed by `sfc /scannow`.",
          "Launch FurMark / 3DMark and run full GPU/CPU stress test for 15 minutes.",
          "Open Event Viewer (`eventvwr.msc`) > `Windows Logs` > `System` and filter for `Critical` and `Error` events.",
          "Verify zero WHEA-Logger or display driver crash entries appear."
        ],
        warnings: ["If BSOD recurs under load, perform hardware memory testing with PassMark MemTest86."],
        tips: ["Keep a clean system restore point created after driver stabilization."],
        checkpoints: ["System passes 15-minute 100% load stress test with 0 crashes or artifacting."],
        imageUrl: IMAGES2.terminal
      }
    ],
    imageUrl: IMAGES2.osRecovery
  },
  {
    category: "software",
    titleSuffix: "Secure Boot, TPM 2.0 & BitLocker State Restoration",
    descSuffix: "Start-to-finish security chip restoration: re-initialize hardware TPM 2.0 / Intel PTT, clear corrupted cryptographic PCR banks, and resolve BitLocker recovery loops.",
    difficulty: "medium",
    estimatedTime: "20-25 min",
    tools: ["BitLocker 48-digit Recovery Key", "BIOS Security Menu Access", "TPM.msc Management Console"],
    warnings: [
      "CRITICAL: You MUST have your 48-digit Microsoft BitLocker Recovery Key backed up before clearing TPM cryptographic security keys."
    ],
    steps: [
      {
        stepNumber: 1,
        phase: "Phase 1: BitLocker Key Verification & Backup",
        title: "Verify BitLocker Recovery Key & Retrieve 48-Digit Token",
        description: "Log into your Microsoft account or enterprise Active Directory portal to retrieve and verify the 48-digit BitLocker recovery key for the target drive.",
        toolRequired: "Microsoft Account Portal / Printout",
        torqueSpec: "N/A",
        subSteps: [
          "Visit `account.microsoft.com/devices/recoverykey` on a phone or secondary PC.",
          "Locate the Recovery Key matching the `Key ID` displayed on the blue BitLocker recovery screen.",
          "Write down the complete 48-digit numerical recovery token."
        ],
        warnings: ["Never clear TPM if you do not have the BitLocker recovery key; data will be permanently inaccessible."],
        tips: ["Print a physical copy of your BitLocker recovery key to store in a secure lockbox."],
        checkpoints: ["48-digit recovery key verified against matching Key ID."],
        imageUrl: IMAGES2.biosScreen
      },
      {
        stepNumber: 2,
        phase: "Phase 2: BIOS TPM 2.0 & Secure Boot Configuration",
        title: "Enable Intel PTT / AMD fTPM & Reset Secure Boot Keys",
        description: "Enter UEFI BIOS, navigate to Security settings, enable Intel Platform Trust Technology (PTT) / AMD fTPM, and restore factory default Secure Boot keys.",
        toolRequired: "BIOS Security Interface",
        torqueSpec: "N/A",
        subSteps: [
          "Power on system and tap F2/Del to enter BIOS Setup.",
          "Navigate to `Security` > `Intel PTT` or `AMD fTPM` > Set to `Enabled`.",
          "Navigate to `Secure Boot` > Set to `Enabled` > Select `Restore Factory Default Keys` (PK, KEK, db, dbx).",
          "Save changes and exit BIOS."
        ],
        warnings: ["Do not disable Secure Boot on Windows 11 systems or OS security features will fail to load."],
        tips: ["If TPM state is stuck, select 'Clear TPM' option inside BIOS Setup."],
        checkpoints: ["TPM 2.0 and Secure Boot enabled in Standard factory mode."],
        imageUrl: IMAGES2.terminal
      },
      {
        stepNumber: 3,
        phase: "Phase 3: BitLocker Recovery Key Entry & PCR Re-bind",
        title: "Enter Recovery Key & Re-bind Platform Configuration Registers",
        description: "Enter the 48-digit BitLocker key on the startup prompt, boot into Windows, and allow the system to re-bind TPM PCR registers.",
        toolRequired: "Keyboard Input",
        torqueSpec: "N/A",
        subSteps: [
          "On the blue BitLocker screen, type the 48-digit recovery key using the number keys.",
          "Press Enter to unlock the encrypted drive.",
          "Allow Windows to boot normally into the login screen.",
          "Log into Windows with administrator credentials."
        ],
        warnings: ["If key is rejected, verify numerical keypad NumLock state."],
        tips: ["Windows will automatically re-seal the encryption key into the TPM chip on successful logon."],
        checkpoints: ["Windows boots seamlessly to desktop."],
        imageUrl: IMAGES2.osRecovery
      },
      {
        stepNumber: 4,
        phase: "Phase 4: TPM State Verification & Windows Hello Re-enrollment",
        title: "TPM Console Verification & Windows Hello PIN Reset",
        description: "Open `tpm.msc` to confirm 'The TPM is ready for use', reset Windows Hello biometric / PIN credentials, and confirm encryption health.",
        toolRequired: "tpm.msc & Windows Settings",
        torqueSpec: "N/A",
        subSteps: [
          "Press `Win + R`, type `tpm.msc`, and press Enter.",
          "Confirm status reads: `The TPM is ready for use` with Specification Version `2.0`.",
          "Open `Settings` > `Accounts` > `Sign-in options` > `PIN (Windows Hello)`.",
          "Click `Remove` and re-create a new Windows Hello PIN to re-enroll cryptographic keys.",
          "Re-scan fingerprint or facial recognition biometrics."
        ],
        warnings: ["Do not skip PIN re-creation or future sign-in prompts may freeze."],
        tips: ["Run `manage-bde -status` in Admin Command Prompt to verify BitLocker protection is 100% active."],
        checkpoints: ["TPM 2.0 active and Windows Hello PIN functioning flawlessly."],
        imageUrl: IMAGES2.terminal
      }
    ],
    imageUrl: IMAGES2.biosScreen
  },
  // ----------------------------------------------------
  // CLEANING (4 Templates)
  // ----------------------------------------------------
  {
    category: "cleaning",
    titleSuffix: "Thermal Module Deep Clean & Phase-Change Repasting",
    descSuffix: "Start-to-finish thermal restoration: chemical TIM de-greasing, copper radiator fin blowout, phase-change PTM7950 pad application, and sequential torque calibration.",
    difficulty: "medium",
    estimatedTime: "30-45 min",
    tools: ["99.9% Anhydrous Isopropyl Alcohol", "Microfiber Swabs", "Honeywell PTM7950 / Arctic MX-6", "Electric Compressed Air Blower", "Torx T5 / Phillips #00"],
    warnings: [
      "Never scrape nickel-plated or bare copper heatsink baseplates with metallic blades; microscopic gouges create air pockets and hotspots.",
      "Tighten heatsink screws strictly in stamped numerical order (1-2-3-4) to prevent cracking bare silicon CPU/GPU dies."
    ],
    steps: [
      {
        stepNumber: 1,
        phase: "Phase 1: Pre-Disassembly Diagnostics & Power Isolation",
        title: "Chassis Depower & Battery Harness Decoupling",
        description: "Power down laptop, disconnect AC charger, remove bottom enclosure, and disconnect the main battery power harness to prevent electrical shorts.",
        toolRequired: "Torx T5 / Phillips #00 & Spudger",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Shut down computer, unplug AC adapter, and put on ESD wrist strap.",
          "Remove bottom casing screws and pop perimeter retaining clips.",
          "Disconnect the internal battery connector from the motherboard.",
          "Hold power button for 10 seconds to drain residual filter capacitors."
        ],
        warnings: ["Never work on cooling assemblies while the battery is connected."],
        tips: ["Keep a magnetic screw tray handy to organize heatsink vs chassis fasteners."],
        checkpoints: ["Battery disconnected and confirmed at 0V across logic board."],
        imageUrl: IMAGES2.screenTeardown1
      },
      {
        stepNumber: 2,
        phase: "Phase 2: Cooling Assembly Removal & Chemical Degreasing",
        title: "Heatsink Dismount & 99% IPA Paste Dissolution",
        description: "Disconnect fan headers, loosen heatsink screws in reverse order (4-3-2-1), lift copper assembly, and dissolve crusty old paste with 99% IPA.",
        toolRequired: "Phillips #00, 99.9% IPA & Microfiber Wipes",
        torqueSpec: "Reverse Sequence Loosening",
        subSteps: [
          "Unplug fan PWM cables from motherboard.",
          "Loosen spring-loaded screws in reverse order (4 -> 3 -> 2 -> 1).",
          "Gently lift heatsink straight up from the silicon dies.",
          "Saturate a lint-free wipe with 99.9% IPA and dissolve dried crusty thermal paste from CPU/GPU silicon dies and copper baseplates until mirror clean.",
          "Use a soft ESD swab dipped in IPA to clean residual paste from around SMD capacitors on the processor substrate."
        ],
        warnings: ["Do not knock off tiny surface-mount capacitors around the processor die with excessive pressure."],
        tips: ["99.9% anhydrous IPA evaporates completely in seconds without leaving water moisture."],
        checkpoints: ["Silicon dies and copper contact plates are 100% mirror clean with zero residue."],
        imageUrl: IMAGES2.thermalPaste
      },
      {
        stepNumber: 3,
        phase: "Phase 3: Exhaust Radiator Fin Decontamination",
        title: "Pressurized Fin Stack Blowout & Impeller Degreasing",
        description: "Blow compressed air through copper exhaust radiator fin stacks from the outside inward, remove lint mats, and clean blower impellers.",
        toolRequired: "Electric Air Blower & Soft Brush",
        torqueSpec: "N/A",
        subSteps: [
          "Hold fan impellers stationary with a finger to prevent over-spinning.",
          "Direct high-pressure air blast through exhaust fins from the exterior towards the interior to dislodge trapped lint mats.",
          "Use a soft ESD brush to wipe micro-dust from individual fan impeller blades.",
          "Wipe internal fan intake shrouds clean with microfiber cloth."
        ],
        warnings: ["Over-spinning fans with air guns destroys fluid-dynamic bearings and generates reverse EMF voltage."],
        tips: ["Inspect fin stacks against a light source to verify all air channels are 100% unobstructed."],
        checkpoints: ["Fin stacks completely clean with zero lint or dust build-up."],
        imageUrl: IMAGES2.cleaningBlower
      },
      {
        stepNumber: 4,
        phase: "Phase 4: Phase-Change PTM7950 / Paste Application & Torquing",
        title: "Phase-Change TIM Application & Sequential Heatsink Tightening",
        description: "Apply pre-cut Honeywell PTM7950 phase-change pad or Arctic MX-6, renew VRAM thermal pads, lower heatsink, and torque screws sequentially (1-2-3-4).",
        toolRequired: "PTM7950 / Arctic MX-6 & Torque Screwdriver",
        torqueSpec: "0.20 Nm (Sequential 1 -> 2 -> 3 -> 4)",
        subSteps: [
          "Cut PTM7950 phase-change pad to exact dimensions of CPU and GPU silicon dies.",
          "Peel bottom protective film, apply pad to die, press gently, and peel top protective film.",
          "Inspect VRAM thermal pads; replace any torn pads with 12.8 W/mK silicone pads of matching caliper thickness.",
          "Lower copper cooling assembly straight down onto the dies.",
          "Tighten screws in stamped numerical order (1 -> 2 -> 3 -> 4) to ensure uniform die pressure.",
          "Plug both 4-pin PWM fan headers firmly into motherboard sockets."
        ],
        warnings: ["Do not forget to peel the clear plastic film from both sides of the PTM7950 pad."],
        tips: ["Chill PTM7950 pad in the refrigerator for 5 minutes before peeling plastic film for effortless application."],
        checkpoints: ["Heatsink mounted flat with screws fully seated in sequence and fan headers connected."],
        imageUrl: IMAGES2.thermalPaste
      },
      {
        stepNumber: 5,
        phase: "Phase 5: Reassembly & Thermal Stress Burn-In Verification",
        title: "Enclosure Assembly, Fan RPM Verification & Load Benchmarking",
        description: "Reconnect battery, close bottom cover, boot into OS, verify fan tachometers, and run a 20-minute Cinebench R23 multi-core thermal stress benchmark.",
        toolRequired: "HWiNFO64 & Cinebench R23",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Reconnect internal battery harness and fasten bottom chassis enclosure.",
          "Boot into Windows and launch HWiNFO64.",
          "Check idle temperatures: CPU should idle between 38\xB0C and 46\xB0C.",
          "Run Cinebench R23 10-minute throttle loop; verify CPU temperatures stabilize under 84\xB0C with zero thermal throttling.",
          "Verify fan acoustics are smooth and quiet with zero bearing rattle."
        ],
        warnings: ["If CPU instantly hits 100\xB0C under load, immediately power off and verify heatsink mounting contact."],
        tips: ["PTM7950 undergoes a phase change above 45\xB0C, improving thermal conductivity further after the first heat cycle."],
        checkpoints: ["Temperatures reduced by 12-20\xB0C compared to pre-maintenance baseline."],
        imageUrl: IMAGES2.osRecovery
      }
    ],
    imageUrl: IMAGES2.thermalPaste
  },
  {
    category: "cleaning",
    titleSuffix: "Ultrasonic Bath & Liquid Spill Corrosion Decontamination",
    descSuffix: "Start-to-finish board-level fluid restoration: power isolation, ultrasonic sweep cleaning in 99.9% anhydrous alcohol, oven dehydration, and micro-soldering touch-up.",
    difficulty: "hard",
    estimatedTime: "90-120 min",
    tools: ["Heated Ultrasonic Cleaner (40kHz)", "99.9% Anhydrous Isopropyl Alcohol", "Stereo Microscope", "Dehydration Oven (50\xB0C)", "Micro-Soldering Station"],
    warnings: [
      "NEVER submerge mechanical cooling fans, CMOS coin cells, microphone capsules, or camera modules in an ultrasonic cleaner.",
      "Do not power on a liquid-damaged board until full dehydration bake cycle and multi-rail resistance tests have passed."
    ],
    steps: [
      {
        stepNumber: 1,
        phase: "Phase 1: Emergency Power Cut & Board Strip-Down",
        title: "Immediate Power Isolation & Complete Component Stripping",
        description: "Instantly disconnect main battery and RTC CMOS battery. Strip all socketed components, heatsinks, RAM, SSDs, and plastic insulation shields.",
        toolRequired: "Torx T5 / Phillips #00 & ESD Mat",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Immediately disconnect the battery harness and unplug RTC CMOS coin cell.",
          "Remove logic board from chassis.",
          "Remove cooling heatsink, fans, NVMe SSDs, Wi-Fi card, RAM SODIMMs, and CMOS battery.",
          "Peel off all black Mylar insulation tape and plastic stickers that could trap fluid underneath."
        ],
        warnings: ["Never attempt to turn on a wet laptop to 'see if it still works'; power turns water into instant electrolytic corrosion."],
        tips: ["Take close-up photos of corroded areas under the microscope before cleaning to record suspect power rails."],
        checkpoints: ["Motherboard completely stripped down to bare PCB with zero socketed peripherals."],
        imageUrl: IMAGES2.logicBoard
      },
      {
        stepNumber: 2,
        phase: "Phase 2: Microscopic Inspection & Pre-Wash Scrub",
        title: "Stereo Microscope Inspection & Localized Flux Scrub",
        description: "Inspect PCB under 40x stereo microscope for green copper carbonate oxidation, white calcium deposits, and burnt SMD power capacitors.",
        toolRequired: "Stereo Microscope & ESD Soft Brush",
        torqueSpec: "N/A",
        subSteps: [
          "Examine power delivery stages (VRM, DC-in, Charging IC) under microscope.",
          "Spot-treat heavy sugary syrup or coffee deposits with specialized PCB flux remover and a soft ESD brush.",
          "Desolder any visibly charred SMD ceramic capacitors that have shorted across power rails."
        ],
        warnings: ["Do not use wire brushes that can dislodge micro 0201 SMD resistors."],
        tips: ["Mark corroded regions with a fine-tip paint marker on the PCB margin for targeted post-wash inspection."],
        checkpoints: ["Heavy surface mineral crust dislodged prior to ultrasonic immersion."],
        imageUrl: IMAGES2.soldering
      },
      {
        stepNumber: 3,
        phase: "Phase 3: Ultrasonic Sweep Degreasing Cycle",
        title: "Ultrasonic Anhydrous Solvent Cleaning at 40kHz",
        description: "Place the motherboard in an ultrasonic cleaner basket submerged in 99.9% anhydrous IPA / PCB cleaning solution. Run an 8-minute sweep frequency cycle.",
        toolRequired: "Heated Ultrasonic Cleaner",
        torqueSpec: "N/A",
        subSteps: [
          "Fill ultrasonic cleaner tank with fresh 99.9% anhydrous isopropyl alcohol or specialized PCB wash solution.",
          "Place motherboard in the stainless steel suspension basket (never allow PCB to touch tank floor directly).",
          "Run an 8-minute sweep frequency cycle at 40kHz with heating set to 40\xB0C.",
          "Ultrasonic cavitation bubbles dislodge microscopic corrosion and flux minerals from beneath BGA chips (CPU, GPU, Chipset)."
        ],
        warnings: ["Ensure ultrasonic tank is well-ventilated; avoid open flames near alcohol vapors."],
        tips: ["Sweep frequency prevents standing waves from damaging delicate silicon wire bonds inside IC packages."],
        checkpoints: ["All green oxidation and sticky residues removed from underneath surface mount packages."],
        imageUrl: IMAGES2.ultrasonic
      },
      {
        stepNumber: 4,
        phase: "Phase 4: Oven Dehydration & Micro-Soldering Rework",
        title: "Oven Baking Dehydration (50\xB0C) & Solder Pad Restoration",
        description: "Bake motherboard in dehydration oven at 50\xB0C for 2 hours to evaporate all trapped solvent. Inspect under microscope and touch up corroded solder joints with leaded solder.",
        toolRequired: "Dehydration Oven & Soldering Iron",
        torqueSpec: "N/A",
        subSteps: [
          "Bake the PCB in a controlled drying oven at 50\xB0C (122\xB0F) for 2 to 3 hours to ensure 100% moisture evaporation from beneath BGA chips.",
          "Remove board and inspect under microscope.",
          "Apply tacky rosin flux (Amtech NC-559) to dull/corroded SMD pins.",
          "Touch up corroded solder joints with a fine J-tip soldering iron and 63/37 leaded solder to restore shiny metallurgical bonds.",
          "Measure resistance to ground on main power rails (+19V_VIN, +5V_ALW, +3.3V_ALW, +1.8V, VCORE); ensure no rail is shorted (<10\u03A9)."
        ],
        warnings: ["Never apply power if any major power rail measures 0\u03A9 short to ground."],
        tips: ["Replace any discolored 0402 pull-up resistors whose resistance values have drifted by more than 10%."],
        checkpoints: ["All major power rails pass resistance-to-ground checks (>100\u03A9 on standby rails)."],
        imageUrl: IMAGES2.soldering
      },
      {
        stepNumber: 5,
        phase: "Phase 5: Bench POST Test, Reassembly & Return-to-Service QA",
        title: "Open-Air Bench Test, Full Reassembly & 24-Hour Burn-In",
        description: "Perform open-air diagnostic POST boot with lab bench power supply, verify keyboard/trackpad functions, reassemble into chassis, and run 24-hour stability burn-in.",
        toolRequired: "DC Bench Power Supply & Diagnostic Suite",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Perform first power-on on the bench using a current-limited DC bench power supply set to 20V @ 1.5A.",
          "Observe current draw: normal standby should read 0.01A-0.03A; power-on should ramp smoothly to 0.8A-1.5A.",
          "Verify display output, re-install RAM, SSD, and cooling assembly with fresh thermal paste.",
          "Assemble motherboard back into chassis, reconnect all peripherals, and torque all screws.",
          "Boot into OS and run 24-hour diagnostic burn-in loop (audio, USB ports, Wi-Fi, battery charging, sleep states)."
        ],
        warnings: ["If DC bench supply trips current limit (>3.0A at 1V), isolate shorted capacitor using thermal camera."],
        tips: ["Apply conformal coating over repaired traces near board perimeter to prevent future humidity oxidation."],
        checkpoints: ["System completes 100% functional validation with all peripherals operating normally."],
        imageUrl: IMAGES2.osRecovery
      }
    ],
    imageUrl: IMAGES2.ultrasonic
  },
  {
    category: "cleaning",
    titleSuffix: "Keyboard Deck Crumb Flush & Sticky Key Switch Repair",
    descSuffix: "Start-to-finish scissor-switch servicing: safe keycap extraction, tactile dome degreasing with fast-evaporating contact cleaner, hinge latching, and matrix testing.",
    difficulty: "easy",
    estimatedTime: "20-30 min",
    tools: ["Precision Keycap Pry Tool", "Electronic Quick-Drying Contact Cleaner", "Microfiber Swabs", "Plastic Dental Pick", "Keyboard Matrix Tester Utility"],
    warnings: [
      "Never use petroleum-based lubricants (WD-40) on membrane or scissor switches; solvents dissolve silicone rubber domes.",
      "Delicate plastic scissor hinge clips snap easily if pried from the bottom; always unhook from the top retention tabs first."
    ],
    steps: [
      {
        stepNumber: 1,
        phase: "Phase 1: Power Isolation & Defective Key Isolation",
        title: "Keyboard Testing & Top-Latch Keycap Extraction",
        description: "Run an online keyboard matrix test to identify stuck or chattering keys, power down the system, and gently unhook keycaps from the top retention hinge.",
        toolRequired: "Keycap Pry Tool & Matrix Tester",
        torqueSpec: "Hand-release",
        subSteps: [
          "Open an online keyboard tester utility to map all stuck, unresponsive, or sticky keys.",
          "Shut down computer and disconnect AC power.",
          "Insert a thin plastic pry tool under the top edge of the sticky keycap.",
          "Gently lever upward to unhook the top two plastic clips from the scissor mechanism without bending the hinge."
        ],
        warnings: ["Never pull keycaps violently from the center or bottom to avoid snapping the tiny 0.5mm hinge pivot pins."],
        tips: ["On spacebars and wide keys, note the metal stabilizer wire orientation before unclipping."],
        checkpoints: ["Keycap released cleanly leaving scissor mechanism intact on the chassis tray."],
        imageUrl: IMAGES2.cleaningBlower
      },
      {
        stepNumber: 2,
        phase: "Phase 2: Chemical Switch Degreasing & Solvent Application",
        title: "Tactile Dome Degreasing & Fast-Evaporating Solvent Flush",
        description: "Apply quick-drying electronic contact cleaner around the silicone rubber dome, depress switch 20 times to flush out sugar grime, and absorb residue.",
        toolRequired: "Electronic Contact Cleaner & Swabs",
        torqueSpec: "N/A",
        subSteps: [
          "Blow compressed air around the exposed scissor mechanism to dislodge crumbs and hair.",
          "Spray a controlled micro-burst of zero-residue electronic contact cleaner directly around the silicone dome.",
          "Depress the rubber dome 20-30 times rapidly to allow the solvent to dissolve sticky residue inside the scissor sliders.",
          "Absorb dislodged grime and solvent using a microfiber swab."
        ],
        warnings: ["Do not flood the keyboard with excessive liquid solvent; use controlled, targeted micro-bursts."],
        tips: ["Electronic contact cleaner evaporates in under 30 seconds leaving zero conductive residue."],
        checkpoints: ["Scissor mechanism moves up and down freely with zero sticky resistance."],
        imageUrl: IMAGES2.screenTeardown1
      },
      {
        stepNumber: 3,
        phase: "Phase 3: Hinge Re-latching & Tactile Testing",
        title: "Scissor Mechanism Alignment & Keycap Snap-In",
        description: "Align keycap over the scissor mechanism, hook bottom tabs, and press firmly on the center until two audible clicks verify dual-latch engagement.",
        toolRequired: "Hand assembly",
        torqueSpec: "Tactile snap",
        subSteps: [
          "Clean the underside of the keycap with an alcohol prep pad.",
          "Position keycap square over the scissor hinge.",
          "Engage the bottom hinge hooks first, then press down firmly in the center until you feel and hear two distinct snap clicks.",
          "Test tactile travel: key should have crisp, uniform 1.3mm travel with immediate spring rebound."
        ],
        warnings: ["Do not force keycaps down at an angle; if it resists, verify scissor hinge orientation."],
        tips: ["If a scissor hinge came unhooked from the metal chassis tray, re-hook the bottom metal tabs first."],
        checkpoints: ["Keycap sits level with neighboring keys with crisp tactile actuation."],
        imageUrl: IMAGES2.cleaningBlower
      },
      {
        stepNumber: 4,
        phase: "Phase 4: Post-Repair Keyboard Matrix Validation",
        title: "Full 100% Keyboard Matrix Testing & Chattering Check",
        description: "Power on laptop, launch keyboard tester utility, test every individual key for actuation, and verify zero key chattering (double-typing).",
        toolRequired: "Keyboard Matrix Tester Utility",
        torqueSpec: "N/A",
        subSteps: [
          "Power on laptop and boot into OS.",
          "Open keyboard matrix testing software.",
          "Press every key on the keyboard, verifying 100% green registration.",
          "Type rapid test sentences in a text editor to verify zero key bounce or duplicate characters.",
          "Test keyboard backlight brightness levels (Low, Medium, High, Off)."
        ],
        warnings: ["If a key registers multiple times per press (chattering), apply one more contact cleaner flush."],
        tips: ["Set keyboard repeat delay in OS settings to short for optimal typing responsiveness."],
        checkpoints: ["All keys actuate with 100% reliability and crisp tactile response."],
        imageUrl: IMAGES2.terminal
      }
    ],
    imageUrl: IMAGES2.cleaningBlower
  },
  {
    category: "cleaning",
    titleSuffix: "VRAM & MOSFET Thermal Pad Caliper Sizing & Renewal",
    descSuffix: "Start-to-finish thermal pad overhaul: caliper millimeter gap measuring (0.5mm/1.0mm/1.5mm), durometer selection, precision cutting, and core contact spread verification.",
    difficulty: "medium",
    estimatedTime: "30-45 min",
    tools: ["Digital Vernier Caliper", "High-Performance Thermal Pads (12.8 W/mK)", "Precision Cutting Shears", "99% Isopropyl Alcohol", "Torque Screwdriver"],
    warnings: [
      "Using overly thick thermal pads prevents the heatsink from contacting the CPU/GPU silicon dies, leading to instant 105\xB0C thermal shutdowns.",
      "Always peel the protective plastic backing film from BOTH sides of the replacement thermal pads."
    ],
    steps: [
      {
        stepNumber: 1,
        phase: "Phase 1: Pre-Disassembly Diagnostics & Heatsink Removal",
        title: "Power Drain, Heatsink Dismount & Old Pad Inspection",
        description: "Power off machine, decouple battery, remove heatsink assembly, and inspect compressed factory thermal pads on VRAM chips and MOSFET power stages.",
        toolRequired: "Torx T5 / Phillips #00 & Spudger",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Power down system, disconnect AC charger, and disconnect internal battery harness.",
          "Loosen heatsink screws in reverse stamped sequence (4 -> 3 -> 2 -> 1).",
          "Lift copper heatsink module straight up.",
          "Inspect old thermal pads for oil leakage, hardening, or tearing across GDDR6 memory and VRM chokes."
        ],
        warnings: ["Do not discard old pads immediately; keep them for thickness comparison."],
        tips: ["Factory thermal pads often dry out and sweat silicone oil after 2 years of thermal cycling."],
        checkpoints: ["Heatsink extracted cleanly with all chip locations mapped."],
        imageUrl: IMAGES2.thermalPaste
      },
      {
        stepNumber: 2,
        phase: "Phase 2: Vernier Caliper Thickness & Gap Measurement",
        title: "Millimeter Gap Tolerancing & Precision Pad Cutting",
        description: "Measure gap between chip packages and copper baseplates using a digital caliper. Cut replacement 12.8 W/mK silicone pads to exact 1:1 chip dimensions.",
        toolRequired: "Digital Vernier Caliper & Precision Shears",
        torqueSpec: "N/A",
        subSteps: [
          "Measure uncompressed edge of old thermal pads with digital caliper (typically 0.5mm, 1.0mm, or 1.5mm).",
          "Select replacement thermal pads with high thermal conductivity (12.8 W/mK) and soft durometer (30-40 Shore 00).",
          "Cut replacement pad strips to match exact 1:1 rectangular dimensions of VRAM and MOSFET packages using sharp shears.",
          "Clean old silicone oil residue from memory chips and copper heatsink contact pads with 99% IPA."
        ],
        warnings: ["Never stack two 0.5mm pads to make 1.0mm as the trapped air interface drastically increases thermal resistance."],
        tips: ["Using softer durometer pads allows easier compression when tightening heatsink screws."],
        checkpoints: ["All pad pieces cut to precise chip sizes with correct millimeter thickness."],
        imageUrl: IMAGES2.nvmeSSD
      },
      {
        stepNumber: 3,
        phase: "Phase 3: Dual-Sided Film Peeling & Component Placement",
        title: "Peel Protective Films & Press Pads onto Target Chips",
        description: "Peel blue protective backing from both faces of each pad, press onto VRAM memory and VRM power stages, and verify zero overlap with neighboring passives.",
        toolRequired: "Micro-Tweezers & Lint-Free Gloves",
        torqueSpec: "Hand placement",
        subSteps: [
          "Peel the bottom protective plastic film from each pad.",
          "Position pad accurately onto each GDDR6 memory chip and VRM MOSFET choke.",
          "Press lightly with a gloved finger to adhere pad to the chip package.",
          "Peel the top clear protective film from the upper face of all installed pads.",
          "Apply Arctic MX-6 thermal compound to the central CPU and GPU silicon dies."
        ],
        warnings: ["Leaving the top clear protective film on thermal pads will insulate heat and cause VRAM to burn out."],
        tips: ["Count the peeled plastic backing pieces to ensure 100% of films were removed."],
        checkpoints: ["All thermal pads installed with both protective films peeled and dies repasted."],
        imageUrl: IMAGES2.thermalPaste
      },
      {
        stepNumber: 4,
        phase: "Phase 4: Heatsink Mounting, Torque & Spread Inspection",
        title: "Sequential Heatsink Torquing & Core Die Contact Verification",
        description: "Lower heatsink assembly flat, torque screws in stamped sequence (1-2-3-4), and inspect from side angle to confirm zero gap between heatsink and CPU/GPU dies.",
        toolRequired: "Torque Screwdriver & Inspection Light",
        torqueSpec: "0.20 Nm (Sequential 1-2-3-4)",
        subSteps: [
          "Lower copper cooling assembly straight down onto the board without twisting.",
          "Tighten screws in stamped numerical sequence (1 -> 2 -> 3 -> 4) to 0.20 Nm.",
          "Inspect the gap between copper baseplate and CPU/GPU silicon dies using a flashlight.",
          "Verify the thermal pads have compressed by ~25-30% and the central copper coldplate is sitting 100% flush against the silicon die.",
          "Plug in both fan PWM cables."
        ],
        warnings: ["If heatsink rocks or tilts, an oversized thermal pad is preventing proper die seating; remove and downsize by 0.5mm."],
        tips: ["Perform a dry test-mount with thermal paste to inspect the paste spread pattern on the die."],
        checkpoints: ["100% flush die contact verified with zero heatsink tilt."],
        imageUrl: IMAGES2.thermalPaste
      },
      {
        stepNumber: 5,
        phase: "Phase 5: Reassembly & VRAM Thermal Stress Verification",
        title: "Chassis Assembly & FurMark / VRAM Temperature Logging",
        description: "Reconnect battery, fasten bottom enclosure, boot into Windows, launch HWiNFO64, and log GPU Memory Junction & Hotspot temperatures under 15-minute load.",
        toolRequired: "HWiNFO64 & FurMark / 3DMark",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Reconnect internal battery harness and screw down bottom casing.",
          "Boot into Windows and launch HWiNFO64 sensor logger.",
          "Run FurMark GPU stress test for 15 minutes.",
          "Monitor `GPU Memory Junction Temperature` (should stay <85\xB0C) and `GPU Hotspot Temperature` (delta over GPU Core should be <15\xB0C).",
          "Confirm zero artifacts, throttling, or driver crashes."
        ],
        warnings: ["If GPU Memory Junction exceeds 100\xB0C, immediately shut down and inspect pad thickness."],
        tips: ["A healthy thermal pad upgrade lowers VRAM temperatures by 15-25\xB0C under heavy raytracing workloads."],
        checkpoints: ["GPU Core <72\xB0C and VRAM Memory <80\xB0C under maximum sustained load."],
        imageUrl: IMAGES2.osRecovery
      }
    ],
    imageUrl: IMAGES2.thermalPaste
  },
  // ----------------------------------------------------
  // UPGRADES (3 Templates)
  // ----------------------------------------------------
  {
    category: "upgrades",
    titleSuffix: "PCIe 4.0 / 5.0 NVMe SSD Expansion & Sector Cloning",
    descSuffix: "Start-to-finish high-speed storage upgrade: external enclosure cloning, 30-degree M.2 slot insertion, thermal heatsink mounting, UEFI boot priority, and TRIM optimization.",
    difficulty: "easy",
    estimatedTime: "25-35 min",
    tools: ["Phillips #00 Precision Screwdriver", "M.2 2280 NVMe SSD", "USB-C External NVMe Enclosure", "Drive Cloning Software (Macrium Reflect / Clonezilla)", "Thermal Pad"],
    warnings: [
      "Touch a grounded metal chassis or wear an ESD wrist strap before handling bare NVMe SSD circuit boards.",
      "Insert M.2 NVMe SSDs into the socket at a 30-degree angle; never force straight down horizontally or you will break the M.2 Key-M connector pins."
    ],
    steps: [
      {
        stepNumber: 1,
        phase: "Phase 1: Drive Sector Cloning & BitLocker Decryption",
        title: "Drive Cloning to Replacement NVMe via External Enclosure",
        description: "Insert new NVMe SSD into a USB-C external enclosure, connect to laptop, temporarily suspend BitLocker encryption, and clone all partitions sector-by-sector.",
        toolRequired: "USB-C NVMe Enclosure & Macrium Reflect",
        torqueSpec: "N/A",
        subSteps: [
          "Suspend BitLocker encryption on target OS drive in Windows (`manage-bde -protectors -disable C:`).",
          "Install new NVMe SSD into USB-C external NVMe enclosure and plug into laptop.",
          "Launch Macrium Reflect or Clonezilla.",
          "Select source drive > Click `Clone this disk` > Select destination NVMe drive.",
          "Drag all partitions (EFI, MSR, Windows OS, Recovery) to destination and extend OS partition to fill total drive capacity.",
          "Execute clone process and wait for 100% completion verification."
        ],
        warnings: ["Ensure you select the correct source vs destination drive to avoid overwriting active data."],
        tips: ["Suspending BitLocker before cloning prevents drive locked prompt on first boot."],
        checkpoints: ["Cloning process finishes with 100% verified partition copies."],
        imageUrl: IMAGES2.nvmeSSD
      },
      {
        stepNumber: 2,
        phase: "Phase 2: Power Isolation & Chassis Opening",
        title: "Power Isolation & Motherboard Battery Decoupling",
        description: "Power down laptop, disconnect AC adapter, remove bottom enclosure, and physically disconnect the internal battery power harness.",
        toolRequired: "Torx T5 / Phillips #00 & Spudger",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Shut down computer and unplug all external cables.",
          "Remove bottom casing fasteners and release perimeter clips.",
          "Disconnect the internal battery connector from the logic board.",
          "Locate the M.2 2280 NVMe slot (and remove copper EMI shield if present)."
        ],
        warnings: ["Never insert or remove NVMe cards while the battery is connected to prevent +3.3V power surge shorts."],
        tips: ["If the laptop has two M.2 slots, check the motherboard silkscreen for `PCIE GEN4 / GEN5` labeling on Slot 1."],
        checkpoints: ["Battery disconnected and M.2 slot accessible."],
        imageUrl: IMAGES2.screenTeardown1
      },
      {
        stepNumber: 3,
        phase: "Phase 3: M.2 NVMe Slot Installation & Heatsink Securing",
        title: "30-Degree Angle Slot Insertion, Standoff Fastener & Heatsink Mounting",
        description: "Insert the new NVMe SSD firmly into the M.2 Key-M slot at a 30-degree angle, press down gently, fasten the M2x3mm retention screw, and attach copper thermal shield.",
        toolRequired: "Phillips #00 Screwdriver",
        torqueSpec: "0.15 Nm (M2 Screw)",
        subSteps: [
          "Align module notch with M.2 Key-M socket key.",
          "Slide NVMe card firmly into the socket at a 30-degree upward angle until gold contacts are fully seated.",
          "Gently press the card down flat against the chassis standoff post.",
          "Install and tighten the single M2x3.5mm retention screw to 0.15 Nm.",
          "Apply 1.0mm thermal pad over the NVMe controller and attach the metal heatsink shield."
        ],
        warnings: ["Do not over-tighten the tiny M2 screw; excessive torque strips the soft brass standoff thread."],
        tips: ["High-speed Gen4/Gen5 SSD controllers require thermal pads to prevent thermal throttling above 75\xB0C."],
        checkpoints: ["SSD sits completely flat and secure with thermal shield attached."],
        imageUrl: IMAGES2.nvmeSSD
      },
      {
        stepNumber: 4,
        phase: "Phase 4: Chassis Reassembly & UEFI Boot Priority",
        title: "Battery Reconnection, Chassis Closure & UEFI Boot Setup",
        description: "Reconnect battery, fasten bottom cover, power on, enter BIOS Setup, and ensure the new NVMe SSD is designated as Primary Boot Option #1.",
        toolRequired: "Torx T5 / Phillips #00 & BIOS Setup",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Reconnect internal battery harness and snap bottom cover in place.",
          "Fasten all perimeter chassis screws.",
          "Power on system and tap F2/Del to enter BIOS Setup.",
          "Navigate to `Boot Options` > set new NVMe SSD (Windows Boot Manager) as `Boot Option #1`.",
          "Save changes and exit BIOS."
        ],
        warnings: ["If system boots to 'No Boot Device Found', verify UEFI boot mode is enabled instead of Legacy CSM."],
        tips: ["Enable NVMe Fast Boot in BIOS for sub-6 second cold boot times."],
        checkpoints: ["BIOS recognizes new NVMe model and serial with correct capacity."],
        imageUrl: IMAGES2.biosScreen
      },
      {
        stepNumber: 5,
        phase: "Phase 5: Post-Repair TRIM Verification & Speed Benchmark",
        title: "Windows Disk Management, TRIM Verification & CrystalDiskMark Speed Test",
        description: "Boot into Windows, verify partition expansion in Disk Management, enable TRIM garbage collection, and benchmark read/write speeds with CrystalDiskMark.",
        toolRequired: "Disk Management & CrystalDiskMark",
        torqueSpec: "N/A",
        subSteps: [
          "Boot into Windows desktop.",
          "Open Disk Management (`diskmgmt.msc`) and verify full unallocated drive capacity is merged into C: drive.",
          "Open Admin Command Prompt and run `fsutil behavior query DisableDeleteNotify` (output `0` confirms TRIM is active).",
          "Launch CrystalDiskMark and run 1GB read/write benchmark.",
          "Verify sequential read speeds reach rated spec (PCIe 4.0: ~7,000 MB/s, PCIe 5.0: ~12,000 MB/s).",
          "Re-enable BitLocker encryption (`manage-bde -protectors -enable C:`)."
        ],
        warnings: ["Do not run defragmentation on NVMe SSDs; only use TRIM optimization."],
        tips: ["Install OEM SSD management software (Samsung Magician / WD Dashboard) for firmware updates."],
        checkpoints: ["Sequential reads exceed 7,000 MB/s with full capacity accessible."],
        imageUrl: IMAGES2.osRecovery
      }
    ],
    imageUrl: IMAGES2.nvmeSSD
  },
  {
    category: "upgrades",
    titleSuffix: "DDR4 / DDR5 Dual-Channel High-Speed RAM Upgrade",
    descSuffix: "Start-to-finish memory expansion: isolate power, remove EMI shielding, eject legacy modules, insert matched dual-rank SODIMMs, POST memory training, and MemTest86 validation.",
    difficulty: "easy",
    estimatedTime: "15-20 min",
    tools: ["Plastic Spudger", "Matched Dual-Rank DDR5 SODIMM Memory Kit", "Anti-Static Wrist Strap", "Phillips #00 Screwdriver", "PassMark MemTest86 USB"],
    warnings: [
      "Ensure laptop is completely powered off and internal battery disconnected before touching memory slots.",
      "DDR5 and DDR4 slots have different notch keying; never force a DDR5 module into a DDR4 socket."
    ],
    steps: [
      {
        stepNumber: 1,
        phase: "Phase 1: Pre-Disassembly Diagnostics & Battery Decoupling",
        title: "Power Drain, Enclosure Removal & Battery Isolation",
        description: "Shut down laptop, disconnect AC power, remove bottom enclosure, disconnect internal battery harness, and ground yourself on an ESD workstation.",
        toolRequired: "Torx T5 / Phillips #00 & Spudger",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Power off computer and disconnect all external cables.",
          "Remove bottom casing screws and pop perimeter retaining clips.",
          "Disconnect the internal battery connector from the motherboard.",
          "Hold power button for 10 seconds to drain standby voltage from motherboard memory rails."
        ],
        warnings: ["Touching RAM slots while the battery is connected can bridge VDD/VDDQ power pins and destroy memory controllers."],
        tips: ["Always install matched pairs (same capacity, speed, and CAS latency) for optimal dual-channel bandwidth."],
        checkpoints: ["Battery disconnected and memory shielding visible."],
        imageUrl: IMAGES2.screenTeardown1
      },
      {
        stepNumber: 2,
        phase: "Phase 2: EMI Shield Removal & Legacy Module Ejection",
        title: "Metal EMI Shield Removal & Module Ejection",
        description: "Pry away the metal EMI memory canopy and spread the side metal retention clips outward to allow the SODIMM module to pop up at a 45-degree angle.",
        toolRequired: "Plastic Spudger",
        torqueSpec: "Hand-release",
        subSteps: [
          "Use a plastic spudger to gently release the stamped metal EMI shielding canopy covering the RAM slots.",
          "Spread the two metal spring retention clips on the sides of the SODIMM slot outward simultaneously.",
          "The RAM module will automatically pop upward at a 45-degree angle.",
          "Grasp the edges of the module and slide it straight out of the socket."
        ],
        warnings: ["Never touch the gold connector pins with bare fingers to avoid transferring skin oils and causing memory bit errors."],
        tips: ["Store extracted RAM modules in anti-static ESD bags."],
        checkpoints: ["Old modules extracted cleanly without bending side retention clips."],
        imageUrl: IMAGES2.ramModule
      },
      {
        stepNumber: 3,
        phase: "Phase 3: Dual-Rank SODIMM Insertion & Latching",
        title: "New SODIMM Alignment, Insertion & Latch Engagement",
        description: "Align module notch with socket key, slide firmly into the slot at 45 degrees, and push flat until side metal clips snap locked with an audible click.",
        toolRequired: "Hand assembly",
        torqueSpec: "Tactile snap",
        subSteps: [
          "Align the notch on the gold connector edge of the new DDR5 module with the plastic key in the SODIMM socket.",
          "Insert the module firmly into the slot at a 45-degree angle until gold pins are fully seated inside the connector.",
          "Press the top edge of the module down flat towards the motherboard until both side metal retention clips snap locked with a tactile click.",
          "Repeat for Slot 2 to populate dual-channel symmetrical configuration.",
          "Re-seat the metal EMI shielding canopy over the memory modules."
        ],
        warnings: ["If side clips do not snap freely, do not force down; re-align module angle and re-insert."],
        tips: ["Verify module is fully seated by checking that gold pins are almost completely hidden inside the socket."],
        checkpoints: ["Both modules locked flat and level under side retention springs."],
        imageUrl: IMAGES2.ramModule
      },
      {
        stepNumber: 4,
        phase: "Phase 4: Reassembly & DDR5 Cold POST Memory Training",
        title: "Battery Connection, Chassis Closure & Initial Memory Training",
        description: "Reconnect battery, fasten bottom cover, connect AC charger, power on, and allow up to 60-90 seconds for initial DDR5 memory training.",
        toolRequired: "Torx T5 / Phillips #00 & AC Charger",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Reconnect internal battery harness to the motherboard.",
          "Snap bottom enclosure in place and torque all perimeter screws.",
          "Connect OEM AC power adapter and press the power button.",
          "CRITICAL: Allow 30 to 90 seconds for initial DDR5 memory training. The screen will remain black and power LED will pulse while the memory controller calibrates timings.",
          "Wait patiently until the OEM logo appears, then tap F2/Del to enter BIOS Setup."
        ],
        warnings: ["DO NOT force power off while memory training is running on first boot."],
        tips: ["DDR5 trains JEDEC timing parameters and signal termination resistances automatically on hardware changes."],
        checkpoints: ["BIOS Setup displays full upgraded memory capacity (e.g. 32GB / 64GB) at rated frequency (e.g. 5600 MT/s)."],
        imageUrl: IMAGES2.biosScreen
      },
      {
        stepNumber: 5,
        phase: "Phase 5: Post-Repair Diagnostic Stress Test & MemTest86",
        title: "PassMark MemTest86 4-Pass Stress Test & Windows Memory Diagnostics",
        description: "Boot from MemTest86 USB drive, run a 4-pass comprehensive memory test (zero bit errors), boot into Windows, and verify dual-channel bandwidth in CPU-Z.",
        toolRequired: "PassMark MemTest86 USB & CPU-Z",
        torqueSpec: "N/A",
        subSteps: [
          "Insert MemTest86 bootable USB drive and boot from UEFI boot menu.",
          "Run full 4-pass diagnostic test checking Test 1 through Test 13 (Address test, Moving inversions, Block move, Rowhammer).",
          "Confirm zero bit errors reported (0 Errors).",
          "Boot into Windows and launch CPU-Z (`Memory` tab).",
          "Verify `Channel #` reports `2 x 32-bit` (Dual-Channel) and frequency matches JEDEC/XMP specifications."
        ],
        warnings: ["If MemTest86 reports even a single bit error, reseat modules or check for incompatible CAS latency."],
        tips: ["Run heavy multi-tasking workloads with 50+ browser tabs and 4K video rendering to test stability."],
        checkpoints: ["100% zero errors in MemTest86 with full dual-channel bandwidth verified."],
        imageUrl: IMAGES2.ramModule
      }
    ],
    imageUrl: IMAGES2.ramModule
  },
  {
    category: "upgrades",
    titleSuffix: "Wi-Fi 7 / Wi-Fi 6E BE200 M.2 Wireless Module & Antenna Upgrade",
    descSuffix: "Start-to-finish wireless upgrade: isolate power, decouple micro IPEX MHF4 antenna snaps, insert M.2 Key-E card, snap antenna leads, install WHQL drivers, and verify 320MHz channels.",
    difficulty: "easy",
    estimatedTime: "15-20 min",
    tools: ["Phillips #00 Screwdriver", "Plastic Spudger / Nylon Tweezers", "Wi-Fi 7 BE200 M.2 2230 Card", "Anti-Static Wrist Strap", "Official Intel/Qualcomm Wi-Fi 7 Driver Package"],
    warnings: [
      "Carefully press micro IPEX MHF4 antenna snaps straight down from above; NEVER slide sideways or push with metal tools to avoid crushing delicate connector gold center pins."
    ],
    steps: [
      {
        stepNumber: 1,
        phase: "Phase 1: Pre-Disassembly Diagnostics & Battery Isolation",
        title: "Power Drain, Enclosure Removal & Battery Disconnection",
        description: "Power down laptop, disconnect AC adapter, remove bottom enclosure, disconnect internal battery harness, and ground yourself on an ESD workstation.",
        toolRequired: "Torx T5 / Phillips #00 & Spudger",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Power off computer and disconnect all external cables.",
          "Remove bottom casing screws and pop perimeter retaining clips.",
          "Disconnect the internal battery connector from the motherboard.",
          "Locate the M.2 2230 Key-E Wi-Fi module socket."
        ],
        warnings: ["Disconnect battery before touching wireless card to prevent shorting antenna ground planes."],
        tips: ["Note which antenna wire connects to `Main` (Black/Triangle 1) and `Aux` (White/Triangle 2)."],
        checkpoints: ["Battery disconnected and Wi-Fi module accessible."],
        imageUrl: IMAGES2.screenTeardown1
      },
      {
        stepNumber: 2,
        phase: "Phase 2: Antenna Decoupling & Module Extraction",
        title: "IPEX MHF4 Antenna Decoupling & Standoff Screw Removal",
        description: "Lift IPEX MHF4 micro antenna leads straight up with nylon tweezers, remove the single M2x3mm standoff screw, and slide the old Wi-Fi card out at 30 degrees.",
        toolRequired: "Nylon Tweezers & Phillips #00",
        torqueSpec: "0.15 Nm",
        subSteps: [
          "Peel back clear protective Mylar tape covering the antenna connectors.",
          "Insert nylon tweezers under the metal collar of the Black (Main) antenna snap and lift vertically straight up.",
          "Repeat for White/Gray (Aux) antenna snap.",
          "Remove the single M2x3mm Phillips screw holding the card in the standoff.",
          "Slide the old Wi-Fi card out of the M.2 Key-E slot at a 30-degree angle."
        ],
        warnings: ["Do not pull antenna leads by the coaxial wire; always pry under the metal gold connector head."],
        tips: ["Store old Wi-Fi card in an anti-static bag for testing backup."],
        checkpoints: ["Antenna leads disconnected with gold micro-pins in pristine condition."],
        imageUrl: IMAGES2.logicBoard
      },
      {
        stepNumber: 3,
        phase: "Phase 3: Wi-Fi 7 Module Insertion & Antenna Snapping",
        title: "Wi-Fi 7 M.2 Card Insertion & Precision Antenna Latching",
        description: "Slide new Wi-Fi 7 BE200 module into Key-E slot, fasten M2 screw, align micro antenna snaps over gold pads, and press straight down until tactile snap confirms engagement.",
        toolRequired: "Phillips #00 & Fingertip / Nylon Tool",
        torqueSpec: "0.15 Nm",
        subSteps: [
          "Insert new Wi-Fi 7 card into the M.2 Key-E slot at a 30-degree angle and press flat against standoff.",
          "Fasten the M2x3mm screw to 0.15 Nm.",
          "Align the Black (Main) antenna connector precisely over Pin 1 on the Wi-Fi card.",
          "Press straight down gently with a fingertip or nylon spudger until you feel a distinct micro-snap click.",
          "Align and snap the White/Gray (Aux) antenna connector onto Pin 2.",
          "Place protective insulating tape over antenna leads."
        ],
        warnings: ["If antenna does not click immediately, re-center; pushing off-center crushes the female barrel."],
        tips: ["Test antenna retention by giving the wire a very gentle tug; it should stay locked firmly."],
        checkpoints: ["Both antenna leads locked securely and flat on the Wi-Fi card."],
        imageUrl: IMAGES2.logicBoard
      },
      {
        stepNumber: 4,
        phase: "Phase 4: Chassis Closure & Driver Installation",
        title: "Chassis Assembly, Boot-up & OEM WHQL Driver Setup",
        description: "Reconnect battery, fasten bottom enclosure, boot into Windows, and install the latest official Intel / Qualcomm Wi-Fi 7 and Bluetooth 5.4 driver package.",
        toolRequired: "Torx T5 / Phillips #00 & Driver Setup",
        torqueSpec: "0.20 Nm",
        subSteps: [
          "Reconnect internal battery harness and snap bottom cover in place.",
          "Torque perimeter chassis screws.",
          "Boot into Windows desktop.",
          "Launch the official Wi-Fi 7 driver installer package (e.g. `Intel_WiFi_BE200_WHQL.exe`).",
          "Launch the official Bluetooth driver installer package (`Intel_BT_WHQL.exe`) and restart system."
        ],
        warnings: ["Make sure both Wi-Fi and Bluetooth driver packages are installed for full combo card functionality."],
        tips: ["Bluetooth communicates over internal USB pins on the M.2 Key-E slot."],
        checkpoints: ["Device Manager shows 'Intel(R) Wi-Fi 7 BE200 320MHz' and 'Intel(R) Wireless Bluetooth(R)' with zero warnings."],
        imageUrl: IMAGES2.osRecovery
      },
      {
        stepNumber: 5,
        phase: "Phase 5: Post-Repair Wireless Throughput & Latency Testing",
        title: "6GHz Tri-Band Connection, Throughput & Bluetooth Peripheral QA",
        description: "Connect to 6GHz Wi-Fi 7 / 6E network, verify 320MHz channel width, test gigabit throughput, and pair high-resolution Bluetooth 5.4 peripherals.",
        toolRequired: "Wi-Fi Analyzer & Speedtest",
        torqueSpec: "N/A",
        subSteps: [
          "Click Wi-Fi icon in taskbar and connect to your 6GHz Wi-Fi 7 SSID.",
          "Open Command Prompt and run `netsh wlan show interfaces`.",
          "Confirm `Radio type` displays `802.11be` or `802.11ax` and `Receive rate (Mbps)` shows multi-gigabit link rates (2,400 - 5,800 Mbps).",
          "Run a local LAN iPerf3 or internet speed test to confirm sub-3ms latency and full gigabit+ throughput.",
          "Pair Bluetooth headphones/mouse and verify uninterrupted audio streaming at 10-meter range."
        ],
        warnings: ["If signal strength is weak (-85 dBm), open chassis and verify antenna cables are not swapped or detached."],
        tips: ["Wi-Fi 7 Multi-Link Operation (MLO) transmits across 5GHz and 6GHz simultaneously for ultra-low latency."],
        checkpoints: ["Full Wi-Fi 7 multi-gigabit speed achieved with crystal clear Bluetooth audio."],
        imageUrl: IMAGES2.terminal
      }
    ],
    imageUrl: IMAGES2.logicBoard
  }
];
var modelTargets2 = [
  // Apple
  { brand: "Apple", model: 'MacBook Pro 16" M3 Max', type: "laptop" },
  { brand: "Apple", model: 'MacBook Pro 14" M3 Pro', type: "laptop" },
  { brand: "Apple", model: 'MacBook Air 15" M2 / M3', type: "laptop" },
  { brand: "Apple", model: 'MacBook Air 13" M1 Legacy', type: "laptop" },
  { brand: "Apple", model: "Mac Studio M2 Ultra", type: "desktop" },
  { brand: "Apple", model: 'iMac 24" 4.5K Retina M3', type: "desktop" },
  { brand: "Apple", model: "Mac mini M2 Pro", type: "desktop" },
  // Dell
  { brand: "Dell", model: "XPS 15 9530", type: "laptop" },
  { brand: "Dell", model: "XPS 13 Plus 9320", type: "laptop" },
  { brand: "Dell", model: "Latitude 5440 Enterprise", type: "laptop" },
  { brand: "Dell", model: "Alienware m16 R2 Gaming", type: "laptop" },
  { brand: "Dell", model: "OptiPlex 7010 Micro", type: "desktop" },
  { brand: "Dell", model: "OptiPlex 5090 SFF", type: "desktop" },
  { brand: "Dell", model: "Alienware Aurora R16", type: "desktop" },
  // Lenovo
  { brand: "Lenovo", model: "ThinkPad X1 Carbon Gen 11", type: "laptop" },
  { brand: "Lenovo", model: "ThinkPad T14 Gen 4", type: "laptop" },
  { brand: "Lenovo", model: "Legion Pro 7i Gen 9", type: "laptop" },
  { brand: "Lenovo", model: "Yoga 9i Dual-Screen", type: "laptop" },
  { brand: "Lenovo", model: "ThinkCentre M90q Tiny", type: "desktop" },
  { brand: "Lenovo", model: "Legion Tower 7i", type: "desktop" },
  // HP
  { brand: "HP", model: "Spectre x360 14 (2024)", type: "laptop" },
  { brand: "HP", model: "EliteBook 840 G10", type: "laptop" },
  { brand: "HP", model: "OMEN Transcend 16", type: "laptop" },
  { brand: "HP", model: "OMEN 45L Cryo-Chamber", type: "desktop" },
  { brand: "HP", model: "ProDesk 600 G6 SFF", type: "desktop" },
  // ASUS
  { brand: "ASUS", model: "ROG Zephyrus G14 (2024)", type: "laptop" },
  { brand: "ASUS", model: "ZenBook 14 OLED UX3405", type: "laptop" },
  { brand: "ASUS", model: "ROG Strix SCAR 16", type: "laptop" },
  { brand: "ASUS", model: "ROG Strix G16CH Desktop", type: "desktop" },
  // Acer & MSI & Razer & Microsoft & Framework & Custom
  { brand: "Acer", model: "Predator Helios 16", type: "laptop" },
  { brand: "MSI", model: "Stealth 16 AI Studio", type: "laptop" },
  { brand: "Razer", model: "Blade 16 Dual-Mode", type: "laptop" },
  { brand: "Microsoft", model: "Surface Laptop 5", type: "laptop" },
  { brand: "Framework", model: "Framework Laptop 13 / 16 Modular", type: "laptop" },
  { brand: "Samsung", model: "Galaxy Book4 Ultra", type: "laptop" },
  { brand: "LG", model: "LG Gram 17 Pro", type: "laptop" },
  { brand: "Custom Built", model: "Custom Full/Mid ATX Gaming PC", type: "desktop" },
  { brand: "Custom Built", model: "Mini-ITX Small Form Factor SFF", type: "desktop" }
];
function generateAllComprehensiveGuides() {
  const list = [...curatedRepairGuides];
  for (const target of modelTargets2) {
    for (const template of guideTemplates2) {
      list.push({
        title: `${target.model}: ${template.titleSuffix}`,
        description: `Dedicated start-to-finish ${template.category} teardown and repair protocol for the ${target.brand} ${target.model}. ${template.descSuffix}`,
        deviceType: target.type,
        category: template.category,
        difficulty: template.difficulty,
        estimatedTime: template.estimatedTime,
        toolsRequired: template.tools,
        safetyWarnings: template.warnings,
        steps: template.steps,
        alternativeSolutions: `Reference ${target.brand} official factory service manuals, board-level schematics, or contact certified bench technicians for OEM warranty support.`,
        imageUrl: template.imageUrl
      });
    }
  }
  return list;
}
async function seedGuides() {
  const existingGuides = await storage.getRepairGuides();
  if (existingGuides.length >= 180 && existingGuides.some((g) => g.steps && g.steps[0] && g.steps[0].subSteps)) {
    console.log(`Database already has ${existingGuides.length} intimate detailed guides. Skipping generation.`);
    return;
  }
  console.log(`Seeding 180+ comprehensive multi-brand repair guides with start-to-finish intimate details...`);
  const allGuides = generateAllComprehensiveGuides();
  let totalSeeded = 0;
  for (const guide of allGuides) {
    try {
      await storage.createRepairGuide(guide);
      totalSeeded++;
    } catch (e) {
    }
  }
  console.log(`Successfully generated and seeded ${totalSeeded} intimate start-to-finish technical guides!`);
}

// server/storage.ts
var DatabaseStorage = class {
  async getUser(id) {
    if (!db) return void 0;
    const [user] = await db.select().from(users).where((0, import_drizzle_orm2.eq)(users.id, id));
    return user;
  }
  async getUserByEmail(email) {
    if (!db || !email) return void 0;
    const normalized = email.trim().toLowerCase();
    const [user] = await db.select().from(users).where(import_drizzle_orm2.sql`lower(${users.email}) = ${normalized}`);
    return user;
  }
  async createUser(userData) {
    if (!db) throw new Error("No database");
    const [user] = await db.insert(users).values({
      ...userData,
      email: (userData.email || "").trim().toLowerCase()
    }).returning();
    return user;
  }
  async updateUser(id, userData) {
    if (!db) return void 0;
    const [user] = await db.update(users).set({ ...userData, updatedAt: /* @__PURE__ */ new Date() }).where((0, import_drizzle_orm2.eq)(users.id, id)).returning();
    return user;
  }
  async getUserFavorites(userId) {
    if (!db) return [];
    return await db.select().from(favorites).where((0, import_drizzle_orm2.eq)(favorites.userId, userId));
  }
  async addToFavorites(userId, favorite) {
    if (!db) throw new Error("No database");
    const [newFavorite] = await db.insert(favorites).values({ ...favorite, userId }).returning();
    return newFavorite;
  }
  async removeFromFavorites(userId, itemId, itemType) {
    if (!db) return;
    await db.delete(favorites).where(
      (0, import_drizzle_orm2.and)(
        (0, import_drizzle_orm2.eq)(favorites.userId, userId),
        (0, import_drizzle_orm2.eq)(favorites.itemId, itemId),
        (0, import_drizzle_orm2.eq)(favorites.itemType, itemType)
      )
    );
  }
  async isFavorited(userId, itemId, itemType) {
    if (!db) return false;
    const [favorite] = await db.select().from(favorites).where(
      (0, import_drizzle_orm2.and)(
        (0, import_drizzle_orm2.eq)(favorites.userId, userId),
        (0, import_drizzle_orm2.eq)(favorites.itemId, itemId),
        (0, import_drizzle_orm2.eq)(favorites.itemType, itemType)
      )
    );
    return !!favorite;
  }
  async getRepairGuides(filters) {
    if (!db) return [];
    const conditions = [];
    if (filters?.deviceType) {
      conditions.push((0, import_drizzle_orm2.eq)(repairGuides.deviceType, filters.deviceType));
    }
    if (filters?.category) {
      conditions.push((0, import_drizzle_orm2.eq)(repairGuides.category, filters.category));
    }
    if (filters?.difficulty) {
      conditions.push((0, import_drizzle_orm2.eq)(repairGuides.difficulty, filters.difficulty));
    }
    if (conditions.length > 0) {
      return await db.select().from(repairGuides).where((0, import_drizzle_orm2.and)(...conditions));
    }
    return await db.select().from(repairGuides);
  }
  async getRepairGuide(id) {
    if (!db) return void 0;
    const [guide] = await db.select().from(repairGuides).where((0, import_drizzle_orm2.eq)(repairGuides.id, id));
    return guide;
  }
  async createRepairGuide(guide) {
    if (!db) throw new Error("No database");
    const [newGuide] = await db.insert(repairGuides).values(guide).returning();
    return newGuide;
  }
  async updateViewCount(id) {
    if (!db) return;
    await db.update(repairGuides).set({ viewCount: import_drizzle_orm2.sql`${repairGuides.viewCount} + 1` }).where((0, import_drizzle_orm2.eq)(repairGuides.id, id));
  }
  async updateDownloadCount(id) {
    if (!db) return;
    await db.update(repairGuides).set({ downloadCount: import_drizzle_orm2.sql`${repairGuides.downloadCount} + 1` }).where((0, import_drizzle_orm2.eq)(repairGuides.id, id));
  }
  async toggleBookmark(id) {
    if (!db) return void 0;
    const [guide] = await db.update(repairGuides).set({ isBookmarked: import_drizzle_orm2.sql`NOT ${repairGuides.isBookmarked}` }).where((0, import_drizzle_orm2.eq)(repairGuides.id, id)).returning();
    return guide;
  }
  async searchRepairGuides(query) {
    if (!db) return [];
    const searchTerm = `%${query.toLowerCase()}%`;
    return await db.select().from(repairGuides).where(
      (0, import_drizzle_orm2.or)(
        (0, import_drizzle_orm2.like)(repairGuides.title, searchTerm),
        (0, import_drizzle_orm2.like)(repairGuides.description, searchTerm),
        (0, import_drizzle_orm2.like)(repairGuides.category, searchTerm)
      )
    );
  }
  async getTroubleshootingFlows() {
    if (!db) return [];
    return await db.select().from(troubleshootingFlows);
  }
  async getTroubleshootingFlow(id) {
    if (!db) return void 0;
    const [flow] = await db.select().from(troubleshootingFlows).where((0, import_drizzle_orm2.eq)(troubleshootingFlows.id, id));
    return flow;
  }
  async createTroubleshootingFlow(flow) {
    if (!db) throw new Error("No database");
    const [newFlow] = await db.insert(troubleshootingFlows).values(flow).returning();
    return newFlow;
  }
  async getDeviceComponents(deviceType) {
    if (!db) return [];
    if (deviceType) {
      return await db.select().from(deviceComponents).where((0, import_drizzle_orm2.eq)(deviceComponents.deviceType, deviceType));
    }
    return await db.select().from(deviceComponents);
  }
  async getDeviceComponent(id) {
    if (!db) return void 0;
    const [component] = await db.select().from(deviceComponents).where((0, import_drizzle_orm2.eq)(deviceComponents.id, id));
    return component;
  }
  async createDeviceComponent(component) {
    if (!db) throw new Error("No database");
    const [newComponent] = await db.insert(deviceComponents).values(component).returning();
    return newComponent;
  }
  async getDeviceBrands(deviceType) {
    if (!db) return [];
    const query = db.select().from(deviceBrands);
    if (deviceType) {
      return await query.where((0, import_drizzle_orm2.eq)(deviceBrands.deviceType, deviceType)).orderBy(import_drizzle_orm2.sql`${deviceBrands.popularity} DESC`);
    }
    return await query.orderBy(import_drizzle_orm2.sql`${deviceBrands.popularity} DESC`);
  }
  async getDeviceModels(brandId, deviceType) {
    if (!db) return [];
    if (brandId) {
      return await db.select().from(deviceModels).where((0, import_drizzle_orm2.eq)(deviceModels.brandId, brandId)).orderBy(import_drizzle_orm2.sql`${deviceModels.year} DESC, ${deviceModels.name} ASC`);
    }
    return await db.select().from(deviceModels).orderBy(import_drizzle_orm2.sql`${deviceModels.year} DESC, ${deviceModels.name} ASC`);
  }
  async getDeviceModel(id) {
    if (!db) return void 0;
    const [model] = await db.select().from(deviceModels).where((0, import_drizzle_orm2.eq)(deviceModels.id, id));
    return model;
  }
  async getModelsByBrand(brandId) {
    if (!db) return [];
    return await db.select().from(deviceModels).where((0, import_drizzle_orm2.eq)(deviceModels.brandId, brandId)).orderBy(import_drizzle_orm2.sql`${deviceModels.year} DESC, ${deviceModels.name} ASC`);
  }
  async searchDeviceModels(query, deviceType) {
    if (!db) return [];
    return await db.select().from(deviceModels).where(
      (0, import_drizzle_orm2.or)(
        (0, import_drizzle_orm2.like)(deviceModels.name, `%${query}%`),
        (0, import_drizzle_orm2.like)(deviceModels.series, `%${query}%`)
      )
    ).orderBy(import_drizzle_orm2.sql`${deviceModels.guideCount} DESC`);
  }
  async getCompatibleGuides(modelId) {
    if (!db) return [];
    return await db.select().from(repairGuides).where(import_drizzle_orm2.sql`id IN (SELECT guide_id FROM guide_compatibility WHERE model_id = ${modelId} AND compatibility = 'compatible')`).orderBy(import_drizzle_orm2.sql`${repairGuides.viewCount} DESC`);
  }
  async getModelCompatibility(guideId) {
    if (!db) return [];
    return await db.select().from(deviceModels).where(import_drizzle_orm2.sql`id IN (SELECT model_id FROM guide_compatibility WHERE guide_id = ${guideId})`).orderBy(import_drizzle_orm2.sql`${deviceModels.name} ASC`);
  }
  async createUserGuide(guide) {
    if (!db) throw new Error("No database");
    const [createdGuide] = await db.insert(repairGuides).values(guide).returning();
    return createdGuide;
  }
};
var MemStorage = class {
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.favorites = /* @__PURE__ */ new Map();
    this.repairGuides = /* @__PURE__ */ new Map();
    this.troubleshootingFlows = /* @__PURE__ */ new Map();
    this.deviceComponents = /* @__PURE__ */ new Map();
    this.deviceBrands = /* @__PURE__ */ new Map();
    this.deviceModels = /* @__PURE__ */ new Map();
    this.guideCompatibility = /* @__PURE__ */ new Map();
    this.seedInitialData();
  }
  seedInitialData() {
    const allGuides = generateAllComprehensiveGuides();
    allGuides.forEach((g, index2) => {
      const id = `guide-${index2 + 1}`;
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
        isBookmarked: false
      });
    });
    comprehensiveTroubleshootingFlows.forEach((f, index2) => {
      const id = `flow-${index2 + 1}`;
      const { category, ...flowData } = f;
      this.troubleshootingFlows.set(id, {
        id,
        type: category,
        title: flowData.title,
        description: flowData.description,
        steps: flowData.steps.map((step) => ({
          id: `step-${step.stepNumber}`,
          question: step.description,
          answers: [{
            text: step.solutions?.join(", ") || "Check solutions",
            nextStepId: step.stepNumber < flowData.steps.length ? `step-${step.stepNumber + 1}` : void 0
          }]
        }))
      });
    });
    comprehensiveDeviceComponents.forEach((c, index2) => {
      const id = `comp-${index2 + 1}`;
      this.deviceComponents.set(id, {
        id,
        name: c.name,
        description: c.description,
        deviceType: c.deviceType,
        category: c.componentType,
        safetyNotes: c.commonIssues || []
      });
    });
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
      { id: "brand-acer-desktop", name: "Acer", deviceType: "desktop", logoUrl: "https://cdn.simpleicons.org/acer", supportLevel: "community", popularity: 79 }
    ];
    allBrands.forEach((b) => {
      this.deviceBrands.set(b.id, {
        ...b,
        createdAt: /* @__PURE__ */ new Date()
      });
    });
    const allModels = [
      // APPLE LAPTOPS
      { id: "model-mbp-16-m3", brandId: "brand-apple-laptop", name: 'MacBook Pro 16" (M3 Pro / M3 Max)', series: "MacBook Pro", year: 2024, specifications: { cpu: "Apple M3 Max 16-Core", ram: "36GB-128GB Unified", storage: "512GB-8TB SSD", display: '16.2" Liquid Retina XDR Mini-LED 120Hz' }, commonIssues: ["Display flex cable strain", "USB-C port wear", "Battery cycle depletion"], guideCount: 16 },
      { id: "model-mbp-14-m3", brandId: "brand-apple-laptop", name: 'MacBook Pro 14" (M3 / M3 Pro)', series: "MacBook Pro", year: 2023, specifications: { cpu: "Apple M3 Pro 12-Core", ram: "18GB-36GB Unified", storage: "512GB-4TB SSD", display: '14.2" Liquid Retina XDR' }, commonIssues: ["Fan dust accumulation", "Trackpad haptic alignment", "MagSafe 3 port debris"], guideCount: 14 },
      { id: "model-mba-15-m3", brandId: "brand-apple-laptop", name: 'MacBook Air 15" (M3)', series: "MacBook Air", year: 2024, specifications: { cpu: "Apple M3 8-Core", ram: "16GB-24GB Unified", storage: "512GB SSD", display: '15.3" Liquid Retina IPS' }, commonIssues: ["Passive thermal throttling under sustained load", "Keyboard keycap shine"], guideCount: 10 },
      { id: "model-mba-13-m2", brandId: "brand-apple-laptop", name: 'MacBook Air 13" (M2)', series: "MacBook Air", year: 2022, specifications: { cpu: "Apple M2 8-Core", ram: "8GB-16GB Unified", storage: "256GB-512GB SSD", display: '13.6" Liquid Retina' }, commonIssues: ["Thermal pad modding", "Audio jack lint"], guideCount: 11 },
      { id: "model-mba-13-m1", brandId: "brand-apple-laptop", name: 'MacBook Air 13" (M1 Classic)', series: "MacBook Air", year: 2020, specifications: { cpu: "Apple M1 8-Core", ram: "8GB-16GB Unified", storage: "256GB-2TB SSD", display: '13.3" Retina 2560x1600' }, commonIssues: ["Battery swelling", "Display flexgate repair", "Trackpad cable oxidation"], guideCount: 19 },
      { id: "model-mbp-13-intel", brandId: "brand-apple-laptop", name: 'MacBook Pro 13" (Intel Four Thunderbolt)', series: "MacBook Pro Legacy", year: 2020, specifications: { cpu: "Intel Core i5-1038NG7", ram: "16GB LPDDR4X", storage: "512GB SSD", display: '13.3" Retina 2560x1600' }, commonIssues: ["Dual fan thermal paste degradation", "Butterfly/Magic keyboard replacement", "Battery swelling"], guideCount: 18 },
      { id: "model-mbp-15-retina", brandId: "brand-apple-laptop", name: 'MacBook Pro 15" Retina (Mid 2015 Legacy)', series: "MacBook Pro Legacy", year: 2015, specifications: { cpu: "Intel Core i7-4870HQ", ram: "16GB DDR3L", storage: "512GB Proprietary PCIe", display: '15.4" Retina 2880x1800' }, commonIssues: ["Staingate anti-reflective coating delamination", "I/O board audio flex ribbon", "Battery pouch cell replacement"], guideCount: 22 },
      // DELL LAPTOPS
      { id: "model-dell-xps15-9530", brandId: "brand-dell-laptop", name: "XPS 15 9530", series: "XPS", year: 2023, specifications: { cpu: "Intel Core i7-13700H", ram: "32GB DDR5-4800 (Upgradeable)", storage: "1TB M.2 PCIe 4.0", display: '15.6" 3.5K OLED Touch' }, commonIssues: ["Vapor chamber thermal paste drying", "Trackpad pre-travel rattle", "Battery health degradation"], guideCount: 19 },
      { id: "model-dell-xps13-plus", brandId: "brand-dell-laptop", name: "XPS 13 Plus 9320", series: "XPS", year: 2023, specifications: { cpu: "Intel Core i7-1360P", ram: "16GB LPDDR5", storage: "1TB NVMe", display: '13.4" 4K UHD+ Touch' }, commonIssues: ["Capacitive function row responsiveness", "Zero-lattice keyboard ribbon seating"], guideCount: 12 },
      { id: "model-dell-xps16-9640", brandId: "brand-dell-laptop", name: "XPS 16 9640 (AI Series)", series: "XPS", year: 2024, specifications: { cpu: "Intel Core Ultra 9 185H", ram: "32GB-64GB LPDDR5x", storage: "2TB PCIe 4.0 NVMe", display: '16.3" 4K+ OLED 90Hz' }, commonIssues: ["Seamless glass trackpad calibration", "Vapor chamber heatsink repaste", "Thunderbolt 4 port dock handshake"], guideCount: 15 },
      { id: "model-dell-lat-5440", brandId: "brand-dell-laptop", name: "Latitude 5440 Enterprise", series: "Latitude", year: 2024, specifications: { cpu: "Intel Core i5-1345U vPro", ram: "16GB DDR5 (2x SODIMM Slots)", storage: "512GB M.2 2230", display: '14.0" FHD Non-Touch' }, commonIssues: ["SODIMM RAM upgrade", "M.2 2230 to 2280 bracket swap", "CMOS battery reset"], guideCount: 15 },
      { id: "model-dell-lat-7440", brandId: "brand-dell-laptop", name: "Latitude 7440 Ultralight", series: "Latitude", year: 2023, specifications: { cpu: "Intel Core i7-1365U vPro", ram: "16GB LPDDR5", storage: "512GB M.2 PCIe", display: '14.0" 16:10 QHD+' }, commonIssues: ["Magnesium casing screw mounts", "Fingerprint reader daughterboard flex", "Wi-Fi 6E antenna clip"], guideCount: 14 },
      { id: "model-dell-prec-7780", brandId: "brand-dell-laptop", name: "Precision 7780 Mobile Workstation", series: "Precision Mobile", year: 2023, specifications: { cpu: "Intel Core i9-13950HX vPro", ram: "128GB CAMM / SODIMM DDR5", storage: "4x M.2 PCIe Gen4 NVMe (8TB)", gpu: "NVIDIA RTX 5000 Ada 16GB" }, commonIssues: ["CAMM memory module torque specs", "Vapor chamber thermal pad sizing", "SmartCard reader ribbon replacement"], guideCount: 21 },
      { id: "model-dell-alienware-m16", brandId: "brand-dell-laptop", name: "Alienware m16 R2 Gaming", series: "Alienware", year: 2024, specifications: { cpu: "Intel Core Ultra 7 155H", ram: "32GB DDR5 5600MHz", storage: "2TB Dual NVMe", display: '16" QHD+ 240Hz' }, commonIssues: ["Element 31 liquid metal paste migration", "High-RPM fan cleaning", "DC-in barrel jack repair"], guideCount: 22 },
      { id: "model-dell-alienware-x14", brandId: "brand-dell-laptop", name: "Alienware x14 R2 Ultra-Slim", series: "Alienware", year: 2023, specifications: { cpu: "Intel Core i7-13620H", ram: "32GB LPDDR5", storage: "1TB M.2 2280", display: '14.0" QHD+ 165Hz' }, commonIssues: ["Dual pull fan debris removal", "Type-C 130W GaN charging negotiation", "RGB Stadium lighting strip repair"], guideCount: 13 },
      { id: "model-dell-insp-15", brandId: "brand-dell-laptop", name: "Inspiron 15 3520", series: "Inspiron", year: 2023, specifications: { cpu: "Intel Core i5-1235U", ram: "8GB-16GB DDR4", storage: "512GB NVMe", display: '15.6" 120Hz IPS' }, commonIssues: ["Hinge mounting plastic standoff rupture", "Keyboard membrane replacement", "SATA HDD to SSD migration"], guideCount: 17 },
      // LENOVO LAPTOPS
      { id: "model-lenovo-x1-c11", brandId: "brand-lenovo-laptop", name: "ThinkPad X1 Carbon Gen 11", series: "ThinkPad", year: 2023, specifications: { cpu: "Intel Core i7-1365U vPro", ram: "32GB LPDDR5", storage: "1TB PCIe Gen4 NVMe", display: '14.0" 2.8K OLED' }, commonIssues: ["Fan dust filter de-clogging", "TrackPoint cap & click buttons replacement", "Wi-Fi 6E antenna routing"], guideCount: 20 },
      { id: "model-lenovo-x1-c12", brandId: "brand-lenovo-laptop", name: "ThinkPad X1 Carbon Gen 12", series: "ThinkPad", year: 2024, specifications: { cpu: "Intel Core Ultra 7 165H", ram: "32GB-64GB LPDDR5x", storage: "2TB Gen4 NVMe", display: '14.0" 2.8K OLED 120Hz' }, commonIssues: ["Communications bar webcam flex", "Haptic TouchPad click engine reset", "Dual outlet fan cleaning"], guideCount: 16 },
      { id: "model-lenovo-t14-g4", brandId: "brand-lenovo-laptop", name: "ThinkPad T14 Gen 4 (AMD / Intel)", series: "ThinkPad", year: 2023, specifications: { cpu: "AMD Ryzen 7 PRO 7840U", ram: "32GB LPDDR5x", storage: "1TB M.2 2280", display: '14.0" WUXGA Low Power' }, commonIssues: ["Modular keyboard replacement", "Internal 52.5Wh battery swap", "RJ45 Ethernet drop-jaw repair"], guideCount: 21 },
      { id: "model-lenovo-p16-g2", brandId: "brand-lenovo-laptop", name: "ThinkPad P16 Gen 2 Workstation", series: "ThinkPad Workstation", year: 2023, specifications: { cpu: "Intel Core i9-13980HX", ram: "128GB DDR5 ECC (4x Slots)", storage: "Dual M.2 Gen4 NVMe", gpu: "RTX 5000 Ada" }, commonIssues: ["Vapor chamber liquid repaste", "4x SODIMM RAM slot sequencing", "SmartCard flex replacement"], guideCount: 24 },
      { id: "model-lenovo-legion-pro7", brandId: "brand-lenovo-laptop", name: "Legion Pro 7i Gen 9", series: "Legion", year: 2024, specifications: { cpu: "Intel Core i9-14900HX", ram: "32GB DDR5 5600MHz", storage: "2TB Dual M.2 SSD", display: '16" WQXGA 240Hz 500 nits' }, commonIssues: ["Coldfront 5.0 vapor chamber repaste", "RGB backlight controller firmware", "Dual fan de-dusting"], guideCount: 18 },
      { id: "model-lenovo-legion-slim5", brandId: "brand-lenovo-laptop", name: 'Legion Slim 5 14" OLED', series: "Legion Slim", year: 2024, specifications: { cpu: "AMD Ryzen 7 7840HS", ram: "32GB LPDDR5X", storage: "1TB M.2 2280", display: '14.5" 2.8K 120Hz OLED' }, commonIssues: ["Vapor chamber phase-change pad installation", "Right-angle DC-in slim tip port check"], guideCount: 15 },
      { id: "model-lenovo-yoga-9i", brandId: "brand-lenovo-laptop", name: "Yoga 9i Dual-Screen / 2-in-1", series: "Yoga", year: 2024, specifications: { cpu: "Intel Core Ultra 7 155H", ram: "16GB LPDDR5x", storage: "1TB Gen4 SSD", display: 'Dual 13.3" 2.8K OLED Touch' }, commonIssues: ["360-degree rotating soundbar hinge tension", "Active stylus digitizer calibration"], guideCount: 13 },
      // HP LAPTOPS
      { id: "model-hp-spectre-14", brandId: "brand-hp-laptop", name: "Spectre x360 14 (2024)", series: "Spectre", year: 2024, specifications: { cpu: "Intel Core Ultra 7 155H", ram: "32GB LPDDR5x", storage: "2TB NVMe", display: '14.0" 2.8K OLED Touch' }, commonIssues: ["Haptic trackpad calibration", "Bottom cover rubber foot adhesive", "USB-C PD handshake reset"], guideCount: 14 },
      { id: "model-hp-spectre-16", brandId: "brand-hp-laptop", name: "Spectre x360 16 OLED", series: "Spectre", year: 2024, specifications: { cpu: "Intel Core Ultra 7 155H", ram: "32GB LPDDR5x", storage: "2TB NVMe", gpu: "RTX 4050 Laptop" }, commonIssues: ["360-degree gear hinge lubrication", "Dual blower fan cleaning", "OLED touch digitizer ribbon"], guideCount: 15 },
      { id: "model-hp-elitebook-840", brandId: "brand-hp-laptop", name: "EliteBook 840 G10", series: "EliteBook", year: 2023, specifications: { cpu: "Intel Core i7-1360P", ram: "32GB DDR5 (2x Slots)", storage: "1TB SSD", display: '14.0" WUXGA Anti-Glare' }, commonIssues: ["Smart card reader flex cable", "RAM SODIMM capacity upgrade", "Sure View privacy filter troubleshooting"], guideCount: 16 },
      { id: "model-hp-zbook-fury16", brandId: "brand-hp-laptop", name: "ZBook Fury 16 G10 Mobile Workstation", series: "ZBook", year: 2023, specifications: { cpu: "Intel Core i9-13950HX", ram: "128GB DDR5 ECC (4x SODIMM)", storage: "4x M.2 NVMe SSDs (Up to 16TB)", gpu: "NVIDIA RTX 5000 Ada" }, commonIssues: ["Toolless chassis latch mechanism", "Quad M.2 thermal heatsink pad repaste", "BMS battery diagnostic"], guideCount: 22 },
      { id: "model-hp-omen-16", brandId: "brand-hp-laptop", name: "OMEN Transcend 16 Gaming", series: "OMEN", year: 2024, specifications: { cpu: "Intel Core i7-14700HX", ram: "32GB DDR5", storage: "1TB PCIe Gen4", display: '16.0" Mini-LED 240Hz' }, commonIssues: ["Tempest Cooling fan shroud cleaning", "Hall-effect lid sensor alignment"], guideCount: 15 },
      { id: "model-hp-victus-16", brandId: "brand-hp-laptop", name: "Victus 16 Gaming Laptop", series: "Victus", year: 2023, specifications: { cpu: "AMD Ryzen 7 7840HS", ram: "16GB DDR5", storage: "1TB SSD", gpu: "RTX 4060" }, commonIssues: ["Screen hinge wobble tensioning", "Dual fan air intake foam swap", "DC power barrel socket replacement"], guideCount: 18 },
      // ASUS LAPTOPS & HANDHELDS
      { id: "model-asus-zephyrus-g14", brandId: "brand-asus-laptop", name: "ROG Zephyrus G14 (2024)", series: "ROG", year: 2024, specifications: { cpu: "AMD Ryzen 9 8945HS", ram: "32GB LPDDR5X", storage: "1TB M.2 NVMe", display: '14.0" 3K OLED 120Hz G-SYNC' }, commonIssues: ["Liquid metal barrier inspection", "AniMe Matrix / Slash Lighting flex cable", "Fan bearing lubrication"], guideCount: 20 },
      { id: "model-asus-zephyrus-g16", brandId: "brand-asus-laptop", name: "ROG Zephyrus G16 (2024)", series: "ROG", year: 2024, specifications: { cpu: "Intel Core Ultra 9 185H", ram: "32GB LPDDR5x", storage: "2TB Dual NVMe", display: '16" 2.5K OLED 240Hz' }, commonIssues: ["Tri-Fan cooling module de-dusting", "Vapor chamber repasting", "Type-C 100W PD charging controller"], guideCount: 19 },
      { id: "model-asus-strix-scar16", brandId: "brand-asus-laptop", name: "ROG Strix SCAR 16 (2024)", series: "ROG", year: 2024, specifications: { cpu: "Intel Core i9-14900HX", ram: "64GB DDR5 5600MHz", storage: "2TB RAID 0 Gen4", display: '16.0" QHD+ 240Hz Mini-LED' }, commonIssues: ["Tri-Fan cooling module cleaning", "Conductonaut Extreme liquid metal repaste", "Chassis RGB underglow strip swap"], guideCount: 17 },
      { id: "model-asus-zenbook-14", brandId: "brand-asus-laptop", name: "ZenBook 14 OLED UX3405", series: "ZenBook", year: 2024, specifications: { cpu: "Intel Core Ultra 7 155H", ram: "16GB-32GB LPDDR5x", storage: "1TB Gen4 SSD", display: '14.0" 3K 120Hz OLED' }, commonIssues: ["NumberPad virtual trackpad driver", "ErgoLift hinge friction adjustment"], guideCount: 11 },
      { id: "model-asus-rog-ally-x", brandId: "brand-asus-laptop", name: "ROG Ally X (Handheld Gaming PC)", series: "ROG Ally", year: 2024, specifications: { cpu: "AMD Ryzen Z1 Extreme", ram: "24GB LPDDR5X 7500MHz", storage: "1TB M.2 2280 Full-Size NVMe", battery: "80Wh High-Capacity" }, commonIssues: ["Hall-Effect joystick calibration & swap", "MicroSD slot thermal isolation tape", "Full-size 2280 M.2 SSD installation"], guideCount: 26 },
      // ACER & MSI & RAZER & FRAMEWORK & OTHER LAPTOPS
      { id: "model-acer-helios-16", brandId: "brand-acer-laptop", name: "Predator Helios 16", series: "Predator", year: 2024, specifications: { cpu: "Intel Core i9-14900HX", ram: "32GB DDR5", storage: "2TB NVMe", display: '16" WQXGA 240Hz IPS' }, commonIssues: ["AeroBlade 3D 5th Gen metal fan cleaning", "Liquid metal barrier reseal", "RGB swappable WASD keycaps"], guideCount: 18 },
      { id: "model-acer-swift-go14", brandId: "brand-acer-laptop", name: "Swift Go 14 OLED", series: "Swift", year: 2024, specifications: { cpu: "Intel Core Ultra 7 155H", ram: "16GB LPDDR5X", storage: "1TB Gen4 SSD", display: '14.0" 2.8K OLED 90Hz' }, commonIssues: ["TwinAir dual fan heatsink cleaning", "Secondary M.2 slot NVMe addition"], guideCount: 12 },
      { id: "model-msi-stealth-16", brandId: "brand-msi-laptop", name: "MSI Stealth 16 AI Studio", series: "Stealth", year: 2024, specifications: { cpu: "Intel Core Ultra 9 185H", ram: "32GB DDR5", storage: "2TB NVMe SSD", display: '16" UHD+ 120Hz OLED' }, commonIssues: ["Cooler Boost 5 fan cleaning", "Inverted motherboard disassembly order", "Hinge anchor reinforcement"], guideCount: 15 },
      { id: "model-msi-titan-18", brandId: "brand-msi-laptop", name: "MSI Titan 18 HX Flagship", series: "Titan Flagship", year: 2024, specifications: { cpu: "Intel Core i9-14900HX", ram: "128GB DDR5 (4x Slots)", storage: "1x PCIe Gen5 + 2x PCIe Gen4 SSDs", display: '18" 4K 120Hz Mini-LED' }, commonIssues: ["Vapor chamber 3D cooling repaste", "Cherry MX mechanical keyboard switch swap", "Quad fan bearing service"], guideCount: 22 },
      { id: "model-razer-blade-16", brandId: "brand-razer-laptop", name: "Razer Blade 16 (Dual-Mode Display)", series: "Blade", year: 2024, specifications: { cpu: "Intel Core i9-14900HX", ram: "32GB-64GB DDR5", storage: "2TB NVMe", display: '16" Dual-Mode Mini-LED (4K 120Hz / FHD 240Hz)' }, commonIssues: ["Battery swelling prevention and replacement", "Vapor chamber repaste with PTM7950", "Synapse Chroma RGB controller reset"], guideCount: 23 },
      { id: "model-razer-blade-14", brandId: "brand-razer-laptop", name: "Razer Blade 14 (AMD)", series: "Blade", year: 2024, specifications: { cpu: "AMD Ryzen 9 8945HS", ram: "32GB-64GB DDR5 (2x Slots)", storage: "1TB PCIe 4.0", display: '14" QHD+ 240Hz' }, commonIssues: ["Dual blower fan lint de-clogging", "M.2 SSD thermal pad replacement", "Trackpad click stiffness"], guideCount: 17 },
      { id: "model-framework-13", brandId: "brand-framework-laptop", name: "Framework Laptop 13 (Modular)", series: "Framework Modular", year: 2024, specifications: { cpu: "AMD Ryzen 7 7840U / Intel Core Ultra", ram: "Up to 64GB DDR5 SODIMM", storage: "Up to 4TB M.2 2280", display: '13.5" 2256x1504 3:2' }, commonIssues: ["Expansion card USB-C slot swap", "Magnetic bezel replacement", "Battery RTC coin cell swap"], guideCount: 25 },
      { id: "model-framework-16", brandId: "brand-framework-laptop", name: "Framework Laptop 16 (Discrete GPU Bay)", series: "Framework Modular", year: 2024, specifications: { cpu: "AMD Ryzen 9 7940HS", ram: "64GB DDR5", storage: "2x M.2 (2280 + 2230)", gpu: "Modular Radeon RX 7700S Expansion Bay" }, commonIssues: ["Graphics Module interposer connector latching", "Hot-swappable keyboard and numpad deck re-seating", "Dual fan exhaust module swap"], guideCount: 28 },
      { id: "model-ms-surface-laptop5", brandId: "brand-microsoft-laptop", name: "Surface Laptop 5", series: "Surface", year: 2023, specifications: { cpu: "Intel Core i7-1265U", ram: "16GB LPDDR5x", storage: "512GB Removable SSD", display: '13.5" PixelSense Touch' }, commonIssues: ["Magnetic keyboard fabric deck removal", "Removable M.2 2230 SSD upgrade", "Surface Connect port charging diagnostic"], guideCount: 14 },
      { id: "model-ms-surface-pro9", brandId: "brand-microsoft-laptop", name: "Surface Pro 9 / 10 2-in-1", series: "Surface Pro", year: 2023, specifications: { cpu: "Intel Core i7-1255U / SQ3 5G", ram: "16GB LPDDR5", storage: "256GB-1TB Removable 2230 SSD", display: '13.0" PixelSense Flow 120Hz' }, commonIssues: ["Magnetic SSD hatch door removal", "Kickstand torque hinge adjustment", "Screen glass adhesive release"], guideCount: 19 },
      { id: "model-samsung-galaxy-book4", brandId: "brand-samsung-laptop", name: "Galaxy Book4 Ultra", series: "Galaxy Book", year: 2024, specifications: { cpu: "Intel Core Ultra 9 185H", ram: "32GB LPDDR5X", storage: "1TB Gen4 SSD", display: '16.0" Dynamic AMOLED 2X Touch' }, commonIssues: ["Vapor chamber repasting", "Secondary M.2 slot NVMe expansion"], guideCount: 13 },
      { id: "model-lg-gram-17", brandId: "brand-lg-laptop", name: "LG Gram 17 (Ultra-Lightweight)", series: "Gram", year: 2024, specifications: { cpu: "Intel Core Ultra 7 155H", ram: "16GB-32GB LPDDR5x", storage: "1TB Dual M.2", display: '17.0" WQXGA IPS Non-Glare' }, commonIssues: ["Magnesium chassis flex inspection", "Dual M.2 SSD installation", "Battery replacement"], guideCount: 12 },
      { id: "model-gigabyte-aorus-16x", brandId: "brand-gigabyte-laptop", name: "GIGABYTE AORUS 16X (2024)", series: "AORUS", year: 2024, specifications: { cpu: "Intel Core i9-14900HX", ram: "32GB DDR5 5600MHz", storage: "1TB + 1TB Dual Gen4", display: '16" 165Hz WQXGA Panton-Validated' }, commonIssues: ["Windforce Infinity cooling overhaul", "RGB Beacon projection light repair", "Wi-Fi 7 BE200 module seating"], guideCount: 16 },
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
      { id: "model-imac-24-m3", brandId: "brand-apple-desktop", name: 'iMac 24" 4.5K Retina (M3)', series: "iMac", year: 2023, specifications: { cpu: "Apple M3 8-Core", ram: "16GB-24GB Unified", storage: "512GB-2TB SSD", display: '23.5" 4.5K Retina 4480x2520' }, commonIssues: ["Display adhesive cutting wheel procedure", "Internal logic board swap", "Magnetic power cord socket cleaning"], guideCount: 12 },
      { id: "model-imac-27-intel", brandId: "brand-apple-desktop", name: 'iMac 27" 5K Retina (Intel Legacy)', series: "iMac Legacy", year: 2020, specifications: { cpu: "Intel Core i9-10910 10-Core", ram: "Up to 128GB DDR4 (User Door)", storage: "1TB-8TB SSD", gpu: "Radeon Pro 5700 XT 16GB" }, commonIssues: ["Blade SSD upgrade", "User RAM door 4-stick DDR4 installation", "Display hinge spring snap repair"], guideCount: 25 },
      { id: "model-mac-pro-tower", brandId: "brand-apple-desktop", name: "Mac Pro Tower (Apple Silicon / Intel)", series: "Mac Pro", year: 2023, specifications: { cpu: "Apple M2 Ultra / Intel Xeon W", ram: "Up to 1.5TB DDR4 ECC (Intel) / 192GB (M2)", storage: "Internal PCIe Storage", expansion: "7x PCIe Slots" }, commonIssues: ["PCIe card auxiliary power routing", "Stainless steel latch alignment", "MPX module reseating"], guideCount: 15 },
      // DELL DESKTOPS
      { id: "model-dell-optiplex-7010", brandId: "brand-dell-desktop", name: "OptiPlex 7010 / 7000 Micro Form Factor", series: "OptiPlex Micro", year: 2023, specifications: { cpu: "Intel Core i7-13700T", ram: "16GB-64GB DDR5 SODIMM", storage: "512GB M.2 2280 NVMe" }, commonIssues: ["Blower fan thermal paste refresh", "External 90W/130W Dell power brick testing", 'SATA 2.5" caddy cable replacement'], guideCount: 19 },
      { id: "model-dell-optiplex-5090-sff", brandId: "brand-dell-desktop", name: "OptiPlex 5090 / 7090 Small Form Factor (SFF)", series: "OptiPlex SFF", year: 2022, specifications: { cpu: "Intel Core i7-11700", ram: "32GB DDR4 (4x DIMM Slots)", storage: '1TB NVMe + 3.5" HDD', psu: "Dell Proprietary 260W 80+ Platinum" }, commonIssues: ["Low-profile PCIe GPU installation (e.g. RTX 3050 6GB / GTX 1650)", "Proprietary 6-pin motherboard power supply swap", "CMOS CR2032 coin cell replacement"], guideCount: 24 },
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
      { id: "model-msi-trident-x2", brandId: "brand-msi-desktop", name: "MSI MEG Trident X2 (HMI Touchscreen)", series: "MEG Trident", year: 2024, specifications: { cpu: "Intel Core i9-14900KF", ram: "64GB DDR5", storage: "2TB Gen5 + 2TB Gen4", gpu: "RTX 4090 24GB", psu: "1000W PCIe 5.0" }, commonIssues: ['Front 4.5" HMI touchscreen firmware calibration', "Silent Storm Cooling 3 air chamber divider alignment"], guideCount: 17 },
      { id: "model-intel-nuc-13-extreme", brandId: "brand-corsair-desktop", name: "Intel NUC 13 Extreme (Raptor Canyon)", series: "Intel NUC", year: 2023, specifications: { cpu: "Intel Core i9-13900K Compute Element", ram: "64GB DDR5 SODIMM", storage: "3x M.2 PCIe 4.0 NVMe", gpu: 'Triple-Slot 12" PCIe GPU', psu: "750W SFX Gold" }, commonIssues: ["NUC Compute Element PCIe x16 daughterboard seating", "SFX power supply fan curve", "Triple M.2 heatsink plate pad repaste"], guideCount: 22 }
    ];
    allModels.forEach((m) => {
      this.deviceModels.set(m.id, {
        ...m,
        createdAt: /* @__PURE__ */ new Date()
      });
    });
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
          createdAt: /* @__PURE__ */ new Date()
        });
      });
    });
    try {
      const defaultPasswordHash = import_bcrypt.default.hashSync("password123", 10);
      const initialUsers = [
        {
          id: "user-master-tech",
          email: "jhustle44@gmail.com",
          password: defaultPasswordHash,
          firstName: "Master",
          lastName: "Technician",
          profileImageUrl: null,
          role: "admin",
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        },
        {
          id: "user-tech-lead",
          email: "tech@jcrguru.com",
          password: defaultPasswordHash,
          firstName: "Field",
          lastName: "Technician",
          profileImageUrl: null,
          role: "technician",
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        },
        {
          id: "user-admin-chief",
          email: "admin@jcrguru.com",
          password: defaultPasswordHash,
          firstName: "Workshop",
          lastName: "Admin",
          profileImageUrl: null,
          role: "admin",
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        },
        {
          id: "user-guest-demo",
          email: "demo@jcrguru.com",
          password: defaultPasswordHash,
          firstName: "Demo",
          lastName: "Technician",
          profileImageUrl: null,
          role: "user",
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }
      ];
      initialUsers.forEach((u) => {
        this.users.set(u.id, u);
      });
    } catch (e) {
      console.warn("User seeding notice:", e);
    }
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByEmail(email) {
    if (!email) return void 0;
    const target = email.trim().toLowerCase();
    return Array.from(this.users.values()).find((u) => u.email.toLowerCase() === target);
  }
  async createUser(user) {
    const id = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newUser = {
      id,
      email: (user.email || "").trim().toLowerCase(),
      password: user.password,
      firstName: user.firstName || null,
      lastName: user.lastName || null,
      profileImageUrl: user.profileImageUrl || null,
      role: user.role || "user",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.users.set(id, newUser);
    return newUser;
  }
  async updateUser(id, user) {
    const existing = this.users.get(id);
    if (!existing) return void 0;
    const updated = { ...existing, ...user, updatedAt: /* @__PURE__ */ new Date() };
    this.users.set(id, updated);
    return updated;
  }
  async getUserFavorites(userId) {
    return Array.from(this.favorites.values()).filter((f) => f.userId === userId);
  }
  async addToFavorites(userId, favorite) {
    const id = `fav-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const newFav = {
      id,
      userId,
      itemType: favorite.itemType,
      itemId: favorite.itemId,
      itemTitle: favorite.itemTitle,
      itemImageUrl: favorite.itemImageUrl || null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.favorites.set(id, newFav);
    return newFav;
  }
  async removeFromFavorites(userId, itemId, itemType) {
    for (const [id, f] of this.favorites.entries()) {
      if (f.userId === userId && f.itemId === itemId && f.itemType === itemType) {
        this.favorites.delete(id);
      }
    }
  }
  async isFavorited(userId, itemId, itemType) {
    return Array.from(this.favorites.values()).some(
      (f) => f.userId === userId && f.itemId === itemId && f.itemType === itemType
    );
  }
  async getRepairGuides(filters) {
    let list = Array.from(this.repairGuides.values());
    if (filters?.deviceType) {
      list = list.filter((g) => g.deviceType === filters.deviceType);
    }
    if (filters?.category && filters.category !== "all") {
      list = list.filter((g) => g.category === filters.category);
    }
    if (filters?.difficulty && filters.difficulty !== "all") {
      list = list.filter((g) => g.difficulty === filters.difficulty);
    }
    return list;
  }
  async getRepairGuide(id) {
    return this.repairGuides.get(id);
  }
  async createRepairGuide(guide) {
    const id = `guide-${Date.now()}`;
    const newGuide = {
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
      isBookmarked: false
    };
    this.repairGuides.set(id, newGuide);
    return newGuide;
  }
  async updateViewCount(id) {
    const guide = this.repairGuides.get(id);
    if (guide) {
      guide.viewCount = (guide.viewCount || 0) + 1;
    }
  }
  async updateDownloadCount(id) {
    const guide = this.repairGuides.get(id);
    if (guide) {
      guide.downloadCount = (guide.downloadCount || 0) + 1;
    }
  }
  async toggleBookmark(id) {
    const guide = this.repairGuides.get(id);
    if (guide) {
      guide.isBookmarked = !guide.isBookmarked;
      return guide;
    }
    return void 0;
  }
  async searchRepairGuides(query) {
    const q = query.trim().toLowerCase();
    if (!q) return Array.from(this.repairGuides.values());
    return Array.from(this.repairGuides.values()).filter((g) => {
      const matchTitle = g.title.toLowerCase().includes(q);
      const matchDesc = g.description.toLowerCase().includes(q);
      const matchCategory = g.category.toLowerCase().includes(q);
      const matchDevice = g.deviceType.toLowerCase().includes(q);
      const matchDifficulty = g.difficulty.toLowerCase().includes(q);
      const matchTools = g.toolsRequired && g.toolsRequired.some((t) => t.toLowerCase().includes(q));
      const matchSteps = g.steps && g.steps.some((s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchCategory || matchDevice || matchDifficulty || matchTools || matchSteps;
    });
  }
  async getTroubleshootingFlows() {
    return Array.from(this.troubleshootingFlows.values());
  }
  async getTroubleshootingFlow(id) {
    return this.troubleshootingFlows.get(id);
  }
  async createTroubleshootingFlow(flow) {
    const id = `flow-${Date.now()}`;
    const newFlow = {
      id,
      type: flow.type,
      title: flow.title,
      description: flow.description,
      steps: flow.steps
    };
    this.troubleshootingFlows.set(id, newFlow);
    return newFlow;
  }
  async getDeviceComponents(deviceType) {
    let list = Array.from(this.deviceComponents.values());
    if (deviceType) {
      list = list.filter((c) => c.deviceType === deviceType);
    }
    return list;
  }
  async getDeviceComponent(id) {
    return this.deviceComponents.get(id);
  }
  async createDeviceComponent(component) {
    const id = `comp-${Date.now()}`;
    const newComp = {
      id,
      name: component.name,
      description: component.description,
      deviceType: component.deviceType,
      category: component.category,
      safetyNotes: component.safetyNotes
    };
    this.deviceComponents.set(id, newComp);
    return newComp;
  }
  async getDeviceBrands(deviceType) {
    let list = Array.from(this.deviceBrands.values());
    if (deviceType) {
      list = list.filter((b) => b.deviceType === deviceType);
    }
    return list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }
  async getDeviceModels(brandId, deviceType) {
    let list = Array.from(this.deviceModels.values());
    if (brandId) {
      list = list.filter((m) => m.brandId === brandId);
    }
    return list.sort((a, b) => (b.year || 0) - (a.year || 0));
  }
  async getDeviceModel(id) {
    return this.deviceModels.get(id);
  }
  async getModelsByBrand(brandId) {
    return Array.from(this.deviceModels.values()).filter((m) => m.brandId === brandId).sort((a, b) => (b.year || 0) - (a.year || 0));
  }
  async searchDeviceModels(query, deviceType) {
    const q = query.trim().toLowerCase();
    let list = Array.from(this.deviceModels.values());
    if (deviceType) {
      const matchingBrandIds = new Set(
        Array.from(this.deviceBrands.values()).filter((b) => b.deviceType === deviceType).map((b) => b.id)
      );
      list = list.filter((m) => matchingBrandIds.has(m.brandId));
    }
    if (!q) return list;
    return list.filter((m) => {
      const matchName = m.name.toLowerCase().includes(q);
      const matchSeries = m.series ? m.series.toLowerCase().includes(q) : false;
      const matchYear = m.year ? m.year.toString().includes(q) : false;
      const matchSpecs = m.specifications ? JSON.stringify(m.specifications).toLowerCase().includes(q) : false;
      const matchIssues = m.commonIssues ? JSON.stringify(m.commonIssues).toLowerCase().includes(q) : false;
      return matchName || matchSeries || matchYear || matchSpecs || matchIssues;
    });
  }
  async getCompatibleGuides(modelId) {
    const matchingCompats = Array.from(this.guideCompatibility.values()).filter(
      (c) => c.modelId === modelId && c.compatibility === "compatible"
    );
    const guideIds = new Set(matchingCompats.map((c) => c.guideId));
    return Array.from(this.repairGuides.values()).filter((g) => guideIds.has(g.id));
  }
  async getModelCompatibility(guideId) {
    const matchingCompats = Array.from(this.guideCompatibility.values()).filter(
      (c) => c.guideId === guideId
    );
    const modelIds = new Set(matchingCompats.map((c) => c.modelId));
    return Array.from(this.deviceModels.values()).filter((m) => modelIds.has(m.id));
  }
  async createUserGuide(guide) {
    return this.createRepairGuide(guide);
  }
};
var storage = db ? new DatabaseStorage() : new MemStorage();

// shared/technical-manuals.ts
var TECHNICAL_MANUALS = [
  // 1. HARDWARE MANUAL 1: Universal Laptop Teardown & Torque Spec
  {
    id: "man-hw-01",
    category: "hardware",
    title: "Universal Laptop Teardown & Screw Torque Specification Manual",
    code: "DOC-HW-TEARDOWN-2026",
    fileSize: "3.4 MB PDF",
    pages: 42,
    author: "JCR Bench Engineering Group",
    lastUpdated: "2026 Revision 4.2",
    summary: "Standard chassis screw torque limits, eDP ribbon connector zero-insertion-force (ZIF) latch protocols, and magnesium frame unibody separation techniques.",
    keyTopics: [
      "Thread engagement limits for M2/M2.5 chassis standoffs",
      "eDP 30-pin and 40-pin ribbon cable pinout safety",
      "Trackpad grounding tape and haptic sensor calibration",
      "Antenna routing channels and RF isolation shields"
    ],
    safetyDirectives: [
      "Always disconnect battery power harness before lifting motherboard",
      "Maintain grounded ESD wrist strap under 1 megohm resistance",
      "Never reuse stripped Torx screws on hinge anchors"
    ],
    recommendedTools: ["Torx T4/T5/T6", "Phillips #00", "Plastic Spudger Kit", "Torque Screwdriver (0.2-0.5 Nm)"],
    fastenerTorqueTable: [
      { location: "Bottom Cover Perimeter (Magnesium / Aluminum)", screwType: "Torx T5", size: "M2.0 x 3.5mm", torque: "0.20 - 0.25 Nm", threadLock: "Blue Loctite 242 (Low)" },
      { location: "Display Hinge Anchor Brackets into Palmrest Standoffs", screwType: "Phillips #00", size: "M2.5 x 5.0mm", torque: "0.45 - 0.50 Nm", threadLock: "Pre-applied Nylon patch" },
      { location: "CPU/GPU Heatsink Spring-Loaded Captive Screws (X-Pattern)", screwType: "Phillips #00", size: "M2.0 x 3.0mm Captive", torque: "0.25 Nm (Stop at thread bottom)", threadLock: "None" },
      { location: "NVMe M.2 2280 Standoff Retainer", screwType: "Phillips #0", size: "M2.0 x 2.5mm Flat Head", torque: "0.15 Nm", threadLock: "None" },
      { location: "Internal Battery Perimeter Screws", screwType: "Phillips #00", size: "M2.0 x 4.0mm Waist", torque: "0.18 - 0.20 Nm", threadLock: "None" },
      { location: "Motherboard Logic Board Retaining Screws", screwType: "Phillips #00", size: "M2.0 x 3.0mm Silver", torque: "0.20 Nm", threadLock: "None" }
    ],
    voltageRails: [
      { rail: "+19V_DCIN / +20V_USB_PD", voltage: "19.5V - 20.0V", tolerance: "\xB15%", location: "DC-In Jack / Dual Input MOSFETs", normalImpedance: "> 100 k\u03A9", description: "Primary unregulated DC supply directly after power brick/USB-C negotiation." },
      { rail: "+3.3V_ALW (Always-On)", voltage: "3.32V", tolerance: "\xB12%", location: "Coil PL301 near TPS51285", normalImpedance: "> 15 k\u03A9", description: "Powers Super I/O EC controller, power button circuit, and BIOS flash chip." },
      { rail: "+5.0V_ALW (Always-On)", voltage: "5.05V", tolerance: "\xB12%", location: "Coil PL302", normalImpedance: "> 20 k\u03A9", description: "Powers USB 5V VBUS switches and audio codec standby circuits." },
      { rail: "+1.8V_PRIM / +1.8V_AUX", voltage: "1.80V", tolerance: "\xB13%", location: "Coil PL501 near PCH", normalImpedance: "> 800 \u03A9", description: "Low-voltage system I/O, SPI BIOS ROM buffer, and PCH clock rails." }
    ],
    chapters: [
      {
        id: "ch-1",
        chapterNumber: 1,
        title: "Chassis Fastener Management & Torque Standards",
        subtitle: "Preventing stripped threads and stripped plastic boss standoffs",
        paragraphs: [
          "Modern ultrabooks utilize CNC-milled aluminum or injection-molded magnesium alloy shells with pressed-in brass knurled inserts. Exceeding 0.35 Nm of torque on M2.0 chassis screws will instantly fracture the polycarbonate boss surrounding the brass insert.",
          "Always organize fasteners using a magnetized magnetic project grid partitioned into A1-D4 quadrants matching the perimeter layout of the underside."
        ],
        steps: [
          { stepLabel: "1.1", action: "Perimeter Loosening", details: "Loosen all perimeter fasteners in an outside-in counterclockwise sequence before fully removing any individual screw to equalize internal chassis clip tension." },
          { stepLabel: "1.2", action: "Prying Tool Engagement", details: "Insert a POM plastic pry blade at the rear vent seam. Never pry from the front audio jack or thin speaker grille openings." }
        ]
      },
      {
        id: "ch-2",
        chapterNumber: 2,
        title: "ZIF and eDP Micro-Connector Handling",
        subtitle: "Zero-Insertion-Force ribbon latches and high-speed display flex cables",
        paragraphs: [
          "Zero-Insertion-Force (ZIF) connectors utilize a pivoting plastic locking lever. Never yank the ribbon cable while the actuator flap is in the locked down position.",
          "eDP 40-pin connectors carry both 3.3V logic signaling and high-voltage 19V backlight power (BL_PWR). Pulling the connector at an angle can cause the 19V pin to bridge to an adjacent 3.3V data line, immediately blowing the SOC GPU display controller."
        ]
      }
    ]
  },
  // 2. HARDWARE MANUAL 2: Motherboard Power Delivery & VRM
  {
    id: "man-hw-02",
    category: "hardware",
    title: "Motherboard Power Delivery & DC-In VRM Diagnostic Schematic",
    code: "SCHEM-HW-PWR-VRM",
    fileSize: "4.8 MB PDF",
    pages: 28,
    author: "JCR Micro-soldering Team",
    lastUpdated: "2026 Revision 2.0",
    summary: "Detailed 19V / 20V USB-C Power Delivery handshake verification, 3.3V/5V always-on buck converter testing, and MOSFET short detection.",
    keyTopics: [
      "USB-C Power Delivery CC1/CC2 communication triggers",
      "High-side and low-side switching MOSFET gate measurements",
      "Thermal camera hot-spot analysis for shorted SMD capacitors",
      "RTC battery discharge circuits and CMOS reset sequences"
    ],
    safetyDirectives: [
      "Use current-limited DC bench power supply when injecting 1V into shorted rails",
      "Do not bypass thermal fuses or PPTC resettable fuses"
    ],
    recommendedTools: ["Digital Multimeter (True RMS)", "DC Bench Power Supply", "Thermal Camera", "Hot Air Rework Station"],
    voltageRails: [
      { rail: "+19V_DCIN / +20V_USB_PD", voltage: "19.5V - 20.0V", tolerance: "\xB15%", location: "DC-In Jack / Dual Input MOSFETs", normalImpedance: "> 100 k\u03A9", description: "Primary unregulated DC supply directly after power brick/USB-C negotiation." },
      { rail: "+3.3V_ALW (Always-On)", voltage: "3.32V", tolerance: "\xB12%", location: "Coil PL301 near TPS51285", normalImpedance: "> 15 k\u03A9", description: "Powers Super I/O EC controller, power button circuit, and BIOS flash chip." },
      { rail: "+5.0V_ALW (Always-On)", voltage: "5.05V", tolerance: "\xB12%", location: "Coil PL302", normalImpedance: "> 20 k\u03A9", description: "Powers USB 5V VBUS switches and audio codec standby circuits." },
      { rail: "+1.05V_VCCST / VCCSA", voltage: "1.05V", tolerance: "\xB12%", location: "Coil PL701 near CPU Socket", normalImpedance: "15 - 45 \u03A9", description: "System Agent and sustained CPU boot sequence rail." },
      { rail: "+VCORE (CPU Core)", voltage: "0.75V - 1.35V Dynamic", tolerance: "\xB11.5%", location: "Multi-phase inductors surrounding CPU", normalImpedance: "1.2 - 8.5 \u03A9 (Low normal)", description: "Dynamic VCORE supplied by PWM controller via high-speed DrMOS power stages." },
      { rail: "+V_GFX (Integrated GPU)", voltage: "0.80V - 1.15V Dynamic", tolerance: "\xB12%", location: "PL901 / PL902", normalImpedance: "3.0 - 12.0 \u03A9", description: "Supplies integrated display rendering core." },
      { rail: "+1.2V / +1.1V DDR (RAM)", voltage: "1.10V (DDR5) / 1.20V (DDR4)", tolerance: "\xB12%", location: "Coil PL401 near SO-DIMM", normalImpedance: "80 - 250 \u03A9", description: "Main memory module supply rail." }
    ],
    chapters: [
      {
        id: "vrm-1",
        chapterNumber: 1,
        title: "Power-On Sequence & S0/S3/S5 State Transitions",
        subtitle: "Tracing standby rails from DC plug insertion to CPU_PWRGD",
        paragraphs: [
          "When DC power is connected, the Embedded Controller (EC) boots first from +3.3V_ALW. It verifies the AC_PRESENT signal and waits for the power button pulse (NBSWON#) to drop low for at least 150ms.",
          "Upon button release, EC asserts PM_SLP_S5# and PM_SLP_S3# to enable main VRM converters in sequential order: +1.8V -> DDR -> VCCSA -> VCORE."
        ]
      }
    ]
  },
  // 3. SOFTWARE MANUAL 1: BSOD & Kernel Minidump Manual
  {
    id: "man-sw-01",
    category: "software",
    title: "Windows Kernel Minidump & BSOD Stop-Code Resolution Manual",
    code: "MAN-SW-BSOD-WIN11",
    fileSize: "2.8 MB PDF",
    pages: 36,
    author: "JCR OS Systems Architecture",
    lastUpdated: "2026 Revision 3.1",
    summary: "Systematic resolution for WHEA_UNCORRECTABLE_ERROR, CRITICAL_PROCESS_DIED, IRQL_NOT_LESS_OR_EQUAL, and DPC_WATCHDOG_VIOLATION.",
    keyTopics: [
      "WinDbg Preview symbol path setup and '!analyze -v' stack triage",
      "PCIe AER (Advanced Error Reporting) WHEA bus crash diagnosis",
      "Kernel memory dump conversion and pagefile corruption fix",
      "DISM /RestoreHealth and SFC /scannow CBS.log triage"
    ],
    safetyDirectives: [
      "Always backup BitLocker recovery keys prior to BCD and EFI partition repairs",
      "Never disable driver signature verification in production environments"
    ],
    recommendedTools: ["WinDbg Preview", "BluescreenView", "Driver Verifier (verifier.exe)", "DISM / SFC CLI"],
    chapters: [
      {
        id: "bsod-1",
        chapterNumber: 1,
        title: "WinDbg Kernel Minidump Triage Protocol",
        subtitle: "Configuring Microsoft Symbol Server and deciphering exception codes",
        paragraphs: [
          "Copy minidump files from C:\\Windows\\Minidump to a local scratch folder. Open WinDbg as Administrator and execute '!analyze -v'. Look for FAILURE_BUCKET_ID and MODULE_NAME.",
          "If the offending module is ntoskrnl.exe or hal.dll, examine the Arg1 memory pointer: 0x00000000 indicates a null pointer dereference, while 0xFFFFF80... indicates a kernel driver address space crash."
        ]
      }
    ]
  },
  // 4. SOFTWARE MANUAL 2: UEFI Firmware Recovery Manual
  {
    id: "man-sw-02",
    category: "software",
    title: "Blind UEFI/BIOS Crisis Recovery & SPI Flashing Guide",
    code: "MAN-SW-UEFI-CRISIS",
    fileSize: "3.1 MB PDF",
    pages: 24,
    author: "JCR Firmware Security Lab",
    lastUpdated: "2026 Revision 2.5",
    summary: "Crisis key combinations (Fn+R, Win+B, Fn+Esc), FAT32 USB crisis file naming conventions, and external CH341A 3.3V/1.8V SPI clip programming.",
    keyTopics: [
      "Dell / HP / Lenovo blind USB flash rescue trigger combinations",
      "Extracting HDR/CAP/ROM images from OEM executable installers",
      "CH341A SPI hardware flashing with NeoProgrammer / Flashrom",
      "Clearing Intel ME (Management Engine) region for clean PCH initialization"
    ],
    safetyDirectives: [
      "Ensure CH341A programmer jumper is set to 3.3V or 1.8V (never supply 5V to SPI ROM)",
      "Always take 2 identical SPI dumps and MD5 hash verify before writing"
    ],
    recommendedTools: ["CH341A SPI Programmer", "SOIC8 Test Clip", "NeoProgrammer 2.2", "FAT32 8GB USB Flash Drive"],
    chapters: [
      {
        id: "uefi-1",
        chapterNumber: 1,
        title: "OEM Blind Crisis Flash Triggers",
        subtitle: "Key combinations to force boot-block crisis mode",
        paragraphs: [
          "HP: Power OFF -> Hold Win + B (or Win + V) -> Hold Power for 3 seconds -> Release Power but keep Win + B held for 15 seconds.",
          "Dell: Unplug AC -> Hold Ctrl + Esc -> Plug in AC -> Release keys when power LED blinks 3 amber 3 white.",
          "Lenovo ThinkPad: Unplug AC and Battery -> Hold Fn + R -> Plug in AC -> Press Power once."
        ]
      }
    ]
  },
  // 5. CLEANING MANUAL 1: Cleanroom Laptop Decontamination
  {
    id: "man-cl-01",
    category: "cleaning",
    title: "Cleanroom Laptop Decontamination & Ultrasonic Board Cleaning Protocol",
    code: "SOP-CL-CLEAN-2026",
    fileSize: "2.1 MB PDF",
    pages: 18,
    author: "JCR Environmental & Cleanroom Ops",
    lastUpdated: "2026 Revision 1.9",
    summary: "Isolating liquid ingress corrosion, ultrasonic bath temperature / chemistry parameters, and 99.9% anhydrous isopropyl alcohol dehydration.",
    keyTopics: [
      "Electrochemical migration (dendrite growth) under BGA balls",
      "Ultrasonic tank frequency (40kHz vs 80kHz) and Branson EC chemistry",
      "Baking board in convection oven at 65\xB0C for 4 hours post-wash",
      "Replacing corroded 0402 SMD passives and tinning oxidized pads"
    ],
    safetyDirectives: [
      "Never immerse microphones, speakers, cameras, or touchpad click mechanisms in ultrasonic bath",
      "Operate isopropyl alcohol baths in a well-ventilated fume extraction enclosure"
    ],
    recommendedTools: ["Digital Heated Ultrasonic Cleaner", "99.9% Isopropyl Alcohol", "Anti-static Soft ESD Brushes", "PCB Preheater / Drying Oven"],
    chapters: [
      {
        id: "clean-1",
        chapterNumber: 1,
        title: "Liquid Damage Triage & Ultrasonic Cycle",
        subtitle: "Step-by-step chemical neutralization of sugar, salt, and acidic corrosion",
        paragraphs: [
          "Liquid spills cause galvanic corrosion when power is applied. First, photograph all component markings.",
          "Submerge stripped motherboard in ultrasonic bath containing 90% distilled water + 10% Branson EC cleaner at 50\xB0C for 8 minutes. Rinse with pure distilled water, then flush with 99.9% IPA to absorb moisture, and bake at 65\xB0C for 4 hours."
        ]
      }
    ]
  },
  // 6. CLEANING MANUAL 2: Thermal Interface & Vapor Chamber
  {
    id: "man-cl-02",
    category: "cleaning",
    title: "Thermal Interface Material & Phase-Change (PTM7950) Application Standard",
    code: "STD-CL-THERMAL-2026",
    fileSize: "2.6 MB PDF",
    pages: 22,
    author: "JCR Thermal Engineering Lab",
    lastUpdated: "2026 Revision 3.0",
    summary: "Surface flatness measurement, Honeywell PTM7950 phase-change pad application, thermal putty (Upsiren U6 Pro) gap fill, and heatsink mounting tension.",
    keyTopics: [
      "Comparing standard paste vs Liquid Metal vs PTM7950 phase-change pad",
      "Preventing pump-out effect on direct-die bare silicon laptop CPUs",
      "Thermal putty viscosity and compression for VRAM / VRM chokes",
      "Delta T thermal dissipation benchmarks under Prime95 + FurMark"
    ],
    safetyDirectives: [
      "If using Liquid Metal (Galinstan), apply Conformal Coating (MG Chemicals 422C) and high-density foam barrier around SMD capacitors",
      "Never scrape bare copper coldplates with steel razor blades"
    ],
    recommendedTools: ["Honeywell PTM7950 (0.25mm)", "Upsiren U6 Pro Thermal Putty", "ArctiClean 1 & 2 Emulsifier", "Torque Driver (0.25 Nm)"],
    chapters: [
      {
        id: "therm-1",
        chapterNumber: 1,
        title: "PTM7950 Application Protocol",
        subtitle: "Eliminating pump-out effect on direct-die gaming laptops",
        paragraphs: [
          "Honeywell PTM7950 is solid below 45\xB0C and transitions into a viscous gel at operating temperatures, filling micro-voids without pumping out over thermal cycles.",
          "Chill the PTM7950 sheet in a refrigerator for 5 minutes before cutting to silicon die dimensions. Peel back one protective plastic film, apply to silicon, rub lightly with finger, then peel top film before mounting heatsink."
        ]
      }
    ]
  },
  // 7. UPGRADES MANUAL 1: NVMe & PCIe Gen 5 Storage Retrofit
  {
    id: "man-up-01",
    category: "upgrades",
    title: "High-Performance NVMe PCIe 4.0/5.0 SSD Retrofitting & Migration Guide",
    code: "GDE-UP-NVME-2026",
    fileSize: "3.7 MB PDF",
    pages: 30,
    author: "JCR Storage Solutions Group",
    lastUpdated: "2026 Revision 2.8",
    summary: "Single-sided vs double-sided 2280 compatibility, thermal pad thickness matching, cloning boot drives with Macrium / Clonezilla, and 4K sector alignment.",
    keyTopics: [
      "Checking M.2 slot lane bifurcation (x2 vs x4 PCIe lanes)",
      "Bare-metal cloning sector-by-sector vs intelligent file copy",
      "Fixing INACCESSIBLE_BOOT_DEVICE post-NVMe migration",
      "Enabling TRIM and Host Memory Buffer (HMB) in Windows & Linux"
    ],
    safetyDirectives: [
      "Ensure laptop battery is disconnected prior to inserting NVMe into M.2 key slot",
      "Do not compress thick 1.5mm thermal pads onto thin 0.5mm clearance laptops"
    ],
    recommendedTools: ["Macrium Reflect / Clonezilla Bootable USB", "M.2 NVMe USB-C Enclosure", "Kaisi Thermal Pad Assortment (0.5mm - 1.5mm)"],
    chapters: [
      {
        id: "nvme-1",
        chapterNumber: 1,
        title: "Drive Migration & Sector Realignment",
        subtitle: "Zero-downtime OS migration without re-installing Windows",
        paragraphs: [
          "Connect replacement NVMe SSD via USB 3.2 Gen 2 enclosure. Launch Macrium Reflect, select source OS drive, and click 'Clone this disk'.",
          "Ensure partitions are proportionally resized to occupy full replacement capacity. Ensure EFI System Partition (ESP) remains at 100-260MB and 4K sector alignment is checked."
        ]
      }
    ]
  },
  // 8. UPGRADES MANUAL 2: High-Density DDR5 & SO-DIMM Architecture
  {
    id: "man-up-02",
    category: "upgrades",
    title: "High-Density DDR5/LPDDR5 Memory Architecture & Retrofit Guide",
    code: "GDE-UP-RAM-DDR5",
    fileSize: "2.4 MB PDF",
    pages: 20,
    author: "JCR Memory Testing Laboratory",
    lastUpdated: "2026 Revision 1.5",
    summary: "1Rx8 vs 1Rx16 sub-channel ranks, on-die ECC functionality, SPD profile flashing, and memory training POST delays on Intel 13th/14th Gen & AMD 7000/8000.",
    keyTopics: [
      "Understanding DDR5 dual 32-bit subchannels per channel",
      "Recognizing normal 2-3 minute first-boot Memory Training behavior",
      "SO-DIMM latch tension and copper EMI shield re-installation",
      "MemTest86 4-pass zero-error verification standard"
    ],
    safetyDirectives: [
      "Allow laptop to sit with power disconnected for 60 seconds to drain PMIC capacitors on DDR5 modules",
      "Never touch gold fingers directly to avoid skin oil oxidation"
    ],
    recommendedTools: ["MemTest86 Pro USB", "Plastic Pry Pick", "Kapton Tape", "Anti-Static Wrist Strap"],
    chapters: [
      {
        id: "ram-1",
        chapterNumber: 1,
        title: "DDR5 Memory Training & First Boot Protocol",
        subtitle: "Why the screen stays black for 120 seconds after installing new RAM",
        paragraphs: [
          "DDR5 features an onboard Power Management IC (PMIC) and executes internal signal calibration (Memory Training) on first power-on with new DIMMs.",
          "The power LED may pulse for up to 180 seconds while the BIOS tests sub-timings. Do NOT power cycle the machine during this phase, or you risk corrupting the BIOS NVRAM."
        ]
      }
    ]
  }
];
function getManualById(id) {
  return TECHNICAL_MANUALS.find((m) => m.id === id);
}
function getManualsByCategory(category) {
  return TECHNICAL_MANUALS.filter((m) => m.category === category);
}

// server/middleware/adminAuth.ts
var requireAdmin = async (req, res, next) => {
  const user = req.user;
  if (!user || !user.id) {
    return res.status(401).json({ message: "Unauthorized: Admin access requires authentication" });
  }
  try {
    const dbUser = await storage.getUser(user.id);
    if (!dbUser || dbUser.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    req.adminUser = dbUser;
    next();
  } catch (error) {
    console.error("Error checking admin status:", error);
    res.status(500).json({ message: "Failed to verify admin status" });
  }
};

// server/auth.ts
var import_passport = __toESM(require("passport"), 1);
var import_passport_local = require("passport-local");
var import_express_session = __toESM(require("express-session"), 1);
var import_bcrypt2 = __toESM(require("bcrypt"), 1);
var isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
};
function setupAuth(app2) {
  app2.set("trust proxy", 1);
  const sessionSettings = {
    secret: process.env.SESSION_SECRET || "jcrguru-secret-key-2025",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: "auto",
      sameSite: "lax",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1e3
      // 30 days
    }
  };
  app2.use((0, import_express_session.default)(sessionSettings));
  app2.use(import_passport.default.initialize());
  app2.use(import_passport.default.session());
  import_passport.default.use(
    new import_passport_local.Strategy({ usernameField: "email" }, async (rawEmail, password, done) => {
      try {
        const email = (rawEmail || "").trim().toLowerCase();
        if (!email || !password) {
          return done(null, false, { message: "Email and password are required." });
        }
        const user = await storage.getUserByEmail(email);
        if (!user) {
          return done(null, false, { message: "No account found for this email. Please register or use Quick Demo Sign-In." });
        }
        const isMatch = await import_bcrypt2.default.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password. Please verify your credentials." });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  import_passport.default.serializeUser((user, done) => {
    done(null, user.id);
  });
  import_passport.default.deserializeUser(async (id, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user || null);
    } catch (err) {
      done(err);
    }
  });
  app2.post("/api/register", async (req, res, next) => {
    try {
      const { email: rawEmail, password, firstName, lastName, role } = req.body;
      const email = (rawEmail || "").trim().toLowerCase();
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
      }
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "An account with this email already exists. Please sign in." });
      }
      const hashedPassword = await import_bcrypt2.default.hash(password, 10);
      const user = await storage.createUser({
        email,
        password: hashedPassword,
        firstName: firstName?.trim() || "Technician",
        lastName: lastName?.trim() || "",
        role: role || "user"
      });
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (err) {
      next(err);
    }
  });
  app2.post("/api/login", (req, res, next) => {
    import_passport.default.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({
          message: info?.message || "Invalid email or password. Please verify your credentials."
        });
      }
      req.login(user, (loginErr) => {
        if (loginErr) return next(loginErr);
        return res.json(user);
      });
    })(req, res, next);
  });
  app2.post("/api/quick-login", async (req, res, next) => {
    try {
      const { email: rawEmail } = req.body;
      const email = (rawEmail || "Jhustle44@gmail.com").trim().toLowerCase();
      let user = await storage.getUserByEmail(email);
      if (!user) {
        const defaultHash = await import_bcrypt2.default.hash("password123", 10);
        user = await storage.createUser({
          email,
          password: defaultHash,
          firstName: email.includes("jhustle") ? "Master" : "Technician",
          lastName: "Pro",
          role: email.includes("admin") || email.includes("jhustle") ? "admin" : "technician"
        });
      }
      req.login(user, (err) => {
        if (err) return next(err);
        res.json(user);
      });
    } catch (err) {
      next(err);
    }
  });
  app2.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });
  app2.get("/api/user", (req, res) => {
    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json(req.user);
  });
}

// server/middleware/upload.ts
var import_multer = __toESM(require("multer"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var uploadDir = "uploads/profiles";
if (!import_fs.default.existsSync(uploadDir)) {
  import_fs.default.mkdirSync(uploadDir, { recursive: true });
}
var storage2 = import_multer.default.diskStorage({
  destination: function(_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename: function(_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + import_path.default.extname(file.originalname));
  }
});
var upload = (0, import_multer.default)({
  storage: storage2,
  limits: {
    fileSize: 5 * 1024 * 1024
    // 5MB limit
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  }
});

// server/ai-diagnostics.ts
var import_genai = require("@google/genai");
var genAIClient = null;
function getGenAI() {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new import_genai.GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return genAIClient;
}
async function callGeminiWithFallback(fn) {
  const models = ["gemini-3.1-flash-lite", "gemini-3.7-flash", "gemini-flash-latest"];
  for (const model of models) {
    try {
      const res = await fn(model);
      if (res) return res;
    } catch (err) {
      continue;
    }
  }
  return null;
}
var SYSTEM_INSTRUCTION = `You are JCR Guide Pro's expert Hardware & Computer Diagnostic Specialist.
Your SOLE purpose is to diagnose, troubleshoot, and provide step-by-step resolution paths for computer hardware, laptops, desktops, operating systems (Windows, macOS, Linux), peripherals, thermals, BIOS/UEFI, and electronic repairs.

STRICT SCOPE DIRECTIVE:
You ONLY assist with device diagnostics, computer repair, hardware upgrades, OS recovery, driver/firmware fixes, component testing, and cleaning.
If a user prompt is unrelated to computer/laptop repair or hardware maintenance (such as general conversational queries, creative writing, cooking, gaming lore, non-PC topics), set "isOutOfScope": true, give a polite 1-sentence refusal in "summary", and leave the other lists empty.

For valid computer repair queries, provide a highly technical, precise, and practical diagnostic analysis adhering to industry standard bench repair practices.`;
async function runAIDiagnostics(reqData) {
  const ai = getGenAI();
  if (!ai) {
    return generateFallbackDiagnostics(reqData);
  }
  const prompt = `Diagnose the following computer/laptop issue:
Device Type: ${reqData.deviceType || "Laptop/Desktop"}
Brand/Model: ${reqData.brand || "Generic"} ${reqData.model || ""}
Operating System: ${reqData.os || "Any"}
Target Category: ${reqData.category || "Any"}
Reported Symptoms / Error Code: ${reqData.symptoms} ${reqData.errorCode ? `(Error code: ${reqData.errorCode})` : ""}`;
  const result = await callGeminiWithFallback(async (modelName) => {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            isOutOfScope: { type: import_genai.Type.BOOLEAN, description: "True if the question is not about computer or electronics repair" },
            summary: { type: import_genai.Type.STRING, description: "High-level summary of the diagnostic finding" },
            confidence: { type: import_genai.Type.STRING, enum: ["High", "Medium", "Low"], description: "Diagnostic confidence" },
            recommendedCategory: { type: import_genai.Type.STRING, enum: ["hardware", "software", "cleaning", "upgrades"], description: "Primary repair category" },
            probableCauses: {
              type: import_genai.Type.ARRAY,
              items: {
                type: import_genai.Type.OBJECT,
                properties: {
                  cause: { type: import_genai.Type.STRING },
                  likelihood: { type: import_genai.Type.STRING, enum: ["High", "Medium", "Low"] },
                  explanation: { type: import_genai.Type.STRING }
                },
                required: ["cause", "likelihood", "explanation"]
              }
            },
            stepByStepPlan: {
              type: import_genai.Type.ARRAY,
              items: {
                type: import_genai.Type.OBJECT,
                properties: {
                  stepNumber: { type: import_genai.Type.INTEGER },
                  title: { type: import_genai.Type.STRING },
                  action: { type: import_genai.Type.STRING },
                  expectedOutcome: { type: import_genai.Type.STRING }
                },
                required: ["stepNumber", "title", "action", "expectedOutcome"]
              }
            },
            toolsAndSoftware: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "Diagnostic tools or software like HWiNFO64, MemTest86, DDU, Multimeter, ESD strap"
            },
            safetyWarnings: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "Safety guidelines regarding power isolation, battery handling, and ESD"
            },
            preventativeTips: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING }
            }
          },
          required: [
            "summary",
            "confidence",
            "recommendedCategory",
            "probableCauses",
            "stepByStepPlan",
            "toolsAndSoftware",
            "safetyWarnings",
            "preventativeTips"
          ]
        }
      }
    });
    const parsed = JSON.parse(response.text || "{}");
    return parsed;
  });
  if (result) {
    return result;
  }
  return generateFallbackDiagnostics(reqData);
}
function generateFallbackDiagnostics(reqData) {
  const sym = (reqData.symptoms || "").toLowerCase();
  const err = (reqData.errorCode || "").toLowerCase();
  let category = "hardware";
  let summary = `Diagnostic assessment for ${reqData.brand || "Device"} ${reqData.model || ""}`;
  let confidence = "High";
  const probableCauses = [];
  const stepByStepPlan = [];
  const toolsAndSoftware = [];
  const safetyWarnings = [
    "Always disconnect AC adapter and main battery before touching internal motherboard components.",
    "Wear an ESD anti-static wrist strap or ground yourself against bare unpainted metal.",
    "Never compress or puncture swollen lithium-ion battery pouches."
  ];
  const preventativeTips = [
    "Keep device firmware/BIOS updated from the official vendor support portal.",
    "Perform annual dust cleaning and thermal paste refresh to prevent thermal degradation."
  ];
  if (sym.includes("blue screen") || sym.includes("bsod") || sym.includes("freeze") || sym.includes("crash") || err.includes("dump")) {
    category = "software";
    summary = "Kernel Stop Code / System Instability detected. Likely caused by conflicting graphics/chipset drivers or RAM memory bit flips.";
    probableCauses.push(
      { cause: "Outdated or Corrupted Graphics/Chipset Drivers", likelihood: "High", explanation: "Conflicting kernel-mode drivers crashing Windows kernel (ntoskrnl.exe)." },
      { cause: "Failing RAM Memory Module", likelihood: "Medium", explanation: "Defective DDR4/DDR5 memory cell failing read/write validation passes." },
      { cause: "System File Corruption (SFC/DISM)", likelihood: "Medium", explanation: "Corrupted system DLLs following incomplete Windows updates." }
    );
    stepByStepPlan.push(
      { stepNumber: 1, title: "Boot Safe Mode & Run DDU", action: "Boot into Safe Mode, run Display Driver Uninstaller (DDU) to wipe old GPU drivers, then install latest WHQL driver.", expectedOutcome: "Clean driver installation without legacy hooks." },
      { stepNumber: 2, title: "Run DISM & SFC System File Repair", action: "Execute 'DISM /Online /Cleanup-Image /RestoreHealth' followed by 'sfc /scannow' in Administrator Terminal.", expectedOutcome: "System integrity verified and corrupted DLLs replaced." },
      { stepNumber: 3, title: "Execute MemTest86 4-Pass Scan", action: "Create bootable USB with PassMark MemTest86 and test RAM for 4 full passes.", expectedOutcome: "Confirm memory subsystem has zero hardware faults." }
    );
    toolsAndSoftware.push("Display Driver Uninstaller (DDU)", "PassMark MemTest86", "WinDbg Preview", "CrystalDiskInfo");
  } else if (sym.includes("heat") || sym.includes("fan") || sym.includes("temp") || sym.includes("loud") || sym.includes("throttle")) {
    category = "cleaning";
    summary = "Thermal Throttling & Airflow Restriction detected. CPU/GPU package temperatures exceeding safe operating TJMax thresholds.";
    probableCauses.push(
      { cause: "Dried Thermal Interface Material (TIM)", likelihood: "High", explanation: "Factory silicone paste pumped out or baked, creating micro-voids between die and coldplate." },
      { cause: "Clogged Copper Heatsink Radiator Fins", likelihood: "High", explanation: "Felt-like dust wall trapped between blower fan outlet and copper exhaust fins." },
      { cause: "Bearing Wear on Centrifugal Fan", likelihood: "Medium", explanation: "Imbalanced impeller blades or dry sleeve bearings causing RPM drop." }
    );
    stepByStepPlan.push(
      { stepNumber: 1, title: "Disassemble Bottom Chassis & Exhaust", action: "Remove bottom cover, disconnect battery, and remove blower fans and heatpipe assembly.", expectedOutcome: "Exhaust radiators and die exposed for inspection." },
      { stepNumber: 2, title: "Clean Fins & Strip Old Paste", action: "Use 99% Isopropyl Alcohol and ESD brush to clear radiator fin walls and remove dried paste from copper coldplates.", expectedOutcome: "Mirror-clean bare silicon die." },
      { stepNumber: 3, title: "Apply Honeywell PTM7950 & Re-torque", action: "Cut and apply 0.25mm PTM7950 phase change pad. Torque heatsink screws diagonally (1\u21922\u21923\u21924) to 0.25 Nm.", expectedOutcome: "Optimal core-to-heatsink heat transfer under sustained load." }
    );
    toolsAndSoftware.push("Honeywell PTM7950 / Arctic MX-6", "99% Isopropyl Alcohol", "ESD Bristle Brush", "HWiNFO64");
  } else if (sym.includes("power") || sym.includes("dead") || sym.includes("charge") || sym.includes("turn on") || sym.includes("black screen")) {
    category = "hardware";
    summary = "Power Delivery & Initial POST failure. The board is failing to complete the power sequence or standby rail handoff.";
    probableCauses.push(
      { cause: "DC-In Stage or Primary Input MOSFET Short", likelihood: "High", explanation: "High-side DC-in MOSFET (PQ101) shorted to ground, triggering power supply over-current protection." },
      { cause: "Standby 3.3V/5V Regulator Circuit Fault", likelihood: "Medium", explanation: "Buck regulator coil (PL301/PL302) damaged or missing enabling signal from Super I/O EC." },
      { cause: "Stuck Embedded Controller (EC) Register Lock", likelihood: "Medium", explanation: "Transient electrostatic discharge locking the EC power sequencer state machine." }
    );
    stepByStepPlan.push(
      { stepNumber: 1, title: "15-Second Hard RTC/EC Drain", action: "Disconnect charger and battery. Hold power button firmly for 15 seconds to force residual discharge.", expectedOutcome: "Clear stuck EC register states." },
      { stepNumber: 2, title: "Measure Primary DC Input (+19V/+20V)", action: "Connect power supply with multimeter. Measure voltage on the drain and source of input MOSFETs.", expectedOutcome: "Verify +19V or +20V USB-PD reaches the main power rail." },
      { stepNumber: 3, title: "Check Standby Always-On Coils", action: "Probe coils PL301 (+3.3V_ALW) and PL302 (+5.0V_ALW) with multimeter in DC voltage mode.", expectedOutcome: "Confirm both 3.3V and 5.0V standby rails are stable." }
    );
    toolsAndSoftware.push("Digital Multimeter (Fluke/Aneng)", "DC Power Bench Supply", "Torx T5 / Phillips #00 Screwdrivers", "Safety Grounding Strap");
  } else {
    category = "hardware";
    summary = `Hardware diagnostic assessment for reported symptom: "${reqData.symptoms}". Follow structured electrical isolation protocol.`;
    probableCauses.push(
      { cause: "Loose Internal Cable or Connector Latch", likelihood: "Medium", explanation: "Vibration or impact dislodging eDP display, battery, or ribbon connector." },
      { cause: "Power Rail Fault or Drained CMOS RTC", likelihood: "Medium", explanation: "RTC clock lockup preventing board POST cycle." },
      { cause: "Component Degradation", likelihood: "Low", explanation: "Capacitor leakage or solder fatigue on mainboard power stages." }
    );
    stepByStepPlan.push(
      { stepNumber: 1, title: "Hard Power Cycle & CMOS Drain", action: "Disconnect power cord and battery, hold power button for 30 seconds, then reconnect.", expectedOutcome: "Clear transient RTC register locks." },
      { stepNumber: 2, title: "Minimal POST Test", action: "Disconnect non-essential peripherals, Wi-Fi card, and extra storage drives. Test boot with single RAM stick.", expectedOutcome: "Identify if peripheral short is halting POST." },
      { stepNumber: 3, title: "Inspect Connectors Under Light", action: "Check motherboard sockets for bent pins, burn marks, or cracked solder joints.", expectedOutcome: "Confirm physical board integrity." }
    );
    toolsAndSoftware.push("Precision Toolkit", "Digital Multimeter", "Anti-Static Mat & Wrist Strap", "Magnification Loupe");
  }
  return {
    summary,
    confidence,
    recommendedCategory: category,
    probableCauses,
    stepByStepPlan,
    toolsAndSoftware,
    safetyWarnings,
    preventativeTips,
    isOutOfScope: false
  };
}
async function runTechnicalAIChat(reqData) {
  const allGuides = await storage.getRepairGuides();
  const manuals = TECHNICAL_MANUALS;
  const userMessages = reqData.messages.filter((m) => m.role === "user");
  const latestUserMsg = userMessages.length > 0 ? userMessages[userMessages.length - 1].content : "";
  const queryLower = latestUserMsg.toLowerCase();
  const matchingGuides = allGuides.filter((g) => {
    const titleMatch = g.title.toLowerCase().includes(queryLower);
    const descMatch = g.description.toLowerCase().includes(queryLower);
    const words = queryLower.split(/\s+/).filter((w) => w.length > 2);
    const multiMatch = words.length > 0 && words.some((w) => g.title.toLowerCase().includes(w));
    return titleMatch || descMatch || multiMatch;
  }).slice(0, 5);
  const matchingManuals = manuals.filter((m) => {
    return m.title.toLowerCase().includes(queryLower) || m.summary.toLowerCase().includes(queryLower) || m.keyTopics.some((k) => k.toLowerCase().includes(queryLower)) || reqData.categoryContext && m.category === reqData.categoryContext;
  }).slice(0, 3);
  const matchingRails = [];
  manuals.forEach((m) => {
    if (m.voltageRails) {
      m.voltageRails.forEach((r) => {
        if (queryLower.includes("rail") || queryLower.includes("volt") || queryLower.includes("power") || queryLower.includes("short") || queryLower.includes("multimeter") || queryLower.includes("pl301") || queryLower.includes(r.rail.toLowerCase().replace(/[^a-z0-9]/g, "")) || queryLower.includes("dead") || queryLower.includes("turn on") || queryLower.includes("boot")) {
          if (!matchingRails.some((mr) => mr.rail === r.rail)) {
            matchingRails.push({
              rail: r.rail,
              voltage: r.voltage,
              location: r.location,
              description: r.description
            });
          }
        }
      });
    }
  });
  const ai = getGenAI();
  if (ai) {
    const contextGuides = matchingGuides.map((g) => `- [Guide ID: ${g.id}] "${g.title}" (${g.category}, ${g.difficulty}, ${g.estimatedTime}): ${g.description}`).join("\n");
    const contextManuals = matchingManuals.map((m) => `- [Manual ID: ${m.id}] "${m.title}" (${m.code}): ${m.summary}`).join("\n");
    const contextRails = matchingRails.slice(0, 4).map((r) => `- ${r.rail}: ${r.voltage} (${r.location}) - ${r.description}`).join("\n");
    const systemPrompt = `You are JCR Guide Pro's Technical AI, the lead master computer hardware technician, electronics diagnostician, and board-level repair assistant.
You have direct access to JCR Guide Pro's full database of 624 verified multi-brand repair guides (Apple, Dell, Lenovo, HP, ASUS, Razer, Framework, MSI, Custom PCs) and 8 comprehensive technical manuals.

YOUR CAPABILITIES & PROTOCOLS:
1. Provide precise, actionable technical instructions with exact fastener torque specs (e.g. 0.20 Nm M2.0), screwdriver bit types (Torx T5, Phillips #00), and test procedures.
2. If the user asks about board-level repair, no-power faults, or charging issues, reference exact voltage rails (e.g. +19V_DCIN, +3.3V_ALW on Coil PL301, +5V_ALW, VCCST, VCORE) and multimeter testing sequences.
3. If the user has a software/BSOD issue, provide exact commands (DDU in Safe Mode, DISM, SFC, WinDbg minidump triage, MemTest86).
4. For thermal problems, detail phase-change PTM7950 application and fan fin cleaning.
5. Provide relevant guide references using markdown bolding or brackets like [Guide: "Device Model: Procedure Name"].
6. Keep your tone professional, authoritative, helpful, and concise.

MATCHING KNOWLEDGE BASE FOR THIS QUERY:
Relevant Guides in Database:
${contextGuides || "Database contains 624 multi-brand hardware guides for Apple, Dell, Lenovo, HP, ASUS, Razer, Framework, and Custom PCs."}

Relevant Technical Manuals:
${contextManuals || "Technical manuals available: Universal Laptop Teardown, VRM Power Delivery Schematics, BSOD Minidump Manual, UEFI Crisis Flash, Ultrasonic Decontamination, PTM7950 Thermal Standards, NVMe Retrofits, DDR5 Architecture."}

Key Voltage Rails:
${contextRails || "+19V_DCIN (Input), +3.3V_ALW (EC/Standby), +5.0V_ALW (Peripherals), +VCORE (CPU Core), +1.1V DDR5"}
`;
    const contents = reqData.messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));
    const reply = await callGeminiWithFallback(async (modelName) => {
      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.3
        }
      });
      return response.text;
    });
    if (reply) {
      return {
        message: reply,
        suggestedGuides: matchingGuides.map((g) => ({
          id: g.id,
          title: g.title,
          category: g.category,
          difficulty: g.difficulty,
          estimatedTime: g.estimatedTime
        })),
        suggestedManuals: matchingManuals.map((m) => ({
          id: m.id,
          title: m.title,
          code: m.code,
          category: m.category
        })),
        voltageRailsMentioned: matchingRails.slice(0, 4),
        quickActions: [
          "Check +3.3V / +5V Always-On Rails",
          "Open Matching Teardown Guide",
          "Run Minidump / BSOD Triage",
          "View Fastener Torque Table"
        ]
      };
    }
  }
  return generateDeterministicChatReply(reqData, matchingGuides, matchingManuals, matchingRails);
}
function generateDeterministicChatReply(reqData, guides, manuals, rails) {
  const query = reqData.messages[reqData.messages.length - 1]?.content.toLowerCase() || "";
  let message = "";
  if (query.includes("power") || query.includes("turn on") || query.includes("dead") || query.includes("rail") || query.includes("charge")) {
    message = `### \u26A1 Power Delivery & No-Power Diagnostic Protocol

When troubleshooting a device that will not power on, follow the standard bench sequence:

1. **DC-In & Input Stage Isolation**:
   - Check **+19V_DCIN** or **+20V_USB_PD** after the input MOSFETs. If voltage drops below 19V under load, check for a shorted DC jack or cracked ceramic filter capacitor.
2. **Always-On Standby Rails**:
   - Verify **+3.3V_ALW** (Coil PL301) and **+5.0V_ALW** (Coil PL302). The Super I/O Embedded Controller (EC) cannot register the power button if +3.3V_ALW is missing.
3. **Power Button Trigger & RTC Reset**:
   - Check that the power button signal (\`NBSWON#\`) pulls down from 3.3V to 0V when pressed.
   - Perform a 30-second CMOS/RTC hard drain to reset stuck power state machine registers.

I have matched **${guides.length > 0 ? guides.length : "several"} verified guides** and technical schematics from our 624-guide database below:`;
  } else if (query.includes("bsod") || query.includes("blue screen") || query.includes("crash") || query.includes("whea") || query.includes("freeze")) {
    message = `### \u{1F6D1} Kernel Crash & BSOD Diagnostic Protocol

For Windows stop codes and system freeze triage:

1. **Clean Driver State**: Boot into Windows Safe Mode and run **Display Driver Uninstaller (DDU)** to remove residual GPU driver hooks, then install clean WHQL drivers.
2. **System File Integrity**: Open Administrator Terminal and execute:
   \`\`\`bash
   DISM /Online /Cleanup-Image /RestoreHealth
   sfc /scannow
   \`\`\`
3. **Memory Bus Stress Test**: Launch **PassMark MemTest86** from a bootable USB and complete 4 full passes to rule out defective RAM cells.
4. **Minidump Stack Analysis**: Open \`C:\\Windows\\Minidump\` using **WinDbg Preview** and run \`!analyze -v\` to isolate the faulting \`.sys\` kernel driver module.`;
  } else if (query.includes("heat") || query.includes("temp") || query.includes("thermal") || query.includes("fan") || query.includes("loud") || query.includes("paste")) {
    message = `### \u{1F525} Thermal Throttling & Dissipation Protocol

To eliminate thermal throttling and direct-die pump-out:

1. **Phase-Change Interface**: Apply **Honeywell PTM7950 (0.25mm)** phase-change pad on bare CPU/GPU silicon dies. Unlike conventional silicone grease, it will not pump out under thermal expansion cycles.
2. **Radiator Exhaust Clearance**: Clear the felt dust wall trapped between the blower fan impeller and the copper radiator fins using 99% IPA and an ESD brush.
3. **Torque Tightening Sequence**: Tighten heatsink retention spring screws in a cross-diagonal sequence (1 \u2192 2 \u2192 3 \u2192 4) to **0.25 \u2013 0.30 Nm** max torque to prevent die cracking.`;
  } else if (query.includes("display") || query.includes("screen") || query.includes("black") || query.includes("edp") || query.includes("backlight")) {
    message = `### \u{1F5A5}\uFE0F Display & Backlight Troubleshooting Protocol

For black screen, no backlight, or flickering display issues:

1. **Flashlight Test**: Shine a bright light at an angle against the LCD screen while powered on. If icons or text are visible, the LCD panel is receiving video data but the **+19V Backlight Rail (VLED)** or backlight fuse (F1) is open.
2. **eDP Ribbon Connector Inspection**: Disconnect internal battery first. Reseat the 30-pin / 40-pin eDP connector on both motherboard and panel sides. Inspect for pulled pins.
3. **External Display Verification**: Connect to an external HDMI/DisplayPort monitor to isolate whether the fault is in the internal eDP pipeline or the GPU core.`;
  } else if (query.includes("ram") || query.includes("memory") || query.includes("beep") || query.includes("post")) {
    message = `### \u{1F9E0} RAM & Memory Subsystem Validation

For memory post codes, 3-beep codes, or random memory crashes:

1. **Single-DIMM Isolation**: Remove all RAM sticks. Clean the gold edge connectors with 99% Isopropyl Alcohol. Test each stick individually in Slot A.
2. **SPD / Voltage Verification**: Verify **+1.2V (DDR4)** or **+1.1V (DDR5)** rail across the RAM buck regulator coils.
3. **4-Pass Stress Testing**: Boot into **MemTest86+** or **Linpack Xtreme** to stress test the memory controller and trace buses for memory bit flips.`;
  } else {
    message = `### \u{1F6E0}\uFE0F Hardware Diagnostic Analysis

I have indexed your query across our **624 multi-brand repair guides** and **8 technical engineering manuals**.

Key technician bench steps:
1. **Power Isolation**: Disconnect AC charger and internal battery header before touching motherboard components.
2. **Electrical Measurements**: Probe standby test points (**+19V_DCIN**, **+3.3V_ALW**, **+5.0V_ALW**) to isolate power sequencer states.
3. **Fastener Torque Standards**: Maintain **0.25\u20130.30 Nm** on heatsink mounts and **0.18\u20130.20 Nm** on M.2 SSD screws.

Explore matching repair procedures and manuals directly below:`;
  }
  return {
    message,
    suggestedGuides: guides.map((g) => ({
      id: g.id,
      title: g.title,
      category: g.category,
      difficulty: g.difficulty,
      estimatedTime: g.estimatedTime
    })),
    suggestedManuals: manuals.map((m) => ({
      id: m.id,
      title: m.title,
      code: m.code,
      category: m.category
    })),
    voltageRailsMentioned: rails.slice(0, 4),
    quickActions: [
      "Check Standby Power Rails",
      "Run Diagnostic Flowchart",
      "Open Software Download Hub",
      "View Torque & Fastener Table"
    ]
  };
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/health", (_req, res) => {
    res.json({
      status: "online",
      version: "2026.4.2",
      guidesCount: 624,
      manualsCount: TECHNICAL_MANUALS.length,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  });
  app2.get("/api/version", (_req, res) => {
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
  app2.get("/api/technical-manuals", (req, res) => {
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
  app2.get("/api/technical-manuals/:id", (req, res) => {
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
  app2.post("/api/ai/chat", async (req, res) => {
    try {
      const { messages, deviceContext, categoryContext } = req.body;
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ message: "Valid messages array is required." });
      }
      const chatPayload = {
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
  app2.post("/api/ai/troubleshoot", async (req, res) => {
    try {
      const { symptoms, deviceType, brand, model, os, category, errorCode } = req.body;
      if (!symptoms || typeof symptoms !== "string" || symptoms.trim().length === 0) {
        return res.status(400).json({ message: "Symptoms or issue description is required." });
      }
      const diagnosticPayload = {
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
  app2.get("/api/auth/user", isAuthenticated, (req, res) => {
    res.json(req.user);
  });
  app2.patch("/api/user/profile", isAuthenticated, async (req, res) => {
    try {
      const updatedUser = await storage.updateUser(req.user.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to update profile" });
    }
  });
  app2.post("/api/user/profile/photo", isAuthenticated, upload.single("photo"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const photoUrl = `/uploads/profiles/${req.file.filename}`;
      const updatedUser = await storage.updateUser(req.user.id, { profileImageUrl: photoUrl });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to upload photo" });
    }
  });
  app2.get("/api/favorites", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const favorites2 = await storage.getUserFavorites(userId);
      res.json(favorites2);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });
  app2.post("/api/favorites", isAuthenticated, async (req, res) => {
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
  app2.delete("/api/favorites/:itemId/:itemType", isAuthenticated, async (req, res) => {
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
  app2.get("/api/favorites/check/:itemId/:itemType", isAuthenticated, async (req, res) => {
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
  app2.get("/api/repair-guides", async (req, res) => {
    try {
      res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
      const { deviceType, category, difficulty } = req.query;
      const guides = await storage.getRepairGuides({
        deviceType,
        category,
        difficulty
      });
      res.json(guides);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch repair guides" });
    }
  });
  app2.get("/api/repair-guides/search", async (req, res) => {
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
  app2.get("/api/repair-guides/:id", async (req, res) => {
    try {
      const guide = await storage.getRepairGuide(req.params.id);
      if (!guide) {
        return res.status(404).json({ message: "Repair guide not found" });
      }
      await storage.updateViewCount(req.params.id);
      res.json(guide);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch repair guide" });
    }
  });
  app2.post("/api/repair-guides", async (req, res) => {
    try {
      const validatedData = insertRepairGuideSchema.parse(req.body);
      const guide = await storage.createRepairGuide(validatedData);
      res.status(201).json(guide);
    } catch (error) {
      res.status(400).json({ message: "Invalid repair guide data" });
    }
  });
  app2.post("/api/user-guides", async (req, res) => {
    try {
      const validatedData = insertRepairGuideSchema.parse(req.body);
      const guide = await storage.createUserGuide(validatedData);
      res.status(201).json(guide);
    } catch (error) {
      console.error("Error creating user guide:", error);
      res.status(400).json({ message: "Invalid user guide data" });
    }
  });
  app2.post("/api/repair-guides/:id/download", async (req, res) => {
    try {
      const guide = await storage.getRepairGuide(req.params.id);
      if (!guide) {
        return res.status(404).json({ message: "Repair guide not found" });
      }
      await storage.updateDownloadCount(req.params.id);
      res.json({ success: true, message: "Download tracked" });
    } catch (error) {
      res.status(500).json({ message: "Failed to track download" });
    }
  });
  app2.get("/api/version", async (req, res) => {
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
  app2.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      res.json({ message: "Admin access confirmed", adminEmail: req.adminUser?.email });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch admin data" });
    }
  });
  app2.get("/api/admin/stats", requireAdmin, async (req, res) => {
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
  app2.post("/api/download/bulk", async (req, res) => {
    try {
      const { type, filters } = req.body;
      let data = [];
      switch (type) {
        case "repair-guides":
          data = await storage.getRepairGuides(filters || {});
          break;
        case "troubleshooting-flows":
          data = await storage.getTroubleshootingFlows();
          break;
        case "device-components":
          data = await storage.getDeviceComponents();
          break;
        case "complete":
          const [guides, flows, components] = await Promise.all([
            storage.getRepairGuides({}),
            storage.getTroubleshootingFlows(),
            storage.getDeviceComponents()
          ]);
          const exportData = {
            exportInfo: {
              title: "JCR Guide Pro Complete Export",
              version: "1.0",
              exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
              totalItems: guides.length + flows.length + components.length
            },
            repairGuides: guides,
            troubleshootingFlows: flows,
            deviceComponents: components
          };
          data = exportData;
          break;
        default:
          return res.status(400).json({ message: "Invalid download type" });
      }
      res.json({
        success: true,
        data,
        count: Array.isArray(data) ? data.length : Object.keys(data).length - 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Bulk download error:", error);
      res.status(500).json({ message: "Failed to prepare bulk download" });
    }
  });
  app2.patch("/api/repair-guides/:id/bookmark", async (req, res) => {
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
  app2.get("/api/troubleshooting-flows", async (req, res) => {
    try {
      const flows = await storage.getTroubleshootingFlows();
      res.json(flows);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch troubleshooting flows" });
    }
  });
  app2.get("/api/troubleshooting-flows/:id", async (req, res) => {
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
  app2.post("/api/troubleshooting-flows", async (req, res) => {
    try {
      const validatedData = insertTroubleshootingFlowSchema.parse(req.body);
      const flow = await storage.createTroubleshootingFlow(validatedData);
      res.status(201).json(flow);
    } catch (error) {
      res.status(400).json({ message: "Invalid troubleshooting flow data" });
    }
  });
  app2.get("/api/device-components", async (req, res) => {
    try {
      const { deviceType } = req.query;
      const components = await storage.getDeviceComponents(deviceType);
      res.json(components);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch device components" });
    }
  });
  app2.get("/api/device-components/:id", async (req, res) => {
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
  app2.post("/api/device-components", async (req, res) => {
    try {
      const validatedData = insertDeviceComponentSchema.parse(req.body);
      const component = await storage.createDeviceComponent(validatedData);
      res.status(201).json(component);
    } catch (error) {
      res.status(400).json({ message: "Invalid device component data" });
    }
  });
  app2.get("/api/device-brands", async (req, res) => {
    try {
      const { deviceType } = req.query;
      const brands = await storage.getDeviceBrands(deviceType);
      res.json(brands);
    } catch (error) {
      console.error("Error fetching device brands:", error);
      res.status(500).json({ message: "Failed to fetch device brands" });
    }
  });
  app2.get("/api/device-models", async (req, res) => {
    try {
      const { brandId, deviceType, search } = req.query;
      if (search) {
        const models = await storage.searchDeviceModels(search, deviceType);
        res.json(models);
      } else {
        const models = await storage.getDeviceModels(brandId, deviceType);
        res.json(models);
      }
    } catch (error) {
      console.error("Error fetching device models:", error);
      res.status(500).json({ message: "Failed to fetch device models" });
    }
  });
  app2.get("/api/device-models/:id", async (req, res) => {
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
  app2.get("/api/brands/:brandId/models", async (req, res) => {
    try {
      const { brandId } = req.params;
      const models = await storage.getModelsByBrand(brandId);
      res.json(models);
    } catch (error) {
      console.error("Error fetching models by brand:", error);
      res.status(500).json({ message: "Failed to fetch models by brand" });
    }
  });
  app2.get("/api/models/:modelId/guides", async (req, res) => {
    try {
      const { modelId } = req.params;
      const guides = await storage.getCompatibleGuides(modelId);
      res.json(guides);
    } catch (error) {
      console.error("Error fetching compatible guides:", error);
      res.status(500).json({ message: "Failed to fetch compatible guides" });
    }
  });
  app2.get("/api/guides/:guideId/models", async (req, res) => {
    try {
      const { guideId } = req.params;
      const models = await storage.getModelCompatibility(guideId);
      res.json(models);
    } catch (error) {
      console.error("Error fetching model compatibility:", error);
      res.status(500).json({ message: "Failed to fetch model compatibility" });
    }
  });
  app2.get("/.well-known/assetlinks.json", (req, res) => {
    res.json([{
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "com.jcrguidepro.app",
        sha256_cert_fingerprints: ["73:8B:D2:DB:FC:57:4D:5B:F1:A5:28:C5:01:B6:17:C7:7F:80:74:EE:B5:FD:0C:DB:12:CE:03:C8:35:D3:08:BE"]
      }
    }]);
  });
  app2.get(["/api/export-android-zip", "/api/export-zip", "/api/download/android-studio-zip"], (_req, res) => {
    try {
      const filename = "JCR-Guide-Pro-Android-Studio.zip";
      const prebuiltPath = import_path2.default.join(process.cwd(), "public", "JCR-Guide-Pro-Android-Studio.zip");
      if (import_fs2.default.existsSync(prebuiltPath)) {
        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        return res.sendFile(prebuiltPath);
      }
      const zip = new import_adm_zip.default();
      const rootDir = process.cwd();
      const foldersToInclude = ["android", "src", "shared", "server"];
      foldersToInclude.forEach((folder) => {
        const folderPath = import_path2.default.join(rootDir, folder);
        if (import_fs2.default.existsSync(folderPath)) {
          zip.addLocalFolder(folderPath, folder);
        }
      });
      const pubDir = import_path2.default.join(rootDir, "public");
      if (import_fs2.default.existsSync(pubDir)) {
        import_fs2.default.readdirSync(pubDir).forEach((f) => {
          if (!f.endsWith(".zip")) {
            const full = import_path2.default.join(pubDir, f);
            if (import_fs2.default.statSync(full).isDirectory()) {
              zip.addLocalFolder(full, `public/${f}`);
            } else {
              zip.addLocalFile(full, "public");
            }
          }
        });
      }
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
        const filePath = import_path2.default.join(rootDir, file);
        if (import_fs2.default.existsSync(filePath)) {
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
  const httpServer = (0, import_http.createServer)(app2);
  return httpServer;
}

// server/vite.ts
var import_express = __toESM(require("express"), 1);
var import_fs3 = __toESM(require("fs"), 1);
var import_path4 = __toESM(require("path"), 1);
var import_vite3 = require("vite");

// vite.config.ts
var import_vite = __toESM(require("@tailwindcss/vite"), 1);
var import_plugin_react = __toESM(require("@vitejs/plugin-react"), 1);
var import_path3 = __toESM(require("path"), 1);
var import_vite2 = require("vite");
var vite_config_default = (0, import_vite2.defineConfig)(() => {
  return {
    plugins: [(0, import_plugin_react.default)(), (0, import_vite.default)()],
    resolve: {
      alias: {
        "@": import_path3.default.resolve(__dirname, "src"),
        "@shared": import_path3.default.resolve(__dirname, "shared")
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== "true",
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === "true" ? null : {}
    }
  };
});

// server/vite.ts
var import_nanoid = require("nanoid");
var import_meta = {};
var viteLogger = (0, import_vite3.createLogger)();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await (0, import_vite3.createServer)({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = import_path4.default.resolve(
        import_meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await import_fs3.default.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${(0, import_nanoid.nanoid)()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = import_path4.default.resolve(import_meta.dirname, "public");
  if (!import_fs3.default.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(import_express.default.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(import_path4.default.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = (0, import_express2.default)();
app.use(import_express2.default.json());
app.use(import_express2.default.urlencoded({ extended: false }));
app.use("/uploads", import_express2.default.static("uploads"));
setupAuth(app);
app.use((req, res, next) => {
  const start = Date.now();
  const path5 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path5.startsWith("/api")) {
      let logLine = `${req.method} ${path5} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  setImmediate(async () => {
    try {
      await seedDatabase();
      await seedGuides();
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  });
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    // Important for deployment - allows external connections
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
//# sourceMappingURL=server.cjs.map
