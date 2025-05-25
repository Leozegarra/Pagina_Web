import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import { CategoriaProvider } from './contexts/CategoriaContexto';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartProvider } from './contexts/CartContext';
import Login from './pages/Login/Login';
import Categorias from './pages/Categorias/Categorias';
import ProductoDetalle from './pages/DetailProduct/ProductoDetalle';

function App() {
  return (
    <CartProvider>
      <CategoriaProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/producto/:id" element={<ProductoDetalle />} />

              {/* ✅ Ruta general para categorías (opcionalmente redirigida) */}
              <Route path="/categorias" element={<Navigate to="/categorias/laptops%20gamers" />} />

              {/* ✅ Ruta dinámica por nombre de categoría */}
              <Route path="/categorias/:nombreCategoria" element={<Categorias />} />
            </Route>
          </Routes>
        </Router>
      </CategoriaProvider>
    </CartProvider>
  );
}

export default App;

