import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';

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
const DEMO_USER: User = {
  id: 'demo-user',
  name: 'Ana Clara Vila',
  email: 'ana.clara@vilabella.com',
  phone: '(63) 99999-0000',
};

const DEMO_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    name: 'Casa',
    street: 'Av. Tocantins',
    number: '1200',
    complement: 'Ap 803, Torre B',
    neighborhood: 'Centro',
    city: 'Araguaína',
    state: 'TO',
    zipCode: '77804-010',
    isDefault: true,
  },
  {
    id: 'addr-2',
    name: 'Trabalho',
    street: 'Rua Floriano Peixoto',
    number: '450',
    complement: 'Sala 302',
    neighborhood: 'Jardim Paulista',
    city: 'Araguaína',
    state: 'TO',
    zipCode: '77803-020',
    isDefault: false,
  },
];

const DEMO_ORDERS: Order[] = [
  {
    id: 'VB12540',
    date: '2024-12-10',
    status: 'delivered',
    items: [
      { productId: '1', productName: 'Buquê Encanto de Rosas Vermelhas', quantity: 1, price: 189.9 },
      { productId: '7', productName: 'Caixa de Trufas Artesanais', quantity: 1, price: 49.9 },
    ],
    total: 239.8,
    deliveryAddress: DEMO_ADDRESSES[0],
    deliveryDate: '2024-12-11',
    deliveryPeriod: 'Manhã',
  },
  {
    id: 'VB12562',
    date: '2024-12-16',
    status: 'preparing',
    items: [
      { productId: '3', productName: 'Flower Box Elegance', quantity: 1, price: 249.9 },
      { productId: '8', productName: 'Vinho Rosé Brut', quantity: 1, price: 89.9 },
    ],
    total: 339.8,
    deliveryAddress: DEMO_ADDRESSES[1],
    deliveryDate: '2024-12-17',
    deliveryPeriod: 'Tarde',
  },
  {
    id: 'VB12570',
    date: '2024-12-18',
    status: 'confirmed',
    items: [
      { productId: '4', productName: 'Ramalhete Primavera', quantity: 2, price: 89.9 },
    ],
    total: 179.8,
    deliveryAddress: DEMO_ADDRESSES[0],
    deliveryDate: '2024-12-19',
    deliveryPeriod: 'Noite',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const hasSeededDemo = useRef(false);

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
    setIsHydrated(true);
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

  useEffect(() => {
    if (!isHydrated || hasSeededDemo.current) return;

    let seeded = false;
    if (!user) {
      setUser(DEMO_USER);
      seeded = true;
    }
    if (addresses.length === 0) {
      setAddresses(DEMO_ADDRESSES);
      seeded = true;
    }
    if (orders.length === 0) {
      setOrders(DEMO_ORDERS);
      seeded = true;
    }

    if (seeded) {
      hasSeededDemo.current = true;
    }
  }, [isHydrated, user, addresses.length, orders.length]);

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
