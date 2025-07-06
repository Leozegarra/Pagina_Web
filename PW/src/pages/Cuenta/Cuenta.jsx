import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Cuenta = () => {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)
  const [ordenes, setOrdenes] = useState([])
  const [vista, setVista] = useState("ordenes")
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null)
  const [loading, setLoading] = useState(true)
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  useEffect(() => {
    const userStorage = localStorage.getItem("loggedUser") || localStorage.getItem("usuario_actual")
    if (!userStorage) {
      navigate("/login")
      return
    }

    const usuarioActual = JSON.parse(userStorage)
    setUsuario(usuarioActual)
    
    // Obtener datos actualizados del usuario desde la API
    fetchUserData(usuarioActual.id)
    // Obtener órdenes del usuario desde la API
    fetchUserOrders(usuarioActual.id)
  }, [navigate])

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}`)
      if (response.ok) {
        const userData = await response.json()
        setUsuario(userData)
        // Actualizar localStorage con datos actualizados
        localStorage.setItem("usuario_actual", JSON.stringify(userData))
      }
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserOrders = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/orders?usuarioId=${userId}`)
      if (response.ok) {
        const ordersData = await response.json()
        setOrdenes(ordersData)
      }
    } catch (error) {
      console.error("Error al obtener órdenes del usuario:", error)
    }
  }

  const cerrarSesion = () => {
    localStorage.removeItem("usuario_actual")
    localStorage.removeItem("loggedUser")
    navigate("/")
    window.location.reload()
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }

  const handleGuardarContrasena = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Completa todos los campos")
      return
    }

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas nuevas no coinciden")
      return
    }

    try {
      const response = await fetch(`http://localhost:3001/api/users/${usuario.id}/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword,
          newPassword
        })
      })

      if (response.ok) {
        alert("Contraseña actualizada correctamente")
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        })
      } else {
        const errorData = await response.json()
        alert(errorData.message || "Error al actualizar la contraseña")
      }
    } catch (error) {
      console.error("Error al cambiar contraseña:", error)
      alert("Error al cambiar la contraseña")
    }
  }

  const calcularTotal = (items) => {
    if (!items || !Array.isArray(items)) return 0
    return items.reduce((sum, item) => sum + (item.precio || 0) * (item.cantidad || 1), 0)
  }

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!usuario) return null

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Mi Cuenta</h3>
      <div className="row">
        {/* Panel lateral */}
        <div className="col-md-3 mb-4">
          <div className="card text-center">
            <img
              src={usuario.avatar || "https://via.placeholder.com/300x200.png?text=Avatar"}
              alt="Avatar"
              className="card-img-top"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5>{usuario.nombre}</h5>
              <p className="text-muted">{usuario.correo}</p>
              <button
                onClick={cerrarSesion}
                className="btn btn-outline-danger btn-sm mt-2"
              >
                Cerrar sesión
              </button>
            </div>
          </div>

          <div className="mt-3 d-grid gap-2">
            <button
              className={`btn btn-${vista === "ordenes" ? "primary" : "light"}`}
              onClick={() => setVista("ordenes")}
            >
              Mis órdenes
            </button>
            <button
              className={`btn btn-${vista === "datos" ? "primary" : "light"}`}
              onClick={() => setVista("datos")}
            >
              Datos de registro
            </button>
            <button
              className={`btn btn-${vista === "contrasena" ? "primary" : "light"}`}
              onClick={() => setVista("contrasena")}
            >
              Cambiar contraseña
            </button>
          </div>
        </div>

        {/* Panel dinámico derecho */}
        <div className="col-md-9">
          {vista === "ordenes" && (
            <>
              <h4>Mis órdenes</h4>
              <table className="table table-hover mt-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ordenes.length > 0 ? (
                    ordenes.map((orden) => (
                      <tr key={orden.id}>
                        <td>{orden.id}</td>
                        <td>{new Date(orden.fechaCreacion).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge bg-${orden.estado === 'completada' ? 'success' : orden.estado === 'pendiente' ? 'warning' : 'secondary'}`}>
                            {orden.estado}
                          </span>
                        </td>
                        <td>S/. {orden.total?.toFixed(2) || calcularTotal(orden.productos).toFixed(2)}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-info"
                            onClick={() => setOrdenSeleccionada(orden)}
                          >
                            Ver detalle
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        No tienes órdenes registradas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}

          {vista === "datos" && (
            <>
              <h4>Datos del Usuario</h4>
              <ul className="list-group mt-3">
                <li className="list-group-item">
                  <strong>Nombre:</strong> {usuario.nombre}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {usuario.correo}
                </li>
                <li className="list-group-item">
                  <strong>Rol:</strong> {usuario.rol}
                </li>
                <li className="list-group-item">
                  <strong>Estado:</strong> {usuario.estado}
                </li>
                <li className="list-group-item">
                  <strong>Fecha de registro:</strong> {new Date(usuario.fechaCreacion).toLocaleDateString()}
                </li>
              </ul>
            </>
          )}

          {vista === "contrasena" && (
            <>
              <h4>Cambiar Contraseña</h4>
              <div className="mt-3">
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="Contraseña actual"
                  className="form-control mb-2"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Nueva contraseña"
                  className="form-control mb-2"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar nueva contraseña"
                  className="form-control mb-3"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                />
                <button className="btn btn-success" onClick={handleGuardarContrasena}>
                  Guardar contraseña
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal para detalle de orden */}
      {ordenSeleccionada && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setOrdenSeleccionada(null)}
        >
          <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalle de Orden #{ordenSeleccionada.id}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setOrdenSeleccionada(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <strong>Estado:</strong> {ordenSeleccionada.estado}
                  <br />
                  <strong>Fecha:</strong> {new Date(ordenSeleccionada.fechaCreacion).toLocaleString()}
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordenSeleccionada.productos && ordenSeleccionada.productos.length > 0 ? (
                      ordenSeleccionada.productos.map((item, index) => (
                        <tr key={index}>
                          <td>{item.nombre}</td>
                          <td>S/. {item.precio}</td>
                          <td>{item.cantidad}</td>
                          <td>S/. {(item.precio * item.cantidad).toFixed(2)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-muted">
                          No hay productos en esta orden
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <h5 className="text-end mt-3">
                  Total: S/. {ordenSeleccionada.total?.toFixed(2) || calcularTotal(ordenSeleccionada.productos).toFixed(2)}
                </h5>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setOrdenSeleccionada(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cuenta
