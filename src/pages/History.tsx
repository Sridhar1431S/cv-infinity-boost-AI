
import { useState } from 'react';
import AppNav from '@/components/layout/AppNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Search, User, Download, TrendingUp, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Footer from '@/components/layout/Footer';

interface ResumeHistoryItem {
  id: string;
  date: string;
  fileName: string;
  score: number;
  previousScore: number;
  keywords: string[];
  type: 'analysis' | 'ats-check' | 'job-match';
}

export default function History() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Sample resume history data
  const sampleHistory: ResumeHistoryItem[] = [
    {
      id: '1',
      date: 'Apr 15, 2025',
      fileName: 'Resume_Software_Engineer_v3.pdf',
      score: 82,
      previousScore: 74,
      keywords: ['React', 'TypeScript', 'UI/UX'],
      type: 'analysis'
    },
    {
      id: '2',
      date: 'Apr 10, 2025',
      fileName: 'Resume_Job_Match_Tech_Lead.pdf',
      score: 79,
      previousScore: 65,
      keywords: ['Leadership', 'Architecture', 'Team Management'],
      type: 'job-match'
    },
    {
      id: '3',
      date: 'Apr 5, 2025',
      fileName: 'Resume_ATS_Optimized.pdf',
      score: 88,
      previousScore: 72,
      keywords: ['ATS-friendly', 'Optimized', 'Keywords'],
      type: 'ats-check'
    },
    {
      id: '4',
      date: 'Mar 28, 2025',
      fileName: 'Resume_Software_Engineer_v2.pdf',
      score: 74,
      previousScore: 65,
      keywords: ['React', 'JavaScript', 'Frontend'],
      type: 'analysis'
    },
    {
      id: '5',
      date: 'Mar 15, 2025',
      fileName: 'Resume_Software_Engineer_v1.pdf',
      score: 65,
      previousScore: 0,
      keywords: ['Frontend', 'JavaScript', 'HTML/CSS'],
      type: 'analysis'
    }
  ];
  
  // Filter resume history based on search and filter
  const filteredHistory = sampleHistory
    .filter(item => 
      item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(item => filter === 'all' || item.type === filter);
  
  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'analysis': return 'Resume Analysis';
      case 'ats-check': return 'ATS Check';
      case 'job-match': return 'Job Match';
      default: return 'Analysis';
    }
  };
  
  const getTypeBadgeClass = (type: string) => {
    switch(type) {
      case 'analysis': return 'bg-brand-purple';
      case 'ats-check': return 'bg-blue-500';
      case 'job-match': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen dark bg-gradient-neon relative overflow-hidden">
      {/* Neon light effects */}
      <div className="fixed top-1/4 -left-36 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed top-3/4 -right-36 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-1/3 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      
      <AppNav />
      
      <main className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-purple-500">Resume History</h1>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search resumes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select defaultValue="all" onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="analysis">Resume Analysis</SelectItem>
                <SelectItem value="ats-check">ATS Check</SelectItem>
                <SelectItem value="job-match">Job Match</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4 flex flex-wrap">
            <TabsTrigger value="all">All History</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="highest">Highest Rated</TabsTrigger>
            <TabsTrigger value="improved">Most Improved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <Card key={item.id} className="animate-on-tap">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center shrink-0">
                          <FileText className="h-6 w-6 text-brand-purple" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">{item.fileName}</h3>
                          <div className="flex flex-wrap gap-2 mt-1 items-center">
                            <Badge variant="outline" className="flex gap-1 items-center">
                              <Calendar className="h-3 w-3" /> {item.date}
                            </Badge>
                            <Badge className={`${getTypeBadgeClass(item.type)}`}>
                              {getTypeLabel(item.type)}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {item.keywords.map((keyword, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-between items-end">
                        <div className="text-right">
                          <div className="text-lg font-bold">{item.score}<span className="text-sm">/100</span></div>
                          {item.previousScore > 0 && (
                            <div className="text-green-500 text-sm flex items-center justify-end gap-1">
                              <TrendingUp className="h-3 w-3" />
                              +{item.score - item.previousScore} points
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 mt-2 md:mt-0">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" /> Download
                          </Button>
                          <Button size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-dashed border-2">
                <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No resume history found</h2>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Try adjusting your search or filters, or analyze a resume to start building your history.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="recent" className="space-y-4">
            {/* Content for recent tab would be similar to 'all' but filtered by date */}
            <Card className="border-dashed border-2">
              <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Recent resume analyses</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Your most recent resume analyses will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="highest" className="space-y-4">
            {/* Content for highest rated tab */}
            <Card className="border-dashed border-2">
              <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Highest rated resumes</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Your highest scoring resume analyses will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="improved" className="space-y-4">
            {/* Content for most improved tab */}
            <Card className="border-dashed border-2">
              <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                <User className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Most improved resumes</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Resumes that have shown the most improvement will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}
