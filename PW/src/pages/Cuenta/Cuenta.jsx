import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { STORAGE_KEYS, localStorageService } from "../../services/localStorage";

const Cuenta = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [ordenes, setOrdenes] = useState([]);
  const [vista, setVista] = useState("ordenes");

  useEffect(() => {
    const userStorage = localStorage.getItem("usuario_actual");
    if (!userStorage) {
      navigate("/login");
      return;
    }

    const usuarioActual = JSON.parse(userStorage);
    setUsuario(usuarioActual);

    const ordenesTotales = localStorageService.getData(STORAGE_KEYS.ORDERS);
    const ordenesDelUsuario = ordenesTotales.filter(
      (orden) => orden.email === usuarioActual.email
    );
    setOrdenes(ordenesDelUsuario);
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario_actual");
    navigate("/");
    window.location.reload();
  };

  if (!usuario) return null;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Mi Cuenta</h3>

      <div className="row">
        {/* Panel lateral */}
        <div className="col-md-3 mb-4">
          <div className="card text-center">
            <img
              src={usuario.avatar}
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

          {/* Menú */}
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

        {/* Panel derecho dinámico */}
        <div className="col-md-9">
          {vista === "ordenes" && (
            <>
              <h4>Mis órdenes</h4>
              <table className="table table-hover mt-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {ordenes.length > 0 ? (
                    ordenes.map((orden) => (
                      <tr key={orden.id}>
                        <td>{orden.id}</td>
                        <td>{orden.producto}</td>
                        <td>S/. {orden.precio}</td>
                        <td>{orden.cantidad}</td>
                        <td>{orden.estado}</td>
                        <td>{orden.fecha}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">
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
                <li className="list-group-item"><strong>Nombre:</strong> {usuario.name}</li>
                <li className="list-group-item"><strong>Email:</strong> {usuario.email}</li>
                <li className="list-group-item"><strong>Rol:</strong> {usuario.role}</li>
                <li className="list-group-item"><strong>Estado:</strong> {usuario.status}</li>
              </ul>
            </>
          )}

          {vista === "contrasena" && (
            <>
              <h4>Cambiar Contraseña</h4>
              <div className="mt-3">
                <input
                  type="password"
                  placeholder="Contraseña actual"
                  className="form-control mb-2"
                />
                <input
                  type="password"
                  placeholder="Nueva contraseña"
                  className="form-control mb-2"
                />
                <input
                  type="password"
                  placeholder="Confirmar nueva contraseña"
                  className="form-control mb-3"
                />
                <button className="btn btn-success">Guardar contraseña</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cuenta;
