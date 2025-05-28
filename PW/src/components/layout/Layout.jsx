import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import { useCart } from '../../contexts/CartContext'
import SearchBar from '../SearchBar/SearchBar';

const Layout = () => {

    const { cart } = useCart()

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
                        <li><Link to="/categorias">Categorías</Link></li>
                        <li><Link to="/productos">Productos</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
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

            <footer>
                <p>&copy; 2025 Programacion Web 2025-1</p>
            </footer>

        </>
    )

}

export default Layout;
