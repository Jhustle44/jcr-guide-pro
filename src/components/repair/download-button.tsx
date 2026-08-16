import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DownloadModal } from "@/components/ui/download-modal";
import { Download, FileDown } from "lucide-react";
import type { RepairGuide } from "@shared/schema";

interface DownloadButtonProps {
  guide: RepairGuide;
  variant?: "icon" | "button";
  size?: "sm" | "md" | "lg";
  videoUrl?: string;
}

export default function DownloadButton({ 
  guide, 
  variant = "icon", 
  size = "sm",
  videoUrl 
}: DownloadButtonProps) {
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  if (variant === "button") {
    return (
      <>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setShowDownloadModal(true);
          }}
          className={`flex items-center gap-2 ${
            size === "sm" ? "px-3 py-1.5 text-sm" : 
            size === "md" ? "px-4 py-2" : 
            "px-6 py-3 text-lg"
          }`}
        >
          <FileDown className={size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6"} />
          Download
        </Button>
        
        <DownloadModal
          open={showDownloadModal}
          onOpenChange={setShowDownloadModal}
          guide={guide}
          videoUrl={videoUrl}
        />
      </>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setShowDownloadModal(true);
        }}
        className="text-gray-500 hover:text-primary-700 transition-colors"
        title="Download guide"
      >
        <Download className={size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6"} />
      </Button>
      
      <DownloadModal
        open={showDownloadModal}
        onOpenChange={setShowDownloadModal}
        guide={guide}
        videoUrl={videoUrl}
      />
    </>
  );
}