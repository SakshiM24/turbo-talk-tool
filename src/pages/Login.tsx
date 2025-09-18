import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Building2, Users } from "lucide-react";

const Login = () => {
  const [ownerCredentials, setOwnerCredentials] = useState({
    email: "owner@example.com",
    password: "ownerpass"
  });
  const [customerCredentials, setCustomerCredentials] = useState({
    email: "customer@example.com", 
    password: "custpass"
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (role: 'owner' | 'customer') => {
    setIsLoading(true);
    
    try {
      // Simulate authentication - in real app this would call Supabase auth
      const credentials = role === 'owner' ? ownerCredentials : customerCredentials;
      
      // Mock authentication success
      const mockToken = `mock-jwt-${role}-${Date.now()}`;
      const user = {
        id: role === 'owner' ? 'owner-123' : 'customer-456',
        email: credentials.email,
        role
      };

      // Store auth data
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userRole', role);
      localStorage.setItem('user', JSON.stringify(user));

      toast({
        title: "Login successful",
        description: `Welcome ${role}!`
      });

      // Redirect based on role
      navigate(role === 'owner' ? '/dashboard/owner' : '/dashboard/customer');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
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
          <CardDescription>Sign in to access your dashboard</CardDescription>
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
                  placeholder="owner@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner-password">Password</Label>
                <Input
                  id="owner-password"
                  type="password"
                  value={ownerCredentials.password}
                  onChange={(e) => setOwnerCredentials(prev => ({...prev, password: e.target.value}))}
                  placeholder="ownerpass"
                />
              </div>
              <Button 
                onClick={() => handleLogin('owner')} 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in as Owner"}
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
                  placeholder="customer@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-password">Password</Label>
                <Input
                  id="customer-password"
                  type="password"
                  value={customerCredentials.password}
                  onChange={(e) => setCustomerCredentials(prev => ({...prev, password: e.target.value}))}
                  placeholder="custpass"
                />
              </div>
              <Button 
                onClick={() => handleLogin('customer')} 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in as Customer"}
              </Button>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">Demo Credentials:</p>
            <p className="text-xs text-muted-foreground">Owner: owner@example.com / ownerpass</p>
            <p className="text-xs text-muted-foreground">Customer: customer@example.com / custpass</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;