import React from "react";
import Carrusel from "./components/Carrusel";
import AgregarCategoria from "./components/AgregarCategoria";
import CarruselCategorias from "./components/CarruselCategorias";
import ProductCard from './components/ProductCard'
import CarruselProductosAleatorios from "./components/CarruselProductos";

export default function Home() {
  return (
    <div className="w-full">
      <Carrusel />
      <div className="my-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-2 relative inline-block mx-auto after:block after:w-16 after:h-1 after:bg-teal-500 after:mx-auto after:rounded-full after:mt-2">Explora las Categorías</h2>
        <div className="bg-gradient-to-r from-teal-50 via-white to-cyan-50 rounded-3xl shadow-lg py-8 px-2 md:px-8 max-w-6xl mx-auto mt-8">
          <CarruselCategorias />
        </div>
      </div>
      <div className="my-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-2 relative inline-block mx-auto after:block after:w-16 after:h-1 after:bg-teal-500 after:mx-auto after:rounded-full after:mt-2">Los Mejores Productos</h2>
        <div className="bg-gradient-to-r from-cyan-50 via-white to-teal-50 rounded-3xl shadow-lg py-8 px-2 md:px-8 max-w-6xl mx-auto mt-8">
          <CarruselProductosAleatorios />
        </div>
      </div>
    </div>
  );
}