import React, { createContext, useContext } from "react";
import productos from "./ProductosJSON"; 

const CategoriaContext = createContext();

export const CategoriaProvider = ({ children }) => {

  const categoriasUnicas = Array.from(
    new Map(
      productos.map((p) => [p.categoria, { nombre: p.categoria, imagen: p.imagen }])
    ).values()
  );

  return (
    <CategoriaContext.Provider value={{ categorias: categoriasUnicas }}>
      {children}
    </CategoriaContext.Provider>
  );
};

export const useCategorias = () => useContext(CategoriaContext);
