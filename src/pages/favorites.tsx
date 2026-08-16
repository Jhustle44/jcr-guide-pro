import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Heart, Compass, BookOpen, ExternalLink, RefreshCw } from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Favorite } from "@shared/schema";

export default function Favorites() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

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

  if (authLoading) {
    return (
      <div className="py-16 flex items-center justify-center">
        <div className="text-center space-y-3">
          <RefreshCw className="h-8 w-8 text-primary animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-4">
        <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto">
          <Heart className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold">Sign in to view favorites</h2>
        <p className="text-muted-foreground text-sm">
          Bookmark guides and troubleshooting paths to access them quickly anytime.
        </p>
        <Button onClick={() => setLocation("/auth")} className="rounded-full">
          Sign In / Register
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
          <Heart className="h-8 w-8 text-destructive fill-destructive" />
          My Saved Favorites
        </h1>
        <p className="text-muted-foreground">
          Your saved repair guides and interactive troubleshooting workflows
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <RefreshCw className="h-8 w-8 text-primary animate-spin mx-auto mb-3" />
          <p className="text-muted-foreground">Loading your favorites...</p>
        </div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-16 bg-card/40 border border-border/40 rounded-3xl p-8 max-w-xl mx-auto space-y-4">
          <Heart className="h-12 w-12 text-muted-foreground/40 mx-auto" />
          <h3 className="text-xl font-bold">No favorites yet</h3>
          <p className="text-muted-foreground text-sm">
            Start exploring repair guides and click the bookmark icon on any guide to save it for quick access.
          </p>
          <Button
            onClick={() => setLocation("/")}
            className="rounded-full gap-2"
          >
            <Compass className="h-4 w-4" />
            Browse Repair Guides
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((favorite) => (
            <div
              key={`${favorite.itemType}-${favorite.itemId}`}
              className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {favorite.itemImageUrl && (
                <img
                  src={favorite.itemImageUrl}
                  alt={favorite.itemTitle}
                  className="w-full h-44 object-cover"
                />
              )}
              
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase">
                      {favorite.itemType}
                    </span>
                    <Heart className="h-4 w-4 text-destructive fill-destructive" />
                  </div>

                  <h3 className="font-bold text-foreground line-clamp-2">
                    {favorite.itemTitle}
                  </h3>
                  
                  <p className="text-xs text-muted-foreground mt-1">
                    Added {new Date(favorite.createdAt!).toLocaleDateString()}
                  </p>
                </div>

                <Button
                  className="w-full rounded-full gap-2"
                  onClick={() => {
                    if (favorite.itemType === 'guide') {
                      setLocation(`/guide/${favorite.itemId}`);
                    } else if (favorite.itemType === 'troubleshooting') {
                      setLocation(`/troubleshooting/${favorite.itemId}`);
                    }
                  }}
                >
                  <BookOpen className="h-4 w-4" />
                  Open Guide
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
