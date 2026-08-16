import { useState } from "react";
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
  HelpCircle,
  Mail,
  Zap,
  RotateCcw
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface SoftwareItem {
  id: string;
  name: string;
  developer: string;
  category: "diagnostics" | "storage" | "memory" | "bootable" | "drivers" | "security" | "thermals";
  description: string;
  url: string;
  directDownloadUrl?: string;
  version: string;
  license: "Free" | "Open Source" | "Freemium" | "Official Utility";
  platforms: string[];
  features: string[];
  recommendedUse: string;
}

const SOFTWARE_DIRECTORY: SoftwareItem[] = [
  // Hardware Diagnostics & Sensors
  {
    id: "hwinfo64",
    name: "HWiNFO64",
    developer: "REALiX",
    category: "diagnostics",
    description: "Industry-standard real-time hardware monitoring and sensor telemetry engine. Tracks voltage rails, VRM thermals, GPU hotspot deltas, and CPU package power.",
    url: "https://www.hwinfo.com/download/",
    version: "v8.0+",
    license: "Free",
    platforms: ["Windows 11 / 10 / 8 / 7"],
    features: ["Real-time sensor telemetry", "Thermal hotspot delta tracking", "CSV data logging & alert triggers", "SMART drive diagnostics"],
    recommendedUse: "Diagnosing thermal throttling, GPU power delivery, and VRM stability under load.",
  },
  {
    id: "cpuz",
    name: "CPU-Z",
    developer: "CPUID",
    category: "diagnostics",
    description: "Lightweight diagnostic freeware that gathers detailed information on CPU stepping, instruction sets, motherboard chipset, and memory SPD timings.",
    url: "https://www.cpuid.com/softwares/cpu-z.html",
    version: "v2.09+",
    license: "Free",
    platforms: ["Windows 11 / 10", "Android"],
    features: ["CPU instruction set breakdown", "Memory SPD table inspection", "Motherboard BIOS revision viewer", "Integrated single/multi-thread benchmark"],
    recommendedUse: "Verifying CPU socket stepping and validating dual-channel RAM frequency configuration.",
  },
  {
    id: "gpuz",
    name: "TechPowerUp GPU-Z",
    developer: "TechPowerUp",
    category: "diagnostics",
    description: "Dedicated graphics subsystem information utility displaying GPU die architectures, VRAM manufacturer (Samsung/Micron/Hynix), PCIe link speed, and BIOS versions.",
    url: "https://www.techpowerup.com/gpuz/",
    version: "v2.58+",
    license: "Free",
    platforms: ["Windows 11 / 10"],
    features: ["PCIe bus link speed tester", "VRAM junction temperature monitoring", "vBIOS firmware backup utility", "12VHPWR pin voltage readings"],
    recommendedUse: "Isolating GPU artifacts, checking PCIe lane bandwidth bottlenecks, and extracting vBIOS roms.",
  },
  {
    id: "libre-hw",
    name: "Libre Hardware Monitor",
    developer: "LibreHardwareMonitor Org",
    category: "diagnostics",
    description: "Free, open-source hardware monitoring fork supporting modern Intel Core Ultra, AMD Ryzen 7000/8000/9000, and NVIDIA RTX 40-series sensors.",
    url: "https://github.com/LibreHardwareMonitor/LibreHardwareMonitor/releases",
    version: "Latest Release",
    license: "Open Source",
    platforms: ["Windows 11 / 10"],
    features: ["100% Free & Open Source", "Custom web server remote telemetry", "Fan speed tachometer readings", "No telemetry tracking"],
    recommendedUse: "Open source hardware monitoring and remote bench diagnostic monitoring.",
  },

  // Storage Diagnostics & Cloning
  {
    id: "crystaldiskinfo",
    name: "CrystalDiskInfo",
    developer: "Hiyohiyo / Crystal Dew World",
    category: "storage",
    description: "HDD and SSD health monitoring utility using S.M.A.R.T. technology. Provides real-time health scoring, bad sector alerts, and temperature status.",
    url: "https://crystalmark.info/en/software/crystaldiskinfo/",
    version: "v9.3+",
    license: "Open Source",
    platforms: ["Windows 11 / 10"],
    features: ["S.M.A.R.T. attribute health interpretation", "0E & 05 bad sector reallocation counter", "NVMe temperature alert triggers", "Total Host Writes calculation"],
    recommendedUse: "Checking if a dying hard drive or degraded SSD is responsible for BSODs or sluggish loading.",
  },
  {
    id: "crystaldiskmark",
    name: "CrystalDiskMark",
    developer: "Crystal Dew World",
    category: "storage",
    description: "Industry-standard disk benchmark utility measuring sequential and random read/write throughput (Q8T1, Q32T1, and Random 4K).",
    url: "https://crystalmark.info/en/software/crystaldiskmark/",
    version: "v8.0+",
    license: "Open Source",
    platforms: ["Windows 11 / 10"],
    features: ["Sequential Read/Write MB/s", "Random 4K IOPS throughput testing", "Real World NVMe testing profile", "Peak performance validation"],
    recommendedUse: "Validating that newly installed Gen4/Gen5 SSDs achieve their advertised speeds.",
  },
  {
    id: "clonezilla",
    name: "Clonezilla Live",
    developer: "Steven Shiau / NCHC Free Software Lab",
    category: "storage",
    description: "Bare-metal partition and disk imaging/cloning tool. Allows sector-by-sector drive duplication and backup restoration via bootable Linux USB.",
    url: "https://clonezilla.org/downloads.php",
    version: "v3.1+",
    license: "Open Source",
    platforms: ["Bootable USB (All OS)"],
    features: ["Bare-metal drive cloning", "Unused block compression", "GPT and MBR partition support", "Encrypted backup archives"],
    recommendedUse: "Cloning a failing hard drive to a fresh SSD without booting into the infected/damaged OS.",
  },
  {
    id: "macrium-reflect",
    name: "Macrium Reflect Free / Rescue Media",
    developer: "Paramount Software UK",
    category: "storage",
    description: "Robust Windows partition backup, disk imaging, and live volume cloning software with WinPE recovery builder.",
    url: "https://www.macrium.com/reflectfree",
    version: "v8.1+",
    license: "Freemium",
    platforms: ["Windows 11 / 10"],
    features: ["Live OS cloning while Windows is running", "Automatic partition alignment", "WinPE USB Rescue Media creation", "Differential image backup"],
    recommendedUse: "Migrating Windows installation from a small SSD to a larger M.2 NVMe drive.",
  },

  // Memory & CPU Stress Testing
  {
    id: "memtest86",
    name: "PassMark MemTest86",
    developer: "PassMark Software",
    category: "memory",
    description: "The gold standard for memory diagnostics. Boots independently of the OS from a USB drive to test RAM using advanced fault-detection algorithms.",
    url: "https://www.memtest86.com/download.html",
    version: "v10.7+",
    license: "Free",
    platforms: ["UEFI Bootable USB"],
    features: ["13 rigorous memory test algorithms", "ECC memory error injection detection", "Row hammer susceptibility testing", "HTML diagnostic report generator"],
    recommendedUse: "Isolating bad RAM sticks, damaged CPU memory controller pins, or unstable XMP/EXPO overclocking.",
  },
  {
    id: "prime95",
    name: "Prime95 (Mersenne.org)",
    developer: "George Woltman",
    category: "memory",
    description: "Heavy CPU stress testing and mathematical validation tool. Uses Fast Fourier Transforms (FFT) to stress CPU caches, memory controllers, and VRM power.",
    url: "https://www.mersenne.org/download/",
    version: "v30.19+",
    license: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    features: ["Small FFTs for maximum CPU thermal load", "Blend test for memory sub-system stability", "Instant hardware error roundoff detection"],
    recommendedUse: "Thermal torture testing of newly installed CPU coolers and testing VRM thermal throttling.",
  },
  {
    id: "occt",
    name: "OCCT (OverClock Checking Tool)",
    developer: "OCBASE",
    category: "memory",
    description: "All-in-one stability testing suite with dedicated tests for CPU, GPU, VRAM, RAM, and Power Supply Unit (PSU) transient load testing.",
    url: "https://www.ocbase.com/download",
    version: "v13.1+",
    license: "Free",
    platforms: ["Windows 11 / 10"],
    features: ["Dedicated PSU full-load test", "VRAM 3D memory error detection", "Real-time error counter with audio alert", "Hardware sensor graphing"],
    recommendedUse: "Diagnosing random PC shutdowns under load and testing PSU 12V rail voltage drop.",
  },

  // Bootable Media & OS Recovery
  {
    id: "rufus",
    name: "Rufus USB Utility",
    developer: "Pete Batard / Akeo Consulting",
    category: "bootable",
    description: "The fastest, most reliable utility to format and create bootable USB flash drives for Windows, Linux, FreeDOS, and BIOS updates.",
    url: "https://rufus.ie/",
    version: "v4.5+",
    license: "Open Source",
    platforms: ["Windows 11 / 10"],
    features: ["GPT UEFI boot creation", "Bypass Windows 11 TPM & Secure Boot checks", "Direct Windows ISO downloader", "Zero bloat, single executable"],
    recommendedUse: "Creating clean Windows 11/10 installation USB media and bootable diagnostics.",
  },
  {
    id: "ventoy",
    name: "Ventoy Multi-Boot",
    developer: "Ventoy Team",
    category: "bootable",
    description: "Revolutionary open-source multi-boot USB tool. Simply copy multiple ISO, WIM, IMG, and VHD files onto the flash drive to boot directly from a menu.",
    url: "https://www.ventoy.net/en/download.html",
    version: "v1.0.99+",
    license: "Open Source",
    platforms: ["Windows", "Linux"],
    features: ["Direct ISO booting without reformatting", "Store 20+ OS installers on one 64GB USB", "UEFI Secure Boot support", "Live Linux persistence support"],
    recommendedUse: "Technician swiss-army USB containing Windows 11, Windows 10, Ubuntu, MemTest86, and Clonezilla.",
  },

  // Driver Cleanup & System Repair
  {
    id: "ddu",
    name: "Display Driver Uninstaller (DDU)",
    developer: "Wagnardsoft",
    category: "drivers",
    description: "Driver removal tool that completely uninstalls AMD, NVIDIA, and Intel display and audio drivers from the Windows registry, filesystem, and driver store.",
    url: "https://www.wagnardsoft.com/display-driver-uninstaller-ddu-",
    version: "v18.0+",
    license: "Free",
    platforms: ["Windows 11 / 10 (Safe Mode)"],
    features: ["Complete registry and driver store purge", "Prevents Windows Update driver overwriting", "Dedicated Safe Mode auto-reboot", "Audio driver cleanup"],
    recommendedUse: "Fixing driver crash loops, black screens, GPU stuttering, or preparing for a new GPU installation.",
  },
  {
    id: "sdio",
    name: "Snappy Driver Installer Origin (SDIO)",
    developer: "Glenn Delahoy",
    category: "drivers",
    description: "Clean, open-source driver updater tool that finds and installs missing device drivers without unwanted adware or telemetry.",
    url: "https://www.snappy-driver-installer.org/",
    version: "Latest Origin",
    license: "Open Source",
    platforms: ["Windows 11 / 10 / 8 / 7 / XP"],
    features: ["Full offline driver packs available", "No bundleware or tracking", "Driver backup & restore points", "Algorithm matching accurate hardware IDs"],
    recommendedUse: "Finding rare legacy laptop touchpad, audio, or Wi-Fi drivers after a fresh OS installation.",
  },

  // Thermals & Fan Management
  {
    id: "fancontrol",
    name: "FanControl",
    developer: "Rem0o",
    category: "thermals",
    description: "Highly focused fan management software allowing complete control over motherboard, GPU, and AIO fan curves using any temperature sensor.",
    url: "https://getfancontrol.com/",
    version: "v180+",
    license: "Free",
    platforms: ["Windows 11 / 10"],
    features: ["Mix CPU & GPU temperatures in fan curve", "Linear, Graph, and Step curve editors", "Support for Corsair, NZXT & Lian Li hubs", "Low background CPU overhead"],
    recommendedUse: "Eliminating loud laptop fan cycling and creating quiet custom fan curves for gaming desktops.",
  },
  {
    id: "msi-afterburner",
    name: "MSI Afterburner & RivaTuner",
    developer: "MSI / Alexey Nicolaychuk (Unwinder)",
    category: "thermals",
    description: "The most widely used graphics card tuning utility. Allows GPU undervolting, custom fan curves, FPS limiting, and on-screen hardware telemetry.",
    url: "https://www.msi.com/Landing/afterburner/graphics-cards",
    version: "v4.6.5+",
    license: "Free",
    platforms: ["Windows 11 / 10"],
    features: ["V/F Curve Undervolting for lower temps", "RTSS On-Screen Display (OSD) overlay", "GPU core/memory clock tuning", "Power limit calibration"],
    recommendedUse: "Undervolting hot GPUs to reduce temperatures by 10-15°C with zero performance loss.",
  },

  // Security & Malware Removal
  {
    id: "adwcleaner",
    name: "Malwarebytes AdwCleaner",
    developer: "Malwarebytes",
    category: "security",
    description: "Fast, specialized utility to search for and delete Adware, Toolbars, Potentially Unwanted Programs (PUPs), and browser hijackers.",
    url: "https://www.malwarebytes.com/adwcleaner",
    version: "v8.4+",
    license: "Free",
    platforms: ["Windows 11 / 10"],
    features: ["No installation required (portable)", "Browser proxy and Winsock reset", "Registry hijacker cleanup", "Fast 2-minute scanning speed"],
    recommendedUse: "Cleaning browser popups, fake antivirus warnings, and browser search engine redirects.",
  },
  {
    id: "sysinternals",
    name: "Microsoft Sysinternals Suite",
    developer: "Mark Russinovich / Microsoft",
    category: "security",
    description: "Comprehensive suite of Windows technical utilities including Process Explorer, Autoruns, TCPView, and ProcMon for analyzing operating system internals.",
    url: "https://learn.microsoft.com/en-us/sysinternals/downloads/sysinternals-suite",
    version: "Official Microsoft",
    license: "Free",
    platforms: ["Windows 11 / 10"],
    features: ["Process Explorer with VirusTotal lookup", "Autoruns startup persistence inspector", "TCPView live network port connections", "Disk2vhd virtualization tool"],
    recommendedUse: "Identifying hidden crypto-miners, rogue background services, and locking file handles.",
  },
];

export default function SoftwareTools() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const categories = [
    { id: "all", name: "All Software", count: SOFTWARE_DIRECTORY.length, icon: Sparkles },
    { id: "diagnostics", name: "Hardware & Telemetry", count: SOFTWARE_DIRECTORY.filter(s => s.category === "diagnostics").length, icon: Cpu },
    { id: "storage", name: "Storage & Cloning", count: SOFTWARE_DIRECTORY.filter(s => s.category === "storage").length, icon: HardDrive },
    { id: "memory", name: "Memory & Stress Testing", count: SOFTWARE_DIRECTORY.filter(s => s.category === "memory").length, icon: Layers },
    { id: "bootable", name: "Bootable OS Media", count: SOFTWARE_DIRECTORY.filter(s => s.category === "bootable").length, icon: Terminal },
    { id: "drivers", name: "Driver Management", count: SOFTWARE_DIRECTORY.filter(s => s.category === "drivers").length, icon: FileCode },
    { id: "thermals", name: "Fans & Undervolting", count: SOFTWARE_DIRECTORY.filter(s => s.category === "thermals").length, icon: Zap },
    { id: "security", name: "Malware & Sysinternals", count: SOFTWARE_DIRECTORY.filter(s => s.category === "security").length, icon: ShieldCheck },
  ];

  const filteredSoftware = SOFTWARE_DIRECTORY.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch = 
      item.name.toLowerCase().includes(q) ||
      item.developer.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.recommendedUse.toLowerCase().includes(q) ||
      item.features.some(f => f.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const handleLaunch = (url: string, name: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    toast({
      title: `Opening ${name}`,
      description: "Redirecting to official verified download portal in a new tab.",
    });
  };

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast({
      title: "Download link copied!",
      description: "Direct official URL saved to your clipboard.",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/90 via-card/50 to-emerald-500/10 border border-emerald-500/30 p-6 sm:p-10 shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5" /> Verified Download Repository
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Essential Technician Software & <span className="text-emerald-500">Download Hub</span>
          </h1>

          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            Centralized repository for verified diagnostic software, bootable ISO utilities, bare-metal drive cloners, driver cleaners, and complete offline JCRguru repair manual bundles.
          </p>

          {/* Quick Search */}
          <div className="pt-2 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools (e.g. MemTest, DDU, CrystalDisk, Rufus, GPU-Z, Undervolt)..."
                className="w-full pl-11 pr-4 h-11 rounded-2xl bg-background/90 border-border/60 text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-emerald-500/30"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Filter */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Filter by Diagnostic Domain
          </h2>
          {selectedCategory !== "all" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className="text-xs text-muted-foreground hover:text-foreground h-7"
            >
              Reset Category
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-semibold transition-all",
                  isSelected
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-card/60 hover:bg-muted border-border/60 text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn("h-3.5 w-3.5", isSelected ? "text-white" : "text-emerald-500")} />
                <span>{cat.name}</span>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-bold",
                  isSelected ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                )}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Software Catalog Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing {filteredSoftware.length} verified software tools</span>
          <span className="flex items-center gap-1.5 text-emerald-500 font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5" /> All links route to official developer servers
          </span>
        </div>

        {filteredSoftware.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSoftware.map((item) => {
              return (
                <div
                  key={item.id}
                  className="group rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl p-6 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-lg transition-all duration-300 space-y-4"
                >
                  <div className="space-y-3">
                    
                    {/* Top Row: Icon, Title & License Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-foreground group-hover:text-emerald-500 transition-colors">
                            {item.name}
                          </h3>
                        </div>
                        <span className="text-[11px] text-muted-foreground font-medium">
                          by {item.developer} • {item.version}
                        </span>
                      </div>

                      <Badge 
                        variant="secondary" 
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0"
                      >
                        {item.license}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-foreground/80 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Key Features List */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                        Capabilities & Features:
                      </span>
                      <ul className="space-y-1">
                        {item.features.map((feat, idx) => (
                          <li key={idx} className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                            <Check className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommended Scenario */}
                    <div className="p-2.5 rounded-2xl bg-muted/40 border border-border/40 text-[11px] text-foreground/80 space-y-0.5">
                      <span className="font-bold text-primary block text-[10px] uppercase tracking-wider">
                        Technician Use Case:
                      </span>
                      <span>{item.recommendedUse}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <Button
                      onClick={() => handleLaunch(item.url, item.name)}
                      className="flex-1 rounded-2xl h-10 text-xs font-bold gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download / Official Site</span>
                      <ExternalLink className="h-3 w-3 opacity-70" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopyLink(item.url, item.id)}
                      className="rounded-2xl h-10 w-10 border-border/60 hover:border-emerald-500/50 shrink-0"
                      title="Copy official download link"
                    >
                      {copiedId === item.id ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-muted/20 rounded-3xl border border-dashed border-border/60 space-y-3">
            <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto" />
            <h3 className="text-base font-bold">No software matches your query</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Try searching for common tools like "HWiNFO", "MemTest", "DDU", "Rufus", or select another category filter.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="rounded-2xl text-xs"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </section>

      {/* Safety & Best Practices Footer Banner */}
      <section className="rounded-3xl border border-border/50 bg-card/40 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
          <ShieldCheck className="h-4 w-4" /> Benchmark & Diagnostic Best Practices
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-foreground/80">
          <div className="space-y-1.5 p-4 rounded-2xl bg-background/50 border border-border/40">
            <h4 className="font-bold text-foreground flex items-center gap-1.5">
              1. Isolate Antivirus & Overclocking
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              When running memory testers (MemTest86) or GPU driver cleanups (DDU), execute in UEFI boot mode or Windows Safe Mode for maximum accuracy.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-background/50 border border-border/40">
            <h4 className="font-bold text-foreground flex items-center gap-1.5">
              2. S.M.A.R.T. Health Verification
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Monitor attribute `05 (Reallocated Sectors Count)` and `0E (Media and Data Integrity Errors)`. Any non-zero raw value indicates impending drive failure.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-background/50 border border-border/40">
            <h4 className="font-bold text-foreground flex items-center gap-1.5">
              3. Data Backup Precaution
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Before flashing BIOS or running partition table modifications, ensure all customer personal files and recovery keys (BitLocker) are securely backed up.
            </p>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-primary/5 p-6 text-center space-y-3">
        <h3 className="text-base font-bold">Need a specific technician utility added to the catalog?</h3>
        <p className="text-xs text-muted-foreground max-w-lg mx-auto">
          We continually verify and expand our curated list of non-copyright, free, and open-source repair tools.
        </p>
        <a 
          href="mailto:JCRguideproofficial@gmail.com"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Mail className="h-3.5 w-3.5" />
          <span>Contact App Support: JCRguideproofficial@gmail.com</span>
        </a>
      </section>

    </div>
  );
}
