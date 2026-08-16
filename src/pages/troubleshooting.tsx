import { useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import TroubleshootingFlowchart from "@/components/repair/troubleshooting-flowchart";
import AITroubleshooter from "@/components/repair/ai-troubleshooter";
import { HelpCircle, Mail, ExternalLink, Wrench, Shield, Search, Sparkles, GitFork } from "lucide-react";
import type { TroubleshootingFlow } from "@shared/schema";
import { cn } from "@/lib/utils";

export default function Troubleshooting() {
  const { type } = useParams<{ type?: string }>();
  const [activeMode, setActiveMode] = useState<"ai" | "flowchart">(type ? "flowchart" : "ai");

  const { data: flows = [], isLoading } = useQuery<TroubleshootingFlow[]>({
    queryKey: ["/api/troubleshooting-flows"],
  });

  const selectedFlow = flows.find(flow => flow.type === type);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Mode Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-6">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-extrabold tracking-tight">Troubleshooting Assistant</h1>
          <p className="text-sm text-muted-foreground">
            Diagnose computer, laptop, OS, and hardware failure modes with AI intelligence or interactive logic flowcharts.
          </p>
        </div>

        {/* Mode Selector Switch */}
        <div className="flex items-center gap-1.5 p-1 bg-muted/50 rounded-2xl border border-border/50 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveMode("ai")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
              activeMode === "ai"
                ? "bg-background text-foreground shadow-xs border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>AI Diagnostic Engine</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode("flowchart")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
              activeMode === "flowchart"
                ? "bg-background text-foreground shadow-xs border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <GitFork className="h-3.5 w-3.5 text-emerald-500" />
            <span>Decision Flowcharts</span>
          </button>
        </div>
      </div>

      {activeMode === "ai" ? (
        <AITroubleshooter />
      ) : isLoading ? (
        <div className="bg-card/50 border border-border/40 rounded-3xl p-8 animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded-xl w-1/2 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-muted rounded-lg w-full"></div>
            ))}
          </div>
        </div>
      ) : (
        <TroubleshootingFlowchart selectedFlow={selectedFlow} />
      )}

      {/* Help & Contact Section */}
      <div className="bg-card/50 border border-border/40 rounded-3xl p-8 shadow-xs">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          Need Additional Bench Support?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support & Resources</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Wrench className="h-4 w-4 text-primary shrink-0" />
                <span>Browse our categorized hardware, software, cleaning & upgrade guides</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Access verified diagnostic software & test utilities</span>
              </div>
              <div className="flex items-center gap-3">
                <Search className="h-4 w-4 text-indigo-500 shrink-0" />
                <span>Search brand & model compatibility schematics</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Specialist Support</h3>
            <div className="bg-muted/40 rounded-2xl p-5 border border-border/40 space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Direct Support Channel</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Have a complex motherboard short, BGA soldering issue, or obscure BIOS flash error? Contact our engineering team:
              </p>
              <a 
                href="mailto:JCRguideproofficial@gmail.com"
                className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium text-sm"
              >
                JCRguideproofficial@gmail.com
                <ExternalLink className="h-3.5 w-3.5 ml-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

