import { useState } from "react";
import { useLocation } from "wouter";
import { 
  Sparkles, 
  Cpu, 
  Laptop, 
  Monitor, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Send, 
  Wrench, 
  ShieldAlert, 
  ArrowRight, 
  CheckSquare, 
  Square, 
  Copy, 
  Check, 
  Layers, 
  Zap, 
  FileText, 
  Sliders,
  Download,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface DiagnosticResult {
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

const COMMON_SYMPTOMS = [
  { label: "No Power / Black Screen", icon: Zap, prompt: "Laptop won't power on. No fan spin, charging LED is off when plugged into AC adapter." },
  { label: "BSOD Crash / Stop Code", icon: AlertTriangle, prompt: "System crashes to Blue Screen of Death with stop code CRITICAL_PROCESS_DIED or MEMORY_MANAGEMENT." },
  { label: "Thermal Throttling & Loud Fans", icon: Sliders, prompt: "CPU temperatures reach 95°C+ during light tasks with constant high-RPM fan noise." },
  { label: "100% Disk Usage / Severe Lag", icon: Layers, prompt: "Computer takes 5+ minutes to boot with 100% disk usage freezing desktop responsiveness." },
  { label: "Display Artifacts & Flickering", icon: Monitor, prompt: "Screen shows colorful horizontal lines, checkerboard artifacts, or flickers when moving hinge." },
  { label: "Liquid Spill Emergency", icon: ShieldAlert, prompt: "Coffee/water spilled across laptop keyboard. Machine was powered off immediately." },
  { label: "Battery Won't Hold Charge", icon: Laptop, prompt: "Battery drains from 100% to 0% in 15 minutes and reports 'Service Recommended'." },
  { label: "Boot Device Not Found", icon: FileText, prompt: "BIOS displays 'No Bootable Device Found' or 0xc000000e error during startup." }
];

export default function AITroubleshooter() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [deviceType, setDeviceType] = useState<"laptop" | "desktop">("laptop");
  const [brand, setBrand] = useState("Dell");
  const [model, setModel] = useState("");
  const [os, setOs] = useState("Windows 11");
  const [errorCode, setErrorCode] = useState("");
  const [symptoms, setSymptoms] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copiedReport, setCopiedReport] = useState(false);

  const handleSelectSymptom = (promptText: string) => {
    setSymptoms(promptText);
  };

  const handleDiagnose = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!symptoms.trim()) {
      toast({
        title: "Please enter symptoms",
        description: "Describe what is happening or select one of the common issue tags below.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    setCompletedSteps([]);

    try {
      const response = await fetch("/api/ai/troubleshoot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symptoms: symptoms.trim(),
          deviceType,
          brand,
          model: model.trim(),
          os,
          errorCode: errorCode.trim()
        })
      });

      if (!response.ok) {
        throw new Error("Failed to process diagnostic query");
      }

      const data: DiagnosticResult = await response.json();
      setResult(data);
      toast({
        title: "Diagnostic Analysis Complete",
        description: `Identified ${data.probableCauses?.length || 0} probable root causes.`,
      });
    } catch (err: any) {
      console.error("Diagnostic error:", err);
      toast({
        title: "Diagnosis Failed",
        description: err.message || "Could not complete diagnosis. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStep = (stepNumber: number) => {
    if (completedSteps.includes(stepNumber)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepNumber));
    } else {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
  };

  const handleCopyReport = () => {
    if (!result) return;
    const report = `JCR GUIDE PRO - AI DIAGNOSTIC REPORT
Device: ${brand} ${model || "Generic"} (${deviceType}) - OS: ${os}
Symptoms: ${symptoms}
Summary: ${result.summary}
Confidence: ${result.confidence} | Category: ${result.recommendedCategory}

PROBABLE CAUSES:
${result.probableCauses?.map(c => `- [${c.likelihood}] ${c.cause}: ${c.explanation}`).join("\n")}

STEP-BY-STEP RESOLUTION:
${result.stepByStepPlan?.map(s => `${s.stepNumber}. ${s.title}: ${s.action} -> Expected: ${s.expectedOutcome}`).join("\n")}

REQUIRED TOOLS & SOFTWARE:
${result.toolsAndSoftware?.map(t => `- ${t}`).join("\n")}

SAFETY WARNINGS:
${result.safetyWarnings?.map(w => `! ${w}`).join("\n")}`;

    navigator.clipboard.writeText(report);
    setCopiedReport(true);
    toast({
      title: "Report Copied!",
      description: "Complete technical diagnosis copied to clipboard.",
    });
    setTimeout(() => setCopiedReport(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Input Diagnostic Card */}
      <div className="rounded-3xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="h-3 w-3" /> Gemini 3 AI Diagnostic Specialist
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
                Bench-Grade Precision
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Interactive Device Diagnostic Engine
            </h2>
            <p className="text-xs text-muted-foreground">
              Describe your device symptoms, crash codes, or select common hardware failure patterns to generate an automated root-cause repair plan.
            </p>
          </div>
        </div>

        {/* Diagnostic Form */}
        <form onSubmit={handleDiagnose} className="space-y-6">
          
          {/* Quick Hardware Specification Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Device Form Factor */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                {deviceType === "laptop" ? <Laptop className="h-3.5 w-3.5 text-primary" /> : <Monitor className="h-3.5 w-3.5 text-primary" />}
                Device Type
              </label>
              <div className="grid grid-cols-2 gap-1 bg-muted/40 p-1 rounded-xl border border-border/40">
                <button
                  type="button"
                  onClick={() => setDeviceType("laptop")}
                  className={cn(
                    "py-1.5 text-xs font-medium rounded-lg transition-all text-center",
                    deviceType === "laptop" ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Laptop
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceType("desktop")}
                  className={cn(
                    "py-1.5 text-xs font-medium rounded-lg transition-all text-center",
                    deviceType === "desktop" ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Desktop
                </button>
              </div>
            </div>

            {/* Brand Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Manufacturer / Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full h-9 rounded-xl border border-border/50 bg-background/80 px-3 text-xs focus:ring-1 focus:ring-primary focus:outline-hidden"
              >
                <option value="Dell">Dell / Alienware</option>
                <option value="Apple">Apple (MacBook / Mac)</option>
                <option value="Lenovo">Lenovo (ThinkPad / Legion)</option>
                <option value="HP">HP (Spectre / OMEN / EliteBook)</option>
                <option value="ASUS">ASUS (ROG / TUF / ZenBook)</option>
                <option value="Acer">Acer (Predator / Nitro / Swift)</option>
                <option value="MSI">MSI Gaming & Workstations</option>
                <option value="Razer">Razer Blade</option>
                <option value="Microsoft">Microsoft Surface</option>
                <option value="Samsung">Samsung Galaxy Book</option>
                <option value="Framework">Framework (Modular)</option>
                <option value="Custom Built">Custom Built Desktop PC</option>
                <option value="Other">Other / Generic</option>
              </select>
            </div>

            {/* Exact Model (Optional) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Model Name (Optional)</label>
              <Input
                placeholder="e.g. XPS 15 9530, M3 Max"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="h-9 rounded-xl text-xs bg-background/80"
              />
            </div>

            {/* Operating System */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Operating System</label>
              <select
                value={os}
                onChange={(e) => setOs(e.target.value)}
                className="w-full h-9 rounded-xl border border-border/50 bg-background/80 px-3 text-xs focus:ring-1 focus:ring-primary focus:outline-hidden"
              >
                <option value="Windows 11">Windows 11</option>
                <option value="Windows 10">Windows 10</option>
                <option value="macOS Sonoma / Sequoia">macOS Sonoma / Sequoia</option>
                <option value="Linux (Ubuntu / Fedora / Arch)">Linux</option>
                <option value="No OS / Bootloader failure">No OS / BIOS Only</option>
              </select>
            </div>
          </div>

          {/* Quick Issue Symptom Presets */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              Quick Symptom Presets (Click to Auto-fill)
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_SYMPTOMS.map((sym, idx) => {
                const Icon = sym.icon;
                const isSelected = symptoms === sym.prompt;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSymptom(sym.prompt)}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer",
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "bg-muted/40 text-foreground border-border/40 hover:bg-muted/80 hover:border-border"
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    <span>{sym.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Symptoms Description & Error Code */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span>Detailed Symptoms & Malfunction Behavior</span>
                <span className="text-[11px] text-muted-foreground font-normal">Be specific for highest accuracy</span>
              </label>
              <Textarea
                placeholder="Describe what happens when you press the power button, any beep codes, LED blink codes, weird noises, thermal spikes, or recent liquid contact..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={3}
                className="rounded-2xl text-xs bg-background/80 resize-none p-3.5 focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-1.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Error Code / Stop Code (Optional)
                </label>
                <Input
                  placeholder="e.g. 0xc000000e, WHEA_ERROR, 3 Amber 2 White"
                  value={errorCode}
                  onChange={(e) => setErrorCode(e.target.value)}
                  className="h-9 rounded-xl text-xs bg-background/80"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || !symptoms.trim()}
                className="w-full h-11 rounded-2xl font-bold text-xs gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm cursor-pointer mt-3"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Analyzing Logic & Schematics...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Run AI Hardware Diagnosis</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Diagnostic Results Presentation */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
          
          {/* Out of scope notice if non-repair question */}
          {result.isOutOfScope ? (
            <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6 flex items-start gap-4 text-amber-800 dark:text-amber-300">
              <Info className="h-6 w-6 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Out of Scope Query</h4>
                <p className="text-xs leading-relaxed">{result.summary}</p>
                <p className="text-[11px] opacity-80 pt-1">
                  The JCR Guide Pro Diagnostic Engine is dedicated strictly to computer, laptop, OS, and electronics troubleshooting.
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-border/60 bg-card/70 backdrop-blur-xl p-6 sm:p-8 space-y-7 shadow-sm">
              
              {/* Report Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge variant="outline" className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5",
                      result.recommendedCategory === "hardware" && "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
                      result.recommendedCategory === "software" && "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
                      result.recommendedCategory === "cleaning" && "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
                      result.recommendedCategory === "upgrades" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
                    )}>
                      Category: {result.recommendedCategory}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px] font-bold px-2 py-0.5">
                      Confidence: {result.confidence}
                    </Badge>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    Diagnostic Analysis & Action Plan
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyReport}
                    className="rounded-xl text-xs gap-1.5 h-9 border-border/60"
                  >
                    {copiedReport ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Full Report</span>
                      </>
                    )}
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => setLocation(`/?category=${result.recommendedCategory}&deviceType=${deviceType}`)}
                    className="rounded-xl text-xs gap-1.5 h-9 bg-primary text-primary-foreground font-bold"
                  >
                    <Wrench className="h-3.5 w-3.5" />
                    <span>View {result.recommendedCategory} Guides</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Summary Banner */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5 flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Key Diagnostic Finding</span>
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    {result.summary}
                  </p>
                </div>
              </div>

              {/* Root Cause Hypotheses */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Probable Root Causes ({result.probableCauses?.length || 0})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {result.probableCauses?.map((cause, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-border/60 bg-background/60 p-4 space-y-2 hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-foreground leading-snug">{cause.cause}</span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] font-bold px-1.5 py-0 shrink-0",
                            cause.likelihood === "High" && "bg-rose-500/10 text-rose-600 border-rose-500/20",
                            cause.likelihood === "Medium" && "bg-amber-500/10 text-amber-600 border-amber-500/20",
                            cause.likelihood === "Low" && "bg-muted text-muted-foreground border-border/40"
                          )}
                        >
                          {cause.likelihood} Probability
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {cause.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Interactive Action Plan */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Step-by-Step Diagnostic & Resolution Protocol
                  </h4>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {completedSteps.length} of {result.stepByStepPlan?.length || 0} Completed
                  </span>
                </div>

                <div className="space-y-2.5">
                  {result.stepByStepPlan?.map((step) => {
                    const isDone = completedSteps.includes(step.stepNumber);
                    return (
                      <div
                        key={step.stepNumber}
                        onClick={() => toggleStep(step.stepNumber)}
                        className={cn(
                          "rounded-2xl border p-4 sm:p-5 flex items-start gap-4 cursor-pointer transition-all",
                          isDone 
                            ? "border-emerald-500/30 bg-emerald-500/5 opacity-80"
                            : "border-border/60 bg-background/60 hover:border-primary/40 hover:bg-background/90"
                        )}
                      >
                        <button
                          type="button"
                          className="mt-0.5 shrink-0 text-muted-foreground hover:text-foreground"
                          aria-label="Toggle step"
                        >
                          {isDone ? (
                            <CheckSquare className="h-5 w-5 text-emerald-500" />
                          ) : (
                            <Square className="h-5 w-5 text-muted-foreground" />
                          )}
                        </button>

                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-muted text-foreground">
                              Step {step.stepNumber}
                            </span>
                            <span className={cn("text-sm font-bold text-foreground", isDone && "line-through opacity-70")}>
                              {step.title}
                            </span>
                          </div>
                          <p className="text-xs text-foreground/80 leading-relaxed">
                            {step.action}
                          </p>
                          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium pt-0.5">
                            <ArrowRight className="h-3 w-3 shrink-0" />
                            <span>Expected Verification Outcome: {step.expectedOutcome}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tools & Safety Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Tools & Software Recommended */}
                <div className="rounded-2xl border border-border/50 bg-background/40 p-5 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <Wrench className="h-3.5 w-3.5 text-primary" />
                    Recommended Diagnostics & Tools
                  </h5>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {result.toolsAndSoftware?.map((tool, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-foreground/80">
                        <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                        <span>{tool}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLocation("/software-tools")}
                      className="w-full rounded-xl text-xs gap-1.5 h-8 border-border/60"
                    >
                      <Download className="h-3 w-3" />
                      <span>Download Diagnostic Utilities</span>
                    </Button>
                  </div>
                </div>

                {/* Safety & Electrostatic Warnings */}
                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <ShieldAlert className="h-3.5 w-3.5 text-rose-500" />
                    Technician Safety Directives
                  </h5>
                  <ul className="space-y-1.5 text-xs text-foreground/80">
                    {result.safetyWarnings?.map((warning, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <AlertTriangle className="h-3 w-3 text-rose-500 shrink-0 mt-0.5" />
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          )}

        </div>
      )}
    </div>
  );
}
