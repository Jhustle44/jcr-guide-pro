export interface ManualChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  paragraphs: string[];
  steps?: {
    stepLabel: string;
    action: string;
    details: string;
    caution?: string;
    verification?: string;
  }[];
}

export interface VoltageRailSpec {
  rail: string;
  voltage: string;
  tolerance: string;
  location: string;
  normalImpedance: string;
  description: string;
}

export interface FastenerTorqueSpec {
  location: string;
  screwType: string;
  size: string;
  torque: string;
  threadLock: string;
}

export interface TechnicalManual {
  id: string;
  category: "hardware" | "software" | "cleaning" | "upgrades";
  title: string;
  code: string;
  fileSize: string;
  pages: number;
  author: string;
  lastUpdated: string;
  summary: string;
  keyTopics: string[];
  safetyDirectives: string[];
  recommendedTools: string[];
  chapters?: ManualChapter[];
  voltageRails?: VoltageRailSpec[];
  fastenerTorqueTable?: FastenerTorqueSpec[];
}

export const TECHNICAL_MANUALS: TechnicalManual[] = [
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
      { rail: "+19V_DCIN / +20V_USB_PD", voltage: "19.5V - 20.0V", tolerance: "±5%", location: "DC-In Jack / Dual Input MOSFETs", normalImpedance: "> 100 kΩ", description: "Primary unregulated DC supply directly after power brick/USB-C negotiation." },
      { rail: "+3.3V_ALW (Always-On)", voltage: "3.32V", tolerance: "±2%", location: "Coil PL301 near TPS51285", normalImpedance: "> 15 kΩ", description: "Powers Super I/O EC controller, power button circuit, and BIOS flash chip." },
      { rail: "+5.0V_ALW (Always-On)", voltage: "5.05V", tolerance: "±2%", location: "Coil PL302", normalImpedance: "> 20 kΩ", description: "Powers USB 5V VBUS switches and audio codec standby circuits." },
      { rail: "+1.8V_PRIM / +1.8V_AUX", voltage: "1.80V", tolerance: "±3%", location: "Coil PL501 near PCH", normalImpedance: "> 800 Ω", description: "Low-voltage system I/O, SPI BIOS ROM buffer, and PCH clock rails." }
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
      { rail: "+19V_DCIN / +20V_USB_PD", voltage: "19.5V - 20.0V", tolerance: "±5%", location: "DC-In Jack / Dual Input MOSFETs", normalImpedance: "> 100 kΩ", description: "Primary unregulated DC supply directly after power brick/USB-C negotiation." },
      { rail: "+3.3V_ALW (Always-On)", voltage: "3.32V", tolerance: "±2%", location: "Coil PL301 near TPS51285", normalImpedance: "> 15 kΩ", description: "Powers Super I/O EC controller, power button circuit, and BIOS flash chip." },
      { rail: "+5.0V_ALW (Always-On)", voltage: "5.05V", tolerance: "±2%", location: "Coil PL302", normalImpedance: "> 20 kΩ", description: "Powers USB 5V VBUS switches and audio codec standby circuits." },
      { rail: "+1.05V_VCCST / VCCSA", voltage: "1.05V", tolerance: "±2%", location: "Coil PL701 near CPU Socket", normalImpedance: "15 - 45 Ω", description: "System Agent and sustained CPU boot sequence rail." },
      { rail: "+VCORE (CPU Core)", voltage: "0.75V - 1.35V Dynamic", tolerance: "±1.5%", location: "Multi-phase inductors surrounding CPU", normalImpedance: "1.2 - 8.5 Ω (Low normal)", description: "Dynamic VCORE supplied by PWM controller via high-speed DrMOS power stages." },
      { rail: "+V_GFX (Integrated GPU)", voltage: "0.80V - 1.15V Dynamic", tolerance: "±2%", location: "PL901 / PL902", normalImpedance: "3.0 - 12.0 Ω", description: "Supplies integrated display rendering core." },
      { rail: "+1.2V / +1.1V DDR (RAM)", voltage: "1.10V (DDR5) / 1.20V (DDR4)", tolerance: "±2%", location: "Coil PL401 near SO-DIMM", normalImpedance: "80 - 250 Ω", description: "Main memory module supply rail." }
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
      "Baking board in convection oven at 65°C for 4 hours post-wash",
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
          "Submerge stripped motherboard in ultrasonic bath containing 90% distilled water + 10% Branson EC cleaner at 50°C for 8 minutes. Rinse with pure distilled water, then flush with 99.9% IPA to absorb moisture, and bake at 65°C for 4 hours."
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
          "Honeywell PTM7950 is solid below 45°C and transitions into a viscous gel at operating temperatures, filling micro-voids without pumping out over thermal cycles.",
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

export function getManualById(id: string): TechnicalManual | undefined {
  return TECHNICAL_MANUALS.find(m => m.id === id);
}

export function getManualsByCategory(category: string): TechnicalManual[] {
  return TECHNICAL_MANUALS.filter(m => m.category === category);
}
