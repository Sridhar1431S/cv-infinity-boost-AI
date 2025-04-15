
import { useState, useEffect } from 'react';
import AppNav from '@/components/layout/AppNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { User, Settings, Mail, Key, Bookmark, Calendar, LogOut } from 'lucide-react';

export default function Account() {
  const [userEmail, setUserEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [editedName, setEditedName] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    // Load user data from localStorage
    const email = localStorage.getItem('userEmail') || '';
    setUserEmail(email);
    
    // For demo purposes, create a name from the email
    if (email) {
      const namePart = email.split('@')[0];
      const formattedName = namePart
        .split(/[._-]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
      setFullName(formattedName);
      setEditedName(formattedName);
    }
  }, []);
  
  const handleSaveProfile = () => {
    setFullName(editedName);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated.",
    });
  };
  
  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    window.location.href = '/login';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 relative overflow-hidden">
      {/* Neon light effects */}
      <div className="fixed top-1/4 -left-36 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed top-3/4 -right-36 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-1/3 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <AppNav />
      
      <main className="container mx-auto px-4 py-6 relative z-10">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <Card className="md:col-span-1 animate-on-tap">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center p-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${fullName}`} />
                <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
              </Avatar>
              
              {isEditing ? (
                <div className="w-full space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={editedName} 
                      onChange={(e) => setEditedName(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={userEmail} disabled />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveProfile} className="bg-brand-purple hover:bg-brand-purpleDark">Save</Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">{fullName}</h2>
                  <p className="text-muted-foreground">{userEmail}</p>
                  <Badge className="mt-2 bg-brand-purple">Free Plan</Badge>
                  <Button 
                    onClick={() => setIsEditing(true)} 
                    variant="outline" 
                    className="mt-4"
                  >
                    Edit Profile
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
          
          {/* Account Menu */}
          <div className="md:col-span-2 space-y-6">
            <Card className="animate-on-tap">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <Mail className="h-4 w-4 mr-2" />
                    <div className="text-left">
                      <p className="font-medium">Email Preferences</p>
                      <p className="text-xs text-muted-foreground">Manage notifications</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <Key className="h-4 w-4 mr-2" />
                    <div className="text-left">
                      <p className="font-medium">Password</p>
                      <p className="text-xs text-muted-foreground">Change your password</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <Bookmark className="h-4 w-4 mr-2" />
                    <div className="text-left">
                      <p className="font-medium">Saved Resumes</p>
                      <p className="text-xs text-muted-foreground">View your saved versions</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <div className="text-left">
                      <p className="font-medium">Subscription</p>
                      <p className="text-xs text-muted-foreground">Free plan • Upgrade</p>
                    </div>
                  </Button>
                </div>
                
                <Button 
                  onClick={handleLogout} 
                  variant="destructive" 
                  className="mt-6 w-full sm:w-auto"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
            
            <Card className="animate-on-tap">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Activity Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-start pb-3 border-b">
                    <div>
                      <p className="font-medium">Login</p>
                      <p className="text-sm text-muted-foreground">From Chrome on Windows</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Today at 10:30 AM</p>
                  </div>
                  
                  <div className="flex justify-between items-start pb-3 border-b">
                    <div>
                      <p className="font-medium">Resume Uploaded</p>
                      <p className="text-sm text-muted-foreground">resume_v2.pdf</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Yesterday at 3:45 PM</p>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Account Created</p>
                      <p className="text-sm text-muted-foreground">Welcome to CVInfinityBoost!</p>
                    </div>
                    <p className="text-xs text-muted-foreground">April 12, 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
