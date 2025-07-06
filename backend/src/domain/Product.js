class Product {
  constructor({ id, name, price, categoryId, categoryName, descripcion, imagen, stock, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.stock = stock;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Product; 