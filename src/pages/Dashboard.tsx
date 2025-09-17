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

  const recentActivity = [
    { 
      type: "booking", 
      customer: "Sarah M.", 
      action: "Booked Hair Cut & Style", 
      time: "2 mins ago", 
      value: "$45",
      source: "chatbot"
    },
    { 
      type: "chat", 
      customer: "Mike T.", 
      action: "Asked about availability", 
      time: "15 mins ago", 
      value: "pending",
      source: "chatbot" 
    },
    { 
      type: "booking", 
      customer: "Emma K.", 
      action: "Booked Facial Treatment", 
      time: "1 hour ago", 
      value: "$75",
      source: "website"
    },
    { 
      type: "chat", 
      customer: "John D.", 
      action: "Rescheduled appointment", 
      time: "2 hours ago", 
      value: "resolved",
      source: "chatbot"
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Feed */}
        <Card className="shadow-card border-0 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Live Activity Feed</CardTitle>
                <CardDescription>Real-time customer interactions and bookings</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-green-500/20 text-green-700 border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></div>
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  activity.type === "booking" 
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white" 
                    : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                }`}>
                  {activity.customer.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground text-sm">{activity.customer}</p>
                    <Badge 
                      variant={activity.source === "chatbot" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {activity.source}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    <p className={`text-sm font-medium ${
                      activity.type === "booking" ? "text-green-600" : "text-blue-600"
                    }`}>
                      {activity.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats Sidebar */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="text-foreground">Today's Summary</CardTitle>
            <CardDescription>Key metrics for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <div>
                  <p className="text-sm text-muted-foreground">Bookings Today</p>
                  <p className="text-2xl font-bold text-foreground">8</p>
                </div>
                <div className="text-green-600 text-xs font-medium">+33%</div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                <div>
                  <p className="text-sm text-muted-foreground">Chat Conversations</p>
                  <p className="text-2xl font-bold text-foreground">23</p>
                </div>
                <div className="text-blue-600 text-xs font-medium">+18%</div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue Today</p>
                  <p className="text-2xl font-bold text-foreground">$485</p>
                </div>
                <div className="text-purple-600 text-xs font-medium">+25%</div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              View Detailed Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Services Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Services */}
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

        {/* Recent Chat Insights */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Chatbot Insights</CardTitle>
                <CardDescription>AI assistant performance metrics</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View Chatbot <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-primary">94%</p>
                <p className="text-xs text-muted-foreground">Response Rate</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-primary">1.2s</p>
                <p className="text-xs text-muted-foreground">Avg Response</p>
              </div>
            </div>
            
            {recentChats.slice(0, 3).map((chat, index) => (
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