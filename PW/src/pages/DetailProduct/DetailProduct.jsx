import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import DashboardHeader from '../../components/DashboardHeader/DashBoardHeader';
import productos from '../../contexts/ProductosJSON';

const STORAGE_KEY = 'products_data';

const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const allProducts = [...productos, ...storedProducts];
    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      alert('Producto no encontrado');
      navigate('/admin/listProducts'); 
    }
  }, [id, navigate]);

  if (!product) return <p>Cargando...</p>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 p-6">
        <DashboardHeader title="Detalle del Producto" />
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow space-y-6">

          <h2 className="text-2xl font-bold text-gray-800 mb-4">{product.name || product.nombre}</h2>
          
          <img src={product.image || product.imagen} alt={product.name || product.nombre} className="w-40 h-40 object-cover rounded border" />

          <p><strong>Categoría:</strong> {product.category || product.categoria}</p>
          <p><strong>Descripción:</strong> {product.description || product.descripcion}</p>
          <p><strong>Stock:</strong> {product.stock}</p>

          <button
            onClick={() => navigate('/admin/listProducts')}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Volver
          </button>

        </div>
      </div>
    </div>
  );
};

export default DetailProduct;