// src/contexts/CartContext.jsx
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  const updateQuantity = (id, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const moveToSaved = (id) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      setCartItems(prev => prev.filter(i => i.id !== id));
      setSavedItems(prev => [...prev, item]);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, updateQuantity, removeItem, moveToSaved, savedItems, total }}
    >
      {children}
    </CartContext.Provider>
  );
};
