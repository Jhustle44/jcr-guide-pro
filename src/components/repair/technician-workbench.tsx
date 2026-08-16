import { useState } from "react";
import { 
  Activity, 
  CircuitBoard, 
  HelpCircle, 
  Sparkles, 
  Cpu, 
  Layers, 
  ChevronRight,
  ShieldAlert,
  Info
} from "lucide-react";
import TroubleshootingFlowchart from "@/components/repair/troubleshooting-flowchart";
import PartsIdentification from "@/components/repair/parts-identification";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TechnicianWorkbenchProps {
  deviceType: "all" | "laptop" | "desktop";
}

export default function TechnicianWorkbench({ deviceType }: TechnicianWorkbenchProps) {
  const [activeTab, setActiveTab] = useState<"flowchart" | "anatomy">("flowchart");
  const effectiveDeviceType = deviceType === "all" ? "laptop" : deviceType;

  return (
    <section id="technician-workbench" className="rounded-3xl border border-border/60 bg-card/70 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-xs relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 via-primary/5 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none -z-0" />

      {/* Workbench Header & Tab Switcher */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider">
              <Activity className="h-3 w-3" /> Interactive Diagnostics Workbench
            </span>
            <Badge variant="outline" className="text-[10px] font-semibold">
              Live {deviceType} Tools
            </Badge>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Decision Tree Flowcharts & Component Anatomy
          </h2>
          <p className="text-xs text-muted-foreground">
            Interactive fault isolation algorithms and verified {deviceType} hardware pinouts & safety specifications.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center p-1 rounded-2xl bg-muted/60 border border-border/50 self-start md:self-auto shrink-0 shadow-inner">
          <button
            onClick={() => setActiveTab("flowchart")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
              activeTab === "flowchart"
                ? "bg-background text-foreground shadow-sm ring-1 ring-border/50"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <HelpCircle className="h-3.5 w-3.5 text-indigo-500" />
            <span>Diagnostic Flowchart</span>
          </button>

          <button
            onClick={() => setActiveTab("anatomy")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
              activeTab === "anatomy"
                ? "bg-background text-foreground shadow-sm ring-1 ring-border/50"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <CircuitBoard className="h-3.5 w-3.5 text-emerald-500" />
            <span>Component Anatomy</span>
          </button>
        </div>
      </div>

      {/* Tab Content Container */}
      <div className="relative z-10 pt-2">
        {activeTab === "flowchart" ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                Step-by-Step Problem Isolation Engine
              </span>
              <span>Click nodes to follow the diagnostic path</span>
            </div>
            <TroubleshootingFlowchart />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-emerald-500" />
                Hardware Anatomy, Pinouts & Safety Protocols
              </span>
              <span>Select any component for test points and voltage limits</span>
            </div>
            <PartsIdentification deviceType={effectiveDeviceType} />
          </div>
        )}
      </div>
    </section>
  );
}
