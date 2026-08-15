import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    {
      id: "emergency",
      label: "Emergency Shutdown",
      icon: "emergency",
      color: "text-danger-500",
      action: () => alert("Emergency shutdown guide: Hold power button for 10 seconds to force shutdown."),
    },
    {
      id: "tools",
      label: "Tool Checklist",
      icon: "construction",
      color: "text-primary-700",
      action: () => alert("Basic tool checklist: Phillips screwdriver, anti-static wrist strap, compressed air."),
    },
    {
      id: "safety",
      label: "Safety Guide",
      icon: "security",
      color: "text-warning-700",
      action: () => alert("Safety reminders: Power down device, ground yourself, work in clean environment."),
    },
    {
      id: "software",
      label: "Download Tools",
      icon: "download",
      color: "text-cyan-600",
      action: () => {
        const softwareSection = document.querySelector('[data-section="software-tools"]') || 
                               document.querySelector('section:last-of-type');
        if (softwareSection) {
          softwareSection.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
  ];

  const handleQuickAction = (action: () => void) => {
    action();
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 no-print">
      <div className="relative">
        {/* Quick access menu */}
        <div
          className={`absolute bottom-16 right-0 space-y-2 transition-all duration-200 ${
            isExpanded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {quickActions.map((item) => (
            <Button
              key={item.id}
              onClick={() => handleQuickAction(item.action)}
              className="flex items-center space-x-3 bg-white shadow-material rounded-full px-4 py-3 hover:shadow-material-lg transition-shadow text-gray-700 hover:text-gray-900"
              variant="outline"
            >
              <i className={`material-icons ${item.color}`}>{item.icon}</i>
              <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
            </Button>
          ))}
        </div>

        {/* Main FAB */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 bg-primary-700 text-white rounded-full shadow-material-lg hover:bg-primary-900 hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        >
          <i className={`material-icons text-2xl transition-transform ${isExpanded ? "rotate-45" : ""}`}>
            {isExpanded ? "close" : "help"}
          </i>
        </Button>
      </div>
    </div>
  );
}
