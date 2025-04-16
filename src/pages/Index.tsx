
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, FileSearch, Zap, Star } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen dark bg-gradient-neon relative overflow-hidden">
      {/* Neon light effects */}
      <div className="fixed top-1/4 -left-36 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="fixed top-3/4 -right-36 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-1/3 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-6 animate-float">
            <div className="h-24 w-24 rounded-full gradient-bg flex items-center justify-center mb-4 mx-auto animate-glow">
              <span className="text-white text-4xl font-bold">CV</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 neon-text-purple">
              CVInfinityBoost
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl max-w-2xl mb-8 text-foreground/90">
            Boost your career opportunities with our AI-powered resume optimization platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link to="/login">
              <Button size="lg" className="bg-brand-purple hover:bg-brand-purpleLight neon-glow animate-on-tap text-lg">
                Get Started <ChevronRight className="ml-1" />
              </Button>
            </Link>
            <Link to="/resume-analyzer">
              <Button size="lg" variant="outline" className="border-purple-500 neon-border animate-on-tap text-lg">
                Try Demo <FileSearch className="ml-1" />
              </Button>
            </Link>
          </div>
          
          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm border border-purple-500/30 p-6 rounded-xl neon-border animate-float-slow">
              <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 mx-auto">
                <FileSearch className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 neon-text-purple">Resume Analysis</h3>
              <p className="text-muted-foreground">Get detailed insights about your resume's strengths and weaknesses</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm border border-blue-500/30 p-6 rounded-xl neon-border-blue animate-float">
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 mx-auto">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 neon-text-blue">ATS Optimization</h3>
              <p className="text-muted-foreground">Ensure your resume passes through Applicant Tracking Systems</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm border border-pink-500/30 p-6 rounded-xl neon-border-pink animate-float-slow">
              <div className="h-12 w-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-4 mx-auto">
                <Star className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 neon-text-pink">Job Matching</h3>
              <p className="text-muted-foreground">Match your skills and experience with job descriptions</p>
            </div>
          </div>
          
          <div className="mt-16">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} CVInfinityBoost. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
