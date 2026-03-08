import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { Product, products } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariation?: string;
  cardMessage?: string;
  cardSignature?: string;
}

export interface Coupon {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  description: string;
}

// Valid coupons (mock)
export const VALID_COUPONS: Coupon[] = [
  { code: 'VILLABELLA10', type: 'percent', value: 10, description: '10% de desconto' },
  { code: 'BEMVINDO15', type: 'percent', value: 15, description: '15% de desconto' },
  { code: 'FRETE20', type: 'fixed', value: 20, description: 'R$ 20,00 de desconto' },
  { code: 'AMOR50', type: 'fixed', value: 50, description: 'R$ 50,00 de desconto' },
];

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variation?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateCardMessage: (productId: string, message: string, signature?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  total: number;
  coupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'villabella_cart';
const COUPON_STORAGE_KEY = 'villabella_coupon';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const hasSeededDemo = useRef(false);

  // Load cart + coupon from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      try { setItems(JSON.parse(saved)); } catch {}
    }
    const savedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
    if (savedCoupon) {
      try { setCoupon(JSON.parse(savedCoupon)); } catch {}
    }
    setIsHydrated(true);
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated]);

  // Persist coupon to localStorage
  useEffect(() => {
    if (isHydrated) {
      if (coupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    }
  }, [coupon, isHydrated]);

  // Seed demo cart
  useEffect(() => {
    if (!isHydrated || hasSeededDemo.current || items.length > 0) return;
    const sampleProducts = [
      products.find((p) => p.id === '1'),
      products.find((p) => p.id === '3'),
    ].filter(Boolean) as Product[];
    if (sampleProducts.length === 0) return;
    setItems([
      {
        product: sampleProducts[0],
        quantity: 1,
        selectedVariation: sampleProducts[0].variations?.[0]?.id,
        cardMessage: 'Parabéns pelo seu dia! Que seja lindo.',
        cardSignature: 'Com carinho, Ana',
      },
      sampleProducts[1] && {
        product: sampleProducts[1],
        quantity: 2,
        selectedVariation: sampleProducts[1].variations?.[1]?.id,
      },
    ].filter(Boolean) as CartItem[]);
    hasSeededDemo.current = true;
  }, [isHydrated, items.length]);

  const addItem = (product: Product, quantity = 1, variation?: string) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedVariation === variation
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedVariation: variation }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) { removeItem(productId); return; }
    setItems(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const updateCardMessage = (productId: string, message: string, signature?: string) => {
    setItems(prev => prev.map(item =>
      item.product.id === productId
        ? { ...item, cardMessage: message, cardSignature: signature }
        : item
    ));
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const trimmed = code.trim().toUpperCase();
    const found = VALID_COUPONS.find(c => c.code === trimmed);
    if (!found) {
      return { success: false, message: 'Cupom inválido ou expirado.' };
    }
    setCoupon(found);
    return {
      success: true,
      message: `Cupom "${found.code}" aplicado! ${found.description}.`,
    };
  };

  const removeCoupon = () => setCoupon(null);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const discount = coupon
    ? coupon.type === 'percent'
      ? Math.round((subtotal * coupon.value) / 100 * 100) / 100
      : Math.min(coupon.value, subtotal)
    : 0;

  const total = Math.max(0, subtotal - discount);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateCardMessage,
        clearCart,
        totalItems,
        subtotal,
        discount,
        total,
        coupon,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
