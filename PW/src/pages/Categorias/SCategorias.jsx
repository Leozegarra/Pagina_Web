import React, { useEffect, useState } from "react";
import productosOriginales from "../../contexts/ProductosJSON";
import { useCart } from "../../contexts/CartContext";

const obtenerProductos = () => {
  const actualizados = JSON.parse(localStorage.getItem("productosActualizados"));
  return actualizados || productosOriginales;
};

const obtenerCategoriasBase = (productos) => {
  return [...new Set(productos.map((p) => p.categoria))];
};

function SCategorias() {
  const productos = obtenerProductos();
  const categoriasBase = obtenerCategoriasBase(productos);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoModal, setProductoModal] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const extras = JSON.parse(localStorage.getItem("categoriasExtra")) || [];
    const todas = [...new Set([...categoriasBase, ...extras])];
    setCategorias(todas);
    setCategoriaSeleccionada(todas[0]);
  }, []);

  const productosFiltrados = productos.filter(
    (p) => p.categoria === categoriaSeleccionada
  );

  const abrirModal = (producto) => {
    setProductoModal(producto);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProductoModal(null);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-teal-50 via-white to-cyan-50">
      {/* Panel lateral */}
      <aside className="w-64 min-w-[200px] h-full bg-gradient-to-b from-teal-600 to-teal-400 shadow-xl rounded-l-3xl flex flex-col p-6 gap-6">
        <h3 className="text-white text-xl font-extrabold mb-2">Categorías</h3>
        <ul className="flex flex-col gap-2">
          {categorias.map((cat) => (
            <li
              key={cat}
              className={`px-4 py-2 rounded-xl cursor-pointer font-semibold transition-all text-white text-base tracking-wide ${cat === categoriaSeleccionada ? 'bg-teal-100 text-teal-700 shadow-lg' : 'hover:bg-teal-300/70 hover:text-white'}`}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>
      {/* Grid de productos */}
      <main className="flex-1 p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-12 justify-items-center">
        {productosFiltrados.map((producto) => (
          <div
            key={producto.id}
            className="w-full max-w-md h-[420px] bg-white rounded-2xl shadow-lg flex flex-col items-center p-8 gap-5 group hover:shadow-2xl hover:-translate-y-1 hover:border-teal-400 border border-gray-100 transition-all cursor-pointer relative"
            onClick={() => abrirModal(producto)}
          >
            <div className="w-40 h-40 flex items-center justify-center overflow-hidden rounded-xl bg-gray-50 mb-2 shadow-sm border border-gray-200">
              <img
                src={producto.imagen}
                alt={producto.name}
                className="object-contain w-32 h-32 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="w-full flex flex-col items-center gap-1">
              <div className="text-2xl font-extrabold text-gray-800 text-center truncate w-full leading-tight">
                {producto.name}
              </div>
              <div className="text-lg font-bold text-teal-600 mb-2">S/ {producto.price}</div>
            </div>
            <button
              className="mt-2 w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-full shadow transition-all text-base active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
              onClick={e => { e.stopPropagation(); addToCart(producto); }}
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' /></svg>
              Agregar al carrito
            </button>
            <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent group-hover:border-teal-400 transition-all"></div>
          </div>
        ))}
        {productosFiltrados.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-16 text-lg font-semibold">No hay productos en esta categoría.</div>
        )}
      </main>
      {/* Modal de producto */}
      {modalAbierto && productoModal && (
        <div
          onClick={cerrarModal}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl p-8 min-w-[320px] flex flex-col items-center text-center animate-fade-in"
          >
            <h2 className="text-2xl font-extrabold text-teal-700 mb-4">{productoModal.name}</h2>
            <img
              src={productoModal.imagen}
              alt={productoModal.name}
              className="w-48 h-48 object-contain rounded-xl mb-4 shadow"
            />
            <p className="font-bold text-xl text-teal-600 mb-6">Precio: S/ {productoModal.price}</p>
            <button
              onClick={() => {
                addToCart(productoModal);
                cerrarModal();
              }}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl shadow transition-all text-lg active:scale-95"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SCategorias;
