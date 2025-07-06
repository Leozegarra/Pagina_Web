class Category {
  constructor({ id, nombre, descripcion, imagen, createdAt, updatedAt }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Category; 