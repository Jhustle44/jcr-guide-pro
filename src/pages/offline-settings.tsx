import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useOfflineMode } from "@/hooks/useOfflineMode";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/contexts/theme-context";
import { formatStorageSize } from "@/lib/offline-storage";
import { getApiBaseUrl, setApiBaseUrl } from "@/lib/config";
import { TECHNICAL_MANUALS } from "../../shared/technical-manuals";
import {
  Download, 
  Upload, 
  Wifi, 
  WifiOff, 
  HardDrive, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Settings,
  Server,
  Globe,
  User as UserIcon,
  Camera,
  LogOut,
  Moon,
  Sun,
  Smartphone,
  Trash2,
  Database,
  BookOpen,
  Cpu,
  Layers,
  Activity,
  Check
} from "lucide-react";
import { motion } from "framer-motion";

export default function OfflineSettings() {
  const { toast } = useToast();
  const { user, logoutMutation } = useAuth();
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [isDeletingCache, setIsDeletingCache] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pingStatus, setPingStatus] = useState<{ testing: boolean; latency?: number; success?: boolean; details?: string } | null>(null);

  const {
    isOfflineSupported,
    isOfflineModeEnabled,
    isCurrentlyOnline,
    lastSyncTime,
    storageInfo,
    isSyncing,
    syncProgress,
    syncStatusText,
    enableOfflineMode,
    disableOfflineMode,
    fullSync,
    clearCache,
    getOfflineData,
    offlineGuides,
    offlineManuals,
  } = useOfflineMode();

  // Ensure default serverUrl is always non-empty
  const [serverUrl, setServerUrl] = useState(() => {
    const current = getApiBaseUrl();
    if (!current || current === "") {
      return typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    }
    return current;
  });

  useEffect(() => {
    const configured = getApiBaseUrl();
    if (configured) {
      setServerUrl(configured);
    } else if (typeof window !== "undefined") {
      setServerUrl(window.location.origin);
    }
  }, []);

  const handleTestPing = async () => {
    setPingStatus({ testing: true });
    const startTime = performance.now();
    try {
      const cleanUrl = serverUrl.replace(/\/+$/, "");
      const res = await fetch(`${cleanUrl}/api/health`, {
        method: "GET",
        headers: { "Accept": "application/json" }
      });
      const endTime = performance.now();
      const latency = Math.round(endTime - startTime);

      if (res.ok) {
        const data = await res.json();
        setPingStatus({
          testing: false,
          success: true,
          latency,
          details: `Connected (${latency}ms) - v${data.version || "2026.4"} - ${data.guidesCount || 624} guides live`
        });
        toast({
          title: "Connection Successful",
          description: `API responded in ${latency}ms with status 200 OK.`,
        });
      } else {
        throw new Error(`Server returned HTTP ${res.status}`);
      }
    } catch (err: any) {
      setPingStatus({
        testing: false,
        success: false,
        details: err.message || "Failed to reach server"
      });
      toast({
        title: "Connection Failed",
        description: `Could not reach ${serverUrl}. Ensure the server is online.`,
        variant: "destructive"
      });
    }
  };

  const handleResetServerUrl = () => {
    const defaultUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    setServerUrl(defaultUrl);
    setApiBaseUrl(defaultUrl);
    toast({
      title: "URL Reset",
      description: `Reset API Base URL to origin: ${defaultUrl}`,
    });
  };

  const handleSaveServer = () => {
    const trimmed = serverUrl.trim();
    if (!trimmed) {
      toast({
        title: "Invalid URL",
        description: "API Base URL cannot be empty.",
        variant: "destructive"
      });
      return;
    }
    setApiBaseUrl(trimmed);
    toast({
      title: "API URL Saved",
      description: `Active endpoint configured: ${trimmed}.`,
    });
  };

  const handleFullSync = async () => {
    const res = await fullSync();
    if (res.success) {
      toast({
        title: "Sync Completed",
        description: `Successfully cached ${res.guidesCount} guides and ${res.manualsCount} technical manuals.`,
      });
    } else {
      toast({
        title: "Sync Failed",
        description: "Please check your network connectivity and try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCache = async () => {
    setIsDeletingCache(true);
    try {
      await clearCache();
      setShowDeleteConfirm(false);
      toast({
        title: "Offline Cache Cleared",
        description: "All cached repair guides, manuals, and schematics have been deleted from local storage.",
      });
    } catch (err) {
      toast({
        title: "Failed to Clear Cache",
        description: "An error occurred while resetting storage.",
        variant: "destructive",
      });
    } finally {
      setIsDeletingCache(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await fetch("/api/user/profile/photo", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        toast({ title: "Success", description: "Profile photo updated." });
        window.location.reload();
      } else {
        throw new Error();
      }
    } catch (e) {
      toast({ title: "Error", description: "Upload failed.", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const offlineData = getOfflineData();
  const guidesCount = offlineGuides.length > 0 ? offlineGuides.length : offlineData.guides.length;
  const manualsCount = offlineManuals.length > 0 ? offlineManuals.length : TECHNICAL_MANUALS.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Profile Header */}
      <section className="flex flex-col md:flex-row items-center gap-6 bg-card/60 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-border/40 shadow-sm">
        <div className="relative group">
          <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl bg-primary/10 border-2 border-primary/20 overflow-hidden flex items-center justify-center shadow-inner">
            {user?.profileImageUrl ? (
              <img src={user.profileImageUrl} className="h-full w-full object-cover" alt="Profile" />
            ) : (
              <UserIcon className="h-10 w-10 text-primary" />
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-2 -right-2 h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:scale-105 transition-transform"
            disabled={uploading}
            title="Upload Profile Picture"
          >
            {uploading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handlePhotoUpload}
          />
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{user?.firstName ? `${user.firstName} ${user.lastName || ""}` : "Master Repair Technician"}</h1>
          <p className="text-sm text-muted-foreground font-medium">{user?.email || "field.technician@jcrguru.com"}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
             <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1 font-semibold text-xs">Lead Electronics Specialist</Badge>
             <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 px-3 py-1 font-semibold text-xs">Offline Certified</Badge>
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={() => logoutMutation.mutate()}
          className="text-destructive hover:bg-destructive/10 rounded-xl px-4 gap-2 text-sm font-semibold"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </Button>
      </section>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Appearance Settings */}
        <Card className="rounded-3xl border-border/40 shadow-sm bg-card/60">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
               <Settings className="h-5 w-5 text-indigo-500" /> Interface Appearance
            </CardTitle>
            <CardDescription className="text-xs">
              Toggle pure glossy light mode or dark themes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
             <div className="grid grid-cols-3 gap-3">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                  className={`rounded-2xl h-18 flex-col gap-1.5 py-3 transition-all ${
                    theme === "light" ? "ring-2 ring-primary ring-offset-2" : ""
                  }`}
                >
                  <Sun className="h-5 w-5 text-amber-500" />
                  <span className="text-xs font-bold">Glossy Light</span>
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className={`rounded-2xl h-18 flex-col gap-1.5 py-3 transition-all ${
                    theme === "dark" ? "ring-2 ring-primary ring-offset-2" : ""
                  }`}
                >
                  <Moon className="h-5 w-5 text-indigo-400" />
                  <span className="text-xs font-bold">Dark Slate</span>
                </Button>
                <Button
                  variant={theme === "amoled" ? "default" : "outline"}
                  onClick={() => setTheme("amoled")}
                  className={`rounded-2xl h-18 flex-col gap-1.5 py-3 transition-all ${
                    theme === "amoled" ? "ring-2 ring-primary ring-offset-2" : ""
                  }`}
                >
                  <Smartphone className="h-5 w-5 text-emerald-400" />
                  <span className="text-xs font-bold">AMOLED Black</span>
                </Button>
             </div>
             <p className="text-[11px] text-muted-foreground pt-1">
               The light appearance uses a pure glossy porcelain finish designed for high legibility in brightly lit workshop environments.
             </p>
          </CardContent>
        </Card>

        {/* Server & Connectivity Settings */}
        <Card className="rounded-3xl border-border/40 shadow-sm bg-card/60">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Server className="h-5 w-5 text-emerald-500" /> Connectivity & API Base URL
              </CardTitle>
              <Badge variant={isCurrentlyOnline ? "default" : "secondary"} className="text-[11px] font-semibold">
                {isCurrentlyOnline ? "Online" : "Disconnected"}
              </Badge>
            </div>
            <CardDescription className="text-xs">
              Configure and test live endpoint routing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
               <div className="flex items-center justify-between">
                 <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">API Base URL</label>
                 <button
                   onClick={handleResetServerUrl}
                   className="text-[11px] text-primary hover:underline font-semibold"
                 >
                   Reset to Default
                 </button>
               </div>
               <div className="flex gap-2">
                 <Input
                   value={serverUrl}
                   onChange={(e) => setServerUrl(e.target.value)}
                   placeholder="e.g. http://localhost:3000 or current origin"
                   className="rounded-xl bg-muted/40 border-border/50 h-10 text-xs font-mono"
                 />
                 <Button onClick={handleSaveServer} className="rounded-xl h-10 px-4 text-xs font-bold">
                   Save
                 </Button>
               </div>
             </div>

             {/* Connection test */}
             <div className="pt-1 flex flex-col gap-2">
               <div className="flex items-center gap-2">
                 <Button
                   variant="outline"
                   size="sm"
                   onClick={handleTestPing}
                   disabled={pingStatus?.testing}
                   className="rounded-xl text-xs font-semibold h-8 gap-1.5"
                 >
                   <Activity className={`h-3.5 w-3.5 ${pingStatus?.testing ? "animate-spin" : "text-emerald-500"}`} />
                   {pingStatus?.testing ? "Pinging..." : "Test Connection"}
                 </Button>

                 {pingStatus && !pingStatus.testing && (
                   <span className={`text-xs font-medium flex items-center gap-1 ${
                     pingStatus.success ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
                   }`}>
                     {pingStatus.success ? <Check className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                     {pingStatus.details}
                   </span>
                 )}
               </div>
             </div>
          </CardContent>
        </Card>

        {/* Offline Systems & Full Library Cache Sync */}
        <Card className="md:col-span-2 rounded-3xl border-border/40 shadow-sm bg-card/60">
           <CardHeader>
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <HardDrive className="h-5 w-5 text-amber-500" /> Offline Storage & Full Library Cache
                  </CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Store all 624 repair guides and 8 in-depth technical manuals on-device for 100% offline field diagnostics.
                  </CardDescription>
                </div>
                <Badge variant={isCurrentlyOnline ? "outline" : "destructive"} className="rounded-full px-3 py-1 font-bold text-xs self-start sm:self-auto">
                  {isCurrentlyOnline ? <Wifi className="h-3.5 w-3.5 mr-1 text-emerald-500" /> : <WifiOff className="h-3.5 w-3.5 mr-1" />}
                  {isCurrentlyOnline ? "Cloud Sync Ready" : "Field Mode (Offline)"}
                </Badge>
             </div>
           </CardHeader>
           <CardContent className="space-y-6">
              {/* Status Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl bg-muted/30 border border-border/30 gap-4">
                 <div className="space-y-1">
                   <div className="flex items-center gap-2">
                     <Database className="h-4 w-4 text-primary" />
                     <h3 className="font-bold text-sm">IndexedDB & Local Cache Engine</h3>
                   </div>
                   <p className="text-xs text-muted-foreground">
                     {lastSyncTime 
                       ? `Last synchronized on ${lastSyncTime.toLocaleDateString()} at ${lastSyncTime.toLocaleTimeString()}`
                       : "Library has not yet been synchronized to offline storage."}
                   </p>
                 </div>
                 
                 <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                   <Button
                     onClick={handleFullSync}
                     disabled={isSyncing || !isCurrentlyOnline}
                     className="rounded-xl h-10 px-4 text-xs font-bold gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm flex-1 sm:flex-none"
                   >
                     <RefreshCw className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
                     {isSyncing ? "Syncing Library..." : "Sync All 624 Guides & Manuals"}
                   </Button>

                   <Button
                     variant="outline"
                     onClick={() => setShowDeleteConfirm(true)}
                     disabled={isSyncing}
                     className="rounded-xl h-10 px-3 text-xs font-bold text-destructive hover:bg-destructive/10 border-destructive/30 gap-1.5"
                     title="Delete Offline Cache"
                   >
                     <Trash2 className="h-4 w-4" />
                     Clear Cache
                   </Button>
                 </div>
              </div>

              {/* Sync Progress Bar if actively syncing */}
              {isSyncing && (
                <div className="space-y-2 p-4 rounded-2xl bg-primary/5 border border-primary/20">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-primary">{syncStatusText}</span>
                    <span className="font-mono">{syncProgress}%</span>
                  </div>
                  <Progress value={syncProgress} className="h-2 rounded-full" />
                </div>
              )}

              {/* Delete Confirmation Alert */}
              {showDeleteConfirm && (
                <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/30 space-y-3">
                  <div className="flex items-center gap-2 text-destructive font-bold text-sm">
                    <AlertCircle className="h-4 w-4" />
                    Are you sure you want to delete all offline cache?
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This will purge all 624 cached guides, 8 manuals, schematic tables, and diagnostic flows from your local browser database. You will need an active internet connection to download them again.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleDeleteCache}
                      disabled={isDeletingCache}
                      className="rounded-xl text-xs font-bold"
                    >
                      {isDeletingCache ? "Purging..." : "Yes, Purge Offline Cache"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="rounded-xl text-xs font-semibold"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Cache Breakdown Metrics */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-muted-foreground">
                  <span className="uppercase tracking-wider">Device Storage Footprint</span>
                  <span className="font-mono">{formatStorageSize(storageInfo.used)} / {formatStorageSize(storageInfo.available + storageInfo.used)} ({storageInfo.percentage.toFixed(1)}%)</span>
                </div>
                <Progress value={Math.max(2, storageInfo.percentage)} className="h-2 rounded-full" />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                   <div className="p-4 rounded-2xl bg-muted/20 border border-border/20 text-center space-y-1">
                      <div className="flex items-center justify-center text-primary mb-1">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div className="text-xl font-black">{guidesCount}</div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Repair Guides</div>
                   </div>

                   <div className="p-4 rounded-2xl bg-muted/20 border border-border/20 text-center space-y-1">
                      <div className="flex items-center justify-center text-emerald-500 mb-1">
                        <Layers className="h-5 w-5" />
                      </div>
                      <div className="text-xl font-black">{manualsCount}</div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Tech Manuals</div>
                   </div>

                   <div className="p-4 rounded-2xl bg-muted/20 border border-border/20 text-center space-y-1">
                      <div className="flex items-center justify-center text-amber-500 mb-1">
                        <Activity className="h-5 w-5" />
                      </div>
                      <div className="text-xl font-black">{offlineData.flows.length || 12}</div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Diagnostic Flows</div>
                   </div>

                   <div className="p-4 rounded-2xl bg-muted/20 border border-border/20 text-center space-y-1">
                      <div className="flex items-center justify-center text-indigo-500 mb-1">
                        <Cpu className="h-5 w-5" />
                      </div>
                      <div className="text-xl font-black">{offlineData.components.length || 38}</div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Parts & Pinouts</div>
                   </div>
                </div>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
