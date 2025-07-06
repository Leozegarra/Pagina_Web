const ProductRepository = require('../repository/ProductRepository');
const ProductEntity = require('../domain/Product');

const ProductService = {
  async create(productData) {
    const product = await ProductRepository.create(productData);
    return new ProductEntity(product);
  },
  async getById(id) {
    return await ProductRepository.findById(id);
  },
  async getAll() {
    return await ProductRepository.findAll();
  },
  async update(id, data) {
    const updated = await ProductRepository.update(id, data);
    return updated ? new ProductEntity(updated) : null;
  },
  async remove(id) {
    return await ProductRepository.remove(id);
  }
};

module.exports = ProductService; 