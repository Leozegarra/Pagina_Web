import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './index.css';

const Layout = () => {

    return (
        <>
            <div id="contenedor">
                <header id="main-header">
                    <h2>Carrera de Ingenieria de Sistemas <em>- Programacion Web</em></h2>
                    <hr />
                    <nav>
                        <ul style={{listStyle:'none'}}>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/Login">Iniciar Sesión</Link></li>
                            <li><Link to="/Register">Registrarse</Link></li>
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