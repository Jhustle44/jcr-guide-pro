import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/footer";
import { Wrench, BookOpen, Heart, Zap, Shield, Laptop, Monitor, ArrowRight } from "lucide-react";

import { useLocation } from "wouter";

export default function Landing() {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-500/5 rounded-full blur-[100px]" />
      </div>

      <main className="flex-1 flex flex-col items-center pt-20 pb-16 px-4">

        {/* Hero Section */}
        <div className="w-full max-w-4xl text-center space-y-8 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
            <Zap className="h-3 w-3" /> v1.0.0 is Live
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent leading-[1.1]">
            Master Your Tech.<br />
            <span className="text-primary italic">Repair with Confidence.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The professional repair companion for laptops and PCs. Interactive guides, expert troubleshooting, and a modern community at your fingertips.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => setLocation("/auth")}
              size="lg"
              className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-glass transition-all hover:scale-105"
            >
              Start Repairing Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setLocation("/")}
              className="h-14 px-8 rounded-full border-border/60 hover:bg-muted font-semibold text-lg"
            >
              Browse Public Guides
            </Button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mb-24">
          <div className="group p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/40 hover:border-primary/40 transition-all hover:shadow-glass duration-500">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Precision Guides</h3>
            <p className="text-muted-foreground leading-relaxed">
              Step-by-step visual instructions tailored for specific laptop and desktop models.
            </p>
          </div>

          <div className="group p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/40 hover:border-primary/40 transition-all hover:shadow-glass duration-500">
            <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 transition-transform">
              <Wrench className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Pro Toolkits</h3>
            <p className="text-muted-foreground leading-relaxed">
              Interactive decision trees that help you diagnose hardware issues like a seasoned technician.
            </p>
          </div>

          <div className="group p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/40 hover:border-primary/40 transition-all hover:shadow-glass duration-500">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Community First</h3>
            <p className="text-muted-foreground leading-relaxed">
              Verified guides reviewed by experts to ensure safety and success in every repair.
            </p>
          </div>
        </div>

        {/* Device Support Preview */}
        <div className="w-full max-w-5xl bg-muted/30 border border-border/40 rounded-[2.5rem] p-8 md:p-12 text-center overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-8">Supporting Every Build</h2>
            <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
               <div className="flex flex-col items-center gap-2">
                 <Laptop className="h-10 w-10 text-primary" />
                 <span className="text-xs font-bold tracking-widest uppercase">Laptops</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <Monitor className="h-10 w-10 text-primary" />
                 <span className="text-xs font-bold tracking-widest uppercase">Desktops</span>
               </div>
            </div>
          </div>
        </div>

      </main>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
