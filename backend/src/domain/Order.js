class Order {
  constructor({ id, userId, productos, precio, fecha, status, createdAt, updatedAt }) {
    this.id = id;
    this.userId = userId;
    this.productos = productos;
    this.precio = precio;
    this.fecha = fecha;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Order;
