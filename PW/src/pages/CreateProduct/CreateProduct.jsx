<<<<<<< HEAD
import React, { useState } from 'react';
import DashboardHeader from '../../components/DashboardHeader/DashBoardHeader';
import SideBar from '../../components/SideBar/SideBar';
=======
import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/DashboardHeader/DashBoardHeader';
import SideBar from '../../components/SideBar/SideBar';
import productos from '../../contexts/ProductosJSON';

const STORAGE_KEY = 'products_data';
>>>>>>> 098cf79 (Cambios en el carrito)

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    nombre: '',
<<<<<<< HEAD
    presentacion: '',
=======
>>>>>>> 098cf79 (Cambios en el carrito)
    categoria: '',
    descripcion: '',
    stock: 0,
    imagen: 'https://via.placeholder.com/150'
  });

<<<<<<< HEAD
=======
  const categoriasUnicas = Array.from(new Set(productos.map(p => p.categoria)));

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
    }
  }, []);

>>>>>>> 098cf79 (Cambios en el carrito)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: name === "stock" ? Number(value) : value
      }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

<<<<<<< HEAD
    const existingProducts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const newProduct = {
      id: Date.now(),
      ...formData
      };
=======
    // Validación de campos
    if (
      !formData.nombre.trim() ||
      !formData.categoria.trim() ||
      formData.categoria === '' ||
      formData.categoria === 'Seleccione una categoría' ||
      !formData.descripcion.trim() ||
      !formData.imagen.trim() ||
      formData.stock === '' || formData.stock === null
    ) {
      alert('Por favor, complete todos los campos y seleccione una categoría válida.');
      return;
    }

    const existingProducts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const newProduct = {
      id: Date.now(),
      name: formData.nombre,
      category: formData.categoria,
      description: formData.descripcion,
      stock: formData.stock,
      image: formData.imagen
    };
>>>>>>> 098cf79 (Cambios en el carrito)
    const updatedProducts = [...existingProducts, newProduct];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));

    alert('Producto creado correctamente');

    setFormData({
      nombre: '',
<<<<<<< HEAD
      presentacion: '',
=======
>>>>>>> 098cf79 (Cambios en el carrito)
      categoria: '',
      descripcion: '',
      stock: 0,
      imagen: 'https://via.placeholder.com/150'
    });
<<<<<<< HEAD

  };



    
  
=======
  };

>>>>>>> 098cf79 (Cambios en el carrito)
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
<<<<<<< HEAD
            <label className="block text-gray-700 font-medium mb-1">Presentación</label>
            <input
              type="text"
              name="presentacion"
              value={formData.presentacion}
              onChange={handleChange}
              placeholder="Presentación"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
=======
>>>>>>> 098cf79 (Cambios en el carrito)
            <label className="block text-gray-700 font-medium mb-1">Categoría</label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Seleccione una categoría</option>
<<<<<<< HEAD
              <option value="computadora">Computadoras</option>
              <option value="monitor">Monitores</option>
              <option value="consola">Consolas</option>
              <option value="otro">Otro</option>
            </select>
            {formData.categoria == "otro" && <input type = "text" placeholder="Nueva Categoria"></input>}
            

            
=======
              {categoriasUnicas.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
>>>>>>> 098cf79 (Cambios en el carrito)
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
<<<<<<< HEAD
            <label className="block text-gray-700 font-medium mb-1">Imagen</label>
            <img src="https://previews.123rf.com/images/alekseyvanin/alekseyvanin1711/alekseyvanin171101174/89765677-agregar-%C3%ADcono-de-imagen.jpg" alt="Preview" className="mb-3 rounded border"  />
            {/* data base*/}
=======
            <input
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              placeholder="Colocar el link de la imagen"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
>>>>>>> 098cf79 (Cambios en el carrito)
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

          <div className="text-end">
            <button
              type="submit"
<<<<<<< HEAD
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
=======
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
>>>>>>> 098cf79 (Cambios en el carrito)
              Crear Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct
