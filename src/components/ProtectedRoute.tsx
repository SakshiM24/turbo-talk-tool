import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: 'owner' | 'customer';
}

export function ProtectedRoute({ children, requireRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireRole && user?.role !== requireRole) {
    // Redirect to appropriate dashboard if wrong role
    const redirectPath = user?.role === 'owner' ? '/dashboard/owner' : '/dashboard/customer';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}