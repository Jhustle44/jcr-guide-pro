import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import GuideDetailModal from "@/components/repair/guide-detail-modal";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import type { RepairGuide } from "@shared/schema";

export default function RepairGuide() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();

  const { data: guide, isLoading, error } = useQuery<RepairGuide>({
    queryKey: ["/api/repair-guides", id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-card/50 border border-border/50 rounded-3xl p-8 animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded-xl w-3/4 mb-4"></div>
          <div className="h-4 bg-muted rounded-lg w-full mb-2"></div>
          <div className="h-4 bg-muted rounded-lg w-5/6 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 bg-muted rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-card/50 border border-border/50 rounded-3xl p-8 text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Guide Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The repair guide you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => setLocation("/")} className="rounded-full gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Guides
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <GuideDetailModal 
        guideId={guide.id}
        onClose={() => setLocation("/")}
        isPage={true}
      />
    </div>
  );
}
