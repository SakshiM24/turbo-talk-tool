import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { MessageCircle, Calendar, Clock, Star, LogOut } from "lucide-react";
import hairIcon from "@/assets/hair-service-icon.png";
import nailIcon from "@/assets/nail-service-icon.png";
import skincareIcon from "@/assets/skincare-service-icon.png";
import wellnessIcon from "@/assets/wellness-service-icon.png";

// Customer-safe service data (no sensitive information)
const customerServices = [
  {
    id: "s1",
    name: "Premium Haircut & Style",
    price: 200,
    duration: "60m",
    shortDescription: "Professional haircut with styling consultation",
    category: "Hair",
    icon: hairIcon,
    rating: 4.8
  },
  {
    id: "s2", 
    name: "Luxury Manicure",
    price: 150,
    duration: "45m", 
    shortDescription: "Complete nail care with premium polish",
    category: "Nails",
    icon: nailIcon,
    rating: 4.9
  },
  {
    id: "s3",
    name: "Anti-Aging Facial",
    price: 350,
    duration: "75m",
    shortDescription: "Advanced skincare treatment for younger-looking skin",
    category: "Skincare", 
    icon: skincareIcon,
    rating: 4.7
  },
  {
    id: "s4",
    name: "Relaxation Massage",
    price: 300,
    duration: "60m",
    shortDescription: "Full body massage for ultimate relaxation",
    category: "Wellness",
    icon: wellnessIcon,
    rating: 4.6
  }
];

const myBookings = [
  {
    id: "b1",
    service: "Premium Haircut & Style", 
    date: "2024-01-20",
    time: "2:00 PM",
    status: "confirmed"
  },
  {
    id: "b2",
    service: "Luxury Manicure",
    date: "2024-01-25", 
    time: "11:00 AM",
    status: "pending"
  }
];

const CustomerDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">TurboTalk</h1>
            <p className="text-sm text-muted-foreground">Welcome, {user?.email}</p>
          </div>
          <Button variant="outline" onClick={logout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Book Your Services</h2>
          <p className="text-muted-foreground">Discover and book our premium services</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageCircle className="h-5 w-5 text-primary" />
                Chat Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Get instant help with our AI assistant</p>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-primary" />
                My Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{myBookings.length} upcoming appointments</p>
              <Button variant="outline" className="w-full">View All</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Star className="h-5 w-5 text-primary" />
                Loyalty Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">You have 850 points</p>
              <Button variant="outline" className="w-full">Redeem</Button>
            </CardContent>
          </Card>
        </div>

        {/* Available Services */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Available Services</CardTitle>
            <CardDescription>Book your next appointment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {customerServices.map((service) => (
                <Card key={service.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={service.icon} alt={service.category} className="w-8 h-8" />
                      <Badge variant="secondary">{service.category}</Badge>
                    </div>
                    <h3 className="font-semibold mb-1">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{service.shortDescription}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-primary">₹{service.price}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{service.duration}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{service.rating}</span>
                      </div>
                    </div>
                    <Button className="w-full" size="sm">Book Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>My Upcoming Bookings</CardTitle>
            <CardDescription>Manage your appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myBookings.map((booking) => (
                <div key={booking.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{booking.service}</h4>
                    <p className="text-sm text-muted-foreground">{booking.date} at {booking.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                      {booking.status}
                    </Badge>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;