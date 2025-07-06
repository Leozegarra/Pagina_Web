import React, { createContext, useContext, useState, useEffect } from "react";
import { productService } from "../services/productService";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAll();
      setProductos(data);
    } catch (err) {
      setError(err.message);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProductos();
  }, []);

  return (
    <ProductContext.Provider value={{ productos, loading, error, loadProductos }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductos = () => useContext(ProductContext); 