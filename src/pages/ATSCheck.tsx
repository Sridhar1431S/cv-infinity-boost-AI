
import { useState } from 'react';
import AppNav from '@/components/layout/AppNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CircleCheck, AlertCircle, Info } from 'lucide-react';
import ResumeUploader from '@/components/dashboard/ResumeUploader';
import { useToast } from '@/components/ui/use-toast';

// Define the structure of ATS recommendations
interface ATSRecommendation {
  type: 'success' | 'warning' | 'info';
  message: string;
}

// Define structure of the ATS Analysis results
interface ATSAnalysis {
  score: number;
  compatibility: number;
  readability: number;
  keywords: {
    matched: string[];
    missing: string[];
  };
  recommendations: ATSRecommendation[];
  format: {
    isValid: boolean;
    issues: string[];
  };
}

export default function ATSCheck() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ATSAnalysis | null>(null);

  const handleResumeUpload = (file: File | null) => {
    setFile(file);
    // Reset analysis when new file is uploaded
    setAnalysisResult(null);
  };

  const handleAnalyze = () => {
    if (!file) {
      toast({
        title: "Missing resume",
        description: "Please upload your resume first.",
        variant: "destructive",
      });
      return;
    }

    if (!jobDescription.trim()) {
      toast({
        title: "Missing job description",
        description: "Please enter the job description to check against.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Mock API call - Generate pseudorandom but deterministic results based on inputs
    let seedValue = (file.name + jobDescription).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rng = () => {
      const x = Math.sin(seedValue++) * 10000;
      return x - Math.floor(x);
    };

    // Extract potential keywords from job description
    const words = jobDescription.toLowerCase().match(/\b\w{4,}\b/g) || [];
    const uniqueWords = [...new Set(words)];
    const keywords = uniqueWords
      .filter(word => !['with', 'that', 'this', 'have', 'from', 'will', 'about', 'what'].includes(word))
      .sort(() => rng() - 0.5)
      .slice(0, 12);

    // Select random matched and missing keywords
    const matchedCount = Math.floor(3 + rng() * (keywords.length - 3));
    const matched = keywords.slice(0, matchedCount);
    const missing = keywords.slice(matchedCount);

    // Generate random scores
    const score = Math.floor(50 + rng() * 50);
    const compatibility = Math.floor(40 + rng() * 60);
    const readability = Math.floor(60 + rng() * 40);

    // Generate recommendations based on scores
    const recommendations: ATSRecommendation[] = [];

    if (score < 70) {
      recommendations.push({
        type: 'warning',
        message: 'Your resume may be filtered out by ATS. Consider addressing the recommendations below.',
      });
    } else {
      recommendations.push({
        type: 'success',
        message: 'Your resume is likely to pass initial ATS screening.',
      });
    }

    if (missing.length > 3) {
      recommendations.push({
        type: 'warning',
        message: `Add more relevant keywords like: ${missing.slice(0, 3).join(', ')}`,
      });
    }

    if (readability < 80) {
      recommendations.push({
        type: 'info',
        message: 'Improve readability by using shorter sentences and bullet points.',
      });
    }

    // Random format issues
    const formatIssues = [];
    if (rng() > 0.7) formatIssues.push('Complex formatting may not be parsed correctly by ATS');
    if (rng() > 0.7) formatIssues.push('Tables or columns detected that might confuse ATS');
    if (rng() > 0.8) formatIssues.push('Headers or footers may not be correctly processed');

    setTimeout(() => {
      setAnalysisResult({
        score,
        compatibility,
        readability,
        keywords: {
          matched,
          missing,
        },
        recommendations,
        format: {
          isValid: formatIssues.length === 0,
          issues: formatIssues,
        },
      });
      
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Your resume scored ${score}/100 for ATS compatibility.`,
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column - Inputs */}
          <div>
            <Card className="mb-6 animate-on-tap backdrop-blur-sm bg-card/50 neon-border">
              <CardHeader>
                <CardTitle className="gradient-text">ATS Compatibility Check</CardTitle>
                <CardDescription>
                  Check if your resume will pass through Applicant Tracking Systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">1. Upload your resume</h3>
                    <ResumeUploader onUpload={handleResumeUpload} />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">2. Paste job description</h3>
                    <Textarea 
                      placeholder="Paste the job description here to compare against your resume..."
                      className="h-40 resize-none border-purple-500/30 focus:neon-border"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing}
                    className="w-full bg-brand-purple hover:bg-brand-purpleDark neon-glow animate-on-tap"
                  >
                    {isAnalyzing ? "Analyzing..." : "Check ATS Compatibility"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Results */}
          <div>
            {analysisResult ? (
              <Card className="backdrop-blur-sm bg-card/50 neon-border animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="gradient-text">ATS Analysis Results</CardTitle>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-muted-foreground">Score:</span>
                      <Badge 
                        className={`text-white ${
                          analysisResult.score >= 80 ? 'bg-green-500' : 
                          analysisResult.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                      >
                        {analysisResult.score}/100
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Scores */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">ATS Compatibility</span>
                        <span className="text-sm">{analysisResult.compatibility}%</span>
                      </div>
                      <Progress value={analysisResult.compatibility} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Readability</span>
                        <span className="text-sm">{analysisResult.readability}%</span>
                      </div>
                      <Progress value={analysisResult.readability} className="h-2" />
                    </div>
                  </div>
                  
                  {/* Keywords */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Keywords</h4>
                    
                    <div className="space-y-2">
                      <div>
                        <h5 className="text-xs text-muted-foreground mb-1">Found in your resume:</h5>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.keywords.matched.map((keyword, i) => (
                            <Badge key={i} variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {analysisResult.keywords.missing.length > 0 && (
                        <div>
                          <h5 className="text-xs text-muted-foreground mb-1">Missing keywords:</h5>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.keywords.missing.map((keyword, i) => (
                              <Badge key={i} variant="outline" className="bg-red-500/10 text-red-500 border-red-500">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Recommendations */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Recommendations</h4>
                    
                    <div className="space-y-2">
                      {analysisResult.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start gap-2 p-2 rounded-md bg-background/50">
                          {rec.type === 'success' ? (
                            <CircleCheck className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                          ) : rec.type === 'warning' ? (
                            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                          ) : (
                            <Info className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                          )}
                          <p className="text-sm">{rec.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Format Issues */}
                  {analysisResult.format.issues.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Format Issues</h4>
                      <div className="p-3 rounded-md bg-red-500/10 border border-red-500/30">
                        <ul className="list-disc list-inside space-y-1">
                          {analysisResult.format.issues.map((issue, i) => (
                            <li key={i} className="text-sm text-red-500">{issue}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="backdrop-blur-sm bg-card/50 neon-border h-full flex items-center justify-center">
                <CardContent className="py-12 text-center">
                  <div className="mx-auto h-20 w-20 rounded-full bg-accent flex items-center justify-center mb-4 animate-pulse">
                    <AlertCircle className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Analysis Results</h3>
                  <p className="text-muted-foreground max-w-md">
                    Upload your resume and paste a job description, then click "Check ATS Compatibility" to get your results.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
