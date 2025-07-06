import React, { useState } from "react";
import ProductRow from "./ProductsRow.jsx";

const ProductTable = ({ products, onDelete, onEdit }) => {
  const [form, setForm] = useState({});

  const startEdit = (product) => {
    setForm(product);
  };

  const saveEdit = () => {
    onEdit(form);
  };

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-100 bg-white">
      <table className="min-w-full text-sm md:text-base">
        <thead>
          <tr className="bg-teal-50 text-teal-700 sticky top-0 z-10">
            <th className="p-3 font-bold">Imagen</th>
            <th className="p-3 font-bold">ID</th>
            <th className="p-3 font-bold">Nombre</th>
            <th className="p-3 font-bold">Categoria</th>
            <th className="p-3 font-bold">Descripcion</th>
            <th className="p-3 font-bold">Stock</th>
            <th className="p-3 font-bold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <ProductRow key={product.id} product={product} onEdit={startEdit} onSave={saveEdit} onDelete={onDelete} index={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
