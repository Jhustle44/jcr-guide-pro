import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Cpu, 
  Code, 
  Eraser, 
  MoveUp, 
  LayoutGrid, 
  Wrench, 
  FileText, 
  Download, 
  ChevronRight, 
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Sparkles, 
  SlidersHorizontal,
  X,
  ArrowRight,
  Shield,
  Monitor,
  HardDrive,
  Flame,
  Zap,
  RotateCcw,
  CheckCircle2,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GuideCard from "@/components/repair/guide-card";
import ManualDetailModal, { type TechnicalManual } from "@/components/repair/manual-detail-modal";
import TechnicianDownloadHub, { ALL_DOWNLOADS } from "@/components/repair/technician-download-hub";
import type { RepairGuide } from "@shared/schema";
import { cn } from "@/lib/utils";

export interface CategoryMeta {
  id: "hardware" | "software" | "cleaning" | "upgrades";
  name: string;
  shortName: string;
  badgeTitle: string;
  description: string;
  longDescription: string;
  icon: any;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  accentBg: string;
  manuals: TechnicalManual[];
}

export interface SubTopic {
  id: string;
  name: string;
  keywords: string[];
}

export const CATEGORY_SUBTOPICS: Record<string, SubTopic[]> = {
  hardware: [
    { id: "all", name: "All Hardware", keywords: [] },
    { id: "screens", name: "Screens & Hinges", keywords: ["screen", "hinge", "oled", "ips", "display", "bezel", "panel"] },
    { id: "motherboard", name: "Logic Boards & VRM", keywords: ["motherboard", "logic board", "vrm", "power delivery", "mosfet", "rail", "schematic"] },
    { id: "battery", name: "Battery & Power", keywords: ["battery", "capacity cell", "charging", "discharge", "power harness", "cell"] },
    { id: "ports", name: "DC-In & USB-C Ports", keywords: ["dc-in", "usb-c", "receptacle", "soldering", "charging port", "type-c", "port"] },
    { id: "keyboard", name: "Keyboards & Chassis", keywords: ["keyboard", "palmrest", "top-case", "trackpad", "chassis", "housing"] },
  ],
  software: [
    { id: "all", name: "All Software", keywords: [] },
    { id: "windows", name: "Windows 11 & OS Recovery", keywords: ["windows", "installation", "driver", "injection", "os recovery", "clean install"] },
    { id: "bios", name: "UEFI / BIOS Crisis Flash", keywords: ["uefi", "bios", "crisis", "blind usb", "flashing", "firmware", "microcode"] },
    { id: "bsod", name: "BSOD & Kernel Dumps", keywords: ["bsod", "blue screen", "minidump", "crash", "windbg", "kernel", "whea"] },
    { id: "linux", name: "Linux & EFI Bootloaders", keywords: ["linux", "dual-boot", "bootloader", "grub", "efi", "bcd"] },
  ],
  cleaning: [
    { id: "all", name: "All Cleaning", keywords: [] },
    { id: "thermal", name: "Thermal Paste & PTM7950", keywords: ["thermal", "repaste", "ptm7950", "phase-change", "liquid metal", "compound", "mx-6"] },
    { id: "ultrasonic", name: "Ultrasonic Bath & Liquid Damage", keywords: ["ultrasonic", "liquid damage", "de-oxidation", "corrosion", "ipa", "submersion"] },
    { id: "fans", name: "Fans & Heatsink De-dusting", keywords: ["fan", "bearing", "heatsink", "dust", "de-dusting", "vapor chamber", "airflow"] },
  ],
  upgrades: [
    { id: "all", name: "All Upgrades", keywords: [] },
    { id: "nvme", name: "Gen4/Gen5 NVMe M.2 SSDs", keywords: ["nvme", "ssd", "m.2", "gen4", "gen5", "cloning", "storage", "partition"] },
    { id: "ram", name: "DDR5 SODIMM RAM", keywords: ["ddr5", "ram", "sodimm", "dual-channel", "memory", "timing", "cudimm"] },
    { id: "egpu", name: "eGPU & OCuLink Graphics", keywords: ["egpu", "thunderbolt", "oculink", "gpu", "graphics", "bandwidth"] },
    { id: "cooling", name: "Liquid Cooling Loops", keywords: ["liquid cooling", "custom loop", "aio", "pump", "radiator", "overhaul"] },
  ],
};

export const CATEGORY_DEFINITIONS: CategoryMeta[] = [
  {
    id: "hardware",
    name: "Hardware Repairs & Teardowns",
    shortName: "Hardware",
    badgeTitle: "Component Level",
    description: "Motherboards, OLED/IPS displays, hinges, batteries, ports, and logic boards.",
    longDescription: "Physical component replacements, soldering bench standards, micro-connector latching, and structural hinge rebuilds.",
    icon: Cpu,
    color: "text-indigo-500",
    textColor: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/30",
    accentBg: "from-indigo-500/10 via-indigo-500/5 to-transparent",
    manuals: [
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
        recommendedTools: ["Torx T4/T5/T6", "Phillips #00", "Plastic Spudger Kit", "Torque Screwdriver (0.2-0.5 Nm)"]
      },
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
        recommendedTools: ["Digital Multimeter (True RMS)", "DC Bench Power Supply", "Thermal Camera", "Hot Air Rework Station"]
      }
    ]
  },
  {
    id: "software",
    name: "Software, OS & Firmware Recovery",
    shortName: "Software",
    badgeTitle: "System & Kernel",
    description: "BSOD stop-codes, UEFI/BIOS flashing, driver cleanups, and bootloaders.",
    longDescription: "Kernel minidump analysis, blind USB UEFI/BIOS crisis recovery, clean installation architectures, and hardware driver conflicts.",
    icon: Code,
    color: "text-emerald-500",
    textColor: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    accentBg: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    manuals: [
      {
        id: "man-sw-01",
        category: "software",
        title: "Windows Kernel Crash (BSOD) & Minidump Diagnostic Manual",
        code: "DOC-SW-BSOD-DUMP",
        fileSize: "2.2 MB PDF",
        pages: 36,
        author: "JCR System Architecture",
        lastUpdated: "2026 Technical Release",
        summary: "WinDbg stack trace interpretation, WHEA_UNCORRECTABLE_ERROR triage, kernel-mode driver symbol resolution, and page fault diagnosis.",
        keyTopics: [
          "WinDbg preview command line cheat-sheet (!analyze -v)",
          "Distinguishing hardware bit flips vs corrupted kernel drivers",
          "Resolving ntoskrnl.exe and watchdog.sys timeout errors",
          "SFC and DISM offline image repair commands"
        ],
        safetyDirectives: [
          "Back up EFI boot partitions before modifying boot configuration BCD",
          "Always test stable memory in Safe Mode before registry alterations"
        ],
        recommendedTools: ["WinDbg Preview", "PassMark MemTest86", "Display Driver Uninstaller", "Rufus Bootable USB"]
      },
      {
        id: "man-sw-02",
        category: "software",
        title: "UEFI / BIOS Crisis Flash & SPI Programmer Recovery Protocol",
        code: "DOC-SW-BIOS-CRISIS",
        fileSize: "3.1 MB PDF",
        pages: 30,
        author: "JCR Firmware Lab",
        lastUpdated: "2026 Revision 3.1",
        summary: "Corrupted SPI flash rom recovery, blind USB BIOS flashback key combinations, and CH341A 3.3V/1.8V chip clip flashing.",
        keyTopics: [
          "OEM blind crisis key combinations (Fn+R, Win+B, Fn+Esc)",
          "CH341A clamp hookup to 8-pin SOIC SPI chips without desoldering",
          "Injecting clean Intel ME/CSME regions into corrupted ROM dumps",
          "Bypassing corrupt TPM / Secure Boot provisioning locks"
        ],
        safetyDirectives: [
          "Verify 1.8V adapter voltage when flashing modern Winbond 1.8V chips",
          "Never flash firmware over unstable battery power"
        ],
        recommendedTools: ["CH341A Mini Programmer", "SOIC8 Test Clip", "NeoProgrammer Utility", "Hex Editor (HxD)"]
      }
    ]
  },
  {
    id: "cleaning",
    name: "Cleaning, De-dusting & Thermal Service",
    shortName: "Cleaning",
    badgeTitle: "Thermals & Fluid",
    description: "Thermal paste renewal, liquid metal barriers, ultrasonic PCB baths, and fan lubrication.",
    longDescription: "Complete thermal subsystem overhauls, phase-change interface replacements (PTM7950), and ultrasonic de-oxidation.",
    icon: Eraser,
    color: "text-amber-500",
    textColor: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    accentBg: "from-amber-500/10 via-amber-500/5 to-transparent",
    manuals: [
      {
        id: "man-cl-01",
        category: "cleaning",
        title: "Phase-Change Thermal Interface & Liquid Metal Application Guide",
        code: "DOC-CLN-THERMAL-2026",
        fileSize: "2.8 MB PDF",
        pages: 24,
        author: "Thermal Dynamics Bench",
        lastUpdated: "2026 Revision 5.0",
        summary: "Standard operating procedures for Honeywell PTM7950 phase-change pads, liquid metal barrier foam gaskets, and thermal putty placement on VRM/VRAM.",
        keyTopics: [
          "PTM7950 phase-transition curing cycle (45°C burn-in)",
          "Conformal silicone coating barriers to prevent gallium migration",
          "Thermal putty (TG-PP10 / Upsiren U6 Pro) compression tolerances",
          "Measuring delta-T across CPU individual core sensors"
        ],
        safetyDirectives: [
          "Never apply liquid metal on bare aluminum heatsinks (creates brittle alloy)",
          "Wear nitrile gloves when handling anhydrous 99.9% isopropyl alcohol"
        ],
        recommendedTools: ["99.9% Anhydrous IPA", "MG Chemicals Conformal Coating", "PTM7950 Sheets", "Thermal Putty"]
      },
      {
        id: "man-cl-02",
        category: "cleaning",
        title: "Ultrasonic PCB Bath & Liquid Spill Corrosion Treatment",
        code: "DOC-CLN-ULTRASONIC",
        fileSize: "3.6 MB PDF",
        pages: 32,
        author: "JCR Decontamination Dept",
        lastUpdated: "2026 Technical Spec",
        summary: "Step-by-step restoration of liquid-damaged logic boards using heated ultrasonic baths, deionized water rinses, and desiccant oven curing.",
        keyTopics: [
          "Sweeping frequencies (40 kHz vs 80 kHz) to protect crystal oscillators",
          "Branson EC cleaning solution mixing ratios",
          "De-oxidation of corroded test points and 0201 SMD resistors",
          "Post-wash bakeout cycle (65°C for 4 hours in convection chamber)"
        ],
        safetyDirectives: [
          "Remove all microphones, CMOS batteries, and camera modules before ultrasonic submersion",
          "Allow complete 100% moisture bakeout before applying bench power"
        ],
        recommendedTools: ["Ultrasonic Cleaner (6L Heated)", "Deionized Water", "Bakeout Oven / Hot Plate", "Insulated Tweezers"]
      }
    ]
  },
  {
    id: "upgrades",
    name: "Hardware Upgrades & Modifications",
    shortName: "Upgrades",
    badgeTitle: "Performance & Modding",
    description: "Gen4/Gen5 NVMe SSDs, DDR5 SODIMM RAM, Wi-Fi 7 cards, eGPUs, and cooling mods.",
    longDescription: "Storage cloning, high-speed memory timing synchronization, external graphics interfaces, and custom watercooling manifolds.",
    icon: MoveUp,
    color: "text-blue-500",
    textColor: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    accentBg: "from-blue-500/10 via-blue-500/5 to-transparent",
    manuals: [
      {
        id: "man-upg-01",
        category: "upgrades",
        title: "PCIe Gen4/Gen5 M.2 SSD Partition Cloning & Thermal Sizing Guide",
        code: "DOC-UPG-NVME-CLONE",
        fileSize: "2.4 MB PDF",
        pages: 26,
        author: "Storage Engineering Group",
        lastUpdated: "2026 Technical Spec",
        summary: "Bare-metal drive cloning with Clonezilla and Macrium, GPT EFI partition alignment, 4Kn vs 512e sector translation, and graphene heat spreaders.",
        keyTopics: [
          "Creating bootable Rescue Media and direct drive-to-drive cloning",
          "Expanding unallocated partition space after cloning to larger SSD",
          "Heatsink thermal pad placement on M.2 controller vs NAND flash dies",
          "Enabling PCIe Gen4 speeds in UEFI without thermal throttling"
        ],
        safetyDirectives: [
          "Ensure source and target drive IDs are strictly verified before cloning",
          "Do not over-tighten M.2 mounting screw to prevent PCB substrate bending"
        ],
        recommendedTools: ["Dual-Bay NVMe Enclosure", "Clonezilla Live USB", "Graphene Thermal Heatsink", "M2x3mm Screws"]
      },
      {
        id: "man-upg-02",
        category: "upgrades",
        title: "SODIMM & CUDIMM DDR5 Memory Speed & Timing Synchronization",
        code: "DOC-UPG-RAM-TIMINGS",
        fileSize: "1.8 MB PDF",
        pages: 20,
        author: "Memory Architecture Lab",
        lastUpdated: "2026 Revision 2.4",
        summary: "Matching memory ranks (1Rx8 vs 2Rx8), SPD JEDEC profile negotiation, CAS latencies, and dual-channel bandwidth validation.",
        keyTopics: [
          "Why mixing 1Rx16 with 1Rx8 memory causes stuttering and lower FPS",
          "Enabling XMP/EXPO profiles on compatible gaming and creator motherboards",
          "Troubleshooting memory training boot loops on initial DDR5 installs",
          "AIDA64 and PassMark memory latency benchmarking protocols"
        ],
        safetyDirectives: [
          "Insert SODIMM sticks at a 30-degree angle and press down until dual clips click",
          "Ensure power cord and battery are completely disconnected during RAM insertion"
        ],
        recommendedTools: ["HWiNFO64", "CPU-Z", "PassMark MemTest86", "ESD Anti-Static Wrist Strap"]
      }
    ]
  }
];

interface CategorizedGuidesHubProps {
  selectedDeviceType: "all" | "laptop" | "desktop";
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (diff: string) => void;
  sortOption: string;
  onSortChange: (sort: string) => void;
  onViewGuide: (guideId: string) => void;
}

// Brand matcher helper across title, description, and alternative solutions
const isGuideMatchingBrand = (guide: RepairGuide, brandName: string): boolean => {
  if (!brandName || brandName === "all") return true;
  const b = brandName.toLowerCase();
  const title = (guide.title || "").toLowerCase();
  const desc = (guide.description || "").toLowerCase();
  const alt = (guide.alternativeSolutions || "").toLowerCase();

  switch (b) {
    case "apple":
      return title.includes("apple") || title.includes("macbook") || title.includes("mac ") || title.includes("imac") || title.includes("mac mini") || title.includes("mac studio") || desc.includes("apple") || alt.includes("apple");
    case "dell":
      return title.includes("dell") || title.includes("xps") || title.includes("alienware") || title.includes("optiplex") || title.includes("latitude") || title.includes("precision") || desc.includes("dell") || alt.includes("dell");
    case "lenovo":
      return title.includes("lenovo") || title.includes("thinkpad") || title.includes("legion") || title.includes("thinkcentre") || title.includes("thinkstation") || title.includes("yoga") || desc.includes("lenovo") || alt.includes("lenovo");
    case "hp":
      return title.includes("hp") || title.includes("spectre") || title.includes("omen") || title.includes("elitebook") || title.includes("prodesk") || title.includes("elitedesk") || title.includes("z4") || desc.includes("hp") || alt.includes("hp");
    case "asus":
      return title.includes("asus") || title.includes("rog") || title.includes("zenbook") || title.includes("strix") || title.includes("zephyrus") || title.includes("proart") || desc.includes("asus") || alt.includes("asus");
    case "acer":
      return title.includes("acer") || title.includes("predator") || title.includes("helios") || title.includes("swift") || title.includes("aspire") || desc.includes("acer") || alt.includes("acer");
    case "msi":
      return title.includes("msi") || title.includes("stealth") || title.includes("raider") || title.includes("trident") || title.includes("creator") || desc.includes("msi") || alt.includes("msi");
    case "razer":
      return title.includes("razer") || title.includes("blade") || desc.includes("razer") || alt.includes("razer");
    case "microsoft":
      return title.includes("microsoft") || title.includes("surface") || desc.includes("microsoft") || alt.includes("microsoft");
    case "framework":
      return title.includes("framework") || desc.includes("framework") || alt.includes("framework");
    case "samsung":
      return title.includes("samsung") || title.includes("galaxy book") || desc.includes("samsung") || alt.includes("samsung");
    case "lg":
      return title.includes("lg") || title.includes("gram") || desc.includes("lg") || alt.includes("lg");
    case "custom built":
    case "custom":
      return title.includes("custom") || title.includes("atx") || title.includes("sff") || title.includes("itx") || title.includes("watercooled") || desc.includes("custom") || alt.includes("custom");
    default:
      return title.includes(b) || desc.includes(b) || alt.includes(b);
  }
};

export default function CategorizedGuidesHub({
  selectedDeviceType,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  sortOption,
  onSortChange,
  onViewGuide,
}: CategorizedGuidesHubProps) {
  const [selectedManual, setSelectedManual] = useState<TechnicalManual | null>(null);
  const [viewFormat, setViewFormat] = useState<"all" | "guides" | "manuals">("all");
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>("all");
  const [selectedSubTopics, setSelectedSubTopics] = useState<Record<string, string>>({
    hardware: "all",
    software: "all",
    cleaning: "all",
    upgrades: "all",
  });
  const [categoryPages, setCategoryPages] = useState<Record<string, number>>({
    hardware: 1,
    software: 1,
    cleaning: 1,
    upgrades: 1,
  });
  const [pageSize, setPageSize] = useState<number>(24);

  const { data: allGuides = [], isLoading } = useQuery<RepairGuide[]>({
    queryKey: ["/api/repair-guides"],
    queryFn: () => fetch("/api/repair-guides").then((res) => res.json()),
    staleTime: 10 * 60 * 1000, // 10 minutes cache
    gcTime: 30 * 60 * 1000, // 30 minutes in memory
  });

  // Reset pagination when filter criteria change
  useEffect(() => {
    setCategoryPages({
      hardware: 1,
      software: 1,
      cleaning: 1,
      upgrades: 1,
    });
  }, [selectedDeviceType, selectedDifficulty, selectedBrandFilter, searchQuery, sortOption]);

  // Extract all distinct brand names for quick filtering
  const availableBrands = [
    "all",
    "Apple",
    "Dell",
    "Lenovo",
    "HP",
    "ASUS",
    "Acer",
    "MSI",
    "Razer",
    "Microsoft",
    "Framework",
    "Samsung",
    "LG",
    "Custom Built"
  ];

  // Memoized Brand Guide Counts in a single efficient O(N * Brands) pass
  const brandGuideCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const b of availableBrands) {
      counts[b] = 0;
    }

    const devFiltered = allGuides.filter(g => 
      !selectedDeviceType || selectedDeviceType === "all" || g.deviceType === selectedDeviceType
    );

    counts["all"] = devFiltered.length;

    for (const g of devFiltered) {
      for (const b of availableBrands) {
        if (b !== "all" && isGuideMatchingBrand(g, b)) {
          counts[b]++;
        }
      }
    }

    return counts;
  }, [allGuides, selectedDeviceType]);

  const getBrandGuideCount = (brandName: string) => {
    return brandGuideCounts[brandName] || 0;
  };

  // Memoized category total counts
  const categoryTotalCounts = useMemo(() => {
    const counts: Record<string, number> = {
      hardware: 0,
      software: 0,
      cleaning: 0,
      upgrades: 0,
    };
    for (const g of allGuides) {
      if (!selectedDeviceType || selectedDeviceType === "all" || g.deviceType === selectedDeviceType) {
        const cat = g.category?.toLowerCase();
        if (counts[cat] !== undefined) {
          counts[cat]++;
        }
      }
    }
    return counts;
  }, [allGuides, selectedDeviceType]);

  const getCategoryTotalCount = (categoryId: string) => {
    return categoryTotalCounts[categoryId.toLowerCase()] || 0;
  };

  // Memoized filtered and sorted guides per category
  const categoryGuidesMap = useMemo(() => {
    const map: Record<string, RepairGuide[]> = {
      hardware: [],
      software: [],
      cleaning: [],
      upgrades: [],
    };

    const categories = ["hardware", "software", "cleaning", "upgrades"];
    const q = searchQuery.trim().toLowerCase();

    for (const catId of categories) {
      const activeSubTopic = selectedSubTopics[catId] || "all";
      const subTopicsList = CATEGORY_SUBTOPICS[catId] || [];
      const currentSubTopicDef = subTopicsList.find(st => st.id === activeSubTopic);

      const filtered = allGuides.filter((guide) => {
        if (guide.category.toLowerCase() !== catId) return false;
        if (selectedDeviceType && selectedDeviceType !== "all" && guide.deviceType !== selectedDeviceType) return false;
        if (selectedDifficulty !== "all" && guide.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) return false;
        if (!isGuideMatchingBrand(guide, selectedBrandFilter)) return false;

        if (activeSubTopic !== "all" && currentSubTopicDef && currentSubTopicDef.keywords.length > 0) {
          const titleLower = guide.title.toLowerCase();
          const descLower = guide.description.toLowerCase();
          const matchesSub = currentSubTopicDef.keywords.some(k => 
            titleLower.includes(k.toLowerCase()) || descLower.includes(k.toLowerCase())
          );
          if (!matchesSub) return false;
        }

        if (q) {
          const matchTitle = guide.title.toLowerCase().includes(q);
          const matchDesc = guide.description.toLowerCase().includes(q);
          const matchTools = guide.toolsRequired && guide.toolsRequired.some(t => t.toLowerCase().includes(q));
          const matchSteps = guide.steps && guide.steps.some(s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchTools && !matchSteps) return false;
        }

        return true;
      });

      filtered.sort((a, b) => {
        switch (sortOption) {
          case "difficulty": {
            const order = { easy: 1, medium: 2, hard: 3 };
            return (order[a.difficulty as keyof typeof order] || 2) - (order[b.difficulty as keyof typeof order] || 2);
          }
          case "time":
            return a.estimatedTime.localeCompare(b.estimatedTime);
          case "popular":
          default:
            return (b.viewCount || 0) - (a.viewCount || 0);
        }
      });

      map[catId] = filtered;
    }

    return map;
  }, [allGuides, selectedDeviceType, selectedDifficulty, selectedBrandFilter, selectedSubTopics, searchQuery, sortOption]);

  const getGuidesForCategory = (categoryId: string) => {
    return categoryGuidesMap[categoryId.toLowerCase()] || [];
  };

  const displayedCategories = selectedCategory && selectedCategory !== "downloads"
    ? CATEGORY_DEFINITIONS.filter((c) => c.id === selectedCategory)
    : selectedCategory === "downloads"
    ? []
    : CATEGORY_DEFINITIONS;

  const isFocusedHub = Boolean(selectedCategory && selectedCategory !== "downloads");

  return (
    <div className="space-y-8">
      
      {/* Category Navigation Dock */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Core Repair Hubs
            </h2>
            <Badge variant="secondary" className="text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
              {allGuides.length || 624} Verified Guides • 8 Schematics • {ALL_DOWNLOADS.length} Tools
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>
              {selectedCategory 
                ? `Viewing ${selectedCategory.toUpperCase()} Hub` 
                : "Organized Across 4 Core Technical Disciplines"}
            </span>
          </div>
        </div>

        {/* Streamlined Category Tab Dock */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
          {/* All Sections Tab */}
          <button
            onClick={() => onCategoryChange("")}
            className={cn(
              "flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer shadow-2xs",
              !selectedCategory
                ? "bg-primary text-primary-foreground border-primary shadow-sm ring-2 ring-primary/20"
                : "bg-card/70 hover:bg-card/95 border-border/50 hover:border-primary/40 text-foreground"
            )}
          >
            <div className={cn(
              "h-8 w-8 rounded-xl flex items-center justify-center shrink-0",
              !selectedCategory ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
            )}>
              <LayoutGrid className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold block truncate">All Hubs</span>
              <span className={cn("text-[10px] block truncate", !selectedCategory ? "text-white/80" : "text-muted-foreground")}>
                {allGuides.length || 624} Guides
              </span>
            </div>
          </button>

          {/* 4 Main Categories Tabs */}
          {CATEGORY_DEFINITIONS.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const Icon = cat.icon;
            const count = getCategoryTotalCount(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(isSelected ? "" : cat.id)}
                className={cn(
                  "flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer shadow-2xs",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-sm ring-2 ring-primary/20"
                    : "bg-card/70 hover:bg-card/95 border-border/50 hover:border-primary/40 text-foreground"
                )}
              >
                <div className={cn(
                  "h-8 w-8 rounded-xl flex items-center justify-center shrink-0",
                  isSelected ? "bg-white/20 text-white" : `${cat.bgColor} ${cat.color}`
                )}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold block truncate">{cat.shortName} Hub</span>
                  <span className={cn("text-[10px] block truncate", isSelected ? "text-white/80" : "text-muted-foreground")}>
                    {count} Guides
                  </span>
                </div>
              </button>
            );
          })}

          {/* 5th Section: Essential Technician Software & Download Hub */}
          <button
            onClick={() => onCategoryChange(selectedCategory === "downloads" ? "" : "downloads")}
            className={cn(
              "flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer shadow-2xs",
              selectedCategory === "downloads"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-500/30"
                : "bg-card/70 hover:bg-card/95 border-emerald-500/30 hover:border-emerald-500/60 text-foreground"
            )}
          >
            <div className={cn(
              "h-8 w-8 rounded-xl flex items-center justify-center shrink-0",
              selectedCategory === "downloads"
                ? "bg-white/20 text-white"
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            )}>
              <Download className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold block truncate">Software Hub</span>
              <span className={cn("text-[10px] block truncate", selectedCategory === "downloads" ? "text-white/80" : "text-emerald-600 dark:text-emerald-400 font-semibold")}>
                {ALL_DOWNLOADS.length} Utilities
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Brand & Hardware OEM Filter Section */}
      {selectedCategory !== "downloads" && (
        <div className="rounded-2xl bg-card/70 backdrop-blur-md border border-border/50 p-3.5 sm:p-4 space-y-3 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <SlidersHorizontal className="h-3.5 w-3.5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
                  Brand & OEM Platform Filters
                </h3>
                <p className="text-[11px] text-muted-foreground hidden sm:block">
                  Isolate verified teardowns, schematics, and BIOS/component guides by system manufacturer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {selectedBrandFilter !== "all" ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBrandFilter("all");
                    setCategoryPages({
                      hardware: 1,
                      software: 1,
                      cleaning: 1,
                      upgrades: 1,
                    });
                  }}
                  className="px-2.5 py-1 rounded-xl text-xs font-bold text-destructive hover:bg-destructive/10 border border-destructive/30 flex items-center gap-1.5 cursor-pointer transition-colors bg-destructive/5 shadow-2xs"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>Clear Brand ({selectedBrandFilter})</span>
                </button>
              ) : (
                <span className="text-[11px] font-medium text-muted-foreground bg-muted/50 px-2.5 py-0.5 rounded-full border border-border/30">
                  Showing All {allGuides.length || 624} Hardware Systems
                </span>
              )}
            </div>
          </div>

          {/* Brand Buttons - Naturally Wrapped Without Slider/Scroll Bar */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5">
            {availableBrands.map((b) => {
              const isSelected = selectedBrandFilter === b;
              const brandCount = getBrandGuideCount(b);

              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => {
                    const nextBrand = isSelected ? "all" : b;
                    setSelectedBrandFilter(nextBrand);
                    setCategoryPages({
                      hardware: 1,
                      software: 1,
                      cleaning: 1,
                      upgrades: 1,
                    });
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer border flex items-center gap-2 select-none",
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-xs ring-2 ring-primary/25 font-bold scale-[1.02]"
                      : "bg-background/80 hover:bg-background border-border/60 hover:border-primary/40 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-white" />}
                  <span>{b === "all" ? "All Brands" : b}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full font-bold transition-colors",
                      isSelected ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {brandCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Unified Filter Toolbar */}
      {selectedCategory !== "downloads" && (
        <div className="rounded-2xl bg-card/60 backdrop-blur-md border border-border/50 p-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          {/* Left: View Format & Difficulty */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Format Selector */}
            <div className="flex items-center p-0.5 rounded-xl bg-muted/60 border border-border/40 text-xs">
              <button
                onClick={() => setViewFormat("all")}
                className={cn(
                  "px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer",
                  viewFormat === "all" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                )}
              >
                All Resources
              </button>
              <button
                onClick={() => setViewFormat("guides")}
                className={cn(
                  "px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer",
                  viewFormat === "guides" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Guides Only
              </button>
              <button
                onClick={() => setViewFormat("manuals")}
                className={cn(
                  "px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer",
                  viewFormat === "manuals" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Manuals Only
              </button>
            </div>

            {/* Difficulty Pills */}
            <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-border/40">
              <span className="text-xs font-semibold text-muted-foreground mr-1">Difficulty:</span>
              {["all", "easy", "medium", "hard"].map((diff) => (
                <button
                  key={diff}
                  onClick={() => onDifficultyChange(diff)}
                  className={cn(
                    "px-2.5 py-0.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer",
                    selectedDifficulty === diff
                      ? "bg-primary/10 text-primary border border-primary/20 font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* Per-Page Selector when in Focused Hub */}
            {isFocusedHub && (
              <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-border/40 text-xs text-muted-foreground">
                <span>Per page:</span>
                {[12, 24, 48].map((size) => (
                  <button
                    key={size}
                    onClick={() => setPageSize(size)}
                    className={cn(
                      "px-2 py-0.5 rounded-md font-semibold cursor-pointer transition-colors",
                      pageSize === size ? "bg-primary/15 text-primary font-bold" : "hover:text-foreground"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Sort & Reset */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs font-semibold text-muted-foreground hidden sm:inline">Sort:</span>
            <Select value={sortOption} onValueChange={onSortChange}>
              <SelectTrigger className="w-36 h-8 rounded-xl border-border/60 bg-background text-xs font-semibold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border/50">
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="difficulty">Difficulty Level</SelectItem>
                <SelectItem value="time">Fastest Time</SelectItem>
              </SelectContent>
            </Select>

            {(selectedCategory || selectedDifficulty !== "all" || selectedBrandFilter !== "all" || searchQuery || viewFormat !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onCategoryChange("");
                  onDifficultyChange("all");
                  setSelectedBrandFilter("all");
                  onSearchChange("");
                  setViewFormat("all");
                  setSelectedSubTopics({
                    hardware: "all",
                    software: "all",
                    cleaning: "all",
                    upgrades: "all",
                  });
                }}
                className="h-8 rounded-xl text-xs text-muted-foreground hover:text-foreground gap-1 px-2.5 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset Filters
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Main Core Repair Hubs Section */}
      <div className="space-y-8">
        {displayedCategories.map((cat) => {
          const categoryGuides = getGuidesForCategory(cat.id);
          const totalCategoryGuides = getCategoryTotalCount(cat.id);
          const Icon = cat.icon;
          const subTopics = CATEGORY_SUBTOPICS[cat.id] || [];
          const activeSubTopic = selectedSubTopics[cat.id] || "all";

          // Calculate Safe Pagination
          const effectivePageSize = isFocusedHub ? pageSize : 12;
          const totalPages = Math.max(1, Math.ceil(categoryGuides.length / effectivePageSize));
          const currentPage = Math.min(Math.max(1, categoryPages[cat.id] || 1), totalPages);
          const startIndex = (currentPage - 1) * effectivePageSize;
          const displayedGuides = categoryGuides.slice(startIndex, startIndex + effectivePageSize);

          return (
            <section
              key={cat.id}
              id={`hub-${cat.id}`}
              className={cn(
                "rounded-3xl border bg-card/60 backdrop-blur-xl p-5 sm:p-7 space-y-6 shadow-xs relative overflow-hidden transition-all",
                cat.borderColor
              )}
            >
              {/* Subtle background category gradient */}
              <div
                className={cn(
                  "absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl rounded-full blur-3xl opacity-20 pointer-events-none -z-0",
                  cat.accentBg
                )}
              />

              {/* Category Header */}
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border/40 pb-4">
                <div className="flex items-start gap-3.5">
                  <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm", cat.bgColor, cat.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={cn("inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border", cat.bgColor, cat.textColor, cat.borderColor)}>
                        {cat.badgeTitle}
                      </span>
                      <span className="text-[11px] font-bold text-foreground">
                        {totalCategoryGuides} Dedicated Guides in Hub
                      </span>
                      <span className="text-[11px] text-muted-foreground">• {cat.manuals.length} Official Schematics</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed mt-0.5">
                      {isFocusedHub ? cat.longDescription : cat.description}
                    </p>
                  </div>
                </div>

                {/* Hub Navigation Button */}
                <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                  {selectedCategory !== cat.id ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        onCategoryChange(cat.id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="rounded-xl text-xs font-bold gap-1.5 h-9 border-border/60 hover:border-primary/40 hover:bg-primary/5 cursor-pointer shadow-2xs"
                    >
                      <span>Enter {cat.shortName} Hub ({totalCategoryGuides})</span>
                      <ArrowRight className="h-3.5 w-3.5 text-primary" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCategoryChange("")}
                      className="rounded-xl text-xs font-bold gap-1.5 h-9 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <LayoutGrid className="h-3.5 w-3.5" />
                      <span>View All 4 Hubs</span>
                    </Button>
                  )}
                </div>
              </div>

              {/* Sub-Topic Component Filter Chips */}
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-muted-foreground uppercase tracking-wider text-[10px] flex items-center gap-1">
                    <SlidersHorizontal className="h-3 w-3 text-primary" />
                    {cat.shortName} Sub-Topics & Diagnostic Focus:
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {categoryGuides.length} guides match active filters
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  {subTopics.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => {
                        setSelectedSubTopics(prev => ({ ...prev, [cat.id]: st.id }));
                        setCategoryPages(prev => ({ ...prev, [cat.id]: 1 }));
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer border flex items-center gap-1.5",
                        activeSubTopic === st.id
                          ? "bg-primary text-primary-foreground border-primary shadow-xs font-bold"
                          : "bg-background/80 hover:bg-background border-border/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span>{st.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Official Technical Manuals Shelf */}
              {(viewFormat === "all" || viewFormat === "manuals") && (
                <div className="relative z-10 space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                      <FileText className={cn("h-3.5 w-3.5", cat.color)} />
                      Official {cat.shortName} Technical Manuals & Schematics ({cat.manuals.length})
                    </h4>
                    <span className="text-[10px] text-muted-foreground font-medium">
                      Engineering Specifications & Torque Limits
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cat.manuals.map((manual) => (
                      <div
                        key={manual.id}
                        onClick={() => setSelectedManual(manual)}
                        className="rounded-2xl border border-border/60 bg-background/80 hover:bg-background hover:border-primary/40 p-3.5 transition-all flex flex-col justify-between gap-2.5 cursor-pointer group shadow-2xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                              {manual.code}
                            </span>
                            <span className="text-[10px] font-semibold text-muted-foreground">
                              {manual.pages} Pages • {manual.fileSize}
                            </span>
                          </div>
                          <h5 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-1">
                            {manual.title}
                          </h5>
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {manual.summary}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px]">
                          <span className="text-muted-foreground font-medium flex items-center gap-1 text-[10px]">
                            <Shield className="h-3 w-3 text-emerald-500" />
                            <span>{manual.author}</span>
                          </span>
                          <span className="font-bold text-primary flex items-center gap-1 group-hover:underline text-xs">
                            <span>Open Manual</span>
                            <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Repair Guides Grid with Seamless Integration */}
              {(viewFormat === "all" || viewFormat === "guides") && (
                <div className="relative z-10 space-y-4 pt-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                      <Wrench className={cn("h-3.5 w-3.5", cat.color)} />
                      {cat.shortName} Step-by-Step Technical Guides ({categoryGuides.length})
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-muted-foreground font-medium">
                        Showing {startIndex + 1}–{Math.min(startIndex + effectivePageSize, categoryGuides.length)} of {categoryGuides.length}
                      </span>
                    </div>
                  </div>

                  {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-64 rounded-3xl bg-muted/40 animate-pulse border border-border/30" />
                      ))}
                    </div>
                  ) : categoryGuides.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayedGuides.map((guide) => (
                          <GuideCard
                            key={guide.id}
                            guide={guide}
                            onViewGuide={() => onViewGuide(guide.id)}
                          />
                        ))}
                      </div>

                      {/* Pagination Controls */}
                      {totalPages > 1 && (
                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/40">
                          <div className="text-xs text-muted-foreground font-medium">
                            Page <span className="font-bold text-foreground">{currentPage}</span> of <span className="font-bold text-foreground">{totalPages}</span> ({categoryGuides.length} total guides)
                          </div>

                          <div className="flex items-center gap-1.5">
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={currentPage <= 1}
                              onClick={() => {
                                setCategoryPages(prev => ({ ...prev, [cat.id]: 1 }));
                                const el = document.getElementById(`hub-${cat.id}`);
                                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                              }}
                              className="h-8 w-8 p-0 rounded-xl"
                            >
                              <ChevronsLeft className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              disabled={currentPage <= 1}
                              onClick={() => {
                                setCategoryPages(prev => ({ ...prev, [cat.id]: Math.max(1, currentPage - 1) }));
                                const el = document.getElementById(`hub-${cat.id}`);
                                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                              }}
                              className="h-8 px-2.5 rounded-xl text-xs gap-1"
                            >
                              <ChevronLeft className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Prev</span>
                            </Button>

                            {/* Numbered Page Buttons */}
                            <div className="flex items-center gap-1">
                              {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                                .map((pageNum, idx, arr) => {
                                  const showEllipsis = idx > 0 && pageNum - arr[idx - 1] > 1;
                                  return (
                                    <div key={pageNum} className="flex items-center">
                                      {showEllipsis && <span className="px-1 text-xs text-muted-foreground">...</span>}
                                      <Button
                                        variant={currentPage === pageNum ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => {
                                          setCategoryPages(prev => ({ ...prev, [cat.id]: pageNum }));
                                          const el = document.getElementById(`hub-${cat.id}`);
                                          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                                        }}
                                        className={cn(
                                          "h-8 w-8 p-0 rounded-xl text-xs font-bold",
                                          currentPage === pageNum ? "shadow-xs" : "border-border/50"
                                        )}
                                      >
                                        {pageNum}
                                      </Button>
                                    </div>
                                  );
                                })}
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              disabled={currentPage >= totalPages}
                              onClick={() => {
                                setCategoryPages(prev => ({ ...prev, [cat.id]: Math.min(totalPages, currentPage + 1) }));
                                const el = document.getElementById(`hub-${cat.id}`);
                                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                              }}
                              className="h-8 px-2.5 rounded-xl text-xs gap-1"
                            >
                              <span className="hidden sm:inline">Next</span>
                              <ChevronRight className="h-3.5 w-3.5" />
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              disabled={currentPage >= totalPages}
                              onClick={() => {
                                setCategoryPages(prev => ({ ...prev, [cat.id]: totalPages }));
                                const el = document.getElementById(`hub-${cat.id}`);
                                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                              }}
                              className="h-8 w-8 p-0 rounded-xl"
                            >
                              <ChevronsRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-border/60 bg-muted/20 p-6 text-center space-y-3">
                      <p className="text-xs font-semibold text-foreground">
                        No {cat.shortName} repair guides match your current filter criteria.
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        {selectedBrandFilter !== "all" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedBrandFilter("all");
                              setCategoryPages(prev => ({ ...prev, [cat.id]: 1 }));
                            }}
                            className="h-7 text-xs rounded-xl border-border/60"
                          >
                            Reset Brand Filter ({selectedBrandFilter})
                          </Button>
                        )}
                        {activeSubTopic !== "all" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedSubTopics(prev => ({ ...prev, [cat.id]: "all" }));
                              setCategoryPages(prev => ({ ...prev, [cat.id]: 1 }));
                            }}
                            className="h-7 text-xs rounded-xl border-border/60"
                          >
                            Reset Sub-Topic
                          </Button>
                        )}
                        {searchQuery && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              onSearchChange("");
                              setCategoryPages(prev => ({ ...prev, [cat.id]: 1 }));
                            }}
                            className="h-7 text-xs rounded-xl border-border/60"
                          >
                            Clear Search Query
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}

        {/* Section 5: Essential Technician Software & Download Hub */}
        {(!selectedCategory || selectedCategory === "downloads") && (
          <TechnicianDownloadHub />
        )}
      </div>

      {/* Technical Manual Detail Modal */}
      {selectedManual && (
        <ManualDetailModal
          manual={selectedManual}
          onClose={() => setSelectedManual(null)}
        />
      )}
    </div>
  );
}
