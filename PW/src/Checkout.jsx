import React from "react";
import { useNavigate } from "react-router-dom";
import  CartContext  from "../Context/CartContext";  


const Checkout = () => {
    const { cartItems, total, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [form, setform] = useState({
        address: "",
        paymentMethod:'card',
        cardNumber: "",
        cvv: "",
        expirationDate: "",
    });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // guradar en el backend
        clearCart();
        navigate('/order-complete');
    };

    return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>

      <label>Dirección de envío</label>
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        required
      />

      <label>Número de tarjeta</label>
      <input
        name="cardNumber"
        placeholder="Número de tarjeta"
        value={form.cardNumber}
        onChange={handleChange}
        required
      />

      <label>Fecha de vencimiento</label>
      <input
        name="expirationDate"
        placeholder="MM/AA"
        value={form.expirationDate}
        onChange={handleChange}
        required
      />

      <label>CVV</label>
      <input
        name="cvv"
        placeholder="CVV"
        value={form.cvv}
        onChange={handleChange}
        required
      />

      <h3>Resumen del pedido</h3>
      {cartItems.map((item) => (
        <div key={item.id}>
          <span>{item.name} x {item.quantity}</span>
        </div>
      ))}

      <h4>Total: ${total.toFixed(2)}</h4>

      <button type="submit">Completar orden</button>
    </form>
  );
};

export default Checkout;