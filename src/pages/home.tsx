import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import DeviceSelector from "@/components/repair/device-selector";
import CategorizedGuidesHub from "@/components/repair/categorized-guides-hub";
import TechnicianWorkbench from "@/components/repair/technician-workbench";
import FloatingActionButton from "@/components/repair/floating-action-button";
import GuideDetailModal from "@/components/repair/guide-detail-modal";
import { Input } from "@/components/ui/input";
import { 
  Sparkles, 
  Search, 
  X, 
  Wrench, 
  BookOpen, 
  Zap,
  Layers,
  ArrowDown
} from "lucide-react";

export default function Home() {
  const [location, setLocation] = useLocation();
  const [selectedDeviceType, setSelectedDeviceType] = useState<"all" | "laptop" | "desktop">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("popular");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);

  // Parse URL search parameters on initial load or navigation
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("search");
    const categoryParam = params.get("category");
    const deviceParam = params.get("device");

    if (searchParam) setSearchQuery(searchParam);
    if (categoryParam) setSelectedCategory(categoryParam);
    if (deviceParam === "laptop" || deviceParam === "desktop" || deviceParam === "all") setSelectedDeviceType(deviceParam);
  }, [location]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Modern Hero & Quick Search */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/90 via-card/60 to-primary/5 border border-border/50 p-6 sm:p-9 shadow-xs">
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold tracking-wide">
            <Sparkles className="h-3.5 w-3.5" /> 624 Comprehensive Repair Guides & Technical Manuals
          </div>

          <h1 className="text-3xl sm:text-4.5xl font-extrabold tracking-tight leading-tight">
            Repair, Upgrade & Diagnose <span className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">Every Machine</span>
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
            Step-by-step verified repair manuals and teardown diagnostics organized across our 4 core repair categories (Hardware, Software, Cleaning, Upgrades) plus our Essential Technician Software & Download Hub.
          </p>

          {/* Quick Search & Device Switcher in Unified Command Bar */}
          <div className="space-y-3 pt-2">
            <div className="relative group max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search procedures, models, components (e.g. RTX 4080, Liquid Metal, BIOS, NVMe)..."
                className="w-full pl-11 pr-10 h-11 rounded-2xl bg-background/95 border-border/60 shadow-2xs text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-primary/30"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-0.5">
              <span className="text-xs font-semibold text-muted-foreground">Target Architecture:</span>
              <DeviceSelector
                selectedType={selectedDeviceType}
                onTypeChange={(type) => {
                  setSelectedDeviceType(type);
                }}
              />
            </div>
          </div>
        </div>

        <div className="absolute right-[-10%] top-[-10%] w-[50%] h-[120%] bg-gradient-to-l from-primary/10 to-transparent -z-0 blur-3xl opacity-40 pointer-events-none" />
      </section>

      {/* Categorized Repair Guides, Manuals & Downloads Hub */}
      <section className="space-y-6">
        <CategorizedGuidesHub
          selectedDeviceType={selectedDeviceType}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          sortOption={sortOption}
          onSortChange={setSortOption}
          onViewGuide={(id) => setSelectedGuideId(id)}
        />
      </section>

      {/* Interactive Technician Workbench: Diagnostics Flowchart & Component Anatomy */}
      <section className="pt-2">
        <TechnicianWorkbench deviceType={selectedDeviceType} />
      </section>

      <FloatingActionButton />

      {/* Guide Detail Modal */}
      {selectedGuideId && (
        <GuideDetailModal
          guideId={selectedGuideId}
          onClose={() => setSelectedGuideId(null)}
        />
      )}
    </div>
  );
}

