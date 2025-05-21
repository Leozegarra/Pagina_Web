import React, { useState } from 'react';

const Categorias = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const imagenes = {
    ropa: 'https://via.placeholder.com/400x300?text=Ropa',
    electronica: 'https://via.placeholder.com/400x300?text=Electronica',
    hogar: 'https://via.placeholder.com/400x300?text=Hogar',
  };

  const handleClick = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Categorías</h2>
      <div className="row">
        <div className="col-md-4 mb-3">
          <button className="btn btn-primary w-100" onClick={() => handleClick('ropa')}>
            Ropa
          </button>
        </div>
        <div className="col-md-4 mb-3">
          <button className="btn btn-primary w-100" onClick={() => handleClick('electronica')}>
            Electrónica
          </button>
        </div>
        <div className="col-md-4 mb-3">
          <button className="btn btn-primary w-100" onClick={() => handleClick('hogar')}>
            Hogar
          </button>
        </div>
      </div>

      {categoriaSeleccionada && (
        <div className="text-center mt-4">
          <h4>{categoriaSeleccionada.charAt(0).toUpperCase() + categoriaSeleccionada.slice(1)}</h4>
          <img
            src={imagenes[categoriaSeleccionada]}
            alt={categoriaSeleccionada}
            className="img-fluid rounded shadow"
          />
        </div>
      )}
    </div>
  );
};

export default Categorias;
