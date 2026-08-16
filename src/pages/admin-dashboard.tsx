import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useAdminStats } from "@/hooks/useAdmin";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { stats, isLoading: statsLoading } = useAdminStats();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== "admin")) {
      toast({
        title: "Access Denied",
        description: "Administrator privileges required to access this page.",
        variant: "destructive",
      });
      setLocation("/");
    }
  }, [user, isAuthenticated, authLoading, toast, setLocation]);

  if (authLoading || statsLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Welcome back, {user.firstName || user.email}
              </p>
            </div>
            <Badge variant="default" className="bg-green-600 text-white">
              <i className="material-icons text-sm mr-1">admin_panel_settings</i>
              Administrator
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Guides</CardTitle>
              <i className="material-icons text-primary-600">library_books</i>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalGuides || 0}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Active repair guides
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <i className="material-icons text-blue-600">visibility</i>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalViews || 0}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Across all guides
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
              <i className="material-icons text-green-600">download</i>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalDownloads || 0}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Guide downloads
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <i className="material-icons text-lg mr-2">account_circle</i>
              Administrator Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Email:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">{user.email}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Role:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">Administrator</span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Name:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">User ID:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400 font-mono text-xs">
                  {user.id}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <i className="material-icons text-lg mr-2">info</i>
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">App Version:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">1.0.0</span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Build Date:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">2025.08.18</span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Database:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">PostgreSQL (Connected)</span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Authentication:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">Firebase Auth</span>
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}