import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, Mail, Lock, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  if (user) {
    setLocation("/");
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ email, password, firstName, lastName });
  };

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
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-glass">
            <Wrench className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">JCRguru</h1>
          <p className="text-muted-foreground font-medium">Professional Repair Hub</p>
        </div>

        <Card className="border-border/40 shadow-glass rounded-[2.5rem] overflow-hidden bg-card/40 backdrop-blur-2xl">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 bg-muted/20 p-1 rounded-none border-b border-border/40">
              <TabsTrigger value="login" className="rounded-none py-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all">Login</TabsTrigger>
              <TabsTrigger value="register" className="rounded-none py-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all">Join Us</TabsTrigger>
            </TabsList>

            <CardContent className="p-8">
              <TabsContent value="login" className="mt-0">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="tech@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12 h-12 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-12 h-12 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 transition-all mt-4"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Connecting..." : "Sign In"}
                    {!loginMutation.isPending && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="mt-0">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">First Name</label>
                      <Input
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="h-12 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Last Name</label>
                      <Input
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="h-12 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="tech@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12 h-12 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-12 h-12 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 transition-all mt-4"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Creating..." : "Create Account"}
                    {!registerMutation.isPending && <User className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-8 px-8">
          By signing in, you agree to JCRguru's Technical Service Guidelines and Community Standards.
        </p>
      </motion.div>
    </div>
  );
}
