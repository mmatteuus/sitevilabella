import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered';
  items: { productId: string; productName: string; quantity: number; price: number }[];
  total: number;
  deliveryAddress: Address;
  deliveryDate: string;
  deliveryPeriod: string;
}

interface AuthContextType {
  user: User | null;
  addresses: Address[];
  orders: Order[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  addOrder: (order: Omit<Order, 'id'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'villabella_user';
const ADDRESSES_STORAGE_KEY = 'villabella_addresses';
const ORDERS_STORAGE_KEY = 'villabella_orders';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    const savedAddresses = localStorage.getItem(ADDRESSES_STORAGE_KEY);
    const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to load user');
      }
    }
    if (savedAddresses) {
      try {
        setAddresses(JSON.parse(savedAddresses));
      } catch (e) {
        console.error('Failed to load addresses');
      }
    }
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error('Failed to load orders');
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production would call API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (email && password.length >= 6) {
      setUser({
        id: '1',
        name: email.split('@')[0],
        email,
      });
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock register
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (name && email && password.length >= 6) {
      setUser({
        id: Date.now().toString(),
        name,
        email,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress = { ...address, id: Date.now().toString() };
    if (newAddress.isDefault) {
      setAddresses(prev => [...prev.map(a => ({ ...a, isDefault: false })), newAddress]);
    } else {
      setAddresses(prev => [...prev, newAddress]);
    }
  };

  const updateAddress = (id: string, data: Partial<Address>) => {
    setAddresses(prev =>
      prev.map(addr => {
        if (addr.id === id) {
          const updated = { ...addr, ...data };
          if (updated.isDefault) {
            return updated;
          }
          return updated;
        }
        if (data.isDefault) {
          return { ...addr, isDefault: false };
        }
        return addr;
      })
    );
  };

  const removeAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const addOrder = (order: Omit<Order, 'id'>) => {
    const newOrder = { ...order, id: `VB${Date.now()}` };
    setOrders(prev => [newOrder, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        addresses,
        orders,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        removeAddress,
        addOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
