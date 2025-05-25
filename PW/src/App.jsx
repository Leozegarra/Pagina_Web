import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './Home';
import Layout from './Layout';
import Login from './Login'
import Register from './Register';
import Recover from './Recover';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Layout/> }>
            {/* Rutas hijas que se renderizan dentro de Layout's Outlet */}
            <Route index element={ <Home/> } />       {/* Index es la ruta "/" */}
            <Route path="Login" element={ <Login /> } />
            <Route path="Register" element={ <Register /> } />
            <Route path="Recover" element={ <Recover /> } />




        </Route>
      </Routes>
    </Router>
  )
}

export default App
