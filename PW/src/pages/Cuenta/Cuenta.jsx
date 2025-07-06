import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { STORAGE_KEYS, localStorageService } from "../../services/localStorage"

const Cuenta = () => {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)
  const [ordenes, setOrdenes] = useState([])
  const [vista, setVista] = useState("ordenes")
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null)

  useEffect(() => {
    const userStorage =
      localStorage.getItem("loggedUser") || localStorage.getItem("usuario_actual")
    if (!userStorage) {
      navigate("/login")
      return
    }

    const usuarioActual = JSON.parse(userStorage)
    setUsuario(usuarioActual)

    const ordenesTotales = localStorageService.getData(STORAGE_KEYS.ORDERS)
    const ordenesDelUsuario = ordenesTotales.filter(
      (orden) => orden.email === usuarioActual.email
    )
    setOrdenes(ordenesDelUsuario)
  }, [navigate])

  const cerrarSesion = () => {
    localStorage.removeItem("usuario_actual")
    navigate("/")
    window.location.reload()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUsuario((prev) => ({ ...prev, [name]: value }))
  }

  const handleGuardarContrasena = () => {
    const { oldPassword, newPassword, confirmPassword } = usuario

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Completa todos los campos")
      return
    }

    if (oldPassword !== usuario.password) {
      alert("La contraseña actual es incorrecta")
      return
    }

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas nuevas no coinciden")
      return
    }

    const usuarios = localStorageService.getData(STORAGE_KEYS.USERS)
    const index = usuarios.findIndex((u) => u.email === usuario.email)

    if (index !== -1) {
      usuarios[index].password = newPassword
      localStorageService.saveData(STORAGE_KEYS.USERS, usuarios)

      const updatedUser = { ...usuario, password: newPassword }
      delete updatedUser.oldPassword
      delete updatedUser.newPassword
      delete updatedUser.confirmPassword

      localStorage.setItem("usuario_actual", JSON.stringify(updatedUser))
      setUsuario(updatedUser)

      alert("Contraseña actualizada correctamente")
    } else {
      alert("Error al actualizar la contraseña")
    }
  }

  const calcularTotal = (items) =>
    items.reduce((sum, item) => sum + item.precio * (item.cantidad || 1), 0)

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
              <h5>{usuario.name}</h5>
              <p className="text-muted">{usuario.email}</p>
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
              Detalle de orden
            </button>
            <button
              className={`btn btn-${vista === "datos" ? "primary" : "light"}`}
              onClick={() => setVista("datos")}
            >
              Datos de registro de usuario
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
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ordenes.length > 0 ? (
                    ordenes.map((orden) => (
                      <tr key={orden.id}>
                        <td>{orden.id}</td>
                        <td>{orden.fecha}</td>
                        <td>S/. {calcularTotal(orden.items).toFixed(2)}</td>
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
                      <td colSpan="4" className="text-center text-muted">
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
                  <strong>Nombre:</strong> {usuario.name}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {usuario.email}
                </li>
                <li className="list-group-item">
                  <strong>Rol:</strong> {usuario.role}
                </li>
                <li className="list-group-item">
                  <strong>Estado:</strong> {usuario.status}
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
                  value={usuario.oldPassword || ""}
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Nueva contraseña"
                  className="form-control mb-2"
                  value={usuario.newPassword || ""}
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar nueva contraseña"
                  className="form-control mb-3"
                  value={usuario.confirmPassword || ""}
                  onChange={handleInputChange}
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
                    {ordenSeleccionada.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.nombre}</td>
                        <td>S/. {item.precio}</td>
                        <td>{item.cantidad}</td>
                        <td>S/. {(item.precio * item.cantidad).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h5 className="text-end mt-3">
                  Total: S/. {calcularTotal(ordenSeleccionada.items).toFixed(2)}
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
