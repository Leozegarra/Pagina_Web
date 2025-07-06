import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

// El carrito es un contexto que permite compartir el estado entre componentes
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Agrega producto al carrito
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  // Elimina una unidad del producto por ID
  const removeFromCart = (productId) => {
    const idx = cart.findIndex((item) => item.id === productId);
    if (idx !== -1) {
      const newCart = [...cart];
      newCart.splice(idx, 1);
      setCart(newCart);
    }
  };

  // Vacía el carrito y limpia localStorage
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
