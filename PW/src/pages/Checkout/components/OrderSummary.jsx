import { useCart } from '../../../contexts/CartContext'

const OrderSummary = () => {
  const { cart } = useCart()
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Resumen del pedido</h5>
        <ul className="list-group list-group-flush">
          {cart.map(item => (
            <li key={item.id} className="list-group-item d-flex justify-content-between">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </li>
          ))}
          <li className="list-group-item d-flex justify-content-between fw-bold">
            <span>Total</span>
            <span>${total}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default OrderSummary 