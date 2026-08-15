import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DownloadModal } from "@/components/ui/download-modal";
import { apiRequest } from "@/lib/queryClient";
import { Download, Bookmark, Eye, Clock, Wrench, ArrowRight } from "lucide-react";
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
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "medium":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "hard":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    }
  };

  const formatCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  return (
    <div className="group relative bg-card/40 backdrop-blur-sm rounded-[2rem] border border-border/40 overflow-hidden hover:border-primary/40 hover:shadow-glass transition-all duration-500 flex flex-col h-full">

      {/* Image with Gradient Overlay */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={guide.imageUrl}
          alt={guide.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={cn(
            "px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border backdrop-blur-md",
            getDifficultyStyles(guide.difficulty)
          )}>
            {guide.difficulty}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            bookmarkMutation.mutate();
          }}
          disabled={bookmarkMutation.isPending}
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-all duration-300"
        >
          <Bookmark className={cn("h-4 w-4", guide.isBookmarked && "fill-current")} />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
          <Clock className="h-3 w-3 text-primary" /> {guide.estimatedTime}
          <span className="opacity-30">•</span>
          <Wrench className="h-3 w-3 text-primary" /> {guide.toolsRequired.length} Tools
        </div>

        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">{guide.title}</h3>
        <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">{guide.description}</p>

        <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] font-medium text-muted-foreground">
             <div className="flex items-center gap-1">
               <Eye className="h-3.5 w-3.5" /> {formatCount(guide.viewCount || 0)}
             </div>
             <div className="flex items-center gap-1">
               <Download className="h-3.5 w-3.5" /> {formatCount(guide.downloadCount || 0)}
             </div>
          </div>

          <div className="flex items-center gap-2">
             <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDownloadModal(true);
                }}
                className="rounded-full h-9 w-9 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                onClick={onViewGuide}
                className="rounded-full h-10 px-5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-sm gap-2 text-xs group/btn"
              >
                Launch
                <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
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
