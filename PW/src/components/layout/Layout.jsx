import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import SearchBar from '../SearchBar/SearchBar';
const Layout = () => {

    const items = ['Articulo 1', 'Articulo 2', 'Articulo 3', 'Articulo 4'];

    return (
        <>
            <div id="contenedor">
                <header id="main-header">
                    <div className="header-top">
                        <Link to="/">
                            <img src="./images/logoTech.jpeg" className="logo-header" width="150" height="60" />
                        </Link>
                        {/* Barra de Búsqueda */}
                        <SearchBar data={items} />
                    </div>

                    <nav>
                        <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/categorias">Categorías</Link></li>
                        <li><Link to="/productos">Productos</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                        <li><Link to="/login">Iniciar Sesión</Link></li>
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