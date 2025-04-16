
import { Github, Heart, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Footer() {
  const isMobile = useIsMobile();
  
  return (
    <footer className="relative z-10 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-purple-500 mb-2">Resume Optimizer</h3>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Elevate your job search with AI-powered resume tools.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium mb-2">Quick Links</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-center md:text-left">
              <a href="/dashboard" className="text-sm text-muted-foreground hover:text-white">Dashboard</a>
              <a href="/resume-analyzer" className="text-sm text-muted-foreground hover:text-white">Analyzer</a>
              <a href="/job-match" className="text-sm text-muted-foreground hover:text-white">Job Match</a>
              <a href="/ats-check" className="text-sm text-muted-foreground hover:text-white">ATS Check</a>
              <a href="/history" className="text-sm text-muted-foreground hover:text-white">History</a>
              <a href="/account" className="text-sm text-muted-foreground hover:text-white">Account</a>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-sm font-medium mb-2">Connect With Us</h3>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="rounded-full h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-8 w-8">
                <Github className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-6 border-t border-white/10 gap-4">
          <p className="text-xs text-muted-foreground order-2 sm:order-1">
            © 2025 Resume Optimizer. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground order-1 sm:order-2">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white flex items-center gap-1">
              <span>Made with</span> <Heart className="h-3 w-3 text-red-500 fill-red-500" /> <span>by Resume Optimizer</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
