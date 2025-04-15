
import { Circle, CheckCircle2, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ScoreStatProps {
  title: string;
  score: number;
  maxScore: number;
  color?: string;
  icon?: React.ReactNode;
}

const ScoreStat = ({ title, score, maxScore, color = "text-brand-purple", icon }: ScoreStatProps) => (
  <div className="flex items-center gap-2">
    <div className={cn("p-1.5 rounded-full bg-accent", color)}>
      {icon || <Circle className="h-4 w-4" />}
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm">{title}</span>
        <span className="font-semibold text-sm">{score}/{maxScore}</span>
      </div>
      <Progress 
        value={(score / maxScore) * 100} 
        className="h-1.5 mt-1" 
      />
    </div>
  </div>
);

export interface ResumeScore {
  overall: number;
  keywords: number;
  readability: number;
  atsCompatibility: number;
  format: number;
  sections: {
    [key: string]: boolean;
  };
}

interface ResumeScoreCardProps {
  score?: ResumeScore;
  isLoading?: boolean;
}

const defaultScore: ResumeScore = {
  overall: 0,
  keywords: 0,
  readability: 0,
  atsCompatibility: 0,
  format: 0,
  sections: {
    contact: false,
    summary: false,
    experience: false,
    education: false,
    skills: false,
  }
};

export default function ResumeScorecard({ score = defaultScore, isLoading = false }: ResumeScoreCardProps) {
  const scoreData = isLoading ? defaultScore : score;
  
  const getScoreColor = (score: number, max: number) => {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          Resume Scorecard
          <Badge className="bg-brand-purple hover:bg-brand-purpleDark ml-auto text-white">
            Score: {scoreData.overall}/100
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-4">
              <ScoreStat 
                title="Keyword Coverage" 
                score={scoreData.keywords} 
                maxScore={10}
                color={getScoreColor(scoreData.keywords, 10)}
              />
              <ScoreStat 
                title="Readability" 
                score={scoreData.readability} 
                maxScore={10}
                color={getScoreColor(scoreData.readability, 10)}
              />
              <ScoreStat 
                title="ATS Compatibility" 
                score={scoreData.atsCompatibility} 
                maxScore={10}
                color={getScoreColor(scoreData.atsCompatibility, 10)}
              />
              <ScoreStat 
                title="Format & Structure" 
                score={scoreData.format} 
                maxScore={10}
                color={getScoreColor(scoreData.format, 10)}
              />
            </div>
            
            <div className="border-t pt-3">
              <h4 className="text-sm font-medium mb-2">Resume Sections</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(scoreData.sections).map(([section, present]) => (
                  <div key={section} className="flex items-center gap-2">
                    {present ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm capitalize">{section}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
