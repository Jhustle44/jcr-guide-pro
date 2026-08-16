import { Laptop, Monitor, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeviceSelectorProps {
  selectedType: "all" | "laptop" | "desktop";
  onTypeChange: (type: "all" | "laptop" | "desktop") => void;
}

export default function DeviceSelector({ selectedType, onTypeChange }: DeviceSelectorProps) {
  return (
    <div className="flex items-center p-1 rounded-2xl bg-muted/60 border border-border/50 shadow-inner max-w-md">
      <button
        type="button"
        onClick={() => onTypeChange("all")}
        className={cn(
          "flex-1 group relative flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
          selectedType === "all"
            ? "bg-background text-foreground shadow-xs ring-1 ring-border/50"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <LayoutGrid className="h-3.5 w-3.5 text-primary" />
        <span className="truncate">All Systems</span>
      </button>

      <button
        type="button"
        onClick={() => onTypeChange("laptop")}
        className={cn(
          "flex-1 group relative flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
          selectedType === "laptop"
            ? "bg-background text-foreground shadow-xs ring-1 ring-border/50"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Laptop className="h-3.5 w-3.5 text-indigo-500" />
        <span className="truncate">Laptops</span>
      </button>

      <button
        type="button"
        onClick={() => onTypeChange("desktop")}
        className={cn(
          "flex-1 group relative flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
          selectedType === "desktop"
            ? "bg-background text-foreground shadow-xs ring-1 ring-border/50"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Monitor className="h-3.5 w-3.5 text-emerald-500" />
        <span className="truncate">Desktops & PCs</span>
      </button>
    </div>
  );
}
