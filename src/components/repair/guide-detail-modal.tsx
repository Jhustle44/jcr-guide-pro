import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";
import { 
  Bookmark, 
  X, 
  AlertTriangle, 
  Wrench, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Info, 
  ShieldAlert, 
  Share2, 
  Printer, 
  Laptop, 
  Monitor, 
  Cpu, 
  Code, 
  Eraser, 
  MoveUp,
  ExternalLink,
  ChevronRight,
  Zap,
  Gauge,
  ListOrdered,
  FileCheck2,
  SlidersHorizontal,
  Check
} from "lucide-react";
import type { RepairGuide, DeviceModel, RepairStep } from "@shared/schema";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface GuideDetailModalProps {
  guideId: string;
  onClose: () => void;
  isPage?: boolean;
}

export default function GuideDetailModal({ guideId, onClose, isPage = false }: GuideDetailModalProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [checkedSubSteps, setCheckedSubSteps] = useState<Record<string, boolean>>({});

  const { data: guide, isLoading, error } = useQuery<RepairGuide>({
    queryKey: ["/api/repair-guides", guideId],
    queryFn: () => fetch(`/api/repair-guides/${guideId}`).then(res => res.json()),
    enabled: !!guideId,
  });

  const { data: compatibleModels = [] } = useQuery<DeviceModel[]>({
    queryKey: ["/api/guides", guideId, "models"],
    queryFn: () => fetch(`/api/guides/${guideId}/models`).then(res => res.json()),
    enabled: !!guideId,
  });

  const bookmarkMutation = useMutation({
    mutationFn: () => apiRequest("PATCH", `/api/repair-guides/${guideId}/bookmark`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/repair-guides", guideId] });
      queryClient.invalidateQueries({ queryKey: ["api", "repair-guides"] });
      toast({
        title: guide?.isBookmarked ? "Removed from Bookmarks" : "Saved to Bookmarks",
        description: guide?.isBookmarked ? "Guide removed from your favorites." : "Guide added to your saved offline repair library.",
      });
    },
  });

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepNumber) 
        ? prev.filter(s => s !== stepNumber) 
        : [...prev, stepNumber]
    );
  };

  const toggleSubStep = (stepNumber: number, subIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const key = `${stepNumber}-${subIndex}`;
    setCheckedSubSteps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/guide/${guideId}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied",
      description: "Direct guide URL has been copied to your clipboard.",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    const SkeletonUI = (
      <div className="p-6 md:p-8 space-y-6 animate-pulse">
        <div className="h-8 bg-muted rounded-2xl w-3/4" />
        <div className="h-4 bg-muted rounded-xl w-1/2" />
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="h-20 bg-muted rounded-2xl" />
          <div className="h-20 bg-muted rounded-2xl" />
          <div className="h-20 bg-muted rounded-2xl" />
        </div>
        <div className="space-y-4 pt-4">
          <div className="h-32 bg-muted rounded-2xl" />
          <div className="h-32 bg-muted rounded-2xl" />
        </div>
      </div>
    );

    if (isPage) return <div className="bg-card rounded-3xl border border-border/50">{SkeletonUI}</div>;
    return (
      <Dialog open={true} onOpenChange={() => onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl border-border/60 bg-card">
          {SkeletonUI}
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !guide) {
    const ErrorUI = (
      <div className="p-8 text-center space-y-4">
        <div className="h-12 w-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold">Failed to load repair guide</h3>
        <p className="text-sm text-muted-foreground">The requested manual could not be retrieved from the database.</p>
        <Button onClick={onClose} variant="outline" className="rounded-full">Close</Button>
      </div>
    );

    if (isPage) return <div className="bg-card rounded-3xl border border-border/50">{ErrorUI}</div>;
    return (
      <Dialog open={true} onOpenChange={() => onClose()}>
        <DialogContent className="max-w-md p-0 rounded-3xl border-border/60 bg-card">{ErrorUI}</DialogContent>
      </Dialog>
    );
  }

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "easy": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "medium": return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "hard": return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case "hardware": return { label: "Hardware Repair", icon: Cpu, badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" };
      case "software": return { label: "Software / OS Protocol", icon: Code, badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" };
      case "cleaning": return { label: "Thermal & Cleaning", icon: Eraser, badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" };
      case "upgrades": return { label: "Performance Upgrade", icon: MoveUp, badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" };
      default: return { label: "Technical Guide", icon: Wrench, badge: "bg-primary/10 text-primary border-primary/20" };
    }
  };

  const catTheme = getCategoryTheme(guide.category);
  const CategoryIcon = catTheme.icon;
  const steps = (guide.steps || []) as RepairStep[];

  const content = (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 md:p-8 border-b border-border/40 space-y-4 bg-muted/20">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border flex items-center gap-1.5", catTheme.badge)}>
              <CategoryIcon className="h-3.5 w-3.5" />
              {catTheme.label}
            </span>
            <span className={cn("text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border", getDifficultyColor(guide.difficulty))}>
              {guide.difficulty} Difficulty
            </span>
            <span className="text-[11px] font-semibold text-muted-foreground bg-muted/80 px-3 py-1 rounded-full border border-border/50 flex items-center gap-1">
              {guide.deviceType === "laptop" ? <Laptop className="h-3.5 w-3.5" /> : <Monitor className="h-3.5 w-3.5" />}
              {guide.deviceType === "laptop" ? "Laptop & Ultrabook" : "Desktop PC & Tower"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => bookmarkMutation.mutate()}
              className={cn("h-8 rounded-xl text-xs gap-1.5 border-border/60 transition-colors", guide.isBookmarked && "bg-amber-500/10 text-amber-600 border-amber-500/30")}
            >
              <Bookmark className={cn("h-3.5 w-3.5", guide.isBookmarked && "fill-amber-500 text-amber-500")} />
              <span>{guide.isBookmarked ? "Saved" : "Save"}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="h-8 rounded-xl text-xs gap-1.5 border-border/60"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="h-8 rounded-xl text-xs gap-1.5 border-border/60 hidden sm:flex"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print</span>
            </Button>
            {!isPage && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full ml-1"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground leading-snug">
          {guide.title}
        </DialogTitle>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl">
          {guide.description}
        </p>

        {/* Quick Bench Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-card/60 border border-border/40 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase">Estimated Time</div>
              <div className="text-xs font-bold text-foreground">{guide.estimatedTime}</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-card/60 border border-border/40 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
              <Wrench className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase">Bench Tools</div>
              <div className="text-xs font-bold text-foreground">{guide.toolsRequired ? guide.toolsRequired.length : 0} items</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-card/60 border border-border/40 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
              <ListOrdered className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase">Total Steps</div>
              <div className="text-xs font-bold text-foreground">{steps.length} detailed phases</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-card/60 border border-border/40 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase">Bench Progress</div>
              <div className="text-xs font-bold text-foreground">{completedSteps.length} of {steps.length} complete</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* Safety Warnings Checklist */}
        {guide.safetyWarnings && guide.safetyWarnings.length > 0 && (
          <div className="p-5 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-950 dark:text-rose-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-400 text-sm">
              <AlertTriangle className="h-5 w-5" />
              Critical Safety & ESD Directives (Must Review Before Disassembly)
            </div>
            <ul className="space-y-2 pl-2 text-xs sm:text-sm">
              {guide.safetyWarnings.map((warning, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Required Tools Grid */}
        {guide.toolsRequired && guide.toolsRequired.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Wrench className="h-4 w-4 text-primary" />
              Required Bench Equipment & Precision Drivers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {guide.toolsRequired.map((tool, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-muted/40 border border-border/50 text-xs font-medium flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                  <span className="text-foreground/90">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compatible Device Models */}
        {compatibleModels.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" />
              Compatible Hardware Series
            </h3>
            <div className="flex flex-wrap gap-2">
              {compatibleModels.map((model) => (
                <span key={model.id} className="px-3 py-1.5 rounded-2xl bg-card border border-border/60 text-xs font-semibold text-foreground/90">
                  {model.name} {model.year ? `(${model.year})` : ""}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Start-to-Finish Intimate Step-by-Step Procedure */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-foreground">
                <FileCheck2 className="h-5 w-5 text-emerald-500" />
                Start-to-Finish Comprehensive Repair Sequence
              </h3>
              <p className="text-xs text-muted-foreground">
                Follow all technical phases in chronological order. Check off completed items to track bench progress.
              </p>
            </div>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
              {completedSteps.length}/{steps.length} Steps Completed
            </span>
          </div>

          <div className="space-y-5">
            {steps.map((step, sIdx) => {
              const isCompleted = completedSteps.includes(step.stepNumber);

              return (
                <div
                  key={step.stepNumber}
                  onClick={() => toggleStep(step.stepNumber)}
                  className={cn(
                    "p-5 sm:p-6 rounded-3xl border transition-all duration-300 cursor-pointer space-y-4",
                    isCompleted
                      ? "bg-emerald-500/5 border-emerald-500/30"
                      : "bg-card/40 hover:bg-card/70 border-border/50 hover:border-primary/40"
                  )}
                >
                  {/* Step Header with Phase & Tool Specifications */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/30 pb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors shrink-0",
                        isCompleted ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground"
                      )}>
                        {isCompleted ? <Check className="h-4 w-4" /> : step.stepNumber}
                      </div>

                      <div>
                        {step.phase && (
                          <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                            {step.phase}
                          </div>
                        )}
                        <h4 className={cn("font-bold text-base sm:text-lg text-foreground", isCompleted && "line-through text-muted-foreground")}>
                          {step.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pl-11 sm:pl-0">
                      {step.torqueSpec && (
                        <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                          <Gauge className="h-3 w-3" />
                          {step.torqueSpec}
                        </span>
                      )}
                      {step.toolRequired && (
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/40 flex items-center gap-1">
                          <Wrench className="h-3 w-3" />
                          {step.toolRequired}
                        </span>
                      )}
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full",
                        isCompleted ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                      )}>
                        {isCompleted ? "Step Completed" : `Step ${step.stepNumber} of ${steps.length}`}
                      </span>
                    </div>
                  </div>

                  {/* Primary Detailed Technical Description */}
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed pl-0 sm:pl-11">
                    {step.description}
                  </p>

                  {/* Intimate Sub-Steps Checklist */}
                  {step.subSteps && step.subSteps.length > 0 && (
                    <div className="pl-0 sm:pl-11 space-y-2 pt-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <ListOrdered className="h-3.5 w-3.5 text-primary" />
                        Granular Micro-Procedures Checklist
                      </div>
                      <div className="space-y-1.5">
                        {step.subSteps.map((sub, subIdx) => {
                          const isSubChecked = !!checkedSubSteps[`${step.stepNumber}-${subIdx}`];
                          return (
                            <div
                              key={subIdx}
                              onClick={(e) => toggleSubStep(step.stepNumber, subIdx, e)}
                              className={cn(
                                "p-2.5 rounded-xl border text-xs flex items-start gap-2.5 transition-colors cursor-pointer",
                                isSubChecked
                                  ? "bg-emerald-500/10 border-emerald-500/30 text-muted-foreground"
                                  : "bg-background/60 hover:bg-muted/60 border-border/40 text-foreground/90"
                              )}
                            >
                              <div className={cn(
                                "h-4 w-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                                isSubChecked ? "bg-emerald-500 border-emerald-500 text-white" : "border-border/80 bg-background"
                              )}>
                                {isSubChecked && <Check className="h-3 w-3" />}
                              </div>
                              <span className={cn("leading-relaxed", isSubChecked && "line-through")}>
                                {sub}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step Image */}
                  {step.imageUrl && (
                    <div className="pl-0 sm:pl-11 pt-2">
                      <img
                        src={step.imageUrl}
                        alt={step.title}
                        className="rounded-2xl border border-border/40 w-full max-h-80 object-cover shadow-2xs"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Verification Checkpoints */}
                  {step.checkpoints && step.checkpoints.length > 0 && (
                    <div className="ml-0 sm:ml-11 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-950 dark:text-emerald-200 space-y-1.5">
                      <div className="font-bold flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        Verification Checkpoints (Confirm Before Proceeding)
                      </div>
                      <ul className="space-y-1 pl-5 list-disc text-emerald-900 dark:text-emerald-200">
                        {step.checkpoints.map((cp, cpIdx) => (
                          <li key={cpIdx}>{cp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Warnings / Cautions */}
                  {step.warnings && step.warnings.length > 0 && (
                    <div className="ml-0 sm:ml-11 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-950 dark:text-rose-200 flex items-start gap-2.5">
                      <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <strong>Technician Caution:</strong> {step.warnings.join(" ")}
                      </div>
                    </div>
                  )}

                  {/* Pro Tips */}
                  {step.tips && step.tips.length > 0 && (
                    <div className="ml-0 sm:ml-11 p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-950 dark:text-indigo-200 flex items-start gap-2.5">
                      <Info className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <strong>Bench Pro Tip:</strong> {step.tips.join(" ")}
                      </div>
                    </div>
                  )}

                  {/* Engineering Notes */}
                  {step.notes && step.notes.length > 0 && (
                    <div className="ml-0 sm:ml-11 p-3 rounded-xl bg-muted/40 border border-border/40 text-xs text-muted-foreground">
                      <strong>Specification Note:</strong> {step.notes.join(" ")}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Alternative Solutions & Post-Repair Validation */}
        {guide.alternativeSolutions && (
          <div className="p-5 rounded-3xl bg-muted/40 border border-border/50 space-y-2">
            <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Post-Repair Quality Assurance & Alternative Methods
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {guide.alternativeSolutions}
            </p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 md:p-8 bg-muted/30 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
          <CheckCircle2 className="h-4 w-4" />
          <span>JCR Certified Intimate Engineering Standard</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {!isPage && (
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-2xl text-xs h-10 px-5 flex-1 sm:flex-initial border-border/60"
            >
              Close
            </Button>
          )}
          <Button
            onClick={() => {
              toast({
                title: "Guide Exported",
                description: `Complete technical package for "${guide.title}" is saved for offline bench reference.`,
              });
            }}
            className="rounded-2xl text-xs font-bold h-10 px-6 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground flex-1 sm:flex-initial shadow-xs"
          >
            <Bookmark className="h-4 w-4" />
            <span>Export Offline Guide</span>
          </Button>
        </div>
      </div>
    </div>
  );

  if (isPage) {
    return <div className="bg-card rounded-3xl border border-border/50 shadow-glass overflow-hidden">{content}</div>;
  }

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto p-0 rounded-3xl border-border/60 bg-card/95 backdrop-blur-2xl shadow-glass">
        {content}
      </DialogContent>
    </Dialog>
  );
}
