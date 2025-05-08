// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import ItemList from './itemList';
import ItemDetails from './ItemDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Layout/> }>
            {/* Rutas hijas que se renderizan dentro de Layout's Outlet */}
            <Route index element={ <Home/> } />       {/* Index es la ruta "/" */}
            <Route path="/lista" element={ <ItemList/> } />
            <Route path="/items/:id" element={ <ItemDetails/> } />
            <Route path="about" element={ <About /> } />
            <Route path="contact" element={ <Contact/> } />
            

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
  