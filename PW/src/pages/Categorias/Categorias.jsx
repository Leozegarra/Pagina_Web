import React, { useEffect, useState } from "react";
import productosOriginales from "../../contexts/ProductosJSON";
import { useCart } from "../../contexts/CartContext";
// import { useNavigate } from "react-router-dom";
import SideBar from '../../components/SideBar/SideBar';
import DashboardHeader from '../../components/DashboardHeader/DashBoardHeader';

const obtenerProductos = () => {
  const actualizados = JSON.parse(localStorage.getItem("productosActualizados"));
  return actualizados || productosOriginales;
};

const obtenerCategoriasBase = (productos) => {
  return [...new Set(productos.map((p) => p.categoria))];
};

function App() {
  const productos = obtenerProductos();
  const categoriasBase = obtenerCategoriasBase(productos);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoModal, setProductoModal] = useState(null);
  // const navigate = useNavigate();
  const { addToCart } = useCart();

  // Estado para el modal de gestión de categorías
  const [gestionarModal, setGestionarModal] = useState(false);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  useEffect(() => {
    const extras = JSON.parse(localStorage.getItem("categoriasExtra")) || [];
    const todas = [...new Set([...categoriasBase, ...extras])];
    setCategorias(todas);
    // Si la categoría seleccionada ya no existe, selecciona la primera
    setCategoriaSeleccionada((prev) => todas.includes(prev) ? prev : todas[0] || "");
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

  // Lógica para agregar y borrar categorías (de GCategorias.jsx)
  const abrirGestionarModal = () => {
    setNombreCategoria("");
    setProductosSeleccionados([]);
    setGestionarModal(true);
  };
  const cerrarGestionarModal = () => setGestionarModal(false);
  const toggleProducto = (id) => {
    setProductosSeleccionados((prev) => prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]);
  };
  const guardarCategoria = () => {
    const limpia = nombreCategoria.trim().toLowerCase();
    if (!limpia || categorias.includes(limpia)) {
      alert("Nombre inválido o categoría ya existente");
      return;
    }
    const nuevasCategorias = [...categorias, limpia];
    const soloExtras = nuevasCategorias.filter(c => !categoriasBase.includes(c));
    localStorage.setItem("categoriasExtra", JSON.stringify(soloExtras));
    const productosActualizados = [...productos];
    productosSeleccionados.forEach(id => {
      const index = productosActualizados.findIndex(p => p.id === id);
      if (index !== -1) {
        productosActualizados[index].categoria = limpia;
      }
    });
    localStorage.setItem("productosActualizados", JSON.stringify(productosActualizados));
    setCategorias(nuevasCategorias);
    // Si no hay categoría seleccionada o la actual fue borrada, selecciona la nueva
    setCategoriaSeleccionada(limpia);
    cerrarGestionarModal();
  };
  const borrarCategoria = (catABorrar) => {
    if (!window.confirm(`¿Seguro que deseas borrar la categoría "${catABorrar}"?`)) return;
    const nuevas = categorias.filter(c => c !== catABorrar);
    const soloExtras = nuevas.filter(c => !categoriasBase.includes(c));
    localStorage.setItem("categoriasExtra", JSON.stringify(soloExtras));
    setCategorias(nuevas);
    // Limpiar la categoría de los productos que la tenían
    const productosActualizados = productos.map(p =>
      p.categoria === catABorrar ? { ...p, categoria: "" } : p
    );
    localStorage.setItem("productosActualizados", JSON.stringify(productosActualizados));
    // Si la categoría seleccionada fue borrada, selecciona la primera disponible
    if (categoriaSeleccionada === catABorrar) {
      setCategoriaSeleccionada(nuevas[0] || "");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SideBar onGestionarCategorias={abrirGestionarModal} />
      <main className="flex-1 w-full max-w-7xl mx-auto px-8 py-10">
        <DashboardHeader title="Categorías" onGestionarCategorias={abrirGestionarModal} />
        <ul className="flex flex-wrap gap-2 mb-8">
          {categorias.map((cat) => (
            <li
              key={cat}
              className={`px-4 py-2 rounded-full cursor-pointer font-medium text-sm transition-all border ${cat === categoriaSeleccionada ? 'bg-teal-50 text-teal-700 border-teal-200 shadow' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {productosFiltrados.map((producto) => (
            <div
              key={producto.id}
              className="bg-white rounded-xl shadow-md flex flex-col items-center p-5 gap-2 group hover:shadow-lg transition-all cursor-pointer border border-gray-100"
              onClick={() => abrirModal(producto)}
            >
              <div className="w-24 h-24 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 mb-2 shadow-sm border border-gray-100">
                <img
                  src={producto.imagen}
                  alt={producto.name}
                  className="object-contain w-16 h-16 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-sm font-semibold text-gray-800 text-center truncate w-full">{producto.name}</div>
            </div>
          ))}
          {productosFiltrados.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-16 text-base font-semibold">No hay productos en esta categoría.</div>
          )}
        </div>
      </main>
      {/* Modal de producto */}
      {modalAbierto && productoModal && (
        <div
          onClick={cerrarModal}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl p-8 min-w-[320px] flex flex-col items-center text-center animate-fade-in border border-gray-100"
          >
            <h2 className="text-xl font-bold text-teal-700 mb-4">{productoModal.name}</h2>
            <img
              src={productoModal.imagen}
              alt={productoModal.name}
              className="w-40 h-40 object-contain rounded-lg mb-4 shadow"
            />
            <p className="font-bold text-lg text-teal-600 mb-6">Precio: S/ {productoModal.price}</p>
            <button
              onClick={() => {
                addToCart(productoModal);
                cerrarModal();
              }}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-full shadow transition-all text-base active:scale-95"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      )}
      {/* Modal de gestión de categorías */}
      {gestionarModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl border border-gray-100 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h5 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" /></svg>
                Gestor de Categorías
              </h5>
              <button type="button" className="bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full p-2 shadow-sm" onClick={cerrarGestionarModal}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 shadow-sm text-gray-800 placeholder-gray-400 bg-white transition-all outline-none mb-4 text-sm"
              placeholder="Nombre de la nueva categoría"
              value={nombreCategoria}
              onChange={(e) => setNombreCategoria(e.target.value)}
            />
            <div className="flex items-center justify-between mb-2">
              <h6 className="text-sm font-semibold text-gray-700">Selecciona productos para esta categoría:</h6>
              <span className="text-xs text-teal-600 font-bold">{productosSeleccionados.length} seleccionados</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto mb-4 transition-all" style={{ maxHeight: '220px' }}>
              {productos.map((producto) => {
                const seleccionado = productosSeleccionados.includes(producto.id);
                return (
                  <div
                    key={producto.id}
                    className={`relative flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer shadow-sm bg-gray-50 hover:bg-teal-50 duration-200 ${seleccionado ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-200 scale-[1.03]' : 'border-gray-200'}`}
                    onClick={() => toggleProducto(producto.id)}
                  >
                    <img src={producto.imagen} className="w-10 h-10 rounded-lg object-contain bg-white border border-gray-100" alt={producto.name} />
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800 text-sm">{producto.name}</span>
                      <span className="text-xs text-gray-400">{producto.categoria}</span>
                    </div>
                    {seleccionado && (
                      <span className="absolute top-2 right-2 bg-teal-500 text-white rounded-full p-1 shadow animate-bounce-in">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <ul className="divide-y divide-gray-100 rounded-xl overflow-hidden bg-white border border-gray-100 mb-4">
              {categorias.map((cat, idx) => {
                const esCategoriaBase = categoriasBase.includes(cat);
                return (
                  <li key={idx} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-all text-sm">
                    <span className="font-medium text-gray-700">{cat}</span>
                    {!esCategoriaBase && (
                      <button className="bg-red-50 hover:bg-red-100 text-red-500 font-bold px-4 py-1 rounded-full text-xs shadow-sm transition-all border border-red-100" onClick={() => borrarCategoria(cat)}>
                        Borrar
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-col md:flex-row gap-2 justify-end mt-6">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-full shadow-sm text-sm transition-all border border-gray-200" onClick={cerrarGestionarModal}>Cancelar</button>
              <button
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-full shadow-sm text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={guardarCategoria}
                disabled={!nombreCategoria.trim() || categorias.includes(nombreCategoria.trim().toLowerCase())}
              >
                Guardar categoría
              </button>
              <button className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-semibold px-4 py-2 rounded-full shadow-sm text-sm transition-all border border-yellow-200" onClick={() => { localStorage.removeItem("productosActualizados"); localStorage.removeItem("categoriasExtra"); window.location.reload(); }}>Limpiar cambios (reset)</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
