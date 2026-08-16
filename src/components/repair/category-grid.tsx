import { useQuery } from "@tanstack/react-query";
import type { RepairGuide } from "@shared/schema";
import { Cpu, Code, Eraser, MoveUp, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryGridProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  deviceType: string;
}

export default function CategoryGrid({ selectedCategory, onCategoryChange, deviceType }: CategoryGridProps) {
  const { data: allGuides = [] } = useQuery<RepairGuide[]>({
    queryKey: ["api", "repair-guides"],
  });

  const categories = [
    {
      id: "hardware",
      name: "Hardware",
      description: "Components & builds",
      icon: Cpu,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
    {
      id: "software",
      name: "Software",
      description: "OS & Driver fixes",
      icon: Code,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      id: "cleaning",
      name: "Cleaning",
      description: "Pro maintenance",
      icon: Eraser,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      id: "upgrades",
      name: "Upgrades",
      description: "Performance boosts",
      icon: MoveUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  const getCategoryCount = (categoryId: string) => {
    return allGuides.filter(guide =>
      guide.category === categoryId &&
      (!deviceType || guide.deviceType === deviceType)
    ).length;
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {categories.map((category) => {
        const isActive = selectedCategory === category.id;
        const Icon = category.icon;

        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(isActive ? "" : category.id)}
            className={cn(
              "group relative p-6 rounded-[2rem] border transition-all duration-500 text-left overflow-hidden",
              isActive
                ? "bg-primary border-primary shadow-glass text-primary-foreground"
                : "bg-card/40 backdrop-blur-sm border-border/40 hover:border-primary/40 hover:shadow-elegant"
            )}
          >
            <div className={cn(
              "h-12 w-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500",
              isActive ? "bg-white/20" : category.bgColor,
              !isActive && "group-hover:scale-110"
            )}>
              <Icon className={cn("h-6 w-6", isActive ? "text-white" : category.color)} />
            </div>

            <h3 className="font-bold text-lg mb-1">{category.name}</h3>
            <p className={cn(
              "text-xs mb-4 line-clamp-1",
              isActive ? "text-white/80" : "text-muted-foreground"
            )}>
              {category.description}
            </p>

            <div className="flex items-center justify-between">
               <span className={cn(
                 "text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full",
                 isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
               )}>
                 {getCategoryCount(category.id)} guides
               </span>

               {isActive && <XCircle className="h-4 w-4 text-white/60 animate-in fade-in zoom-in" />}
            </div>

            {/* Decorative background glow for inactive items */}
            {!isActive && (
              <div className={cn(
                "absolute -right-4 -bottom-4 h-16 w-16 opacity-0 group-hover:opacity-20 blur-2xl rounded-full transition-opacity duration-500",
                category.bgColor.replace("/10", "")
              )} />
            )}
          </button>
        );
      })}
    </div>
  );
}
