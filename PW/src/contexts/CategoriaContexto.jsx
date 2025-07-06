import React, { createContext, useContext, useState, useEffect } from "react";

const API_BASE_URL = 'http://localhost:3000/api';

const CategoriaContext = createContext();

export const CategoriaProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar categorías desde el backend
  const loadCategorias = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error('Error al obtener categorías');
      }
      const categoriasData = await response.json();
      setCategorias(categoriasData);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
      setError(err.message);
      // Fallback a categorías locales si hay error
      setCategorias([]);
    } finally {
      setLoading(false);
    }
  };

  // Crear nueva categoría
  const createCategoria = async (categoriaData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoriaData),
      });
      if (!response.ok) {
        throw new Error('Error al crear categoría');
      }
      const nuevaCategoria = await response.json();
      setCategorias(prev => [...prev, nuevaCategoria]);
      return nuevaCategoria;
    } catch (err) {
      console.error('Error al crear categoría:', err);
      throw err;
    }
  };

  // Actualizar categoría
  const updateCategoria = async (id, categoriaData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoriaData),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar categoría');
      }
      const categoriaActualizada = await response.json();
      setCategorias(prev => 
        prev.map(cat => cat.id === id ? categoriaActualizada : cat)
      );
      return categoriaActualizada;
    } catch (err) {
      console.error('Error al actualizar categoría:', err);
      throw err;
    }
  };

  // Eliminar categoría
  const removeCategoria = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar categoría');
      }
      setCategorias(prev => prev.filter(cat => cat.id !== id));
    } catch (err) {
      console.error('Error al eliminar categoría:', err);
      throw err;
    }
  };

  // Cargar categorías al montar el componente
  useEffect(() => {
    loadCategorias();
  }, []);

  const value = {
    categorias,
    loading,
    error,
    loadCategorias,
    createCategoria,
    updateCategoria,
    removeCategoria,
  };

  return (
    <CategoriaContext.Provider value={value}>
      {children}
    </CategoriaContext.Provider>
  );
};

export const useCategorias = () => {
  const context = useContext(CategoriaContext);
  if (!context) {
    throw new Error('useCategorias debe ser usado dentro de un CategoriaProvider');
  }
  return context;
};
