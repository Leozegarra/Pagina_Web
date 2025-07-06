const CartRepository = require('../repository/CartRepository');

const CartService = {
  async create(cartData) {
    return await CartRepository.create(cartData);
  },
  async getByUserId(userId) {
    return await CartRepository.getByUserId(userId);
  },
  async update(userId, cartData) {
    return await CartRepository.update(userId, cartData);
  },
  async remove(userId) {
    return await CartRepository.remove(userId);
  }
};

module.exports = CartService;
