import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export function useAdmin() {
  const { user, isAuthenticated } = useAuth();
  
  const { data: adminData, isLoading } = useQuery({
    queryKey: ["/api/admin/users"],
    enabled: isAuthenticated && user?.role === "admin",
    retry: false,
  });

  return {
    isAdmin: user?.role === "admin",
    adminData,
    isLoading,
  };
}

export function useAdminStats() {
  const { isAdmin } = useAdmin();
  
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
    enabled: isAdmin,
    retry: false,
  });

  return {
    stats,
    isLoading,
  };
}