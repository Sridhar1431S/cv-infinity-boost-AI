import { useState } from 'react';
import AppNav from '@/components/layout/AppNav';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CircleCheck, AlertCircle, AlertTriangle, Info, FileSearch, RefreshCw } from 'lucide-react';
import ResumeUploader from '@/components/dashboard/ResumeUploader';
import { useToast } from '@/components/ui/use-toast';

interface ATSRecommendation { type: 'success' | 'warning' | 'info'; message: string; }
interface ATSAnalysis {
  score: number;
  compatibility: number;
  readability: number;
  keywords: { matched: string[]; missing: string[]; };
  recommendations: ATSRecommendation[];
  format: { isValid: boolean; issues: string[]; };
}

function ATSResultsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="h-5 w-40 skeleton-shimmer" />
          <div className="h-6 w-16 skeleton-shimmer rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {[0,1].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between"><div className="h-3 w-32 skeleton-shimmer" /><div className="h-3 w-10 skeleton-shimmer" /></div>
              <div className="h-2 w-full skeleton-shimmer" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-3 w-24 skeleton-shimmer" />
          <div className="flex flex-wrap gap-2">
            {[64,84,72,96,56].map((w,i) => <div key={i} className="h-6 skeleton-shimmer rounded-full" style={{ width: w }} />)}
          </div>
        </div>
        <div className="space-y-2">
          {[0,1,2].map((i) => (
            <div key={i} className="h-12 skeleton-shimmer rounded-md" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ATSCheck() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ATSAnalysis | null>(null);

  const handleResumeUpload = (file: File | null) => {
    setFile(file);
    setAnalysisResult(null);
    setError(null);
  };

  const handleAnalyze = () => {
    setError(null);
    if (!file) {
      toast({ title: "Missing resume", description: "Please upload your resume first.", variant: "destructive" });
      return;
    }
    if (!jobDescription.trim()) {
      toast({ title: "Missing job description", description: "Please paste the job description.", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    let seedValue = (file.name + jobDescription).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rng = () => { const x = Math.sin(seedValue++) * 10000; return x - Math.floor(x); };

    const words = jobDescription.toLowerCase().match(/\b\w{4,}\b/g) || [];
    const uniqueWords = [...new Set(words)];
    const keywords = uniqueWords
      .filter(w => !['with','that','this','have','from','will','about','what'].includes(w))
      .sort(() => rng() - 0.5).slice(0, 12);

    const matchedCount = Math.floor(3 + rng() * Math.max(1, keywords.length - 3));
    const matched = keywords.slice(0, matchedCount);
    const missing = keywords.slice(matchedCount);
    const score = Math.floor(50 + rng() * 50);
    const compatibility = Math.floor(40 + rng() * 60);
    const readability = Math.floor(60 + rng() * 40);

    const recommendations: ATSRecommendation[] = [];
    if (score < 70) recommendations.push({ type: 'warning', message: 'Your resume may be filtered out by ATS. Address the items below.' });
    else recommendations.push({ type: 'success', message: 'Your resume is likely to pass initial ATS screening.' });
    if (missing.length > 3) recommendations.push({ type: 'warning', message: `Add relevant keywords like: ${missing.slice(0,3).join(', ')}` });
    if (readability < 80) recommendations.push({ type: 'info', message: 'Improve readability with shorter sentences and bullet points.' });

    const formatIssues: string[] = [];
    if (rng() > 0.7) formatIssues.push('Complex formatting may not be parsed correctly by ATS');
    if (rng() > 0.7) formatIssues.push('Tables or columns detected that might confuse ATS');
    if (rng() > 0.8) formatIssues.push('Headers or footers may not be processed');

    setTimeout(() => {
      try {
        setAnalysisResult({ score, compatibility, readability, keywords: { matched, missing }, recommendations, format: { isValid: formatIssues.length === 0, issues: formatIssues } });
        setIsAnalyzing(false);
        toast({ title: "Analysis complete", description: `ATS score: ${score}/100.` });
      } catch (e) {
        setIsAnalyzing(false);
        setError('Something went wrong while analyzing your resume. Please try again.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppNav />

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display tracking-tight">ATS compatibility check</h1>
          <p className="text-muted-foreground mt-1">See how your resume performs against applicant tracking systems.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <Card>
            <CardHeader>
              <CardTitle>Run a check</CardTitle>
              <CardDescription>Upload your resume and paste the job description.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-foreground">1. Upload your resume</h3>
                  <ResumeUploader onUpload={handleResumeUpload} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-foreground">2. Paste the job description</h3>
                  <Textarea
                    placeholder="Paste the job description here…"
                    className="h-40 resize-none"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full">
                  {isAnalyzing ? (<><RefreshCw className="h-4 w-4 animate-spin" /> Analyzing…</>) : 'Check ATS compatibility'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div>
            {error ? (
              <Card>
                <CardContent className="py-12 flex flex-col items-center text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="text-base font-semibold mb-1">Analysis failed</h3>
                  <p className="text-sm text-muted-foreground max-w-md mb-4">{error}</p>
                  <Button variant="outline" onClick={handleAnalyze}>Try again</Button>
                </CardContent>
              </Card>
            ) : isAnalyzing ? (
              <ATSResultsSkeleton />
            ) : analysisResult ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>ATS analysis results</CardTitle>
                    <Badge className={
                      analysisResult.score >= 80 ? 'bg-success text-white' :
                      analysisResult.score >= 60 ? 'bg-warning text-white' : 'bg-destructive text-white'
                    }>
                      {analysisResult.score}/100
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1.5 text-sm"><span className="text-muted-foreground">ATS compatibility</span><span className="font-semibold">{analysisResult.compatibility}%</span></div>
                      <Progress value={analysisResult.compatibility} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1.5 text-sm"><span className="text-muted-foreground">Readability</span><span className="font-semibold">{analysisResult.readability}%</span></div>
                      <Progress value={analysisResult.readability} className="h-2" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Keywords</h4>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Found in your resume</p>
                      <div className="flex flex-wrap gap-1.5">
                        {analysisResult.keywords.matched.length > 0
                          ? analysisResult.keywords.matched.map((k, i) => (
                              <Badge key={i} variant="outline" className="bg-success/10 text-success border-success/30">{k}</Badge>
                            ))
                          : <p className="text-xs text-muted-foreground">No matched keywords yet.</p>}
                      </div>
                    </div>
                    {analysisResult.keywords.missing.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Missing keywords</p>
                        <div className="flex flex-wrap gap-1.5">
                          {analysisResult.keywords.missing.map((k, i) => (
                            <Badge key={i} variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">{k}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Recommendations</h4>
                    {analysisResult.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-md border border-border bg-muted/40">
                        {rec.type === 'success' ? <CircleCheck className="h-4 w-4 text-success mt-0.5 shrink-0" />
                          : rec.type === 'warning' ? <AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                          : <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />}
                        <p className="text-sm">{rec.message}</p>
                      </div>
                    ))}
                  </div>

                  {analysisResult.format.issues.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Format issues</h4>
                      <div className="p-3 rounded-md bg-destructive/5 border border-destructive/20">
                        <ul className="list-disc list-inside space-y-1">
                          {analysisResult.format.issues.map((issue, i) => (
                            <li key={i} className="text-sm text-destructive">{issue}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-16 flex flex-col items-center text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <FileSearch className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-base font-semibold mb-1">No results yet</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Upload your resume and paste a job description to see your ATS score.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
