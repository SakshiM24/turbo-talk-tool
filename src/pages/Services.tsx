import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, MoreVertical, Clock, DollarSign, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import hairServiceIcon from "@/assets/hair-service-icon.png"
import nailServiceIcon from "@/assets/nail-service-icon.png"
import skincareServiceIcon from "@/assets/skincare-service-icon.png"
import wellnessServiceIcon from "@/assets/wellness-service-icon.png"

export default function Services() {
  const getServiceIcon = (category: string) => {
    switch (category) {
      case "Hair Services":
        return hairServiceIcon
      case "Nail Services":
        return nailServiceIcon
      case "Skincare":
        return skincareServiceIcon
      case "Wellness":
        return wellnessServiceIcon
      default:
        return hairServiceIcon
    }
  }

  const [services, setServices] = useState([
    {
      id: 1,
      name: "Hair Cut & Style",
      description: "Professional haircut with styling and consultation",
      price: 45,
      duration: 60,
      bookings: 23,
      status: "active",
      category: "Hair Services",
      color: "from-purple-500 to-blue-500"
    },
    {
      id: 2,
      name: "Manicure & Pedicure",
      description: "Complete nail care package with polish",
      price: 35,
      duration: 45,
      bookings: 18,
      status: "active", 
      category: "Nail Services",
      color: "from-pink-500 to-purple-500"
    },
    {
      id: 3,
      name: "Facial Treatment",
      description: "Deep cleansing facial with moisturizing treatment",
      price: 75,
      duration: 90,
      bookings: 12,
      status: "active",
      category: "Skincare",
      color: "from-green-500 to-teal-500"
    },
    {
      id: 4,
      name: "Massage Therapy",
      description: "Relaxing full body massage with aromatherapy",
      price: 85,
      duration: 120,
      bookings: 8,
      status: "paused",
      category: "Wellness",
      color: "from-orange-500 to-red-500"
    }
  ])

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: ""
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddService = () => {
    if (newService.name && newService.price) {
      const service = {
        id: services.length + 1,
        name: newService.name,
        description: newService.description,
        price: parseFloat(newService.price),
        duration: parseInt(newService.duration) || 30,
        bookings: 0,
        status: "active" as const,
        category: newService.category || "General",
        color: "from-purple-500 to-blue-500" // Default gradient color
      }
      setServices([...services, service])
      setNewService({ name: "", description: "", price: "", duration: "", category: "" })
      setIsDialogOpen(false)
    }
  }

  const toggleServiceStatus = (id: number) => {
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, status: service.status === "active" ? "paused" : "active" }
        : service
    ))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground">Manage your business services and pricing</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90 transition-all duration-200">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Create a new service for your business
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Hair Cut & Style"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description of the service"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="45"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (min)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="60"
                    value={newService.duration}
                    onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Hair Services"
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddService} className="bg-gradient-primary">
                Add Service
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="shadow-card hover:shadow-elegant transition-all duration-300 border-0 overflow-hidden group">
            {/* Service Header with Icon */}
            <div className={`h-20 bg-gradient-to-r ${service.color} relative`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute -bottom-6 left-6">
                <div className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center border-2 border-white">
                  <img 
                    src={getServiceIcon(service.category)} 
                    alt={service.category}
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Service
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleServiceStatus(service.id)}>
                      {service.status === "active" ? "Pause Service" : "Activate Service"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <CardHeader className="pt-8 pb-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                    {service.name}
                  </CardTitle>
                  <Badge 
                    variant={service.status === "active" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {service.status}
                  </Badge>
                </div>
                <CardDescription className="text-sm line-clamp-2">{service.description}</CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center gap-1 text-primary mb-1">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">${service.price}</p>
                  <p className="text-xs text-muted-foreground">Price</p>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center gap-1 text-primary mb-1">
                    <Clock className="h-4 w-4" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{service.duration}</p>
                  <p className="text-xs text-muted-foreground">Minutes</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <div className="flex items-center gap-2 text-primary">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">Bookings</span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{service.bookings}</p>
                  <p className="text-xs text-muted-foreground">this month</p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  <span className="font-medium text-primary">{service.category}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}