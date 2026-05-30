
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, FileSearch, Zap, Star } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen dark relative overflow-hidden">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="fixed top-1/4 -left-40 w-[32rem] h-[32rem] rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ background: 'hsl(var(--primary) / 0.2)' }} />
      <div className="fixed top-2/3 -right-40 w-[32rem] h-[32rem] rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ background: 'hsl(var(--accent) / 0.2)' }} />
      <div className="fixed bottom-0 left-1/3 w-[22rem] h-[22rem] rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ background: 'hsl(var(--cyan) / 0.15)' }} />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.05] border border-white/[0.08] text-muted-foreground mb-8 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            AI-powered resume optimization
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6 max-w-4xl">
            Land your dream job with{' '}
            <span className="gradient-text">CVInfinityBoost</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mb-10 text-muted-foreground leading-relaxed">
            The AI-first resume platform built for modern job seekers. Get instant feedback, ATS optimization, and job-match insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-20">
            <Link to="/login">
              <Button size="lg">
                Get Started <ChevronRight className="ml-1" />
              </Button>
            </Link>
            <Link to="/resume-analyzer">
              <Button size="lg" variant="outline">
                Try Demo <FileSearch className="ml-1" />
              </Button>
            </Link>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
            {[
              { icon: FileSearch, title: 'Resume Analysis', desc: "Get detailed insights about your resume's strengths and weaknesses.", color: 'var(--primary)' },
              { icon: Zap, title: 'ATS Optimization', desc: 'Ensure your resume passes through Applicant Tracking Systems.', color: 'var(--accent)' },
              { icon: Star, title: 'Job Matching', desc: 'Match your skills and experience with job descriptions.', color: 'var(--cyan)' },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <div
                key={title}
                className="group glass glass-hover rounded-2xl p-6 text-left"
                style={{ animation: `float ${8 + i}s ease-in-out infinite` }}
              >
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ background: `hsl(${color} / 0.12)`, boxShadow: `0 0 24px -8px hsl(${color} / 0.5)` }}
                >
                  <Icon className="h-5 w-5" style={{ color: `hsl(${color})` }} />
                </div>
                <h3 className="text-lg font-semibold font-display mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-20">
            © {new Date().getFullYear()} CVInfinityBoost. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
