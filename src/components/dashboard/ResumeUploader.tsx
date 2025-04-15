
import { useState, useCallback } from 'react';
import { FileUp, Upload, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

export default function ResumeUploader({ onUpload }: { onUpload?: (file: File) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type === 'application/msword' || 
        droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      handleFileSelected(droppedFile);
    } else {
      toast({
        title: "Invalid file format",
        description: "Please upload a PDF or Word document.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelected(selectedFile);
    }
  };

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
    toast({
      title: "Resume uploaded",
      description: `${selectedFile.name} has been successfully uploaded.`,
    });
    
    // Notify parent component immediately when a file is selected
    if (onUpload) onUpload(selectedFile);
  };

  const handleAnalyzeClick = () => {
    if (file && onUpload) {
      onUpload(file);
      toast({
        title: "Analysis started",
        description: "Your resume is being analyzed. Results will appear shortly.",
      });
    } else {
      toast({
        title: "No file selected",
        description: "Please upload a resume file first.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full px-4">
      <div 
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-all animate-on-tap",
          isDragging ? "border-brand-purple bg-accent/50 neon-border" : "border-gray-300 hover:border-brand-purple",
          "animate-fade-in"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          {file ? (
            <div className="flex items-center gap-3 p-3 bg-accent rounded-lg w-full max-w-md">
              <File className="h-8 w-8 text-brand-purple neon-text-purple" />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <Button 
                onClick={handleAnalyzeClick} 
                className="bg-brand-purple hover:bg-brand-purpleDark neon-glow animate-on-tap"
              >
                Analyze
              </Button>
            </div>
          ) : (
            <>
              <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center neon-glow">
                <FileUp className="h-7 w-7 text-brand-purple" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Upload your resume</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Drag and drop your resume file, or click to select
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                />
                <Button type="button" variant="outline" className="mt-2 animate-on-tap">
                  <Upload className="h-4 w-4 mr-2" />
                  Select File
                </Button>
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
