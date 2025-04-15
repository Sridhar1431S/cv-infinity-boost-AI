
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, ChevronRight, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VersionEntry {
  date: string;
  score: number;
  previousScore: number;
  fileName: string;
}

interface VersionHistoryProps {
  versions?: VersionEntry[];
  isLoading?: boolean;
}

export default function VersionHistory({ versions, isLoading = false }: VersionHistoryProps) {
  const sampleVersions: VersionEntry[] = [
    { 
      date: 'Apr 12, 2025', 
      score: 82, 
      previousScore: 74, 
      fileName: 'Resume_Software_Engineer_v3.pdf'
    },
    { 
      date: 'Mar 28, 2025', 
      score: 74, 
      previousScore: 65, 
      fileName: 'Resume_Software_Engineer_v2.pdf'
    },
    { 
      date: 'Mar 15, 2025', 
      score: 65, 
      previousScore: 0, 
      fileName: 'Resume_Software_Engineer_v1.pdf'
    }
  ];
  
  const versionsToShow = isLoading ? [] : (versions || sampleVersions);
  
  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Version History</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-14 bg-gray-200 rounded"></div>
            <div className="h-14 bg-gray-200 rounded"></div>
            <div className="h-14 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <div className="space-y-0 relative">
            {versionsToShow.length > 0 ? (
              <>
                {/* Timeline line */}
                <div className="absolute left-[15px] top-6 bottom-0 w-[2px] bg-gray-200"></div>
                
                {versionsToShow.map((version, index) => (
                  <div key={index} className={cn("flex gap-3 py-3", index !== versionsToShow.length - 1 ? "border-b" : "")}>
                    <div className="relative z-10">
                      <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                        <FileText className="h-4 w-4 text-brand-purple" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm">{version.fileName}</div>
                        <Badge variant="outline" className="ml-auto">{version.date}</Badge>
                      </div>
                      <div className="flex items-center mt-1 text-sm">
                        <span>Score: {version.score}</span>
                        {version.previousScore > 0 && (
                          <span className="flex items-center text-green-600 ml-2">
                            <TrendingUp className="h-3 w-3 mr-0.5" />
                            +{version.score - version.previousScore}
                          </span>
                        )}
                        <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No version history available</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
