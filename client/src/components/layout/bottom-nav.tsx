import { useLocation } from "wouter";
import { Home, Heart, Search, HelpCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Finder", path: "/device-finder" },
    { icon: HelpCircle, label: "Support", path: "/troubleshooting" },
    { icon: Heart, label: "Saved", path: "/favorites" },
    { icon: User, label: "Profile", path: "/offline-settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/80 backdrop-blur-xl border-t border-border/40 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-1 rounded-xl transition-all duration-300",
                isActive && "bg-primary/10 scale-110 shadow-glass"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
