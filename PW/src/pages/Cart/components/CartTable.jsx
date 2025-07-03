import { useCart } from '../../../contexts/CartContext'

const CartTable = () => {
  const { cart, addToCart, removeFromCart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio unitario</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <div className="btn-group">
                  <button 
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => removeFromCart(item.id)}
                  >
                    -
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end fw-bold">Total:</td>
            <td colSpan="2">${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default CartTable