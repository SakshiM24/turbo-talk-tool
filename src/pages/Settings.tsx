import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  Bot, 
  Bell, 
  Palette, 
  Clock, 
  Globe, 
  Save,
  Mail,
  Phone,
  MapPin
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function Settings() {
  const [businessInfo, setBusinessInfo] = useState({
    name: "Elegant Beauty Salon",
    description: "Professional beauty and wellness services",
    address: "123 Beauty Street, Downtown",
    phone: "(555) 123-4567",
    email: "info@elegantbeauty.com",
    website: "www.elegantbeauty.com"
  })

  const [chatbotSettings, setChatbotSettings] = useState({
    enabled: true,
    welcomeMessage: "Hello! I'm your beauty assistant. How can I help you today?",
    businessHours: "Mon-Fri: 9AM-7PM, Sat: 8AM-6PM, Sun: 10AM-5PM",
    autoRespond: true,
    responseDelay: 1.5
  })

  const [notifications, setNotifications] = useState({
    newBookings: true,
    customerMessages: true,
    lowInventory: false,
    dailyReports: true,
    weeklyAnalytics: true
  })

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your business settings have been updated successfully!",
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your business configuration and preferences</p>
        </div>
        <Button onClick={handleSaveSettings} className="bg-gradient-primary hover:opacity-90">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Information */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Business Information
            </CardTitle>
            <CardDescription>Update your business details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={businessInfo.name}
                onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={businessInfo.description}
                onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={businessInfo.phone}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={businessInfo.email}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <Input
                id="address"
                value={businessInfo.address}
                onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                Website
              </Label>
              <Input
                id="website"
                value={businessInfo.website}
                onChange={(e) => setBusinessInfo({ ...businessInfo, website: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Chatbot Settings */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Chatbot Configuration
            </CardTitle>
            <CardDescription>Customize your AI assistant behavior and responses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Chatbot</Label>
                <p className="text-sm text-muted-foreground">Turn on/off the AI assistant</p>
              </div>
              <Switch 
                checked={chatbotSettings.enabled}
                onCheckedChange={(checked) => setChatbotSettings({ ...chatbotSettings, enabled: checked })}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="welcomeMessage">Welcome Message</Label>
              <Textarea
                id="welcomeMessage"
                value={chatbotSettings.welcomeMessage}
                onChange={(e) => setChatbotSettings({ ...chatbotSettings, welcomeMessage: e.target.value })}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="businessHours" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Business Hours
              </Label>
              <Input
                id="businessHours"
                value={chatbotSettings.businessHours}
                onChange={(e) => setChatbotSettings({ ...chatbotSettings, businessHours: e.target.value })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Response</Label>
                <p className="text-sm text-muted-foreground">Automatically respond to common questions</p>
              </div>
              <Switch 
                checked={chatbotSettings.autoRespond}
                onCheckedChange={(checked) => setChatbotSettings({ ...chatbotSettings, autoRespond: checked })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="responseDelay">Response Delay (seconds)</Label>
              <Input
                id="responseDelay"
                type="number"
                step="0.1"
                value={chatbotSettings.responseDelay}
                onChange={(e) => setChatbotSettings({ ...chatbotSettings, responseDelay: parseFloat(e.target.value) })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Choose what notifications you want to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'newBookings', label: 'New Bookings', description: 'Get notified when customers book appointments' },
              { key: 'customerMessages', label: 'Customer Messages', description: 'Alerts for new chat messages' },
              { key: 'lowInventory', label: 'Low Inventory', description: 'Warnings when products are running low' },
              { key: 'dailyReports', label: 'Daily Reports', description: 'Daily summary of business activity' },
              { key: 'weeklyAnalytics', label: 'Weekly Analytics', description: 'Weekly performance insights' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{item.label}</Label>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Switch 
                  checked={notifications[item.key as keyof typeof notifications]}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              System Status
            </CardTitle>
            <CardDescription>Current system health and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <Badge variant="secondary" className="mb-2 bg-green-500/20 text-green-700">
                  Operational
                </Badge>
                <p className="text-sm text-muted-foreground">Chatbot Status</p>
              </div>
              
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                <Badge variant="secondary" className="mb-2 bg-blue-500/20 text-blue-700">
                  Connected
                </Badge>
                <p className="text-sm text-muted-foreground">Database Status</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Backup:</span>
                <span className="text-foreground">2 hours ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Version:</span>
                <span className="text-foreground">v2.1.0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Uptime:</span>
                <span className="text-foreground">99.9%</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              View System Logs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}