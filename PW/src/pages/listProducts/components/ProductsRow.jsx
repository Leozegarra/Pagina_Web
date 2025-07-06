import React from "react";
import { useNavigate } from "react-router-dom";

const ProductsRow = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const { id, image, name, category, description, stock, imagen, nombre, categoria, descripcion } = product;

  const handleRowClick = () => {
    navigate(`/admin/detailProduct/${id}`);
  };

  return (
    <tr className="border-t hover:bg-teal-50 transition duration-150 cursor-pointer" onClick={handleRowClick}>
      <td className="px-4 py-2 text-center">
        <img src={image || imagen} alt={name || nombre} className="w-12 h-12 object-cover mx-auto rounded-xl shadow" />
      </td>
      <td className="px-4 py-2 text-center font-mono text-gray-500">{id}</td>
      <td className="px-4 py-2 text-center font-semibold text-gray-800">{name || nombre}</td>
      <td className="px-4 py-2 text-center text-teal-700">{product.categoriaNombre || category || categoria}</td>
      <td className="px-4 py-2 text-center text-gray-600">{description || descripcion}</td>
      <td className="px-4 py-2 text-center font-bold">{stock}</td>
      <td className="px-4 py-2 text-center space-x-2">
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(id); }}
          className="px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-lg shadow hover:bg-red-600 transition-all"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default ProductsRow;
