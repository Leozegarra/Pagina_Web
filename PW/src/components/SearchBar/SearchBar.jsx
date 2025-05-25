// src/components/SearchBar/SearchBar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import productos from "../../contexts/ProductosJSON";

const SearchBar = () => {
  const [busqueda, setBusqueda] = useState("");

  const resultados = productos.filter(producto =>
    producto.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        value={busqueda}
        placeholder="Buscar producto..."
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ padding: 8, width: 300 }}
      />
      {busqueda && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            width: 300,
            maxHeight: 200,
            overflowY: "auto",
            zIndex: 1000,
            margin: 0,
            padding: 0,
            listStyle: "none",
          }}
        >
          {resultados.length === 0 ? (
            <li style={{ padding: "10px", color: "#888" }}>Sin resultados</li>
          ) : (
            resultados.map((producto) => (
              <li key={producto.id}>
                <Link
                  to={`/producto/${producto.id}`}
                  onClick={() => setBusqueda("")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    textDecoration: "none",
                    color: "black",
                    borderBottom: "1px solid #eee"
                  }}
                >
                  <img
                    src={producto.imagen}
                    alt={producto.name}
                    style={{ width: 40, height: 40, objectFit: "cover", marginRight: 10, borderRadius: 4 }}
                  />
                  {producto.name}
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

