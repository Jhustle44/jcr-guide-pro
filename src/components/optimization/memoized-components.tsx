// Memory-optimized React components with memoization
import { memo, useMemo, useCallback, useState, useRef, useEffect } from 'react';
import type { RepairGuide, TroubleshootingFlow, DeviceComponent } from '@shared/schema';

// Memoized guide card for better rendering performance
export const MemoizedGuideCard = memo(({ 
  guide, 
  onViewGuide 
}: { 
  guide: RepairGuide; 
  onViewGuide: (id: string) => void; 
}) => {
  const handleClick = useCallback(() => {
    onViewGuide(guide.id);
  }, [guide.id, onViewGuide]);

  const difficultyColor = useMemo(() => {
    switch (guide.difficulty) {
      case "easy": return "bg-success-50 text-success-600";
      case "medium": return "bg-warning-50 text-warning-700";
      case "hard": return "bg-danger-50 text-danger-700";
      default: return "bg-gray-50 text-gray-600";
    }
  }, [guide.difficulty]);

  const formattedViewCount = useMemo(() => {
    const count = guide.viewCount || 0;
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
  }, [guide.viewCount]);

  return (
    <div 
      className="bg-white dark:bg-gray-800 amoled:bg-black rounded-xl shadow-material hover:shadow-material-lg transition-shadow cursor-pointer"
      onClick={handleClick}
      data-testid={`guide-card-${guide.id}`}
    >
      <img
        src={guide.imageUrl}
        alt={guide.title}
        className="w-full h-48 object-cover rounded-t-xl"
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${difficultyColor}`}>
            {guide.difficulty.toUpperCase()}
          </span>
          <span className="text-sm text-gray-500">
            {formattedViewCount} views
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          {guide.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {guide.description}
        </p>
      </div>
    </div>
  );
});

MemoizedGuideCard.displayName = 'MemoizedGuideCard';

// Virtual list component for large datasets
interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
}

export function VirtualList<T>({ 
  items, 
  itemHeight, 
  containerHeight, 
  renderItem,
  overscan = 5 
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = useMemo(() => {
    return Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  }, [scrollTop, itemHeight, overscan]);

  const endIndex = useMemo(() => {
    return Math.min(
      items.length,
      startIndex + Math.ceil(containerHeight / itemHeight) + overscan * 2
    );
  }, [items.length, startIndex, containerHeight, itemHeight, overscan]);

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex);
  }, [items, startIndex, endIndex]);

  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div 
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
      data-testid="virtual-list"
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
              className="virtual-list-item"
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Memoized search results component
export const MemoizedSearchResults = memo(({ 
  results, 
  searchTerm, 
  onResultClick 
}: { 
  results: RepairGuide[]; 
  searchTerm: string; 
  onResultClick: (guide: RepairGuide) => void;
}) => {
  const highlightedResults = useMemo(() => {
    if (!searchTerm) {
      return results.map(guide => ({ ...guide, highlightedTitle: guide.title }));
    }
    
    return results.map(guide => ({
      ...guide,
      highlightedTitle: guide.title.replace(
        new RegExp(searchTerm, 'gi'),
        match => `<mark>${match}</mark>`
      )
    }));
  }, [results, searchTerm]);

  const handleResultClick = useCallback((guide: RepairGuide) => {
    onResultClick(guide);
  }, [onResultClick]);

  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No results found for "{searchTerm}"
      </div>
    );
  }

  return (
    <div className="space-y-2" data-testid="search-results">
      {highlightedResults.map(guide => (
        <div
          key={guide.id}
          className="p-3 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          onClick={() => handleResultClick(guide)}
          data-testid={`search-result-${guide.id}`}
        >
          <h4 
            className="font-medium text-gray-900 dark:text-white"
            dangerouslySetInnerHTML={{ __html: guide.highlightedTitle || guide.title }}
          />
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {guide.description}
          </p>
        </div>
      ))}
    </div>
  );
});

MemoizedSearchResults.displayName = 'MemoizedSearchResults';

// Optimized image gallery component
export const OptimizedImageGallery = memo(({ 
  images, 
  onImageClick 
}: { 
  images: string[]; 
  onImageClick: (src: string) => void;
}) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = useCallback((src: string) => {
    setLoadedImages(prev => new Set(prev).add(src));
  }, []);

  const handleImageClick = useCallback((src: string) => {
    onImageClick(src);
  }, [onImageClick]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-testid="image-gallery">
      {images.map((src, index) => (
        <div 
          key={src}
          className="aspect-square relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700"
        >
          <img
            src={src}
            alt={`Gallery image ${index + 1}`}
            className={`w-full h-full object-cover cursor-pointer transition-opacity duration-300 ${
              loadedImages.has(src) ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onClick={() => handleImageClick(src)}
            onLoad={() => handleImageLoad(src)}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
            data-testid={`gallery-image-${index}`}
          />
          {!loadedImages.has(src) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

OptimizedImageGallery.displayName = 'OptimizedImageGallery';

// Memory-efficient infinite scroll component
interface InfiniteScrollProps<T> {
  items: T[];
  loadMore: () => Promise<void>;
  hasMore: boolean;
  loading: boolean;
  renderItem: (item: T, index: number) => React.ReactNode;
  threshold?: number;
}

export function InfiniteScroll<T>({ 
  items, 
  loadMore, 
  hasMore, 
  loading, 
  renderItem,
  threshold = 200 
}: InfiniteScrollProps<T>) {
  const [loadingMore, setLoadingMore] = useState(false);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loadingMore) {
        setLoadingMore(true);
        loadMore().finally(() => setLoadingMore(false));
      }
    }, { threshold: 0.1 });
    
    if (node) observerRef.current.observe(node);
  }, [loading, hasMore, loadMore, loadingMore]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div data-testid="infinite-scroll">
      {items.map((item, index) => (
        <div key={index} className="infinite-scroll-item">
          {renderItem(item, index)}
        </div>
      ))}
      
      {hasMore && (
        <div 
          ref={sentinelRef}
          className="flex justify-center py-4"
          style={{ minHeight: threshold }}
        >
          {(loading || loadingMore) && (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-600 dark:text-gray-300">Loading more...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}