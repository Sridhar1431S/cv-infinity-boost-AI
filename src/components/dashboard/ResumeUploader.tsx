import { useState, useCallback, useRef } from 'react';
import { FileUp, Upload, File as FileIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

export default function ResumeUploader({ onUpload }: { onUpload?: (file: File | null) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' ||
        droppedFile.type === 'application/msword' ||
        droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      handleFileSelected(droppedFile);
    } else {
      toast({ title: "Invalid file format", description: "Please upload a PDF or Word document.", variant: "destructive" });
    }
  }, [toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFileSelected(selectedFile);
  };

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
    toast({ title: "Resume uploaded", description: `${selectedFile.name} has been uploaded.` });
    if (onUpload) onUpload(selectedFile);
  };

  const handleDeleteFile = () => {
    setFile(null);
    toast({ title: "File removed", description: "Resume file removed." });
    if (onUpload) onUpload(null);
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center transition-all bg-muted/40",
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-slate-300"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border max-w-md mx-auto">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <FileIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 overflow-hidden text-left">
              <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <Button onClick={handleDeleteFile} variant="ghost" size="icon" aria-label="Remove file">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <FileUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Upload your resume</h3>
              <p className="text-sm text-muted-foreground mt-1">Drag and drop, or click to select</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX up to 5MB</p>
            </div>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => { if (inputRef.current) { inputRef.current.value = ''; inputRef.current.click(); } }}
            >
              <Upload className="h-4 w-4" /> Select file
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
