import { useCart } from '../../../contexts/CartContext'

const CartTable = () => {
  const { cart, removeFromCart } = useCart()
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" className="text-end fw-bold">Total:</td>
            <td>${total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default CartTable 