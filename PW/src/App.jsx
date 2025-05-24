import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import { CategoriaProv } from './CategoriaContexto';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartProvider } from './CartContext';
import Login from './Login';

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
