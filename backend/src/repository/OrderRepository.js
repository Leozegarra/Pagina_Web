const { Orden } = require('../db/models');

const OrderRepository = {
  async create(data) {
    return await Orden.create(data);
  },
  async findById(id) {
    return await Orden.findByPk(id);
  },
  async findAll() {
    return await Orden.findAll();
  },
  async findByUsuario(usuarioId) {
    return await Orden.findAll({ where: { usuarioId } });
  },
  async update(id, data) {
    const order = await Orden.findByPk(id);
    if (!order) return null;
    await order.update(data);
    return order;
  },
  async remove(id) {
    const order = await Orden.findByPk(id);
    if (!order) return null;
    await order.destroy();
    return true;
  }
};

module.exports = OrderRepository; 