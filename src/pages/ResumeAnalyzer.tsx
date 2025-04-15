
import { useState } from 'react';
import AppNav from '@/components/layout/AppNav';
import ResumeUploader from '@/components/dashboard/ResumeUploader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, CheckCircle, AlertTriangle, Info, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

export default function ResumeAnalyzer() {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  
  const handleResumeUpload = (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed. See detailed results below.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNav />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Resume Analyzer</h1>
        </div>
        
        {/* Upload Section */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upload your resume for detailed analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResumeUploader onUpload={handleResumeUpload} />
          </CardContent>
        </Card>
        
        {hasAnalyzed && (
          <div className="space-y-6">
            {/* Overview */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>Analysis Overview</span>
                  <Badge className="ml-auto bg-brand-purple">Score: 75/100</Badge>
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
                          <span className="text-sm font-medium">6/10</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">ATS Optimization</span>
                          <span className="text-sm font-medium">7/10</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Keyword Matching</span>
                          <span className="text-sm font-medium">5/10</span>
                        </div>
                        <Progress value={50} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-4">KEY RECOMMENDATIONS</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                        <span className="text-sm">Add more quantifiable achievements to your experience section</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-amber-500 mt-0.5" />
                        <span className="text-sm">Include more industry-specific keywords throughout your resume</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                        <span className="text-sm">Your skills section is missing important technical skills</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-sm">Good job keeping your contact information clear and accessible</span>
                      </li>
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
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          Experience Section
                        </h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Your experience descriptions are too generic and lack specific achievements</li>
                          <li>Add metrics and quantifiable results to demonstrate impact</li>
                          <li>Focus on relevant accomplishments that match your target role</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <Info className="h-4 w-4 text-amber-500" />
                          Skills Section
                        </h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Your skills section is too brief considering your experience</li>
                          <li>Add more technical and soft skills relevant to your industry</li>
                          <li>Organize skills by category for better readability</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Education Section
                        </h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Your education section is well structured and complete</li>
                          <li>Good use of relevant coursework and achievements</li>
                        </ul>
                      </div>
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
                        <p className="text-sm">Your resume has a clean, professional layout with good use of white space.</p>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Font & Typography
                        </h4>
                        <p className="text-sm">Good consistent font usage throughout the document.</p>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <Info className="h-4 w-4 text-amber-500" />
                          Section Headings
                        </h4>
                        <p className="text-sm">Your section headings could be more distinctive to improve scannability.</p>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          Bullet Points
                        </h4>
                        <p className="text-sm">Some of your bullet points are too long. Keep them concise and impactful.</p>
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
                        <p className="text-sm">Your resume is in PDF format which is generally ATS-friendly.</p>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Text Extraction
                        </h4>
                        <p className="text-sm">Text can be properly extracted from your resume by ATS software.</p>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          Keyword Optimization
                        </h4>
                        <p className="text-sm">Your resume is missing key industry terms that ATS systems look for.</p>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <Info className="h-4 w-4 text-amber-500" />
                          Headers & Sections
                        </h4>
                        <p className="text-sm">Use standard section headers like "Experience" instead of "Professional Journey" for better ATS parsing.</p>
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
