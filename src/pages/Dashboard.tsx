import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Users, DollarSign, MessageSquare, TrendingUp, Plus } from "lucide-react"

export default function Dashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,426",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "From last month"
    },
    {
      title: "Active Customers", 
      value: "1,247",
      change: "+8.2%", 
      trend: "up",
      icon: Users,
      description: "Total customers"
    },
    {
      title: "Chat Conversations",
      value: "436",
      change: "+23.1%",
      trend: "up", 
      icon: MessageSquare,
      description: "This week"
    },
    {
      title: "Conversion Rate",
      value: "12.8%",
      change: "+2.4%",
      trend: "up",
      icon: TrendingUp, 
      description: "From chatbot leads"
    }
  ]

  const recentServices = [
    { name: "Hair Cut & Style", price: "$45", bookings: 23, status: "active" },
    { name: "Manicure & Pedicure", price: "$35", bookings: 18, status: "active" },
    { name: "Facial Treatment", price: "$75", bookings: 12, status: "active" },
    { name: "Massage Therapy", price: "$85", bookings: 8, status: "paused" }
  ]

  const recentChats = [
    { customer: "Sarah M.", message: "What time do you close today?", time: "2 mins ago", status: "answered" },
    { customer: "Mike T.", message: "Do you have availability for haircut tomorrow?", time: "15 mins ago", status: "pending" },
    { customer: "Emma K.", message: "What's included in the facial package?", time: "1 hour ago", status: "answered" },
    { customer: "John D.", message: "Can I reschedule my appointment?", time: "2 hours ago", status: "answered" }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your business performance</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 transition-all duration-200">
          <Plus className="h-4 w-4 mr-2" />
          Quick Action
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card hover:shadow-elegant transition-all duration-300 border-0 bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <span className="text-success font-medium">{stat.change}</span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Services Overview */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Popular Services</CardTitle>
                <CardDescription>Your most booked services this month</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">{service.name}</h4>
                    <Badge 
                      variant={service.status === "active" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {service.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.bookings} bookings</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{service.price}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Chat Activity */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Recent Chats</CardTitle>
                <CardDescription>Latest customer conversations</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentChats.map((chat, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                  {chat.customer.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground text-sm">{chat.customer}</p>
                    <Badge 
                      variant={chat.status === "answered" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {chat.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{chat.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}