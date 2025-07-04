import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import { CategoriaProvider } from './contexts/CategoriaContexto';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartProvider } from './contexts/CartContext';
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderComplete from "./pages/OrderComplete/OrderComplete";
import ListUsers from "./pages/ListUsers/ListUsers";
import ListOrders from "./pages/ListOrders/ListOrders";
import DetailUser from "./pages/DetailUser/DetailUser";
import DetailOrder from "./pages/DetailOrder/DetailOrder";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
<<<<<<< HEAD
import ListProducts from "./pages/ListProducts/ListProducts";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import Login from './pages/Login/Login';
import Categorias from './pages/Categorias/Categorias';
import ProductoDetalle from './pages/DetailProduct/ProductoDetalle';

function App() {
  return (
    <CartProvider>
      <CategoriaProvider>
        <Routes>
          {/* Rutas Admin */}
          <Route path="/admin/listUsers" element={<ListUsers />} />
          <Route path="/admin/listOrders" element={<ListOrders />} />
          <Route path="/admin/listProducts" element={<ListProducts />} />
          <Route path="/admin/users/:id" element={<DetailUser />} />
          <Route path="/admin/orders/:id" element={<DetailOrder />} />
          <Route path="/admin/products/:id" element={<DetailProduct />} />
          <Route path="/admin/createProduct" element={<CreateProduct />} />

          {/* Rutas con Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-complete" element={<OrderComplete />} />
            <Route path="producto/:id" element={<ProductoDetalle />} />
            <Route path="categorias" element={<Navigate to="/categorias/laptops%20gamers" replace />} />
            <Route path="categorias/:nombreCategoria" element={<Categorias />} />
          </Route>

          {/* Ruta catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CategoriaProvider>
    </CartProvider>
=======
import ListProducts from "./pages/listProducts/ListProducts";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import Login from './pages/Login/Login';
import Cuenta from './pages/Cuenta/Cuenta';

import SCategorias from './pages/Categorias/SCategorias';
import Categorias from './pages/Categorias/Categorias';
import GestorCategorias from './pages/Categorias/GCategorias';
import ProductoDetalle from './pages/DetailProduct/ProductoDetalle';
import Register from './pages/Login/Registrar';
import Recover from './pages/Login/Recover';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <CategoriaProvider>
          <Routes>
            {/* Rutas Admin */}
      
            <Route path="/admin/listUsers" element={<ListUsers />} />
            <Route path="/admin/listOrders" element={<ListOrders />} />
            <Route path="/admin/listProducts" element={<ListProducts />} />
            <Route path="/admin/users/:id" element={<DetailUser />} />
            <Route path="/admin/orders/:id" element={<DetailOrder />} />
            <Route path="/admin/products/:id" element={<DetailProduct />} />
            <Route path="/admin/createProduct" element={<CreateProduct />} />
            <Route path="/admin/categorias" element={<Categorias />} />
            <Route path="/admin/gestorCategorias" element={<GestorCategorias />} />

            {/* Rutas con Layout */}
            <Route path="/" element={<Layout />}>
              <Route path='/register' element={<Register/>}/>
              <Route path='/recover' element={<Recover/>}/>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order-complete" element={<OrderComplete />} />
              <Route path="producto/:id" element={<ProductoDetalle />} />
              <Route path="categorias" element={<Navigate to="/categorias/laptops%20gamers" replace />} />
              <Route path="categorias/:nombreCategoria" element={<Categorias />} />
              <Route path="SCategorias" element={<SCategorias />} />
              <Route path="cuenta" element={<Cuenta />} />
            </Route>

            {/* Ruta catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CategoriaProvider>
      </CartProvider>
    </UserProvider>
>>>>>>> 098cf79 (Cambios en el carrito)
  );
}

export default App;