import { useEffect, useState } from 'react'
import MapView from './MapView'

const SuccessMessage = () => {
  const [fullAddress, setFullAddress] = useState('')
  const [orderSummary, setOrderSummary] = useState([])

  useEffect(() => {
    // Obtener dirección completa
    const addressData = localStorage.getItem('orderAddress')
    if (addressData) {
      try {
        const { fullAddress } = JSON.parse(addressData)
        setFullAddress(fullAddress)
        localStorage.removeItem('orderAddress')
      } catch (error) {
        console.error('Error al leer dirección:', error)
      }
    }

    // Obtener carrito
    const cartData = localStorage.getItem('orderCart')
    if (cartData) {
      try {
        const items = JSON.parse(cartData)
        setOrderSummary(items)
        localStorage.removeItem('orderCart')
      } catch (error) {
        console.error('Error al leer carrito:', error)
      }
    }
  }, [])

  const calcularTotal = () =>
    orderSummary.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="card p-8 shadow-xl bg-white rounded-lg max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-green-600 mb-4">¡Gracias por tu compra!</h1>
      <p className="text-gray-700 mb-4">Tu pedido ha sido recibido exitosamente. En breve recibirás un <strong>correo de confirmación</strong> con todos los detalles.</p>

      {orderSummary.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Resumen de tu pedido</h2>
          <ul className="divide-y divide-gray-200 mb-2">
            {orderSummary.map((item, index) => (
              <li key={index} className="py-2 flex justify-between">
                <span>{item.name}</span>
                <span className="font-medium">S/. {item.price}</span>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold text-lg">
            Total: S/. {calcularTotal()}
          </div>
        </div>
      )}

      {fullAddress && (
        <>
          <h2 className="text-lg font-semibold mb-2">Dirección de entrega</h2>
          <p className="mb-4 text-gray-700">{fullAddress}</p>
          <MapView address={fullAddress} />
        </>
      )}
    </div>
  )
}

export default SuccessMessage

