const { Producto, Categoria } = require('../db/models');
const ProductEntity = require('../domain/Product');

const ProductRepository = {
  async create(productData) {
    return await Producto.create(productData);
  },
  async findById(id) {
    const product = await Producto.findByPk(id, {
      include: [{ model: Categoria, as: 'categoria', attributes: ['nombre'] }]
    });
    if (!product) return null;
    return new ProductEntity({
      ...product.get(),
      categoriaNombre: product.categoria ? product.categoria.nombre : null
    });
  },
  async findAll() {
    const products = await Producto.findAll({
      order: [['id', 'ASC']]
    });
    const categorias = await Categoria.findAll();

    return products.map((p) => {
      let categoriaNombre = null;
      for (let c of categorias) {
        if (c.id === p.categoriaId) {
          categoriaNombre = c.nombre;
          break;
        }
      }
      return new ProductEntity({
        ...p.get(),
        categoriaNombre
      });
    });
  },
  async update(id, data) {
    const product = await Producto.findByPk(id);
    if (!product) return null;
    await product.update(data);
    return product;
  },
  async remove(id) {
    const product = await Producto.findByPk(id);
    if (!product) return null;
    await product.destroy();
    return true;
  }
};

module.exports = ProductRepository; 