import { useCart } from "../../../contexts/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card h-100" style={{ width: '220px', margin: 'auto' }}>
      <img 
        src={product.imagen} 
        className="card-img-top" 
        alt={product.name} 
        style={{ height: '180px', objectFit: 'cover' }} 
      />
      <div className="card-body" style={{ padding: '10px' }}>
        <h5 className="card-title" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{product.name}</h5>
        <p className="card-text" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>${product.price}</p>
        <button 
          className="btn btn-primary btn-sm"
          onClick={() => addToCart(product)}
          style={{ fontSize: '0.8rem', padding: '4px 8px' }}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
