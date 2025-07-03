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
    <div className="container mt-4">
      <h3>Gestor de Categorías</h3>

      <button className="btn btn-secondary mb-3 me-2" onClick={() => navigate('/admin/categorias')}>
        Volver
      </button>

      <button className="btn btn-primary mb-3" onClick={abrirModal}>
        + Agregar categoría
      </button>

      {/* Lista de categorías con botón de borrar solo para extras */}
      <ul className="list-group">
        {categorias.map((cat, idx) => {
          const esCategoriaBase = categoriasBase.includes(cat);

          return (
            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{cat}</span>
              {!esCategoriaBase && (
                <button className="btn btn-sm btn-danger" onClick={() => borrarCategoria(cat)}>
                  Borrar
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {/* Modal para agregar nueva categoría */}
      {mostrarModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nueva Categoría</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Nombre de la nueva categoría"
                  value={nombreCategoria}
                  onChange={(e) => setNombreCategoria(e.target.value)}
                />

                <h6>Selecciona productos para esta categoría:</h6>
                <div className="row">
                  {productos.map((producto) => (
                    <div className="col-md-4 mb-3" key={producto.id}>
                      <div
                        className={`card ${productosSeleccionados.includes(producto.id) ? 'border-primary' : ''}`}
                        onClick={() => toggleProducto(producto.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <img src={producto.imagen} className="card-img-top" alt={producto.name} />
                        <div className="card-body">
                          <h6 className="card-title">{producto.name}</h6>
                          <p className="card-text"><small className="text-muted">{producto.categoria}</small></p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                <button className="btn btn-success" onClick={guardarCategoria}>Guardar categoría</button>
                <button className="btn btn-warning mt-3" onClick={() => { localStorage.removeItem("productosActualizados");
                                                                          localStorage.removeItem("categoriasExtra");
                                                                          window.location.reload();
                                                                        }}>Limpiar cambios (reset)</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestorCategorias;
