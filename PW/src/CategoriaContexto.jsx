// CategoriaContexto.jsx
import React, { createContext, useState, useContext } from "react";

const CategoriaContexto = createContext();

export function CategoriaProv({ children }) {
  const [categorias, setCategorias] = useState([
    { nombre: "Celulares", imagen: "https://raw.githubusercontent.com/hdpngworld/HPW/main/uploads/65038654434d0-iPhone%2015%20Pro%20Natural%20titanium%20png.png" },
    { nombre: "Videojuegos", imagen: "https://plazavea.vteximg.com.br/arquivos/categor%C3%ADa-VIDEOJUEGOS-NintendoSwitch-D.png" },
    { nombre: "Laptops", imagen: "https://p2-ofp.static.pub//fes/cms/2024/07/17/109vq5fdalv01w5jsu6vh35ncnk5jn890135.png" },
    { nombre: "Laptops Gamer", imagen: "https://cuscoinformatico.com/storage/LAPTOP%20GAMER%20MSI%20SWORD%2017%20HX%20B14VFKG.png" },
  ]);

  function agregarCategoria(nueva) {
    setCategorias((prev) => [...prev, nueva]);
  }

  return (
    <CategoriaContexto.Provider value={{ categorias, agregarCategoria }}>
      {children}
    </CategoriaContexto.Provider>
  );
}

export function useCategorias() {
  return useContext(CategoriaContexto);
}
