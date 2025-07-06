import { Link } from 'react-router-dom'

const SuccessMessage = () => {
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
        <Link to="/" className="btn btn-primary">
          Volver a la tienda
        </Link>
      </div>
    </div>
  )
}

export default SuccessMessage 