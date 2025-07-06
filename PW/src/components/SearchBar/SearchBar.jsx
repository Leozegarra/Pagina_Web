// src/components/SearchBar/SearchBar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import productos from "../../contexts/ProductosJSON";

const SearchBar = () => {
  const [busqueda, setBusqueda] = useState("");

  const resultados = productos.filter(producto =>
    (typeof producto.nombre === 'string' && producto.nombre.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <div className="relative w-full max-w-xs md:max-w-md">
      <div className="flex items-center relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-3.5-3.5" /></svg>
        </span>
        <input
          type="text"
          value={busqueda}
          placeholder="Buscar producto..."
          onChange={(e) => setBusqueda(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 shadow-sm text-gray-800 placeholder-gray-400 bg-white transition-all"
        />
      </div>
      {busqueda && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
          {resultados.length === 0 ? (
            <li className="px-4 py-3 text-gray-400">Sin resultados</li>
          ) : (
            resultados.map((producto) => (
              <li key={producto.id}>
                <Link
                  to={`/producto/${producto.id}`}
                  onClick={() => setBusqueda("")}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-teal-50 transition rounded-xl"
                >
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-10 h-10 object-cover rounded-lg shadow"
                  />
                  <span className="truncate text-gray-700">{producto.nombre}</span>
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

