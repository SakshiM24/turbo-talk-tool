import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { OwnerDashboardLayout } from "@/layouts/OwnerDashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Analytics from "./pages/Analytics";
import Chatbot from "./pages/Chatbot";
import Settings from "./pages/Settings";
import CustomerChat from "./pages/CustomerChat";
import CustomerDashboard from "./pages/CustomerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="business-hub-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Root redirects to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Login page */}
              <Route path="/login" element={<Login />} />
              
              {/* Customer-facing routes */}
              <Route path="/chat" element={<CustomerChat />} />
              <Route 
                path="/dashboard/customer" 
                element={
                  <ProtectedRoute requireRole="customer">
                    <CustomerDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Owner dashboard routes */}
              <Route 
                path="/dashboard/owner" 
                element={
                  <ProtectedRoute requireRole="owner">
                    <OwnerDashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="services" element={<Services />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="chatbot" element={<Chatbot />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
