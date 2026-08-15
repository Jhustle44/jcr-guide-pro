import { Laptop, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeviceSelectorProps {
  selectedType: "laptop" | "desktop";
  onTypeChange: (type: "laptop" | "desktop") => void;
}

export default function DeviceSelector({ selectedType, onTypeChange }: DeviceSelectorProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onTypeChange("laptop")}
        className={cn(
          "flex-1 group relative flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300",
          selectedType === "laptop"
            ? "bg-primary border-primary text-primary-foreground shadow-glass"
            : "bg-muted/40 border-border/40 text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <Laptop className={cn("h-5 w-5 transition-transform", selectedType === "laptop" ? "scale-110" : "group-hover:scale-110")} />
        <span className="font-bold text-sm tracking-wide">Laptops</span>
        {selectedType === "laptop" && (
           <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]" />
        )}
      </button>

      <button
        onClick={() => onTypeChange("desktop")}
        className={cn(
          "flex-1 group relative flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300",
          selectedType === "desktop"
            ? "bg-primary border-primary text-primary-foreground shadow-glass"
            : "bg-muted/40 border-border/40 text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <Monitor className={cn("h-5 w-5 transition-transform", selectedType === "desktop" ? "scale-110" : "group-hover:scale-110")} />
        <span className="font-bold text-sm tracking-wide">Desktops</span>
        {selectedType === "desktop" && (
           <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]" />
        )}
      </button>
    </div>
  );
}
