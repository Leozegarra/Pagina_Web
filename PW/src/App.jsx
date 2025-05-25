// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderComplete from "./pages/OrderComplete/OrderComplete";
import ListUsers from "./pages/ListUsers/ListUsers";
import ListOrders from "./pages/ListOrders/ListOrders";
import DetailUser from "./pages/DetailUser/DetailUser";
import DetailOrder from "./pages/DetailOrder/DetailOrder";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import ListProducts from "./pages/ListProducts/ListProducts";
import CreateProduct from "./pages/CreateProduct/CreateProduct";



function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/admin/listUsers" element={<ListUsers />} />
        <Route path="/admin/listOrders" element={<ListOrders />} />
        <Route path="/admin/listProducts" element={<ListProducts />} />
        <Route path="/admin/users/:id" element={<DetailUser />} />
        <Route path="/admin/orders/:id" element={<DetailOrder />} />
        <Route path="/admin/products/:id" element={<DetailProduct />} />
        <Route path="/admin/createProduct" element={<CreateProduct />} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-complete" element={<OrderComplete />} />

              </Routes>
            </Layout>
          }
        />
      </Routes>
    </CartProvider>
  );
}

export default App;
