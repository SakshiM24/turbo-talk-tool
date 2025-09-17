import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Settings, RefreshCw, MessageSquare, Clock, ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  type: "user" | "bot"
  content: string
  timestamp: Date
  status?: "delivered" | "read"
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm your business assistant. I can help customers with service information, booking appointments, and answering common questions. How can I help you today?",
      timestamp: new Date(Date.now() - 5000),
    },
    {
      id: 2,
      type: "user", 
      content: "What services do you offer?",
      timestamp: new Date(Date.now() - 4000),
    },
    {
      id: 3,
      type: "bot",
      content: "We offer a variety of services including:\n\n• Hair Cut & Style ($45, 60 min)\n• Manicure & Pedicure ($35, 45 min)\n• Facial Treatment ($75, 90 min)\n• Massage Therapy ($85, 120 min)\n\nWould you like to book an appointment for any of these services?",
      timestamp: new Date(Date.now() - 3000),
    }
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: newMessage,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        type: "bot", 
        content: getBotResponse(newMessage),
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes("price") || input.includes("cost")) {
      return "Here are our current prices:\n\n• Hair Cut & Style: $45\n• Manicure & Pedicure: $35\n• Facial Treatment: $75\n• Massage Therapy: $85\n\nAll prices include consultation and aftercare advice!"
    }
    
    if (input.includes("book") || input.includes("appointment")) {
      return "I'd be happy to help you book an appointment! What service are you interested in and what day works best for you? You can also call us directly at (555) 123-4567."
    }
    
    if (input.includes("hours") || input.includes("open")) {
      return "We're open:\n\n• Monday - Friday: 9:00 AM - 7:00 PM\n• Saturday: 8:00 AM - 6:00 PM\n• Sunday: 10:00 AM - 5:00 PM\n\nWalk-ins welcome based on availability!"
    }
    
    if (input.includes("location") || input.includes("address")) {
      return "You can find us at:\n\n📍 123 Beauty Street, Downtown\nCity, State 12345\n\nWe're located right next to the main shopping center with plenty of parking available!"
    }
    
    return "Thank you for your question! For specific inquiries, please call us at (555) 123-4567 or visit our location. Our team will be happy to help you with personalized recommendations!"
  }

  const recentChats = [
    { customer: "Sarah M.", message: "What time do you close?", time: "2 mins ago", status: "answered" },
    { customer: "Mike T.", message: "Do you have availability tomorrow?", time: "15 mins ago", status: "pending" },
    { customer: "Emma K.", message: "What's included in facial?", time: "1 hour ago", status: "answered" },
  ]

  const chatStats = [
    { label: "Today's Conversations", value: "47", change: "+12%" },
    { label: "Avg Response Time", value: "1.2s", change: "-0.3s" },
    { label: "Customer Satisfaction", value: "4.6★", change: "+0.2" },
    { label: "Conversion Rate", value: "12.8%", change: "+1.4%" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chatbot</h1>
          <p className="text-muted-foreground">AI-powered customer support for your business</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {chatStats.map((stat) => (
          <Card key={stat.label} className="shadow-card border-0 bg-gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-primary opacity-60" />
              </div>
              <div className="flex items-center mt-2">
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <Card className="lg:col-span-2 shadow-elegant border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Live Chat Demo
            </CardTitle>
            <CardDescription>Test your chatbot responses</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-muted/20">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-3",
                    message.type === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    message.type === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-accent text-accent-foreground"
                  )}>
                    {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={cn(
                    "max-w-xs lg:max-w-md px-4 py-2 rounded-lg text-sm shadow-sm",
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border"
                  )}>
                    <p className="whitespace-pre-line">{message.content}</p>
                    <p className={cn(
                      "text-xs mt-1 opacity-70",
                      message.type === "user" ? "text-primary-foreground" : "text-muted-foreground"
                    )}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-card border border-border px-4 py-2 rounded-lg shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!newMessage.trim() || isTyping}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Chats Sidebar */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Recent Conversations</CardTitle>
            <CardDescription>Latest customer interactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentChats.map((chat, index) => (
              <div key={index} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sm text-foreground">{chat.customer}</p>
                  <Badge 
                    variant={chat.status === "answered" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {chat.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">{chat.time}</p>
                  {chat.status === "answered" && (
                    <ThumbsUp className="h-3 w-3 text-success" />
                  )}
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4">
              View All Conversations
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}