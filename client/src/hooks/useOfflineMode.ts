import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  isOfflineSupported, 
  isOnline, 
  loadOfflineData, 
  saveOfflineData, 
  syncWhenOnline,
  getStorageUsage,
  type OfflineData 
} from '@/lib/offline-storage';
import type { RepairGuide, TroubleshootingFlow, DeviceComponent } from '@shared/schema';

export function useOfflineMode() {
  const [isOfflineModeEnabled, setIsOfflineModeEnabled] = useState(false);
  const [isCurrentlyOnline, setIsCurrentlyOnline] = useState(isOnline());
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const queryClient = useQueryClient();

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsCurrentlyOnline(true);
      if (isOfflineModeEnabled) {
        syncWhenOnline();
      }
    };

    const handleOffline = () => {
      setIsCurrentlyOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOfflineModeEnabled]);

  // Load offline data on mount
  useEffect(() => {
    if (isOfflineSupported()) {
      const offlineData = loadOfflineData();
      if (offlineData.lastSync) {
        setLastSyncTime(new Date(offlineData.lastSync));
      }
    }
  }, []);

  // Enable offline mode and cache current data
  const enableOfflineMode = async (): Promise<boolean> => {
    if (!isOfflineSupported()) return false;

    try {
      // Get current data from React Query cache or fetch fresh
      const guides = queryClient.getQueryData<RepairGuide[]>(['/api/repair-guides']) || [];
      const flows = queryClient.getQueryData<TroubleshootingFlow[]>(['/api/troubleshooting-flows']) || [];
      const components = queryClient.getQueryData<DeviceComponent[]>(['/api/device-components']) || [];

      // If cache is empty, fetch fresh data
      let freshGuides = guides;
      let freshFlows = flows;
      let freshComponents = components;

      if (isCurrentlyOnline && (guides.length === 0 || flows.length === 0 || components.length === 0)) {
        try {
          const [guidesRes, flowsRes, componentsRes] = await Promise.all([
            fetch('/api/repair-guides').then(res => res.json()),
            fetch('/api/troubleshooting-flows').then(res => res.json()),
            fetch('/api/device-components').then(res => res.json()),
          ]);
          
          freshGuides = guidesRes || guides;
          freshFlows = flowsRes || flows;
          freshComponents = componentsRes || components;
        } catch (error) {
          console.error('Failed to fetch fresh data for offline mode:', error);
        }
      }

      await saveOfflineData({
        guides: freshGuides,
        flows: freshFlows,
        components: freshComponents,
      });

      setIsOfflineModeEnabled(true);
      setLastSyncTime(new Date());
      return true;
    } catch (error) {
      console.error('Failed to enable offline mode:', error);
      return false;
    }
  };

  // Disable offline mode
  const disableOfflineMode = () => {
    setIsOfflineModeEnabled(false);
  };

  // Get offline data
  const getOfflineData = (): OfflineData => {
    return loadOfflineData();
  };

  // Force sync data
  const forcSync = async (): Promise<boolean> => {
    if (!isCurrentlyOnline) return false;

    try {
      await syncWhenOnline();
      setLastSyncTime(new Date());
      
      // Invalidate React Query cache to refresh with new data
      queryClient.invalidateQueries({ queryKey: ['/api/repair-guides'] });
      queryClient.invalidateQueries({ queryKey: ['/api/troubleshooting-flows'] });
      queryClient.invalidateQueries({ queryKey: ['/api/device-components'] });
      
      return true;
    } catch (error) {
      console.error('Sync failed:', error);
      return false;
    }
  };

  // Get storage usage information
  const storageUsage = getStorageUsage();
  const storageInfo = {
    used: storageUsage.used,
    available: storageUsage.total - storageUsage.used,
    percentage: storageUsage.percentage
  };

  // Query for offline guides when offline mode is enabled and online
  const { data: offlineGuides = [] } = useQuery<RepairGuide[]>({
    queryKey: ['offline-guides'],
    queryFn: () => {
      const offlineData = getOfflineData();
      return offlineData.guides;
    },
    enabled: isOfflineModeEnabled && !isCurrentlyOnline,
    staleTime: Infinity,
  });

  const { data: offlineFlows = [] } = useQuery<TroubleshootingFlow[]>({
    queryKey: ['offline-flows'],
    queryFn: () => {
      const offlineData = getOfflineData();
      return offlineData.flows;
    },
    enabled: isOfflineModeEnabled && !isCurrentlyOnline,
    staleTime: Infinity,
  });

  const { data: offlineComponents = [] } = useQuery<DeviceComponent[]>({
    queryKey: ['offline-components'],
    queryFn: () => {
      const offlineData = getOfflineData();
      return offlineData.components;
    },
    enabled: isOfflineModeEnabled && !isCurrentlyOnline,
    staleTime: Infinity,
  });

  return {
    // Status
    isOfflineSupported: isOfflineSupported(),
    isOfflineModeEnabled,
    isCurrentlyOnline,
    lastSyncTime,
    storageInfo,

    // Actions
    enableOfflineMode,
    disableOfflineMode,
    forceSync: forcSync,
    getOfflineData,

    // Offline data
    offlineGuides,
    offlineFlows,
    offlineComponents,
  };
}