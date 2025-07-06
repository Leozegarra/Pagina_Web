const { Pago } = require('../db/models');

const PaymentRepository = {
  async create(data) {
    return await Pago.create(data);
  },
  async findById(id) {
    return await Pago.findByPk(id);
  },
  async findAll() {
    return await Pago.findAll();
  },
  async findByOrden(ordenId) {
    return await Pago.findAll({ where: { ordenId } });
  },
  async update(id, data) {
    const pago = await Pago.findByPk(id);
    if (!pago) return null;
    await pago.update(data);
    return pago;
  },
  async remove(id) {
    const pago = await Pago.findByPk(id);
    if (!pago) return null;
    await pago.destroy();
    return true;
  }
};

module.exports = PaymentRepository; 