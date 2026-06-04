import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, User, FileEdit, Linkedin } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="rounded-lg p-4 border border-border bg-muted/40">
    <div className="flex items-center gap-3 mb-2">
      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-sm flex items-center gap-1.5">
          {title}
          <Lock className="h-3 w-3 text-primary" />
        </h3>
      </div>
    </div>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default function PremiumFeatures() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Premium features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <FeatureCard title="1-on-1 expert review" description="Personalized feedback from career experts." icon={<User className="h-4 w-4 text-primary" />} />
          <FeatureCard title="AI resume rewrite" description="Let AI rewrite your resume for stronger impact." icon={<FileEdit className="h-4 w-4 text-primary" />} />
          <FeatureCard title="LinkedIn optimization" description="Align your LinkedIn profile with your optimized resume." icon={<Linkedin className="h-4 w-4 text-primary" />} />
          <Button className="w-full mt-1">Upgrade to premium</Button>
        </div>
      </CardContent>
    </Card>
  );
}
