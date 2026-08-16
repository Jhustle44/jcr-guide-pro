import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, Mail, Lock, User, ArrowRight, ShieldCheck, Zap, KeyRound } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthPage() {
  const { user, loginMutation, registerMutation, quickLoginMutation } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  if (user) {
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ email, password, firstName, lastName, role: "user" });
  };

  const handleAutofill = (techEmail: string, techPass: string = "password123") => {
    setEmail(techEmail);
    setPassword(techPass);
  };

  const handleQuickConnect = (techEmail: string) => {
    quickLoginMutation.mutate({ email: techEmail });
  };

  const isPending = loginMutation.isPending || registerMutation.isPending || quickLoginMutation.isPending;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-glass">
            <Wrench className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">JCRguru</h1>
          <p className="text-muted-foreground font-medium">Professional Technician & Diagnostic Hub</p>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="mb-4 bg-muted/40 backdrop-blur-md rounded-2xl p-3 border border-border/40">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-2">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span>1-Click Technician Access</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPending}
              onClick={() => handleQuickConnect("Jhustle44@gmail.com")}
              className="text-xs h-9 rounded-xl border-primary/30 hover:bg-primary/10 hover:text-primary transition-all flex flex-col items-center justify-center py-1"
            >
              <span className="font-bold text-[11px] leading-tight">Master Tech</span>
              <span className="text-[9px] text-muted-foreground opacity-80">Jhustle44</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPending}
              onClick={() => handleQuickConnect("tech@jcrguru.com")}
              className="text-xs h-9 rounded-xl border-border/60 hover:bg-primary/10 hover:text-primary transition-all flex flex-col items-center justify-center py-1"
            >
              <span className="font-bold text-[11px] leading-tight">Field Tech</span>
              <span className="text-[9px] text-muted-foreground opacity-80">tech@jcr</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPending}
              onClick={() => handleQuickConnect("admin@jcrguru.com")}
              className="text-xs h-9 rounded-xl border-border/60 hover:bg-primary/10 hover:text-primary transition-all flex flex-col items-center justify-center py-1"
            >
              <span className="font-bold text-[11px] leading-tight">Workshop</span>
              <span className="text-[9px] text-muted-foreground opacity-80">admin</span>
            </Button>
          </div>
        </div>

        <Card className="border-border/40 shadow-glass rounded-[2rem] overflow-hidden bg-card/40 backdrop-blur-2xl">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 bg-muted/20 p-1 rounded-none border-b border-border/40">
              <TabsTrigger value="login" className="rounded-none py-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary font-bold transition-all">Sign In</TabsTrigger>
              <TabsTrigger value="register" className="rounded-none py-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary font-bold transition-all">Register</TabsTrigger>
            </TabsList>

            <CardContent className="p-6 sm:p-8">
              <TabsContent value="login" className="mt-0 space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                      <button
                        type="button"
                        onClick={() => handleAutofill("Jhustle44@gmail.com", "password123")}
                        className="text-[11px] text-primary hover:underline flex items-center gap-1"
                      >
                        <KeyRound className="h-3 w-3" />
                        Autofill
                      </button>
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Jhustle44@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12 h-12 rounded-2xl bg-muted/30 border-border/40 focus-visible:ring-primary/20"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="password123"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-12 h-12 rounded-2xl bg-muted/30 border-border/40 focus-visible:ring-primary/20"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 transition-all mt-4"
                    disabled={isPending}
                  >
                    {loginMutation.isPending ? "Authenticating..." : "Sign In to Repair Hub"}
                    {!loginMutation.isPending && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </form>

                <div className="pt-2 text-center">
                  <p className="text-xs text-muted-foreground">
                    Default credentials: <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">password123</code>
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="register" className="mt-0">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">First Name</label>
                      <Input
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="h-12 rounded-2xl bg-muted/30 border-border/40 focus-visible:ring-primary/20"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Last Name</label>
                      <Input
                        placeholder="Hustle"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="h-12 rounded-2xl bg-muted/30 border-border/40 focus-visible:ring-primary/20"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="tech@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12 h-12 rounded-2xl bg-muted/30 border-border/40 focus-visible:ring-primary/20"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-12 h-12 rounded-2xl bg-muted/30 border-border/40 focus-visible:ring-primary/20"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 transition-all mt-4"
                    disabled={isPending}
                  >
                    {registerMutation.isPending ? "Creating Account..." : "Create Technician Profile"}
                    {!registerMutation.isPending && <User className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Encrypted Session & Technical Access Control</span>
        </div>
      </motion.div>
    </div>
  );
}
