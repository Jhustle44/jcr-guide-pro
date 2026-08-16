import { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "dark" | "light" | "amoled" | "system";
export type AccentColor = "indigo" | "cyan" | "emerald" | "amber" | "rose" | "violet" | "slate";
export type RadiusStyle = "rounded" | "tech" | "sharp";
export type DensityStyle = "comfortable" | "compact";

export interface ThemeConfig {
  mode: ThemeMode;
  accent: AccentColor;
  radius: RadiusStyle;
  density: DensityStyle;
}

export const ACCENT_COLORS: Record<AccentColor, { label: string; primaryHsl: string; ringHsl: string; bgHex: string }> = {
  indigo: { label: "Electric Indigo", primaryHsl: "243 75% 59%", ringHsl: "243 75% 59%", bgHex: "#4f46e5" },
  cyan: { label: "Cyber Cyan", primaryHsl: "199 89% 48%", ringHsl: "199 89% 48%", bgHex: "#0284c7" },
  emerald: { label: "Matrix Emerald", primaryHsl: "158 64% 45%", ringHsl: "158 64% 45%", bgHex: "#10b981" },
  amber: { label: "Sunset Amber", primaryHsl: "38 92% 50%", ringHsl: "38 92% 50%", bgHex: "#f59e0b" },
  rose: { label: "Ruby Crimson", primaryHsl: "346 77% 49%", ringHsl: "346 77% 49%", bgHex: "#e11d48" },
  violet: { label: "Neon Violet", primaryHsl: "271 81% 56%", ringHsl: "271 81% 56%", bgHex: "#9333ea" },
  slate: { label: "Steel Monochrome", primaryHsl: "215 25% 40%", ringHsl: "215 25% 40%", bgHex: "#475569" },
};

export const RADIUS_STYLES: Record<RadiusStyle, { label: string; value: string }> = {
  rounded: { label: "Modern Rounded (1.25rem)", value: "1.25rem" },
  tech: { label: "Sleek Tech (0.75rem)", value: "0.75rem" },
  sharp: { label: "Sharp Industrial (0.25rem)", value: "0.25rem" },
};

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  radius: RadiusStyle;
  setRadius: (radius: RadiusStyle) => void;
  density: DensityStyle;
  setDensity: (density: DensityStyle) => void;
  resetTheme: () => void;
};

const defaultState: ThemeConfig = {
  mode: "dark",
  accent: "indigo",
  radius: "rounded",
  density: "comfortable",
};

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "dark",
  setTheme: () => null,
  accent: "indigo",
  setAccent: () => null,
  radius: "rounded",
  setRadius: () => null,
  density: "comfortable",
  setDensity: () => null,
  resetTheme: () => null,
});

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "jcr-guide-theme-v2",
  ...props
}: ThemeProviderProps) {
  const [config, setConfig] = useState<ThemeConfig>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return { ...defaultState, mode: defaultTheme };
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark", "amoled");

    let effectiveMode = config.mode;
    if (config.mode === "system") {
      effectiveMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    root.classList.add(effectiveMode);

    // Apply accent color
    const accentData = ACCENT_COLORS[config.accent] || ACCENT_COLORS.indigo;
    root.style.setProperty("--primary", `hsl(${accentData.primaryHsl})`);
    root.style.setProperty("--ring", `hsl(${accentData.ringHsl})`);

    // Apply radius style
    const radiusData = RADIUS_STYLES[config.radius] || RADIUS_STYLES.rounded;
    root.style.setProperty("--radius", radiusData.value);

    // Apply density class
    root.classList.toggle("density-compact", config.density === "compact");

    try {
      localStorage.setItem(storageKey, JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config, storageKey]);

  const value: ThemeProviderState = {
    theme: config.mode,
    setTheme: (mode: ThemeMode) => setConfig(prev => ({ ...prev, mode })),
    accent: config.accent,
    setAccent: (accent: AccentColor) => setConfig(prev => ({ ...prev, accent })),
    radius: config.radius,
    setRadius: (radius: RadiusStyle) => setConfig(prev => ({ ...prev, radius })),
    density: config.density,
    setDensity: (density: DensityStyle) => setConfig(prev => ({ ...prev, density })),
    resetTheme: () => setConfig(defaultState),
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
