import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../../contexts/CartContext'
import { localStorageService, STORAGE_KEYS } from '../../../services/localStorage'

const PaymentForm = () => {
  const navigate = useNavigate()
  const { cart, clearCart } = useCart()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const usuarioActual = JSON.parse(localStorage.getItem("usuario_actual"))
    if (!usuarioActual) {
      alert("Debes iniciar sesión para completar la compra.")
      return
    }

    if (cart.length === 0) {
      alert("Tu carrito está vacío.")
      return
    }

    // Crear nueva orden
    const nuevaOrden = {
      id: Date.now(),
      email: usuarioActual.email,
      fecha: new Date().toLocaleDateString(),
      items: cart.map(item => ({
        id: item.id,
        nombre: item.name,
        precio: item.price,
        cantidad: item.quantity || 1
      }))
    }

    // Guardar orden en localStorage
    const ordenes = localStorageService.getData(STORAGE_KEYS.ORDERS)
    ordenes.push(nuevaOrden)
    localStorageService.saveData(STORAGE_KEYS.ORDERS, ordenes)

    clearCart()
    alert("Compra realizada con éxito.")
    navigate('/order-complete')
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Información de pago</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre completo</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Dirección</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">Número de tarjeta</label>
            <input
              type="text"
              className="form-control"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Completar compra
          </button>
        </form>
      </div>
    </div>
  )
}

export default PaymentForm
