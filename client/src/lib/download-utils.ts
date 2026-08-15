// Download utilities for guides and videos
import type { RepairGuide, TroubleshootingFlow } from "@shared/schema";
import { saveDownloadedFile, type DownloadedFile } from "./offline-storage";

export interface DownloadOptions {
  includeImages?: boolean;
  includeVideos?: boolean;
  format?: 'pdf' | 'html' | 'json';
}

// Download a repair guide as a file
export const downloadGuide = async (guide: RepairGuide, options: DownloadOptions = {}) => {
  const { format = 'html', includeImages = true } = options;
  
  try {
    let content: string;
    let mimeType: string;
    let fileName: string;

    switch (format) {
      case 'html':
        content = generateHTMLGuide(guide, includeImages);
        mimeType = 'text/html';
        fileName = `${sanitizeFileName(guide.title)}.html`;
        break;
      case 'json':
        content = JSON.stringify(guide, null, 2);
        mimeType = 'application/json';
        fileName = `${sanitizeFileName(guide.title)}.json`;
        break;
      case 'pdf':
        // For PDF, we'll generate HTML and let the browser handle PDF conversion
        content = generatePrintableHTML(guide, includeImages);
        mimeType = 'text/html';
        fileName = `${sanitizeFileName(guide.title)}_printable.html`;
        break;
      default:
        throw new Error('Unsupported format');
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    // Track the download
    await trackGuideDownload(guide.id);
    const downloadRecord: DownloadedFile = {
      id: `guide_${guide.id}_${Date.now()}`,
      name: guide.title,
      type: 'guide',
      size: blob.size,
      downloadDate: new Date().toISOString(),
      lastAccessed: new Date().toISOString(),
      format: format,
      relatedGuideId: guide.id,
    };
    saveDownloadedFile(downloadRecord);
    
    return true;
  } catch (error) {
    console.error('Failed to download guide:', error);
    return false;
  }
};

// Download video from URL
export const downloadVideo = async (videoUrl: string, title: string): Promise<boolean> => {
  try {
    const response = await fetch(videoUrl, {
      mode: 'cors',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sanitizeFileName(title)}.mp4`;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    // Track the video download
    const downloadRecord: DownloadedFile = {
      id: `video_${Date.now()}`,
      name: title,
      type: 'video',
      size: blob.size,
      downloadDate: new Date().toISOString(),
      lastAccessed: new Date().toISOString(),
      format: 'mp4',
    };
    saveDownloadedFile(downloadRecord);
    
    return true;
  } catch (error) {
    console.error('Failed to download video:', error);
    return false;
  }
};

// Download multiple guides as a ZIP file
export const downloadGuidePackage = async (guides: RepairGuide[], packageName: string = 'repair_guides'): Promise<boolean> => {
  try {
    // For now, we'll create individual files. In production, you'd use a ZIP library
    const promises = guides.map(guide => 
      downloadGuide(guide, { format: 'html', includeImages: true })
    );
    
    await Promise.all(promises);
    return true;
  } catch (error) {
    console.error('Failed to download guide package:', error);
    return false;
  }
};

// Generate HTML content for a guide
const generateHTMLGuide = (guide: RepairGuide, includeImages: boolean): string => {
  const steps = guide.steps as Array<{
    stepNumber: number;
    title: string;
    description: string;
    notes?: string[];
    warnings?: string[];
  }> || [];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${guide.title}</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.6; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px;
            color: #333;
        }
        .header { 
            border-bottom: 2px solid #e2e8f0; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
        }
        .title { 
            font-size: 2.5rem; 
            font-weight: bold; 
            margin-bottom: 10px;
            color: #1a202c;
        }
        .description { 
            font-size: 1.1rem; 
            color: #4a5568; 
            margin-bottom: 15px;
        }
        .meta { 
            display: flex; 
            gap: 15px; 
            font-size: 0.9rem;
            color: #718096;
        }
        .difficulty { 
            padding: 4px 12px; 
            border-radius: 6px; 
            font-weight: 500;
        }
        .difficulty.easy { background: #c6f6d5; color: #22543d; }
        .difficulty.medium { background: #fef2c0; color: #744210; }
        .difficulty.hard { background: #fed7d7; color: #742a2a; }
        .section { 
            margin: 30px 0; 
        }
        .section-title { 
            font-size: 1.5rem; 
            font-weight: 600; 
            margin-bottom: 15px;
            color: #2d3748;
        }
        .tools-list, .safety-list { 
            list-style: none; 
            padding: 0; 
        }
        .tools-list li, .safety-list li { 
            padding: 8px 12px; 
            margin: 5px 0; 
            border-left: 4px solid #4299e1;
            background: #ebf8ff;
        }
        .safety-list li { 
            border-left-color: #f56565; 
            background: #fed7d7;
        }
        .step { 
            margin: 25px 0; 
            padding: 20px; 
            border: 1px solid #e2e8f0; 
            border-radius: 8px;
            background: #f7fafc;
        }
        .step-number { 
            font-size: 1.3rem; 
            font-weight: bold; 
            color: #3182ce;
            margin-bottom: 10px;
        }
        .step-title { 
            font-size: 1.2rem; 
            font-weight: 600; 
            margin-bottom: 10px;
            color: #2d3748;
        }
        .step-description { 
            margin-bottom: 15px; 
            line-height: 1.8;
        }
        .notes, .warnings { 
            margin-top: 10px; 
            padding: 10px; 
            border-radius: 6px;
            font-size: 0.9rem;
        }
        .notes { 
            background: #ebf8ff; 
            border-left: 4px solid #4299e1;
        }
        .warnings { 
            background: #fed7d7; 
            border-left: 4px solid #f56565;
        }
        .guide-image { 
            max-width: 100%; 
            height: auto; 
            border-radius: 8px; 
            margin: 20px 0;
        }
        @media print {
            body { font-size: 12pt; }
            .step { break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="title">${guide.title}</h1>
        <p class="description">${guide.description}</p>
        <div class="meta">
            <span class="difficulty ${guide.difficulty}">${guide.difficulty.toUpperCase()}</span>
            <span>📱 ${guide.deviceType}</span>
            <span>🔧 ${guide.category}</span>
            <span>⏱️ ${guide.estimatedTime}</span>
        </div>
    </div>

    ${includeImages && guide.imageUrl ? `
    <div class="section">
        <img src="${guide.imageUrl}" alt="${guide.title}" class="guide-image" />
    </div>
    ` : ''}

    <div class="section">
        <h2 class="section-title">🛠️ Tools Required</h2>
        <ul class="tools-list">
            ${guide.toolsRequired.map(tool => `<li>${tool}</li>`).join('')}
        </ul>
    </div>

    ${guide.safetyWarnings && guide.safetyWarnings.length > 0 ? `
    <div class="section">
        <h2 class="section-title">⚠️ Safety Warnings</h2>
        <ul class="safety-list">
            ${guide.safetyWarnings.map(warning => `<li>${warning}</li>`).join('')}
        </ul>
    </div>
    ` : ''}

    <div class="section">
        <h2 class="section-title">📋 Repair Steps</h2>
        ${steps.map(step => `
        <div class="step">
            <div class="step-number">Step ${step.stepNumber}</div>
            <div class="step-title">${step.title}</div>
            <div class="step-description">${step.description}</div>
            ${step.notes && step.notes.length > 0 ? `
            <div class="notes">
                <strong>Notes:</strong> ${step.notes.join(', ')}
            </div>
            ` : ''}
            ${step.warnings && step.warnings.length > 0 ? `
            <div class="warnings">
                <strong>⚠️ Warnings:</strong> ${step.warnings.join(', ')}
            </div>
            ` : ''}
        </div>
        `).join('')}
    </div>

    ${guide.alternativeSolutions ? `
    <div class="section">
        <h2 class="section-title">🔄 Alternative Solutions</h2>
        <p>${guide.alternativeSolutions}</p>
    </div>
    ` : ''}

    <div class="section" style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #718096; font-size: 0.9rem;">
        <p>Downloaded from JCR Guide Pro • ${new Date().toLocaleDateString()}</p>
    </div>
</body>
</html>
  `.trim();
};

// Generate printable HTML (optimized for PDF)
const generatePrintableHTML = (guide: RepairGuide, includeImages: boolean): string => {
  const html = generateHTMLGuide(guide, includeImages);
  return html.replace(
    '<style>',
    '<style>@page { margin: 1in; } body { font-size: 11pt; } '
  );
};

// Sanitize filename for downloads
const sanitizeFileName = (fileName: string): string => {
  return fileName
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase();
};

// Check if download is supported
export const isDownloadSupported = (): boolean => {
  return typeof document !== 'undefined' && 'createElement' in document;
};

// Get estimated download size
export const getEstimatedSize = (guide: RepairGuide, options: DownloadOptions = {}): string => {
  const { format = 'html', includeImages = true } = options;
  
  let estimatedBytes = 0;
  
  // Base content size
  estimatedBytes += JSON.stringify(guide).length * 2; // HTML markup overhead
  
  // Add estimated image sizes if included
  if (includeImages && guide.imageUrl) {
    estimatedBytes += 100000; // Estimate 100KB per image
  }
  
  // Format-specific overhead
  switch (format) {
    case 'html':
      estimatedBytes += 5000; // CSS and HTML structure
      break;
    case 'pdf':
      estimatedBytes *= 1.5; // PDF conversion overhead
      break;
  }
  
  return formatFileSize(estimatedBytes);
};

// Format file size for display
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

// Track guide download
export const trackGuideDownload = async (guideId: string): Promise<void> => {
  try {
    await fetch(`/api/repair-guides/${guideId}/download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to track download:', error);
  }
};