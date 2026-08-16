import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

// Optimized query hook with intelligent caching and background updates
export function useOptimizedQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: Partial<UseQueryOptions<T>>
) {
  // Memoize the query function to prevent unnecessary re-renders
  const memoizedQueryFn = useCallback(queryFn, [queryKey.join('/')]);

  // Optimized query options for better performance
  const optimizedOptions = useMemo(() => ({
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes  
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: (failureCount: number, error: any) => {
      // Don't retry on 4xx errors except 408 (timeout)
      if (error?.status >= 400 && error?.status < 500 && error?.status !== 408) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  }), [options]);

  return useQuery({
    queryKey,
    queryFn: memoizedQueryFn,
    ...optimizedOptions,
  });
}

// Hook for data that updates frequently
export function useLiveQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: Partial<UseQueryOptions<T>>
) {
  return useOptimizedQuery(queryKey, queryFn, {
    staleTime: 30 * 1000, // 30 seconds for live data
    refetchInterval: 60 * 1000, // Auto-refetch every minute
    ...options,
  });
}

// Hook for static/rarely changing data
export function useStaticQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: Partial<UseQueryOptions<T>>
) {
  return useOptimizedQuery(queryKey, queryFn, {
    staleTime: 60 * 60 * 1000, // 1 hour for static data
    gcTime: 24 * 60 * 60 * 1000, // 24 hours cache
    ...options,
  });
}