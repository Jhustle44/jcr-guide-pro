import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Laptop, 
  Monitor, 
  Wrench, 
  ArrowRight, 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  X,
  Layers,
  ChevronRight
} from "lucide-react";
import GuideDetailModal from "@/components/repair/guide-detail-modal";
import type { DeviceBrand, DeviceModel, RepairGuide } from "@shared/schema";
import { cn } from "@/lib/utils";

export default function DeviceFinder() {
  const [, setLocation] = useLocation();
  const [selectedDeviceType, setSelectedDeviceType] = useState<"laptop" | "desktop">("laptop");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModelId, setSelectedModelId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);

  // Check URL params for preselected model
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const modelParam = params.get("model");
    if (modelParam) {
      setSelectedModelId(modelParam);
    }
  }, []);

  // Fetch brands for selected device type
  const { data: brands = [], isLoading: brandsLoading } = useQuery<DeviceBrand[]>({
    queryKey: ["/api/device-brands", selectedDeviceType],
    queryFn: () => fetch(`/api/device-brands?deviceType=${selectedDeviceType}`).then(res => res.json()),
  });

  // Fetch models for selected brand or all models
  const { data: allModels = [], isLoading: modelsLoading } = useQuery<DeviceModel[]>({
    queryKey: ["/api/device-models", selectedBrand, selectedDeviceType],
    queryFn: () => {
      const url = selectedBrand 
        ? `/api/brands/${selectedBrand}/models` 
        : `/api/device-models?deviceType=${selectedDeviceType}`;
      return fetch(url).then(res => res.json());
    },
  });

  // Search models when typing
  const { data: searchResults = [] } = useQuery<DeviceModel[]>({
    queryKey: ["/api/device-models/search", searchQuery, selectedDeviceType],
    queryFn: () => fetch(`/api/device-models?search=${encodeURIComponent(searchQuery)}&deviceType=${selectedDeviceType}`).then(res => res.json()),
    enabled: searchQuery.trim().length > 1,
  });

  // Fetch compatible guides for selected model
  const { data: compatibleGuides = [], isLoading: guidesLoading } = useQuery<RepairGuide[]>({
    queryKey: ["/api/models", selectedModelId, "guides"],
    queryFn: () => selectedModelId ? fetch(`/api/models/${selectedModelId}/guides`).then(res => res.json()) : Promise.resolve([]),
    enabled: !!selectedModelId,
  });

  const displayModels = searchQuery.trim().length > 1 ? searchResults : allModels;
  const activeModel = allModels.find(m => m.id === selectedModelId) || searchResults.find(m => m.id === selectedModelId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" /> Comprehensive Model Catalog
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Find Your <span className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">Exact System</span>
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Select your brand and model to view tailored disassembly guides, component compatibility, and factory common issues.
        </p>

        {/* Device Switcher Tabs */}
        <div className="inline-flex p-1.5 rounded-2xl bg-muted/60 border border-border/50 shadow-sm mx-auto">
          <button
            onClick={() => {
              setSelectedDeviceType("laptop");
              setSelectedBrand("");
              setSelectedModelId("");
            }}
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all",
              selectedDeviceType === "laptop" 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Laptop className="h-4 w-4" /> Laptop Models
          </button>
          <button
            onClick={() => {
              setSelectedDeviceType("desktop");
              setSelectedBrand("");
              setSelectedModelId("");
            }}
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all",
              selectedDeviceType === "desktop" 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Monitor className="h-4 w-4" /> Desktop & Form Factors
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-2xl mx-auto relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${selectedDeviceType}s (e.g. MacBook Pro, ThinkPad X1, Dell XPS, Alienware, ROG, OptiPlex)...`}
          className="w-full pl-12 pr-10 h-12 rounded-2xl bg-card/80 border border-border/60 shadow-sm text-sm focus-visible:ring-2 focus-visible:ring-primary/20"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Brands Grid / Filter */}
      {!searchQuery && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Layers className="h-4 w-4" /> Filter by Brand
            </h3>
            {selectedBrand && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedBrand("")}
                className="h-7 text-xs text-muted-foreground hover:text-foreground gap-1"
              >
                <X className="h-3 w-3" /> Show All Brands
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedBrand("")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                selectedBrand === ""
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card/50 border-border/50 text-muted-foreground hover:text-foreground hover:bg-card"
              )}
            >
              All Brands ({brands.length})
            </button>
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => {
                  setSelectedBrand(selectedBrand === brand.id ? "" : brand.id);
                  setSelectedModelId("");
                }}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2",
                  selectedBrand === brand.id
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card/50 border-border/50 text-muted-foreground hover:text-foreground hover:bg-card"
                )}
              >
                <span>{brand.name}</span>
                {allModels.filter(m => m.brandId === brand.id).length > 0 && (
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full",
                    selectedBrand === brand.id ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                  )}>
                    {allModels.filter(m => m.brandId === brand.id).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid: Models List & Active Model Inspection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Device Models Grid */}
        <div className={cn("space-y-4", activeModel ? "lg:col-span-7" : "lg:col-span-12")}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">
              Available Models ({displayModels.length})
            </h2>
            <span className="text-xs text-muted-foreground">Select a system to inspect teardowns</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {displayModels.map((model) => {
              const isSelected = selectedModelId === model.id;
              const specs = model.specifications as Record<string, string> || {};

              return (
                <div
                  key={model.id}
                  onClick={() => setSelectedModelId(model.id)}
                  className={cn(
                    "p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between text-left",
                    isSelected
                      ? "bg-primary/10 border-primary shadow-md ring-1 ring-primary/30"
                      : "bg-card/50 hover:bg-card/90 border-border/50 hover:border-primary/40 hover:shadow-sm"
                  )}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors">
                        {model.name}
                      </h4>
                      {model.year && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground shrink-0">
                          {model.year}
                        </span>
                      )}
                    </div>
                    {model.series && (
                      <div className="text-xs text-primary/80 font-medium">{model.series} Series</div>
                    )}
                    {specs.cpu && (
                      <p className="text-[11px] text-muted-foreground line-clamp-1 flex items-center gap-1">
                        <Cpu className="h-3 w-3 shrink-0" /> {specs.cpu}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-border/30 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-semibold text-muted-foreground">
                      {model.guideCount || 12} Verified Guides
                    </span>
                    <span className="text-xs font-bold text-primary flex items-center gap-0.5">
                      Inspect <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {displayModels.length === 0 && (
            <div className="text-center py-12 bg-muted/20 rounded-3xl border border-dashed border-border/60 space-y-2">
              <h4 className="font-bold text-base">No models found</h4>
              <p className="text-xs text-muted-foreground">Try broadening your search query or choosing another brand.</p>
            </div>
          )}
        </div>

        {/* Right: Detailed Model Inspection & Compatible Guides */}
        {activeModel && (
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-card/80 backdrop-blur-xl border border-primary/30 shadow-lg space-y-6 sticky top-24">
              
              {/* Header */}
              <div className="space-y-2 border-b border-border/40 pb-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20">
                    Active System
                  </span>
                  <button 
                    onClick={() => setSelectedModelId("")}
                    className="text-muted-foreground hover:text-foreground text-xs"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="text-xl font-extrabold">{activeModel.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {activeModel.series} Series • Release {activeModel.year || "2024"}
                </p>
              </div>

              {/* Hardware Specifications */}
              {activeModel.specifications && Object.keys(activeModel.specifications).length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5 text-primary" /> Key Specifications
                  </h4>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    {Object.entries(activeModel.specifications as Record<string, string>).map(([key, val]) => (
                      <div key={key} className="p-2.5 rounded-xl bg-muted/40 border border-border/40 flex justify-between items-center">
                        <span className="font-semibold capitalize text-muted-foreground">{key}:</span>
                        <span className="font-medium text-foreground text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Issues & Diagnostics */}
              {Array.isArray(activeModel.commonIssues) && activeModel.commonIssues.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5" /> Known Issues & Service Points
                  </h4>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {(activeModel.commonIssues as string[]).map((issue, i) => (
                      <li key={i} className="flex items-start gap-2 bg-amber-500/5 p-2 rounded-xl border border-amber-500/20">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Compatible Repair Guides */}
              <div className="space-y-3 pt-2 border-t border-border/40">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Wrench className="h-3.5 w-3.5 text-indigo-500" /> Compatible Procedures ({compatibleGuides.length})
                </h4>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {compatibleGuides.map((guide) => (
                    <button
                      key={guide.id}
                      onClick={() => setSelectedGuideId(guide.id)}
                      className="w-full p-2.5 rounded-xl bg-muted/30 hover:bg-primary/10 border border-border/40 hover:border-primary/40 transition-all flex items-center justify-between text-left group"
                    >
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold block group-hover:text-primary transition-colors">
                          {guide.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground capitalize">
                          {guide.category} • {guide.difficulty} • {guide.estimatedTime}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

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
