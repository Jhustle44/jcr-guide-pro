import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { apiurl } from "./config";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    let message = `${res.status}: ${res.statusText || "Request failed"}`;
    try {
      const text = await res.text();
      try {
        const parsed = JSON.parse(text);
        if (parsed && typeof parsed === "object" && parsed.message) {
          message = parsed.message;
        } else if (text) {
          message = text;
        }
      } catch {
        if (text) message = text;
      }
    } catch {
      // ignore
    }
    throw new Error(message);
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
    // Join queryKey to path and strip duplicate slashes
    const segments = queryKey
      .filter(k => k !== null && k !== undefined && k !== "")
      .map(k => String(k).replace(/^\/+|\/+$/g, ""));
    const path = `/${segments.join("/")}`;
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

// Performance-optimized query client with long-lived warm caching
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 10 * 60 * 1000, // 10 minutes cache duration for instant page switching
      gcTime: 30 * 60 * 1000, // 30 minutes in memory
      retry: (failureCount, error: any) => {
        return failureCount < 1 && !error?.message?.includes('401');
      },
    },
    mutations: {
      retry: false,
      gcTime: 5 * 60 * 1000,
    },
  },
});

// Memory cleanup function
export function cleanupQueryCache() {
  queryClient.clear();
  if ('gc' in global) {
    (global as any).gc();
  }
}

// Enhanced cache management for React Query
export function setupQueryCacheManagement() {
  const cleanupInterval = setInterval(() => {
    const cacheSize = queryClient.getQueryCache().getAll().length;
    
    if (cacheSize > 250) {
      // Remove only truly stale unobserved queries
      queryClient.removeQueries({
        stale: true,
        type: 'inactive',
      });
    }
  }, 10 * 60 * 1000); // Every 10 minutes
  
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
