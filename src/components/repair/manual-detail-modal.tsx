import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Printer, 
  Copy, 
  Check, 
  Layers, 
  BookOpen, 
  Cpu, 
  Code, 
  Eraser, 
  MoveUp,
  AlertTriangle,
  Zap,
  Wrench,
  ChevronRight,
  Sparkles,
  Search,
  SlidersHorizontal,
  Activity,
  Bookmark
} from "lucide-react";
import { cn } from "@/lib/utils";

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

interface ManualDetailModalProps {
  manual: TechnicalManual | null;
  onClose: () => void;
}

export default function ManualDetailModal({ manual, onClose }: ManualDetailModalProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"reader" | "rails" | "torque" | "safety">("reader");
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [railSearch, setRailSearch] = useState("");

  if (!manual) return null;

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "hardware":
        return { label: "Hardware Manual", icon: Cpu, badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" };
      case "software":
        return { label: "Software Reference", icon: Code, badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" };
      case "cleaning":
        return { label: "Maintenance Protocol", icon: Eraser, badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" };
      case "upgrades":
        return { label: "Upgrade Specification", icon: MoveUp, badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" };
      default:
        return { label: "Service Manual", icon: FileText, badge: "bg-primary/10 text-primary border-primary/20" };
    }
  };

  const theme = getCategoryTheme(manual.category);
  const CategoryIcon = theme.icon;

  // Fallback enriched chapters if manual doesn't define custom ones
  const chapters: ManualChapter[] = manual.chapters || [
    {
      id: "ch-1",
      chapterNumber: 1,
      title: "Architectural Overview & Engineering Specifications",
      subtitle: "System topology, power distribution network (PDN), and component interconnects.",
      paragraphs: [
        `This technical manual documents start-to-finish engineering standards and bench protocols for ${manual.title} (${manual.code}). All procedures are engineered to preserve multi-layer PCB integrity, prevent ESD latency defects, and adhere to strict OEM assembly tolerances.`,
        "Modern mobile and desktop architectures utilize high-density interconnect (HDI) multilayer printed circuit boards with surface mount components down to 0201 metric sizes. Extreme caution is required when applying mechanical or thermal stress to avoid micro-fracturing BGA solder balls beneath CPU, GPU, and system controllers."
      ],
      steps: [
        {
          stepLabel: "1.1 Circuit Topology",
          action: "Inspect primary power sequencing and bus architectures",
          details: "Verify input current paths from DC-in / USB-PD Type-C controller through bidirectional dual N-channel MOSFET switches into the primary common power point (+VBAT / +19V_VIN).",
          verification: "Verify 0.00V standby leakage on switched VCC rails prior to power-button trigger."
        },
        {
          stepLabel: "1.2 Logic Interconnects",
          action: "Identify zero-insertion-force (ZIF) and eDP locking mechanisms",
          details: "Inspect flexible printed circuits (FPCs) for gold oxidation. Never insert flex ribbons with bent alignment ears into high-density 0.4mm pitch headers.",
          caution: "Do not touch exposed gold pin contacts with bare fingers; skin acids create capacitive parasitic leakage."
        }
      ]
    },
    {
      id: "ch-2",
      chapterNumber: 2,
      title: "Pre-Repair Setup & ESD Workspace Calibration",
      subtitle: "Static grounding parameters, bench equipment isolation, and battery disconnection rules.",
      paragraphs: [
        "Prior to breaking factory enclosure seals, verify that your service workstation is calibrated to ISO/IEC 61340-5-1 ESD control standards. Work surfaces must maintain a point-to-ground resistance between 10^6 and 10^9 ohms.",
        "Lithium-ion polymer pouch cells must be discharged below 25% nominal state of charge. A fully charged battery contains sufficient chemical energy to cause sustained combustion if accidentally creased, punctured, or shorted by stray metallic screws."
      ],
      steps: [
        {
          stepLabel: "2.1 Workspace Grounding",
          action: "Connect grounded conductive wrist strap and bench mat",
          details: "Ensure grounding cord has a 1-megohm series current-limiting resistor to protect the technician while safely dissipating static potentials in under 0.1 seconds.",
          verification: "Static voltage field meter should read <100V across all plastic tool handles."
        },
        {
          stepLabel: "2.2 Complete Power Isolation",
          action: "Detach main battery harness and discharge motherboard filter capacitors",
          details: "Remove perimeter fasteners, release chassis retaining clips, and unplug the multi-pin battery wiring harness. Hold power button for 15 seconds to discharge high-capacitance solid polymer filtering capacitors.",
          caution: "Never disconnect or reconnect the battery while the AC charger is attached to the wall."
        }
      ]
    },
    {
      id: "ch-3",
      chapterNumber: 3,
      title: "Step-by-Step Teardown, Replacement & Reassembly Sequence",
      subtitle: "Fastener tracking, precision component isolation, micro-latching, and reverse torque protocol.",
      paragraphs: [
        "Follow the numbered fastener matrix strictly. Screws are custom-machined with varying thread pitches and lengths (e.g. M2x3.5mm vs M2x5.0mm). Driving an oversized screw into a blind standoff will puncture the top palmrest or crack multilayer logic board traces.",
        "When reassembling, all fasteners must be tightened in a symmetric cross pattern to avoid uneven warping of magnesium frames and thermal coldplates."
      ],
      steps: [
        {
          stepLabel: "3.1 Fastener Demounting",
          action: "Extract perimeter screws into magnetic compartment tray",
          details: "Loosen screws in a spiral counter-clockwise pattern. For heatsink springs, loosen in reverse stamped order (4 -> 3 -> 2 -> 1) by half-turns to equalize die pressure.",
          caution: "Do not use worn screwdriver bits to avoid camming out Torx or JIS screw heads."
        },
        {
          stepLabel: "3.2 Ribbon & Antenna Cable Routing",
          action: "Disengage micro IPEX MHF4 coax and eDP bail locks",
          details: "Lift micro antenna leads vertically using nylon tweezers. Unroute delicate RF coaxial cables from magnesium retention channels without pinching.",
          verification: "Cables are free with zero kinked wires or crushed outer shielding."
        },
        {
          stepLabel: "3.3 Reassembly Torque Protocol",
          action: "Torque fasteners to exact engineering specs",
          details: "Align chassis sub-frames, seat ribbon cables squarely, and torque chassis fasteners to 0.20 Nm and hinge anchors to 0.35 Nm.",
          verification: "All seam gaps around perimeter chassis measure uniform 0.5-0.8mm."
        }
      ]
    },
    {
      id: "ch-4",
      chapterNumber: 4,
      title: "Multi-Rail Signal Probing & Circuit Test Points",
      subtitle: "Direct multimeter test points, expected DC voltage tolerances, and fault isolation trees.",
      paragraphs: [
        "In the event of no-POST or intermittent brown-outs, measure the main system power rails in order of their boot sequence. The system Power Management Integrated Circuit (PMIC) and Embedded Controller (EC) require stable always-on rails before releasing the ALL_SYS_PWRGD signal to the main processor."
      ],
      steps: [
        {
          stepLabel: "4.1 Standby Rail Check",
          action: "Probe +3.3VALW and +5VALW test points",
          details: "Connect negative multimeter lead to chassis ground (screw standoff). Probe the buck converter inductor coils for stable +3.30V and +5.00V DC.",
          verification: "Voltage must remain within ±2% tolerance under standby conditions."
        },
        {
          stepLabel: "4.2 Core Power Verification",
          action: "Probe VCORE and VDDQ switching phases",
          details: "Trigger power-on button and observe multi-phase VRM output on VCORE chokes (0.75V - 1.25V dynamic VID).",
          caution: "Use a 100MHz+ oscilloscope to check for excess ripple (>30mV p-p indicates failing solid capacitors)."
        }
      ]
    },
    {
      id: "ch-5",
      chapterNumber: 5,
      title: "Post-Repair Quality Assurance & Burn-In Testing",
      subtitle: "Thermal stress validation, sensor diagnostics, and return-to-service certification.",
      paragraphs: [
        "No repair is certified complete without a rigorous 30-minute burn-in validation pass. This guarantees that thermal interface application, fan tachometers, memory signal integrity, and power delivery are 100% stable under maximum sustained synthetic workload.",
        "Inspect all device sensors via OEM UEFI hardware diagnostics before returning equipment to client service."
      ],
      steps: [
        {
          stepLabel: "5.1 Hardware Diagnostic Suite",
          action: "Execute full built-in UEFI component diagnostics",
          details: "Boot into vendor diagnostics (Dell ePSA, HP PC Hardware Diagnostics, Lenovo Diagnostics) and run extended RAM, SSD, Fan, and Motherboard tests.",
          verification: "All tests return Green Pass status with 0 error codes."
        },
        {
          stepLabel: "5.2 100% Thermal Burn-In Loop",
          action: "Run 20-minute combined CPU/GPU stress benchmark",
          details: "Launch Cinebench R23 and FurMark simultaneously. Monitor CPU delta-T and ensure hotspot temperatures remain below 85°C with zero thermal throttling.",
          verification: "Fans ramp smoothly and acoustic noise remains within factory decibel limits."
        }
      ]
    }
  ];

  // Default voltage rail reference specifications
  const voltageRails: VoltageRailSpec[] = manual.voltageRails || [
    { rail: "+19V_VIN / +20V_USBC", voltage: "19.5V - 20.0V", tolerance: "±5%", location: "DC-In Fuse F1 / Input MOSFET Q1", normalImpedance: ">100 kΩ", description: "Primary unregulated DC power rail feeding high-side VRM switching FETs." },
    { rail: "+5V_ALWAYS / +5VALW", voltage: "5.05V", tolerance: "±2%", location: "Inductor PL401 / Pin 7 PU401", normalImpedance: ">10 kΩ", description: "Always-on buck converter rail powering USB VBUS, audio codecs, and 5V fan controllers." },
    { rail: "+3.3V_ALWAYS / +3.3VALW", voltage: "3.32V", tolerance: "±2%", location: "Inductor PL301 / Pin 5 PU301", normalImpedance: ">5 kΩ", description: "Feeds Embedded Controller (EC/KBC), BIOS SPI Flash ROM, and Power Button pull-ups." },
    { rail: "+1.8V_PRIM / +1.8V_ALW", voltage: "1.80V", tolerance: "±3%", location: "Inductor PL501 / LDO Output", normalImpedance: ">1.5 kΩ", description: "Provides I/O buffer reference voltage for PCH / SoC chipset and SPI flash logic." },
    { rail: "VCC_CORE (CPU VCORE)", voltage: "0.70V - 1.35V (VID)", tolerance: "±1%", location: "CPU VRM Inductors PL1-PL6", normalImpedance: "0.8 Ω - 3.5 Ω", description: "Multi-phase synchronous buck rail powering CPU computational cores under dynamic load." },
    { rail: "VDDQ / DRAM_PWR", voltage: "1.10V (DDR5) / 1.20V (DDR4)", tolerance: "±2%", location: "RAM Power Inductor PL901", normalImpedance: ">150 Ω", description: "Main memory module supply rail powering SODIMM / on-board memory chips." },
    { rail: "VCC_GT / GPU_CORE", voltage: "0.65V - 1.15V", tolerance: "±2%", location: "GPU VRM Phase Inductors", normalImpedance: "0.3 Ω - 1.8 Ω", description: "High-current power delivery for integrated or discrete graphics compute units." },
    { rail: "EDP_BL_PWR", voltage: "19.0V - 20.0V", tolerance: "±5%", location: "Fuse F2 near 30-pin eDP Display Header", normalImpedance: ">50 kΩ", description: "Direct high-voltage power rail powering the display panel LED backlight matrix." }
  ];

  // Default fastener torque specifications
  const fastenerTorqueTable: FastenerTorqueSpec[] = manual.fastenerTorqueTable || [
    { location: "Display Hinge Anchor Brackets", screwType: "Torx T5 / Phillips #0", size: "M2.5 x 5.0mm (Steel)", torque: "0.35 Nm (3.1 in-lb)", threadLock: "Blue Loctite 242 (Medium)" },
    { location: "Chassis Bottom Cover Perimeter", screwType: "Torx T5 / Phillips #00", size: "M2.0 x 3.5mm", torque: "0.20 Nm (1.8 in-lb)", threadLock: "Factory Pre-applied" },
    { location: "CPU/GPU Cooling Heatsink Springs", screwType: "Phillips #00 (Captive)", size: "M2.0 x 4.0mm (Spring)", torque: "0.20 Nm (Sequential 1-2-3-4)", threadLock: "None (Spring-tensioned)" },
    { location: "M.2 NVMe SSD / Wi-Fi Standoff", screwType: "Phillips #00", size: "M2.0 x 3.0mm (Wafer)", torque: "0.15 Nm (1.3 in-lb)", threadLock: "None" },
    { location: "Internal Battery Pack Frame", screwType: "Phillips #00", size: "M2.0 x 4.0mm", torque: "0.20 Nm (1.8 in-lb)", threadLock: "None" },
    { location: "Motherboard Logic Board Standoffs", screwType: "Phillips #00", size: "M2.0 x 3.0mm (Brass)", torque: "0.25 Nm (2.2 in-lb)", threadLock: "None" }
  ];

  const handleDownload = () => {
    toast({
      title: "Downloading Technical Manual Package",
      description: `${manual.title} (${manual.code}) package is prepared for offline bench storage.`,
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/?manual=${manual.id}`);
    setCopied(true);
    toast({
      title: "Manual Link Copied",
      description: "Direct link copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredRails = voltageRails.filter(r => 
    r.rail.toLowerCase().includes(railSearch.toLowerCase()) ||
    r.description.toLowerCase().includes(railSearch.toLowerCase()) ||
    r.location.toLowerCase().includes(railSearch.toLowerCase())
  );

  const activeChapter = chapters[selectedChapterIndex] || chapters[0];

  return (
    <Dialog open={!!manual} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4.5xl max-h-[92vh] overflow-y-auto p-0 rounded-[2.5rem] border-border/60 bg-card/95 backdrop-blur-2xl shadow-glass">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-border/40 space-y-4 bg-muted/20">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={cn("text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full", theme.badge)}>
                <CategoryIcon className="h-3.5 w-3.5 mr-1" />
                {theme.label}
              </Badge>
              <Badge variant="secondary" className="text-[11px] font-mono font-bold px-3 py-1 rounded-full">
                {manual.code}
              </Badge>
              <Badge variant="outline" className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full text-muted-foreground">
                Verified JCR Engineering Standard
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="h-8 rounded-xl text-xs gap-1.5 border-border/60"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>Share</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="h-8 rounded-xl text-xs gap-1.5 border-border/60 hidden sm:flex"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print</span>
              </Button>
            </div>
          </div>

          <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground leading-snug">
            {manual.title}
          </DialogTitle>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl">
            {manual.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
            <span><strong>Pages:</strong> {manual.pages} Full Chapters</span>
            <span>•</span>
            <span><strong>Format:</strong> {manual.fileSize}</span>
            <span>•</span>
            <span><strong>Engineering Lead:</strong> {manual.author}</span>
            <span>•</span>
            <span><strong>Revision:</strong> {manual.lastUpdated}</span>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border/30">
            <button
              onClick={() => setActiveTab("reader")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border",
                activeTab === "reader"
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-background/60 hover:bg-muted text-muted-foreground border-border/50"
              )}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Full Technical Chapters ({chapters.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("rails")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border",
                activeTab === "rails"
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-background/60 hover:bg-muted text-muted-foreground border-border/50"
              )}
            >
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span>Voltage Rails & Test Points ({voltageRails.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("torque")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border",
                activeTab === "torque"
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-background/60 hover:bg-muted text-muted-foreground border-border/50"
              )}
            >
              <Wrench className="h-3.5 w-3.5 text-indigo-500" />
              <span>Torque & Fastener Matrix ({fastenerTorqueTable.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("safety")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border",
                activeTab === "safety"
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-background/60 hover:bg-muted text-muted-foreground border-border/50"
              )}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-rose-500" />
              <span>Bench Directives & Safety</span>
            </button>
          </div>
        </div>

        {/* Content Body based on Active Tab */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* TAB 1: FULL CHAPTER READER */}
          {activeTab === "reader" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Chapter Sidebar */}
              <div className="md:col-span-4 space-y-2 border-r border-border/40 pr-0 md:pr-4">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-primary" />
                  Table of Contents
                </div>
                {chapters.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChapterIndex(idx)}
                    className={cn(
                      "w-full text-left p-3 rounded-2xl transition-all border text-xs space-y-1 block",
                      selectedChapterIndex === idx
                        ? "bg-primary/10 border-primary/40 text-foreground font-semibold shadow-2xs"
                        : "bg-muted/20 hover:bg-muted/40 border-border/30 text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-primary">Chapter {ch.chapterNumber}</span>
                      <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", selectedChapterIndex === idx && "text-primary translate-x-0.5")} />
                    </div>
                    <div className="font-semibold text-foreground text-xs leading-snug line-clamp-1">{ch.title}</div>
                  </button>
                ))}

                {/* Recommended Bench Tools Box */}
                <div className="pt-4 space-y-2">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-foreground flex items-center gap-1">
                    <Wrench className="h-3 w-3 text-primary" /> Required Bench Equipment
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {manual.recommendedTools.map((tool, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-lg bg-muted/60 text-muted-foreground border border-border/40">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Chapter Content */}
              <div className="md:col-span-8 space-y-6">
                <div className="space-y-2 border-b border-border/30 pb-4">
                  <div className="text-xs font-bold uppercase text-primary">Chapter {activeChapter.chapterNumber}</div>
                  <h3 className="text-xl font-extrabold text-foreground tracking-tight">{activeChapter.title}</h3>
                  <p className="text-xs font-medium text-muted-foreground">{activeChapter.subtitle}</p>
                </div>

                {/* Paragraphs */}
                <div className="space-y-3 text-xs sm:text-sm text-foreground/90 leading-relaxed">
                  {activeChapter.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Detailed Sub-Steps if defined in chapter */}
                {activeChapter.steps && activeChapter.steps.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      Detailed Micro-Procedures & Verifications
                    </h4>
                    <div className="space-y-3">
                      {activeChapter.steps.map((st, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-card border border-border/50 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-primary">{st.stepLabel}</span>
                            <span className="text-xs font-semibold text-foreground">{st.action}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{st.details}</p>

                          {st.caution && (
                            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-950 dark:text-rose-200 flex items-start gap-2">
                              <AlertTriangle className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                              <div><strong>Caution:</strong> {st.caution}</div>
                            </div>
                          )}

                          {st.verification && (
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-950 dark:text-emerald-200 flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <div><strong>Verification Checkpoint:</strong> {st.verification}</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chapter Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={selectedChapterIndex === 0}
                    onClick={() => setSelectedChapterIndex(prev => Math.max(0, prev - 1))}
                    className="rounded-xl text-xs"
                  >
                    Previous Chapter
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    Chapter {selectedChapterIndex + 1} of {chapters.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={selectedChapterIndex === chapters.length - 1}
                    onClick={() => setSelectedChapterIndex(prev => Math.min(chapters.length - 1, prev + 1))}
                    className="rounded-xl text-xs"
                  >
                    Next Chapter
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VOLTAGE RAILS & TEST POINTS */}
          {activeTab === "rails" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    Power Distribution Network (PDN) Test Points & Voltage Rails
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Multimeter probe locations and expected impedance readings to ground for board diagnostics.
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search rail name (e.g. +3.3V, VCORE)..."
                    value={railSearch}
                    onChange={(e) => setRailSearch(e.target.value)}
                    className="w-full h-8 pl-8 pr-3 text-xs rounded-xl bg-background border border-border/60 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 overflow-hidden bg-card/60">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-muted/40 border-b border-border/40 text-muted-foreground uppercase text-[10px] font-bold">
                      <tr>
                        <th className="p-3">Power Rail</th>
                        <th className="p-3">Expected Voltage</th>
                        <th className="p-3">Tolerance</th>
                        <th className="p-3">Test Point / Inductor</th>
                        <th className="p-3">Normal Impedance</th>
                        <th className="p-3">Function / Rail Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {filteredRails.map((rail, idx) => (
                        <tr key={idx} className="hover:bg-muted/20 transition-colors">
                          <td className="p-3 font-mono font-bold text-primary">{rail.rail}</td>
                          <td className="p-3 font-semibold text-foreground">{rail.voltage}</td>
                          <td className="p-3 text-muted-foreground">{rail.tolerance}</td>
                          <td className="p-3 font-mono text-muted-foreground">{rail.location}</td>
                          <td className="p-3 font-semibold text-foreground">{rail.normalImpedance}</td>
                          <td className="p-3 text-muted-foreground max-w-xs">{rail.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TORQUE & FASTENER MATRIX */}
          {activeTab === "torque" && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-indigo-500" />
                  Fastener Torque & Screw Specification Matrix
                </h4>
                <p className="text-xs text-muted-foreground">
                  Precise torque values (Newton-meters) and thread dimensions to prevent stripped standoffs or cracked magnesium frames.
                </p>
              </div>

              <div className="rounded-2xl border border-border/50 overflow-hidden bg-card/60">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-muted/40 border-b border-border/40 text-muted-foreground uppercase text-[10px] font-bold">
                      <tr>
                        <th className="p-3">Component / Mounting Location</th>
                        <th className="p-3">Bit & Head Type</th>
                        <th className="p-3">Thread Size & Pitch</th>
                        <th className="p-3">Target Torque (Nm)</th>
                        <th className="p-3">Threadlock Compound</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {fastenerTorqueTable.map((spec, idx) => (
                        <tr key={idx} className="hover:bg-muted/20 transition-colors">
                          <td className="p-3 font-semibold text-foreground">{spec.location}</td>
                          <td className="p-3 font-mono text-primary font-bold">{spec.screwType}</td>
                          <td className="p-3 font-mono text-muted-foreground">{spec.size}</td>
                          <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">{spec.torque}</td>
                          <td className="p-3 text-muted-foreground">{spec.threadLock}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SAFETY & DIRECTIVES */}
          {activeTab === "safety" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-rose-500" />
                  Mandatory Bench Safety & ESD Directives
                </h4>
                <ul className="space-y-2 text-xs text-foreground/90">
                  {manual.safetyDirectives.map((directive, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-background/40">
                      <ShieldCheck className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{directive}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Topics List */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                  Key Technical Subject Coverage
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {manual.keyTopics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-border/50 bg-background/50 p-3 flex items-start gap-2.5 text-xs text-foreground/90"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 sm:p-8 bg-muted/30 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <ShieldCheck className="h-4 w-4" />
            <span>Verified Official JCRguru Start-to-Finish Engineering Specification</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-2xl text-xs h-10 px-5 flex-1 sm:flex-initial border-border/60"
            >
              Close Manual
            </Button>
            <Button
              onClick={handleDownload}
              className="rounded-2xl text-xs font-bold h-10 px-6 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground flex-1 sm:flex-initial shadow-xs"
            >
              <Download className="h-4 w-4" />
              <span>Download Offline PDF</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
