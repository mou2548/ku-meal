import React, { createContext, useContext, useState } from 'react';

// Create context
const CartContext = createContext();

// Provider component to wrap your app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart or increase quantity if exists
  const addToCart = (item) => {
    setCartItems(prev => {
      const exists = prev.find(ci => ci.id === item.id);
      if (exists) {
        return prev.map(ci =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove one quantity or remove item entirely if quantity 1
  const removeFromCart = (itemId) => {
    setCartItems(prev => {
      return prev.reduce((acc, ci) => {
        if (ci.id === itemId) {
          if (ci.quantity > 1) {
            acc.push({ ...ci, quantity: ci.quantity - 1 });
          }
          // else skip to remove completely
        } else {
          acc.push(ci);
        }
        return acc;
      }, []);
    });
  };

  // Total items count (sum quantities)
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, totalItemsCount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
export const useCart = () => useContext(CartContext);
