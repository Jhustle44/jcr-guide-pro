import { GoogleGenAI, Type } from "@google/genai";
import { TECHNICAL_MANUALS } from "../shared/technical-manuals";
import { storage } from "./storage";

let genAIClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// Resilient helper to execute Gemini API calls with graceful multi-model fallback and seamless offline fallback
async function callGeminiWithFallback<T>(
  fn: (model: string) => Promise<T>
): Promise<T | null> {
  // Try lightweight fast flash-lite first (low latency, high availability under load), then standard flash
  const models = ["gemini-3.1-flash-lite", "gemini-3.7-flash", "gemini-flash-latest"];

  for (const model of models) {
    try {
      const res = await fn(model);
      if (res) return res;
    } catch (err: any) {
      // Quietly fall through on 503/429/high demand or network blips
      continue;
    }
  }

  return null;
}

export interface DiagnosticsRequest {
  symptoms: string;
  deviceType?: "laptop" | "desktop" | "all" | string;
  brand?: string;
  model?: string;
  os?: string;
  category?: "hardware" | "software" | "cleaning" | "upgrades" | "all" | string;
  errorCode?: string;
}

export interface DiagnosticResult {
  summary: string;
  confidence: "High" | "Medium" | "Low";
  recommendedCategory: "hardware" | "software" | "cleaning" | "upgrades";
  probableCauses: {
    cause: string;
    likelihood: "High" | "Medium" | "Low";
    explanation: string;
  }[];
  stepByStepPlan: {
    stepNumber: number;
    title: string;
    action: string;
    expectedOutcome: string;
  }[];
  toolsAndSoftware: string[];
  safetyWarnings: string[];
  preventativeTips: string[];
  isOutOfScope?: boolean;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface TechnicalChatRequest {
  messages: ChatMessage[];
  deviceContext?: string;
  categoryContext?: string;
}

export interface TechnicalChatResponse {
  message: string;
  suggestedGuides?: {
    id: string;
    title: string;
    category: string;
    difficulty: string;
    estimatedTime: string;
  }[];
  suggestedManuals?: {
    id: string;
    title: string;
    code: string;
    category: string;
  }[];
  voltageRailsMentioned?: {
    rail: string;
    voltage: string;
    location: string;
    description: string;
  }[];
  quickActions?: string[];
}

const SYSTEM_INSTRUCTION = `You are JCR Guide Pro's expert Hardware & Computer Diagnostic Specialist.
Your SOLE purpose is to diagnose, troubleshoot, and provide step-by-step resolution paths for computer hardware, laptops, desktops, operating systems (Windows, macOS, Linux), peripherals, thermals, BIOS/UEFI, and electronic repairs.

STRICT SCOPE DIRECTIVE:
You ONLY assist with device diagnostics, computer repair, hardware upgrades, OS recovery, driver/firmware fixes, component testing, and cleaning.
If a user prompt is unrelated to computer/laptop repair or hardware maintenance (such as general conversational queries, creative writing, cooking, gaming lore, non-PC topics), set "isOutOfScope": true, give a polite 1-sentence refusal in "summary", and leave the other lists empty.

For valid computer repair queries, provide a highly technical, precise, and practical diagnostic analysis adhering to industry standard bench repair practices.`;

export async function runAIDiagnostics(reqData: DiagnosticsRequest): Promise<DiagnosticResult> {
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
          type: Type.OBJECT,
          properties: {
            isOutOfScope: { type: Type.BOOLEAN, description: "True if the question is not about computer or electronics repair" },
            summary: { type: Type.STRING, description: "High-level summary of the diagnostic finding" },
            confidence: { type: Type.STRING, enum: ["High", "Medium", "Low"], description: "Diagnostic confidence" },
            recommendedCategory: { type: Type.STRING, enum: ["hardware", "software", "cleaning", "upgrades"], description: "Primary repair category" },
            probableCauses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  cause: { type: Type.STRING },
                  likelihood: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                  explanation: { type: Type.STRING }
                },
                required: ["cause", "likelihood", "explanation"]
              }
            },
            stepByStepPlan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stepNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  action: { type: Type.STRING },
                  expectedOutcome: { type: Type.STRING }
                },
                required: ["stepNumber", "title", "action", "expectedOutcome"]
              }
            },
            toolsAndSoftware: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Diagnostic tools or software like HWiNFO64, MemTest86, DDU, Multimeter, ESD strap"
            },
            safetyWarnings: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Safety guidelines regarding power isolation, battery handling, and ESD"
            },
            preventativeTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
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
    return parsed as DiagnosticResult;
  });

  if (result) {
    return result;
  }

  return generateFallbackDiagnostics(reqData);
}

function generateFallbackDiagnostics(reqData: DiagnosticsRequest): DiagnosticResult {
  const sym = (reqData.symptoms || "").toLowerCase();
  const err = (reqData.errorCode || "").toLowerCase();

  let category: "hardware" | "software" | "cleaning" | "upgrades" = "hardware";
  let summary = `Diagnostic assessment for ${reqData.brand || "Device"} ${reqData.model || ""}`;
  let confidence: "High" | "Medium" | "Low" = "High";

  const probableCauses: DiagnosticResult["probableCauses"] = [];
  const stepByStepPlan: DiagnosticResult["stepByStepPlan"] = [];
  const toolsAndSoftware: string[] = [];
  const safetyWarnings: string[] = [
    "Always disconnect AC adapter and main battery before touching internal motherboard components.",
    "Wear an ESD anti-static wrist strap or ground yourself against bare unpainted metal.",
    "Never compress or puncture swollen lithium-ion battery pouches."
  ];
  const preventativeTips: string[] = [
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
      { stepNumber: 3, title: "Apply Honeywell PTM7950 & Re-torque", action: "Cut and apply 0.25mm PTM7950 phase change pad. Torque heatsink screws diagonally (1→2→3→4) to 0.25 Nm.", expectedOutcome: "Optimal core-to-heatsink heat transfer under sustained load." }
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

/**
 * Conversational Technical AI with direct grounding in all 624 guides and 8 manuals
 */
export async function runTechnicalAIChat(reqData: TechnicalChatRequest): Promise<TechnicalChatResponse> {
  const allGuides = await storage.getRepairGuides();
  const manuals = TECHNICAL_MANUALS;
  
  // Extract latest user message
  const userMessages = reqData.messages.filter(m => m.role === "user");
  const latestUserMsg = userMessages.length > 0 ? userMessages[userMessages.length - 1].content : "";
  const queryLower = latestUserMsg.toLowerCase();
  
  // Match relevant guides from the 624 database
  const matchingGuides = allGuides.filter(g => {
    const titleMatch = g.title.toLowerCase().includes(queryLower);
    const descMatch = g.description.toLowerCase().includes(queryLower);
    const words = queryLower.split(/\s+/).filter(w => w.length > 2);
    const multiMatch = words.length > 0 && words.some(w => g.title.toLowerCase().includes(w));
    return titleMatch || descMatch || multiMatch;
  }).slice(0, 5);

  // Match relevant manuals
  const matchingManuals = manuals.filter(m => {
    return m.title.toLowerCase().includes(queryLower) ||
           m.summary.toLowerCase().includes(queryLower) ||
           m.keyTopics.some(k => k.toLowerCase().includes(queryLower)) ||
           (reqData.categoryContext && m.category === reqData.categoryContext);
  }).slice(0, 3);

  // Voltage rails matching
  const matchingRails: { rail: string; voltage: string; location: string; description: string }[] = [];
  manuals.forEach(m => {
    if (m.voltageRails) {
      m.voltageRails.forEach(r => {
        if (queryLower.includes("rail") || queryLower.includes("volt") || queryLower.includes("power") || 
            queryLower.includes("short") || queryLower.includes("multimeter") || queryLower.includes("pl301") ||
            queryLower.includes(r.rail.toLowerCase().replace(/[^a-z0-9]/g, '')) ||
            queryLower.includes("dead") || queryLower.includes("turn on") || queryLower.includes("boot")) {
          if (!matchingRails.some(mr => mr.rail === r.rail)) {
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
    // Build grounding knowledge summary
    const contextGuides = matchingGuides.map(g => `- [Guide ID: ${g.id}] "${g.title}" (${g.category}, ${g.difficulty}, ${g.estimatedTime}): ${g.description}`).join("\n");
    const contextManuals = matchingManuals.map(m => `- [Manual ID: ${m.id}] "${m.title}" (${m.code}): ${m.summary}`).join("\n");
    const contextRails = matchingRails.slice(0, 4).map(r => `- ${r.rail}: ${r.voltage} (${r.location}) - ${r.description}`).join("\n");

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

    const contents = reqData.messages.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const reply = await callGeminiWithFallback(async (modelName) => {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.3,
        }
      });
      return response.text;
    });

    if (reply) {
      return {
        message: reply,
        suggestedGuides: matchingGuides.map(g => ({
          id: g.id,
          title: g.title,
          category: g.category,
          difficulty: g.difficulty,
          estimatedTime: g.estimatedTime,
        })),
        suggestedManuals: matchingManuals.map(m => ({
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

  // Deterministic local response based on knowledge base
  return generateDeterministicChatReply(reqData, matchingGuides, matchingManuals, matchingRails);
}

function generateDeterministicChatReply(
  reqData: TechnicalChatRequest,
  guides: any[],
  manuals: any[],
  rails: any[]
): TechnicalChatResponse {
  const query = reqData.messages[reqData.messages.length - 1]?.content.toLowerCase() || "";
  let message = "";

  if (query.includes("power") || query.includes("turn on") || query.includes("dead") || query.includes("rail") || query.includes("charge")) {
    message = `### ⚡ Power Delivery & No-Power Diagnostic Protocol

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
    message = `### 🛑 Kernel Crash & BSOD Diagnostic Protocol

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
    message = `### 🔥 Thermal Throttling & Dissipation Protocol

To eliminate thermal throttling and direct-die pump-out:

1. **Phase-Change Interface**: Apply **Honeywell PTM7950 (0.25mm)** phase-change pad on bare CPU/GPU silicon dies. Unlike conventional silicone grease, it will not pump out under thermal expansion cycles.
2. **Radiator Exhaust Clearance**: Clear the felt dust wall trapped between the blower fan impeller and the copper radiator fins using 99% IPA and an ESD brush.
3. **Torque Tightening Sequence**: Tighten heatsink retention spring screws in a cross-diagonal sequence (1 → 2 → 3 → 4) to **0.25 – 0.30 Nm** max torque to prevent die cracking.`;
  } else if (query.includes("display") || query.includes("screen") || query.includes("black") || query.includes("edp") || query.includes("backlight")) {
    message = `### 🖥️ Display & Backlight Troubleshooting Protocol

For black screen, no backlight, or flickering display issues:

1. **Flashlight Test**: Shine a bright light at an angle against the LCD screen while powered on. If icons or text are visible, the LCD panel is receiving video data but the **+19V Backlight Rail (VLED)** or backlight fuse (F1) is open.
2. **eDP Ribbon Connector Inspection**: Disconnect internal battery first. Reseat the 30-pin / 40-pin eDP connector on both motherboard and panel sides. Inspect for pulled pins.
3. **External Display Verification**: Connect to an external HDMI/DisplayPort monitor to isolate whether the fault is in the internal eDP pipeline or the GPU core.`;
  } else if (query.includes("ram") || query.includes("memory") || query.includes("beep") || query.includes("post")) {
    message = `### 🧠 RAM & Memory Subsystem Validation

For memory post codes, 3-beep codes, or random memory crashes:

1. **Single-DIMM Isolation**: Remove all RAM sticks. Clean the gold edge connectors with 99% Isopropyl Alcohol. Test each stick individually in Slot A.
2. **SPD / Voltage Verification**: Verify **+1.2V (DDR4)** or **+1.1V (DDR5)** rail across the RAM buck regulator coils.
3. **4-Pass Stress Testing**: Boot into **MemTest86+** or **Linpack Xtreme** to stress test the memory controller and trace buses for memory bit flips.`;
  } else {
    message = `### 🛠️ Hardware Diagnostic Analysis

I have indexed your query across our **624 multi-brand repair guides** and **8 technical engineering manuals**.

Key technician bench steps:
1. **Power Isolation**: Disconnect AC charger and internal battery header before touching motherboard components.
2. **Electrical Measurements**: Probe standby test points (**+19V_DCIN**, **+3.3V_ALW**, **+5.0V_ALW**) to isolate power sequencer states.
3. **Fastener Torque Standards**: Maintain **0.25–0.30 Nm** on heatsink mounts and **0.18–0.20 Nm** on M.2 SSD screws.

Explore matching repair procedures and manuals directly below:`;
  }

  return {
    message,
    suggestedGuides: guides.map(g => ({
      id: g.id,
      title: g.title,
      category: g.category,
      difficulty: g.difficulty,
      estimatedTime: g.estimatedTime,
    })),
    suggestedManuals: manuals.map(m => ({
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
