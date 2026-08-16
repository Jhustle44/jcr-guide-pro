import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/layout/mobile-menu";
import ThemeCustomizerModal from "@/components/ui/theme-customizer-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useTheme, ACCENT_COLORS } from "@/contexts/theme-context";
import { 
  Search, 
  Wrench, 
  Sparkles, 
  Monitor, 
  Download, 
  CloudOff, 
  Laptop, 
  Cpu, 
  Code, 
  Eraser, 
  MoveUp, 
  BookOpen,
  Sun,
  Moon,
  X,
  Palette,
  Binary,
  PlusCircle,
  Bookmark,
  ShieldCheck,
  User,
  LogOut,
  LogIn,
  Sliders,
  ChevronDown,
  Layers,
  Flame,
  Radio
} from "lucide-react";
import type { RepairGuide, DeviceModel } from "@shared/schema";
import { cn } from "@/lib/utils";

export default function Header() {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [themeCustomizerOpen, setThemeCustomizerOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "guides" | "models" | "software">("all");
  
  const { user, isAuthenticated, logoutMutation } = useAuth() as any;
  const { theme, setTheme, accent } = useTheme();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Search guides
  const { data: searchGuides = [] } = useQuery<RepairGuide[]>({
    queryKey: ["/api/repair-guides/search", searchQuery],
    queryFn: () => fetch(`/api/repair-guides/search?q=${encodeURIComponent(searchQuery)}`).then(res => res.ok ? res.json() : []),
    enabled: searchQuery.trim().length > 1,
  });

  // Search models
  const { data: searchModels = [] } = useQuery<DeviceModel[]>({
    queryKey: ["/api/device-models/search", searchQuery],
    queryFn: () => fetch(`/api/device-models?search=${encodeURIComponent(searchQuery)}`).then(res => res.ok ? res.json() : []),
    enabled: searchQuery.trim().length > 1,
  });

  // Global keyboard shortcut (Cmd+K or / to search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA")) {
        e.preventDefault();
        searchInputRef.current?.focus();
        setShowResults(true);
      }
      if (e.key === "Escape") {
        setShowResults(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowResults(false);
      setLocation(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "hardware": return Cpu;
      case "software": return Code;
      case "cleaning": return Eraser;
      case "upgrades": return MoveUp;
      default: return Wrench;
    }
  };

  const currentAccentData = ACCENT_COLORS[accent] || ACCENT_COLORS.indigo;

  // Filtered lists based on category pill
  const filteredModels = selectedFilter === "all" || selectedFilter === "models" ? searchModels : [];
  const filteredGuides = selectedFilter === "all" || selectedFilter === "guides" ? searchGuides : [];

  const navLinks = [
    { label: "Guides", path: "/", icon: BookOpen, matchExact: true },
    { label: "Device Finder", path: "/device-finder", icon: Laptop },
    { 
      label: "AI Diagnostics", 
      path: "/troubleshooting", 
      icon: Sparkles,
      highlight: true
    },
    { label: "Software Hub", path: "/software-tools", icon: Binary },
    { label: "Downloads", path: "/downloads", icon: Download },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-xl border-border/60 transition-colors">
      {/* Top micro-bar for workbench status */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 text-[11px] font-medium border-b border-border/30 bg-muted/20 text-muted-foreground">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-foreground/80">JCR WORKBENCH PRO</span>
            <span className="text-muted-foreground/60">• v2.5 Online</span>
          </div>
          <span className="text-border">|</span>
          <span className="flex items-center gap-1">
            <Radio className="h-3 w-3 text-primary animate-pulse" /> 624 Comprehensive Repair Guides & Manuals Active
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLocation("/offline-settings")}
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <CloudOff className="h-3 w-3" /> Offline Engine Ready
          </button>
          <span className="text-border">|</span>
          <button 
            onClick={() => setThemeCustomizerOpen(true)}
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <span 
              className="inline-block w-2.5 h-2.5 rounded-full border border-border shadow-xs" 
              style={{ backgroundColor: currentAccentData.bgHex }} 
            />
            <span>Accent: {currentAccentData.label.split(" ")[0]}</span>
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 lg:gap-6">

          {/* Left Brand Area */}
          <div className="flex items-center gap-2 shrink-0">
            <MobileMenu />
            
            <button 
              id="header-brand-logo"
              onClick={() => setLocation("/")}
              className="flex items-center gap-3 group text-left transition-transform active:scale-95"
            >
              <div className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground shadow-md shadow-primary/20 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                <Wrench className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                <div className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary border-2 border-background"></span>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black tracking-tight text-foreground font-sans">
                    JCR<span className="text-primary font-bold">GUIDE</span>
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 tracking-wider">
                    PRO
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground font-medium hidden sm:block">
                  Hardware & Diagnostics Master
                </span>
              </div>
            </button>
          </div>

          {/* Center: Spotlight Search Launcher */}
          <div ref={searchContainerRef} className="flex-1 max-w-xl relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative flex items-center">
                <Search className={cn(
                  "absolute left-3.5 h-4 w-4 transition-colors duration-200 pointer-events-none",
                  isFocused ? "text-primary" : "text-muted-foreground"
                )} />
                
                <Input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => {
                    setIsFocused(true);
                    setShowResults(true);
                  }}
                  className="w-full pl-10 pr-20 h-10 bg-muted/40 hover:bg-muted/70 focus:bg-background border-border/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 rounded-xl transition-all text-xs sm:text-sm placeholder:text-muted-foreground/70"
                  placeholder="Search guides, laptops, parts, error codes..."
                />

                <div className="absolute right-2.5 flex items-center gap-1">
                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        searchInputRef.current?.focus();
                      }}
                      className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      title="Clear search"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground bg-background border border-border/80 rounded-md shadow-2xs">
                      ⌘K
                    </kbd>
                  )}
                </div>
              </div>
            </form>

            {/* Rich Autocomplete & Spotlight Overlay */}
            {showResults && (isFocused || searchQuery.trim().length > 0) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover/95 backdrop-blur-2xl border border-border/80 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                
                {/* Search Header Filters */}
                <div className="p-2.5 bg-muted/30 border-b border-border/40 flex items-center justify-between gap-1 overflow-x-auto text-xs">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-2">Filter:</span>
                  <div className="flex items-center gap-1">
                    {(["all", "guides", "models", "software"] as const).map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setSelectedFilter(filter)}
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-colors",
                          selectedFilter === filter 
                            ? "bg-primary text-primary-foreground shadow-xs" 
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="max-h-[65vh] overflow-y-auto p-2 space-y-3">
                  
                  {/* Empty state / Quick Jump when query is empty */}
                  {searchQuery.trim().length <= 1 && (
                    <div className="p-3 space-y-3">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Flame className="h-3.5 w-3.5 text-amber-500" /> Popular Quick Searches
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: "MacBook Pro Screen Replacement", path: "/?search=MacBook%20Pro" },
                          { label: "Dell XPS 15 Battery Swelling", path: "/?search=Dell%20XPS" },
                          { label: "Thermal Paste Re-application", path: "/?search=Thermal" },
                          { label: "Blue Screen (BSOD) Flowchart", path: "/troubleshooting/software" },
                          { label: "Lenovo ThinkPad Keyboard", path: "/?search=ThinkPad" },
                          { label: "BIOS Firmware Flashing Tool", path: "/software-tools" },
                        ].map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setLocation(item.path);
                              setShowResults(false);
                            }}
                            className="p-2 text-left rounded-xl bg-muted/40 hover:bg-primary/10 hover:text-primary transition-all text-xs font-medium truncate"
                          >
                            → {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Device Models Results */}
                  {filteredModels.length > 0 && (
                    <div>
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Laptop className="h-3 w-3 text-indigo-500" /> Compatible Models
                        </span>
                        <span>{filteredModels.length} found</span>
                      </div>
                      <div className="space-y-1 mt-1">
                        {filteredModels.slice(0, 3).map((model) => (
                          <button
                            key={model.id}
                            onClick={() => {
                              setLocation(`/device-finder?model=${model.id}`);
                              setShowResults(false);
                            }}
                            className="w-full p-2.5 flex items-center justify-between hover:bg-primary/10 rounded-xl transition-colors text-left group"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="h-7 w-7 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                                <Monitor className="h-3.5 w-3.5" />
                              </div>
                              <div>
                                <span className="text-xs font-semibold block text-foreground group-hover:text-primary transition-colors">{model.name}</span>
                                <span className="text-[10px] text-muted-foreground">{model.series} {model.year ? `• ${model.year}` : ""}</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                              View Specs
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Repair Guides Results */}
                  {filteredGuides.length > 0 && (
                    <div>
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Wrench className="h-3 w-3 text-primary" /> Repair Procedures
                        </span>
                        <span>{filteredGuides.length} found</span>
                      </div>
                      <div className="space-y-1 mt-1">
                        {filteredGuides.slice(0, 4).map((guide) => {
                          const Icon = getCategoryIcon(guide.category);
                          return (
                            <button
                              key={guide.id}
                              onClick={() => {
                                setLocation(`/guide/${guide.id}`);
                                setShowResults(false);
                              }}
                              className="w-full p-2.5 flex items-center gap-3 hover:bg-primary/10 rounded-xl transition-colors text-left group"
                            >
                              <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-xs font-semibold block truncate text-foreground group-hover:text-primary transition-colors">
                                  {guide.title}
                                </span>
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                  <span className="capitalize font-medium text-foreground/70">{guide.category}</span>
                                  <span>•</span>
                                  <span>{guide.deviceType}</span>
                                  <span>•</span>
                                  <span className={cn(
                                    "capitalize px-1.5 py-0.2 rounded font-semibold",
                                    guide.difficulty === "easy" ? "text-emerald-500" :
                                    guide.difficulty === "medium" ? "text-amber-500" : "text-rose-500"
                                  )}>
                                    {guide.difficulty}
                                  </span>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {searchQuery.trim().length > 1 && filteredGuides.length === 0 && filteredModels.length === 0 && (
                    <div className="py-8 text-center text-muted-foreground">
                      <Search className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      <p className="text-xs font-medium">No direct matches for "{searchQuery}"</p>
                      <p className="text-[11px] opacity-70 mt-1">Try searching for generic terms like "battery", "display", or "RAM"</p>
                    </div>
                  )}
                </div>

                {searchQuery.trim().length > 0 && (
                  <div className="p-2.5 bg-muted/40 border-t border-border/40 text-center flex items-center justify-between px-4">
                    <span className="text-[11px] text-muted-foreground">Press <strong>Enter</strong> to search</span>
                    <button
                      onClick={handleSearchSubmit}
                      className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                    >
                      View all results →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Navigation & Tools Deck */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-muted/30 p-1 rounded-xl border border-border/40">
              {navLinks.map((link) => {
                const isActive = link.matchExact 
                  ? location === link.path 
                  : location.startsWith(link.path);
                const Icon = link.icon;

                return (
                  <Button
                    key={link.path}
                    variant="ghost"
                    size="sm"
                    onClick={() => setLocation(link.path)}
                    className={cn(
                      "rounded-lg h-8 px-3 text-xs font-semibold gap-1.5 transition-all",
                      isActive 
                        ? "bg-background text-foreground shadow-xs font-bold border border-border/50" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                      link.highlight && !isActive && "text-primary hover:text-primary"
                    )}
                  >
                    <Icon className={cn("h-3.5 w-3.5", link.highlight && "text-primary")} />
                    <span>{link.label}</span>
                    {link.highlight && (
                      <span className="inline-flex items-center px-1 rounded text-[9px] font-extrabold bg-primary/20 text-primary">
                        AI
                      </span>
                    )}
                  </Button>
                );
              })}
            </nav>

            {/* Quick Actions Dropdown (Technician Toolbox) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl h-9 px-2.5 text-xs font-semibold gap-1.5 border-border/70 hover:border-primary/50 text-foreground"
                  title="Technician Toolbox"
                >
                  <Sliders className="h-3.5 w-3.5 text-primary" />
                  <span className="hidden md:inline">Toolbox</span>
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 rounded-2xl p-2 shadow-2xl border-border/70 bg-popover/95 backdrop-blur-xl">
                <DropdownMenuLabel className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Technician Quick Actions
                </DropdownMenuLabel>
                
                <DropdownMenuItem onClick={() => setLocation("/create-guide")} className="rounded-xl gap-2.5 p-2 text-xs cursor-pointer">
                  <PlusCircle className="h-4 w-4 text-emerald-500" />
                  <div>
                    <span className="font-semibold block">Create New Guide</span>
                    <span className="text-[10px] text-muted-foreground">Document teardown / fix</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setLocation("/favorites")} className="rounded-xl gap-2.5 p-2 text-xs cursor-pointer">
                  <Bookmark className="h-4 w-4 text-amber-500" />
                  <div>
                    <span className="font-semibold block">Saved & Bookmarks</span>
                    <span className="text-[10px] text-muted-foreground">Quick-access field guides</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setLocation("/downloads")} className="rounded-xl gap-2.5 p-2 text-xs cursor-pointer">
                  <Download className="h-4 w-4 text-primary" />
                  <div>
                    <span className="font-semibold block">Offline Manuals</span>
                    <span className="text-[10px] text-muted-foreground">PDFs, ROMs & Drivers</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1 opacity-50" />

                <DropdownMenuLabel className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Management & Utilities
                </DropdownMenuLabel>

                <DropdownMenuItem onClick={() => setLocation("/admin")} className="rounded-xl gap-2.5 p-2 text-xs cursor-pointer">
                  <ShieldCheck className="h-4 w-4 text-indigo-500" />
                  <div>
                    <span className="font-semibold block">Admin Dashboard</span>
                    <span className="text-[10px] text-muted-foreground">Manage guides & inventory</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setLocation("/offline-settings")} className="rounded-xl gap-2.5 p-2 text-xs cursor-pointer">
                  <CloudOff className="h-4 w-4 text-rose-500" />
                  <div>
                    <span className="font-semibold block">Offline Sync Engine</span>
                    <span className="text-[10px] text-muted-foreground">Cache data for field work</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1 opacity-50" />

                <DropdownMenuItem onClick={() => setThemeCustomizerOpen(true)} className="rounded-xl gap-2.5 p-2 text-xs cursor-pointer font-semibold text-primary">
                  <Palette className="h-4 w-4 text-primary" />
                  <span>Workbench Color Studio</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Customizer Icon Button */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted"
              onClick={() => setThemeCustomizerOpen(true)}
              title="Customize Theme & Accents"
            >
              <Palette className="h-4 w-4 text-primary" />
            </Button>

            {/* Theme Mode Quick Toggle (Light / Dark / AMOLED) */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted"
              onClick={() => {
                if (theme === "dark") setTheme("light");
                else if (theme === "light") setTheme("amoled");
                else setTheme("dark");
              }}
              title={`Current Theme: ${theme.toUpperCase()} (Click to toggle)`}
            >
              {theme === "dark" ? (
                <Moon className="h-4 w-4 text-indigo-400" />
              ) : theme === "amoled" ? (
                <Layers className="h-4 w-4 text-foreground" />
              ) : (
                <Sun className="h-4 w-4 text-amber-500" />
              )}
            </Button>

            {/* User Profile / Auth Button */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-xl h-9 pl-1.5 pr-2.5 gap-2 text-xs font-semibold hover:bg-muted border border-border/50"
                  >
                    <div className="h-6 w-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-[11px]">
                      {user?.firstName ? user.firstName[0].toUpperCase() : "U"}
                    </div>
                    <span className="hidden sm:inline font-medium max-w-[80px] truncate">
                      {user?.firstName || "Account"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 rounded-2xl p-2 shadow-2xl border-border/70">
                  <div className="px-3 py-2 border-b border-border/40">
                    <p className="text-xs font-bold truncate">{user?.firstName ? `${user.firstName} ${user.lastName || ""}` : "Technician"}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{user?.email || "Signed in"}</p>
                  </div>
                  <DropdownMenuItem onClick={() => setLocation("/favorites")} className="rounded-xl gap-2 p-2 text-xs cursor-pointer mt-1">
                    <Bookmark className="h-3.5 w-3.5 text-muted-foreground" /> Saved Guides
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation("/admin")} className="rounded-xl gap-2 p-2 text-xs cursor-pointer">
                    <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem 
                    onClick={() => logoutMutation.mutate()} 
                    className="rounded-xl gap-2 p-2 text-xs cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="h-3.5 w-3.5" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => setLocation("/auth")}
                className="rounded-xl h-9 px-3 text-xs font-bold gap-1.5 shadow-xs"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            )}

          </div>
        </div>
      </div>

      {/* Theme Customizer Modal */}
      <ThemeCustomizerModal 
        open={themeCustomizerOpen} 
        onOpenChange={setThemeCustomizerOpen} 
      />
    </header>
  );
}
