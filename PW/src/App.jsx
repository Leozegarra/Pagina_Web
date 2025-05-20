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

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/admin/listUsers" element={<ListUsers />} />
        <Route path="/admin/listOrders" element={<ListOrders />} />
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
