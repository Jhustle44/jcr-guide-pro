import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Favorite } from "@shared/schema";

export default function Favorites() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, authLoading, toast]);

  const { data: favorites = [], isLoading } = useQuery<Favorite[]>({
    queryKey: ["/api/favorites"],
    enabled: isAuthenticated,
    retry: (failureCount, error) => {
      if (isUnauthorizedError(error as Error)) {
        return false;
      }
      return failureCount < 3;
    },
  });

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 amoled:bg-black flex items-center justify-center">
        <div className="text-center">
          <i className="material-icons text-4xl text-primary-700 mb-4 animate-spin">refresh</i>
          <p className="text-gray-600 dark:text-gray-300 amoled:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  const getFavoriteIcon = (itemType: string) => {
    switch (itemType) {
      case 'guide':
        return 'book';
      case 'video':
        return 'play_circle';
      case 'troubleshooting':
        return 'troubleshoot';
      default:
        return 'star';
    }
  };

  const getFavoriteTypeLabel = (itemType: string) => {
    switch (itemType) {
      case 'guide':
        return 'Repair Guide';
      case 'video':
        return 'Video Tutorial';
      case 'troubleshooting':
        return 'Troubleshooting Flow';
      default:
        return 'Favorite';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 amoled:bg-black">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white amoled:text-white mb-2">
            <i className="material-icons text-4xl align-bottom mr-2">favorite</i>
            My Favorites
          </h1>
          <p className="text-gray-600 dark:text-gray-300 amoled:text-gray-300">
            Your saved repair guides, videos, and troubleshooting flows
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <i className="material-icons text-4xl text-primary-700 mb-4 animate-spin">refresh</i>
            <p className="text-gray-600 dark:text-gray-300 amoled:text-gray-300">Loading your favorites...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12">
            <i className="material-icons text-6xl text-gray-400 mb-4">favorite_border</i>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white amoled:text-white mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 amoled:text-gray-300 mb-6">
              Start exploring repair guides and save your favorites for quick access
            </p>
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-primary-700 hover:bg-primary-800 text-white"
            >
              <i className="material-icons mr-2">explore</i>
              Browse Guides
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((favorite) => (
              <div
                key={`${favorite.itemType}-${favorite.itemId}`}
                className="bg-white dark:bg-gray-800 amoled:bg-black rounded-xl shadow-material hover:shadow-material-lg transition-shadow"
              >
                {favorite.itemImageUrl && (
                  <img
                    src={favorite.itemImageUrl}
                    alt={favorite.itemTitle}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                      <i className="material-icons text-sm mr-1">{getFavoriteIcon(favorite.itemType)}</i>
                      {getFavoriteTypeLabel(favorite.itemType)}
                    </span>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <i className="material-icons text-lg">favorite</i>
                    </Button>
                  </div>

                  <h3 className="font-medium text-gray-900 dark:text-white amoled:text-white mb-2">
                    {favorite.itemTitle}
                  </h3>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 amoled:text-gray-400 mb-4">
                    Added {new Date(favorite.createdAt!).toLocaleDateString()}
                  </p>

                  <Button
                    className="w-full bg-primary-700 hover:bg-primary-800 text-white"
                    onClick={() => {
                      // Navigate to the item based on type
                      if (favorite.itemType === 'guide') {
                        window.location.href = `/guide/${favorite.itemId}`;
                      } else if (favorite.itemType === 'troubleshooting') {
                        window.location.href = `/troubleshooting/${favorite.itemId}`;
                      }
                    }}
                  >
                    <i className="material-icons mr-2">open_in_new</i>
                    Open
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}