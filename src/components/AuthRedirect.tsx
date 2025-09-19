import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function AuthRedirect() {
  const { isAuthenticated, isOwner, isCustomer } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (isOwner) {
        navigate('/dashboard/owner', { replace: true });
      } else if (isCustomer) {
        navigate('/dashboard/customer', { replace: true });
      }
    }
  }, [isAuthenticated, isOwner, isCustomer, navigate]);

  return null;
}