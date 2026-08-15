import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { apiurl } from "./config";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  path: string,
  data?: unknown | undefined,
): Promise<Response> {
  const url = apiurl(path);
  const res = await fetch(url, {
    method,
    headers: {
      ...(data ? { "Content-Type": "application/json" } : {}),
      'Accept': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
    keepalive: true, // Performance optimization
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Join queryKey to path and prepend configured base URL
    const path = `/${queryKey.join("/")}`;
    const url = apiurl(path);

    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

// Memory-optimized query client with size limits and better cleanup
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 3 * 60 * 1000, // 3 minutes for better memory management
      gcTime: 5 * 60 * 1000, // 5 minutes garbage collection (reduced from 10)
      retry: (failureCount, error: any) => {
        // Reduce retries for faster error handling
        return failureCount < 1 && !error?.message?.includes('401');
      },
    },
    mutations: {
      retry: false,
      gcTime: 2 * 60 * 1000, // 2 minutes for mutations
    },
  },
});

// Memory cleanup function
export function cleanupQueryCache() {
  queryClient.clear();
  // Force garbage collection if available
  if ('gc' in global) {
    (global as any).gc();
  }
}

// Enhanced memory management for React Query
export function setupQueryCacheManagement() {
  // Periodic cleanup to prevent memory buildup
  const cleanupInterval = setInterval(() => {
    const cacheSize = queryClient.getQueryCache().getAll().length;
    
    if (cacheSize > 100) {
      console.log(`Query cache cleanup: ${cacheSize} entries`);
      
      // Remove queries that are stale and haven't been accessed recently
      queryClient.removeQueries({
        stale: true,
        exact: false,
      });
      
      // If still too many, remove oldest inactive queries
      const remainingSize = queryClient.getQueryCache().getAll().length;
      if (remainingSize > 75) {
        const allQueries = queryClient.getQueryCache().getAll();
        const inactiveQueries = allQueries
          .filter(query => query.getObserversCount() === 0)
          .sort((a, b) => (a.state.dataUpdatedAt || 0) - (b.state.dataUpdatedAt || 0))
          .slice(0, Math.floor(remainingSize * 0.3)); // Remove oldest 30%
        
        inactiveQueries.forEach(query => {
          queryClient.removeQueries({ queryKey: query.queryKey, exact: true });
        });
      }
    }
  }, 3 * 60 * 1000); // Every 3 minutes
  
  // Cleanup on page unload
  const handleUnload = () => {
    clearInterval(cleanupInterval);
    cleanupQueryCache();
  };
  
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', handleUnload);
  }
  
  return () => {
    clearInterval(cleanupInterval);
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', handleUnload);
    }
  };
}

// Memory usage monitoring for query cache
export function getQueryCacheStats() {
  const cache = queryClient.getQueryCache();
  const allQueries = cache.getAll();
  
  const stats = {
    totalQueries: allQueries.length,
    activeQueries: allQueries.filter(q => q.getObserversCount() > 0).length,
    staleQueries: allQueries.filter(q => q.isStale()).length,
    errorQueries: allQueries.filter(q => q.state.status === 'error').length,
    estimatedSizeKB: Math.round(allQueries.reduce((size, query) => {
      try {
        return size + (JSON.stringify(query.state.data).length / 1024);
      } catch {
        return size + 1; // 1KB estimate for non-serializable data
      }
    }, 0)),
  };
  
  return stats;
}
