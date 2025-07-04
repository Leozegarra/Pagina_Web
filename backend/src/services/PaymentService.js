const PaymentRepository = require('../repository/PaymentRepository');
const PaymentEntity = require('../domain/Payment');

const PaymentService = {
  async create(paymentData) {
    const payment = await PaymentRepository.create(paymentData);
    return new PaymentEntity(payment);
  },
  async getById(id) {
    const payment = await PaymentRepository.findById(id);
    return payment ? new PaymentEntity(payment) : null;
  },
  async getAll() {
    const payments = await PaymentRepository.findAll();
    return payments.map(p => new PaymentEntity(p));
  },
  async update(id, data) {
    const updated = await PaymentRepository.update(id, data);
    return updated ? new PaymentEntity(updated) : null;
  },
  async remove(id) {
    return await PaymentRepository.remove(id);
  }
};

module.exports = PaymentService; 