import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  isOfflineSupported, 
  isOnline, 
  loadOfflineData, 
  loadAllOfflineDataAsync,
  saveOfflineData, 
  syncAllOfflineData,
  clearAllOfflineCache,
  getStorageUsage,
  type OfflineData 
} from '@/lib/offline-storage';
import type { RepairGuide, TroubleshootingFlow, DeviceComponent } from '@shared/schema';
import { TECHNICAL_MANUALS, type TechnicalManual } from '../../shared/technical-manuals';

export function useOfflineMode() {
  const [isOfflineModeEnabled, setIsOfflineModeEnabled] = useState(true);
  const [isCurrentlyOnline, setIsCurrentlyOnline] = useState(isOnline());
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState<number>(0);
  const [syncStatusText, setSyncStatusText] = useState<string>('');
  const [storageUsageState, setStorageUsageState] = useState(getStorageUsage());
  const queryClient = useQueryClient();

  const refreshStorageInfo = useCallback(() => {
    setStorageUsageState(getStorageUsage());
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsCurrentlyOnline(true);
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
  }, []);

  // Load offline data on mount
  useEffect(() => {
    if (isOfflineSupported()) {
      const offlineData = loadOfflineData();
      if (offlineData.lastSync) {
        setLastSyncTime(new Date(offlineData.lastSync));
      }
      refreshStorageInfo();
    }
  }, [refreshStorageInfo]);

  // Full library sync (624 guides + 8 manuals)
  const fullSync = useCallback(async (): Promise<{ success: boolean; guidesCount: number; manualsCount: number }> => {
    setIsSyncing(true);
    setSyncProgress(5);
    setSyncStatusText('Initializing offline sync engine...');

    try {
      const result = await syncAllOfflineData((progress, status) => {
        setSyncProgress(progress);
        setSyncStatusText(status);
      });

      if (result.success) {
        setLastSyncTime(new Date());
        refreshStorageInfo();
        queryClient.invalidateQueries({ queryKey: ['/api/repair-guides'] });
        queryClient.invalidateQueries({ queryKey: ['/api/technical-manuals'] });
        queryClient.invalidateQueries({ queryKey: ['/api/troubleshooting-flows'] });
        queryClient.invalidateQueries({ queryKey: ['/api/device-components'] });
        queryClient.invalidateQueries({ queryKey: ['offline-guides'] });
        queryClient.invalidateQueries({ queryKey: ['offline-manuals'] });
      }

      setIsSyncing(false);
      return result;
    } catch (error: any) {
      setIsSyncing(false);
      setSyncStatusText(`Error: ${error?.message || 'Sync failed'}`);
      return { success: false, guidesCount: 0, manualsCount: 0 };
    }
  }, [queryClient, refreshStorageInfo]);

  // Clear offline cache
  const clearCache = useCallback(async (): Promise<void> => {
    await clearAllOfflineCache();
    setLastSyncTime(null);
    refreshStorageInfo();
    queryClient.invalidateQueries({ queryKey: ['offline-guides'] });
    queryClient.invalidateQueries({ queryKey: ['offline-manuals'] });
  }, [queryClient, refreshStorageInfo]);

  // Enable offline mode
  const enableOfflineMode = async (): Promise<boolean> => {
    setIsOfflineModeEnabled(true);
    if (isCurrentlyOnline) {
      const res = await fullSync();
      return res.success;
    }
    return true;
  };

  // Disable offline mode
  const disableOfflineMode = () => {
    setIsOfflineModeEnabled(false);
  };

  // Get offline data synchronously
  const getOfflineData = (): OfflineData => {
    return loadOfflineData();
  };

  // Get storage usage information
  const storageInfo = {
    used: storageUsageState.used,
    available: Math.max(0, storageUsageState.total - storageUsageState.used),
    percentage: storageUsageState.percentage,
    breakdown: storageUsageState.breakdown,
  };

  // Query for offline guides
  const { data: offlineGuides = [] } = useQuery<RepairGuide[]>({
    queryKey: ['offline-guides'],
    queryFn: async () => {
      const data = await loadAllOfflineDataAsync();
      return data.guides;
    },
    staleTime: 60000,
  });

  // Query for offline manuals
  const { data: offlineManuals = TECHNICAL_MANUALS } = useQuery<TechnicalManual[]>({
    queryKey: ['offline-manuals'],
    queryFn: async () => {
      const data = await loadAllOfflineDataAsync();
      return data.manuals && data.manuals.length > 0 ? data.manuals : TECHNICAL_MANUALS;
    },
    staleTime: 60000,
  });

  const { data: offlineFlows = [] } = useQuery<TroubleshootingFlow[]>({
    queryKey: ['offline-flows'],
    queryFn: async () => {
      const data = await loadAllOfflineDataAsync();
      return data.flows;
    },
    staleTime: 60000,
  });

  const { data: offlineComponents = [] } = useQuery<DeviceComponent[]>({
    queryKey: ['offline-components'],
    queryFn: async () => {
      const data = await loadAllOfflineDataAsync();
      return data.components;
    },
    staleTime: 60000,
  });

  return {
    // Status
    isOfflineSupported: isOfflineSupported(),
    isOfflineModeEnabled,
    isCurrentlyOnline,
    lastSyncTime,
    storageInfo,
    isSyncing,
    syncProgress,
    syncStatusText,

    // Actions
    enableOfflineMode,
    disableOfflineMode,
    forceSync: fullSync,
    fullSync,
    clearCache,
    refreshStorageInfo,
    getOfflineData,

    // Offline data
    offlineGuides,
    offlineManuals,
    offlineFlows,
    offlineComponents,
  };
}