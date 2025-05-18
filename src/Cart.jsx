import React, { useContext } from "react";
import { useNavegate } from "react-router-dom";
import { CartContext } from "/CartContext";


const Cart = () => {

    const {cartItems, updateQuantity, removeItem, moveToSaved, savedItems, total} = useContext(CartContext);
    const navigate = useNavegate();

    return (
        <div classname="cart-container">
            <h2>Carrito de copmras</h2>
            {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                        <h4>{item.name}</h4>
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, e.target.value)}
                    />
                        <button onClick={() => removeItem(item.id)}>Eliminar</button>
                        <button onClick={() => moveToSaved(item.id)}>Guardar para después</button>
                    </div>
                    </div>
            ))}
            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={() => navigate('/checkout')}>Ir al checkout</button>

            <h3>Guardados</h3>
            {savedItems.map(item => ( 
             <div key={item.id}>
                <span>{item.name}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>Mover al Carrito</button>
                <button onClick={() => removeItem(item.id)}>Eliminar</button>
                </div>    
            ))}
        </div>
    );

};

export default Cart;
