import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './index.css';

const Layout = () => {

    return (
        <>
            <div id="contenedor">
                <header id="main-header">
                    <img src="/images/download.png" width="150" height="60" />
                    <h2>Carrera de Ingenieria de Sistemas <em>- Programacion Web</em></h2>
                    <hr />
                    <nav>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/lista">Lista 1</Link></li>
                            <li><Link to="/about">Nosotros</Link></li>
                            <li><Link to="/contact">Contacto</Link></li>
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