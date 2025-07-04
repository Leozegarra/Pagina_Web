import React, { useState } from "react";
import ProductRow from "./ProductsRow.jsx";

const ProductTable = ({ products, onDelete, onEdit }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({});

  const startEdit = (product) => {
    setEditingProduct(product.id);
    setForm(product);
  };


  const saveEdit = () => {
    onEdit(form);
    setEditingProduct(null);
  };

  return (
    <table className="w-full bg-white rounded-lg shadow">
      <thead>
        <tr className="bg-gray-100 text-left">
<<<<<<< HEAD
          <th className="p-2">Nombre</th>
          <th className="p-2">Categoría</th>
          <th className="p-2">Presentación</th>
          <th className="p-2">Descripción</th>
          <th className="p-2">Stock</th>
          <th className="p-2">Imagen</th>
          <th className="p-2">Acciones</th>
=======
          <th className="p-2">Imagen</th>
          <th className="p-2">ID</th>
          <th className="p-2">Nombre</th>
          <th className="p-2">Categoria</th>
          <th className="p-2">Descripcion</th>
          <th className="p-2">Stock</th>
>>>>>>> 098cf79 (Cambios en el carrito)
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <ProductRow key={product.id} product={product} onEdit={startEdit} onSave={saveEdit} onDelete={onDelete} index={index + 1} />
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
