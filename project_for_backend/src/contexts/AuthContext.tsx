import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data - In production, this would be handled by a backend
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123', // In production, this would be hashed
    isAdmin: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
    isAdmin: false,
    createdAt: '2024-01-02T00:00:00Z'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userWithoutPassword = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        isAdmin: foundUser.isAdmin,
        createdAt: foundUser.createdAt
      };
      
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password, // In production, this would be hashed
      isAdmin: false,
      createdAt: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    
    const userWithoutPassword = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      createdAt: newUser.createdAt
    };
    
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};