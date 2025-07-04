import { useCart } from "../../../contexts/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center p-4 w-full max-w-xs mx-auto group cursor-pointer border border-gray-100 hover:-translate-y-1">
      <div className="w-full h-44 flex items-center justify-center overflow-hidden rounded-xl bg-gray-50 mb-3">
        <img 
          src={product.imagen} 
          alt={product.name} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <div className="w-full flex flex-col items-center gap-1">
        <h5 className="text-lg font-bold text-gray-800 text-center truncate w-full">{product.name}</h5>
        <p className="text-teal-600 font-semibold text-base mb-2">${product.price}</p>
        <button 
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-xl transition-all duration-200 active:scale-95 shadow"
          onClick={() => addToCart(product)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
