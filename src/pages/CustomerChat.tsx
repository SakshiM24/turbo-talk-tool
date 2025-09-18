import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  type: "user" | "bot"
  content: string
  timestamp: Date
}

export default function CustomerChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content: "Hello! Welcome to our business! 👋 I'm your AI assistant and I'm here to help you with:\n\n• Service information & pricing\n• Booking appointments\n• Business hours & location\n• Answering any questions\n\nHow can I help you today?",
      timestamp: new Date(Date.now() - 2000),
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
      return "Here are our service prices:\n\n💇 BEAUTY & WELLNESS:\n• Hair Cut & Style: $45\n• Manicure & Pedicure: $35\n• Facial Treatment: $75\n• Massage Therapy: $85\n\n🍽️ RESTAURANT:\n• Private Dining: $150/table\n• Catering Services: $25/person\n• Chef's Special Menu: $65/person\n\n🚗 AUTO SERVICES:\n• Oil Change: $35\n• Full Inspection: $125\n• Tire Rotation: $45\n\n💪 FITNESS:\n• Personal Training: $75/session\n• Group Classes: $25/class\n• Monthly Membership: $89\n\nAll prices include consultation and premium service!"
    }
    
    if (input.includes("book") || input.includes("appointment") || input.includes("schedule")) {
      return "Perfect! I can help you book an appointment right now. 🗓️\n\nWhat service are you interested in?\n• Beauty & Wellness\n• Restaurant Reservations\n• Auto Services\n• Fitness Training\n\nOnce you tell me the service and preferred time, I'll confirm your booking instantly! You can also call us at (555) 123-4567 for immediate assistance."
    }

    if (input.includes("confirm") || input.includes("yes") || input.includes("okay")) {
      return "🎉 BOOKING CONFIRMED! 🎉\n\nYour appointment has been successfully scheduled:\n\n📅 Date: Tomorrow at 3:00 PM\n⏰ Duration: 60 minutes\n📍 Location: 123 Business Street\n💰 Price: $45\n\n✅ You are booked!\n\nYou'll receive a confirmation SMS shortly. Need to reschedule? Just let me know!\n\nSee you tomorrow! 😊"
    }
    
    if (input.includes("hours") || input.includes("open") || input.includes("time")) {
      return "We're open 7 days a week! 🕒\n\n• Monday - Friday: 9:00 AM - 7:00 PM\n• Saturday: 8:00 AM - 6:00 PM\n• Sunday: 10:00 AM - 5:00 PM\n\nWalk-ins welcome based on availability! Peak hours are typically 2-5 PM on weekdays."
    }
    
    if (input.includes("location") || input.includes("address") || input.includes("where")) {
      return "You can find us at:\n\n📍 123 Business Street, Downtown\nCity, State 12345\n\n🅿️ Free parking available\n🚇 Metro stop: Downtown Center (2 min walk)\n\nWe're located in the main business district, easy to find with plenty of parking!"
    }

    if (input.includes("cancel") || input.includes("reschedule")) {
      return "No problem! I can help you with that.\n\n• To cancel: No fees if cancelled 24+ hours ahead\n• To reschedule: I can find you a new time slot\n\nWhat would you prefer? Just let me know your booking reference or the service you had scheduled."
    }

    if (input.includes("services") || input.includes("what do you")) {
      return "We offer services across multiple categories! 🌟\n\n💅 BEAUTY & WELLNESS:\n• Hair styling, nails, facials, massage\n\n🍽️ RESTAURANT:\n• Fine dining, catering, private events\n\n🚗 AUTO SERVICES:\n• Maintenance, repairs, inspections\n\n💪 FITNESS:\n• Personal training, group classes, memberships\n\nWhich category interests you? I can provide detailed information!"
    }

    if (input.includes("payment") || input.includes("pay")) {
      return "We accept all major payment methods! 💳\n\n• Credit/Debit cards (Visa, MasterCard, Amex)\n• Digital payments (Apple Pay, Google Pay)\n• Cash\n• Buy now, pay later options\n\nPayment is due at time of service. We also offer package deals and memberships with discounts!"
    }
    
    return "Thank you for reaching out! 😊 I'm here to help with:\n\n• Service information & pricing\n• Booking appointments\n• Business hours & location\n• Payment options\n• Cancellations & rescheduling\n\nWhat would you like to know? You can also call us at (555) 123-4567 for immediate assistance!"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Customer Support</h1>
          <p className="text-muted-foreground">Chat with our AI assistant for instant help</p>
        </div>

        {/* Chat Interface */}
        <Card className="shadow-elegant border-0 max-w-2xl mx-auto">
          <CardHeader className="bg-gradient-primary text-primary-foreground">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Assistant
              <div className="ml-auto flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Online</span>
              </div>
            </CardTitle>
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
                  placeholder="Ask about services, booking, or anything else..."
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
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Powered by AI • Response time: ~1-2 seconds
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setNewMessage("What services do you offer?")
              handleSendMessage()
            }}
          >
            View Services
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setNewMessage("I want to book an appointment")
              handleSendMessage()
            }}
          >
            Book Now
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setNewMessage("What are your hours?")
              handleSendMessage()
            }}
          >
            Hours & Location
          </Button>
        </div>
      </div>
    </div>
  )
}