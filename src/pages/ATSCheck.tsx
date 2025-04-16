
import { useState } from 'react';
import AppNav from '@/components/layout/AppNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import ResumeUploader from '@/components/dashboard/ResumeUploader';
import { 
  CheckSquare, 
  FileText, 
  Download, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  RefreshCw,
  Lock
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function ATSCheck() {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [atsScore, setAtsScore] = useState(78);
  const [atsChecks, setAtsChecks] = useState([
    { name: "Parsable Format", passed: true },
    { name: "No Images", passed: true },
    { name: "No Tables", passed: true },
    { name: "Standard Section Headers", passed: false },
    { name: "Contact Info Detected", passed: true },
    { name: "No Special Characters", passed: false },
    { name: "Simple Formatting", passed: true },
    { name: "No Columns", passed: true }
  ]);
  
  const handleResumeUpload = (file: File | null) => {
    setFile(file);
    
    if (!file) {
      setHasAnalyzed(false);
    }
  };
  
  const handleCheck = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a resume file first.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // Generate random analysis based on file name
    const generateRandomAnalysis = () => {
      const seed = file.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const rng = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
      };
      
      // Generate score between 45-95 for more varied results
      const score = Math.floor(45 + rng() * 51);
      
      // Generate random checks
      const checks = [
        { name: "Parsable Format", passed: rng() > 0.1 }, // 90% chance to pass
        { name: "No Images", passed: rng() > 0.2 }, // 80% chance to pass
        { name: "No Tables", passed: rng() > 0.3 }, // 70% chance to pass
        { name: "Standard Section Headers", passed: rng() > 0.4 }, // 60% chance to pass
        { name: "Contact Info Detected", passed: rng() > 0.2 }, // 80% chance to pass
        { name: "No Special Characters", passed: rng() > 0.5 }, // 50% chance to pass
        { name: "Simple Formatting", passed: rng() > 0.3 }, // 70% chance to pass
        { name: "No Columns", passed: rng() > 0.25 } // 75% chance to pass
      ];
      
      return { score, checks };
    };
    
    // Simulate API call delay
    setTimeout(() => {
      const analysis = generateRandomAnalysis();
      setAtsScore(analysis.score);
      setAtsChecks(analysis.checks);
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      toast({
        title: "ATS Check Complete",
        description: `Your resume scored ${analysis.score}/100 on ATS compatibility.`,
      });
    }, 1500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 relative overflow-hidden">
      {/* Neon light effects */}
      <div className="fixed top-1/4 -left-36 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed top-3/4 -right-36 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-1/3 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      
      <AppNav />
      
      <main className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold neon-text-purple">ATS Compatibility Check</h1>
        </div>
        
        {/* Upload Section */}
        <Card className="mb-6 animate-on-tap">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upload your resume for ATS compatibility check</CardTitle>
          </CardHeader>
          <CardContent>
            <ResumeUploader onUpload={handleResumeUpload} />
            
            <div className="flex justify-end mt-4">
              <Button 
                onClick={handleCheck}
                className="bg-brand-purple hover:bg-brand-purpleDark neon-glow animate-on-tap"
                disabled={isAnalyzing || !file}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Check ATS Compatibility
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {hasAnalyzed && !isAnalyzing && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ATS Score card */}
            <div className="md:col-span-1">
              <Card className="animate-on-tap">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <h2 className="text-xl font-semibold mb-6 neon-text-purple">ATS Score</h2>
                  
                  <div className="w-48 h-48 relative mb-6 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke="#e6e6e6" 
                        strokeWidth="10" 
                      />
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke={atsScore >= 80 ? "#22c55e" : atsScore >= 60 ? "#f59e0b" : "#ef4444"} 
                        strokeWidth="10" 
                        strokeDasharray={`${atsScore * 2.83} ${283 - atsScore * 2.83}`} 
                        strokeDashoffset="70.75" 
                        className="neon-glow"
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <span className="text-4xl font-bold neon-text-blue">{atsScore}</span>
                      <span className="text-xl">/100</span>
                    </div>
                  </div>
                  
                  <Badge className={`${getScoreColor(atsScore)} text-white px-3 py-1 neon-glow`}>
                    {atsScore >= 80 ? 'Excellent' : atsScore >= 60 ? 'Good' : 'Needs Improvement'}
                  </Badge>
                  
                  <div className="mt-8 w-full">
                    <Button className="w-full animate-on-tap neon-glow">
                      <Download className="h-4 w-4 mr-2" />
                      Download ATS Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* ATS Checklist */}
            <div className="md:col-span-2">
              <Card className="animate-on-tap">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">ATS Compatibility Checks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {atsChecks.map((check, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md animate-on-tap">
                        {check.passed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 neon-text-blue" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        )}
                        <div>
                          <h4 className="font-medium">{check.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {check.passed 
                              ? "Your resume passes this check." 
                              : "Your resume fails this check and may need improvements."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t">
                    <h3 className="font-medium text-lg mb-3">Recommendations</h3>
                    
                    <div className="space-y-3">
                      {atsChecks.some(check => !check.passed && check.name === "Standard Section Headers") && (
                        <div className="flex items-start gap-2 animate-on-tap">
                          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Use Standard Section Headers</h4>
                            <p className="text-sm text-gray-600">
                              Replace custom headers with standard ones like "Work Experience" or "Education" for better ATS parsing.
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {atsChecks.some(check => !check.passed && check.name === "No Special Characters") && (
                        <div className="flex items-start gap-2 animate-on-tap">
                          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Remove Special Characters</h4>
                            <p className="text-sm text-gray-600">
                              Avoid using special characters like ★ and → in your resume as they may cause parsing issues.
                            </p>
                          </div>
                        </div>
                      )}

                      {atsChecks.some(check => !check.passed && check.name === "No Tables") && (
                        <div className="flex items-start gap-2 animate-on-tap">
                          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Avoid Table Layouts</h4>
                            <p className="text-sm text-gray-600">
                              Tables can confuse ATS systems. Use standard paragraphs and bullet points instead.
                            </p>
                          </div>
                        </div>
                      )}

                      {atsChecks.some(check => !check.passed && check.name === "No Columns") && (
                        <div className="flex items-start gap-2 animate-on-tap">
                          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Use Single-Column Layout</h4>
                            <p className="text-sm text-gray-600">
                              Multi-column layouts can confuse ATS systems. Stick to a single column format.
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <div className="p-4 bg-accent/50 rounded-md mt-4 border border-accent animate-on-tap neon-border">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium flex items-center gap-1.5">
                            <Lock className="h-4 w-4 text-brand-purple" />
                            Premium Analysis
                          </h4>
                          <Button size="sm" variant="outline" className="animate-on-tap">Upgrade</Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Unlock detailed ATS optimization recommendations and our ATS-friendly resume template.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {isAnalyzing && (
          <Card className="animate-on-tap">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <CheckSquare className="h-12 w-12 text-brand-purple mb-4 neon-text-purple" />
                <h2 className="text-xl font-semibold mb-2">Checking ATS compatibility...</h2>
                <p className="text-muted-foreground mb-6">This will take a few moments</p>
                <Progress value={65} className="w-64 h-2 neon-glow" />
              </div>
            </CardContent>
          </Card>
        )}
        
        {!isAnalyzing && !hasAnalyzed && (
          <Card className="border-dashed border-2 animate-on-tap">
            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No ATS check performed yet</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Upload your resume and click "Check ATS Compatibility" to see how well your resume will perform with Applicant Tracking Systems
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
