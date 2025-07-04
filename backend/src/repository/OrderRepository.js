const db = require('../db/models /')
const Order = db.Order;

const OrderRepository = {
  async create(data) {
    return await Order.create(data);
  },
  async findById(id) {
    return await Order.findByPk(id);
  },
  async findAll() {
    return await Order.findAll();
  },
  async findByUser(userId) {
    return await Order.findAll({ where: { userId } });
  },
  async update(id, data) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    await order.update(data);
    return order;
  },
  async remove(id) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    await order.destroy();
    return true;
  }
};

module.exports = OrderRepository; 