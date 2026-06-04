import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, FileSearch, Briefcase, CheckSquare, History, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem { name: string; to: string; icon: React.ReactNode; }

export default function AppNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems: NavItem[] = [
    { name: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { name: 'Analyzer', to: '/resume-analyzer', icon: <FileSearch className="h-4 w-4" /> },
    { name: 'Job Match', to: '/job-match', icon: <Briefcase className="h-4 w-4" /> },
    { name: 'ATS Check', to: '/ats-check', icon: <CheckSquare className="h-4 w-4" /> },
    { name: 'History', to: '/history', icon: <History className="h-4 w-4" /> },
    { name: 'Account', to: '/account', icon: <User className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6" aria-label="Global">
        <Link to="/dashboard" className="flex items-center gap-x-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">CV</span>
          </div>
          <p className="text-base font-semibold tracking-tight text-foreground">
            CVInfinityBoost
          </p>
        </Link>

        {/* Mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              data-active={location.pathname === item.to}
              className={cn(
                "nav-link flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                location.pathname === item.to
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="space-y-1 px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === item.to
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
