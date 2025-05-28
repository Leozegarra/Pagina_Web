import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Categorias = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  const imagenes = {
    laptops: [
      'https://oechsle.vteximg.com.br/arquivos/ids/15312583-1000-1000/image-74d0e2a70d6346caa71cbded82fba397.jpg?v=638281822845370000',
      'https://hca.pe/storage/media/large_l4cYd1hkUF2XNAHxGfIaFldJ8OgcWqN1qH2NNxPK.png',
      'https://cdn.mos.cms.futurecdn.net/UbMJMVGeKd2UvjMvkZZPX6.jpg',
    ],
    celulares: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAJMLRaMyjqaTPqq0wXPq5qs6PqRmknVb7gA&s',
      'https://i.blogs.es/121216/nokia-1100/500_333.jpeg',
      'https://f.rpp-noticias.io/2024/10/07/1652095sin-titulo-1jpg.jpg',
    ],
    computadoras: [
      'https://pcya.pe/wp-content/uploads/2024/01/PCRYZENMONI27.png',
      'https://promart.vteximg.com.br/arquivos/ids/6934943-1000-1000/image-b2d24826c4ad4020b9b685dace58f42a.jpg?v=638179439093670000',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5dNSCdaszHimfMCpvpbhMBjfCrQ_yxjT9yw&s',
    ],
  };

  const handleCategoriaClick = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const handleImagenClick = (src) => {
    setImagenSeleccionada(src);
  };

  const handleCerrarModal = () => {
    setImagenSeleccionada(null);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Botones a la izquierda */}
        <div className="col-md-3">
          <h5 className="mb-3">Categorías</h5>
          {Object.keys(imagenes).map((categoria) => (
            <button
              key={categoria}
              className="btn w-100 text-start border-0 bg-transparent mb-2 text-primary"
              onClick={() => handleCategoriaClick(categoria)}
              style={{
                fontWeight: categoriaSeleccionada === categoria ? 'bold' : 'normal',
                textDecoration: categoriaSeleccionada === categoria ? 'underline' : 'none',
              }}
            >
              {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
            </button>
          ))}
        </div>

        {/* Imágenes a la derecha */}
        <div className="col-md-9">
          {categoriaSeleccionada && (
            <div className="row">
              <h4 className="mb-3">
                {categoriaSeleccionada.charAt(0).toUpperCase() + categoriaSeleccionada.slice(1)}
              </h4>
              {imagenes[categoriaSeleccionada].map((src, index) => (
                <div className="col-md-4 mb-3" key={index}>
                  <img
                    src={src}
                    alt={`imagen-${index}`}
                    className="img-fluid rounded shadow"
                    onClick={() => handleImagenClick(src)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {imagenSeleccionada && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          onClick={handleCerrarModal}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Vista previa</h5>
                <button type="button" className="btn-close" onClick={handleCerrarModal}></button>
              </div>
              <div className="modal-body text-center">
                <img src={imagenSeleccionada} alt="vista previa" className="img-fluid rounded" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorias;
