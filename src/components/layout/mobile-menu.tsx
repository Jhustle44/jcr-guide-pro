import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@shared/schema";
import { 
  Menu, 
  Wrench, 
  BookOpen, 
  Bookmark, 
  Sparkles, 
  Laptop, 
  Binary, 
  PlusCircle, 
  Download, 
  CloudOff, 
  LogIn, 
  LogOut, 
  ShieldCheck,
  Palette
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeCustomizerModal from "@/components/ui/theme-customizer-modal";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { user, isAuthenticated, logoutMutation } = useAuth() as any;

  const handleNavigation = (path: string) => {
    setLocation(path);
    setOpen(false);
  };

  const navItems = [
    { label: "Repair Guides", path: "/", icon: BookOpen },
    { label: "Device Finder", path: "/device-finder", icon: Laptop },
    { label: "AI Diagnostic Assistant", path: "/troubleshooting", icon: Sparkles, badge: "AI" },
    { label: "Software Hub", path: "/software-tools", icon: Binary },
    { label: "Saved Guides", path: "/favorites", icon: Bookmark, authRequired: true },
  ];

  const toolItems = [
    { label: "Create Repair Guide", path: "/create-guide", icon: PlusCircle },
    { label: "Offline Manuals & Downloads", path: "/downloads", icon: Download },
    { label: "Offline Sync Engine", path: "/offline-settings", icon: CloudOff },
    { label: "Admin Workbench", path: "/admin", icon: ShieldCheck },
  ];

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden rounded-xl h-9 w-9 text-muted-foreground hover:text-foreground">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0 flex flex-col bg-background/95 backdrop-blur-2xl border-r border-border/60">
          
          {/* Header Brand */}
          <div className="p-5 border-b border-border/40 bg-muted/20">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-3 text-left">
                <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Wrench className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-extrabold tracking-tight">JCR GUIDE</span>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                      PRO
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-normal">Technician Field Guide</p>
                </div>
              </SheetTitle>
            </SheetHeader>
          </div>
          
          {/* Navigation Links Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            
            {/* Primary Nav */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-3">
                Navigation
              </span>
              <div className="space-y-1">
                {navItems.map((item) => {
                  if (item.authRequired && !isAuthenticated) return null;
                  const isActive = location === item.path;
                  const Icon = item.icon;

                  return (
                    <Button
                      key={item.path}
                      variant="ghost"
                      className={cn(
                        "w-full justify-between rounded-xl h-10 px-3 text-xs font-semibold transition-colors",
                        isActive ? "bg-primary/10 text-primary font-bold" : "text-foreground/80 hover:bg-muted"
                      )}
                      onClick={() => handleNavigation(item.path)}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                          {item.badge}
                        </span>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* Tools & Content */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-3">
                Technician Utilities
              </span>
              <div className="space-y-1">
                {toolItems.map((item) => {
                  const isActive = location === item.path;
                  const Icon = item.icon;

                  return (
                    <Button
                      key={item.path}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start rounded-xl h-10 px-3 text-xs font-semibold transition-colors gap-3",
                        isActive ? "bg-primary/10 text-primary font-bold" : "text-foreground/80 hover:bg-muted"
                      )}
                      onClick={() => handleNavigation(item.path)}
                    >
                      <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                      <span>{item.label}</span>
                    </Button>
                  );
                })}

                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-xl h-10 px-3 text-xs font-semibold transition-colors gap-3 text-primary hover:bg-primary/10"
                  onClick={() => {
                    setOpen(false);
                    setThemeModalOpen(true);
                  }}
                >
                  <Palette className="h-4 w-4 text-primary" />
                  <span>Customize Theme Colors</span>
                </Button>
              </div>
            </div>

          </div>

          {/* Footer Auth area */}
          <div className="p-4 border-t border-border/40 bg-muted/20">
            {!isAuthenticated ? (
              <Button
                onClick={() => handleNavigation("/auth")}
                className="w-full rounded-xl h-10 text-xs font-bold gap-2 shadow-xs"
              >
                <LogIn className="h-4 w-4" />
                Sign In to Workbench
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-xl bg-background border border-border/50">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    {user?.firstName ? user.firstName[0].toUpperCase() : "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">
                      {user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "Technician"}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    logoutMutation.mutate();
                    setOpen(false);
                  }}
                  className="w-full rounded-xl h-9 text-xs font-semibold gap-2 border-border/60 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign Out
                </Button>
              </div>
            )}
          </div>

        </SheetContent>
      </Sheet>

      <ThemeCustomizerModal 
        open={themeModalOpen} 
        onOpenChange={setThemeModalOpen} 
      />
    </>
  );
}
