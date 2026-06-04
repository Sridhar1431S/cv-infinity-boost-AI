import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function JobDescriptionImport({ onAnalyze }: { onAnalyze?: (text: string) => void }) {
  const [jobDescription, setJobDescription] = useState('');
  const { toast } = useToast();

  const handleAnalyze = () => {
    if (!jobDescription.trim()) {
      toast({ title: "Empty job description", description: "Paste a job description first.", variant: "destructive" });
      return;
    }
    if (onAnalyze) {
      onAnalyze(jobDescription);
      toast({ title: "Analysis started", description: "Matching your resume against the job description…" });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" /> Job description matching
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Textarea
            placeholder="Paste the job description here to match against your resume…"
            className="min-h-[150px] resize-none"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <Button className="w-full" onClick={handleAnalyze}>Match my resume</Button>
        </div>
      </CardContent>
    </Card>
  );
}
