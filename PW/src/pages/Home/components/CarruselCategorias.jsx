import React from "react";
import Slider from "react-slick";
import { useCategorias } from "../../../contexts/CategoriaContexto";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CarruselCategorias() {
  const { categorias } = useCategorias();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Slider {...settings}>
      {categorias.map((cat, idx) => (
        <div
          key={idx}
          style={{
            padding: "10px",
            textAlign: "center",
            cursor: "grab", // permite arrastrar el carrusel
          }}
        >
          <div className="categoria-circulo">
            <img
              src={cat.imagen}
              alt={cat.nombre}
              className="img-categoria"
              // No se tocan los estilos originales
            />
          </div>

          {/* Título sin modificar */}
          <h3 className="categoria-titulo">{cat.nombre}</h3>

          {/* Link aparte */}
          <Link
            to={`/categorias/${encodeURIComponent(cat.nombre)}`}
            className="ver-productos-link"
            onClick={(e) => e.stopPropagation()}
          >
            Ver productos
          </Link>
        </div>
      ))}
    </Slider>
  );
}
