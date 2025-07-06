import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/DashboardHeader/DashBoardHeader';
import SideBar from '../../components/SideBar/SideBar';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    categoriaId: '',
    descripcion: '',
    precio: '',
    stock: 0,
    imagen: 'https://via.placeholder.com/150'
  });
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categories');
        if (!response.ok) throw new Error('Error al obtener categorías');
        const categoriasData = await response.json();
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
        setCategorias([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" ? Number(value) : name === "precio" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.nombre.trim() ||
      !formData.categoriaId ||
      !formData.descripcion.trim() ||
      !formData.imagen.trim() ||
      formData.stock === '' || formData.stock === null ||
      formData.precio === '' || formData.precio === null
    ) {
      alert('Por favor, complete todos los campos y seleccione una categoría válida.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Error al crear producto');
      alert('Producto creado correctamente');
      setFormData({
        nombre: '',
        categoriaId: '',
        descripcion: '',
        precio: '',
        stock: 0,
        imagen: 'https://via.placeholder.com/150'
      });
    } catch (error) {
      alert('Error al crear producto: ' + error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 p-6">
        <DashboardHeader title="Crear Producto" />
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nombre del Producto</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre del Producto"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Categoría</label>
            <select
              name="categoriaId"
              value={formData.categoriaId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="4"
              placeholder="Escribe la descripción del producto..."
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <input
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              placeholder="Colocar el link de la imagen"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              min="0"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Precio</label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              min="0"
              step="0.01"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="text-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Crear Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
