import React from 'react';
import { Carousel } from 'react-bootstrap';

const slides = [
  {
    img: './images/slider3.png',
    title: '¡Venta Final! Tecnología al Mejor Precio',
    desc: 'Aprovecha las mejores ofertas en laptops, celulares y más.'
  },
  {
    img: './images/slider4.png',
    title: 'Nuevos Productos 2025',
    desc: 'Descubre lo último en innovación y diseño.'
  },
  {
    img: './images/slider3.png',
    title: 'Zona Tech: Tu Tienda de Confianza',
    desc: 'Soporte, garantía y envíos rápidos a todo el país.'
  }
];

const Carrusel = () => {
  return (
    <div className="mt-8 bg-gradient-to-r from-teal-500 via-blue-500 to-cyan-400 rounded-3xl shadow-2xl p-2 md:p-6 flex items-center justify-center max-w-5xl mx-auto">
      <Carousel fade indicators={true} interval={4000} className="w-full">
        {slides.map((slide, idx) => (
          <Carousel.Item key={idx}>
            <div className="relative w-full h-[340px] flex items-center justify-center overflow-hidden rounded-2xl">
              <img
                className="d-block w-100 h-full object-cover rounded-2xl shadow-lg"
                src={slide.img}
                alt={slide.title}
                style={{ width: '100%', height: '340px', objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-2xl flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow mb-2 animate-fade-in-up">{slide.title}</h2>
                <p className="text-lg md:text-xl text-gray-200 animate-fade-in-up delay-100">{slide.desc}</p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Carrusel;