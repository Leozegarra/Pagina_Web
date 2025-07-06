import React, { useMemo } from "react";
import Slider from "react-slick";
import productos from "../../../contexts/ProductosJSON";
import { useCart } from "../../../contexts/CartContext";

export default function CarruselProductosAleatorios() {
  const { addToCart } = useCart();
  const productosAleatorios = useMemo(() => {
    const shuffled = [...productos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    swipe: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3, slidesToScroll: 1 }
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 2, slidesToScroll: 1 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <div className="w-full flex items-center justify-center py-8 bg-gradient-to-r from-cyan-50 via-white to-teal-50 rounded-3xl shadow-lg">
      <Slider {...settings} className="w-full max-w-6xl">
        {productosAleatorios.map(product => (
          <div key={product.id} className="flex items-center justify-center px-4">
            <div className="w-72 bg-white/80 rounded-2xl shadow-xl flex flex-col items-center p-6 gap-4 group hover:shadow-2xl transition-all">
              <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded-xl bg-gray-100 mb-2">
                <img
                  src={product.imagen}
                  alt={product.name}
                  className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h5 className="text-lg font-bold text-gray-800 text-center truncate w-full">{product.name}</h5>
              <p className="text-teal-600 font-extrabold text-xl mb-2">${product.price}</p>
              <button
                className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition-all duration-200 active:scale-95 shadow text-base"
                onClick={() => addToCart(product)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h8.04a2 2 0 001.83-1.3L17 13M7 13V6h10v7" /><circle cx="9" cy="21" r="1.5" /><circle cx="19" cy="21" r="1.5" /></svg>
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
