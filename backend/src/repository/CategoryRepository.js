const { Categoria } = require('../db/models');

const CategoryRepository = {
  async create(data) {
    return await Categoria.create(data);
  },
  async findById(id) {
    return await Categoria.findByPk(id);
  },
  async findAll() {
    return await Categoria.findAll();
  },
  async update(id, data) {
    const category = await Categoria.findByPk(id);
    if (!category) return null;
    await category.update(data);
    return category;
  },
  async remove(id) {
    const category = await Categoria.findByPk(id);
    if (!category) return null;
    await category.destroy();
    return true;
  }
};

module.exports = CategoryRepository; 