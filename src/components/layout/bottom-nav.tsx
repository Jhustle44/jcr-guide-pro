import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { 
  Home, 
  Heart, 
  Search, 
  HelpCircle, 
  User, 
  Minimize2, 
  Maximize2,
  ChevronDown,
  ChevronUp,
  Compass
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function BottomNav() {
  const [location, setLocation] = useLocation();
  
  // Size modes: "compact" (slim bar), "mini" (small floating bubble/pill), "standard" (full)
  const [sizeMode, setSizeMode] = useState<"compact" | "mini" | "standard">(() => {
    const saved = localStorage.getItem("jcr_bottom_nav_size");
    return (saved as "compact" | "mini" | "standard") || "compact";
  });

  useEffect(() => {
    localStorage.setItem("jcr_bottom_nav_size", sizeMode);
    // Broadcast event so layout can adjust bottom padding if needed
    window.dispatchEvent(new CustomEvent("bottom-nav-resize", { detail: { sizeMode } }));
  }, [sizeMode]);

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Finder", path: "/device-finder" },
    { icon: Compass, label: "Tools", path: "/software-tools" },
    { icon: HelpCircle, label: "Support", path: "/troubleshooting" },
    { icon: Heart, label: "Saved", path: "/favorites" },
    { icon: User, label: "Profile", path: "/offline-settings" },
  ];

  const toggleSizeMode = () => {
    setSizeMode((prev) => {
      if (prev === "compact") return "mini";
      if (prev === "mini") return "standard";
      return "compact";
    });
  };

  // If in mini bubble mode, show a small floating pill on the bottom-left so floating bubbles on right are 100% visible
  if (sizeMode === "mini") {
    return (
      <div className="fixed bottom-4 left-4 z-40 lg:hidden">
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setSizeMode("compact")}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-card/90 backdrop-blur-xl border border-border/60 shadow-xl text-foreground hover:text-primary transition-all group"
          title="Expand Navigation Bar"
        >
          <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Maximize2 className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-semibold pr-1">Nav</span>
        </motion.button>
      </div>
    );
  }

  // Compact Mode (Default): Slim, low-profile dock that keeps floating bubbles completely unobstructed
  if (sizeMode === "compact") {
    return (
      <nav className="fixed bottom-2 left-3 right-3 sm:left-auto sm:right-auto sm:w-[460px] sm:left-1/2 sm:-translate-x-1/2 z-30 lg:hidden">
        <div className="bg-card/85 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-xl px-2 py-1.5 flex items-center justify-between">
          <div className="flex items-center justify-around flex-1">
            {navItems.map((item) => {
              const isActive = location === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => setLocation(item.path)}
                  className={cn(
                    "flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200",
                    isActive 
                      ? "text-primary bg-primary/10 font-bold" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  )}
                >
                  <Icon className={cn("h-4 w-4 transition-transform", isActive && "scale-110")} />
                  <span className="text-[9px] tracking-tight mt-0.5">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Size Shrink / Expand Switcher */}
          <button
            onClick={toggleSizeMode}
            className="ml-1 p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors border-l border-border/30 pl-2"
            title="Make bottom navigation smaller / mini"
          >
            <Minimize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </nav>
    );
  }

  // Standard Mode: Full bar with size shrink button
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-background/90 backdrop-blur-xl border-t border-border/40 pb-safe shadow-lg">
      <div className="flex items-center justify-around h-14 px-2">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 w-full h-full transition-all duration-200",
                isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-1 rounded-xl transition-all duration-200",
                isActive && "bg-primary/10 scale-105"
              )}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <span className="text-[9px] uppercase tracking-wider">{item.label}</span>
            </button>
          );
        })}

        {/* Size Shrink toggle */}
        <button
          onClick={toggleSizeMode}
          className="flex flex-col items-center justify-center px-2 text-muted-foreground hover:text-foreground transition-colors"
          title="Make bottom bar smaller"
        >
          <div className="p-1 rounded-lg hover:bg-muted/60">
            <Minimize2 className="h-4 w-4" />
          </div>
          <span className="text-[8px] uppercase tracking-wider">Slim</span>
        </button>
      </div>
    </nav>
  );
}
