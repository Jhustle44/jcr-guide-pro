import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Send, X, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your JCRguru AI Assistant. How can I help you with your repair today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Mock AI Response - In production, this would call your server/AI API
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: `I've analyzed your query about "${input}". Based on our technical database, I recommend checking the voltage rails first. Would you like me to pull up the relevant circuit diagram?`
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 h-14 w-14 rounded-2xl bg-primary text-white shadow-glass flex items-center justify-center hover:scale-110 transition-transform z-40"
      >
        <Bot className="h-6 w-6" />
        <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-background animate-pulse" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[90vw] max-w-[400px] h-[500px] z-50 flex flex-col"
          >
            <Card className="flex-1 border-border/40 shadow-glass-lg rounded-[2.5rem] overflow-hidden bg-card/60 backdrop-blur-3xl flex flex-col">
              <CardHeader className="bg-primary/10 border-b border-border/40 py-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold">Technical AI</CardTitle>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold uppercase">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] p-4 rounded-[1.5rem] text-sm ${
                          msg.role === "user"
                            ? "bg-primary text-white rounded-tr-none"
                            : "bg-muted/40 backdrop-blur-sm rounded-tl-none"
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted/40 p-4 rounded-[1.5rem] rounded-tl-none flex gap-1">
                          <div className="h-1.5 w-1.5 bg-muted-foreground/40 rounded-full animate-bounce" />
                          <div className="h-1.5 w-1.5 bg-muted-foreground/40 rounded-full animate-bounce delay-100" />
                          <div className="h-1.5 w-1.5 bg-muted-foreground/40 rounded-full animate-bounce delay-200" />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t border-border/40 bg-muted/20">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Ask for repair help..."
                      className="rounded-xl bg-background border-none focus-visible:ring-primary/20 h-11"
                    />
                    <Button onClick={handleSend} className="rounded-xl h-11 w-11 p-0 shadow-lg">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
