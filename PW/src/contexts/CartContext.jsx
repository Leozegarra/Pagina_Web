import React, { createContext, useState, useContext, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  return useContext(CartContext)
}
// el carrito es un contexto que permite compartir el estado del carrito de compras entre componentes
// sin necesidad de pasar props manualmente a través de cada nivel del árbol de componentes.
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart')
    return storedCart ? JSON.parse(storedCart) : []
  })
// El estado del carrito se inicializa con los datos almacenados en localStorage, si existen.
// Si no hay datos en localStorage, se inicializa como un array vacío.
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])
// Cada vez que el estado del carrito cambia, se actualiza localStorage para reflejar los cambios.
  const addToCart = (product) => {
    setCart(prev => [...prev, product])
  }
// Esta función agrega un producto al carrito. Si el producto ya existe, se puede modificar para actualizar la cantidad en lugar de duplicarlo.
  const removeFromCart = (productId) => {
    const idx = cart.findIndex(item => item.id === productId)
    if (idx !== -1) {
      const newCart = [...cart]
      newCart.splice(idx, 1)
      setCart(newCart)
    }
  }
// Esta función elimina un producto del carrito basado en su ID. Si el producto no se encuentra, no hace nada.
// Se busca el índice del producto en el carrito y, si se encuentra, se elimina.
// Si no se encuentra, no se realiza ninguna acción.
  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }
// Esta función vacía el carrito y también elimina los datos del carrito de localStorage para limpiar el estado persistente.
  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart
  }
// El objeto `value` contiene el estado del carrito y las funciones para modificarlo.
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>// El proveedor del contexto CartContext envuelve a los hijos, permitiendo que accedan al estado del carrito y las funciones definidas.
  )
}

