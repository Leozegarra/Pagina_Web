import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './cartContext.jsx'; // Importa el contexto del carrito

createRoot(document.getElementById('root')).render(
 
 <StrictMode>
    <CartProvider>  {/*envuelve App */}
      <App />
    </CartProvider>
  </StrictMode>,
);