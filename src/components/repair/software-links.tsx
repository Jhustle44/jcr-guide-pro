import { useState } from "react";
import { 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  HardDrive, 
  Cpu, 
  Layers, 
  Terminal, 
  FileCode,
  Zap,
  Copy,
  Check
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface SoftwareLinksProps {
  deviceType?: string;
}

interface SoftwareTool {
  name: string;
  category: string;
  description: string;
  url: string;
  free: boolean;
  license: string;
  icon: any;
}

const ESSENTIAL_TOOLS: SoftwareTool[] = [
  {
    name: "HWiNFO64",
    category: "Hardware Diagnostics",
    description: "In-depth hardware monitoring and sensor logging for temperatures, voltages, and thermal throttling.",
    url: "https://www.hwinfo.com/download/",
    free: true,
    license: "Free",
    icon: Cpu,
  },
  {
    name: "CrystalDiskInfo",
    category: "Storage Health",
    description: "S.M.A.R.T. disk analysis detecting bad sectors, remaining SSD endurance, and overheating NVMe drives.",
    url: "https://crystalmark.info/en/software/crystaldiskinfo/",
    free: true,
    license: "Open Source",
    icon: HardDrive,
  },
  {
    name: "PassMark MemTest86",
    category: "Memory Diagnostics",
    description: "Gold standard standalone USB RAM defect tester with 13 rigorous multi-threaded memory patterns.",
    url: "https://www.memtest86.com/download.html",
    free: true,
    license: "Free",
    icon: Layers,
  },
  {
    name: "Display Driver Uninstaller (DDU)",
    category: "GPU Driver Cleanup",
    description: "Complete uninstallation of AMD/NVIDIA/Intel graphics drivers to resolve black screens and stuttering.",
    url: "https://www.wagnardsoft.com/display-driver-uninstaller-ddu-",
    free: true,
    license: "Free",
    icon: FileCode,
  },
  {
    name: "Rufus USB Utility",
    category: "Bootable OS Media",
    description: "Fastest bootable USB maker with Windows 11 TPM bypass and ISO auto-downloader.",
    url: "https://rufus.ie/",
    free: true,
    license: "Open Source",
    icon: Terminal,
  },
  {
    name: "Clonezilla Live",
    category: "Disk Cloning",
    description: "Bare-metal partition cloning and sector-by-sector drive backup without booting into Windows.",
    url: "https://clonezilla.org/downloads.php",
    free: true,
    license: "Open Source",
    icon: HardDrive,
  },
];

export default function SoftwareLinks({ deviceType = "All Devices" }: SoftwareLinksProps) {
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLaunch = (url: string, name: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    toast({
      title: `Opening ${name}`,
      description: "Directing to the official developer download page.",
    });
  };

  const handleCopyLink = (url: string, name: string) => {
    navigator.clipboard.writeText(url);
    setCopiedName(name);
    toast({
      title: "Link copied!",
      description: `Official URL for ${name} copied to clipboard.`,
    });
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <div className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="h-3 w-3" /> Verified Diagnostic Suite
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Essential Technician Software & Download Hub
          </h3>
          <p className="text-xs text-muted-foreground">
            Official tools for S.M.A.R.T. health checks, RAM validation, OS installation, and driver purge.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500 shrink-0">
          <CheckCircle2 className="h-4 w-4" />
          <span>100% Verified Official Downloads</span>
        </div>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ESSENTIAL_TOOLS.map((tool, idx) => {
          const Icon = tool.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-border/60 bg-background/60 p-5 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-md transition-all space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{tool.name}</h4>
                      <span className="text-[11px] text-muted-foreground">{tool.category}</span>
                    </div>
                  </div>

                  <Badge variant="secondary" className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                    {tool.license}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button
                  onClick={() => handleLaunch(tool.url, tool.name)}
                  className="flex-1 rounded-xl h-9 text-xs font-bold gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download / Official Site</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopyLink(tool.url, tool.name)}
                  className="rounded-xl h-9 w-9 border-border/60 hover:border-emerald-500/40 shrink-0"
                  title="Copy link"
                >
                  {copiedName === tool.name ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Notice */}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-start gap-3 text-xs text-foreground/80">
        <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">Security & Integrity Assurance: </span>
          All links open the official vendor and open-source project repositories directly. Never download repair utilities from unverified third-party mirrors or bundled download managers.
        </div>
      </div>

    </div>
  );
}
