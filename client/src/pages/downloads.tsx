import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, 
  FileText, 
  Video, 
  HardDrive, 
  Search,
  Filter,
  Package,
  ExternalLink,
  Archive,
  Trash2,
  CheckCircle,
  AlertCircle,
  Smartphone
} from "lucide-react";
import { downloadGuide, downloadGuidePackage, getEstimatedSize, type DownloadOptions } from "@/lib/download-utils";
import type { RepairGuide, TroubleshootingFlow, DeviceComponent } from "@shared/schema";

interface DownloadableItem {
  id: string;
  title: string;
  type: 'guide' | 'troubleshooting' | 'component' | 'package';
  size: string;
  format: string;
  description?: string;
  category?: string;
  difficulty?: string;
  estimatedTime?: string;
  deviceType?: string;
  data?: any;
}

export default function Downloads() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedDeviceType, setSelectedDeviceType] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("html");
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({});
  const [downloadedItems, setDownloadedItems] = useState<string[]>([]);
  const { toast } = useToast();

  const { data: repairGuides = [], isLoading: guidesLoading } = useQuery<RepairGuide[]>({
    queryKey: ["/api/repair-guides"],
  });

  const { data: troubleshootingFlows = [], isLoading: flowsLoading } = useQuery<TroubleshootingFlow[]>({
    queryKey: ["/api/troubleshooting-flows"],
  });

  const { data: deviceComponents = [], isLoading: componentsLoading } = useQuery<DeviceComponent[]>({
    queryKey: ["/api/device-components"],
  });

  // Convert data to downloadable items
  const downloadableItems: DownloadableItem[] = [
    ...repairGuides.map(guide => ({
      id: guide.id,
      title: guide.title,
      type: 'guide' as const,
      size: getEstimatedSize(guide, { format: selectedFormat as any }),
      format: selectedFormat.toUpperCase(),
      description: guide.description,
      category: guide.category,
      difficulty: guide.difficulty,
      estimatedTime: guide.estimatedTime,
      deviceType: guide.deviceType,
      data: guide
    })),
    ...troubleshootingFlows.map(flow => ({
      id: flow.id,
      title: flow.title,
      type: 'troubleshooting' as const,
      size: '5-15 KB',
      format: 'JSON',
      description: flow.description,
      category: flow.type,
      data: flow
    })),
    ...deviceComponents.map(component => ({
      id: component.id,
      title: component.name,
      type: 'component' as const,
      size: '2-8 KB',
      format: 'JSON',
      description: component.description,
      category: component.category,
      deviceType: component.deviceType,
      data: component
    }))
  ];

  // Filter downloadable items
  const filteredItems = downloadableItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || item.difficulty === selectedDifficulty;
    const matchesDeviceType = selectedDeviceType === "all" || item.deviceType === selectedDeviceType;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesDeviceType;
  });

  // Handle individual download
  const handleDownload = async (item: DownloadableItem) => {
    try {
      setDownloadProgress(prev => ({ ...prev, [item.id]: 0 }));
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          const current = prev[item.id] || 0;
          if (current >= 100) {
            clearInterval(progressInterval);
            return prev;
          }
          return { ...prev, [item.id]: current + 10 };
        });
      }, 100);

      let success = false;

      if (item.type === 'guide') {
        const options: DownloadOptions = {
          format: selectedFormat as any,
          includeImages: true
        };
        success = await downloadGuide(item.data, options);
      } else {
        // For troubleshooting and components, download as JSON
        const content = JSON.stringify(item.data, null, 2);
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `${item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        success = true;
      }

      clearInterval(progressInterval);
      setDownloadProgress(prev => ({ ...prev, [item.id]: 100 }));

      if (success) {
        setDownloadedItems(prev => [...prev, item.id]);
        toast({
          title: "Download Complete",
          description: `${item.title} has been downloaded successfully.`,
        });
      } else {
        throw new Error("Download failed");
      }

      // Clear progress after 2 seconds
      setTimeout(() => {
        setDownloadProgress(prev => {
          const { [item.id]: _, ...rest } = prev;
          return rest;
        });
      }, 2000);

    } catch (error) {
      console.error('Download error:', error);
      setDownloadProgress(prev => {
        const { [item.id]: _, ...rest } = prev;
        return rest;
      });
      toast({
        title: "Download Failed",
        description: `Failed to download ${item.title}. Please try again.`,
        variant: "destructive",
      });
    }
  };

  // Handle package download
  const handlePackageDownload = async (category?: string, deviceType?: string) => {
    try {
      let guidesToDownload = repairGuides;
      
      if (category && category !== "all") {
        guidesToDownload = guidesToDownload.filter(guide => guide.category === category);
      }
      
      if (deviceType && deviceType !== "all") {
        guidesToDownload = guidesToDownload.filter(guide => guide.deviceType === deviceType);
      }

      if (guidesToDownload.length === 0) {
        toast({
          title: "No Guides Found",
          description: "No guides match the selected criteria.",
          variant: "destructive",
        });
        return;
      }

      const packageName = category && category !== "all" 
        ? `${category}_guides_${deviceType || 'all'}`
        : `all_repair_guides`;

      const success = await downloadGuidePackage(guidesToDownload, packageName);

      if (success) {
        toast({
          title: "Package Download Complete",
          description: `Downloaded ${guidesToDownload.length} guides successfully.`,
        });
      }
    } catch (error) {
      console.error('Package download error:', error);
      toast({
        title: "Package Download Failed",
        description: "Failed to download guide package. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle complete export
  const handleCompleteExport = async () => {
    try {
      const bundle = {
        exportInfo: {
          title: 'JCR Guide Pro Complete Export',
          version: '1.0',
          exportedAt: new Date().toISOString(),
          totalItems: repairGuides.length + troubleshootingFlows.length + deviceComponents.length
        },
        repairGuides: repairGuides,
        troubleshootingFlows: troubleshootingFlows,
        deviceComponents: deviceComponents
      };

      const content = JSON.stringify(bundle, null, 2);
      const blob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `jcr_guide_pro_complete_export_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Complete Export Successful",
        description: `Exported ${bundle.exportInfo.totalItems} items to device storage.`,
      });
    } catch (error) {
      console.error('Complete export error:', error);
      toast({
        title: "Export Failed",
        description: "Failed to create complete export. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return <FileText className="h-4 w-4" />;
      case 'troubleshooting': return <AlertCircle className="h-4 w-4" />;
      case 'component': return <HardDrive className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'hardware': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'software': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cleaning': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'upgrades': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'power': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'performance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'display': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Download Center</h1>
            <p className="text-muted-foreground mb-6">
              Download repair guides, troubleshooting flows, and component information for offline access
            </p>

            {/* Quick Export Options */}
            <div className="flex flex-wrap gap-4 mb-6">
              <Button onClick={handleCompleteExport} size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700">
                <Package className="mr-2 h-4 w-4" />
                Export Everything
              </Button>
              <Button 
                onClick={() => handlePackageDownload("hardware")} 
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Hardware Guides
              </Button>
              <Button 
                onClick={() => handlePackageDownload("software")} 
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Software Guides
              </Button>
              <Button 
                onClick={() => handlePackageDownload("cleaning")} 
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Cleaning Guides
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Downloads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search guides..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="hardware">Hardware</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                      <SelectItem value="upgrades">Upgrades</SelectItem>
                      <SelectItem value="power">Power Issues</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="display">Display</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty</label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="All difficulties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Device Type</label>
                  <Select value={selectedDeviceType} onValueChange={setSelectedDeviceType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All devices" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Devices</SelectItem>
                      <SelectItem value="laptop">Laptop</SelectItem>
                      <SelectItem value="desktop">Desktop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Download Format</label>
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="html">HTML (Recommended)</SelectItem>
                      <SelectItem value="json">JSON Data</SelectItem>
                      <SelectItem value="pdf">PDF (Printable)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Items */}
          {guidesLoading || flowsLoading || componentsLoading ? (
            <div className="text-center py-8">Loading downloadable content...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <span className="text-sm font-medium capitalize">{item.type}</span>
                      </div>
                      {downloadedItems.includes(item.id) && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
                    {item.description && (
                      <CardDescription className="text-sm line-clamp-2">
                        {item.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.category && (
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category}
                        </Badge>
                      )}
                      {item.difficulty && (
                        <Badge className={getDifficultyColor(item.difficulty)}>
                          {item.difficulty}
                        </Badge>
                      )}
                      {item.deviceType && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Smartphone className="h-3 w-3" />
                          {item.deviceType}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">
                        Size: {item.size}
                      </span>
                      <span className="text-sm font-medium">
                        {item.format}
                      </span>
                    </div>

                    {downloadProgress[item.id] !== undefined ? (
                      <div className="space-y-2">
                        <Progress value={downloadProgress[item.id]} className="h-2" />
                        <p className="text-sm text-center text-muted-foreground">
                          Downloading... {downloadProgress[item.id]}%
                        </p>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleDownload(item)}
                        className="w-full"
                        disabled={downloadedItems.includes(item.id)}
                      >
                        {downloadedItems.includes(item.id) ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Downloaded
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </>
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredItems.length === 0 && !guidesLoading && !flowsLoading && !componentsLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No items found matching your search criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}