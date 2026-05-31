
import { useState, useEffect } from 'react';
import AppNav from '@/components/layout/AppNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ResumeUploader from '@/components/dashboard/ResumeUploader';
import ResumeScorecard, { ResumeScore } from '@/components/dashboard/ResumeScorecard';
import KeywordSuggestions from '@/components/dashboard/KeywordSuggestions';
import JobDescriptionImport from '@/components/dashboard/JobDescriptionImport';
import VersionHistory from '@/components/dashboard/VersionHistory';
import PremiumFeatures from '@/components/dashboard/PremiumFeatures';
import { RefreshCw, FileText, History } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Footer from '@/components/layout/Footer';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [userName, setUserName] = useState('');
  const [resumeScore, setResumeScore] = useState<ResumeScore>({
    overall: 75,
    keywords: 7,
    readability: 8,
    atsCompatibility: 6,
    format: 9,
    sections: {
      contact: true,
      summary: true,
      experience: true,
      education: true,
      skills: false,
    }
  });
  
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail') || '';
    
    if (userEmail) {
      const namePart = userEmail.split('@')[0];
      const formattedName = namePart
        .split(/[._-]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
      setUserName(formattedName);
    } else {
      setUserName('User');
    }
  }, []);
  
  const handleResumeUpload = (file: File | null) => {
    setFile(file);
    
    if (!file) {
      setHasAnalyzed(false);
      return;
    }
  };
  
  const handleAnalyze = () => {
    if (!file) {
      toast({
        title: "No file selected", 
        description: "Please upload a resume file first.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    const generateRandomScore = () => {
      let seedValue = file.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const rng = () => {
        seedValue = (seedValue * 9301 + 49297) % 233280;
        return seedValue / 233280;
      };
      
      const overall = Math.floor(50 + rng() * 50);
      const keywords = Math.floor(4 + rng() * 7);
      const readability = Math.floor(5 + rng() * 6);
      const atsCompatibility = Math.floor(3 + rng() * 8);
      const format = Math.floor(6 + rng() * 5);
      
      return {
        overall,
        keywords,
        readability,
        atsCompatibility,
        format,
        sections: {
          contact: rng() > 0.1,
          summary: rng() > 0.3,
          experience: rng() > 0.2,
          education: rng() > 0.2,
          skills: rng() > 0.4,
        }
      };
    };
    
    setTimeout(() => {
      const newScore = generateRandomScore();
      setResumeScore(newScore);
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      toast({
        title: "Analysis Complete",
        description: `Your resume scored ${newScore.overall}/100. See results below.`,
      });
    }, 1500);
  };
  
  const handleJobDescriptionAnalyze = (text: string) => {
    if (!file) {
      toast({
        title: "No resume uploaded", 
        description: "Please upload your resume before analyzing job match.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    let seedVal = (file.name + text).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rng = () => {
      const x = Math.sin(seedVal++) * 10000;
      return x - Math.floor(x);
    };
    
    const jobMatchScore = Math.floor(40 + rng() * 60);
    const keywordMatchScore = Math.floor(3 + rng() * 8);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setResumeScore(prev => ({
        ...prev,
        overall: jobMatchScore,
        keywords: keywordMatchScore,
        atsCompatibility: Math.floor(3 + rng() * 8)
      }));
      
      toast({
        title: "Job Match Complete",
        description: jobMatchScore >= 70 
          ? "Your resume matches well with this job."
          : "Your resume doesn't match well with this job. See suggestions.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen dark relative overflow-hidden flex flex-col">
      {/* Ambient background */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="fixed top-1/4 -left-40 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ background: 'hsl(var(--primary) / 0.18)' }} />
      <div className="fixed top-2/3 -right-40 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ background: 'hsl(var(--accent) / 0.16)' }} />
      <div className="fixed bottom-0 left-1/3 w-[22rem] h-[22rem] rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ background: 'hsl(var(--cyan) / 0.12)' }} />

      <AppNav />

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 relative z-10 max-w-6xl flex-1">
        {/* Welcome Card */}
        <Card className="mb-8 overflow-hidden animate-fade-up">
          <CardContent className="p-6 sm:p-8 relative">
            <div className="absolute inset-0 gradient-bg-soft pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.06] border border-white/[0.08] text-muted-foreground mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  AI assistant ready
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold font-display tracking-tight mb-2">
                  Welcome back, <span className="gradient-text">{userName}</span>
                </h1>
                <p className="text-muted-foreground text-base">
                  Let's optimize your resume and boost your career opportunities.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate('/history')}
                >
                  <History className="h-4 w-4 mr-2" />
                  View History
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload/Analysis Card */}
        <Card className="mb-8 animate-fade-up" style={{ animationDelay: '120ms' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-display">Analyze Your Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResumeUploader onUpload={handleResumeUpload} />
            
            <div className="flex justify-end mt-6">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !file}
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Analyze Resume
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Main content section - stacked layout */}
        <div className="space-y-8 stagger">
          {/* Resume Scorecard */}
          <Card className="w-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-display">Resume Score Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResumeScorecard score={resumeScore} isLoading={isAnalyzing && !hasAnalyzed} />
            </CardContent>
          </Card>
          
          {/* Keywords Suggestions */}
          <Card className="w-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-display">Keyword Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <KeywordSuggestions isLoading={isAnalyzing && !hasAnalyzed} />
            </CardContent>
          </Card>
          
          {/* Job Description Import */}
          <Card className="w-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-display">Job Description Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <JobDescriptionImport onAnalyze={handleJobDescriptionAnalyze} />
            </CardContent>
          </Card>
          
          {/* Version History */}
          <Card className="w-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-display">Version History</CardTitle>
            </CardHeader>
            <CardContent>
              <VersionHistory isLoading={isAnalyzing && !hasAnalyzed} />
            </CardContent>
          </Card>
          
          {/* Premium Features */}
          <Card className="w-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-display">Premium Features</CardTitle>
            </CardHeader>
            <CardContent>
              <PremiumFeatures />
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
