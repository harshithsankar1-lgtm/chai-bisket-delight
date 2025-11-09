import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order } from '@/types';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  orders: Order[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock orders for demo
const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    items: [],
    subtotal: 850,
    tax: 76.50,
    deliveryFee: 50,
    discount: 100,
    total: 876.50,
    status: 'delivered',
    contactNumber: '+1234567890',
    paymentMethod: 'Credit Card',
    createdAt: new Date('2024-01-15'),
    deliveryAddress: {
      id: '1',
      name: 'Home',
      line1: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      isDefault: true,
    },
  },
  {
    id: 'ORD-2024-002',
    items: [],
    subtotal: 1200,
    tax: 108,
    deliveryFee: 50,
    discount: 0,
    total: 1358,
    status: 'preparing',
    contactNumber: '+1234567890',
    paymentMethod: 'UPI',
    createdAt: new Date('2024-01-20'),
    deliveryAddress: {
      id: '1',
      name: 'Home',
      line1: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      isDefault: true,
    },
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [orders] = useState<Order[]>(mockOrders);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Mock login - simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock user
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
    };
    
    setUser(mockUser);
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup - simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
    };
    
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        orders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
