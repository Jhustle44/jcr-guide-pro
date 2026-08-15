import React, { useState, useRef } from "react";
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
  Smartphone
} from "lucide-react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";

export default function OfflineSettings() {
  const { toast } = useToast();
  const { user, logoutMutation } = useAuth();
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const {
    isOfflineSupported,
    isOfflineModeEnabled,
    isCurrentlyOnline,
    lastSyncTime,
    storageInfo,
    enableOfflineMode,
    disableOfflineMode,
    forceSync,
    getOfflineData,
  } = useOfflineMode();

  const [serverUrl, setServerUrl] = useState(getApiBaseUrl());

  const handleEnableOffline = async () => {
    const success = await enableOfflineMode();
    if (success) {
      toast({ title: "Offline Mode Enabled", description: "Repair guides cached." });
    } else {
      toast({ title: "Failed", description: "Check connection.", variant: "destructive" });
    }
  };

  const handleSaveServer = () => {
    setApiBaseUrl(serverUrl);
    toast({ title: "Saved", description: "Reloading..." });
    setTimeout(() => window.location.reload(), 1000);
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

      {/* Profile Header */}
      <section className="flex flex-col md:flex-row items-center gap-8 bg-card/40 backdrop-blur-2xl p-8 rounded-[3rem] border border-border/40">
        <div className="relative group">
          <div className="h-32 w-32 rounded-[2.5rem] bg-primary/10 border-2 border-primary/20 overflow-hidden flex items-center justify-center">
            {user?.profileImageUrl ? (
              <img src={user.profileImageUrl} className="h-full w-full object-cover" alt="Me" />
            ) : (
              <UserIcon className="h-12 w-12 text-primary" />
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            disabled={uploading}
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

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-black tracking-tight">{user?.firstName} {user?.lastName}</h1>
          <p className="text-muted-foreground font-medium mb-4">{user?.email}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
             <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1">Expert Tech</Badge>
             <Badge variant="outline" className="bg-emerald-500/5 text-emerald-500 border-emerald-500/20 px-3 py-1">Verified</Badge>
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={() => logoutMutation.mutate()}
          className="text-destructive hover:bg-destructive/10 rounded-2xl px-6 gap-2"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </Button> section
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Appearance Settings */}
        <Card className="rounded-[2.5rem] border-border/40 shadow-glass bg-card/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <Settings className="h-5 w-5 text-indigo-400" /> Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                  className="rounded-2xl h-20 flex-col gap-2"
                >
                  <Sun className="h-5 w-5" /> Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className="rounded-2xl h-20 flex-col gap-2"
                >
                  <Moon className="h-5 w-5" /> Dark
                </Button>
                <Button
                  variant={theme === "amoled" ? "default" : "outline"}
                  onClick={() => setTheme("amoled")}
                  className="rounded-2xl h-20 flex-col gap-2"
                >
                  <Smartphone className="h-5 w-5" /> AMOLED
                </Button>
             </div>
          </CardContent>
        </Card>

        {/* Server Settings */}
        <Card className="rounded-[2.5rem] border-border/40 shadow-glass bg-card/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-emerald-400" /> Connectivity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">API Base URL</label>
               <div className="flex gap-2">
                 <Input
                   value={serverUrl}
                   onChange={(e) => setServerUrl(e.target.value)}
                   className="rounded-2xl bg-muted/30 border-none h-11"
                 />
                 <Button onClick={handleSaveServer} className="rounded-2xl h-11">Save</Button>
               </div>
             </div>
          </CardContent>
        </Card>

        {/* Offline Mode */}
        <Card className="md:col-span-2 rounded-[2.5rem] border-border/40 shadow-glass bg-card/20">
           <CardHeader>
             <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <HardDrive className="h-5 w-5 text-amber-400" /> Offline Systems
                  </CardTitle>
                  <CardDescription>Cache technical data for field use</CardDescription>
                </div>
                <Badge variant={isCurrentlyOnline ? "default" : "destructive"} className="rounded-full">
                  {isCurrentlyOnline ? <Wifi className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
                  {isCurrentlyOnline ? "Sync Ready" : "Local Only"}
                </Badge>
             </div>
           </CardHeader>
           <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-6 rounded-3xl bg-muted/20 border border-border/20">
                 <div>
                   <h3 className="font-bold">Offline Database</h3>
                   <p className="text-xs text-muted-foreground">{isOfflineModeEnabled ? "Fully cached for field ops" : "Field access disabled"}</p>
                 </div>
                 <div className="flex gap-2">
                   {isOfflineModeEnabled ? (
                     <Button variant="outline" onClick={disableOfflineMode} className="rounded-2xl">Disable</Button>
                   ) : (
                     <Button onClick={handleEnableOffline} disabled={!isCurrentlyOnline} className="rounded-2xl bg-primary">Enable Field Access</Button>
                   )}
                   {isOfflineModeEnabled && (
                     <Button variant="ghost" onClick={forceSync} disabled={!isCurrentlyOnline} className="rounded-full h-10 w-10 p-0">
                       <RefreshCw className="h-4 w-4" />
                     </Button>
                   )}
                 </div>
              </div>

              {isOfflineModeEnabled && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <span>Local Cache Usage</span>
                    <span>{storageInfo.percentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={storageInfo.percentage} className="h-2 rounded-full" />
                  <div className="grid grid-cols-3 gap-4 mt-4">
                     <div className="p-4 rounded-2xl bg-muted/10 text-center">
                        <div className="text-xl font-black">{offlineData.guides.length}</div>
                        <div className="text-[10px] text-muted-foreground uppercase">Guides</div>
                     </div>
                     <div className="p-4 rounded-2xl bg-muted/10 text-center">
                        <div className="text-xl font-black">{offlineData.flows.length}</div>
                        <div className="text-[10px] text-muted-foreground uppercase">Flows</div>
                     </div>
                     <div className="p-4 rounded-2xl bg-muted/10 text-center">
                        <div className="text-xl font-black">{offlineData.components.length}</div>
                        <div className="text-[10px] text-muted-foreground uppercase">Parts</div>
                     </div>
                  </div>
                </div>
              )}
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
