import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MapView from './MapView'

const SuccessMessage = () => {
  const [fullAddress, setFullAddress] = useState('')

  useEffect(() => {
    const orderForm = JSON.parse(localStorage.getItem('orderForm'))
    if (orderForm?.fullAddress) {
      setFullAddress(orderForm.fullAddress)
    }
  }, [])

  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title text-success mb-4">
          <i className="bi bi-check-circle-fill"></i> ¡Pedido Completado!
        </h1>
        <p className="lead mb-4">
          Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
        </p>
        <p className="mb-4">
          Te enviaremos un correo electrónico con los detalles de tu pedido.
        </p>

        {fullAddress && (
          <>
            <h5 className="mt-4">Ubicación de entrega</h5>
            <MapView address={fullAddress} />
          </>
        )}

        <Link to="/" className="btn btn-primary mt-4">
          Volver a la tienda
        </Link>
      </div>
    </div>
  )
}

export default SuccessMessage
