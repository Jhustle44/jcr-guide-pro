import Header from "./header";
import Footer from "./footer";
import { BottomNav } from "./bottom-nav";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import AIAssistant from "../repair/ai-assistant";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pb-20 lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <BottomNav />
      <AIAssistant />
    </div>
  );
}
