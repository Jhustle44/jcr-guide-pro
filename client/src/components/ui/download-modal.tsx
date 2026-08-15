import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { downloadGuide, downloadVideo, getEstimatedSize, isDownloadSupported, type DownloadOptions } from "@/lib/download-utils";
import { Download, FileText, Image, Video, HardDrive } from "lucide-react";
import type { RepairGuide } from "@shared/schema";

interface DownloadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guide: RepairGuide;
  videoUrl?: string;
}

export function DownloadModal({ open, onOpenChange, guide, videoUrl }: DownloadModalProps) {
  const { toast } = useToast();
  const [options, setOptions] = useState<DownloadOptions>({
    format: 'html',
    includeImages: true,
    includeVideos: false,
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = async () => {
    if (!isDownloadSupported()) {
      toast({
        title: "Download Not Supported",
        description: "Your browser doesn't support file downloads.",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);
    setDownloadProgress(10);

    try {
      // Download guide
      const guideSuccess = await downloadGuide(guide, options);
      setDownloadProgress(50);

      if (!guideSuccess) {
        throw new Error("Failed to download guide");
      }

      // Download video if requested
      if (options.includeVideos && videoUrl) {
        setDownloadProgress(75);
        const videoSuccess = await downloadVideo(videoUrl, `${guide.title}_video`);
        if (!videoSuccess) {
          toast({
            title: "Video Download Failed",
            description: "The guide was downloaded, but the video failed to download.",
            variant: "destructive",
          });
        }
      }

      setDownloadProgress(100);

      toast({
        title: "Download Complete",
        description: `${guide.title} has been downloaded successfully.`,
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the guide. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const estimatedSize = getEstimatedSize(guide, options);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Download Guide
          </DialogTitle>
          <DialogDescription>
            Download "{guide.title}" for offline access
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Format Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Download Format</Label>
            <RadioGroup
              value={options.format}
              onValueChange={(value) => setOptions({ ...options, format: value as 'html' | 'json' | 'pdf' })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="html" id="html" />
                <Label htmlFor="html" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  HTML (Recommended)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="json" id="json" />
                <Label htmlFor="json" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  JSON (Raw Data)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  PDF (Print-ready)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Include Options */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Include Content</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-images"
                  checked={options.includeImages}
                  onCheckedChange={(checked) => 
                    setOptions({ ...options, includeImages: checked as boolean })
                  }
                />
                <Label htmlFor="include-images" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Include Images
                </Label>
              </div>
              {videoUrl && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-videos"
                    checked={options.includeVideos}
                    onCheckedChange={(checked) => 
                      setOptions({ ...options, includeVideos: checked as boolean })
                    }
                  />
                  <Label htmlFor="include-videos" className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Include Video
                  </Label>
                </div>
              )}
            </div>
          </div>

          {/* Size Estimate */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <HardDrive className="h-4 w-4" />
            Estimated size: {estimatedSize}
          </div>

          {/* Download Progress */}
          {isDownloading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Downloading...</span>
                <span>{downloadProgress}%</span>
              </div>
              <Progress value={downloadProgress} className="h-2" />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isDownloading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}