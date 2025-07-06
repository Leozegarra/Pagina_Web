import { Link } from 'react-router-dom'

const EmptyCart = () => {
  return (
    <div className="text-center">
      <p className="lead">Tu carrito está vacío</p>
      <Link to="/" className="btn btn-primary">
        Continuar comprando
      </Link>
    </div>
  )
}

export default EmptyCart 