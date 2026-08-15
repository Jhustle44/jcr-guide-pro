import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/layout/mobile-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/contexts/theme-context";
import { ChevronDown, Search, Heart, User as UserIcon, LayoutGrid, Wrench, HelpCircle, Monitor, Download, CloudOff, Mail, Settings } from "lucide-react";
import type { RepairGuide, User } from "@shared/schema";

export default function Header() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { setTheme } = useTheme();

  const { data: searchResults = [] } = useQuery<RepairGuide[]>({
    queryKey: ["/api/repair-guides/search", searchQuery],
    queryFn: () => fetch(`/api/repair-guides/search?q=${encodeURIComponent(searchQuery)}`).then(res => res.json()),
    enabled: searchQuery.length > 2,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowResults(false);
      setLocation(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand */}
          <div className="flex items-center space-x-2 shrink-0">
            <MobileMenu />
            <button 
              onClick={() => setLocation("/")}
              className="flex items-center gap-2 group transition-all"
            >
              <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Wrench className="h-5 w-5" />
              </div>
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent hidden sm:block">
                JCRguru
              </h1>
            </button>
          </div>

          {/* Elegant Search Bar */}
          <div className="flex-1 max-w-2xl relative group">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResults(e.target.value.length > 2);
                }}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                onFocus={() => setShowResults(searchQuery.length > 2)}
                className="w-full pl-10 h-10 bg-muted/50 border-none rounded-full focus-visible:ring-2 focus-visible:ring-primary/20 transition-all text-sm"
                placeholder="Search tech guides..."
              />
            </form>

            {/* Glass Search Results */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover/90 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-glass overflow-hidden z-50">
                <div className="p-2 space-y-1">
                  {searchResults.slice(0, 5).map((guide) => (
                    <button
                      key={guide.id}
                      onClick={() => {
                        setLocation(`/guide/${guide.id}`);
                        setShowResults(false);
                      }}
                      className="w-full p-3 flex flex-col items-start hover:bg-primary/10 rounded-xl transition-colors text-left"
                    >
                      <span className="text-sm font-semibold">{guide.title}</span>
                      <span className="text-xs text-muted-foreground">{guide.category}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">

            <nav className="hidden lg:flex items-center gap-1 mr-2">
              <Button variant="ghost" size="sm" onClick={() => setLocation("/")} className="rounded-full h-9 gap-2">
                <LayoutGrid className="h-4 w-4" />
                Guides
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full h-9 gap-2">
                    <Settings className="h-4 w-4" />
                    Tools
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl p-2 shadow-glass border-border/50">
                   <DropdownMenuLabel className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Repair Hub</DropdownMenuLabel>
                   <DropdownMenuItem onClick={() => setLocation("/troubleshooting")} className="rounded-xl gap-3 p-2.5">
                     <HelpCircle className="h-4 w-4" /> Troubleshooting
                   </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => setLocation("/device-finder")} className="rounded-xl gap-3 p-2.5">
                     <Monitor className="h-4 w-4" /> Device Finder
                   </DropdownMenuItem>

                   <DropdownMenuSeparator className="my-1 opacity-50" />

                   <DropdownMenuLabel className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Manager</DropdownMenuLabel>
                   <DropdownMenuItem onClick={() => setLocation("/downloads")} className="rounded-xl gap-3 p-2.5">
                     <Download className="h-4 w-4" /> Downloads
                   </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => setLocation("/offline-settings")} className="rounded-xl gap-3 p-2.5">
                     <CloudOff className="h-4 w-4" /> Offline Mode
                   </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLocation("/favorites")}
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors h-9 w-9"
              >
                <Heart className="h-5 w-5" />
              </Button>
            )}

            {/* Profile & Theme */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-0.5 h-9 w-9 border border-border/50 overflow-hidden hover:ring-2 hover:ring-primary/20 transition-all">
                   {user?.profileImageUrl ? (
                     <img src={user.profileImageUrl} className="h-full w-full object-cover" alt="Me" />
                   ) : (
                     <div className="h-full w-full bg-primary/10 flex items-center justify-center text-primary">
                       <UserIcon className="h-5 w-5" />
                     </div>
                   )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 mt-2 rounded-2xl p-2 shadow-glass border-border/50">
                    <div className="px-3 py-3 mb-2 flex items-center gap-3 bg-muted/30 rounded-xl">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                        {user?.firstName?.charAt(0) || 'U'}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold truncate max-w-[140px]">{user?.firstName || 'Tech Expert'}</span>
                        <span className="text-[10px] text-muted-foreground truncate max-w-[140px]">{user?.email}</span>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="opacity-50" />
                    <DropdownMenuLabel className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Appearance</DropdownMenuLabel>
                    <div className="grid grid-cols-2 gap-1 p-1">
                      <Button variant="ghost" size="sm" onClick={() => setTheme("light")} className="h-8 text-[11px] rounded-lg justify-start px-2">☀️ Light</Button>
                      <Button variant="ghost" size="sm" onClick={() => setTheme("dark")} className="h-8 text-[11px] rounded-lg justify-start px-2">🌙 Dark</Button>
                    </div>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
      </div>
    </header>
  );
}
