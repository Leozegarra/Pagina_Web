import React, { useEffect, useState } from "react";
import ProductTable from "./components/ProductsTable";
import DashboardHeader from "../../components/DashboardHeader/DashBoardHeader";
import Sidebar from "../../components/SideBar/SideBar";
import productos from '../../contexts/ProductosJSON';

const STORAGE_KEY = 'products_data';

const ListProducts = () => {
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEY);
      return savedProducts ? JSON.parse(savedProducts) : productos;
    } catch (error) {
      console.error('Error al cargar productos:', error);
      return productos;
    }
  });
  const deleteProduct = (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este producto?");
    if (!confirm) return;
    const updated = products.filter(p => p.id !== id);
    setProducts(updated); 
  };
  const editProduct = (updatedProduct) => {
    const updated = products.map(p => (p.id === updatedProduct.id ? updatedProduct : p));
    setProducts(updated);
  };

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error('Error guardando productos en localStorage:', error);
    }
  }, [products]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <DashboardHeader title="Lista de Productos" />
        <div className="mt-10 mr-2 ml-2">
          <div className="relative flex gap-12">
            <input
              type="text"
              placeholder="Buscar por nombre, categoría o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {searchTerm && (
            <p className="mt-2 text-sm text-gray-500">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'resultado' : 'resultados'} encontrados
            </p>
          )}
        </div>

        <ProductTable 
          products={filteredProducts} 
          onDelete={deleteProduct} 
          onEdit={editProduct} 
        />
      </div>
    </div>
  );
};

export default ListProducts;