import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DownloadModal } from "@/components/ui/download-modal";
import { apiRequest } from "@/lib/queryClient";
import { Download, Bookmark, Eye, Clock, Wrench, ArrowRight, Laptop, Monitor, Sparkles, Cpu, Code, Eraser, MoveUp } from "lucide-react";
import type { RepairGuide } from "@shared/schema";
import { cn } from "@/lib/utils";

interface GuideCardProps {
  guide: RepairGuide;
  onViewGuide: () => void;
}

export default function GuideCard({ guide, onViewGuide }: GuideCardProps) {
  const queryClient = useQueryClient();
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const bookmarkMutation = useMutation({
    mutationFn: () => apiRequest("PATCH", `/api/repair-guides/${guide.id}/bookmark`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api", "repair-guides"] });
    },
  });

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
      case "medium":
        return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30";
      case "hard":
        return "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30";
      default:
        return "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30";
    }
  };

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case "hardware":
        return { label: "Hardware", icon: Cpu, color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20" };
      case "software":
        return { label: "Software", icon: Code, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
      case "cleaning":
        return { label: "Cleaning", icon: Eraser, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
      case "upgrades":
        return { label: "Upgrades", icon: MoveUp, color: "text-purple-500 bg-purple-500/10 border-purple-500/20" };
      default:
        return { label: category, icon: Sparkles, color: "text-primary bg-primary/10 border-primary/20" };
    }
  };

  const formatCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  const categoryInfo = getCategoryInfo(guide.category);
  const CategoryIcon = categoryInfo.icon;

  return (
    <div className="group relative bg-card/60 hover:bg-card/90 backdrop-blur-md rounded-3xl border border-border/50 hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden">

      {/* Image with Gradient Overlay */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted/40 cursor-pointer" onClick={onViewGuide}>
        <img
          src={guide.imageUrl}
          alt={guide.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-black/30" />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <span className={cn(
            "px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full border backdrop-blur-md",
            getDifficultyStyles(guide.difficulty)
          )}>
            {guide.difficulty}
          </span>
          <span className={cn(
            "px-2.5 py-0.5 text-[11px] font-semibold rounded-full border backdrop-blur-md flex items-center gap-1",
            categoryInfo.color
          )}>
            <CategoryIcon className="h-3 w-3" />
            {categoryInfo.label}
          </span>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 flex items-center gap-1">
            {guide.deviceType === "laptop" ? <Laptop className="h-3 w-3" /> : <Monitor className="h-3 w-3" />}
            {guide.deviceType === "laptop" ? "Laptop" : "Desktop"}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              bookmarkMutation.mutate();
            }}
            disabled={bookmarkMutation.isPending}
            className="h-8 w-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-colors"
            title={guide.isBookmarked ? "Remove Bookmark" : "Save Guide"}
          >
            <Bookmark className={cn("h-3.5 w-3.5", guide.isBookmarked && "fill-current text-primary")} />
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2.5">
          <Clock className="h-3.5 w-3.5 text-primary" /> {guide.estimatedTime}
          <span className="opacity-40">•</span>
          <Wrench className="h-3.5 w-3.5 text-primary" /> {guide.toolsRequired ? guide.toolsRequired.length : 0} Tools
        </div>

        <h3 
          onClick={onViewGuide}
          className="text-base sm:text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1 cursor-pointer"
        >
          {guide.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {guide.description}
        </p>

        <div className="mt-auto pt-3 border-t border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" /> {formatCount(guide.viewCount || 0)}
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-3.5 w-3.5" /> {formatCount(guide.downloadCount || 0)}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10"
              onClick={() => setShowDownloadModal(true)}
              title="Download for offline access"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={onViewGuide}
              className="rounded-full h-8 px-3.5 gap-1.5 text-xs font-semibold"
            >
              Open <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <DownloadModal
        open={showDownloadModal}
        onOpenChange={setShowDownloadModal}
        guide={guide}
      />
    </div>
  );
}
