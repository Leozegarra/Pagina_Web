import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home/Home";
import { CategoriaProvider } from "./contexts/CategoriaContexto";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderComplete from "./pages/OrderComplete/OrderComplete";
import ListUsers from "./pages/ListUsers/ListUsers";
import ListOrders from "./pages/ListOrders/ListOrders";
import DetailUser from "./pages/DetailUser/DetailUser";
import DetailOrder from "./pages/DetailOrder/DetailOrder";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import ListProducts from "./pages/listProducts/ListProducts";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import Login from "./pages/Login/Login";
import Cuenta from "./pages/Cuenta/Cuenta";

import SCategorias from "./pages/Categorias/SCategorias";
import Categorias from "./pages/Categorias/Categorias";
import GestorCategorias from "./pages/Categorias/GCategorias";
import ProductoDetalle from "./pages/DetailProduct/ProductoDetalle";
import Register from "./pages/Login/Registrar";
import Recover from "./pages/Login/Recover";
import { UserProvider } from "./contexts/UserContext";
import { ProductProvider } from "./contexts/ProductContext";


// Componente para proteger rutas de admin
function PrivateAdminRoute({ element }) {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  if (user && user.email === "admin@example.com" && user.password === "123456") {
    return element;
  } else {
    return <Navigate to="/login" replace />;
  }
}

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <ProductProvider>
          <CategoriaProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recover" element={<Recover />} />
              {/* Rutas Admin protegidas */}
              <Route path="/admin/listUsers" element={<PrivateAdminRoute element={<ListUsers />} />} />
              <Route path="/admin/detailUser/:id" element={<PrivateAdminRoute element={<DetailUser />} />} />
              <Route path="/admin/listOrders" element={<PrivateAdminRoute element={<ListOrders />} />} />
              <Route path="/admin/orders/:id" element={<PrivateAdminRoute element={<DetailOrder />} />} />
              <Route path="/admin/listProducts" element={<PrivateAdminRoute element={<ListProducts />} />} />
              <Route path="/admin/detailProduct/:id" element={<PrivateAdminRoute element={<DetailProduct />} />} />
              <Route path="/admin/createProduct" element={<PrivateAdminRoute element={<CreateProduct />} />} />
              <Route path="/admin/categorias" element={<PrivateAdminRoute element={<Categorias />} />} />
              <Route path="/admin/gestorCategorias" element={<PrivateAdminRoute element={<GestorCategorias />} />} />
              {/* Rutas con Layout */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="order-complete" element={<OrderComplete />} />
                <Route path="producto/:id" element={<ProductoDetalle />} />
                {/* <Route path="categorias" element={<Navigate to="/categorias/laptops%20gamers" replace />} />
                <Route path="categorias/:nombreCategoria" element={<Categorias />} /> */}
                <Route path="SCategorias" element={<SCategorias />} />
                <Route path="categorias/:nombreCategoria" element={<SCategorias />} />
                <Route path="cuenta" element={<Cuenta />} />
              </Route>
              {/* Ruta catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </CategoriaProvider>
        </ProductProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
