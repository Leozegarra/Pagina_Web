const ProductRepository = require('../repository/ProductRepository');
const ProductEntity = require('../domain/Product');

const ProductService = {
  async create(productData) {
    console.log("hola" , productData)
    const product = await ProductRepository.create(productData);
    
    return new ProductEntity(product);
  },
  async getById(id) {
    const product = await ProductRepository.findById(id);
    return product ? new ProductEntity(product) : null;
  },
  async getAll() {
    const products = await ProductRepository.findAll();
    console.log(products)
    return products.map(p => new ProductEntity(p));
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