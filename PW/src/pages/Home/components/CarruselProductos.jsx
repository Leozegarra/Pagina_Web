import React, { useMemo } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import productos from "../../../contexts/ProductosJSON";

export default function CarruselProductosAleatorios() {
  const productosAleatorios = useMemo(() => {
    const shuffled = [...productos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    swipe: false,
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
    <div style={{ padding: "20px"}}>
      <Slider {...settings}>
        {productosAleatorios.map(product => (
          <div key={product.id} style={{ padding: "0 8px" }}>
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
