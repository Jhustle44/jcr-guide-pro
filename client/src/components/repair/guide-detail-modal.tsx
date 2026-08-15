import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";
import type { RepairGuide } from "@shared/schema";

interface GuideDetailModalProps {
  guideId: string;
  onClose: () => void;
  isPage?: boolean;
}

export default function GuideDetailModal({ guideId, onClose, isPage = false }: GuideDetailModalProps) {
  const queryClient = useQueryClient();

  const { data: guide, isLoading, error } = useQuery<RepairGuide>({
    queryKey: ["/api/repair-guides", guideId],
    enabled: !!guideId,
  });

  const bookmarkMutation = useMutation({
    mutationFn: () => apiRequest("PATCH", `/api/repair-guides/${guideId}/bookmark`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/repair-guides"] });
    },
  });

  if (isLoading) {
    return (
      <Dialog open={true} onOpenChange={() => onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !guide) {
    return (
      <Dialog open={true} onOpenChange={() => onClose()}>
        <DialogContent className="max-w-md">
          <div className="text-center py-6">
            <div className="text-gray-400 mb-4">
              <i className="material-icons text-6xl">error_outline</i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Guide Not Found</h3>
            <p className="text-gray-600 mb-4">The repair guide you're looking for doesn't exist.</p>
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-success-50 text-success-600";
      case "medium":
        return "bg-warning-50 text-warning-700";
      case "hard":
        return "bg-danger-50 text-danger-700";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const modalContent = (
    <>
      <DialogHeader className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-xl font-medium text-gray-900">{guide.title}</DialogTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => bookmarkMutation.mutate()}
              disabled={bookmarkMutation.isPending}
            >
              <i className={`material-icons ${guide.isBookmarked ? "text-primary-700" : "text-gray-400"}`}>
                {guide.isBookmarked ? "bookmark" : "bookmark_border"}
              </i>
            </Button>
            {!isPage && (
              <Button variant="ghost" size="icon" onClick={onClose}>
                <i className="material-icons">close</i>
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(guide.difficulty)}`}>
            {guide.difficulty.toUpperCase()}
          </span>
          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            {guide.estimatedTime}
          </span>
          <span className="text-sm text-gray-500">Updated recently</span>
        </div>
      </DialogHeader>

      <div className="p-6">
        {/* Safety Warning */}
        {guide.safetyWarnings.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex items-start space-x-3">
              <i className="material-icons text-yellow-600 text-lg mt-0.5">warning</i>
              <div>
                <h3 className="font-medium text-yellow-800 mb-1">Safety Precautions</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {guide.safetyWarnings.map((warning, index) => (
                    <li key={index}>• {warning}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Required Tools */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-3">Required Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {guide.toolsRequired.map((tool, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <i className="material-icons text-gray-600">build</i>
                <span className="text-sm">{tool}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-step Instructions */}
        <div className="space-y-6">
          <h3 className="font-medium text-gray-900">Installation Steps</h3>

          {guide.steps.map((step) => (
            <div key={step.stepNumber} className="flex space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-700 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {step.stepNumber}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                
                {step.imageUrl && (
                  <img
                    src={step.imageUrl}
                    alt={step.title}
                    className="rounded-lg shadow-sm w-full max-w-md mb-3"
                  />
                )}

                {step.notes && step.notes.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> {step.notes.join(", ")}
                    </p>
                  </div>
                )}

                {step.warnings && step.warnings.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-800">
                      <strong>Warning:</strong> {step.warnings.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Alternative Solutions */}
          {guide.alternativeSolutions && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Alternative Solutions</h4>
              <p className="text-sm text-gray-600">{guide.alternativeSolutions}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );

  if (isPage) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-material-lg">
          {modalContent}
        </div>
      </div>
    );
  }

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {modalContent}
      </DialogContent>
    </Dialog>
  );
}
