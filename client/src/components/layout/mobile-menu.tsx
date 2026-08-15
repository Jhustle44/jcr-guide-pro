import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@shared/schema";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth() as { user: User | undefined; isAuthenticated: boolean };

  const handleNavigation = (path: string) => {
    setLocation(path);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <i className="material-icons">menu</i>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <i className="material-icons text-primary-700 text-xl">build</i>
            <span>JCR Guide Pro</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Main Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Navigation
            </h3>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleNavigation("/")}
              >
                <i className="material-icons mr-3 text-lg">home</i>
                Repair Guides
              </Button>
              
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation("/favorites")}
                >
                  <i className="material-icons mr-3 text-lg">favorite</i>
                  Favorites
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Tools & Content */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Tools & Content
            </h3>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleNavigation("/troubleshooting")}
              >
                <i className="material-icons mr-3 text-lg">help_outline</i>
                Troubleshooting
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleNavigation("/device-finder")}
              >
                <i className="material-icons mr-3 text-lg">search</i>
                Device Finder
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleNavigation("/software-tools")}
              >
                <i className="material-icons mr-3 text-lg">build_circle</i>
                Software Tools
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleNavigation("/create-guide")}
              >
                <i className="material-icons mr-3 text-lg">add_circle</i>
                Create Guide
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleNavigation("/downloads")}
              >
                <i className="material-icons mr-3 text-lg">download</i>
                Downloads
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleNavigation("/offline-settings")}
              >
                <i className="material-icons mr-3 text-lg">cloud_off</i>
                Offline Mode
              </Button>
            </div>
          </div>

          {/* Authentication */}
          {!isAuthenticated ? (
            <>
              <Separator />
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    window.location.href = "/api/login";
                  }}
                  className="w-full"
                >
                  <i className="material-icons mr-2 text-lg">login</i>
                  Sign In
                </Button>
              </div>
            </>
          ) : (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  {user?.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <i className="material-icons text-primary-700 dark:text-primary-300 text-lg">person</i>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user?.firstName ? `${user.firstName} ${user?.lastName || ''}`.trim() : user?.email}
                    </p>
                    {user?.email && user?.firstName && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.location.href = "/api/logout";
                  }}
                  className="w-full"
                >
                  <i className="material-icons mr-2 text-lg">logout</i>
                  Sign Out
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}