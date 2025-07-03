import React from "react";
import { useNavigate } from "react-router-dom";

const ProductsRow = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const { id, image, name, category, description, stock, imagen, nombre, categoria, descripcion } = product;

  const handleRowClick = () => {
    navigate(`/admin/products/${id}`);
  };

  return (
    <tr className="border-t hover:bg-gray-50 transition duration-150"
          onClick={handleRowClick}>
      <td className="px-4 py-2 text-center">
        <img src={image || imagen} alt={name || nombre} className="w-10 h-10 object-cover mx-auto rounded" />
      </td>
      <td className="px-4 py-2 text-center">{id}</td>
      <td className="px-4 py-2 text-center">{name || nombre}</td>
      <td className="px-4 py-2 text-center">{category || categoria}</td>
      <td className="px-4 py-2 text-center">{description || descripcion}</td>
      <td className="px-4 py-2 text-center">{stock}</td>
      <td className="px-4 py-2 text-center space-x-2">
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(id); }}
          className="px-2 py-1 text-sm text-red-600 border border-red-500 rounded hover:bg-red-100"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default ProductsRow;
