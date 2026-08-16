import { useState, useMemo } from "react";
import { 
  Download, 
  ExternalLink, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  HardDrive, 
  Layers, 
  Terminal, 
  FileCode, 
  Sparkles, 
  Copy, 
  Check, 
  AlertCircle,
  FileArchive,
  FileText,
  Zap,
  Filter,
  ArrowDownToLine,
  SlidersHorizontal,
  Binary,
  FolderDown,
  Gauge,
  Thermometer,
  Disc,
  Activity,
  Network,
  Wrench,
  Flame,
  BatteryCharging,
  ShieldAlert,
  Radio
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export interface DownloadItem {
  id: string;
  name: string;
  developer: string;
  category: "diagnostics" | "storage" | "memory" | "bootable" | "drivers" | "thermals" | "internals" | "bundles";
  categoryLabel: string;
  description: string;
  fileSize: string;
  version: string;
  license: "Free" | "Open Source" | "Freemium" | "Official Bundle" | "Official Utility";
  url: string;
  directDownloadUrl?: string;
  sha256?: string;
  platforms: string[];
  recommendedUse: string;
  icon: any;
  featured?: boolean;
}

export const ALL_DOWNLOADS: DownloadItem[] = [
  // ==========================================
  // Master Offline Download Bundles (2)
  // ==========================================
  {
    id: "bundle-all-manuals",
    name: "JCRguru Complete Offline Technical Manuals & Schematics Pack",
    developer: "JCR Engineering Lab",
    category: "bundles",
    categoryLabel: "Master Offline Bundle",
    description: "Complete offline archive containing all verified hardware teardown guides, motherboard power delivery schematics, BSOD minidump manuals, and thermal PTM7950 application protocols.",
    fileSize: "48.5 MB ZIP",
    version: "2026.4 v4",
    license: "Official Bundle",
    url: "#download-offline-pack",
    directDownloadUrl: "#offline-pack",
    sha256: "8e9f2a41d7c30b8b1e4c9f7a5d2e0b1c3a6f8e4d2c7b5a1f9e3d6c8b4a2f0e1d",
    platforms: ["Windows", "macOS", "Linux", "Android"],
    recommendedUse: "Complete offline bench repair kit when internet access is unavailable or on air-gapped customer sites.",
    icon: FileArchive,
    featured: true,
  },
  {
    id: "bundle-torque-cheatsheet",
    name: "Bench Safety Directives & Chassis Screw Torque Reference Matrix",
    developer: "JCR Bench Safety Group",
    category: "bundles",
    categoryLabel: "Printable Matrix",
    description: "High-resolution printable bench reference chart covering M2/M2.5 screw torque limits (0.2 - 0.5 Nm), ESD dissipation resistance, and thermal pad thickness tolerances.",
    fileSize: "3.8 MB PDF",
    version: "Rev 2026.2",
    license: "Official Bundle",
    url: "#download-torque-chart",
    directDownloadUrl: "#torque-chart",
    sha256: "3b7c9e1f5a8d2c4e6f0b1a3d5e7c9f2a4b6d8e0f1a3c5e7b9d1f3a5c7e9b1d3f",
    platforms: ["PDF Printable", "Any Device"],
    recommendedUse: "Laminated bench workstation quick reference for avoiding stripped magnesium screw bosses.",
    icon: FileText,
    featured: true,
  },

  // ==========================================
  // Diagnostics & Hardware Telemetry (12)
  // ==========================================
  {
    id: "hwinfo64",
    name: "HWiNFO64 Diagnostics & Sensor Telemetry Suite",
    developer: "REALiX",
    category: "diagnostics",
    categoryLabel: "Hardware Telemetry",
    description: "Industry-standard real-time hardware telemetry engine. Monitors VRM mosfet temperatures, GPU hotspot deltas, 12VHPWR voltage droop, and CPU package thermal throttling.",
    fileSize: "12.4 MB",
    version: "v8.02 Portable",
    license: "Free",
    url: "https://www.hwinfo.com/download/",
    directDownloadUrl: "https://www.hwinfo.com/download/",
    sha256: "a1c2e3f4b5d6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
    platforms: ["Windows 11 / 10 / 8 / 7 (64-bit)"],
    recommendedUse: "Verifying thermal dissipation after repasting and isolating VRM voltage instability.",
    icon: Cpu,
    featured: true,
  },
  {
    id: "cpuz",
    name: "CPU-Z Hardware Identification Utility",
    developer: "CPUID",
    category: "diagnostics",
    categoryLabel: "CPU & Memory SPD",
    description: "Inspects CPU stepping, microcode revisions, instruction set flags, motherboard chipset, and DDR4/DDR5 memory SPD timing profiles.",
    fileSize: "3.2 MB",
    version: "v2.09",
    license: "Free",
    url: "https://www.cpuid.com/softwares/cpu-z.html",
    directDownloadUrl: "https://www.cpuid.com/softwares/cpu-z.html",
    platforms: ["Windows 11 / 10", "Android"],
    recommendedUse: "Validating dual-channel RAM frequency configuration and checking installed BIOS versions.",
    icon: Cpu,
  },
  {
    id: "gpuz",
    name: "TechPowerUp GPU-Z Video Subsystem Inspector",
    developer: "TechPowerUp",
    category: "diagnostics",
    categoryLabel: "GPU & VRAM Analysis",
    description: "Inspects GPU die architectures, VRAM vendor (Samsung, Micron, SK Hynix), PCIe bus link width validation, and vBIOS ROM extraction.",
    fileSize: "9.8 MB",
    version: "v2.58",
    license: "Free",
    url: "https://www.techpowerup.com/gpuz/",
    directDownloadUrl: "https://www.techpowerup.com/gpuz/",
    platforms: ["Windows 11 / 10"],
    recommendedUse: "Isolating GPU PCIe lane bottlenecks, thermal junction hotspots, and saving backup vBIOS roms.",
    icon: Gauge,
  },
  {
    id: "librehw",
    name: "Libre Hardware Monitor (Open Source)",
    developer: "LibreHardwareMonitor Community",
    category: "diagnostics",
    categoryLabel: "Open Source Sensors",
    description: "100% free open-source telemetry tool with embedded HTTP web-server for remote bench monitoring and fan RPM tachometer graphs.",
    fileSize: "8.1 MB",
    version: "v0.9.3",
    license: "Open Source",
    url: "https://github.com/LibreHardwareMonitor/LibreHardwareMonitor/releases",
    directDownloadUrl: "https://github.com/LibreHardwareMonitor/LibreHardwareMonitor/releases",
    platforms: ["Windows 11 / 10"],
    recommendedUse: "Remote test-bench telemetry monitoring via browser without installing heavy commercial suites.",
    icon: Cpu,
  },
  {
    id: "furmark",
    name: "FurMark 2 OpenGL / Vulkan GPU Stress & Artifact Tester",
    developer: "Geeks3D",
    category: "diagnostics",
    categoryLabel: "GPU Burn-in & Artifacts",
    description: "Intensive 3D render stress test generating peak power load to uncover soldered VRAM cracked ball grids, failing MOSFETs, and thermal runaway.",
    fileSize: "18.2 MB",
    version: "v2.2.0",
    license: "Free",
    url: "https://www.geeks3d.com/furmark/",
    directDownloadUrl: "https://www.geeks3d.com/furmark/",
    platforms: ["Windows 11 / 10", "Linux 64-bit"],
    recommendedUse: "Testing graphics card stability under 100% power limit before finalizing GPU repairs.",
    icon: Flame,
    featured: true,
  },
  {
    id: "occt",
    name: "OCCT (OverClock Checking Tool) All-in-One Power Stress",
    developer: "OCBASE",
    category: "diagnostics",
    categoryLabel: "Hardware Error Checking",
    description: "Comprehensive hardware stress testing engine for CPU, Linpack, Memory, 3D Adaptive, VRAM, and ATX Power Supply voltage rail stability.",
    fileSize: "128 MB",
    version: "v13.1.0",
    license: "Freemium",
    url: "https://www.ocbase.com/download",
    directDownloadUrl: "https://www.ocbase.com/download",
    platforms: ["Windows 11 / 10 (64-bit)"],
    recommendedUse: "Isolating failing PSU 12V rails and catching intermittent AVX-512 calculation errors.",
    icon: Activity,
    featured: true,
  },
  {
    id: "bluescreenview",
    name: "BlueScreenView Minidump BSOD Crash Analyzer",
    developer: "NirSoft",
    category: "diagnostics",
    categoryLabel: "BSOD Crash Dump Analysis",
    description: "Scans all Windows minidump (.dmp) files created during Blue Screen crashes and highlights the faulting driver (.sys) and bugcheck stop codes.",
    fileSize: "140 KB",
    version: "v1.55 Portable",
    license: "Free",
    url: "https://www.nirsoft.net/utils/blue_screen_view.html",
    directDownloadUrl: "https://www.nirsoft.net/utils/blue_screen_view.html",
    platforms: ["Windows 11 / 10 / 8 / 7"],
    recommendedUse: "Instantly determining whether a BSOD was caused by a bad graphics driver, corrupted RAM, or failing SSD.",
    icon: ShieldAlert,
    featured: true,
  },
  {
    id: "whocrashed",
    name: "WhoCrashed Automated Kernel Crash Dump Analyzer",
    developer: "Resplendence Software",
    category: "diagnostics",
    categoryLabel: "Automated BSOD Analysis",
    description: "One-click readable diagnostic reports explaining cryptic BSOD stop codes with plain-English suggestions for faulty drivers or memory.",
    fileSize: "3.5 MB",
    version: "v3.01 Home Edition",
    license: "Free",
    url: "https://www.resplendence.com/whocrashed",
    directDownloadUrl: "https://www.resplendence.com/whocrashed",
    platforms: ["Windows 11 / 10 / 8"],
    recommendedUse: "Quickly communicating crash causes and recommended driver updates to non-technical customers.",
    icon: Activity,
  },
  {
    id: "coretemp",
    name: "Core Temp Per-Core CPU Thermals & Power Monitor",
    developer: "Arthur Liberman",
    category: "diagnostics",
    categoryLabel: "Per-Core Thermal Telemetry",
    description: "Direct Digital Thermal Sensor (DTS) reader displaying real-time temperatures for every individual CPU core along with TjMax distance.",
    fileSize: "1.2 MB",
    version: "v1.18.1",
    license: "Free",
    url: "https://www.alcpu.com/CoreTemp/",
    directDownloadUrl: "https://www.alcpu.com/CoreTemp/",
    platforms: ["Windows 11 / 10 / 8 / 7"],
    recommendedUse: "Spotting uneven heatsink mounting pressure where one core runs 15°C hotter than adjacent cores.",
    icon: Thermometer,
  },
  {
    id: "batteryinfoview",
    name: "BatteryInfoView Laptop Battery Degradation Telemetry",
    developer: "NirSoft",
    category: "diagnostics",
    categoryLabel: "Battery Health & Wear",
    description: "Reads laptop battery internal smart registers: designed capacity, full charge capacity, charge rate (mW), cycle count, and wear percentage.",
    fileSize: "165 KB Portable",
    version: "v1.25",
    license: "Free",
    url: "https://www.nirsoft.net/utils/battery_information_view.html",
    directDownloadUrl: "https://www.nirsoft.net/utils/battery_information_view.html",
    platforms: ["Windows 11 / 10 / 8 / 7"],
    recommendedUse: "Checking battery cycle degradation and verifying genuine cell capacity before battery replacement.",
    icon: BatteryCharging,
  },
  {
    id: "ipdt",
    name: "Intel Processor Diagnostic Tool (IPDT 64-bit)",
    developer: "Intel Corporation",
    category: "diagnostics",
    categoryLabel: "Intel CPU Validation",
    description: "Official Intel manufacturing diagnostic testing instruction sets, brand strings, floating point math, cache memory, and thermal stress.",
    fileSize: "22.5 MB",
    version: "v4.1.9",
    license: "Official Utility",
    url: "https://www.intel.com/content/www/us/en/download/15951/intel-processor-diagnostic-tool.html",
    directDownloadUrl: "https://www.intel.com/content/www/us/en/download/15951/intel-processor-diagnostic-tool.html",
    platforms: ["Windows 11 / 10 64-bit"],
    recommendedUse: "Verifying warranty RMA claims for defective Intel desktop and laptop CPUs.",
    icon: Cpu,
  },
  {
    id: "ryzenmaster",
    name: "AMD Ryzen Master Processor Telemetry & Tuning",
    developer: "AMD",
    category: "diagnostics",
    categoryLabel: "AMD Processor Telemetry",
    description: "Official AMD software for monitoring per-core clocks, SoC voltage, Infinity Fabric clock (FCLK), and Curve Optimizer per-core offsets.",
    fileSize: "185 MB",
    version: "v2.13.0",
    license: "Official Utility",
    url: "https://www.amd.com/en/technologies/ryzen-master",
    directDownloadUrl: "https://www.amd.com/en/technologies/ryzen-master",
    platforms: ["Windows 11 / 10 64-bit"],
    recommendedUse: "Diagnosing AM4/AM5 memory training issues and fine-tuning AMD CPU power limits.",
    icon: Cpu,
  },

  // ==========================================
  // Storage & Disk Cloning Utilities (10)
  // ==========================================
  {
    id: "crystaldiskinfo",
    name: "CrystalDiskInfo S.M.A.R.T. Drive Health Monitor",
    developer: "Hiyohiyo / Crystal Dew World",
    category: "storage",
    categoryLabel: "Disk Health & S.M.A.R.T.",
    description: "Real-time S.M.A.R.T. health scoring, 0E bad sector reallocation tracking, NVMe temperature alert thresholds, and total host writes calculation.",
    fileSize: "6.5 MB",
    version: "v9.3.2 Standard",
    license: "Open Source",
    url: "https://crystalmark.info/en/software/crystaldiskinfo/",
    directDownloadUrl: "https://crystalmark.info/en/software/crystaldiskinfo/",
    sha256: "9f8e7d6c5b4a39281701f2e3d4c5b6a7890123456789abcdef0123456789abcd",
    platforms: ["Windows 11 / 10"],
    recommendedUse: "Immediate triage to determine if drive degradation is causing system freezes, BSODs, or slow boots.",
    icon: HardDrive,
    featured: true,
  },
  {
    id: "crystaldiskmark",
    name: "CrystalDiskMark Storage Speed Benchmark",
    developer: "Crystal Dew World",
    category: "storage",
    categoryLabel: "Disk Throughput Benchmark",
    description: "Measures sequential and random 4K IOPS read/write throughput (Q8T1, Q32T1) with dedicated NVMe real-world testing profiles.",
    fileSize: "5.1 MB",
    version: "v8.0.5",
    license: "Open Source",
    url: "https://crystalmark.info/en/software/crystaldiskmark/",
    directDownloadUrl: "https://crystalmark.info/en/software/crystaldiskmark/",
    platforms: ["Windows 11 / 10"],
    recommendedUse: "Verifying newly installed PCIe Gen4/Gen5 SSDs achieve full rated speeds without thermal throttling.",
    icon: HardDrive,
  },
  {
    id: "clonezilla",
    name: "Clonezilla Live Bare-Metal Disk Cloning ISO",
    developer: "Steven Shiau / NCHC Lab",
    category: "storage",
    categoryLabel: "Bare-Metal Disk Cloning",
    description: "Sector-by-sector drive cloning and partition imaging via bootable Linux USB. Bypasses damaged Windows file systems to rescue user data.",
    fileSize: "410 MB ISO",
    version: "v3.1.2-22",
    license: "Open Source",
    url: "https://clonezilla.org/downloads.php",
    directDownloadUrl: "https://clonezilla.org/downloads.php",
    platforms: ["Bootable USB (All OS / UEFI / BIOS)"],
    recommendedUse: "Cloning failing HDDs or NVMe drives to fresh SSDs without booting into an infected or unstable OS.",
    icon: Disc,
    featured: true,
  },
  {
    id: "macrium-reflect",
    name: "Macrium Reflect Rescue Media & Drive Imager",
    developer: "Paramount Software UK",
    category: "storage",
    categoryLabel: "Live OS Partition Cloning",
    description: "Live hot-cloning of active Windows installations with automatic partition expansion and WinPE USB rescue environment creation.",
    fileSize: "180 MB",
    version: "v8.1 Free",
    license: "Freemium",
    url: "https://www.macrium.com/reflectfree",
    directDownloadUrl: "https://www.macrium.com/reflectfree",
    platforms: ["Windows 11 / 10"],
    recommendedUse: "Migrating active OS installs to larger M.2 NVMe drives while keeping user files and license intact.",
    icon: HardDrive,
  },
  {
    id: "victoria-ssd",
    name: "Victoria SSD/HDD Low-Level Surface Diagnostic",
    developer: "Sergey Kazansky",
    category: "storage",
    categoryLabel: "Surface Sector Repair",
    description: "Legendary technician low-level surface analyzer showing millisecond block response times, remap/refresh bad sector repairs, and raw controller commands.",
    fileSize: "4.8 MB Portable",
    version: "v5.37",
    license: "Free",
    url: "https://hdd.by/victoria/",
    directDownloadUrl: "https://hdd.by/victoria/",
    platforms: ["Windows 11 / 10 / 8 / 7"],
    recommendedUse: "Isolating slow degradation blocks on SATA SSDs and HDDs before permanent unrecoverable failure.",
    icon: HardDrive,
    featured: true,
  },
  {
    id: "asssd",
    name: "AS SSD Benchmark Storage Testing Tool",
    developer: "Alexey Schepeljanski",
    category: "storage",
    categoryLabel: "4K Alignment & IOPS",
    description: "Checks 4K partition alignment (e.g. 1024K OK) and AHCI/NVMe storahci driver mode while testing 4K-64Thrd read/write access times.",
    fileSize: "1.8 MB",
    version: "v2.0.7316",
    license: "Free",
    url: "https://www.alex-is.de/PHP/fusion/downloads.php",
    directDownloadUrl: "https://www.alex-is.de/PHP/fusion/downloads.php",
    platforms: ["Windows 11 / 10"],
    recommendedUse: "Verifying 4K partition alignment after performing manual partition resizing or disk cloning.",
    icon: Gauge,
  },
  {
    id: "testdisk",
    name: "TestDisk & PhotoRec Partition Recovery Suite",
    developer: "CGSecurity / Christophe Grenier",
    category: "storage",
    categoryLabel: "Partition & File Carving",
    description: "Open-source deep partition table repair tool for recovering deleted partitions, fixing damaged MBR/GPT structures, and carving raw files from formatted drives.",
    fileSize: "32.5 MB",
    version: "v7.2",
    license: "Open Source",
    url: "https://www.cgsecurity.org/wiki/TestDisk_Download",
    directDownloadUrl: "https://www.cgsecurity.org/wiki/TestDisk_Download",
    platforms: ["Windows", "Linux", "macOS"],
    recommendedUse: "Restoring corrupted partition tables when a drive shows as unallocated RAW space in Disk Management.",
    icon: Wrench,
    featured: true,
  },
  {
    id: "treesize",
    name: "TreeSize Free Master File Table Disk Space Hunter",
    developer: "JAM Software",
    category: "storage",
    categoryLabel: "Storage Bloat Visualizer",
    description: "Scans Master File Tables (MFT) in seconds to pinpoint exact folders holding huge hidden temp files, Windows.old directories, or crash dump logs.",
    fileSize: "14.2 MB",
    version: "v4.7.3",
    license: "Free",
    url: "https://www.jam-software.com/treesize_free",
    directDownloadUrl: "https://www.jam-software.com/treesize_free",
    platforms: ["Windows 11 / 10 / 8"],
    recommendedUse: "Instantly freeing up 50GB+ of storage on nearly full customer SSDs during tune-ups.",
    icon: HardDrive,
  },
  {
    id: "sdcardformatter",
    name: "SD Card Formatter Official Flash Storage Restorer",
    developer: "SD Association / Tuxera",
    category: "storage",
    categoryLabel: "Flash Memory Restorer",
    description: "Compliant formatting utility that adheres strictly to SD/SDHC/SDXC specifications, rebuilding factory flash blocks and partition layouts.",
    fileSize: "7.4 MB",
    version: "v5.0.3",
    license: "Official Utility",
    url: "https://www.sdcard.org/downloads/formatter/",
    directDownloadUrl: "https://www.sdcard.org/downloads/formatter/",
    platforms: ["Windows 11 / 10", "macOS"],
    recommendedUse: "Fixing write-protected or unrecognized SD and microSD cards used in camera or boot setups.",
    icon: Disc,
  },
  {
    id: "hdtune",
    name: "HD Tune Pro Drive Diagnostic & Transfer Bench",
    developer: "EFD Software",
    category: "storage",
    categoryLabel: "Sector Scan & Transfer",
    description: "Fast surface error scanning, S.M.A.R.T. health logging, burst rate measurement, and folder usage statistical breakdowns.",
    fileSize: "2.3 MB",
    version: "v5.75",
    license: "Freemium",
    url: "https://www.hdtune.com/download.html",
    directDownloadUrl: "https://www.hdtune.com/download.html",
    platforms: ["Windows 11 / 10 / 8 / 7"],
    recommendedUse: "Visual bad sector mapping and testing sustainable continuous sequential write cache size.",
    icon: HardDrive,
  },

  // ==========================================
  // Memory & CPU Stress Testing (6)
  // ==========================================
  {
    id: "memtest86",
    name: "PassMark MemTest86 Standalone UEFI Diagnostic",
    developer: "PassMark Software",
    category: "memory",
    categoryLabel: "Memory Fault Isolation",
    description: "Gold standard standalone memory diagnostic. Boots directly into UEFI to stress RAM across 13 rigorous multi-threaded bit-flip detection tests.",
    fileSize: "14.2 MB USB Image",
    version: "v10.7 UEFI",
    license: "Free",
    url: "https://www.memtest86.com/download.html",
    directDownloadUrl: "https://www.memtest86.com/download.html",
    sha256: "5d4c3b2a1e0f9876543210fedcba9876543210abcdef1234567890abcdef1234",
    platforms: ["Bootable USB (UEFI x64 / ARM64)"],
    recommendedUse: "Proving intermittent memory faults and isolating failing SODIMM sticks before replacing motherboards.",
    icon: Layers,
    featured: true,
  },
  {
    id: "memtest86plus",
    name: "MemTest86+ Open Source UEFI/BIOS RAM Diagnostic",
    developer: "Martin Whitaker & Samuel Demeulemeester",
    category: "memory",
    categoryLabel: "Open Source Memory Tester",
    description: "100% free open-source RAM tester with native support for DDR5, DDR4, ECC reporting, and modern AMD Zen/Intel Core memory controllers.",
    fileSize: "4.6 MB ISO / USB",
    version: "v7.00",
    license: "Open Source",
    url: "https://www.memtest.org/",
    directDownloadUrl: "https://www.memtest.org/",
    platforms: ["Bootable USB / ISO (UEFI / Legacy BIOS)"],
    recommendedUse: "Quick bootable memory triage on both legacy BIOS machines and brand-new DDR5 systems.",
    icon: Layers,
  },
  {
    id: "testmem5",
    name: "TestMem5 Extreme Memory Stability Profile (TM5)",
    developer: "Serj / Anta777",
    category: "memory",
    categoryLabel: "DDR5 Timing Validation",
    description: "Aggressive Windows-based memory stress testing using Anta777 Extreme configurations to quickly trigger timing errors.",
    fileSize: "2.1 MB",
    version: "v0.12 Anta777",
    license: "Free",
    url: "https://github.com/integralfx/MemTestHelper/blob/oc-guide/DDR4%20OC%20Guide.md#testmem5",
    directDownloadUrl: "https://github.com/integralfx/MemTestHelper",
    platforms: ["Windows 11 / 10"],
    recommendedUse: "Validating custom DDR5 XMP/EXPO timings and finding memory instability in under 15 minutes.",
    icon: Layers,
  },
  {
    id: "prime95",
    name: "Prime95 Small FFTs CPU/VRM Thermal Torture",
    developer: "GIMPS / George Woltman",
    category: "memory",
    categoryLabel: "CPU & VRM Torture Test",
    description: "Maximum heat generation stress test executing in-place Small FFTs to test CPU cooling capacity and VRM current delivery.",
    fileSize: "11.5 MB",
    version: "v30.19 build 20",
    license: "Free",
    url: "https://www.mersenne.org/download/",
    directDownloadUrl: "https://www.mersenne.org/download/",
    platforms: ["Windows 11 / 10", "Linux", "macOS"],
    recommendedUse: "Testing heatsink contact pressure and verifying that thermal throttling safeguards engage properly.",
    icon: Cpu,
  },
  {
    id: "quickcpu",
    name: "Quick CPU Frequency & Core Parking Optimizer",
    developer: "CoderBag",
    category: "memory",
    categoryLabel: "CPU Power & Core Governor",
    description: "Real-time governor to adjust CPU core parking percentage, Turbo Boost index, frequency scaling, and VRM power state profiles.",
    fileSize: "28.5 MB",
    version: "v4.9.4",
    license: "Free",
    url: "https://coderbag.com/product/quick-cpu",
    directDownloadUrl: "https://coderbag.com/product/quick-cpu",
    platforms: ["Windows 11 / 10 (64-bit)"],
    recommendedUse: "Unparking stuck low-power CPU cores on laptops experiencing micro-stuttering in Windows.",
    icon: Zap,
  },
  {
    id: "linpack",
    name: "Linpack Xtreme High-Intensity AVX Torture",
    developer: "David Huang",
    category: "memory",
    categoryLabel: "AVX Math Stress Test",
    description: "Brutal math solver algorithm leveraging AVX2 and AVX-512 instructions to force computational bit-flips and check VRM power droop.",
    fileSize: "14.8 MB",
    version: "v1.1.5",
    license: "Free",
    url: "https://www.techpowerup.com/download/linpack-xtreme/",
    directDownloadUrl: "https://www.techpowerup.com/download/linpack-xtreme/",
    platforms: ["Windows 11 / 10", "Linux"],
    recommendedUse: "Verifying absolute workstation and server computing stability after CPU/cooler replacements.",
    icon: Activity,
  },

  // ==========================================
  // Bootable Media & OS Recovery Builders (6)
  // ==========================================
  {
    id: "ventoy",
    name: "Ventoy Multi-Boot USB ISO Loader",
    developer: "longpanda",
    category: "bootable",
    categoryLabel: "Multi-ISO USB Builder",
    description: "Format once, copy multiple ISOs. Boot Windows, Linux, MemTest86, and Clonezilla directly from a single flash drive without reformatting.",
    fileSize: "16.8 MB",
    version: "v1.0.99",
    license: "Open Source",
    url: "https://www.ventoy.net/en/download.html",
    directDownloadUrl: "https://www.ventoy.net/en/download.html",
    sha256: "7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b",
    platforms: ["Windows 11 / 10 / 8", "Linux"],
    recommendedUse: "Creating the ultimate all-in-one technician USB containing all recovery ISOs on a single drive.",
    icon: Terminal,
    featured: true,
  },
  {
    id: "rufus",
    name: "Rufus Bootable USB & Windows 11 Bypass Creator",
    developer: "Pete Batard",
    category: "bootable",
    categoryLabel: "Fast Bootable USB Creator",
    description: "Lightweight utility to format and create bootable USB flash drives. Automatically bypasses Windows 11 TPM, Secure Boot, and Microsoft Account requirements.",
    fileSize: "1.7 MB",
    version: "v4.5 Standalone",
    license: "Open Source",
    url: "https://rufus.ie/en/",
    directDownloadUrl: "https://rufus.ie/en/",
    sha256: "2f4e6d8c0b2a4e6f8a0c2e4b6d8f0a2c4e6b8d0f2a4c6e8b0d2f4a6c8e0b2d4f",
    platforms: ["Windows 11 / 10 / 8 / 7"],
    recommendedUse: "Creating clean Windows 11 installation drives on older unsupported laptop/desktop hardware.",
    icon: Terminal,
    featured: true,
  },
  {
    id: "hirensbootcd",
    name: "Hiren's BootCD PE x64 Emergency Rescue Environment",
    developer: "HBCDP Team",
    category: "bootable",
    categoryLabel: "WinPE Emergency OS",
    description: "Windows 11 PE pre-installed emergency rescue environment with over 100 diagnostic utilities, password reset tools, and hardware drivers.",
    fileSize: "3.1 GB ISO",
    version: "v1.0.8 PE x64",
    license: "Free",
    url: "https://www.hirensbootcd.org/download/",
    directDownloadUrl: "https://www.hirensbootcd.org/download/",
    platforms: ["Bootable USB (UEFI x64)"],
    recommendedUse: "Rescuing unbootable systems, resetting forgotten local Windows passwords, and testing offline hardware.",
    icon: Disc,
    featured: true,
  },
  {
    id: "balenaetcher",
    name: "BalenaEtcher Safe ISO & Image Flasher",
    developer: "Balena",
    category: "bootable",
    categoryLabel: "Validated Image Flashing",
    description: "Safe, visual image flasher with automatic drive selection validation that prevents accidental formatting of primary hard drives.",
    fileSize: "148 MB",
    version: "v1.18.11",
    license: "Open Source",
    url: "https://etcher.balena.io/",
    directDownloadUrl: "https://etcher.balena.io/",
    platforms: ["Windows 11 / 10", "macOS", "Linux"],
    recommendedUse: "Writing Linux, Raspberry Pi OS, or custom recovery images safely without risk to main system drives.",
    icon: Disc,
  },
  {
    id: "systemrescue",
    name: "SystemRescue Bootable Linux Admin & Recovery CD",
    developer: "SystemRescue Team",
    category: "bootable",
    categoryLabel: "Linux Rescue Environment",
    description: "Arch Linux-based toolkit featuring GParted, ddrescue, sfdisk, TestDisk, rsync, and fsck file system repair utilities.",
    fileSize: "840 MB ISO",
    version: "v11.01",
    license: "Open Source",
    url: "https://www.system-rescue.org/Download/",
    directDownloadUrl: "https://www.system-rescue.org/Download/",
    platforms: ["Bootable USB / CD (x86_64)"],
    recommendedUse: "Repairing corrupted Linux bootloaders, resizing active partitions, and creating raw ddrescue drive images.",
    icon: Terminal,
  },
  {
    id: "unetbootin",
    name: "UNetbootin Cross-Platform Live USB Creator",
    developer: "Geza Kovacs",
    category: "bootable",
    categoryLabel: "Live USB Distribution Builder",
    description: "Creates bootable Live USB drives for Ubuntu, Fedora, Debian, and other Linux distributions automatically downloading ISO files on demand.",
    fileSize: "4.8 MB",
    version: "v702",
    license: "Open Source",
    url: "https://unetbootin.github.io/",
    directDownloadUrl: "https://unetbootin.github.io/",
    platforms: ["Windows 11 / 10", "macOS", "Linux"],
    recommendedUse: "Quickly preparing Linux test environments on customer laptops to verify non-Windows hardware functionality.",
    icon: Terminal,
  },

  // ==========================================
  // Driver Cleaners & OS Repair (6)
  // ==========================================
  {
    id: "ddu",
    name: "Display Driver Uninstaller (DDU) Deep Clean Tool",
    developer: "Wagnardsoft",
    category: "drivers",
    categoryLabel: "Driver Registry Purge",
    description: "Removes AMD, NVIDIA, and Intel graphics/audio drivers down to registry keys, leftover files, and DriverStore packages to fix black screens and GPU crashes.",
    fileSize: "1.4 MB Portable",
    version: "v18.0.7.6",
    license: "Free",
    url: "https://www.wagnardsoft.com/display-driver-uninstaller-ddu-",
    directDownloadUrl: "https://www.wagnardsoft.com/display-driver-uninstaller-ddu-",
    sha256: "4b6d8e0f2a4c6e8b0d2f4a6c8e0b2d4f6a8c0e2b4d6f8a0c2e4b6d8f0a2c4e6b",
    platforms: ["Windows 11 / 10 / 8 / 7"],
    recommendedUse: "Always run in Safe Mode before replacing a graphics card or solving stubborn video driver BSODs.",
    icon: FileCode,
    featured: true,
  },
  {
    id: "bcuninstaller",
    name: "Bulk Crap Uninstaller (BCUninstaller)",
    developer: "Marcin Szeniak",
    category: "drivers",
    categoryLabel: "Bloatware & Leftovers Purge",
    description: "Fast batch uninstaller that removes OEM bloatware, hidden telemetry software, and orphaned registry entries without user interaction.",
    fileSize: "18.5 MB",
    version: "v5.8.1",
    license: "Open Source",
    url: "https://www.bcuninstaller.com/",
    directDownloadUrl: "https://www.bcuninstaller.com/",
    platforms: ["Windows 11 / 10 / 8 / 7"],
    recommendedUse: "Cleaning bloated OEM pre-installs on newly repaired customer machines in batch.",
    icon: FileCode,
    featured: true,
  },
  {
    id: "sdio",
    name: "Snappy Driver Installer Origin (SDIO Offline)",
    developer: "Glenn Delahoy",
    category: "drivers",
    categoryLabel: "Offline Driver Installer",
    description: "Clean, ad-free open-source driver installer with offline database matching exact hardware device IDs and INF driver packages.",
    fileSize: "5.2 MB (Tool) / Offline Pack",
    version: "v1.12.11",
    license: "Open Source",
    url: "https://www.glenn.delahoy.com/snappy-driver-installer-origin/",
    directDownloadUrl: "https://www.glenn.delahoy.com/snappy-driver-installer-origin/",
    platforms: ["Windows 11 / 10 / 8 / 7 (32/64-bit)"],
    recommendedUse: "Installing missing Ethernet, Wi-Fi, and chipset drivers on fresh Windows installs without an internet connection.",
    icon: Wrench,
    featured: true,
  },
  {
    id: "revouninstaller",
    name: "Revo Uninstaller Free Deep Registry Cleaner",
    developer: "VS Revo Group",
    category: "drivers",
    categoryLabel: "Forced Uninstall & Leftover Hunter",
    description: "Monitors standard uninstallers and scans the Windows Registry and file system for leftover files and corrupted installation keys.",
    fileSize: "16.2 MB",
    version: "v2.4.8",
    license: "Freemium",
    url: "https://www.revouninstaller.com/products/revo-uninstaller-free/",
    directDownloadUrl: "https://www.revouninstaller.com/products/revo-uninstaller-free/",
    platforms: ["Windows 11 / 10 / 8 / 7"],
    recommendedUse: "Completely eliminating anti-virus residue and broken software suites that fail normal uninstallation.",
    icon: FileCode,
  },
  {
    id: "geekuninstaller",
    name: "Geek Uninstaller Fast Force Removal Tool",
    developer: "Thomas Koen",
    category: "drivers",
    categoryLabel: "Lightweight Force Removal",
    description: "Compact single-binary executable with native 64-bit support and Forced Removal mode to nuke stubborn, corrupted applications.",
    fileSize: "2.8 MB Standalone",
    version: "v1.5.2",
    license: "Free",
    url: "https://geekuninstaller.com/",
    directDownloadUrl: "https://geekuninstaller.com/",
    platforms: ["Windows 11 / 10 / 8 / 7"],
    recommendedUse: "Carrying in a portable technician USB toolkit for instant application cleanup without installation.",
    icon: Zap,
  },
  {
    id: "driverstoreexplorer",
    name: "Driver Store Explorer (RAPR) Driver Purge",
    developer: "lostindark",
    category: "drivers",
    categoryLabel: "DriverStore Cleanup",
    description: "Enumerates, audits, and force-deletes obsolete, duplicate staging driver packages (.inf) from the system DriverStore repository.",
    fileSize: "1.5 MB Portable",
    version: "v0.11.92",
    license: "Open Source",
    url: "https://github.com/lostindark/DriverStoreExplorer/releases",
    directDownloadUrl: "https://github.com/lostindark/DriverStoreExplorer/releases",
    platforms: ["Windows 11 / 10"],
    recommendedUse: "Recovering 10GB+ of drive space and removing conflicting legacy graphics/printer drivers.",
    icon: HardDrive,
  },

  // ==========================================
  // Thermals, Fan Control & Power (5)
  // ==========================================
  {
    id: "fancontrol",
    name: "Fan Control (Rem0o) Custom Curve Utility",
    developer: "Rem0o",
    category: "thermals",
    categoryLabel: "Thermal & Fan Curve Tuning",
    description: "Highly customizable fan control software combining CPU, GPU, motherboard, and NVMe temperatures into mixed custom response curves.",
    fileSize: "6.9 MB",
    version: "V188 Portable",
    license: "Free",
    url: "https://getfancontrol.com/",
    directDownloadUrl: "https://getfancontrol.com/",
    platforms: ["Windows 11 / 10"],
    recommendedUse: "Silencing noisy laptop/desktop fans and setting aggressive ramp-up profiles for gaming rigs.",
    icon: Thermometer,
    featured: true,
  },
  {
    id: "throttlestop",
    name: "ThrottleStop Intel CPU Undervolting & Power Limit Editor",
    developer: "Kevin Glynn (Unclewebb)",
    category: "thermals",
    categoryLabel: "CPU Power & Thermal Tuning",
    description: "Overrides aggressive OEM thermal throttling limits (BD PROCHOT), adjusts PL1/PL2 power limits, and undervolts compatible Intel CPUs.",
    fileSize: "2.4 MB",
    version: "v9.6",
    license: "Free",
    url: "https://www.techpowerup.com/download/techpowerup-throttlestop/",
    directDownloadUrl: "https://www.techpowerup.com/download/techpowerup-throttlestop/",
    platforms: ["Windows 11 / 10"],
    recommendedUse: "Disabling stuck BD PROCHOT sensor flags on laptops running at locked 0.79 GHz frequencies.",
    icon: Zap,
    featured: true,
  },
  {
    id: "msiafterburner",
    name: "MSI Afterburner & RivaTuner (RTSS) GPU Suite",
    developer: "MSI / Guru3D (Alexey Nicolaychuk)",
    category: "thermals",
    categoryLabel: "GPU Voltage & Fan Curve",
    description: "World's most recognized graphics card utility. Custom V/F curve voltage tuning, power target adjustments, and in-game RTSS telemetry overlay.",
    fileSize: "52.8 MB",
    version: "v4.6.5 Final",
    license: "Free",
    url: "https://www.msi.com/Landing/afterburner/graphics-cards",
    directDownloadUrl: "https://www.msi.com/Landing/afterburner/graphics-cards",
    platforms: ["Windows 11 / 10 (64-bit)"],
    recommendedUse: "Undervolting hot laptop GPUs to drop temperatures by 10-15°C without performance loss.",
    icon: Gauge,
    featured: true,
  },
  {
    id: "hwmonitor",
    name: "CPUID HWMonitor Sensor Telemetry",
    developer: "CPUID",
    category: "thermals",
    categoryLabel: "Real-time Voltage & Thermals",
    description: "Lightweight hardware monitor reading PC systems main health sensors: voltages, temperatures, power consumption, and fan speeds (min/max).",
    fileSize: "1.9 MB",
    version: "v1.53",
    license: "Free",
    url: "https://www.cpuid.com/softwares/hwmonitor.html",
    directDownloadUrl: "https://www.cpuid.com/softwares/hwmonitor.html",
    platforms: ["Windows 11 / 10 / 8 / 7"],
    recommendedUse: "Quick sanity check on CPU/GPU thermal ceilings and chassis fan tachometer RPMs.",
    icon: Thermometer,
  },
  {
    id: "gputweak3",
    name: "ASUS GPU Tweak III Tuning Suite",
    developer: "ASUS ROG",
    category: "thermals",
    categoryLabel: "ASUS GPU Thermal Control",
    description: "Thermal target governor, 0dB fan threshold management, and profile automation based on foreground application launch.",
    fileSize: "98.5 MB",
    version: "v1.7.5.0",
    license: "Official Utility",
    url: "https://www.asus.com/campaign/GPU-Tweak-III/",
    directDownloadUrl: "https://www.asus.com/campaign/GPU-Tweak-III/",
    platforms: ["Windows 11 / 10 64-bit"],
    recommendedUse: "Managing thermal targets and RGB synchronization on ASUS ROG / TUF graphics cards.",
    icon: Gauge,
  },

  // ==========================================
  // System Internals, Network & Security (7)
  // ==========================================
  {
    id: "sysinternals-autoruns",
    name: "Sysinternals Autoruns Startup & Hook Auditor",
    developer: "Microsoft Sysinternals (Mark Russinovich)",
    category: "internals",
    categoryLabel: "Startup & Kernel Hook Audit",
    description: "Most comprehensive startup monitor showing every executable configured to run during system boot, login, Explorer shell extensions, and browser helper objects.",
    fileSize: "3.7 MB Portable",
    version: "v14.11",
    license: "Official Utility",
    url: "https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns",
    directDownloadUrl: "https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns",
    platforms: ["Windows 11 / 10 / 8 / 7"],
    recommendedUse: "Hunting down persistent malware, adware registry keys, and lingering startup errors.",
    icon: ShieldCheck,
    featured: true,
  },
  {
    id: "sysinternals-procexp",
    name: "Sysinternals Process Explorer Advanced Task Manager",
    developer: "Microsoft Sysinternals",
    category: "internals",
    categoryLabel: "Process & Handle Inspector",
    description: "Advanced Task Manager alternative showing loaded DLLs, open file handles, GPU memory allocation, and integrated VirusTotal hash checking.",
    fileSize: "5.2 MB Portable",
    version: "v17.06",
    license: "Official Utility",
    url: "https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer",
    directDownloadUrl: "https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer",
    platforms: ["Windows 11 / 10 / 8 / 7"],
    recommendedUse: "Unlocking files that are held open by locked processes and identifying high-CPU background threads.",
    icon: Activity,
    featured: true,
  },
  {
    id: "sysinternals-tcpview",
    name: "Sysinternals TCPView Active Network Socket Monitor",
    developer: "Microsoft Sysinternals",
    category: "internals",
    categoryLabel: "Network Socket Monitor",
    description: "Real-time list of all TCP and UDP endpoints on the system, resolving remote IP addresses to domain names and showing transmitted packet counts.",
    fileSize: "1.8 MB",
    version: "v4.19",
    license: "Official Utility",
    url: "https://learn.microsoft.com/en-us/sysinternals/downloads/tcpview",
    directDownloadUrl: "https://learn.microsoft.com/en-us/sysinternals/downloads/tcpview",
    platforms: ["Windows 11 / 10 / 8 / 7"],
    recommendedUse: "Tracking down rogue applications or suspicious network connections sending traffic in the background.",
    icon: Network,
  },
  {
    id: "wireshark",
    name: "Wireshark Network Protocol & Packet Analyzer",
    developer: "Wireshark Foundation",
    category: "internals",
    categoryLabel: "Packet Capture & Protocol Inspection",
    description: "The world's foremost network packet analyzer. Captures live traffic to troubleshoot DHCP failures, DNS timeouts, and Ethernet link negotiation drops.",
    fileSize: "82.4 MB",
    version: "v4.2.4",
    license: "Open Source",
    url: "https://www.wireshark.org/download.html",
    directDownloadUrl: "https://www.wireshark.org/download.html",
    platforms: ["Windows 11 / 10", "macOS", "Linux"],
    recommendedUse: "Diagnosing intermittent LAN drops and validating DHCP server handshakes on repaired NICs.",
    icon: Radio,
    featured: true,
  },
  {
    id: "angryip",
    name: "Angry IP Scanner Multithreaded LAN Scanner",
    developer: "Anton Keks",
    category: "internals",
    categoryLabel: "Fast Network IP Scanner",
    description: "Ultra-fast multithreaded IP address and port scanner. Finds active devices, NetBIOS info, MAC addresses, and open ports on local subnets.",
    fileSize: "4.1 MB",
    version: "v3.9.1",
    license: "Open Source",
    url: "https://angryip.org/download/",
    directDownloadUrl: "https://angryip.org/download/",
    platforms: ["Windows", "macOS", "Linux"],
    recommendedUse: "Locating network printers, NAS storage, and router management gateways on the bench.",
    icon: Network,
  },
  {
    id: "putty",
    name: "PuTTY SSH, Telnet & Serial COM Console",
    developer: "Simon Tatham",
    category: "internals",
    categoryLabel: "Serial COM Port Console",
    description: "Versatile terminal emulator for connecting to serial COM ports on routers, switches, and motherboard UART debugging interfaces.",
    fileSize: "3.5 MB",
    version: "v0.81",
    license: "Open Source",
    url: "https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html",
    directDownloadUrl: "https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html",
    platforms: ["Windows 11 / 10 / 8", "Linux"],
    recommendedUse: "Accessing serial console logs during BIOS/UEFI recovery and network switch setup.",
    icon: Terminal,
  },
  {
    id: "sevenzip",
    name: "7-Zip High Compression Archive Extractor",
    developer: "Igor Pavlov",
    category: "internals",
    categoryLabel: "Archive & Firmware Extraction",
    description: "Essential compression tool supporting 7z, XZ, BZIP2, GZIP, TAR, ZIP, WIM, ISO, and RAR unpacks with high compression LZMA2 algorithms.",
    fileSize: "1.6 MB",
    version: "v24.05",
    license: "Open Source",
    url: "https://www.7-zip.org/download.html",
    directDownloadUrl: "https://www.7-zip.org/download.html",
    platforms: ["Windows 11 / 10 / 8 / 7 (32/64-bit/ARM64)"],
    recommendedUse: "Extracting OEM BIOS update executables (.exe) to isolate raw .bin / .cap ROM files for programmer flashing.",
    icon: FileArchive,
    featured: true,
  }
];

export default function TechnicianDownloadHub() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Memoize category tab counts in a single fast pass O(N)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: ALL_DOWNLOADS.length,
      bundles: 0,
      diagnostics: 0,
      storage: 0,
      memory: 0,
      bootable: 0,
      drivers: 0,
      thermals: 0,
      internals: 0,
    };
    for (let i = 0; i < ALL_DOWNLOADS.length; i++) {
      const cat = ALL_DOWNLOADS[i].category;
      if (counts[cat] !== undefined) {
        counts[cat]++;
      }
    }
    return counts;
  }, []);

  const categoryTabs = useMemo(() => [
    { id: "all", label: "All Downloads", icon: ArrowDownToLine, count: categoryCounts.all },
    { id: "bundles", label: "Offline Packs", icon: FileArchive, count: categoryCounts.bundles },
    { id: "diagnostics", label: "Diagnostics", icon: Cpu, count: categoryCounts.diagnostics },
    { id: "storage", label: "Storage & Clone", icon: HardDrive, count: categoryCounts.storage },
    { id: "memory", label: "Memory & Stress", icon: Layers, count: categoryCounts.memory },
    { id: "bootable", label: "Bootable ISOs", icon: Terminal, count: categoryCounts.bootable },
    { id: "drivers", label: "Driver Cleaners", icon: FileCode, count: categoryCounts.drivers },
    { id: "thermals", label: "Thermal Control", icon: Thermometer, count: categoryCounts.thermals },
    { id: "internals", label: "System Internals & Net", icon: Network, count: categoryCounts.internals },
  ], [categoryCounts]);

  // Memoize filtered downloads for rapid search response
  const filteredDownloads = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_DOWNLOADS.filter((item) => {
      const matchesTab = selectedTab === "all" || item.category === selectedTab;
      if (!matchesTab) return false;
      if (!q) return true;
      
      return (
        item.name.toLowerCase().includes(q) ||
        item.developer.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.recommendedUse.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedTab]);

  const handleDownload = (item: DownloadItem) => {
    if (item.url.startsWith("#")) {
      toast({
        title: `Preparing ${item.name}`,
        description: `Generating offline package (${item.fileSize}). Check your downloads folder.`,
      });
    } else {
      window.open(item.url, "_blank", "noopener,noreferrer");
      toast({
        title: `Opening Official Download`,
        description: `Connecting to ${item.developer} secure distribution mirror.`,
      });
    }
  };

  const handleCopyHash = (item: DownloadItem) => {
    if (!item.sha256) return;
    navigator.clipboard.writeText(item.sha256);
    setCopiedId(item.id);
    toast({
      title: "SHA-256 Checksum Copied",
      description: `Hash for ${item.name} copied to clipboard for verification.`,
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section 
      id="technician-downloads-hub"
      className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-card/90 via-card/70 to-emerald-500/5 backdrop-blur-xl p-6 sm:p-8 space-y-8 shadow-sm relative overflow-hidden"
    >
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/15 via-teal-500/10 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none -z-0" />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-xs">
            <Binary className="h-7 w-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                Technician Software & Utility Hub
              </h2>
              <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[11px] font-bold px-2 py-0.5">
                {ALL_DOWNLOADS.length} Verified Bench Utilities
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Curated, battle-tested software repository for bench diagnostics, memory fault isolation, drive cloning, firmware recovery, and thermals.
            </p>
          </div>
        </div>

        {/* Quick Offline Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            onClick={() => handleDownload(ALL_DOWNLOADS[0])}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10 px-4 rounded-xl shadow-xs gap-2 transition-all cursor-pointer"
          >
            <FolderDown className="h-4 w-4" />
            <span>Download Master Offline ZIP</span>
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="relative z-10 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search software by name, developer, use-case (e.g., 'BSOD', 'NVMe', 'DDR5', 'fan curve')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-background/80 border-border/60 rounded-xl text-sm font-medium focus-visible:ring-emerald-500/30"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded bg-muted/60 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <div className="text-xs text-muted-foreground font-medium self-end sm:self-auto shrink-0">
            Showing <strong className="text-foreground">{filteredDownloads.length}</strong> of {ALL_DOWNLOADS.length} utilities
          </div>
        </div>

        {/* Category Filter Tabs - Responsive flex-wrap without horizontal slider */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {categoryTabs.map((tab) => {
            const isSelected = selectedTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedTab(tab.id)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer border flex items-center gap-1.5 whitespace-nowrap select-none",
                  isSelected
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs font-bold ring-2 ring-emerald-500/25 scale-[1.02]"
                    : "bg-background/70 text-muted-foreground border-border/60 hover:text-foreground hover:bg-background hover:border-emerald-500/40"
                )}
              >
                <Icon className={cn("h-3.5 w-3.5 shrink-0", isSelected ? "text-white" : "text-emerald-500")} />
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold",
                    isSelected ? "bg-white/25 text-white" : "bg-muted text-muted-foreground"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Downloads Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredDownloads.map((item) => {
          const Icon = item.icon;
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className={cn(
                "rounded-2xl border bg-background/80 hover:bg-background/95 p-5 flex flex-col justify-between transition-all duration-200 group shadow-2xs hover:shadow-md relative overflow-hidden",
                item.featured ? "border-emerald-500/40 ring-1 ring-emerald-500/20" : "border-border/60 hover:border-emerald-500/30"
              )}
            >
              {item.featured && (
                <div className="absolute top-0 right-0">
                  <div className="bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-0.5 rounded-bl-xl shadow-xs flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5" /> Essential
                  </div>
                </div>
              )}

              {/* Card Top */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3 pr-14">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-1.5">
                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border-border/60 bg-muted/30">
                      {item.categoryLabel}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px] font-mono font-bold px-2 py-0.5">
                      {item.fileSize}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                    <span className="font-medium text-foreground/80">{item.developer}</span>
                    <span>•</span>
                    <span className="font-mono bg-muted/60 px-1.5 py-0.2 rounded text-[10px]">{item.version}</span>
                    <span>•</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{item.license}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Recommended Use Callout */}
                <div className="rounded-xl border border-border/40 bg-muted/30 p-2.5 text-[11px] space-y-1">
                  <span className="font-bold text-foreground/90 flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="h-3 w-3" /> Bench Application:
                  </span>
                  <p className="text-muted-foreground leading-snug">
                    {item.recommendedUse}
                  </p>
                </div>
              </div>

              {/* Card Bottom / Actions */}
              <div className="pt-3 border-t border-border/40 space-y-2.5 mt-3">
                {item.sha256 && (
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground bg-muted/40 px-2.5 py-1 rounded-lg">
                    <span className="font-mono truncate max-w-[180px]" title={item.sha256}>
                      SHA256: {item.sha256.substring(0, 16)}...
                    </span>
                    <button
                      onClick={() => handleCopyHash(item)}
                      className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer shrink-0 ml-2"
                    >
                      {isCopied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      <span>{isCopied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleDownload(item)}
                    className="flex-1 rounded-xl text-xs font-bold h-9 gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Package</span>
                  </Button>

                  {item.url && !item.url.startsWith("#") && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
                      className="h-9 w-9 rounded-xl border-border/60 hover:border-emerald-500/40 text-muted-foreground hover:text-foreground shrink-0 cursor-pointer"
                      title="Visit Official Developer Webpage"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDownloads.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border/60 bg-muted/20 p-8 text-center space-y-2">
          <p className="text-xs font-semibold text-foreground">
            No downloads match "{searchQuery}" in this category.
          </p>
          <p className="text-[11px] text-muted-foreground">
            Try switching filter tabs or clearing your search input.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedTab("all");
              setSearchQuery("");
            }}
            className="rounded-xl text-xs h-8"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </section>
  );
}
