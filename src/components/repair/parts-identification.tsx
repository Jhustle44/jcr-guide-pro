import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { DeviceComponent } from "@shared/schema";
import { 
  Cpu, 
  HardDrive, 
  Fan, 
  BatteryCharging, 
  CircuitBoard, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  Wrench,
  AlertTriangle,
  Zap,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface PartsIdentificationProps {
  deviceType: "laptop" | "desktop" | string;
}

interface ComponentDetail {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  deviceType: "laptop" | "desktop" | "both";
  imageUrl: string;
  specs: { label: string; value: string }[];
  commonFailures: string[];
  safetyRules: string[];
  testingProcedure: string;
  icon: any;
}

const HARDWARE_COMPONENTS: ComponentDetail[] = [
  {
    id: "m2-nvme",
    name: "M.2 PCIe NVMe Solid State Drive",
    category: "Storage",
    tagline: "PCIe Gen4 / Gen5 High-Throughput Flash Storage",
    description: "Compact solid-state drive operating over PCIe lanes using the Non-Volatile Memory Express protocol. Features sequential transfer speeds up to 7,500+ MB/s.",
    deviceType: "both",
    imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
    specs: [
      { label: "Form Factors", value: "2280 (Standard), 2230 (Compact), 2242" },
      { label: "Interface", value: "PCIe 4.0 x4 / PCIe 5.0 x4 (M-Key)" },
      { label: "Max Thermal Threshold", value: "70°C - 75°C before throttling" },
    ],
    commonFailures: [
      "Controller read-only lockout when NAND endurance is reached",
      "Thermal throttling causing catastrophic freeze under write loads",
      "RAW filesystem corruption caused by unexpected power cuts"
    ],
    safetyRules: [
      "Ground ESD wrist strap before handling bare NAND flash dies.",
      "Always insert at a 30° angle; never force horizontal entry.",
      "Ensure the thermal pad protective film is removed before heatsink contact."
    ],
    testingProcedure: "Run CrystalDiskInfo to examine 0E (Media and Data Integrity Errors) and S.M.A.R.T. health percentages.",
    icon: HardDrive,
  },
  {
    id: "ddr5-ram",
    name: "DDR5 / DDR4 System Memory (DIMM / SODIMM)",
    category: "Memory",
    tagline: "High-Bandwidth Dual-Channel Volatile Memory",
    description: "High-density RAM modules featuring on-die ECC (DDR5) and independent 32-bit subchannels to supply high-speed bandwidth to the CPU cache hierarchy.",
    deviceType: "both",
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
    specs: [
      { label: "Standard Frequencies", value: "DDR4 3200MHz / DDR5 5600-7200MHz" },
      { label: "Voltage", value: "1.1V (DDR5) / 1.2V (DDR4) / 1.35V+ (XMP/EXPO)" },
      { label: "Channel Architecture", value: "Dual Channel (Slots 2 & 4 / A2-B2)" },
    ],
    commonFailures: [
      "Intermittent Blue Screen BSOD: MEMORY_MANAGEMENT / PAGE_FAULT_IN_NONPAGED_AREA",
      "No POST boot loop with 3 motherboard beep codes or orange DRAM debug LED",
      "Oxidation on gold contact fingers preventing stable signal integrity"
    ],
    safetyRules: [
      "Always hold memory modules strictly by the outer edge perimeter.",
      "Clean contacts using 99% anhydrous isopropyl alcohol and a lint-free swab.",
      "Never mix disparate CAS latencies or memory sub-timings."
    ],
    testingProcedure: "Boot MemTest86 via USB for 4 full diagnostic passes to verify zero memory address bitflips.",
    icon: Layers,
  },
  {
    id: "gpu-card",
    name: "PCIe Dedicated Graphics Accelerator (GPU)",
    category: "Graphics",
    tagline: "High-Power Graphics Processor & VRAM Subsystem",
    description: "Discrete graphics module with dedicated high-speed GDDR6/GDDR6X VRAM, multi-phase VRM power delivery, and heavy multi-fan or vapor chamber heatsinks.",
    deviceType: "desktop",
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800",
    specs: [
      { label: "PCIe Slot Spec", value: "PCIe 4.0 / 5.0 x16 Physical & Electrical" },
      { label: "Power Delivery", value: "12V-2x6 / 12VHPWR (up to 600W) or Dual 8-Pin" },
      { label: "Hotspot Delta", value: "Ideal hotspot delta < 15°C above core temp" },
    ],
    commonFailures: [
      "Checkerboard artifacting caused by cracked VRAM solder balls",
      "Driver Timeout / Black screen under 3D rasterization workloads",
      "Melted 12VHPWR connector caused by incomplete pin insertion"
    ],
    safetyRules: [
      "Listen for the audible click when plugging 12V-2x6 cables; ensure 0mm gap.",
      "Support heavy triple-slot cards with an adjustable anti-sag bracket.",
      "Unplug main PSU cord before pulling the PCIe latch."
    ],
    testingProcedure: "Run FurMark or 3DMark Time Spy while logging VRAM junction and VRM temperature sensors with HWiNFO64.",
    icon: Zap,
  },
  {
    id: "thermal-cooling",
    name: "Thermal Cooling System & Vapor Chamber",
    category: "Thermals",
    tagline: "Phase-Change Heatpipes, Fluid Dynamic Fans & Cold Plates",
    description: "Sintered copper heatpipes and vapor chambers transferring thermal energy away from CPU/GPU silicon to aluminum cooling fins exhausted by high-static-pressure fans.",
    deviceType: "both",
    imageUrl: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800",
    specs: [
      { label: "Thermal Interface", value: "Phase Change Pad (PTM7950) / Thermal Paste" },
      { label: "Fan Bearing Type", value: "FDB (Fluid Dynamic) / Dual Ball Bearing" },
      { label: "Lifespan", value: "Paste repaste interval: 2-3 years" },
    ],
    commonFailures: [
      "Thermal throttling drops CPU clock speed from 5.0GHz to 800MHz base",
      "Bearing rattle and high-pitch acoustic whine from hair/dust ingestion",
      "Perforated or dry heatpipe vacuum loss preventing heat conduction"
    ],
    safetyRules: [
      "Never spin fans at high RPM with compressed air without holding the blade.",
      "Tighten heatsink screws in a cross diagonal 1-2-3-4 pattern to prevent core chipping."
    ],
    testingProcedure: "Run Cinebench R24 multi-core load for 10 minutes while checking if CPU package stays under 88°C.",
    icon: Fan,
  },
  {
    id: "battery-power",
    name: "Lithium-Polymer Internal Battery Pack",
    category: "Power",
    tagline: "Multi-Cell Battery Pack with Integrated Smart Gas Gauge",
    description: "High-density Lithium-ion Polymer (LiPo) multi-cell battery module integrated with safety cutoff MOSFETs, over-voltage protection, and SMBus telemetry.",
    deviceType: "laptop",
    imageUrl: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800",
    specs: [
      { label: "Cell Chemistry", value: "Lithium-Ion Polymer (Li-Po) 3-Cell / 4-Cell" },
      { label: "Nominal Voltage", value: "11.4V - 15.4V DC" },
      { label: "Health Threshold", value: "Replace when full charge capacity < 75%" },
    ],
    commonFailures: [
      "Physical gas pouch swelling (pillowing) pushing up the trackpad",
      "Sudden shutdown at 25-40% charge level due to weak unbalanced cell",
      "Gas gauge calibration drift reporting erroneous remaining time"
    ],
    safetyRules: [
      "NEVER use metal tweezers or pry bars near battery pouches.",
      "Work in a fire-safe space away from flammable materials when handling swollen cells.",
      "Always recycle degraded lithium packs at certified e-waste facilities."
    ],
    testingProcedure: "Generate a Windows Battery Report via command `powercfg /batteryreport` to view cycle history and charge capacity.",
    icon: BatteryCharging,
  },
  {
    id: "motherboard-vrm",
    name: "Motherboard Power Delivery & VRM Phase Stages",
    category: "Motherboard",
    tagline: "Digital PWM Controller, DrMOS Stages & Chokes",
    description: "Multi-phase Voltage Regulator Module (VRM) stepping down +12V from the power supply to sub-1.4V clean Vcore voltage for the CPU silicon with minimal voltage ripple.",
    deviceType: "both",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    specs: [
      { label: "Phase Topologies", value: "8+2 to 24+1+2 Direct / Teamed Power Stages" },
      { label: "Capacitor Rating", value: "Solid Black Japanese 10K/20K Metallic Capacitors" },
      { label: "Standby Standout", value: "+5VSB Standby Rail / +3.3V RTC Circuit" },
    ],
    commonFailures: [
      "Shorted high-side DrMOS MOSFET pulling 12V rail to ground (instant PSU click off)",
      "Corroded standby 3.3V power regulator circuit after liquid spills",
      "Blown backlight fuse (F1/F2) after display cable disconnect with live battery"
    ],
    safetyRules: [
      "Discharge all bulk capacitors before measuring diode mode resistances.",
      "Use a thermal imaging camera (FLIR/Seek) to instantly isolate shorted capacitors."
    ],
    testingProcedure: "Measure diode mode resistance to ground on each inductor coil using a digital multimeter.",
    icon: CircuitBoard,
  },
];

export default function PartsIdentification({ deviceType }: PartsIdentificationProps) {
  const [selectedId, setSelectedId] = useState<string>("m2-nvme");

  const components = HARDWARE_COMPONENTS.filter(
    (c) => c.deviceType === "both" || !deviceType || c.deviceType === deviceType
  );

  const selected = HARDWARE_COMPONENTS.find((c) => c.id === selectedId) || components[0] || HARDWARE_COMPONENTS[0];
  const SelectedIcon = selected.icon;

  return (
    <div className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl p-6 sm:p-8 space-y-8 shadow-sm">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[11px] font-bold uppercase tracking-wider">
              <CircuitBoard className="h-3 w-3" /> Technical Schematics
            </span>
            <span className="text-xs text-muted-foreground capitalize font-medium">
              Target: {deviceType || "All Systems"}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Hardware Component Anatomy & Diagnostic Testing
          </h3>
          <p className="text-xs text-muted-foreground">
            Explore internal engineering architecture, pinout specifications, safety precautions, and isolation procedures.
          </p>
        </div>

        {/* Pro Tip Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold shrink-0">
          <Zap className="h-4 w-4 shrink-0" />
          <span>Always isolate power & discharge capacitance before servicing</span>
        </div>
      </div>

      {/* Component Navigation Chips */}
      <div className="flex flex-wrap gap-2">
        {components.map((comp) => {
          const Icon = comp.icon;
          const isSelected = selected.id === comp.id;
          return (
            <button
              key={comp.id}
              onClick={() => setSelectedId(comp.id)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-semibold transition-all",
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background/70 border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4", isSelected ? "text-primary-foreground" : "text-primary")} />
              <span>{comp.name.split(' (')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Detailed Component View - Clean, Uncluttered Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Photo & Specifications */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-muted/40 shadow-sm aspect-video sm:aspect-[4/3]">
            <img
              src={selected.imageUrl}
              alt={selected.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4">
              <Badge variant="secondary" className="mb-1 text-[10px] font-bold uppercase tracking-wider">
                {selected.category} Subsystem
              </Badge>
              <h4 className="text-base font-bold text-foreground drop-shadow-sm">{selected.name}</h4>
              <p className="text-xs text-muted-foreground line-clamp-1">{selected.tagline}</p>
            </div>
          </div>

          {/* Quick Technical Specs */}
          <div className="rounded-2xl border border-border/50 bg-background/50 p-4 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Wrench className="h-3.5 w-3.5 text-primary" /> Technical Specifications
            </h5>
            <div className="space-y-2">
              {selected.specs.map((s, idx) => (
                <div key={idx} className="flex items-start justify-between text-xs py-1 border-b border-border/30 last:border-0">
                  <span className="font-semibold text-muted-foreground">{s.label}:</span>
                  <span className="font-medium text-foreground text-right">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Description, Failure Modes, Safety & Testing */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Functional Overview */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <SelectedIcon className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-lg font-bold">{selected.name}</h4>
                <p className="text-xs text-muted-foreground">{selected.tagline}</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed pt-1">
              {selected.description}
            </p>
          </div>

          {/* Common Diagnostic Failure Symptoms */}
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-2.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" /> Common Failure Modes & Symptoms
            </h5>
            <ul className="space-y-1.5">
              {selected.commonFailures.map((failure, idx) => (
                <li key={idx} className="text-xs text-foreground/80 flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>{failure}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Safety Precautions */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5" /> Technician Safety Guidelines
            </h5>
            <ul className="space-y-1.5">
              {selected.safetyRules.map((rule, idx) => (
                <li key={idx} className="text-xs text-foreground/80 flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bench Verification Procedure */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 space-y-1.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5" /> Bench Testing & Verification
            </h5>
            <p className="text-xs text-foreground/80 leading-relaxed">
              {selected.testingProcedure}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

