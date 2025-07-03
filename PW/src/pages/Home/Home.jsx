import React from "react";
import Carrusel from "./components/Carrusel";
import { Container } from "react-bootstrap";
import AgregarCategoria from "./components/AgregarCategoria";
import CarruselCategorias from "./components/CarruselCategorias";
import ProductCard from './components/ProductCard'
import CarruselProductosAleatorios from "./components/CarruselProductos";


export default function Home() {
  return (
    <div>
      <Carrusel />
      <br />
      <br />
      <h1>Explora las Categorías</h1>
      <br /><br />
      <div style={{ backgroundColor: "#E2E8F0", padding: "2rem 0", marginBottom: "5rem"}}>
        <Container>
          <CarruselCategorias />
        </Container>
      </div>
      <br /><br />
      <h1>Los Mejores Productos</h1>
      <br /><br />
      <div style={{ backgroundColor: "#E2E8F0", padding: "2rem 0", marginBottom: "5rem"}}>
        <Container>
          <CarruselProductosAleatorios />
        </Container>
      </div>
    </div>
  );
}