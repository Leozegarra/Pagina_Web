import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCategorias } from "../../contexts/CategoriaContexto";
import { useProductos } from "../../contexts/ProductContext";

const GestorCategorias = () => {
  const navigate = useNavigate();
  const { categorias, loading, error, createCategoria, removeCategoria } = useCategorias();
  const { productos, loading: loadingProductos, error: errorProductos } = useProductos();

  // Modal y selección
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

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
  const guardarCategoria = async () => {
    const limpia = nombreCategoria.trim();

    if (!limpia) {
      alert("Nombre inválido");
      return;
    }

    // Verificar si la categoría ya existe
    const categoriaExiste = categorias.some(cat => 
      (cat.nombre || cat.name || "").toLowerCase() === limpia.toLowerCase()
    );
    
    if (categoriaExiste) {
      alert("Categoría ya existente");
      return;
    }

    try {
      // Crear categoría en el backend
      await createCategoria({
        nombre: limpia,
        descripcion: `Categoría ${limpia}`
      });

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
      cerrarModal();
    } catch (error) {
      console.error('Error al crear categoría:', error);
      alert("Error al crear la categoría. Inténtalo de nuevo.");
    }
  };

  const IDS_ORIGINALES = [1,2,3,4,5,6,7,8,9,10];

  const borrarCategoria = async (catABorrar) => {
    if (!window.confirm(`¿Seguro que deseas borrar la categoría "${catABorrar}"?`)) return;
    try {
      const categoria = categorias.find(cat => (cat.nombre || cat.name || "") === catABorrar);
      if (categoria && categoria.id && !IDS_ORIGINALES.includes(categoria.id)) {
        await removeCategoria(categoria.id);
        // Limpiar la categoría de los productos que la tenían en localStorage
        const productosActualizados = JSON.parse(localStorage.getItem("productosActualizados")) || [];
        const nuevosProductos = productosActualizados.map(p =>
          p.categoria === catABorrar ? { ...p, categoria: "" } : p
        );
        localStorage.setItem("productosActualizados", JSON.stringify(nuevosProductos));
      }
      // Recargar para reflejar cambios
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      alert("Error al borrar la categoría personalizada");
    }
  };

  const resetearCategoriasPersonalizadas = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar todas las categorías personalizadas?")) return;
    try {
      for (const categoria of categorias) {
        if (!IDS_ORIGINALES.includes(categoria.id)) {
          await removeCategoria(categoria.id);
        }
      }
      // Limpiar localStorage
      localStorage.removeItem("productosActualizados");
      localStorage.removeItem("categoriasExtra");
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      alert("Error al resetear categorías personalizadas");
    }
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
            <button className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-semibold px-4 py-2 rounded-full shadow-sm text-sm transition-all border border-yellow-200" onClick={resetearCategoriasPersonalizadas}>
              Resetear categorías personalizadas
            </button>
          </div>
        </div>
        
        {/* Estado de carga */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            <p className="mt-2 text-gray-600">Cargando categorías...</p>
          </div>
        )}
        
        {/* Estado de error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">Error al cargar categorías: {error}</p>
          </div>
        )}
        
        {/* Lista de categorías */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-600 uppercase">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-600 uppercase">Nombre</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-600 uppercase">Descripción</th>
                  <th className="px-4 py-2 text-center text-xs font-bold text-gray-600 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {categorias.map((cat) => (
                  <tr key={cat.id}>
                    <td className="px-4 py-2 text-sm text-gray-700">{cat.id}</td>
                    <td className="px-4 py-2 text-sm font-semibold text-gray-800">{cat.nombre}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{cat.descripcion}</td>
                    <td className="px-4 py-2 text-center">
                      {!IDS_ORIGINALES.includes(cat.id) && (
                        <button className="bg-red-50 hover:bg-red-100 text-red-500 font-bold px-4 py-1 rounded-full text-xs shadow-sm transition-all border border-red-100" onClick={() => borrarCategoria(cat.nombre)}>
                          Borrar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
                  <img src={producto.imagen} className="w-10 h-10 rounded-lg object-contain bg-white border border-gray-100" alt={producto.nombre} />
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 text-sm">{producto.nombre}</span>
                    <span className="text-xs text-gray-400">{producto.categoria}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-2 justify-end mt-6">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-full shadow-sm text-sm transition-all border border-gray-200" onClick={cerrarModal}>Cancelar</button>
              <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-full shadow-sm text-sm transition-all" onClick={guardarCategoria}>Guardar categoría</button>
              <button className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-semibold px-4 py-2 rounded-full shadow-sm text-sm transition-all border border-yellow-200" onClick={resetearCategoriasPersonalizadas}>
                Resetear categorías personalizadas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestorCategorias;
