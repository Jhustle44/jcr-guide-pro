import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { installPWA, isPWAInstalled } from "@/pwa-utils";
import { X, Download } from "lucide-react";

export function InstallBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if PWA is already installed
    const installed = isPWAInstalled();
    setIsInstalled(installed);
    
    // Show banner if not installed and installation is supported
    if (!installed && 'serviceWorker' in navigator) {
      // Wait a bit before showing the banner
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleInstall = async () => {
    try {
      await installPWA();
      setShowBanner(false);
    } catch (error) {
      console.error('Installation failed:', error);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    // Remember user dismissed the banner
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  // Don't show if already installed or user dismissed
  if (isInstalled || !showBanner || localStorage.getItem('pwa-banner-dismissed')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <Card className="bg-primary-700 text-white border-primary-600">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Download className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium">Install JCR Guide Pro</h3>
              <p className="text-xs text-primary-100 mt-1">
                Get instant access to repair guides offline. Install our app for the best experience.
              </p>
              <div className="mt-3 flex space-x-2">
                <Button
                  onClick={handleInstall}
                  size="sm"
                  variant="secondary"
                  className="bg-white text-primary-700 hover:bg-gray-100"
                >
                  Install
                </Button>
                <Button
                  onClick={handleDismiss}
                  size="sm"
                  variant="ghost"
                  className="text-primary-100 hover:text-white hover:bg-primary-600"
                >
                  Maybe Later
                </Button>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 text-primary-200 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}