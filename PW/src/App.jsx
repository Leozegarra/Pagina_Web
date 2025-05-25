// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import OrderComplete from './pages/OrderComplete/OrderComplete';
import Categorias from './pages/Categorias/Categorias';
import GestorCategorias from './pages/Categorias/GCategorias';

function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-complete" element={<OrderComplete />} />
          <Route path="/Categorias" element={<Categorias />} />
          <Route path="/GestorCategorias" element={<GestorCategorias />} />

        </Routes>
      </Layout>
    </CartProvider>
  );
}

export default App;
