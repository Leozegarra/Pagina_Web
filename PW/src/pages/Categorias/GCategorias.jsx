import React, { useState, useEffect } from "react";
import productos from "../../contexts/ProductosJSON";
import { useNavigate } from "react-router-dom";

const GestorCategorias = () => {
  const navigate = useNavigate();

  // Categorías originales extraídas de los productos del JSON
  const categoriasBase = [...new Set(productos.map(p => p.categoria))];

  // Estado que mantiene todas las categorías visibles (base + extra)
  const [categorias, setCategorias] = useState(categoriasBase);

  // Modal y selección
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  // Al montar el componente, cargamos las categorías extras guardadas
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("categoriasExtra")) || [];
    const nuevas = [...new Set([...categoriasBase, ...guardadas])];
    setCategorias(nuevas);
  }, []);

  // Abre el modal para agregar categoría
  const abrirModal = () => {
    setNombreCategoria("");
    setProductosSeleccionados([]);
    setMostrarModal(true);
  };

  // Cierra el modal
  const cerrarModal = () => {
    setMostrarModal(false);
  };

  // Agrega o quita un producto del array de seleccionados
  const toggleProducto = (id) => {
    setProductosSeleccionados((prev) => prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  // Guarda la nueva categoría y asigna productos
  const guardarCategoria = () => {
    const limpia = nombreCategoria.trim().toLowerCase();

    if (!limpia || categorias.includes(limpia)) {
      alert("Nombre inválido o categoría ya existente");
      return;
    }

    const nuevasCategorias = [...categorias, limpia];
    const soloExtras = nuevasCategorias.filter(c => !categoriasBase.includes(c));
    localStorage.setItem("categoriasExtra", JSON.stringify(soloExtras));
    //clona los productos actuales
    const productosActualizados = [...productos]; 

    // Asignamos la nueva categoría a los productos seleccionados
    productosSeleccionados.forEach(id => {
      const index = productosActualizados.findIndex(p => p.id === id);
      if (index !== -1) {
        productosActualizados[index].categoria = limpia;
      }
    });

    //guarda en localStorage
    localStorage.setItem("productosActualizados", JSON.stringify(productosActualizados));
    setCategorias(nuevasCategorias);
    cerrarModal();
  };

  // Borra una categoría extra (no se puede borrar una base)
  const borrarCategoria = (catABorrar) => {
    if (!window.confirm(`¿Seguro que deseas borrar la categoría "${catABorrar}"?`)) return;

    const nuevas = categorias.filter(c => c !== catABorrar);
    const soloExtras = nuevas.filter(c => !categoriasBase.includes(c));

    localStorage.setItem("categoriasExtra", JSON.stringify(soloExtras));
    setCategorias(nuevas);

    //limpiar la categoría de los productos que la tenían
    productos.forEach(p => {
      if (p.categoria === catABorrar) {
        p.categoria = ""; //usar "Sin categoría"
      }
    });

    localStorage.setItem("productosActualizados", JSON.stringify(productos));
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" /></svg>
            Gestor de Categorías
          </h3>
          <div className="flex gap-2">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-full shadow-sm text-sm transition-all border border-gray-200" onClick={() => navigate('/admin/categorias')}>
              Volver
            </button>
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-full shadow-sm text-sm transition-all" onClick={abrirModal}>
              + Agregar categoría
            </button>
          </div>
        </div>
        <ul className="divide-y divide-gray-100 rounded-xl overflow-hidden bg-white border border-gray-100">
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
      </div>
      {/* Modal para agregar nueva categoría */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h5 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" /></svg>
                Nueva Categoría
              </h5>
              <button type="button" className="bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full p-2 shadow-sm" onClick={cerrarModal}>
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
            <h6 className="text-sm font-semibold text-gray-700 mb-2">Selecciona productos para esta categoría:</h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-64 overflow-y-auto mb-4">
              {productos.map((producto) => (
                <div
                  key={producto.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer shadow-sm bg-gray-50 hover:bg-teal-50 ${productosSeleccionados.includes(producto.id) ? 'border-teal-400 ring-2 ring-teal-100' : 'border-gray-200'}`}
                  onClick={() => toggleProducto(producto.id)}
                >
                  <img src={producto.imagen} className="w-10 h-10 rounded-lg object-contain bg-white border border-gray-100" alt={producto.name} />
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 text-sm">{producto.name}</span>
                    <span className="text-xs text-gray-400">{producto.categoria}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-2 justify-end mt-6">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-full shadow-sm text-sm transition-all border border-gray-200" onClick={cerrarModal}>Cancelar</button>
              <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-full shadow-sm text-sm transition-all" onClick={guardarCategoria}>Guardar categoría</button>
              <button className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-semibold px-4 py-2 rounded-full shadow-sm text-sm transition-all border border-yellow-200" onClick={() => { localStorage.removeItem("productosActualizados"); localStorage.removeItem("categoriasExtra"); window.location.reload(); }}>Limpiar cambios (reset)</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestorCategorias;
