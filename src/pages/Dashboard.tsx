
import { useState } from 'react';
import AppNav from '@/components/layout/AppNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ResumeUploader from '@/components/dashboard/ResumeUploader';
import ResumeScorecard, { ResumeScore } from '@/components/dashboard/ResumeScorecard';
import KeywordSuggestions from '@/components/dashboard/KeywordSuggestions';
import JobDescriptionImport from '@/components/dashboard/JobDescriptionImport';
import VersionHistory from '@/components/dashboard/VersionHistory';
import PremiumFeatures from '@/components/dashboard/PremiumFeatures';
import { RefreshCw, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function Dashboard() {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [file, setFile] = useState<File | null>(null);
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
  
  const handleResumeUpload = (file: File) => {
    setFile(file);
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
    
    // Simulate API call delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed. See results below.",
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
    
    // Simulate API call delay
    setTimeout(() => {
      setIsAnalyzing(false);
      // Update the score slightly for demo purposes
      setResumeScore(prev => ({
        ...prev,
        overall: 68,
        keywords: 5,
        atsCompatibility: 6
      }));
      toast({
        title: "Job Match Complete",
        description: "Your resume doesn't match well with this job. See suggestions.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 relative overflow-hidden">
      {/* Neon light effects */}
      <div className="fixed top-1/4 -left-36 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed top-3/4 -right-36 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-1/3 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      
      <AppNav />
      
      <main className="container mx-auto px-4 py-6 relative z-10">
        {/* Welcome Card */}
        <Card className="mb-6 animate-on-tap">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Welcome, Jessica</h1>
                <p className="text-muted-foreground">
                  Let's optimize your resume and boost your career opportunities
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resume Upload Section */}
        <Card className="mb-6 animate-on-tap">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Analyze Your Resume</CardTitle>
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
    </div>
  );
}
