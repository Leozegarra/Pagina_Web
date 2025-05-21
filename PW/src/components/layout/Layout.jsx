import { Link } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'

const Layout = ({ children }) => {
  const { cart } = useCart()

  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Mi Tienda</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item col-md-4">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item col-md-4">
                <Link className="nav-link" to="/Categorias">Categorias</Link>
              </li>
              <li className="nav-item col-md-4">
                <Link className="nav-link" to="/cart">
                  Carrito ({cart.length})
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4 flex-grow-1">
        {children}
      </main>

      <footer className="bg-dark text-light py-3">
        <div className="container text-center">
          <p className="mb-0">&copy; 2024 Mi Tienda. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout 