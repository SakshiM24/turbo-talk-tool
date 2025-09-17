import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, MoreVertical, Clock, DollarSign, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Services() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Hair Cut & Style",
      description: "Professional haircut with styling",
      price: 45,
      duration: 60,
      bookings: 23,
      status: "active",
      category: "Hair Services"
    },
    {
      id: 2,
      name: "Manicure & Pedicure",
      description: "Complete nail care package",
      price: 35,
      duration: 45,
      bookings: 18,
      status: "active", 
      category: "Nail Services"
    },
    {
      id: 3,
      name: "Facial Treatment",
      description: "Deep cleansing facial with moisturizing",
      price: 75,
      duration: 90,
      bookings: 12,
      status: "active",
      category: "Skincare"
    },
    {
      id: 4,
      name: "Massage Therapy",
      description: "Relaxing full body massage",
      price: 85,
      duration: 120,
      bookings: 8,
      status: "paused",
      category: "Wellness"
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
        category: newService.category || "General"
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
          <Card key={service.id} className="shadow-card hover:shadow-elegant transition-all duration-300 border-0">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg text-foreground">{service.name}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
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
              <Badge 
                variant={service.status === "active" ? "default" : "secondary"}
                className="w-fit"
              >
                {service.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>Price</span>
                </div>
                <span className="font-semibold text-foreground">${service.price}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Duration</span>
                </div>
                <span className="text-foreground">{service.duration} min</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Bookings</span>
                </div>
                <span className="text-foreground">{service.bookings} this month</span>
              </div>
              
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Category: <span className="font-medium">{service.category}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}