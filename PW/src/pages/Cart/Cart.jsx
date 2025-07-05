import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import CartTable from './components/CartTable';
import EmptyCart from './components/EmptyCart';

const Cart = () => {
  const { cart } = useCart();

  return (
    <div className="flex items-start justify-center min-h-screen py-16 px-2">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-14 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-teal-700 mb-10 tracking-tight text-center w-full flex items-center justify-center gap-3">
          <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10 text-teal-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v3m-2 13a2 2 0 104 0' /></svg>
          Carrito de Compras
        </h1>
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="w-full mb-10">
              <CartTable />
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between gap-6 mt-8">
              <Link to="/" className="w-full md:w-auto flex items-center justify-center gap-2 bg-teal-100 text-teal-700 hover:bg-teal-200 hover:text-teal-900 font-bold py-3 px-8 rounded-full shadow transition-all text-lg active:scale-95">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' /></svg>
                Continuar comprando
              </Link>
              <Link to="/checkout" className="w-full md:w-auto flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full shadow transition-all text-lg active:scale-95">
                Proceder al pago
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' /></svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 