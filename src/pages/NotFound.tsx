import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-6">
        <p className="text-sm font-semibold text-primary mb-3">404</p>
        <h1 className="text-3xl font-bold font-display tracking-tight mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-6">The page you’re looking for doesn’t exist or has been moved.</p>
        <Link to="/"><Button>Return home</Button></Link>
      </div>
    </div>
  );
};

export default NotFound;
