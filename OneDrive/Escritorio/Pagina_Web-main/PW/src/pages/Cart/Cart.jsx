import { Link } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import CartTable from './components/CartTable'
import EmptyCart from './components/EmptyCart'

const Cart = () => {
  const { cart } = useCart()

  return (
    <div className="container">
      <h1 className="text-center mb-4">Carrito de Compras</h1>
      
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <CartTable />
          
          <div className="d-flex justify-content-between">
            <Link to="/" className="btn btn-secondary">
              Continuar comprando
            </Link>
            <Link to="/checkout" className="btn btn-primary">
              Proceder al pago
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart 