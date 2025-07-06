import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../../contexts/CartContext'
import { localStorageService, STORAGE_KEYS } from '../../../services/localStorage'
import emailjs from '@emailjs/browser'
import { Mail, User, MapPin, CreditCard, Phone, IdCard } from 'lucide-react'

const PaymentForm = () => {
  const navigate = useNavigate()
  const { cart, clearCart } = useCart()

const [formData, setFormData] = useState({
  name: '',
  lastName: '',
  dni: '',
  email: '',
  address: '',
  telefono: '',
  zona: '',
  vivienda: '',
  cardNumber: '',
  cvv: '',
  expiration: ''
})
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

    const handleSubmit = async (e) => {
    e.preventDefault()

    const { name, lastName, dni, email, address, telefono, zona, vivienda } = formData

    if (!name || !lastName || !dni || !email || !address || !telefono || !zona || !vivienda) {
      setError('Por favor completa todos los campos del formulario.')
      return
    }

    // Validar dirección con estructura básica
    const direccionValida = /^(Av\.|Calle|Jr\.)\s+\w+.*\s+\d+/.test(address)
    if (!direccionValida) {
     setError('La dirección no es válida. Asegúrate de incluir el tipo de vía y un número. Ej: Av. Arequipa 1234')
     return
    }

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!validateEmail(email)) {
      setError('El correo electrónico no es válido.')
      return
    }

    const cartItems = cart.map(item => `${item.name} - S/.${item.price}`).join('\n')
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
          total: `S/.${total}`
        },
        'pRG8oKc6FyyaHJkud'
      )
    } catch (err) {
      console.error('Error al enviar el correo:', err)
    }


    const getDistritoFromZona = (zona) => {
    if (zona.startsWith('Zona')) {
    const matches = zona.match(/- ([^,]+)/)
    return matches ? matches[1].trim() : ''
    }
    return zona
    }

// Función para convertir la zona a un distrito reconocido por mapas
const extraerDistritoDesdeZona = (zona) => {
  const zonas = {
    'Zona 1': 'Miraflores',
    'Zona 2': 'San Borja',
    'Zona 3': 'La Molina',
    'Zona 4': 'Ate',
    'Zona 5': 'Lurín',
    'Zona 6': 'Pucusana',
    'Otra zona': ''
  }
  return zonas[zona] || ''
}

// Validar que la dirección tenga contenido suficiente
if (address.length < 10) {
  setError('Por favor escribe una dirección más completa (ej: Av. Arequipa 1234).')
  return
}

const distrito = extraerDistritoDesdeZona(zona)
const fullAddress = zona === 'Otra zona'
  ? `${address}, Perú`
  : `${address}, ${distrito}, Lima, Perú`

// Guardar dirección y carrito
localStorage.setItem('orderAddress', JSON.stringify({ fullAddress }))
localStorage.setItem('orderCart', JSON.stringify(cart))
localStorage.removeItem('orderForm') // limpieza opcional


    // Guardar en orders del localStorage
    const existingOrders = localStorageService.getData(STORAGE_KEYS.ORDERS) || []
    const newOrder = {
    id: Date.now(),
    productos: cart.map(item => item.name),
    total: total,
    fecha: new Date().toISOString().split('T')[0],
    estado: 'Pendiente'
    }
    const updatedOrders = [...existingOrders, newOrder]
    localStorageService.saveData(STORAGE_KEYS.ORDERS, updatedOrders)

    clearCart()
    navigate('/order-complete')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Información de envío y contacto</h2>

      {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Nombre</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Apellidos</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">DNI</label>
            <div className="relative">
              <IdCard className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Correo electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Teléfono</label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Dirección</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-md"
              />
              {formData.address && !/^(Av\.|Calle|Jr\.)\s+\w+.*\s+\d+/.test(formData.address) && (
              <div className="text-sm text-gray-500 mt-1">
                  Escribe una dirección clara, por ejemplo: Av. Arequipa 1234
              </div>)}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Tipo de vivienda</label>
            <select
              name="vivienda"
              value={formData.vivienda}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded-md"
            >
              <option value="">Selecciona</option>
              <option value="Casa">Casa</option>
              <option value="Departamento">Departamento</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Zona de envío</label>
            <select
              name="zona"
              value={formData.zona}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded-md"
            >
              <option value="">Selecciona tu zona</option>
              <option value="Zona 1">Zona 1 - Miraflores, Breña, Lima Cercado, Magdalena, Pueblo Libre, San Miguel, Barranco, San Isidro, Surquillo</option>
              <option value="Zona 2">Zona 2 - San Borja, Surco, Chorrillos, San Juan de Miraflores, Jesús María, La Victoria, Lince, San Luis</option>
              <option value="Zona 3">Zona 3 - La Molina, El Agustino, Santa Anita, San Juan de Lurigancho, Independencia, Los Olivos, Rímac, San Martín de Porres</option>
              <option value="Zona 4">Zona 4 - La Punta, Ate, Lurigancho, Chosica, Chaclacayo, Cieneguilla, Comas, Puente Piedra, Ancón, Carabayllo, Santa Rosa</option>
              <option value="Zona 5">Zona 5 - Lurín, Pachacámac, Villa el Salvador, Villa María del Triunfo, Bellavista, Callao, Carmen de la Legua, La Perla</option>
              <option value="Zona 6">Zona 6 - Pucusana, Punta Hermosa, Punta Negra, San Bartolo, Santa María, Ventanilla, Mi Perú</option>
              <option value="Otra zona">Otra zona (envío por agencia, paga en destino)</option>
            </select>
          </div>
        </div>

  <div className="grid sm:grid-cols-3 gap-4">
  <div className="col-span-2">
    <label className="block mb-1 font-medium">Número de tarjeta</label>
    <div className="relative">
      <CreditCard className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
      <input
        type="text"
        name="cardNumber"
        value={formData.cardNumber}
        onChange={(e) => {
          const cleaned = e.target.value.replace(/\D/g, '').slice(0, 16)
          const spaced = cleaned.replace(/(.{4})/g, '$1 ').trim()
          setFormData({ ...formData, cardNumber: spaced })
        }}
        placeholder="0000 0000 0000 0000"
        className="w-full pl-10 py-2 border rounded-md"
      />
    </div>
  </div>

  <div>
    <label className="block mb-1 font-medium">Código CVV</label>
    <input
      type="text"
      name="cvv"
      value={formData.cvv || ''}
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 4)
        setFormData({ ...formData, cvv: value })
      }}
      placeholder="Ej. 123"
      className="w-full py-2 px-3 border rounded-md"
    />
  </div>
</div>

<div>
  <label className="block mb-1 font-medium">Fecha de expiración</label>
  <input
  type="month"
  name="expiry"
  value={formData.expiry || ''}
  onChange={handleChange}
  className="py-2 px-3 border rounded-md w-52 sm:w-60"
/>
</div>



        <button type="submit" className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
          Completar compra
        </button>
      </form>
    </div>
  )
}

export default PaymentForm

