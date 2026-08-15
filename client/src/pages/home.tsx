import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DeviceSelector from "@/components/repair/device-selector";
import CategoryGrid from "@/components/repair/category-grid";
import GuideCard from "@/components/repair/guide-card";
import PartsIdentification from "@/components/repair/parts-identification";
import TroubleshootingFlowchart from "@/components/repair/troubleshooting-flowchart";
import SoftwareLinks from "@/components/repair/software-links";
import FloatingActionButton from "@/components/repair/floating-action-button";
import GuideDetailModal from "@/components/repair/guide-detail-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Filter, LayoutGrid } from "lucide-react";
import type { RepairGuide } from "@shared/schema";

export default function Home() {
  const [selectedDeviceType, setSelectedDeviceType] = useState<"laptop" | "desktop">("laptop");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("popular");
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);

  const { data: repairGuides = [], isLoading } = useQuery<RepairGuide[]>({
    queryKey: ["api", "repair-guides"], // Configured queryClient handles prefixing and base URL
  });

  const sortedGuides = [...repairGuides].sort((a, b) => {
    switch (sortOption) {
      case "difficulty":
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
      case "time":
        return a.estimatedTime.localeCompare(b.estimatedTime);
      case "popular":
      default:
        return (b.viewCount || 0) - (a.viewCount || 0);
    }
  });

  const filteredGuides = sortedGuides.filter(guide => {
    const matchesDevice = !selectedDeviceType || guide.deviceType === selectedDeviceType;
    const matchesCategory = !selectedCategory || guide.category === selectedCategory;
    return matchesDevice && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Top Hero Section (Internal) */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-primary/5 border border-primary/10 p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
           <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
             <Sparkles className="h-4 w-4" /> Welcome back, Technician
           </div>
           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
             What are we fixing today?
           </h1>
           <DeviceSelector
              selectedType={selectedDeviceType}
              onTypeChange={setSelectedDeviceType}
            />
        </div>
        <div className="absolute right-[-10%] top-[-10%] w-[50%] h-[120%] bg-gradient-to-l from-primary/10 to-transparent -z-0 blur-3xl opacity-50" />
      </section>

      {/* Categories Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
           <div className="h-8 w-1 bg-primary rounded-full" />
           <h2 className="text-2xl font-bold">Categories</h2>
        </div>
        <CategoryGrid
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          deviceType={selectedDeviceType}
        />
      </section>

      {/* Guides Grid Section */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             <div className="h-8 w-1 bg-primary rounded-full" />
             <h2 className="text-2xl font-bold">Explore Guides</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-xs font-semibold">
              <Filter className="h-3 w-3" /> Sort by:
            </div>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-44 h-10 rounded-full border-border/50 bg-background shadow-sm ring-primary/5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl shadow-glass border-border/50">
                <SelectItem value="popular">Popularity</SelectItem>
                <SelectItem value="difficulty">Difficulty Level</SelectItem>
                <SelectItem value="time">Time Estimate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 rounded-3xl bg-muted/30 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredGuides.map(guide => (
              <div key={guide.id} className="transition-all hover:translate-y-[-4px]">
                <GuideCard
                  guide={guide}
                  onViewGuide={() => setSelectedGuideId(guide.id)}
                />
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredGuides.length === 0 && (
          <div className="text-center py-20 bg-muted/10 rounded-[3rem] border border-dashed border-border/60">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
              <LayoutGrid className="h-10 w-10 text-muted-foreground/40" />
            </div>
            <h3 className="text-xl font-bold mb-2">No guides found</h3>
            <p className="text-muted-foreground">Try broadening your search or selecting a different device type.</p>
          </div>
        )}
      </section>

      {/* Feature Sections with Refined Spacing */}
      <section className="grid grid-cols-1 gap-16 pt-8 pb-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="h-8 w-1 bg-indigo-500 rounded-full" />
             <h2 className="text-2xl font-bold">Quick Diagnostics</h2>
          </div>
          <TroubleshootingFlowchart />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="h-8 w-1 bg-emerald-500 rounded-full" />
             <h2 className="text-2xl font-bold">Hardware Explorer</h2>
          </div>
          <PartsIdentification deviceType={selectedDeviceType} />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="h-8 w-1 bg-amber-500 rounded-full" />
             <h2 className="text-2xl font-bold">Technical Toolbelt</h2>
          </div>
          <SoftwareLinks deviceType={selectedDeviceType} />
        </div>
      </section>

      <FloatingActionButton />
      
      {selectedGuideId && (
        <GuideDetailModal 
          guideId={selectedGuideId}
          onClose={() => setSelectedGuideId(null)}
        />
      )}
    </div>
  );
}
