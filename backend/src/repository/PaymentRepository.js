const { Payment } = require('../db/models');

const PaymentRepository = {
  async create(data) {
    return await Payment.create(data);
  },

  async findById(id) {
    return await Payment.findByPk(id);
  },

  async findAll() {
    return await Payment.findAll();
  },

  async findByOrder(orderId) {
    return await Payment.findAll({ where: { orderId } });
  },

  async update(id, data) {
    const payment = await Payment.findByPk(id);
    if (!payment) return null;
    await payment.update(data);
    return payment;
  },

  async remove(id) {
    const payment = await Payment.findByPk(id);
    if (!payment) return null;
    await payment.destroy();
    return true;
  }
};

module.exports = PaymentRepository;
