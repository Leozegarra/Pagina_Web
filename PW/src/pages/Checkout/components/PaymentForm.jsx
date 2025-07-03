import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../../contexts/CartContext'
import emailjs from '@emailjs/browser'

const PaymentForm = () => {
  const navigate = useNavigate()
  const { cart, clearCart } = useCart()

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    dni: '',
    email: '',
    address: '',
    vivienda: '',
    telefono: '',
    zona: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, lastName, dni, email, address, vivienda, telefono, zona } = formData

    if (!name || !lastName || !dni || !email || !address || !vivienda || !telefono || !zona) {
      setError('Por favor completa todos los campos del formulario.')
      return
    }

    if (!validateEmail(email)) {
      setError('El correo electrónico no es válido.')
      return
    }

    const cartItems = cart.map(item => `${item.name} - $${item.price}`).join('\n')
    const total = cart.reduce((sum, item) => sum + item.price, 0)

    try {
      await emailjs.send(
        'service_y087ki7',
        'template_ibxl7p8',
        {
          user_name: `${name} ${lastName}`,
          user_email: email,
          address,
          dni,
          vivienda,
          telefono,
          zona,
          cart_items: cartItems,
          total: `$${total}`
        },
        'pRG8oKc6FyyaHJkud'
      )
    } catch (err) {
      console.error('Error al enviar el correo:', err)
    }

    const zonaSimple = zona === 'Otra zona' ? '' : zona
    const fullAddress = zonaSimple
      ? `${address}, ${zonaSimple}, Perú`
      : `${address}, Perú`

    localStorage.setItem('orderForm', JSON.stringify({ ...formData, fullAddress }))
    localStorage.setItem('orderCart', JSON.stringify(cart))
    clearCart()
    navigate('/order-complete')
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Información de envío y contacto</h5>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellidos</label>
            <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">DNI</label>
            <input type="text" className="form-control" name="dni" value={formData.dni} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Tipo de vivienda</label>
            <select className="form-select" name="vivienda" value={formData.vivienda} onChange={handleChange}>
              <option value="">Selecciona</option>
              <option value="Casa">Casa</option>
              <option value="Departamento">Departamento</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input type="text" className="form-control" name="telefono" value={formData.telefono} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Zona de envío</label>
            <select className="form-select" name="zona" value={formData.zona} onChange={handleChange}>
              <option value="">Selecciona tu zona</option>
              <option value="Zona 1">Zona 1 - Miraflores, Breña, Lima Cercado, Magdalena del Mar, Pueblo Libre, San Miguel, Barranco, San Isidro, Surquillo</option>
              <option value="Zona 2">Zona 2 - San Borja, Santiago de Surco, Chorrillos, San Juan de Miraflores, Jesús María, La Victoria, Lince, San Luis</option>
              <option value="Zona 3">Zona 3 - La Molina, El Agustino, Santa Anita, San Juan de Lurigancho, Independencia, Los Olivos, Rímac, San Martín de Porres</option>
              <option value="Zona 4">Zona 4 - La Punta, Ate, Lurigancho, Chosica, Chaclacayo, Cieneguilla, Comas, Puente Piedra, Ancón, Carabayllo, Santa Rosa</option>
              <option value="Zona 5">Zona 5 - Lurín, Pachacámac, Villa el Salvador, Villa María del Triunfo, Bellavista, Callao, Carmen de la Legua, La Perla</option>
              <option value="Zona 6">Zona 6 - Pucusana, Punta Hermosa, Punta Negra, San Bartolo, Santa María, Ventanilla, Mi Perú</option>
              <option value="Otra zona">Otra zona (envío por agencia, paga en destino)</option>
            </select>
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

