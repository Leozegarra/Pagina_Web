const CategoryRepository = require('../repository/CategoryRepository');
const CategoryEntity = require('../domain/Category');

const CategoryService = {
  async create(categoryData) {
    const category = await CategoryRepository.create(categoryData);
    return new CategoryEntity(category);
  },
  async getById(id) {
    const category = await CategoryRepository.findById(id);
    return category ? new CategoryEntity(category) : null;
  },
  async getAll() {
    const categories = await CategoryRepository.findAll();
    return categories.map(c => new CategoryEntity(c));
  },
  async update(id, data) {
    const updated = await CategoryRepository.update(id, data);
    return updated ? new CategoryEntity(updated) : null;
  },
  async remove(id) {
    return await CategoryRepository.remove(id);
  }
};

module.exports = CategoryService; 