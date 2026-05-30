
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu,
  X,
  LayoutDashboard, 
  FileSearch, 
  Briefcase, 
  CheckSquare, 
  History, 
  User
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  to: string;
  icon: React.ReactNode;
}

export default function AppNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { name: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Resume Analyzer', to: '/resume-analyzer', icon: <FileSearch className="h-5 w-5" /> },
    { name: 'Job Match', to: '/job-match', icon: <Briefcase className="h-5 w-5" /> },
    { name: 'ATS Check', to: '/ats-check', icon: <CheckSquare className="h-5 w-5" /> },
    { name: 'History', to: '/history', icon: <History className="h-5 w-5" /> },
    { name: 'Account', to: '/account', icon: <User className="h-5 w-5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 px-3 pt-3">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/[0.08] bg-background/60 backdrop-blur-xl px-4 py-2.5 lg:px-6 shadow-[0_8px_30px_-10px_hsl(225_60%_2%/0.6)]"
        aria-label="Global"
      >
        <div className="flex items-center gap-x-3">
          <Link to="/dashboard" className="flex items-center gap-x-2">
            <div className="h-9 w-9 rounded-xl gradient-bg flex items-center justify-center shadow-[0_0_20px_-4px_hsl(var(--primary)/0.6)]">
              <span className="text-white font-bold">CV</span>
            </div>
            <p className="text-lg font-semibold font-display gradient-text">
              CVInfinityBoost
            </p>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-foreground/80 hover:text-foreground hover:bg-white/[0.06] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={cn(
                "relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                location.pathname === item.to
                  ? "text-foreground bg-white/[0.07] shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.25),0_0_20px_-8px_hsl(var(--primary)/0.5)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full bg-background/95 backdrop-blur-xl border-l border-white/[0.08] px-6 py-4 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <Link to="/dashboard" className="flex items-center gap-x-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="h-9 w-9 rounded-xl gradient-bg flex items-center justify-center">
                  <span className="text-white font-bold">CV</span>
                </div>
                <span className="text-lg font-semibold font-display gradient-text">
                  CVInfinityBoost
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-lg p-2.5 text-foreground/80 hover:text-foreground hover:bg-white/[0.06]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="space-y-2 py-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={cn(
                      "flex items-center gap-2 -mx-3 rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                      location.pathname === item.to
                        ? "text-foreground bg-white/[0.07] shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.25)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
