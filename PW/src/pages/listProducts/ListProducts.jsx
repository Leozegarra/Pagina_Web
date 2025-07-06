import React, { useEffect, useState } from "react";
import ProductTable from "./components/ProductsTable";
import DashboardHeader from "../../components/DashboardHeader/DashBoardHeader";
import Sidebar from "../../components/SideBar/SideBar";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) throw new Error('Error al obtener productos');
        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

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

  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (product.nombre || '').toLowerCase().includes(searchLower) ||
      (product.categoria || '').toLowerCase().includes(searchLower) ||
      (product.descripcion || '').toLowerCase().includes(searchLower)
    );
  });

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