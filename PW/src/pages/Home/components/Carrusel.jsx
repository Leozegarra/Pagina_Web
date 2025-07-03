import React from 'react';
import { Carousel } from 'react-bootstrap';

const Carrusel = () => {
  return (
    <div style={{ marginTop: '20px', backgroundColor: 'black' }}>
      <Carousel fade indicators={true} interval={4000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/slider3.png"
            alt="Primera foto"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/slider4.png"
            alt="Segunda foto"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/slider3.png"
            alt="Tercera foto"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Carrusel;