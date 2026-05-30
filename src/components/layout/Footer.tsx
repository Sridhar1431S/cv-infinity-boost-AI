
import { Github, Heart, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Footer() {
  const isMobile = useIsMobile();
  
  return (
    <footer className="relative z-10 mt-16 border-t border-white/[0.06] bg-background/40 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center">
                <span className="text-white text-xs font-bold">CV</span>
              </div>
              <h3 className="text-lg font-semibold font-display gradient-text">CVInfinityBoost</h3>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left max-w-xs">
              Elevate your job search with AI-powered resume tools.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-semibold mb-3 text-foreground">Quick Links</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-center md:text-left">
              <a href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dashboard</a>
              <a href="/resume-analyzer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Analyzer</a>
              <a href="/job-match" className="text-sm text-muted-foreground hover:text-primary transition-colors">Job Match</a>
              <a href="/ats-check" className="text-sm text-muted-foreground hover:text-primary transition-colors">ATS Check</a>
              <a href="/history" className="text-sm text-muted-foreground hover:text-primary transition-colors">History</a>
              <a href="/account" className="text-sm text-muted-foreground hover:text-primary transition-colors">Account</a>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-sm font-semibold mb-3 text-foreground">Connect With Us</h3>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9">
                <Github className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t border-white/[0.06] gap-4">
          <p className="text-xs text-muted-foreground order-2 sm:order-1">
            © 2025 CVInfinityBoost. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground order-1 sm:order-2">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
              <span>Made with</span> <Heart className="h-3 w-3 text-red-500 fill-red-500" /> <span>by CVInfinityBoost</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
