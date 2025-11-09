import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem } from '@/types';
import { toast } from 'sonner';

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    menuItem: MenuItem,
    quantity: number,
    customizations?: { [key: string]: string | string[] },
    specialInstructions?: string
  ) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    menuItem: MenuItem,
    quantity: number,
    customizations?: { [key: string]: string | string[] },
    specialInstructions?: string
  ) => {
    const cartItem: CartItem = {
      id: `${menuItem.id}-${Date.now()}`,
      menuItem,
      quantity,
      customizations: customizations || {},
      specialInstructions,
    };

    setCart((prev) => [...prev, cartItem]);
    toast.success(`${menuItem.name} added to cart`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      let itemPrice = item.menuItem.price;
      // Add customization prices if any
      Object.entries(item.customizations).forEach(([key, value]) => {
        const customization = item.menuItem.customizations?.find((c) => c.id === key);
        if (customization) {
          const selectedOptions = Array.isArray(value) ? value : [value];
          selectedOptions.forEach((optionId) => {
            const option = customization.options.find((o) => o.id === optionId);
            if (option) {
              itemPrice += option.priceModifier;
            }
          });
        }
      });
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
