import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { TrendingUp, TrendingDown, Users, MessageSquare, Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generateBusinessReport } from "@/utils/pdfGenerator"
import { toast } from "@/hooks/use-toast"

export default function Analytics() {
  // Sample data for charts
  const revenueData = [
    { month: "Jan", revenue: 4200, customers: 120, chats: 340 },
    { month: "Feb", revenue: 3800, customers: 105, chats: 280 },
    { month: "Mar", revenue: 5200, customers: 135, chats: 420 },
    { month: "Apr", revenue: 4800, customers: 128, chats: 380 },
    { month: "May", revenue: 6100, customers: 152, chats: 510 },
    { month: "Jun", revenue: 7200, customers: 178, chats: 620 },
  ]

  const serviceData = [
    { name: "Hair Services", value: 45, bookings: 156 },
    { name: "Nail Services", value: 25, bookings: 89 },
    { name: "Skincare", value: 20, bookings: 67 },  
    { name: "Wellness", value: 10, bookings: 23 },
  ]

  const chartColors = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--success))", "hsl(var(--warning))"]

  const weeklyStats = [
    { day: "Mon", visitors: 45, conversions: 12 },
    { day: "Tue", visitors: 52, conversions: 15 },
    { day: "Wed", visitors: 38, conversions: 8 },
    { day: "Thu", visitors: 67, conversions: 22 },
    { day: "Fri", visitors: 89, conversions: 28 },
    { day: "Sat", visitors: 124, conversions: 45 },
    { day: "Sun", visitors: 98, conversions: 32 },
  ]

  const chatbotMetrics = [
    { metric: "Response Rate", value: "94.2%", change: "+2.1%", trend: "up" },
    { metric: "Avg Response Time", value: "1.2s", change: "-0.3s", trend: "up" },
    { metric: "Customer Satisfaction", value: "4.6/5", change: "+0.2", trend: "up" },
    { metric: "Conversion Rate", value: "12.8%", change: "+1.4%", trend: "up" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Track your business performance and insights</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={() => {
          generateBusinessReport()
          toast({
            title: "Report Generated",
            description: "Your monthly business report has been downloaded successfully!",
          })
        }}>
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {chatbotMetrics.map((metric) => (
          <Card key={metric.metric} className="shadow-card border-0 bg-gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.metric}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-success" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                <span className="text-success font-medium">{metric.change}</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="shadow-card border-0 col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Revenue & Customer Growth
            </CardTitle>
            <CardDescription>Monthly revenue and customer acquisition trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stackId="1"
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
                <Area 
                  type="monotone" 
                  dataKey="customers" 
                  stackId="2"
                  stroke="hsl(var(--accent))" 
                  fill="hsl(var(--accent))"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Service Popularity
            </CardTitle>
            <CardDescription>Distribution of service bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Conversion */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Weekly Conversions
            </CardTitle>
            <CardDescription>Visitor to customer conversion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyStats}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Bar dataKey="visitors" fill="hsl(var(--muted))" radius={4} />
                <Bar dataKey="conversions" fill="hsl(var(--primary))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Top Performing Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {serviceData.map((service, index) => (
              <div key={service.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: chartColors[index] }}
                  />
                  <span className="font-medium text-foreground">{service.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{service.bookings}</p>
                  <p className="text-xs text-muted-foreground">bookings</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Customer Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">New Customers</span>
                <span className="font-semibold text-success">+23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Returning Customers</span>
                <span className="font-semibold text-foreground">87%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg. Booking Value</span>
                <span className="font-semibold text-foreground">$52</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer Lifetime Value</span>
                <span className="font-semibold text-foreground">$342</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => {
              generateBusinessReport()
              toast({
                title: "Monthly Report",
                description: "Your detailed business report has been downloaded!",
              })
            }}>
              <Download className="h-4 w-4" />
              Download Monthly Report
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Users className="h-4 w-4" />
              Customer Demographics
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <MessageSquare className="h-4 w-4" />
              Chatbot Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}