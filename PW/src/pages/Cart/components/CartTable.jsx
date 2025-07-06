import { useCart } from '../../../contexts/CartContext';

const CartTable = () => {
  const { cart, removeFromCart, addToCart } = useCart();
  // Agrupar productos por id y sumar cantidad
  const grouped = cart.reduce((acc, item) => {
    const found = acc.find(i => i.id === item.id);
    if (found) {
      found.qty += 1;
      found.total += item.price;
    } else {
      acc.push({ ...item, qty: 1, total: item.price });
    }
    return acc;
  }, []);
  const total = grouped.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="w-full">
      <table className="min-w-full text-base bg-white/80 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800">
            <th className="px-4 py-3 font-bold text-left">Producto</th>
            <th className="px-4 py-3 font-bold text-center">Cantidad</th>
            <th className="px-4 py-3 font-bold text-left">Precio unitario</th>
            <th className="px-4 py-3 font-bold text-left">Total</th>
            <th className="px-4 py-3 font-bold text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {grouped.map(item => (
            <tr key={item.id} className="border-b last:border-b-0 hover:bg-teal-50/60 transition-all group">
              <td className="px-4 py-3 font-semibold text-gray-800">{item.name}</td>
              <td className="px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="bg-teal-100 text-teal-700 rounded-full px-2 py-1 font-bold text-lg hover:bg-teal-200 transition flex items-center justify-center shadow-sm active:scale-95"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 12H4' /></svg>
                  </button>
                  <span className="font-bold text-gray-700 text-base min-w-[24px] text-center">{item.qty}</span>
                  <button
                    className="bg-teal-100 text-teal-700 rounded-full px-2 py-1 font-bold text-lg hover:bg-teal-200 transition flex items-center justify-center shadow-sm active:scale-95"
                    onClick={() => addToCart(item)}
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' /></svg>
                  </button>
                </div>
              </td>
              <td className="px-4 py-3 text-teal-700 font-bold">${item.price}</td>
              <td className="px-4 py-3 text-teal-700 font-extrabold text-lg">${item.total}</td>
              <td className="px-4 py-3 text-center">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded-full shadow-sm text-sm transition-all active:scale-95 flex items-center gap-1 mx-auto"
                  onClick={() => removeFromCart(item.id)}
                >
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /></svg>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="px-4 py-3 text-right font-bold text-gray-700">Total:</td>
            <td className="px-4 py-3 text-center text-teal-700 font-extrabold text-xl">${total}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartTable; 