
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80 relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      {/* Neon light effects */}
      <div className="fixed top-1/4 -left-36 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed top-3/4 -right-36 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-1/3 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full gradient-bg flex items-center justify-center">
            <span className="text-white text-xl font-bold">CV</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
            CVInfinityBoost
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Optimize your resume with AI and land your dream job
          </p>
        </div>

        <Card className="animate-on-tap">
          <CardHeader>
            <CardTitle>{isLogin ? "Sign in to your account" : "Create an account"}</CardTitle>
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
                className="w-full bg-brand-purple hover:bg-brand-purpleDark"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : (isLogin ? "Sign in" : "Create account")}
              </Button>
              <Button 
                type="button"
                variant="link"
                className="text-sm text-gray-600"
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
