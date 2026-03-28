import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { PublicPage } from './PublicPage';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { ProtectedRoute } from './ProtectedRoute';
import { ProfilePage } from './ProfilePage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/public" replace />} />
          <Route path="/public" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/public" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
