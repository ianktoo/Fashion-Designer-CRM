import React, { useState } from 'react';

// Mock Auth Context
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}
export const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  // FIX: Replaced JSX with React.createElement. JSX syntax is not valid in .ts files and was causing parsing errors.
  return React.createElement(AuthContext.Provider, { value: { isAuthenticated, login, logout } }, children);
};
