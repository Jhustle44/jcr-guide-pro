// Performance optimization utilities

// Preload critical routes and data
export function preloadCriticalRoutes() {
  // Preload the most common pages users visit
  const criticalImports = [
    () => import("@/pages/device-finder"),
    () => import("@/pages/troubleshooting"),
    () => import("@/pages/repair-guide"),
  ];

  // Use requestIdleCallback to preload during idle time
  if ('requestIdleCallback' in window) {
    criticalImports.forEach((importFn, index) => {
      window.requestIdleCallback(() => {
        importFn().catch(() => {}); // Silent fail for preloading
      }, { timeout: 1000 + (index * 500) });
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      criticalImports.forEach((importFn) => {
        importFn().catch(() => {});
      });
    }, 2000);
  }
}

// Optimize images with lazy loading and proper sizing
export function setupImageOptimization() {
  // Add loading="lazy" to all images that don't have it
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach((img) => {
    img.setAttribute('loading', 'lazy');
  });
}

// Preconnect to external domains for faster resource loading
export function setupPreconnects() {
  const preconnects = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ];

  preconnects.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Setup performance monitoring
export function setupPerformanceMonitoring() {
  // Monitor Core Web Vitals
  if ('web-vital' in window || typeof window !== 'undefined') {
    // Track First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime);
        }
      }
    });
    
    try {
      observer.observe({ entryTypes: ['paint'] });
    } catch (e) {
      // Browser doesn't support this API
    }
  }
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Enhanced image optimization with memory management
export function optimizeImageLoading() {
  // Lazy load all images
  const images = document.querySelectorAll('img');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        
        // Set loading attributes
        if (!img.getAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        
        // Optimize image sizing
        if (!img.style.maxWidth) {
          img.style.maxWidth = '100%';
          img.style.height = 'auto';
        }
        
        // Add error handling
        img.onerror = () => {
          img.style.display = 'none';
          console.warn(`Failed to load image: ${img.src}`);
        };
        
        imageObserver.unobserve(img);
      }
    });
  }, { 
    rootMargin: '50px',
    threshold: 0.1
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  return () => imageObserver.disconnect();
}

// Memory-efficient list rendering with virtual scrolling
export function setupVirtualScrolling(containerRef: HTMLElement, itemHeight: number, totalItems: number) {
  let startIndex = 0;
  let endIndex = Math.min(Math.ceil(containerRef.clientHeight / itemHeight) + 5, totalItems);
  
  const updateVisibleRange = () => {
    const scrollTop = containerRef.scrollTop;
    const containerHeight = containerRef.clientHeight;
    
    startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 2);
    endIndex = Math.min(totalItems, startIndex + Math.ceil(containerHeight / itemHeight) + 5);
    
    return { startIndex, endIndex };
  };
  
  const handleScroll = throttle(() => {
    updateVisibleRange();
    // Trigger re-render callback if needed
  }, 16); // 60fps
  
  containerRef.addEventListener('scroll', handleScroll, { passive: true });
  
  return {
    getVisibleRange: updateVisibleRange,
    cleanup: () => containerRef.removeEventListener('scroll', handleScroll)
  };
}

// Memory leak detection and cleanup
export function detectMemoryLeaks() {
  const initialMemory = (performance as any).memory?.usedJSHeapSize;
  let checkCount = 0;
  
  const memoryCheckInterval = setInterval(() => {
    checkCount++;
    
    if ('memory' in performance) {
      const currentMemory = (performance as any).memory.usedJSHeapSize;
      const memoryGrowth = currentMemory - (initialMemory || 0);
      
      if (memoryGrowth > 50 * 1024 * 1024 && checkCount > 10) { // 50MB growth
        console.warn('Potential memory leak detected:', {
          growth: `${Math.round(memoryGrowth / 1024 / 1024)}MB`,
          current: `${Math.round(currentMemory / 1024 / 1024)}MB`
        });
        
        // Suggest cleanup actions
        console.log('Suggesting cleanup actions:');
        console.log('- Clear unused query cache');
        console.log('- Remove old localStorage data');
        console.log('- Check for unremoved event listeners');
      }
    }
    
    // Stop checking after 30 minutes
    if (checkCount > 180) {
      clearInterval(memoryCheckInterval);
    }
  }, 10000); // Check every 10 seconds
  
  return () => clearInterval(memoryCheckInterval);
}

// Optimize bundle loading with intelligent preloading
export function optimizeBundleLoading() {
  // Preload critical chunks during idle time
  const criticalChunks = [
    '/assets/repair-guides',
    '/assets/device-finder',
    '/assets/troubleshooting'
  ];
  
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      criticalChunks.forEach((chunk, index) => {
        setTimeout(() => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'script';
          link.href = chunk;
          document.head.appendChild(link);
        }, index * 200);
      });
    });
  }
}

// Resource cleanup on route changes
export function cleanupOnRouteChange() {
  // Cancel pending requests
  const abortController = new AbortController();
  
  // Clean up timers
  const timers: NodeJS.Timeout[] = [];
  
  const cleanup = () => {
    abortController.abort();
    timers.forEach(timer => clearTimeout(timer));
    timers.length = 0;
  };
  
  // Listen for route changes
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', cleanup);
    window.addEventListener('popstate', cleanup);
  }
  
  return {
    addTimer: (timer: NodeJS.Timeout) => timers.push(timer),
    signal: abortController.signal,
    cleanup
  };
}