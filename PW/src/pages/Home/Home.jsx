import React from "react";
import Carrusel from "./components/Carrusel"; // tu carrusel Bootstrap existente
import AgregarCategoria from "./components/AgregarCategoria"; // componente para añadir categorías
import CarruselCategorias from "./components/CarruselCategorias"; // carrusel con categorías (react-slick)
import ProductCard from './components/ProductCard'
import CarruselProductos from './components/CarruselProductos';


export default function Home() {
  const products = [
    { id: 1, name: 'Producto 1', price: 100, image: 'https://cdn.dribbble.com/userupload/3875672/file/original-42f52449520e8e7940c668566888d84f.png?resize=752x&vertical=center' },
    { id: 2, name: 'Producto 2', price: 200, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Producto 3', price: 300, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Producto 4', price: 150, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Producto 5', price: 180, image: 'https://via.placeholder.com/150' }
  ];


  return (
    <div>
      <Carrusel />
      <br /><br />
      <h1>Explora las Categorías</h1>
      <br /><br />
      <CarruselCategorias />
      <br /><br />
      <CarruselProductos products={products} />
    </div>
  );
}
