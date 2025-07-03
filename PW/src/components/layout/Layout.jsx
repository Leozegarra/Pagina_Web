import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import { useCart } from '../../contexts/CartContext';
import SearchBar from '../SearchBar/SearchBar';
import productos from '../../contexts/ProductosJSON';
import UserStatus from '../UserStatus/UserStatus';
import { useUser } from '../../contexts/UserContext';
import { list } from 'postcss';

const Layout = () => {
  const { cart } = useCart();
  const { user, logout  } = useUser();
  const categoriasUnicas = Array.from(new Set(productos.map(p => p.categoria)));

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <>
      <div id="contenedor">
        <header id="main-header">
          <div className="header-top" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px'
          }}>    
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Link to="/">
                <img
                    src="/images/logoTech.jpeg"
                    className="logo-header"
                    width="150"
                    height="60"
                    alt="Zona Tech Logo"
                />
                </Link>
              <SearchBar />              
            </div>

            <UserStatus />
          </div>

          <nav>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/SCategorias">Productos</Link></li>
              
              {user ? (
                <>
                    <li><Link to="/cuenta">Mi Cuenta</Link></li>
                    <li>
                        <button className='btn btn-link nav-link' onClick={handleLogout}>
                            Cerrar Sesion
                        </button>
                    </li>
                </>
                ) : (
                    <li><Link to="/login">Iniciar Sesion</Link></li>
                )}
              <li className="nav-item">
                <Link className="nav-link" to="/cart"> Carrito ({cart.length})</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Outlet />
        </main>
      </div>

      <footer
        style={{
          color: 'black',
          padding: '10px',
          textAlign: 'center'
        }}
      >
        <p>&copy; Zona Tech - 2025</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '15px',
            marginTop: '10px'
          }}
        >
          {categoriasUnicas.map((categoria, index) => (
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
  );
};

export default Layout;
