import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import GuideDetailModal from "@/components/repair/guide-detail-modal";
import type { RepairGuide } from "@shared/schema";

export default function RepairGuide() {
  const { id } = useParams<{ id: string }>();

  const { data: guide, isLoading, error } = useQuery<RepairGuide>({
    queryKey: ["/api/repair-guides", id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-material p-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-material p-6 text-center">
            <div className="text-gray-400 mb-4">
              <i className="material-icons text-6xl">error_outline</i>
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Guide Not Found</h2>
            <p className="text-gray-600">The repair guide you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <GuideDetailModal 
        guideId={guide.id}
        onClose={() => window.history.back()}
        isPage={true}
      />
    </div>
  );
}
