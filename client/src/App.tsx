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
import { useHashLocation } from "@/hooks/use-hash-location";
import { Router as WouterRouter } from "wouter";

function Router() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <PageLoadingSpinner />;
  }

  return (
    <WouterRouter hook={useHashLocation}>
      {!isAuthenticated ? (
        <Switch>
          <Route path="/" component={Landing} />
          <Route path="/auth" component={AuthPage} />
          <Route component={NotFound} />
        </Switch>
      ) : (
        <MainLayout>
          <Suspense fallback={<PageLoadingSpinner />}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/favorites" component={Favorites} />
              <Route path="/guide/:id" component={RepairGuide} />
              <Route path="/troubleshooting/:type?" component={Troubleshooting} />
              <Route path="/software-tools" component={SoftwareTools} />
              <Route path="/device-finder" component={DeviceFinder} />
              <Route path="/create-guide" component={CreateGuide} />
              <Route path="/offline-settings" component={OfflineSettings} />
              <Route path="/downloads" component={Downloads} />
              <Route path="/admin" component={AdminDashboard} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </MainLayout>
      )}
    </WouterRouter>
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
