const { Product, Category } = require('../db/models /');
const ProductEntity = require('../domain/Product');

const ProductRepository = {
  async create(productData) {
    console.log()
    return await Product.create(productData);
  },
  async findById(id) {
    const product = await Product.findByPk(id, {
      include: [{ model: Category, as: 'category', attributes: ['name'] }]
    });
    if (!product) return null;
    return new ProductEntity({
      ...product.get(),
      categoryName: product.category ? product.category.name : null
    });
  },
  async findAll() {
    const products = await Product.findAll();
    const categories = await Category.findAll();

    return products.map((p) => {
      let categoryName = null;
      for (let c of categories) {
        if (c.id === p.categoryId) {
          categoryName = c.name;
          break;
        }
      }
      return new ProductEntity({
        ...p.get(),
        categoryName
      });
    });
  },
  async update(id, data) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    await product.update(data);
    return product;
  },
  async remove(id) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    await product.destroy();
    return true;
  }
};

module.exports = ProductRepository; 