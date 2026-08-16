import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Send, 
  X, 
  User, 
  Sparkles, 
  BookOpen, 
  Layers, 
  Zap, 
  ExternalLink,
  RotateCcw,
  Wrench,
  Maximize2,
  Minimize2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import GuideDetailModal from "./guide-detail-modal";
import ManualDetailModal from "./manual-detail-modal";
import { TECHNICAL_MANUALS, type TechnicalManual } from "../../../shared/technical-manuals";
import type { RepairGuide } from "@shared/schema";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestedGuides?: {
    id: string;
    title: string;
    category: string;
    difficulty: string;
    estimatedTime: string;
  }[];
  suggestedManuals?: {
    id: string;
    title: string;
    code: string;
    category: string;
  }[];
  voltageRailsMentioned?: {
    rail: string;
    voltage: string;
    location: string;
    description: string;
  }[];
  quickActions?: string[];
  timestamp: string;
};

const INITIAL_MESSAGE: Message = {
  id: "msg-init",
  role: "assistant",
  content: "Hello! I'm your Master Technical Repair AI. I have full indexed access to all **624 multi-brand repair guides** and **8 technical manuals** (power rails, torque specs, schematics, and crisis flash protocols). How can I assist with your repair?",
  quickActions: [
    "Troubleshoot No Power / Dead Board",
    "BSOD Minidump & Driver Triage",
    "Thermal Throttling & PTM7950 Repasting",
    "Display & Hinge Replacement Protocol"
  ],
  timestamp: "Just now"
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Modal inspection states
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const [selectedManual, setSelectedManual] = useState<TechnicalManual | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleOpenGuideById = (guideId: string) => {
    setSelectedGuideId(guideId);
  };

  const handleOpenManualById = (manualId: string) => {
    const manual = TECHNICAL_MANUALS.find(m => m.id === manualId);
    if (manual) setSelectedManual(manual);
  };

  const handleSendQuery = async (queryText?: string) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend || isTyping) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      // Call live Technical AI endpoint
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        })
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: data.message || "Analysis complete.",
          suggestedGuides: data.suggestedGuides,
          suggestedManuals: data.suggestedManuals,
          voltageRailsMentioned: data.voltageRailsMentioned,
          quickActions: data.quickActions,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error("Server response was not ok");
      }
    } catch (error) {
      // Generate instant local fallback
      const q = textToSend.toLowerCase();
      let replyContent = "Here are the recommended procedures from our 624 repair guides:";
      let suggestedManuals = TECHNICAL_MANUALS.slice(0, 2);
      let voltageRailsMentioned = [
        { rail: "+19V_DCIN", voltage: "19.0V - 20.0V", location: "DC Jack / Input FETs", description: "Primary system power" },
        { rail: "+3.3V_ALW", voltage: "3.3V", location: "Coil PL301", description: "Standby power for Super I/O & power sequencing" }
      ];

      if (q.includes("power") || q.includes("dead") || q.includes("charge")) {
        replyContent = "### ⚡ Power Rail Bench Sequence:\n1. Verify **+19V_DCIN** or **+20V_PD**.\n2. Measure standby coils: **+3.3V_ALW (PL301)** and **+5.0V_ALW (PL302)**.\n3. Verify **NBSWON#** power button pull-down signal to Super I/O EC.";
      } else if (q.includes("bsod") || q.includes("crash")) {
        replyContent = "### 🛑 BSOD & Crash Resolution:\n1. Run **DDU in Safe Mode** and reinstall clean WHQL drivers.\n2. Execute `DISM /Online /Cleanup-Image /RestoreHealth` and `sfc /scannow`.\n3. Run 4 passes of **MemTest86** to test DDR4/DDR5 RAM.";
      } else if (q.includes("heat") || q.includes("fan") || q.includes("temp")) {
        replyContent = "### 🔥 Thermal Protocol:\n1. Clean copper exhaust radiator fins.\n2. Apply **Honeywell PTM7950 (0.25mm)** phase-change pad.\n3. Tighten heatsink screws diagonally (1->2->3->4) to 0.25 Nm.";
      }

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: replyContent,
          suggestedManuals,
          voltageRailsMentioned,
          quickActions: [
            "Check Standby Power Rails",
            "Run Diagnostic Flowchart",
            "Open Software Hub"
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-18 sm:bottom-6 right-4 sm:right-6 h-12 w-12 sm:h-13 sm:w-13 rounded-2xl bg-primary text-primary-foreground shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
        title="Open Technical Repair AI"
      >
        <Bot className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:rotate-12" />
        <div className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-emerald-500 rounded-full border-2 border-background animate-pulse" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-18 sm:bottom-6 right-3 sm:right-6 z-50 flex flex-col transition-all ${
              isExpanded 
                ? "w-[95vw] sm:w-[650px] h-[80vh] max-h-[750px]" 
                : "w-[94vw] sm:w-[440px] h-[540px] max-h-[80vh]"
            }`}
          >
            <Card className="flex-1 border-border/40 shadow-2xl rounded-3xl overflow-hidden bg-card/95 backdrop-blur-3xl flex flex-col">
              
              {/* Header */}
              <CardHeader className="bg-primary/10 border-b border-border/40 py-3.5 px-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-sm font-black">Technical Repair AI</CardTitle>
                      <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20 py-0 px-1.5 font-bold">
                        624 Guides Live
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Hardware Diagnostics Active
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleResetChat} 
                    className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground"
                    title="Clear Conversation"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground hidden sm:flex"
                    title={isExpanded ? "Minimize" : "Expand"}
                  >
                    {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsOpen(false)} 
                    className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Message List */}
              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden bg-background/50">
                <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                      <div className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none shadow-sm"
                          : "bg-card border border-border/40 shadow-sm rounded-tl-none text-card-foreground"
                      }`}>
                        <div className="whitespace-pre-wrap">{msg.content}</div>

                        {/* Voltage Rails if mentioned */}
                        {msg.voltageRailsMentioned && msg.voltageRailsMentioned.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-border/30 space-y-1.5">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-500">
                              <Zap className="h-3.5 w-3.5" /> Multimeter Test Points:
                            </div>
                            <div className="grid grid-cols-1 gap-1.5">
                              {msg.voltageRailsMentioned.map((vr, vIdx) => (
                                <div key={vIdx} className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] space-y-0.5">
                                  <div className="flex items-center justify-between font-bold">
                                    <span className="font-mono text-amber-600 dark:text-amber-400">{vr.rail}</span>
                                    <Badge variant="outline" className="text-[9px] py-0 px-1 font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                                      {vr.voltage}
                                    </Badge>
                                  </div>
                                  <div className="text-muted-foreground text-[10px]">Test Location: {vr.location}</div>
                                  <div className="text-foreground/80 text-[10px]">{vr.description}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Suggested Guides */}
                        {msg.suggestedGuides && msg.suggestedGuides.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-border/30 space-y-1.5">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary">
                              <BookOpen className="h-3.5 w-3.5" /> Matching Verified Guides:
                            </div>
                            <div className="space-y-1">
                              {msg.suggestedGuides.map((g, gIdx) => (
                                <button
                                  key={gIdx}
                                  onClick={() => handleOpenGuideById(g.id)}
                                  className="w-full text-left p-2 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/20 transition-all flex items-center justify-between group"
                                >
                                  <div className="truncate mr-2">
                                    <div className="font-bold text-xs text-foreground truncate group-hover:text-primary">{g.title}</div>
                                    <div className="text-[10px] text-muted-foreground">{g.category} • {g.estimatedTime} • {g.difficulty}</div>
                                  </div>
                                  <ExternalLink className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Suggested Technical Manuals */}
                        {msg.suggestedManuals && msg.suggestedManuals.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-border/30 space-y-1.5">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                              <Layers className="h-3.5 w-3.5" /> Technical Manuals & Schematics:
                            </div>
                            <div className="space-y-1">
                              {msg.suggestedManuals.map((m, mIdx) => (
                                <button
                                  key={mIdx}
                                  onClick={() => handleOpenManualById(m.id)}
                                  className="w-full text-left p-2 rounded-xl bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 transition-all flex items-center justify-between group"
                                >
                                  <div className="truncate mr-2">
                                    <div className="font-bold text-xs text-foreground truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{m.title}</div>
                                    <div className="text-[10px] text-muted-foreground">Code: {m.code} • {m.category}</div>
                                  </div>
                                  <ExternalLink className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Quick action followups */}
                        {msg.quickActions && msg.quickActions.length > 0 && (
                          <div className="mt-3 pt-2 flex flex-wrap gap-1.5">
                            {msg.quickActions.map((qa, qaIdx) => (
                              <button
                                key={qaIdx}
                                onClick={() => handleSendQuery(qa)}
                                className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary border border-border/40 transition-colors text-left"
                              >
                                ⚡ {qa}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] text-muted-foreground mt-1 px-1">{msg.timestamp}</span>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex flex-col items-start">
                      <div className="bg-card border border-border/40 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                        <div className="h-2 w-2 bg-primary rounded-full animate-bounce" />
                        <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:0.15s]" />
                        <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:0.3s]" />
                        <span className="text-[11px] text-muted-foreground ml-1.5 font-semibold">Analyzing schematics & 624 guides...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Bar */}
                <div className="p-3 border-t border-border/40 bg-card/80 backdrop-blur-md">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendQuery()}
                      placeholder="Ask about voltage rails, torque, teardowns, BSOD..."
                      className="rounded-xl bg-muted/30 border-border/40 focus-visible:ring-primary/20 h-10 text-xs sm:text-sm"
                    />
                    <Button 
                      onClick={() => handleSendQuery()} 
                      disabled={!input.trim() || isTyping}
                      className="rounded-xl h-10 w-10 p-0 shadow-md bg-primary hover:bg-primary/90 text-primary-foreground flex-shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guide Detail Modal */}
      {selectedGuideId && (
        <GuideDetailModal
          guideId={selectedGuideId}
          onClose={() => setSelectedGuideId(null)}
        />
      )}

      {/* Manual Detail Modal */}
      {selectedManual && (
        <ManualDetailModal
          manual={selectedManual}
          onClose={() => setSelectedManual(null)}
        />
      )}
    </>
  );
}

