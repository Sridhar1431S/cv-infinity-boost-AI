
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
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex items-center gap-x-3">
          <Link to="/dashboard" className="flex items-center gap-x-2">
            <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center">
              <span className="text-white font-bold">CV</span>
            </div>
            <p className="text-xl font-semibold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
              CVInfinityBoost
            </p>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
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
        <div className="hidden lg:flex lg:gap-x-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md",
                location.pathname === item.to
                  ? "text-brand-purple bg-accent"
                  : "text-muted-foreground hover:text-brand-purple hover:bg-accent/50"
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
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full bg-white px-6 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/dashboard" className="flex items-center gap-x-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center">
                  <span className="text-white font-bold">CV</span>
                </div>
                <span className="text-xl font-semibold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
                  CVInfinityBoost
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
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
                      "flex items-center gap-2 -mx-3 rounded-lg px-3 py-2 text-base font-semibold",
                      location.pathname === item.to
                        ? "text-brand-purple bg-accent"
                        : "text-gray-900 hover:bg-gray-50"
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
