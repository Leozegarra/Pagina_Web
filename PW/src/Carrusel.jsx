import React from 'react';
import { Carousel } from 'react-bootstrap';

const Carrusel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/logoTech.jpeg"
          alt="Primera foto"
        />
        <Carousel.Caption>
          <h3>Primera foto</h3>
          <p>Descripción de la primera imagen.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/800x400?text=Segunda+foto"
          alt="Segunda foto"
        />
        <Carousel.Caption>
          <h3>Segunda foto</h3>
          <p>Descripción de la segunda imagen.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/800x400?text=Tercera+foto"
          alt="Tercera foto"
        />
        <Carousel.Caption>
          <h3>Tercera foto</h3>
          <p>Descripción de la tercera imagen.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Carrusel;