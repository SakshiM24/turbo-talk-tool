import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Building2, Users } from "lucide-react";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [ownerCredentials, setOwnerCredentials] = useState({
    email: "",
    password: ""
  });
  const [customerCredentials, setCustomerCredentials] = useState({
    email: "", 
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();

  const handleAuth = async (role: 'owner' | 'customer') => {
    setIsLoading(true);
    
    try {
      const credentials = role === 'owner' ? ownerCredentials : customerCredentials;
      
      if (!credentials.email || !credentials.password) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive"
        });
        return;
      }

      let result;
      if (isSignUp) {
        result = await signUp(credentials.email, credentials.password, role);
      } else {
        result = await signIn(credentials.email, credentials.password);
      }

      if (result.error) {
        toast({
          title: isSignUp ? "Sign up failed" : "Sign in failed",
          description: result.error,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: isSignUp ? "Sign up successful" : "Sign in successful",
        description: isSignUp ? "Please check your email to verify your account" : `Welcome back!`
      });

      if (!isSignUp) {
        // Navigation will be handled by auth state change
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to TurboTalk</CardTitle>
          <CardDescription>
            {isSignUp ? "Create your account" : "Sign in to access your dashboard"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="owner" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="owner" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Owner
              </TabsTrigger>
              <TabsTrigger value="customer" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Customer
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="owner" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="owner-email">Email</Label>
                <Input
                  id="owner-email"
                  type="email"
                  value={ownerCredentials.email}
                  onChange={(e) => setOwnerCredentials(prev => ({...prev, email: e.target.value}))}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner-password">Password</Label>
                <Input
                  id="owner-password"
                  type="password"
                  value={ownerCredentials.password}
                  onChange={(e) => setOwnerCredentials(prev => ({...prev, password: e.target.value}))}
                  placeholder="Enter your password"
                />
              </div>
              <Button 
                onClick={() => handleAuth('owner')} 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : isSignUp ? "Sign up as Owner" : "Sign in as Owner"}
              </Button>
            </TabsContent>
            
            <TabsContent value="customer" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="customer-email">Email</Label>
                <Input
                  id="customer-email"
                  type="email"
                  value={customerCredentials.email}
                  onChange={(e) => setCustomerCredentials(prev => ({...prev, email: e.target.value}))}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-password">Password</Label>
                <Input
                  id="customer-password"
                  type="password"
                  value={customerCredentials.password}
                  onChange={(e) => setCustomerCredentials(prev => ({...prev, password: e.target.value}))}
                  placeholder="Enter your password"
                />
              </div>
              <Button 
                onClick={() => handleAuth('customer')} 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : isSignUp ? "Sign up as Customer" : "Sign in as Customer"}
              </Button>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-muted-foreground"
            >
              {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;