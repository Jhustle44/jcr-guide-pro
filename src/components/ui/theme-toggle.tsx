import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/theme-context";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const getThemeDisplay = () => {
    switch (theme) {
      case "light":
        return { icon: "light_mode", label: "Light Theme" };
      case "dark":
        return { icon: "dark_mode", label: "Dark Theme" };
      case "amoled":
        return { icon: "phone_android", label: "AMOLED Theme" };
      case "system":
        return { icon: "computer", label: "System Theme" };
      default:
        return { icon: "palette", label: "Theme" };
    }
  };

  const currentTheme = getThemeDisplay();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 px-3">
          <i className="material-icons text-base mr-2">{currentTheme.icon}</i>
          <span className="hidden lg:inline text-sm">{currentTheme.label}</span>
          <span className="lg:hidden text-sm">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={theme === "light" ? "bg-accent" : ""}
        >
          <i className="material-icons mr-2 text-base">light_mode</i>
          <div className="flex flex-col">
            <span>Light</span>
            <span className="text-xs text-muted-foreground">Bright and clean</span>
          </div>
          {theme === "light" && <i className="material-icons ml-auto text-sm">check</i>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={theme === "dark" ? "bg-accent" : ""}
        >
          <i className="material-icons mr-2 text-base">dark_mode</i>
          <div className="flex flex-col">
            <span>Dark</span>
            <span className="text-xs text-muted-foreground">Easy on the eyes</span>
          </div>
          {theme === "dark" && <i className="material-icons ml-auto text-sm">check</i>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("amoled")}
          className={theme === "amoled" ? "bg-accent" : ""}
        >
          <i className="material-icons mr-2 text-base">phone_android</i>
          <div className="flex flex-col">
            <span>AMOLED</span>
            <span className="text-xs text-muted-foreground">Pure black for OLED</span>
          </div>
          {theme === "amoled" && <i className="material-icons ml-auto text-sm">check</i>}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={theme === "system" ? "bg-accent" : ""}
        >
          <i className="material-icons mr-2 text-base">computer</i>
          <div className="flex flex-col">
            <span>System</span>
            <span className="text-xs text-muted-foreground">Follows device setting</span>
          </div>
          {theme === "system" && <i className="material-icons ml-auto text-sm">check</i>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}