
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, User, FileEdit, Linkedin } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="bg-accent/50 rounded-lg p-4 border border-accent">
    <div className="flex items-center gap-3 mb-2">
      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <div>
        <h3 className="font-medium flex items-center gap-1.5">
          {title}
          <Lock className="h-3.5 w-3.5 text-brand-purple" />
        </h3>
      </div>
    </div>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default function PremiumFeatures() {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Premium Features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <FeatureCard
            title="1-on-1 Expert Review"
            description="Get personalized feedback on your resume from our career experts"
            icon={<User className="h-5 w-5 text-brand-purple" />}
          />
          <FeatureCard
            title="AI Resume Rewrite"
            description="Let our AI rewrite your resume for better results and higher chances"
            icon={<FileEdit className="h-5 w-5 text-brand-purple" />}
          />
          <FeatureCard
            title="LinkedIn Optimization"
            description="Optimize your LinkedIn profile to match your improved resume"
            icon={<Linkedin className="h-5 w-5 text-brand-purple" />}
          />
          
          <Button className="w-full mt-1 bg-brand-purple hover:bg-brand-purpleDark">
            Upgrade to Premium
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
