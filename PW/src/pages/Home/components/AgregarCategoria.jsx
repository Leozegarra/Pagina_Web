import React, { useState } from "react";
import { useCategorias } from "../../../contexts/CategoriaContexto";

export default function AgregarCategoria() {
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState("");
  const { agregarCategoria } = useCategorias();

  const handleAgregar = () => {
    if (nombre.trim() !== "" && imagen.trim() !== "") {
      agregarCategoria({ nombre: nombre.trim(), imagen: imagen.trim() });
      setNombre("");
      setImagen("");
    } else {
      alert("Por favor, ingresa nombre e imagen (URL)");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Nombre de la categoría"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="URL de la imagen"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button onClick={handleAgregar}>Agregar Categoría</button>
    </div>
  );
}