
import { useState } from 'react';
import AppNav from '@/components/layout/AppNav';
import ResumeUploader from '@/components/dashboard/ResumeUploader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, CheckCircle, AlertTriangle, Info, Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

export default function ResumeAnalyzer() {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [analysisScore, setAnalysisScore] = useState(75);
  const [contentIssues, setContentIssues] = useState([
    { 
      section: "Experience Section", 
      severity: "high",
      issues: [
        "Your experience descriptions are too generic and lack specific achievements",
        "Add metrics and quantifiable results to demonstrate impact",
        "Focus on relevant accomplishments that match your target role"
      ]
    },
    {
      section: "Skills Section",
      severity: "medium",
      issues: [
        "Your skills section is too brief considering your experience",
        "Add more technical and soft skills relevant to your industry",
        "Organize skills by category for better readability"
      ]
    },
    {
      section: "Education Section",
      severity: "low",
      issues: [
        "Your education section is well structured and complete",
        "Good use of relevant coursework and achievements"
      ]
    }
  ]);
  
  const handleResumeUpload = (file: File | null) => {
    setFile(file);
    
    if (!file) {
      setHasAnalyzed(false);
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
    
    // Generate random analysis based on file name
    const generateRandomAnalysis = () => {
      const seed = file.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const rng = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
      };
      
      // Generate score between 45-95 for more varied results
      const score = Math.floor(45 + rng() * 51);
      
      // Possible issues for each section
      const experienceIssues = [
        [
          "Your experience descriptions focus too much on responsibilities rather than achievements",
          "Consider adding metrics to showcase the impact of your work",
          "Experience sections are too lengthy - be more concise"
        ],
        [
          "Experience descriptions lack action verbs at the beginning of bullets",
          "Too many technical details that may confuse non-technical recruiters",
          "Add more context about your role in each project or responsibility"
        ],
        [
          "Experience section is well-structured but missing quantifiable results",
          "Consider adding more information about the technologies you used",
          "Add more details about how you collaborated with teams"
        ]
      ];
      
      const skillsIssues = [
        [
          "Skills section lacks organization - consider grouping by category",
          "Some listed skills appear outdated for your target industry",
          "Add more soft skills to balance technical abilities"
        ],
        [
          "Too many skills listed - focus on the most relevant ones",
          "Skills section is missing keywords from your target job descriptions",
          "Consider adding proficiency levels to your key skills"
        ],
        [
          "Skills section is too generic - add more specialized abilities",
          "Missing important technical skills relevant to your industry",
          "Consider separating technical skills from soft skills"
        ]
      ];
      
      const educationIssues = [
        [
          "Education section is missing relevant coursework or projects",
          "Consider adding GPA if it's above 3.5",
          "Add any academic honors or awards to strengthen this section"
        ],
        [
          "Education section is well-structured and complete",
          "Good presentation of academic credentials",
          "Consider moving education section lower if you have significant work experience"
        ],
        [
          "Format your degrees consistently throughout your education section",
          "Include graduation dates for all educational entries",
          "Add any certifications or additional training"
        ]
      ];
      
      // Randomly select issues based on file name
      const randomIndex = Math.floor(rng() * 3);
      const contentAnalysis = [
        { 
          section: "Experience Section", 
          severity: rng() > 0.6 ? "high" : rng() > 0.3 ? "medium" : "low",
          issues: experienceIssues[randomIndex]
        },
        {
          section: "Skills Section",
          severity: rng() > 0.5 ? "high" : rng() > 0.2 ? "medium" : "low",
          issues: skillsIssues[(randomIndex + 1) % 3]
        },
        {
          section: "Education Section",
          severity: rng() > 0.7 ? "high" : rng() > 0.4 ? "medium" : "low",
          issues: educationIssues[(randomIndex + 2) % 3]
        }
      ];
      
      return { score, contentAnalysis };
    };
    
    // Simulate API call delay
    setTimeout(() => {
      const analysis = generateRandomAnalysis();
      setAnalysisScore(analysis.score);
      setContentIssues(analysis.contentAnalysis);
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      toast({
        title: "Analysis Complete",
        description: `Your resume scored ${analysis.score}/100. See detailed results below.`,
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold neon-text-purple">Resume Analyzer</h1>
        </div>
        
        {/* Upload Section */}
        <Card className="mb-6 animate-on-tap">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upload your resume for detailed analysis</CardTitle>
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
        
        {hasAnalyzed && (
          <div className="space-y-6">
            {/* Overview */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>Analysis Overview</span>
                  <Badge className="ml-auto bg-brand-purple">Score: {analysisScore}/100</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm text-muted-foreground">AREAS FOR IMPROVEMENT</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Content Quality</span>
                          <span className="text-sm font-medium">{Math.floor(analysisScore * 0.08)}/10</span>
                        </div>
                        <Progress value={analysisScore * 0.8} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">ATS Optimization</span>
                          <span className="text-sm font-medium">{Math.floor(analysisScore * 0.07)}/10</span>
                        </div>
                        <Progress value={analysisScore * 0.7} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Keyword Matching</span>
                          <span className="text-sm font-medium">{Math.floor(analysisScore * 0.06)}/10</span>
                        </div>
                        <Progress value={analysisScore * 0.6} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-4">KEY RECOMMENDATIONS</h3>
                    <ul className="space-y-2">
                      {contentIssues.map((section, idx) => (
                        section.severity !== "low" && (
                          <li key={idx} className="flex items-start gap-2">
                            {section.severity === "high" ? (
                              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                            ) : (
                              <Info className="h-4 w-4 text-amber-500 mt-0.5" />
                            )}
                            <span className="text-sm">{section.issues[0]}</span>
                          </li>
                        )
                      ))}
                      {contentIssues.some(section => section.severity === "low") && (
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">
                            {contentIssues.find(section => section.severity === "low")?.issues[0] || 
                             "Good job keeping your contact information clear and accessible"}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Detailed Analysis */}
            <Tabs defaultValue="content" className="w-full">
              <TabsList>
                <TabsTrigger value="content">Content Analysis</TabsTrigger>
                <TabsTrigger value="format">Format & Structure</TabsTrigger>
                <TabsTrigger value="ats">ATS Compatibility</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="mt-4 space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Content Quality Analysis</h3>
                    
                    <div className="space-y-4">
                      {contentIssues.map((section, idx) => (
                        <div key={idx} className="p-4 border rounded-md">
                          <h4 className="font-medium flex items-center gap-2 mb-2">
                            {section.severity === "high" ? (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            ) : section.severity === "medium" ? (
                              <Info className="h-4 w-4 text-amber-500" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            {section.section}
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            {section.issues.map((issue, i) => (
                              <li key={i}>{issue}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="format" className="mt-4 space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Format & Structure Analysis</h3>
                    
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Overall Layout
                        </h4>
                        <p className="text-sm">
                          {analysisScore > 70 
                            ? "Your resume has a clean, professional layout with good use of white space."
                            : "Your resume layout could be improved for better readability and scanning."}
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          {analysisScore > 65 
                            ? <CheckCircle className="h-4 w-4 text-green-500" />
                            : <Info className="h-4 w-4 text-amber-500" />}
                          Font & Typography
                        </h4>
                        <p className="text-sm">
                          {analysisScore > 65 
                            ? "Good consistent font usage throughout the document."
                            : "Consider using more consistent fonts and font sizes throughout your resume."}
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          {analysisScore > 50 
                            ? <Info className="h-4 w-4 text-amber-500" />
                            : <AlertTriangle className="h-4 w-4 text-red-500" />}
                          Section Headings
                        </h4>
                        <p className="text-sm">
                          {analysisScore > 50 
                            ? "Your section headings could be more distinctive to improve scannability."
                            : "Your section headings need to be more clear and consistent for better readability."}
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          {analysisScore > 60 
                            ? <Info className="h-4 w-4 text-amber-500" />
                            : <AlertTriangle className="h-4 w-4 text-red-500" />}
                          Bullet Points
                        </h4>
                        <p className="text-sm">
                          {analysisScore > 60 
                            ? "Some of your bullet points are too long. Keep them concise and impactful."
                            : "Your bullet points need to be more consistent in length and format."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="ats" className="mt-4 space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">ATS Compatibility Analysis</h3>
                    
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          File Format
                        </h4>
                        <p className="text-sm">
                          {file?.name.endsWith('.pdf') 
                            ? "Your resume is in PDF format which is generally ATS-friendly."
                            : "Your resume is in Word format which is generally ATS-friendly."}
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          {analysisScore > 55 
                            ? <CheckCircle className="h-4 w-4 text-green-500" />
                            : <Info className="h-4 w-4 text-amber-500" />}
                          Text Extraction
                        </h4>
                        <p className="text-sm">
                          {analysisScore > 55 
                            ? "Text can be properly extracted from your resume by ATS software."
                            : "Some text in your resume might be difficult for ATS software to extract correctly."}
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          {analysisScore > 65 
                            ? <Info className="h-4 w-4 text-amber-500" />
                            : <AlertTriangle className="h-4 w-4 text-red-500" />}
                          Keyword Optimization
                        </h4>
                        <p className="text-sm">
                          {analysisScore > 65 
                            ? "Your resume has some industry terms but could benefit from more targeted keywords."
                            : "Your resume is missing key industry terms that ATS systems look for."}
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          {analysisScore > 70 
                            ? <CheckCircle className="h-4 w-4 text-green-500" />
                            : <Info className="h-4 w-4 text-amber-500" />}
                          Headers & Sections
                        </h4>
                        <p className="text-sm">
                          {analysisScore > 70 
                            ? "Your section headers are clear and standard, which helps ATS parsing."
                            : "Use standard section headers like 'Experience' instead of creative names for better ATS parsing."}
                        </p>
                      </div>
                    </div>
                    
                    <Button className="mt-6">
                      <Download className="h-4 w-4 mr-2" />
                      Download ATS-Friendly Version
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
        
        {/* Loading State */}
        {isAnalyzing && (
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <FileText className="h-12 w-12 text-brand-purple mb-4" />
                <h2 className="text-xl font-semibold mb-2">Analyzing your resume...</h2>
                <p className="text-muted-foreground mb-6">This will take a few moments</p>
                <Progress value={70} className="w-64 h-2" />
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Empty State */}
        {!isAnalyzing && !hasAnalyzed && (
          <Card className="border-dashed border-2">
            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No resume analyzed yet</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Upload your resume to get detailed insights and recommendations for improvement
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
