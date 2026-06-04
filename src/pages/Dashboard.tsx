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
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export default function Dashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  useScrollReveal('.reveal');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [userName, setUserName] = useState('');
  const [resumeScore, setResumeScore] = useState<ResumeScore>({
    overall: 75, keywords: 7, readability: 8, atsCompatibility: 6, format: 9,
    sections: { contact: true, summary: true, experience: true, education: true, skills: false }
  });

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail') || '';
    if (userEmail) {
      const namePart = userEmail.split('@')[0];
      setUserName(namePart.split(/[._-]/).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' '));
    } else {
      setUserName('there');
    }
  }, []);

  const handleResumeUpload = (file: File | null) => {
    setFile(file);
    if (!file) setHasAnalyzed(false);
  };

  const handleAnalyze = () => {
    if (!file) {
      toast({ title: "No file selected", description: "Please upload a resume first.", variant: "destructive" });
      return;
    }
    setIsAnalyzing(true);
    const generateRandomScore = () => {
      let seedValue = file.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const rng = () => { seedValue = (seedValue * 9301 + 49297) % 233280; return seedValue / 233280; };
      return {
        overall: Math.floor(50 + rng() * 50),
        keywords: Math.floor(4 + rng() * 7),
        readability: Math.floor(5 + rng() * 6),
        atsCompatibility: Math.floor(3 + rng() * 8),
        format: Math.floor(6 + rng() * 5),
        sections: { contact: rng() > 0.1, summary: rng() > 0.3, experience: rng() > 0.2, education: rng() > 0.2, skills: rng() > 0.4 }
      };
    };
    setTimeout(() => {
      const newScore = generateRandomScore();
      setResumeScore(newScore);
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      toast({ title: "Analysis Complete", description: `Your resume scored ${newScore.overall}/100.` });
    }, 1500);
  };

  const handleJobDescriptionAnalyze = (text: string) => {
    if (!file) {
      toast({ title: "No resume uploaded", description: "Please upload your resume first.", variant: "destructive" });
      return;
    }
    setIsAnalyzing(true);
    let seedVal = (file.name + text).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rng = () => { const x = Math.sin(seedVal++) * 10000; return x - Math.floor(x); };
    const jobMatchScore = Math.floor(40 + rng() * 60);
    setTimeout(() => {
      setIsAnalyzing(false);
      setResumeScore(prev => ({ ...prev, overall: jobMatchScore, keywords: Math.floor(3 + rng() * 8), atsCompatibility: Math.floor(3 + rng() * 8) }));
      toast({ title: "Job Match Complete", description: jobMatchScore >= 70 ? "Strong match." : "See suggestions below." });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppNav />

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-8 sm:py-10 flex-1">
        {/* Welcome */}
        <div className="mb-8 reveal" style={{ ['--i' as any]: 0 }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Welcome back</p>
              <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">{userName}</h1>
            </div>
            <Button variant="outline" onClick={() => navigate('/history')}>
              <History className="h-4 w-4" /> View history
            </Button>
          </div>
        </div>

        {/* Upload */}
        <Card className="mb-8 reveal" style={{ ['--i' as any]: 1 }}>
          <CardHeader>
            <CardTitle>Analyze your resume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResumeUploader onUpload={handleResumeUpload} />
            <div className="flex justify-end mt-6">
              <Button onClick={handleAnalyze} disabled={isAnalyzing || !file} size="lg">
                {isAnalyzing ? (<><RefreshCw className="h-4 w-4 animate-spin" /> Analyzing…</>) : (<><FileText className="h-4 w-4" /> Analyze resume</>)}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="reveal" style={{ ['--i' as any]: 0 }}>
            <ResumeScorecard score={resumeScore} isLoading={isAnalyzing && !hasAnalyzed} />
          </div>
          <div className="reveal" style={{ ['--i' as any]: 1 }}>
            <KeywordSuggestions isLoading={isAnalyzing && !hasAnalyzed} />
          </div>
          <div className="reveal" style={{ ['--i' as any]: 2 }}>
            <JobDescriptionImport onAnalyze={handleJobDescriptionAnalyze} />
          </div>
          <div className="reveal" style={{ ['--i' as any]: 3 }}>
            <VersionHistory isLoading={isAnalyzing && !hasAnalyzed} />
          </div>
          <div className="reveal" style={{ ['--i' as any]: 4 }}>
            <PremiumFeatures />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
