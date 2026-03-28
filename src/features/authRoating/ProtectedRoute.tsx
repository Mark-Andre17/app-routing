import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';
import { Spin } from 'antd';

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Spin />;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
