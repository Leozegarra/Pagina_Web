class Product {
  constructor({ id, nombre, precio, categoriaId, categoriaNombre, descripcion, imagen, stock, createdAt, updatedAt }) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoriaId = categoriaId;
    this.categoriaNombre = categoriaNombre;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.stock = stock;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Product; 