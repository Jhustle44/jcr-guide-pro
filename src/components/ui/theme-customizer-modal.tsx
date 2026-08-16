import { useState } from "react";
import { 
  useTheme, 
  ACCENT_COLORS, 
  RADIUS_STYLES, 
  type ThemeMode, 
  type AccentColor, 
  type RadiusStyle,
  type DensityStyle
} from "@/contexts/theme-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Palette, 
  Sun, 
  Moon, 
  Monitor, 
  Sparkles, 
  Check, 
  RotateCcw,
  Sliders,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeCustomizerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ThemeCustomizerModal({ open, onOpenChange }: ThemeCustomizerModalProps) {
  const { 
    theme, 
    setTheme, 
    accent, 
    setAccent, 
    radius, 
    setRadius, 
    density, 
    setDensity,
    resetTheme 
  } = useTheme();

  const themeModes: { id: ThemeMode; label: string; icon: any; desc: string }[] = [
    { id: "dark", label: "Dark Mode", icon: Moon, desc: "Slate grey background" },
    { id: "amoled", label: "AMOLED Black", icon: Sparkles, desc: "Pure pitch black (#000)" },
    { id: "light", label: "Glossy White", icon: Sun, desc: "Porcelain glossy white & glass" },
    { id: "system", label: "System Sync", icon: Monitor, desc: "Follow OS appearance" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg p-6 rounded-3xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader className="space-y-1 text-left pb-2">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
            <Palette className="h-4 w-4" /> Interface Personalization
          </div>
          <DialogTitle className="text-xl font-bold">Theme & Style Customizer</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Tune your color scheme, UI geometry, and density in real-time. Preferences are saved automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Theme Modes */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Moon className="h-3.5 w-3.5 text-primary" /> Appearance Mode
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {themeModes.map((m) => {
                const Icon = m.icon;
                const isSelected = theme === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setTheme(m.id)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-2xl border text-left transition-all",
                      isSelected
                        ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/40 shadow-sm"
                        : "border-border/50 bg-background/50 hover:bg-muted/40 hover:border-border text-muted-foreground"
                    )}
                  >
                    <div className={cn(
                      "h-8 w-8 rounded-xl flex items-center justify-center shrink-0",
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold truncate text-foreground">{m.label}</div>
                      <div className="text-[10px] text-muted-foreground truncate">{m.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accent Colors */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5 text-primary" /> Primary Accent Tone
              </label>
              <span className="text-[11px] font-semibold text-primary capitalize">
                {ACCENT_COLORS[accent]?.label || accent}
              </span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {(Object.keys(ACCENT_COLORS) as AccentColor[]).map((key) => {
                const color = ACCENT_COLORS[key];
                const isSelected = accent === key;
                return (
                  <button
                    key={key}
                    onClick={() => setAccent(key)}
                    className={cn(
                      "flex flex-col items-center justify-center p-2 rounded-2xl border transition-all group",
                      isSelected
                        ? "border-primary bg-primary/10 ring-2 ring-primary/50 shadow-sm"
                        : "border-border/40 hover:border-border bg-background/40"
                    )}
                    title={color.label}
                  >
                    <div
                      className="h-6 w-6 rounded-full flex items-center justify-center shadow-sm transition-transform group-hover:scale-110"
                      style={{ backgroundColor: color.bgHex }}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5 text-white stroke-[3]" />}
                    </div>
                    <span className="text-[9px] mt-1 font-medium capitalize text-muted-foreground group-hover:text-foreground">
                      {key}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Border Radius Geometry */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-primary" /> UI Corner Geometry
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(RADIUS_STYLES) as RadiusStyle[]).map((rKey) => {
                const isSelected = radius === rKey;
                return (
                  <button
                    key={rKey}
                    onClick={() => setRadius(rKey)}
                    className={cn(
                      "p-2.5 text-center rounded-2xl border transition-all text-xs font-semibold",
                      isSelected
                        ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/40"
                        : "border-border/50 hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {rKey === "rounded" && "Modern Soft"}
                    {rKey === "tech" && "Sleek Tech"}
                    {rKey === "sharp" && "Sharp Box"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Density Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground">Content Spacing & Density</label>
            <div className="grid grid-cols-2 gap-2">
              {(["comfortable", "compact"] as DensityStyle[]).map((d) => {
                const isSelected = density === d;
                return (
                  <button
                    key={d}
                    onClick={() => setDensity(d)}
                    className={cn(
                      "p-2.5 rounded-2xl border text-center text-xs font-semibold capitalize transition-all",
                      isSelected
                        ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/40"
                        : "border-border/50 hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {d === "comfortable" ? "Comfortable (Relaxed)" : "Compact (High Tech Density)"}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetTheme}
            className="text-xs text-muted-foreground hover:text-foreground gap-1.5 h-9 rounded-2xl"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset Default
          </Button>

          <Button
            onClick={() => onOpenChange(false)}
            size="sm"
            className="text-xs px-5 h-9 rounded-2xl font-bold"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
