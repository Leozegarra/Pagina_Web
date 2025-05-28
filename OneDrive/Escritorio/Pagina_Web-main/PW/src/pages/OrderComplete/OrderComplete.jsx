import { useEffect } from 'react'
import { useCart } from '../../contexts/CartContext' // ruta corregida

const OrderComplete = () => {
  const { clearCart } = useCart()

  useEffect(() => {
    const timer = setTimeout(() => {
      clearCart()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container mt-5">
      <div className="alert alert-success text-center" role="alert">
        <h4 className="alert-heading">¡Pedido Completado!</h4>
        <p>Gracias por tu compra. Tu pedido ha sido procesado exitosamente.</p>
        <hr />
        <p className="mb-0">Te enviaremos un correo electrónico con los detalles de tu pedido.</p>
        <a href="/" className="btn btn-primary mt-3">Volver a la tienda</a>
      </div>
    </div>
  )
}

export default OrderComplete
