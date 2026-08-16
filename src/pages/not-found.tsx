import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <Card className="w-full max-w-md mx-4 border-border/50 shadow-glass rounded-[2rem] bg-card/60 backdrop-blur-xl">
        <CardContent className="pt-8 pb-8 text-center space-y-5">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center">
            <AlertCircle className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">404 - Page Not Found</h1>
            <p className="text-sm text-muted-foreground">
              The page or resource you requested could not be found.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Button
              onClick={() => setLocation("/")}
              className="rounded-full gap-2 font-medium"
            >
              <Home className="h-4 w-4" />
              Explore Guides
            </Button>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="rounded-full gap-2 border-border/60"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
