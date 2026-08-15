// Offline storage utilities for repair guides
import type { RepairGuide, TroubleshootingFlow, DeviceComponent } from "@shared/schema";

const STORAGE_KEYS = {
  GUIDES: 'jcr_offline_guides',
  FLOWS: 'jcr_offline_flows', 
  COMPONENTS: 'jcr_offline_components',
  FAVORITES: 'jcr_offline_favorites',
  LAST_SYNC: 'jcr_last_sync',
  USER_GUIDES: 'jcr_user_guides',
  DOWNLOADS: 'jcr_downloaded_files',
  VIDEOS: 'jcr_offline_videos',
  IMAGES: 'jcr_cached_images',

} as const;

export interface OfflineData {
  guides: RepairGuide[];
  flows: TroubleshootingFlow[];
  components: DeviceComponent[];
  favorites: string[];
  userGuides: RepairGuide[];
  lastSync: string;
}

export interface StorageUsage {
  used: number;
  total: number;
  percentage: number;
  breakdown: {
    guides: number;
    flows: number;
    components: number;
    favorites: number;
    userGuides: number;
    downloads: number;
    videos: number;
    images: number;

  };
}

export interface DownloadedFile {
  id: string;
  name: string;
  type: 'guide' | 'video' | 'image' | 'document';
  size: number;
  downloadDate: string;
  lastAccessed: string;
  format: string;
  relatedGuideId?: string;
}



// Check if browser supports offline storage
export const isOfflineSupported = (): boolean => {
  try {
    return typeof localStorage !== 'undefined' && 
           typeof navigator !== 'undefined' &&
           'serviceWorker' in navigator;
  } catch {
    return false;
  }
};

// Save data for offline use
export const saveOfflineData = async (data: Partial<OfflineData>): Promise<void> => {
  if (!isOfflineSupported()) return;

  try {
    if (data.guides) {
      localStorage.setItem(STORAGE_KEYS.GUIDES, JSON.stringify(data.guides));
    }
    if (data.flows) {
      localStorage.setItem(STORAGE_KEYS.FLOWS, JSON.stringify(data.flows));
    }
    if (data.components) {
      localStorage.setItem(STORAGE_KEYS.COMPONENTS, JSON.stringify(data.components));
    }
    if (data.favorites) {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(data.favorites));
    }
    if (data.userGuides) {
      localStorage.setItem(STORAGE_KEYS.USER_GUIDES, JSON.stringify(data.userGuides));
    }
    
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
  } catch (error) {
    console.error('Failed to save offline data:', error);
  }
};

// Load offline data
export const loadOfflineData = (): OfflineData => {
  const defaultData: OfflineData = {
    guides: [],
    flows: [],
    components: [],
    favorites: [],
    userGuides: [],
    lastSync: '',
  };

  if (!isOfflineSupported()) return defaultData;

  try {
    return {
      guides: JSON.parse(localStorage.getItem(STORAGE_KEYS.GUIDES) || '[]'),
      flows: JSON.parse(localStorage.getItem(STORAGE_KEYS.FLOWS) || '[]'),
      components: JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPONENTS) || '[]'),
      favorites: JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]'),
      userGuides: JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_GUIDES) || '[]'),
      lastSync: localStorage.getItem(STORAGE_KEYS.LAST_SYNC) || '',
    };
  } catch (error) {
    console.error('Failed to load offline data:', error);
    return defaultData;
  }
};

// Save user-created guide locally
export const saveUserGuide = (guide: RepairGuide): void => {
  if (!isOfflineSupported()) return;

  try {
    const userGuides = loadOfflineData().userGuides;
    const updatedGuides = [...userGuides, { ...guide, id: `user_${Date.now()}` }];
    localStorage.setItem(STORAGE_KEYS.USER_GUIDES, JSON.stringify(updatedGuides));
  } catch (error) {
    console.error('Failed to save user guide:', error);
  }
};

// Get user-created guides
export const getUserGuides = (): RepairGuide[] => {
  if (!isOfflineSupported()) return [];
  return loadOfflineData().userGuides;
};

// Clear all offline data
export const clearOfflineData = (): void => {
  if (!isOfflineSupported()) return;

  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Failed to clear offline data:', error);
  }
};

// Get comprehensive storage usage info
export const getStorageUsage = (): StorageUsage => {
  if (!isOfflineSupported()) {
    return {
      used: 0,
      total: 0,
      percentage: 0,
      breakdown: {
        guides: 0,
        flows: 0,
        components: 0,
        favorites: 0,
        userGuides: 0,
        downloads: 0,
        videos: 0,
        images: 0,
        analytics: 0,
      }
    };
  }

  try {
    const breakdown = {
      guides: getItemSize(STORAGE_KEYS.GUIDES),
      flows: getItemSize(STORAGE_KEYS.FLOWS),
      components: getItemSize(STORAGE_KEYS.COMPONENTS),
      favorites: getItemSize(STORAGE_KEYS.FAVORITES),
      userGuides: getItemSize(STORAGE_KEYS.USER_GUIDES),
      downloads: getItemSize(STORAGE_KEYS.DOWNLOADS),
      videos: getItemSize(STORAGE_KEYS.VIDEOS),
      images: getItemSize(STORAGE_KEYS.IMAGES),

    };

    const used = Object.values(breakdown).reduce((sum, size) => sum + size, 0);
    const total = 50 * 1024 * 1024; // 50MB increased capacity
    const percentage = Math.min((used / total) * 100, 100);

    return { used, total, percentage, breakdown };
  } catch (error) {
    console.error('Failed to get storage usage:', error);
    return {
      used: 0,
      total: 50 * 1024 * 1024,
      percentage: 0,
      breakdown: {
        guides: 0,
        flows: 0,
        components: 0,
        favorites: 0,
        userGuides: 0,
        downloads: 0,
        videos: 0,
        images: 0,
        analytics: 0,
      }
    };
  }
};

// Helper function to get size of localStorage item
const getItemSize = (key: string): number => {
  try {
    const item = localStorage.getItem(key);
    return item ? new Blob([item]).size : 0;
  } catch {
    return 0;
  }
};

// Check if device is online
export const isOnline = (): boolean => {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
};

// Sync data when connection is restored
export const syncWhenOnline = async (): Promise<void> => {
  if (!isOnline() || !isOfflineSupported()) return;

  try {
    // Get pending user guides
    const userGuides = getUserGuides();
    const pendingGuides = userGuides.filter(guide => guide.id.startsWith('user_'));

    // Attempt to sync pending guides to server
    for (const guide of pendingGuides) {
      try {
        const response = await fetch('/api/repair-guides', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(guide),
        });

        if (response.ok) {
          // Remove from local storage after successful sync
          const remainingGuides = userGuides.filter(g => g.id !== guide.id);
          localStorage.setItem(STORAGE_KEYS.USER_GUIDES, JSON.stringify(remainingGuides));
        }
      } catch (error) {
        console.error('Failed to sync guide:', error);
        // Keep guide in local storage for next sync attempt
      }
    }

    // Refresh cached data
    const [guides, flows, components] = await Promise.all([
      fetch('/api/repair-guides').then(res => res.json()).catch(() => []),
      fetch('/api/troubleshooting-flows').then(res => res.json()).catch(() => []),
      fetch('/api/device-components').then(res => res.json()).catch(() => []),
    ]);

    await saveOfflineData({ guides, flows, components });
  } catch (error) {
    console.error('Sync failed:', error);
  }
};

// Format storage size for display
export const formatStorageSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

// Save downloaded file record
export const saveDownloadedFile = (file: DownloadedFile): void => {
  if (!isOfflineSupported()) return;

  try {
    const downloads = getDownloadedFiles();
    const updatedDownloads = [...downloads, { ...file, lastAccessed: new Date().toISOString() }];
    localStorage.setItem(STORAGE_KEYS.DOWNLOADS, JSON.stringify(updatedDownloads));

  } catch (error) {
    console.error('Failed to save downloaded file record:', error);
  }
};

// Get all downloaded files
export const getDownloadedFiles = (): DownloadedFile[] => {
  if (!isOfflineSupported()) return [];

  try {
    const downloads = localStorage.getItem(STORAGE_KEYS.DOWNLOADS);
    return downloads ? JSON.parse(downloads) : [];
  } catch (error) {
    console.error('Failed to get downloaded files:', error);
    return [];
  }
};

// Update file access time
export const updateFileAccess = (fileId: string): void => {
  if (!isOfflineSupported()) return;

  try {
    const downloads = getDownloadedFiles();
    const updated = downloads.map(file => 
      file.id === fileId 
        ? { ...file, lastAccessed: new Date().toISOString() }
        : file
    );
    localStorage.setItem(STORAGE_KEYS.DOWNLOADS, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to update file access:', error);
  }
};

// Remove downloaded file record
export const removeDownloadedFile = (fileId: string): void => {
  if (!isOfflineSupported()) return;

  try {
    const downloads = getDownloadedFiles();
    const filtered = downloads.filter(file => file.id !== fileId);
    localStorage.setItem(STORAGE_KEYS.DOWNLOADS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to remove downloaded file:', error);
  }
};







// Clean up old downloads based on usage
export const cleanupOldDownloads = (maxAgeInDays: number = 30): void => {
  if (!isOfflineSupported()) return;

  try {
    const downloads = getDownloadedFiles();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - maxAgeInDays);

    const activeDownloads = downloads.filter(file => {
      const lastAccessed = new Date(file.lastAccessed);
      return lastAccessed > cutoffDate;
    });

    localStorage.setItem(STORAGE_KEYS.DOWNLOADS, JSON.stringify(activeDownloads));
  } catch (error) {
    console.error('Failed to cleanup old downloads:', error);
  }
};

// Get storage recommendations
export const getStorageRecommendations = (): string[] => {
  const usage = getStorageUsage();
  const recommendations: string[] = [];

  if (usage.percentage > 90) {
    recommendations.push('Storage is almost full. Consider cleaning up old downloads.');
  }

  if (usage.percentage > 75) {
    recommendations.push('Storage usage is high. Remove unused content to free up space.');
  }

  if (usage.breakdown.videos > usage.breakdown.guides) {
    recommendations.push('Videos take up more space than guides. Consider downloading fewer videos.');
  }

  if (usage.breakdown.images > 5 * 1024 * 1024) { // 5MB
    recommendations.push('Cached images are using significant space. Clear image cache if needed.');
  }



  return recommendations;
};

// Export cache management for videos and images
// Memory-optimized video caching with size limits
export const cacheVideo = (videoId: string, videoData: Blob): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!isOfflineSupported()) {
      resolve(false);
      return;
    }

    // Check video size limit (max 10MB per video)
    const MAX_VIDEO_SIZE = 10 * 1024 * 1024;
    if (videoData.size > MAX_VIDEO_SIZE) {
      console.warn(`Video ${videoId} too large (${videoData.size} bytes), skipping cache`);
      resolve(false);
      return;
    }

    try {
      // Check if we need to clear space first
      const currentUsage = getStorageUsage();
      const estimatedNewSize = videoData.size * 1.4; // Base64 overhead
      
      if (currentUsage.used + estimatedNewSize > currentUsage.total * 0.9) {
        // Clean up old videos if approaching limit
        cleanupOldVideos();
      }

      // Store metadata instead of full data for large videos
      const videos = JSON.parse(localStorage.getItem(STORAGE_KEYS.VIDEOS) || '{}');
      
      // For videos larger than 5MB, store only metadata
      if (videoData.size > 5 * 1024 * 1024) {
        videos[videoId] = {
          metadata: {
            size: videoData.size,
            type: videoData.type,
            cached: false,
            timestamp: Date.now()
          }
        };
      } else {
        // Store smaller videos as before but with compression info
        const reader = new FileReader();
        reader.onload = () => {
          try {
            videos[videoId] = {
              data: reader.result,
              metadata: {
                size: videoData.size,
                type: videoData.type,
                cached: true,
                timestamp: Date.now()
              }
            };
            localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
            resolve(true);
          } catch (error) {
            console.error('Failed to cache video:', error);
            resolve(false);
          }
        };
        reader.onerror = () => resolve(false);
        reader.readAsDataURL(videoData);
        return;
      }
      
      localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
      resolve(true);
    } catch (error) {
      console.error('Failed to cache video:', error);
      resolve(false);
    }
  });
};

export const getCachedVideo = (videoId: string): string | null => {
  if (!isOfflineSupported()) return null;

  try {
    const videos = JSON.parse(localStorage.getItem(STORAGE_KEYS.VIDEOS) || '{}');
    const video = videos[videoId];
    
    if (!video) return null;
    
    // Return actual data if cached, null if only metadata
    if (video.metadata && video.metadata.cached && video.data) {
      return video.data;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to get cached video:', error);
    return null;
  }
};

// Memory-optimized image caching with compression and limits
export const cacheImage = (imageUrl: string, imageData: Blob): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!isOfflineSupported()) {
      resolve(false);
      return;
    }

    // Check image size limit (max 2MB per image)
    const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
    if (imageData.size > MAX_IMAGE_SIZE) {
      console.warn(`Image ${imageUrl} too large (${imageData.size} bytes), skipping cache`);
      resolve(false);
      return;
    }

    try {
      // Check if we need to clear space first
      const currentUsage = getStorageUsage();
      const estimatedNewSize = imageData.size * 1.4; // Base64 overhead
      
      if (currentUsage.used + estimatedNewSize > currentUsage.total * 0.9) {
        // Clean up old images if approaching limit
        cleanupOldImages();
      }

      // Compress image if it's large
      if (imageData.size > 500 * 1024) { // 500KB
        compressAndCacheImage(imageUrl, imageData, resolve);
      } else {
        // Store smaller images directly
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.IMAGES) || '{}');
            images[imageUrl] = {
              data: reader.result,
              metadata: {
                size: imageData.size,
                type: imageData.type,
                timestamp: Date.now(),
                compressed: false
              }
            };
            localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));
            resolve(true);
          } catch (error) {
            console.error('Failed to cache image:', error);
            resolve(false);
          }
        };
        reader.onerror = () => resolve(false);
        reader.readAsDataURL(imageData);
      }
    } catch (error) {
      console.error('Failed to cache image:', error);
      resolve(false);
    }
  });
};

export const getCachedImage = (imageUrl: string): string | null => {
  if (!isOfflineSupported()) return null;

  try {
    const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.IMAGES) || '{}');
    const image = images[imageUrl];
    
    if (!image) return null;
    
    // Handle both old format (direct data) and new format (with metadata)
    if (typeof image === 'string') {
      return image; // Legacy format
    }
    
    if (image.data) {
      // Update access time for LRU cleanup
      image.metadata.lastAccessed = Date.now();
      images[imageUrl] = image;
      localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));
      return image.data;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to get cached image:', error);
    return null;
  }
};

// Helper function for image compression during caching
function compressAndCacheImage(imageUrl: string, imageData: Blob, resolve: (value: boolean) => void): void {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  img.onload = () => {
    // Calculate compressed dimensions (max 1024x1024)
    const MAX_SIZE = 1024;
    let { width, height } = img;
    
    if (width > MAX_SIZE || height > MAX_SIZE) {
      if (width > height) {
        height = (height * MAX_SIZE) / width;
        width = MAX_SIZE;
      } else {
        width = (width * MAX_SIZE) / height;
        height = MAX_SIZE;
      }
    }

    canvas.width = width;
    canvas.height = height;
    ctx?.drawImage(img, 0, 0, width, height);
    
    canvas.toBlob((compressedBlob) => {
      if (compressedBlob) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.IMAGES) || '{}');
            images[imageUrl] = {
              data: reader.result,
              metadata: {
                originalSize: imageData.size,
                compressedSize: compressedBlob.size,
                type: compressedBlob.type,
                timestamp: Date.now(),
                compressed: true
              }
            };
            localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));
            resolve(true);
          } catch (error) {
            console.error('Failed to cache compressed image:', error);
            resolve(false);
          }
        };
        reader.readAsDataURL(compressedBlob);
      } else {
        resolve(false);
      }
    }, 'image/jpeg', 0.8);
  };

  img.onerror = () => resolve(false);
  img.src = URL.createObjectURL(imageData);
}

// Cleanup old videos using LRU strategy
function cleanupOldVideos(): void {
  try {
    const videos = JSON.parse(localStorage.getItem(STORAGE_KEYS.VIDEOS) || '{}');
    const videoEntries = Object.entries(videos)
      .map(([id, data]: [string, any]) => ({
        id,
        timestamp: data.metadata?.timestamp || 0
      }))
      .sort((a, b) => a.timestamp - b.timestamp); // Oldest first

    // Remove oldest 30% of videos
    const removeCount = Math.ceil(videoEntries.length * 0.3);
    const toRemove = videoEntries.slice(0, removeCount);
    
    toRemove.forEach(({ id }) => {
      delete videos[id];
    });
    
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
    console.log(`Cleaned up ${removeCount} old videos`);
  } catch (error) {
    console.error('Failed to cleanup old videos:', error);
  }
}

// Cleanup old images using LRU strategy
function cleanupOldImages(): void {
  try {
    const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.IMAGES) || '{}');
    const imageEntries = Object.entries(images)
      .map(([url, data]: [string, any]) => {
        const timestamp = typeof data === 'object' && data.metadata 
          ? data.metadata.lastAccessed || data.metadata.timestamp || 0
          : 0;
        return { url, timestamp };
      })
      .sort((a, b) => a.timestamp - b.timestamp); // Oldest first

    // Remove oldest 30% of images
    const removeCount = Math.ceil(imageEntries.length * 0.3);
    const toRemove = imageEntries.slice(0, removeCount);
    
    toRemove.forEach(({ url }) => {
      delete images[url];
    });
    
    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));
    console.log(`Cleaned up ${removeCount} old images`);
  } catch (error) {
    console.error('Failed to cleanup old images:', error);
  }
}

// Get memory usage summary for monitoring
export const getMemoryUsageSummary = (): string => {
  const usage = getStorageUsage();
  const breakdown = Object.entries(usage.breakdown)
    .filter(([_, size]) => size > 0)
    .map(([type, size]) => `${type}: ${formatStorageSize(size)}`)
    .join(', ');
  
  return `Total: ${formatStorageSize(usage.used)} / ${formatStorageSize(usage.total)} (${usage.percentage.toFixed(1)}%). Breakdown: ${breakdown}`;
};

// Force cleanup when storage is nearly full
export const forceCleanupIfNeeded = (): boolean => {
  const usage = getStorageUsage();
  
  if (usage.percentage > 90) {
    console.warn('Storage nearly full, forcing cleanup...');
    cleanupOldImages();
    cleanupOldVideos();
    
    // Also clean up old downloaded files
    try {
      const downloads = getDownloadedFiles();
      const oldDownloads = downloads
        .filter(file => {
          const daysSinceAccess = (Date.now() - new Date(file.lastAccessed).getTime()) / (1000 * 60 * 60 * 24);
          return daysSinceAccess > 30; // Older than 30 days
        })
        .map(file => file.id);
      
      oldDownloads.forEach(fileId => removeDownloadedFile(fileId));
      
      if (oldDownloads.length > 0) {
        console.log(`Cleaned up ${oldDownloads.length} old download records`);
      }
    } catch (error) {
      console.error('Failed to cleanup old downloads:', error);
    }
    
    return true;
  }
  
  return false;
};