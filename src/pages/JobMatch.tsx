
import { useState } from 'react';
import AppNav from '@/components/layout/AppNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  ThumbsUp, 
  ThumbsDown, 
  ChevronRight,
  Download,
  RefreshCw
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

export default function JobMatch() {
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [matchScore, setMatchScore] = useState(65);
  
  // Mock resume data - in a real app would come from a backend
  const hasResumeUploaded = true;
  
  const handleAnalyze = () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Empty Job Description",
        description: "Please paste a job description before analyzing",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      setMatchScore(65);
      toast({
        title: "Job Match Complete",
        description: "Your resume has been compared to the job description.",
      });
    }, 1500);
  };
  
  const getMatchColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };
  
  const getMatchBg = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-amber-100";
    return "bg-red-100";
  };
  
  const keywordMatches = [
    { keyword: "react", found: true },
    { keyword: "typescript", found: true },
    { keyword: "node.js", found: false },
    { keyword: "aws", found: false },
    { keyword: "api design", found: true },
    { keyword: "agile methodology", found: false },
    { keyword: "responsive design", found: true },
    { keyword: "testing", found: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNav />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Job Match</h1>
        </div>
        
        {/* Job Description Input */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Job Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Textarea
                placeholder="Paste job description here to match against your resume..."
                className="min-h-[200px] resize-none"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              
              <div className="flex items-center gap-2">
                {!hasResumeUploaded && (
                  <div className="text-sm text-red-500 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" />
                    Please upload your resume first
                  </div>
                )}
                
                <Button 
                  className="ml-auto bg-brand-purple hover:bg-brand-purpleDark"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !hasResumeUploaded}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Match My Resume"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Results Section */}
        {hasAnalyzed && !isAnalyzing && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Match Score Card */}
            <Card className="md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Match Score</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className={`text-6xl font-bold ${getMatchColor(matchScore)}`}>
                  {matchScore}%
                </div>
                <Badge className={`mt-2 ${getMatchBg(matchScore)} bg-opacity-50 border-0 text-gray-800`}>
                  {matchScore >= 80 ? 'Excellent Match' : 
                   matchScore >= 60 ? 'Good Match' : 'Needs Improvement'}
                </Badge>
                
                <div className="w-full mt-8 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Required Skills</span>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Experience Match</span>
                      <span className="text-sm font-medium">70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Education Match</span>
                      <span className="text-sm font-medium">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </div>
                
                <Button className="mt-8 w-full bg-brand-purple hover:bg-brand-purpleDark">
                  <Download className="h-4 w-4 mr-2" />
                  Get Tailored Resume
                </Button>
              </CardContent>
            </Card>
            
            {/* Keyword Matches */}
            <Card className="md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Keyword Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {keywordMatches.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                      <span className="font-medium">{item.keyword}</span>
                      {item.found ? (
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium mb-3">Missing Keywords</h4>
                  <div className="space-y-2">
                    {keywordMatches
                      .filter(item => !item.found)
                      .map((item, index) => (
                        <div key={index} className="text-sm flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-brand-purple" />
                          <span>Add "{item.keyword}" to your resume</span>
                        </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recommendations */}
            <Card className="md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      Highlight Node.js Experience
                    </h4>
                    <p className="text-sm text-gray-600">
                      The job requires Node.js, but your resume doesn't mention it. Add any related experience.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-md">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      Add Cloud Experience
                    </h4>
                    <p className="text-sm text-gray-600">
                      Mention AWS or other cloud platform experience you have in your technical skills section.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-md">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Strong Front-end Match
                    </h4>
                    <p className="text-sm text-gray-600">
                      Your React and TypeScript experience aligns well with the job requirements.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-md">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      Emphasize Agile Experience
                    </h4>
                    <p className="text-sm text-gray-600">
                      The job mentions Agile methodology. Add this to your experience section if applicable.
                    </p>
                  </div>
                </div>
                
                <Button className="w-full mt-6" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  View Full Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Loading State */}
        {isAnalyzing && (
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <Briefcase className="h-12 w-12 text-brand-purple mb-4" />
                <h2 className="text-xl font-semibold mb-2">Analyzing job match...</h2>
                <p className="text-muted-foreground mb-6">Comparing your resume to the job description</p>
                <Progress value={60} className="w-64 h-2" />
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Empty State */}
        {!isAnalyzing && !hasAnalyzed && (
          <Card className="border-dashed border-2">
            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
              <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No job match performed yet</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Paste a job description above to see how well your resume matches the requirements
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
