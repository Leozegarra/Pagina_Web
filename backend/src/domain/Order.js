class Order {
  constructor({ id, usuarioId, productos, precio, fecha, estado, createdAt, updatedAt }) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.productos = productos;
    this.precio = precio;
    this.fecha = fecha;
    this.estado = estado;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Order; 