import React from "react";
import { useParams } from "react-router-dom";
import productos from "../../contexts/ProductosJSON";

const ProductoDetalle = () => {
  const { id } = useParams();
  const producto = productos.find(p => p.id === parseInt(id));

  if (!producto) return <div>Producto no encontrado.</div>;

  return (
    <div style={{ padding: 30 }}>
      <h2>{producto.nombre}</h2>
      <img src={producto.imagen} alt={producto.nombre} width={300} />
      <p><strong>Precio:</strong> S/ {producto.precio}</p>
      <p><strong>Descripción:</strong> {producto.descripcion}</p>
    </div>
  );
};

export default ProductoDetalle;
