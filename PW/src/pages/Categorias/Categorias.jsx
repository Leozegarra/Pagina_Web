import React, { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useCategorias } from "../../contexts/CategoriaContexto";
import { useProductos } from "../../contexts/ProductContext";
import SideBar from '../../components/SideBar/SideBar';
import DashboardHeader from '../../components/DashboardHeader/DashBoardHeader';

function App() {
  const { productos, loading: loadingProductos, error: errorProductos } = useProductos();
  const { categorias, loading, error, createCategoria, removeCategoria } = useCategorias();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoModal, setProductoModal] = useState(null);
  const { addToCart } = useCart();

  const [gestionarModal, setGestionarModal] = useState(false);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const IDS_ORIGINALES = [1,2,3,4,5,6,7,8,9,10];

  useEffect(() => {
    if (categorias.length > 0 && !categoriaSeleccionada) {
      setCategoriaSeleccionada(categorias[0].nombre || categorias[0].name || "");
    }
  }, [categorias, categoriaSeleccionada]);

  // Buscar la categoría seleccionada por nombre
  const categoriaObj = categorias.find(cat => (cat.nombre || cat.name) === categoriaSeleccionada);
  const categoriaId = categoriaObj?.id;

  // Filtrar productos por categoriaId
  const productosFiltrados = productos.filter(
    (p) => p.categoriaId === categoriaId
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
      const nuevaCategoria = await createCategoria({
        nombre: limpia,
        descripcion: `Categoría ${limpia}`
      });

      // Actualizar productos seleccionados
      const productosActualizados = [...productos];
      productosSeleccionados.forEach(id => {
        const index = productosActualizados.findIndex(p => p.id === id);
        if (index !== -1) {
          productosActualizados[index].categoria = limpia;
        }
      });
      localStorage.setItem("productosActualizados", JSON.stringify(productosActualizados));
      
      // Seleccionar la nueva categoría
      setCategoriaSeleccionada(limpia);
      cerrarGestionarModal();
    } catch (error) {
      console.error('Error al crear categoría:', error);
      alert("Error al crear la categoría. Inténtalo de nuevo.");
    }
  };
  
  const borrarCategoria = async (catABorrar) => {
    if (!window.confirm(`¿Seguro que deseas borrar la categoría "${catABorrar}"?`)) return;
    
    try {
      // Encontrar la categoría en el array para obtener su ID
      const categoria = categorias.find(cat => 
        (cat.nombre || cat.name || "") === catABorrar
      );
      
      if (categoria && categoria.id) {
        await removeCategoria(categoria.id);
      }
      
      // Limpiar la categoría de los productos que la tenían
      const productosActualizados = productos.map(p =>
        p.categoria === catABorrar ? { ...p, categoria: "" } : p
      );
      localStorage.setItem("productosActualizados", JSON.stringify(productosActualizados));
      
      // Si la categoría seleccionada fue borrada, selecciona la primera disponible
      if (categoriaSeleccionada === catABorrar) {
        const nuevasCategorias = categorias.filter(cat => 
          (cat.nombre || cat.name || "") !== catABorrar
        );
        setCategoriaSeleccionada(nuevasCategorias[0]?.nombre || nuevasCategorias[0]?.name || "");
      }
    } catch (error) {
      console.error('Error al borrar categoría:', error);
      alert("Error al borrar la categoría. Inténtalo de nuevo.");
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
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      alert("Error al resetear categorías personalizadas");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SideBar onGestionarCategorias={abrirGestionarModal} onResetCategorias={resetearCategoriasPersonalizadas} />
      <main className="flex-1 w-full max-w-7xl mx-auto px-8 py-10">
        <DashboardHeader title="Categorías" onGestionarCategorias={abrirGestionarModal} />
        
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
          <ul className="flex flex-wrap gap-2 mb-8">
            {categorias.map((cat) => {
              const nombreCategoria = cat.nombre || cat.name || "";
              return (
                <li
                  key={cat.id || cat.nombre || cat.name}
                  className={`px-4 py-2 rounded-full cursor-pointer font-medium text-sm transition-all border ${nombreCategoria === categoriaSeleccionada ? 'bg-teal-50 text-teal-700 border-teal-200 shadow' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}
                  onClick={() => setCategoriaSeleccionada(nombreCategoria)}
                >
                  {nombreCategoria}
                </li>
              );
            })}
          </ul>
        )}
        
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
                  alt={producto.nombre}
                  className="object-contain w-16 h-16 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-sm font-semibold text-gray-800 text-center truncate w-full">{producto.nombre}</div>
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
              alt={productoModal.nombre}
              className="w-40 h-40 object-contain rounded-lg mb-4 shadow"
            />
            <p className="font-bold text-lg text-teal-600 mb-6">Precio: S/ {productoModal.precio}</p>
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
                    <img src={producto.imagen} className="w-10 h-10 rounded-lg object-contain bg-white border border-gray-100" alt={producto.nombre} />
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800 text-sm">{producto.nombre}</span>
                      <span className="text-xs text-gray-400">{producto.categoria}</span>
                    </div>
                    {seleccionado && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col md:flex-row gap-2 justify-end mt-6">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-full shadow-sm text-sm transition-all border border-gray-200" onClick={cerrarGestionarModal}>Cancelar</button>
              <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-full shadow-sm text-sm transition-all" onClick={guardarCategoria}>Guardar categoría</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
