import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import { CategoriaProv } from './contexts/CategoriaContexto';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartProvider } from './contexts/CartContext';
import Login from './pages/Login/Login';

function App() {
  return (
    <CartProvider>
      <CategoriaProv>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Route>  
          </Routes>
        </Router>
      </CategoriaProv>
    </CartProvider>
  );
}

export default App;
