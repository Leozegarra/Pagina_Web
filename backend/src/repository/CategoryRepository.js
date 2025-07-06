const { Category } = require('../db/models');

const CategoryRepository = {
  async create(data) {
    return await Category.create(data);
  },

  async findById(id) {
    return await Category.findByPk(id);
  },

  async findAll() {
    return await Category.findAll();
  },

  async update(id, data) {
    const category = await Category.findByPk(id);
    if (!category) return null;
    await category.update(data);
    return category;
  },

  async remove(id) {
    const category = await Category.findByPk(id);
    if (!category) return null;
    await category.destroy();
    return true;
  }
};

module.exports = CategoryRepository;

