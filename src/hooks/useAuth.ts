import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { apiurl } from "@/lib/config";
import { useToast } from "@/hooks/use-toast";
import type { User, InsertUser } from "@shared/schema";

export function useAuth() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery<User | null>({
    queryKey: ["/api/user"],
    queryFn: async () => {
      try {
        const url = apiurl("/api/user");
        const res = await fetch(url, {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });
        if (res.status === 401 || !res.ok) {
          return null;
        }
        return await res.json();
      } catch (err) {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: any) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return res.json();
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({ title: "Welcome back!", description: `Signed in as ${user.firstName || "Technician"}` });
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const quickLoginMutation = useMutation({
    mutationFn: async (payload?: { email?: string }) => {
      const res = await apiRequest("POST", "/api/quick-login", payload || {});
      return res.json();
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({ title: "Connected!", description: `Signed in as ${user.firstName || "Technician"} (${user.email})` });
    },
    onError: (error: Error) => {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: InsertUser) => {
      const res = await apiRequest("POST", "/api/register", userData);
      return res.json();
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({ title: "Account created", description: "You are now logged in." });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      toast({ title: "Signed out", description: "Session closed successfully." });
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    loginMutation,
    quickLoginMutation,
    registerMutation,
    logoutMutation,
    refetchUser: refetch,
  };
}
