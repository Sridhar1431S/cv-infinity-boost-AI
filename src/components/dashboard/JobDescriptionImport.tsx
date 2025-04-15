
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, FileUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function JobDescriptionImport({ onAnalyze }: { onAnalyze?: (text: string) => void }) {
  const [jobDescription, setJobDescription] = useState('');
  const { toast } = useToast();

  const handleAnalyze = () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Empty Job Description",
        description: "Please paste a job description before analyzing.",
        variant: "destructive"
      });
      return;
    }

    if (onAnalyze) {
      onAnalyze(jobDescription);
      toast({
        title: "Analysis started",
        description: "Matching your resume against the job description...",
      });
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Job Description Import
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Textarea
            placeholder="Paste job description here to match against your resume..."
            className="min-h-[150px] resize-none"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <div className="flex gap-2">
            <Button 
              className="w-full bg-brand-purple hover:bg-brand-purpleDark"
              onClick={handleAnalyze}
            >
              Match My Resume
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
