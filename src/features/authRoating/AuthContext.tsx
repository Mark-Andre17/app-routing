import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { IAuthContextType, IUser } from './types';

export const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    fetch('https://api.v2.react-learning.ru/users/me', {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Token invalid');
        return res.json();
      })
      .then((userData) => {
        setUser(userData);
        setToken(storedToken);
      })
      .catch(() => {
        localStorage.removeItem('token');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = (newToken: string, userData: IUser) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
