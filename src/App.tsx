import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/theme-context";
import { useAuth } from "@/hooks/useAuth";
import { lazy, Suspense } from "react";
import MainLayout from "@/components/layout/main-layout";

// Core pages loaded immediately
import Home from "@/pages/home";
import Landing from "@/pages/landing";
import AuthPage from "@/pages/auth";

// Lazy load secondary pages
const Favorites = lazy(() => import("@/pages/favorites"));
const RepairGuide = lazy(() => import("@/pages/repair-guide"));
const Troubleshooting = lazy(() => import("@/pages/troubleshooting"));
const SoftwareTools = lazy(() => import("@/pages/software-tools"));
const DeviceFinder = lazy(() => import("@/pages/device-finder"));
const CreateGuide = lazy(() => import("@/pages/create-guide"));
const OfflineSettings = lazy(() => import("@/pages/offline-settings"));
const Downloads = lazy(() => import("@/pages/downloads"));
const AdminDashboard = lazy(() => import("@/pages/admin-dashboard"));
const NotFound = lazy(() => import("@/pages/not-found"));

import { PageLoadingSpinner } from "@/components/ui/loading-spinner";

function Router() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <PageLoadingSpinner />;
  }

  return (
    <Suspense fallback={<PageLoadingSpinner />}>
      <Switch>
        {/* Standalone Landing and Auth pages */}
        <Route path="/landing" component={Landing} />
        <Route path="/auth" component={AuthPage} />

        {/* Core application routes rendered inside MainLayout */}
        <Route path="/">
          {() => (
            <MainLayout>
              <Home />
            </MainLayout>
          )}
        </Route>
        <Route path="/favorites">
          {() => (
            <MainLayout>
              <Favorites />
            </MainLayout>
          )}
        </Route>
        <Route path="/guide/:id">
          {() => (
            <MainLayout>
              <RepairGuide />
            </MainLayout>
          )}
        </Route>
        <Route path="/troubleshooting">
          {() => (
            <MainLayout>
              <Troubleshooting />
            </MainLayout>
          )}
        </Route>
        <Route path="/troubleshooting/:type">
          {() => (
            <MainLayout>
              <Troubleshooting />
            </MainLayout>
          )}
        </Route>
        <Route path="/software-tools">
          {() => (
            <MainLayout>
              <SoftwareTools />
            </MainLayout>
          )}
        </Route>
        <Route path="/device-finder">
          {() => (
            <MainLayout>
              <DeviceFinder />
            </MainLayout>
          )}
        </Route>
        <Route path="/create-guide">
          {() => (
            <MainLayout>
              <CreateGuide />
            </MainLayout>
          )}
        </Route>
        <Route path="/offline-settings">
          {() => (
            <MainLayout>
              <OfflineSettings />
            </MainLayout>
          )}
        </Route>
        <Route path="/downloads">
          {() => (
            <MainLayout>
              <Downloads />
            </MainLayout>
          )}
        </Route>
        <Route path="/admin">
          {() => (
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          )}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="jcr-guide-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
