
import { useState } from 'react';
import AppNav from '@/components/layout/AppNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ResumeUploader from '@/components/dashboard/ResumeUploader';
import ResumeScorecard, { ResumeScore } from '@/components/dashboard/ResumeScorecard';
import KeywordSuggestions from '@/components/dashboard/KeywordSuggestions';
import JobDescriptionImport from '@/components/dashboard/JobDescriptionImport';
import VersionHistory from '@/components/dashboard/VersionHistory';
import PremiumFeatures from '@/components/dashboard/PremiumFeatures';
import { useToast } from '@/components/ui/use-toast';

export default function Dashboard() {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
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
    <div className="min-h-screen bg-gray-50">
      <AppNav />
      
      <main className="container mx-auto px-4 py-6">
        {/* Welcome Card */}
        <Card className="mb-6">
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
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Analyze Your Resume</h2>
          <ResumeUploader onUpload={handleResumeUpload} />
        </div>
        
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
