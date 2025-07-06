const PaymentService = require('../services/PaymentService');

const PaymentController = {
  async create(req, res) {
    try {
      const payment = await PaymentService.create(req.body);
      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el pago', details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const payment = await PaymentService.getById(req.params.id);
      if (!payment) return res.status(404).json({ error: 'Pago no encontrado' });
      res.json(payment);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el pago', details: error.message });
    }
  },
  async getAll(req, res) {
    try {
      const payments = await PaymentService.getAll();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los pagos', details: error.message });
    }
  },
  async update(req, res) {
    try {
      const updated = await PaymentService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Pago no encontrado' });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el pago', details: error.message });
    }
  },
  async remove(req, res) {
    try {
      const removed = await PaymentService.remove(req.params.id);
      if (!removed) return res.status(404).json({ error: 'Pago no encontrado' });
      res.json({ message: 'Pago eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el pago', details: error.message });
    }
  }
};

module.exports = PaymentController; 