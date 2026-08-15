import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  return (
    <div 
      className={cn(
        "animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent",
        sizeClasses[size],
        className
      )}
    />
  );
}

export function PageLoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 amoled:bg-black flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300 amoled:text-gray-300">Loading...</p>
      </div>
    </div>
  );
}