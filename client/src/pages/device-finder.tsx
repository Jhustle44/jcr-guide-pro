import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Laptop, Monitor, Star, Wrench, Filter, ExternalLink, Eye, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import type { DeviceBrand, DeviceModel, RepairGuide } from "@shared/schema";

export default function DeviceFinder() {
  const [, setLocation] = useLocation();
  const [selectedDeviceType, setSelectedDeviceType] = useState<"laptop" | "desktop">("laptop");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [guideFilter, setGuideFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Fetch brands for selected device type
  const { data: brands = [] } = useQuery<DeviceBrand[]>({
    queryKey: ["/api/device-brands", selectedDeviceType],
    queryFn: () => fetch(`/api/device-brands?deviceType=${selectedDeviceType}`).then(res => res.json()),
  });

  // Fetch models for selected brand
  const { data: models = [] } = useQuery<DeviceModel[]>({
    queryKey: ["/api/device-models", selectedBrand],
    queryFn: () => selectedBrand ? fetch(`/api/brands/${selectedBrand}/models`).then(res => res.json()) : Promise.resolve([]),
    enabled: !!selectedBrand,
  });

  // Fetch compatible guides for selected model
  const { data: compatibleGuides = [] } = useQuery<RepairGuide[]>({
    queryKey: ["/api/models", selectedModel, "guides"],
    queryFn: () => selectedModel ? fetch(`/api/models/${selectedModel}/guides`).then(res => res.json()) : Promise.resolve([]),
    enabled: !!selectedModel,
  });

  // Search models when typing
  const { data: searchResults = [] } = useQuery<DeviceModel[]>({
    queryKey: ["/api/device-models/search", searchQuery, selectedDeviceType],
    queryFn: () => searchQuery ? fetch(`/api/device-models?search=${encodeURIComponent(searchQuery)}&deviceType=${selectedDeviceType}`).then(res => res.json()) : Promise.resolve([]),
    enabled: searchQuery.length > 2,
  });

  const selectedModelData = models.find(m => m.id === selectedModel);

  const getSupportLevelColor = (level: string) => {
    switch (level) {
      case "official": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "community": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "basic": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  // Filter compatible guides based on selected filters
  const filteredGuides = compatibleGuides.filter(guide => {
    const difficultyMatch = guideFilter === "all" || guide.difficulty === guideFilter;
    const categoryMatch = categoryFilter === "all" || guide.category === categoryFilter;
    return difficultyMatch && categoryMatch;
  });

  const handleGuideClick = (guideId: string) => {
    setLocation(`/guide/${guideId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 amoled:bg-black">
      <Header />
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white amoled:text-white">
              Device Finder
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 amoled:text-gray-300">
              Find specific repair guides for your laptop or desktop computer model
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 amoled:text-gray-400">
              <div className="flex items-center gap-2">
                <Laptop className="h-4 w-4 text-primary-600" />
                <span>25+ Device Brands</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-primary-600" />
                <span>150+ Device Models</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-primary-600" />
                <span>Compatibility Verified</span>
              </div>
            </div>
          </div>

          <Tabs value={selectedDeviceType} onValueChange={(value) => {
            setSelectedDeviceType(value as "laptop" | "desktop");
            setSelectedBrand("");
            setSelectedModel("");
            setSearchQuery("");
          }} className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="laptop" className="flex items-center gap-2">
                <Laptop className="h-4 w-4" />
                Laptops
              </TabsTrigger>
              <TabsTrigger value="desktop" className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Desktops
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedDeviceType} className="space-y-6">
              {/* Search Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Quick Search
                  </CardTitle>
                  <CardDescription>
                    Search for your specific device model
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Input
                      placeholder={`Search ${selectedDeviceType} models...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  {searchResults.length > 0 && (
                    <div className="mt-4 grid gap-3">
                      {searchResults.slice(0, 5).map((model) => (
                        <Card key={model.id} className="cursor-pointer hover:bg-accent" onClick={() => {
                          setSelectedModel(model.id);
                          setSelectedBrand(model.brandId);
                          setSearchQuery("");
                        }}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-semibold">{model.name}</h4>
                                <p className="text-sm text-muted-foreground">{model.series} • {model.year}</p>
                              </div>
                              <Badge variant="secondary">{model.guideCount} guides</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Brand Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Browse by Brand</CardTitle>
                  <CardDescription>
                    Select your device brand to see compatible models
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {brands.map((brand) => (
                      <Card
                        key={brand.id}
                        className={`cursor-pointer transition-colors ${
                          selectedBrand === brand.id ? "ring-2 ring-primary" : "hover:bg-accent"
                        }`}
                        onClick={() => {
                          setSelectedBrand(brand.id);
                          setSelectedModel("");
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">{brand.name}</h3>
                            <Badge className={getSupportLevelColor(brand.supportLevel)}>
                              {brand.supportLevel}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Star className="h-4 w-4" />
                            {brand.popularity} popularity
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Model Selection */}
              {selectedBrand && models.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Select Your Model</CardTitle>
                    <CardDescription>
                      Choose your specific device model
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-2">
                      {models.map((model) => (
                        <Card
                          key={model.id}
                          className={`cursor-pointer transition-colors ${
                            selectedModel === model.id ? "ring-2 ring-primary" : "hover:bg-accent"
                          }`}
                          onClick={() => setSelectedModel(model.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-semibold">{model.name}</h4>
                              <Badge variant="outline">{model.year}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{model.series}</p>
                            <div className="flex items-center gap-2 text-sm">
                              <Wrench className="h-4 w-4" />
                              {model.guideCount} repair guides
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Model Details and Compatible Guides */}
              {selectedModelData && (
                <div className="grid gap-6 lg:grid-cols-3">
                  {/* Model Details */}
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{selectedModelData.name}</CardTitle>
                          <CardDescription>
                            {selectedModelData.series} • {selectedModelData.year}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                          {selectedModelData.guideCount} guides
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedModelData.specifications && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm text-gray-900 dark:text-white amoled:text-white flex items-center gap-2">
                            <i className="material-icons text-sm">computer</i>
                            Specifications
                          </h4>
                          <div className="text-sm space-y-2 bg-gray-50 dark:bg-gray-800 amoled:bg-gray-900 p-3 rounded-lg">
                            {Object.entries(selectedModelData.specifications as Record<string, any>).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center">
                                <span className="capitalize text-gray-600 dark:text-gray-400 amoled:text-gray-400 font-medium">
                                  {key}:
                                </span>
                                <span className="text-gray-900 dark:text-white amoled:text-white">{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {selectedModelData.commonIssues && (selectedModelData.commonIssues as any[]).length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm text-gray-900 dark:text-white amoled:text-white flex items-center gap-2">
                            <i className="material-icons text-sm text-red-600">warning</i>
                            Common Issues
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {(selectedModelData.commonIssues as any[]).map((issue, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {String(issue)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Compatible Guides */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Wrench className="h-5 w-5 text-primary-600" />
                            Compatible Repair Guides
                          </CardTitle>
                          <CardDescription>
                            {filteredGuides.length} of {compatibleGuides.length} guides match your filters
                          </CardDescription>
                        </div>
                        
                        {/* Guide Filters */}
                        <div className="flex items-center gap-2">
                          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-36">
                              <Filter className="h-4 w-4 mr-1" />
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              <SelectItem value="hardware">Hardware</SelectItem>
                              <SelectItem value="software">Software</SelectItem>
                              <SelectItem value="cleaning">Cleaning</SelectItem>
                              <SelectItem value="upgrades">Upgrades</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Select value={guideFilter} onValueChange={setGuideFilter}>
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Levels</SelectItem>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {filteredGuides.map((guide) => (
                          <Card 
                            key={guide.id} 
                            className="hover:bg-gray-50 dark:hover:bg-gray-800 amoled:hover:bg-gray-900 cursor-pointer border-l-4 border-l-transparent hover:border-l-primary-500 transition-all duration-200"
                            onClick={() => handleGuideClick(guide.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-semibold text-gray-900 dark:text-white amoled:text-white text-sm">
                                  {guide.title}
                                </h5>
                                <div className="flex items-center gap-2">
                                  <Badge 
                                    variant={
                                      guide.difficulty === "easy" ? "default" :
                                      guide.difficulty === "medium" ? "secondary" : "destructive"
                                    }
                                    className="text-xs"
                                  >
                                    {guide.difficulty}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {guide.category}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 amoled:text-gray-300 mb-3 line-clamp-2">
                                {guide.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 amoled:text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <i className="material-icons text-xs">schedule</i>
                                    {guide.estimatedTime}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    {guide.viewCount}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Download className="h-3 w-3" />
                                    {guide.downloadCount}
                                  </span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 px-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleGuideClick(guide.id);
                                  }}
                                >
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        
                        {filteredGuides.length === 0 && compatibleGuides.length > 0 && (
                          <div className="text-center py-8 text-gray-500 dark:text-gray-400 amoled:text-gray-400">
                            <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="font-medium">No guides match your current filters</p>
                            <p className="text-sm">Try adjusting the difficulty or category filters above</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-3"
                              onClick={() => {
                                setGuideFilter("all");
                                setCategoryFilter("all");
                              }}
                            >
                              Clear Filters
                            </Button>
                          </div>
                        )}
                        
                        {compatibleGuides.length === 0 && (
                          <div className="text-center py-8 text-gray-500 dark:text-gray-400 amoled:text-gray-400">
                            <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="font-medium">No guides available yet for this model</p>
                            <p className="text-sm">Check back later or browse our general repair guides</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-3"
                              onClick={() => setLocation("/")}
                            >
                              Browse All Guides
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Popular Devices Section */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white amoled:text-white">
              Popular Device Categories
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover:bg-gray-50 dark:hover:bg-gray-800 amoled:hover:bg-gray-900 cursor-pointer transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <i className="material-icons text-blue-600 dark:text-blue-300">laptop_mac</i>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white amoled:text-white mb-1">MacBook Series</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 amoled:text-gray-300">15+ models supported</p>
                </CardContent>
              </Card>

              <Card className="hover:bg-gray-50 dark:hover:bg-gray-800 amoled:hover:bg-gray-900 cursor-pointer transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <i className="material-icons text-red-600 dark:text-red-300">laptop_windows</i>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white amoled:text-white mb-1">ThinkPad Series</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 amoled:text-gray-300">20+ models supported</p>
                </CardContent>
              </Card>

              <Card className="hover:bg-gray-50 dark:hover:bg-gray-800 amoled:hover:bg-gray-900 cursor-pointer transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <i className="material-icons text-green-600 dark:text-green-300">desktop_windows</i>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white amoled:text-white mb-1">Gaming PCs</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 amoled:text-gray-300">Custom builds supported</p>
                </CardContent>
              </Card>

              <Card className="hover:bg-gray-50 dark:hover:bg-gray-800 amoled:hover:bg-gray-900 cursor-pointer transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <i className="material-icons text-purple-600 dark:text-purple-300">business</i>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white amoled:text-white mb-1">Business Laptops</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 amoled:text-gray-300">Enterprise solutions</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}