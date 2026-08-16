// Memory optimization utilities for the JCR Guide Pro application

// Memory leak prevention utilities
export class MemoryLeakPrevention {
  private static intervals: Set<NodeJS.Timeout> = new Set();
  private static timeouts: Set<NodeJS.Timeout> = new Set();
  private static eventListeners: Map<Element, Array<{ event: string; handler: EventListener }>> = new Map();

  // Tracked setTimeout to prevent leaks
  static setTimeout(callback: () => void, delay: number): NodeJS.Timeout {
    const timeout = setTimeout(() => {
      callback();
      this.timeouts.delete(timeout);
    }, delay);
    this.timeouts.add(timeout);
    return timeout;
  }

  // Tracked setInterval to prevent leaks
  static setInterval(callback: () => void, delay: number): NodeJS.Timeout {
    const interval = setInterval(callback, delay);
    this.intervals.add(interval);
    return interval;
  }

  // Clear specific timeout
  static clearTimeout(timeout: NodeJS.Timeout): void {
    clearTimeout(timeout);
    this.timeouts.delete(timeout);
  }

  // Clear specific interval
  static clearInterval(interval: NodeJS.Timeout): void {
    clearInterval(interval);
    this.intervals.delete(interval);
  }

  // Add tracked event listener
  static addEventListener(element: Element, event: string, handler: EventListener): void {
    element.addEventListener(event, handler);
    
    if (!this.eventListeners.has(element)) {
      this.eventListeners.set(element, []);
    }
    this.eventListeners.get(element)!.push({ event, handler });
  }

  // Remove tracked event listener
  static removeEventListener(element: Element, event: string, handler: EventListener): void {
    element.removeEventListener(event, handler);
    
    const listeners = this.eventListeners.get(element);
    if (listeners) {
      const index = listeners.findIndex(l => l.event === event && l.handler === handler);
      if (index > -1) {
        listeners.splice(index, 1);
      }
      if (listeners.length === 0) {
        this.eventListeners.delete(element);
      }
    }
  }

  // Clean up all tracked resources
  static cleanup(): void {
    // Clear all intervals
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();

    // Clear all timeouts
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts.clear();

    // Remove all event listeners
    this.eventListeners.forEach((listeners, element) => {
      listeners.forEach(({ event, handler }) => {
        element.removeEventListener(event, handler);
      });
    });
    this.eventListeners.clear();
  }

  // Get current resource count
  static getResourceCount(): { intervals: number; timeouts: number; listeners: number } {
    let listenerCount = 0;
    this.eventListeners.forEach(listeners => {
      listenerCount += listeners.length;
    });

    return {
      intervals: this.intervals.size,
      timeouts: this.timeouts.size,
      listeners: listenerCount
    };
  }
}

// React component memory optimization hook
export function useMemoryOptimization() {
  if (typeof window === 'undefined') return;

  // Cleanup on page unload
  const handleUnload = () => {
    MemoryLeakPrevention.cleanup();
  };

  window.addEventListener('beforeunload', handleUnload);
  
  return () => {
    window.removeEventListener('beforeunload', handleUnload);
    MemoryLeakPrevention.cleanup();
  };
}

// Image compression utility
export function compressImage(file: Blob, maxWidth = 1920, maxHeight = 1080, quality = 0.8): Promise<Blob> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob((blob) => {
        resolve(blob || file);
      }, 'image/jpeg', quality);
    };

    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });
}

// Memory monitoring utilities
export class MemoryMonitor {
  private static checkInterval: NodeJS.Timeout | null = null;

  static startMonitoring(intervalMs = 30000): void {
    if (this.checkInterval) return;

    this.checkInterval = MemoryLeakPrevention.setInterval(() => {
      this.checkMemoryUsage();
    }, intervalMs);
  }

  static stopMonitoring(): void {
    if (this.checkInterval) {
      MemoryLeakPrevention.clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  private static checkMemoryUsage(): void {
    // Check performance memory if available
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const used = Math.round(memory.usedJSHeapSize / 1048576);
      const total = Math.round(memory.totalJSHeapSize / 1048576);
      const limit = Math.round(memory.jsHeapSizeLimit / 1048576);

      // Warn if memory usage is high
      if (used > limit * 0.8) {
        console.warn(`High memory usage detected: ${used}MB / ${limit}MB`);
        this.suggestCleanup();
      }
    }

    // Check localStorage usage
    if (typeof localStorage !== 'undefined') {
      let totalSize = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          totalSize += localStorage[key].length;
        }
      }
      
      const storageMB = totalSize / (1024 * 1024);
      if (storageMB > 40) { // Warn at 40MB
        console.warn(`High localStorage usage: ${storageMB.toFixed(1)}MB`);
      }
    }
  }

  private static suggestCleanup(): void {
    console.log('Memory optimization suggestions:');
    console.log('- Clear old cached images and videos');
    console.log('- Reduce query cache size');
    console.log('- Check for memory leaks in components');
  }

  static getMemoryInfo(): any {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576),
        total: Math.round(memory.totalJSHeapSize / 1048576),
        limit: Math.round(memory.jsHeapSizeLimit / 1048576),
        percentage: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)
      };
    }
    return null;
  }
}

// Efficient data structure helpers
export class MemoryEfficientMap<K, V> extends Map<K, V> {
  private maxSize: number;
  
  constructor(maxSize = 1000) {
    super();
    this.maxSize = maxSize;
  }

  set(key: K, value: V): this {
    // Remove oldest entries if at capacity
    if (this.size >= this.maxSize && !this.has(key)) {
      const firstKey = this.keys().next().value;
      this.delete(firstKey);
    }
    
    return super.set(key, value);
  }
}

// Debounced cleanup for large lists
export function debouncedCleanup<T>(
  items: T[],
  cleanupFn: (item: T) => void,
  delay = 1000
): void {
  const cleanup = () => {
    items.forEach(cleanupFn);
  };

  clearTimeout((cleanup as any).timeoutId);
  (cleanup as any).timeoutId = MemoryLeakPrevention.setTimeout(cleanup, delay);
}