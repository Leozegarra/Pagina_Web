import React, { useState } from "react";
import { useCategorias } from "../../../contexts/CategoriaContexto";

export default function AgregarCategoria() {
  const [name, setname] = useState("");
  const [imagen, setImagen] = useState("");
  const { agregarCategoria } = useCategorias();

  const handleAgregar = () => {
    if (name.trim() !== "" && imagen.trim() !== "") {
      agregarCategoria({ name: name.trim(), imagen: imagen.trim() });
      setname("");
      setImagen("");
    } else {
      alert("Por favor, ingresa name e imagen (URL)");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="name de la categoría"
        value={name}
        onChange={(e) => setname(e.target.value)}
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