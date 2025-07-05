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
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 1 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <div className="w-full flex items-center justify-center py-8 bg-gradient-to-r from-teal-50 via-white to-cyan-50 rounded-3xl shadow-lg">
      <Slider {...settings} className="w-full max-w-5xl">
        {categorias.map((cat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center gap-6 px-6 py-8 cursor-grab group"
          >
            <div className="w-36 h-36 rounded-full overflow-hidden shadow-2xl border-4 border-teal-300 flex items-center justify-center bg-white group-hover:scale-105 transition-transform">
              <img
                src={cat.imagen}
                alt={cat.nombre}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-teal-800 font-extrabold text-2xl text-center mt-2 drop-shadow">{cat.nombre}</h3>
            <Link
              to={`/categorias/${encodeURIComponent(cat.nombre)}`}
              className="mt-2 px-5 py-2 bg-teal-500 hover:bg-teal-700 text-white rounded-full font-semibold shadow transition-all text-base"
              onClick={(e) => e.stopPropagation()}
            >
              Ver productos
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
