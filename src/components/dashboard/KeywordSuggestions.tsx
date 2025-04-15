
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, HelpCircle, Info, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Keyword {
  text: string;
  type: 'missing' | 'weak' | 'good';
  suggestion?: string;
  premium?: boolean;
}

interface KeywordSuggestionsProps {
  keywords?: Keyword[];
  isLoading?: boolean;
}

export default function KeywordSuggestions({ keywords, isLoading = false }: KeywordSuggestionsProps) {
  const sampleKeywords: Keyword[] = [
    { text: "project management", type: "missing", suggestion: "Add experiences demonstrating project management skills" },
    { text: "problem solving", type: "weak", suggestion: "Strengthen with specific examples", premium: true },
    { text: "communication", type: "good" },
    { text: "team leadership", type: "missing", suggestion: "Include leadership examples" },
    { text: "data analysis", type: "weak", suggestion: "Quantify your data analysis achievements", premium: true },
  ];
  
  const keywordsToShow = isLoading ? [] : (keywords || sampleKeywords);
  
  const getKeywordIcon = (type: string) => {
    switch(type) {
      case 'missing':
        return <AlertTriangle className="h-3.5 w-3.5 text-red-500" />;
      case 'weak':
        return <Info className="h-3.5 w-3.5 text-amber-500" />;
      case 'good':
        return <CheckCircle className="h-3.5 w-3.5 text-green-500" />;
      default:
        return <HelpCircle className="h-3.5 w-3.5" />;
    }
  };
  
  const getKeywordColor = (type: string) => {
    switch(type) {
      case 'missing':
        return "bg-red-100 text-red-800";
      case 'weak':
        return "bg-amber-100 text-amber-800";
      case 'good':
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Keyword Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-14 bg-gray-200 rounded"></div>
            <div className="h-14 bg-gray-200 rounded"></div>
            <div className="h-14 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {keywordsToShow.length > 0 ? (
              keywordsToShow.map((keyword, index) => (
                <div key={index} className="rounded-md bg-gray-50 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getKeywordIcon(keyword.type)}
                      <Badge className={cn("font-normal", getKeywordColor(keyword.type))}>
                        {keyword.text}
                      </Badge>
                    </div>
                    {keyword.type !== 'good' && (
                      <div className="text-xs text-muted-foreground">
                        {keyword.type === 'missing' ? 'Missing' : 'Needs Improvement'}
                      </div>
                    )}
                  </div>
                  
                  {keyword.suggestion && (
                    <div className="mt-2 text-sm">
                      <div className="flex items-start gap-2">
                        <div className="flex-1">
                          <p className="text-gray-600">
                            {keyword.suggestion}
                            {keyword.premium && (
                              <span className="inline-flex items-center ml-1 text-brand-purple">
                                <Lock className="h-3 w-3 mr-0.5" /> Premium
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">Upload your resume to get keyword suggestions</p>
              </div>
            )}
            
            {keywordsToShow.length > 0 && (
              <Button variant="outline" className="w-full mt-2">
                View All Keywords
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
