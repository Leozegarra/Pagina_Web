import React, { useEffect, useState } from "react"
import productosOriginales from "../../contexts/ProductosJSON"
import { useCart } from "../../contexts/CartContext"
import { useNavigate } from "react-router-dom"

const obtenerProductos = () => {
  const actualizados = JSON.parse(localStorage.getItem("productosActualizados"));
  return actualizados || productosOriginales;
};

const obtenerCategoriasBase = (productos) => {
  return [...new Set(productos.map((p) => p.categoria))]
};

function App() {
  const productos = obtenerProductos()
  const categoriasBase = obtenerCategoriasBase(productos)
  const [categorias, setCategorias] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("")
  const [modalAbierto, setModalAbierto] = useState(false)
  const [productoModal, setProductoModal] = useState(null)
  const navigate = useNavigate()
  const { addToCart } = useCart()

  // Cargar categorías combinadas al iniciar
  useEffect(() => {
    const extras = JSON.parse(localStorage.getItem("categoriasExtra")) || []
    const todas = [...new Set([...categoriasBase, ...extras])]
    setCategorias(todas)
    setCategoriaSeleccionada(todas[0])
  }, [])

  const productosFiltrados = productos.filter(
    (p) => p.categoria === categoriaSeleccionada
  )

  const abrirModal = (producto) => {
    setProductoModal(producto)
    setModalAbierto(true)
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setProductoModal(null)
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Panel lateral de categorías */}
      <div style={{ width: "200px", borderRight: "1px solid #ccc", padding: 20 }}>
        <h3 style={{color : "white"}}>Categorías</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {categorias.map((cat) => (
            <li
              key={cat}
              style={{
                padding: "8px",
                color: "white",
                cursor: "pointer",
                background: cat === categoriaSeleccionada ? "#e0e0e0" : "transparent",
                fontWeight: cat === categoriaSeleccionada ? "bold" : "normal"
              }}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>

        {/*Boton Gestor*/}
        <button
          onClick={() => navigate("/admin/gestorCategorias")}
          style={{
            marginTop: 20,
            padding: "10px 15px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            cursor: "pointer"
          }}
        >
          Gestionar Categorías
        </button>

        {/* Botón para regresar a sidebar */}
        <button
          onClick={() => navigate("/admin/listOrders")}
          style={{
            marginTop: 20,
            padding: "10px 15px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            cursor: "pointer"
          }}
        >
          Regresar
        </button>

      </div>

      {/* Productos filtrados */}

      <div style={{ flex: 1, padding: 20, display: "flex", flexWrap: "wrap", gap: 20 }}>
        {productosFiltrados.map((producto) => (
          <div
            key={producto.id}
            style={{ cursor: "pointer", width: 180, textAlign: "center" }}
            onClick={() => abrirModal(producto)}
          >
            <img
              src={producto.imagen}
              alt={producto.name}
              style={{ width: 150, height: 150, objectFit: "cover", borderRadius: 8 }}
            />
            <div>{producto.name}</div>
          </div>
        ))}

        {productosFiltrados.length === 0 && (
          <div style={{ padding: 40 }}>No hay productos en esta categoría.</div>
        )}
      </div>

      {/* Modal de producto */}

      {modalAbierto && productoModal && (
        <div
          onClick={cerrarModal}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: 30,
              borderRadius: 10,
              minWidth: 300,
              textAlign: "center"
            }}
          >
            <h2>{productoModal.name}</h2>
            <img
              src={productoModal.imagen}
              alt={productoModal.name}
              style={{ width: 200, height: 200, objectFit: "cover", borderRadius: 8 }}
            />
            <p style={{ fontWeight: "bold", fontSize: 18 }}>
              Precio: S/ {productoModal.price}
            </p>
            <button
              onClick={() => {
                addToCart(productoModal)
                cerrarModal()
              }}
              style={{
                background: "#007bff",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: 5,
                cursor: "pointer"
              }}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
