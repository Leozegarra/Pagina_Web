import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import { useCart } from '../../contexts/CartContext'
import SearchBar from '../SearchBar/SearchBar';
import productos from "../../contexts/ProductosJSON";


const Layout = () => {

    const { cart } = useCart()
    const categoriasUnicas = Array.from(new Set(productos.map(p => p.categoria)));

    return (
        <>
            <div id="contenedor">
                <header id="main-header">
                    <div className="header-top">
                        <Link to="/">
                            <img src="./images/logoTech.jpeg" className="logo-header" width="150" height="60" />
                        </Link>
                        {/* Barra de Búsqueda */}
                        <SearchBar/>
                    </div>

                    <nav>
                        <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/SCategorias">Productos</Link></li>
                        <li><Link to="/login">Iniciar Sesión</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/cart"> Carrito ({cart.length})</Link></li>
                        </ul>
                    </nav>
                </header>

                <main>
                    {/*  comentario */}
                    <Outlet />
                </main>
            </div>

            <footer style={{ color: 'black', padding: '10px', textAlign: 'center' }}>
                <p>&copy; Zona Tech - 2025</p>
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', marginTop: '10px' }}>
                    {[...new Set(productos.map(p => p.categoria))].map((categoria, index) => (
                    <Link
                        key={index}
                        to={`/categorias/${encodeURIComponent(categoria)}`}
                        style={{
                        color: 'black',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                        }}
                    >
                        {categoria}
                    </Link>
                    ))}
                </div>
            </footer>


        </>
    )

}

export default Layout;
