
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
    // Get the user's email from localStorage
    const userEmail = localStorage.getItem('userEmail') || '';
    
    // Parse name from email if available
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
    
    // Generate random scores based on file name to simulate different analyses
    const generateRandomScore = () => {
      // Use file name as a seed for pseudo-randomness
      let seedValue = file.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const rng = () => {
        seedValue = (seedValue * 9301 + 49297) % 233280;
        return seedValue / 233280;
      };
      
      // Generate more varied scores
      const overall = Math.floor(50 + rng() * 50); // 50-100 range
      const keywords = Math.floor(4 + rng() * 7); // 4-10 range
      const readability = Math.floor(5 + rng() * 6); // 5-10 range
      const atsCompatibility = Math.floor(3 + rng() * 8); // 3-10 range
      const format = Math.floor(6 + rng() * 5); // 6-10 range
      
      // Random sections presence
      return {
        overall,
        keywords,
        readability,
        atsCompatibility,
        format,
        sections: {
          contact: rng() > 0.1, // 90% chance true
          summary: rng() > 0.3, // 70% chance true
          experience: rng() > 0.2, // 80% chance true
          education: rng() > 0.2, // 80% chance true
          skills: rng() > 0.4, // 60% chance true
        }
      };
    };
    
    // Simulate API call delay
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
    
    // Generate random score based on file name and job description
    let seedVal = (file.name + text).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rng = () => {
      const x = Math.sin(seedVal++) * 10000;
      return x - Math.floor(x);
    };
    
    const jobMatchScore = Math.floor(40 + rng() * 60); // 40-100 range
    const keywordMatchScore = Math.floor(3 + rng() * 8); // 3-10 range
    
    // Simulate API call delay
    setTimeout(() => {
      setIsAnalyzing(false);
      // Update the score based on job description and file
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
    <div className="min-h-screen dark bg-gradient-neon relative overflow-hidden">
      {/* Neon light effects */}
      <div className="fixed top-1/4 -left-36 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed top-3/4 -right-36 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-1/3 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      
      <AppNav />
      
      <main className="container mx-auto px-4 py-6 relative z-10">
        {/* Welcome Card */}
        <Card className="mb-6 animate-on-tap backdrop-blur-sm bg-card/50 neon-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-2 text-purple-500">Welcome, {userName}</h1>
                <p className="text-muted-foreground">
                  Let's optimize your resume and boost your career opportunities
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/history')}
                  className="animate-on-tap"
                >
                  <History className="h-4 w-4 mr-2" />
                  View History
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resume Upload Section */}
        <Card className="mb-6 animate-on-tap backdrop-blur-sm bg-card/50 neon-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-purple-500">Analyze Your Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResumeUploader onUpload={handleResumeUpload} />
            
            <div className="flex justify-end mt-4">
              <Button 
                onClick={handleAnalyze}
                className="bg-brand-purple hover:bg-brand-purpleDark neon-glow animate-on-tap"
                disabled={isAnalyzing || !file}
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
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Resume Scorecard */}
          <div className="lg:col-span-1">
            <ResumeScorecard score={resumeScore} isLoading={isAnalyzing && !hasAnalyzed} />
          </div>
          
          {/* Keywords Suggestions */}
          <div className="lg:col-span-1">
            <KeywordSuggestions isLoading={isAnalyzing && !hasAnalyzed} />
          </div>
          
          {/* Job Description Import */}
          <div className="lg:col-span-1">
            <JobDescriptionImport onAnalyze={handleJobDescriptionAnalyze} />
          </div>
        </div>
        
        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* History Timeline - Takes 2/3 of space on larger screens */}
          <div className="md:col-span-2">
            <VersionHistory isLoading={isAnalyzing && !hasAnalyzed} />
          </div>
          
          {/* Premium Features */}
          <div className="md:col-span-1">
            <PremiumFeatures />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
