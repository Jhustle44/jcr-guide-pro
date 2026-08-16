import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Wrench, 
  AlertTriangle, 
  ShieldCheck, 
  Download, 
  HelpCircle, 
  X, 
  Zap, 
  Sparkles,
  Timer,
  ChevronRight,
  Activity,
  Cpu,
  Layers,
  CheckCircle2,
  Volume2,
  Maximize2,
  ExternalLink,
  Flame,
  Smartphone
} from "lucide-react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [, setLocation] = useLocation();

  // Active interactive modal state: "emergency" | "safety" | "rails" | null
  const [activeModal, setActiveModal] = useState<"emergency" | "safety" | "rails" | null>(null);

  // Emergency countdown timer state
  const [countdown, setCountdown] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && countdown !== null && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (countdown === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, countdown]);

  const startEmergencyTimer = () => {
    setCountdown(15);
    setTimerRunning(true);
  };

  const resetEmergencyTimer = () => {
    setCountdown(15);
    setTimerRunning(false);
  };

  const quickActions = [
    {
      id: "emergency",
      label: "Emergency Discharge",
      tag: "HARD RESET",
      desc: "15s EC drain & battery isolation protocol",
      icon: AlertTriangle,
      glowColor: "from-amber-500/20 to-orange-500/10",
      borderColor: "border-amber-500/30 hover:border-amber-500/70 group-hover:bg-amber-500/10",
      iconBg: "bg-amber-500/15 text-amber-500 border-amber-500/30",
      badgeColor: "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
      action: () => {
        setActiveModal("emergency");
        setIsExpanded(false);
        setCountdown(15);
        setTimerRunning(false);
      },
    },
    {
      id: "rails",
      label: "Voltage Rail Pinouts",
      tag: "MULTIMETER",
      desc: "Instant +19V, +3.3V, +5V standby test points",
      icon: Activity,
      glowColor: "from-cyan-500/20 to-blue-500/10",
      borderColor: "border-cyan-500/30 hover:border-cyan-500/70 group-hover:bg-cyan-500/10",
      iconBg: "bg-cyan-500/15 text-cyan-500 border-cyan-500/30",
      badgeColor: "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
      action: () => {
        setActiveModal("rails");
        setIsExpanded(false);
      },
    },
    {
      id: "safety",
      label: "Torque & ESD Standards",
      tag: "BENCH SPECS",
      desc: "0.25 Nm limits, PTM7950 & thermal pads",
      icon: ShieldCheck,
      glowColor: "from-emerald-500/20 to-teal-500/10",
      borderColor: "border-emerald-500/30 hover:border-emerald-500/70 group-hover:bg-emerald-500/10",
      iconBg: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
      badgeColor: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      action: () => {
        setActiveModal("safety");
        setIsExpanded(false);
      },
    },
    {
      id: "tools",
      label: "52 Verified Bench Tools",
      tag: "SOFTWARE HUB",
      desc: "FurMark 2, MemTest86, DDU, Rufus & OCCT",
      icon: Download,
      glowColor: "from-blue-500/20 to-indigo-500/10",
      borderColor: "border-blue-500/30 hover:border-blue-500/70 group-hover:bg-blue-500/10",
      iconBg: "bg-blue-500/15 text-blue-500 border-blue-500/30",
      badgeColor: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
      action: () => {
        setLocation("/software-tools");
        setIsExpanded(false);
      },
    },
    {
      id: "troubleshoot",
      label: "Diagnostic Flowcharts",
      tag: "TRIAGE",
      desc: "No POST, 3-Beep codes & BSOD protocols",
      icon: Zap,
      glowColor: "from-purple-500/20 to-pink-500/10",
      borderColor: "border-purple-500/30 hover:border-purple-500/70 group-hover:bg-purple-500/10",
      iconBg: "bg-purple-500/15 text-purple-500 border-purple-500/30",
      badgeColor: "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30",
      action: () => {
        setLocation("/troubleshooting");
        setIsExpanded(false);
      },
    },
    {
      id: "android-zip",
      label: "Android Studio Project",
      tag: "GRADLE • APK",
      desc: "Download complete native Android Studio .ZIP",
      icon: Smartphone,
      glowColor: "from-emerald-500/20 to-green-500/10",
      borderColor: "border-emerald-500/30 hover:border-emerald-500/70 group-hover:bg-emerald-500/10",
      iconBg: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
      badgeColor: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      action: () => {
        setLocation("/downloads");
        setIsExpanded(false);
      },
    },
  ];

  return (
    <>
      <div className="fixed bottom-34 sm:bottom-22 right-4 sm:right-6 z-40 no-print">
        <div className="relative">
          
          {/* Fancy Pop-Out Menu Card */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 20, transformOrigin: "bottom right" }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="absolute bottom-15 right-0 w-[310px] sm:w-[360px] rounded-3xl bg-card/95 backdrop-blur-3xl border border-primary/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                {/* HUD Header Banner */}
                <div className="relative p-3.5 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-b border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/20">
                      <Sparkles className="h-4 w-4 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-xs font-black tracking-wider uppercase text-foreground flex items-center gap-1.5">
                        Quick Bench HUD
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                      </div>
                      <div className="text-[10px] text-muted-foreground font-mono">
                        STANDBY • 6 BENCH TOOLS
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsExpanded(false)}
                    className="h-7 w-7 rounded-lg hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Staggered Action Cards */}
                <div className="p-2.5 space-y-2 max-h-[380px] overflow-y-auto">
                  {quickActions.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04, duration: 0.2 }}
                        onClick={item.action}
                        className={`w-full group relative p-2.5 rounded-2xl border ${item.borderColor} bg-gradient-to-r ${item.glowColor} hover:shadow-lg transition-all duration-200 text-left flex items-center gap-3 overflow-hidden cursor-pointer`}
                      >
                        {/* Icon Pod */}
                        <div className={`h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 shadow-xs ${item.iconBg} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                          <Icon className="h-5 w-5" />
                        </div>

                        {/* Text Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                              {item.label}
                            </span>
                            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-md border ${item.badgeColor}`}>
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-[10.5px] text-muted-foreground line-clamp-1 group-hover:text-foreground/80 transition-colors">
                            {item.desc}
                          </p>
                        </div>

                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                      </motion.button>
                    );
                  })}
                </div>

                {/* Bottom Status Ticker */}
                <div className="px-3.5 py-2 bg-muted/40 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                  <span>SAFETY INTERLOCK: ACTIVE</span>
                  <span className="text-emerald-500 font-bold">READY TO DEPLOY</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fancy Floating Trigger Bubble */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className={`relative h-12 w-12 sm:h-13 sm:w-13 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-xl group cursor-pointer ${
              isExpanded 
                ? "bg-primary text-primary-foreground border-primary shadow-primary/30" 
                : "bg-card/90 hover:bg-card text-foreground border-border/70 hover:border-primary/50 shadow-glass"
            }`}
            title="Quick Bench Actions & HUD"
          >
            {/* Animated Ambient Ring / Glow */}
            {!isExpanded && (
              <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/40 to-amber-500/40 opacity-75 blur-xs group-hover:opacity-100 transition-opacity -z-10 animate-pulse" />
            )}

            {isExpanded ? (
              <X className="h-5 w-5 transition-transform rotate-90 duration-200" />
            ) : (
              <div className="relative">
                <Wrench className="h-5 w-5 text-primary group-hover:rotate-45 transition-transform duration-300" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-500 border border-background" />
              </div>
            )}
          </motion.button>
        </div>
      </div>

      {/* 1. Emergency Discharge Interactive Modal */}
      <Dialog open={activeModal === "emergency"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-md rounded-3xl border-amber-500/30 bg-card/95 backdrop-blur-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500 border border-amber-500/30">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-extrabold text-foreground">Emergency Force Discharge</DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">Hard Embedded Controller (EC) Reset & Power Rail Drain</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            {/* Interactive 15-Second Timer Pod */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-3">
              <div className="text-3xl font-black font-mono text-amber-500 flex items-center justify-center gap-2">
                <Timer className="h-7 w-7" />
                {countdown !== null ? `${countdown}s` : "15s"}
              </div>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                {countdown === 0 ? (
                  <span className="text-emerald-500 font-bold flex items-center justify-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Capacitors discharged! EC is hard-reset.
                  </span>
                ) : (
                  "Firmly press and hold the power button down during this countdown."
                )}
              </p>

              <div className="flex justify-center gap-2">
                <Button 
                  onClick={startEmergencyTimer} 
                  disabled={timerRunning}
                  className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                >
                  {timerRunning ? "Timing (Hold Down)..." : "Start 15s Hold Timer"}
                </Button>
                <Button 
                  variant="outline"
                  onClick={resetEmergencyTimer}
                  className="rounded-xl text-xs"
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-foreground">3-Step Bench Safe Sequence:</div>
              <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-amber-500">01.</span>
                  <span><strong>Disconnect AC Power:</strong> Unplug barrel jack and USB-C Type-C chargers immediately.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-amber-500">02.</span>
                  <span><strong>Isolate Internal Battery:</strong> Remove bottom panel and pull the high-current battery molex header.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-amber-500">03.</span>
                  <span><strong>Drain Residual Charge:</strong> Hold power button for 15s to drain filter capacitors before probing.</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 2. Standby Voltage Rail Quick Reference Modal */}
      <Dialog open={activeModal === "rails"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-lg rounded-3xl border-cyan-500/30 bg-card/95 backdrop-blur-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-500 border border-cyan-500/30">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-extrabold text-foreground">Multimeter Power Rail Cheat-Sheet</DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">Nominal voltages, tolerances, and typical board test points</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { rail: "+19.0V / +20.0V", name: "+DC_IN / VBUS", tolerance: "±5%", note: "Primary DC input MOSFETs (PQ101/PQ102)" },
                { rail: "+3.3V_ALW", name: "Standby 3.3V Always", tolerance: "±2%", note: "Powers Super I/O EC and BIOS chip pin 8" },
                { rail: "+5.0V_ALW", name: "Standby 5.0V Always", tolerance: "±2%", note: "Powers USB 5V lines & 5V regulator coil" },
                { rail: "+1.8V_PRIM", name: "PCH / SoC Standby", tolerance: "±3%", note: "Chipset logic & initial power sequencer" },
                { rail: "+1.2V / +1.1V", name: "DDR4 / DDR5 VDD", tolerance: "±1.5%", note: "RAM power rail inductor (PL501)" },
                { rail: "+0.85V - +1.2V", name: "VCORE / VGPU", tolerance: "±1%", note: "CPU/GPU active state core switching VRMs" },
              ].map((r, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-muted/40 border border-border/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-cyan-600 dark:text-cyan-400">{r.rail}</span>
                    <Badge variant="outline" className="text-[10px] font-mono border-cyan-500/30">{r.tolerance}</Badge>
                  </div>
                  <div className="text-xs font-semibold text-foreground">{r.name}</div>
                  <div className="text-[10.5px] text-muted-foreground">{r.note}</div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-500 shrink-0" />
              <span><strong>Ground Reference:</strong> Clip black multimeter lead to copper chassis standoff or USB shield.</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 3. Torque & ESD Safety Standards Modal */}
      <Dialog open={activeModal === "safety"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-md rounded-3xl border-emerald-500/30 bg-card/95 backdrop-blur-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-extrabold text-foreground">Torque & Thermal Bench Standards</DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">Certified technician tightening specifications & thermal protocols</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-3 pt-2">
            <div className="space-y-2">
              <div className="text-xs font-bold text-foreground">Standard Torque Specifications:</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                  <div className="font-mono font-bold text-emerald-500 text-sm">0.25 – 0.30 Nm</div>
                  <div className="font-semibold text-foreground mt-0.5">CPU/GPU Heatsink</div>
                  <div className="text-[10px] text-muted-foreground">Diagonal sequence (1→2→3→4)</div>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                  <div className="font-mono font-bold text-emerald-500 text-sm">0.18 – 0.20 Nm</div>
                  <div className="font-semibold text-foreground mt-0.5">M.2 NVMe & Wi-Fi</div>
                  <div className="text-[10px] text-muted-foreground">Prevents PCB trace fracturing</div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1.5 text-xs text-muted-foreground">
              <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Flame className="h-4 w-4" /> Recommended Thermal Interface:
              </div>
              <div>• <strong>Honeywell PTM7950:</strong> 0.25mm phase change pad on bare dies (no pump-out effect).</div>
              <div>• <strong>K5 Pro Viscous Paste:</strong> For uneven VRAM and MOSFET gap replacement (0.5–2.0mm).</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
