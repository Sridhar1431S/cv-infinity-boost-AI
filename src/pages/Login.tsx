
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (isLogin) {
        // Simple validation
        if (email && password) {
          // Store email in localStorage for account info
          localStorage.setItem('userEmail', email);
          
          toast({
            title: "Login successful",
            description: "Welcome back to CVInfinityBoost!",
          });
          navigate('/dashboard');
        } else {
          toast({
            title: "Login failed",
            description: "Please enter both email and password.",
            variant: "destructive"
          });
        }
      } else {
        if (email && password) {
          // Store email in localStorage for account info
          localStorage.setItem('userEmail', email);
          
          toast({
            title: "Account created",
            description: "Welcome to CVInfinityBoost!",
          });
          navigate('/dashboard');
        } else {
          toast({
            title: "Registration failed",
            description: "Please enter both email and password.",
            variant: "destructive"
          });
        }
      }
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="fixed top-1/4 -left-40 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ background: 'hsl(var(--primary) / 0.2)' }} />
      <div className="fixed bottom-1/4 -right-40 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ background: 'hsl(var(--accent) / 0.2)' }} />

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl gradient-bg flex items-center justify-center shadow-[0_0_40px_-8px_hsl(var(--primary)/0.6)] animate-glow">
            <span className="text-white text-xl font-bold">CV</span>
          </div>
          <h2 className="mt-6 text-4xl font-bold font-display tracking-tight gradient-text">
            CVInfinityBoost
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Optimize your resume with AI and land your dream job
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-2xl">
              {isLogin ? "Sign in to your account" : "Create an account"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? "Enter your email to access your dashboard" 
                : "Join today to start optimizing your resume"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="hello@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : (isLogin ? "Sign in" : "Create account")}
              </Button>
              <Button
                type="button"
                variant="link"
                className="text-sm text-muted-foreground hover:text-primary"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
