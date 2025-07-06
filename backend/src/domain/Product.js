class Product {
  constructor({
    id,
    name,
    price,
    categoryId,
    categoryName,
    description,
    image,
    stock,
    createdAt,
    updatedAt
  }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.description = description;
    this.image = image;
    this.stock = stock;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Product;
