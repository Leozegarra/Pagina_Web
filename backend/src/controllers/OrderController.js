const OrderService = require('../services/OrderService');

const OrderController = {
  async create(req, res) {
    try {
      const order = await OrderService.create(req.body);
      console.log(order); // útil para debug
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la orden', details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const order = await OrderService.getById(req.params.id);
      if (!order) return res.status(404).json({ error: 'Orden no encontrada' });
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la orden', details: error.message });
    }
  },
  async getAll(req, res) {
    try {
      const orders = await OrderService.getAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las órdenes', details: error.message });
    }
  },
  async update(req, res) {
    try {
      const updated = await OrderService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Orden no encontrada' });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la orden', details: error.message });
    }
  },
  async remove(req, res) {
    try {
      const removed = await OrderService.remove(req.params.id);
      if (!removed) return res.status(404).json({ error: 'Orden no encontrada' });
      res.json({ message: 'Orden eliminada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la orden', details: error.message });
    }
  }
};

// GET /orders/:id/details
async function getOrderDetails(req, res) {
  try {
    const id = req.params.id;

    // Preferimos getById si está implementado correctamente
    const order = await OrderService.getById(id);

    if (!order) return res.status(404).json({ error: 'Orden no encontrada' });

    const productos = await OrderService.getOrderWithProductDetails(order);

    return res.json({ ...order, productos });
  } catch (err) {
    return res.status(500).json({ error: 'Error al obtener detalles de la orden', details: err.message });
  }
}

module.exports = OrderController;
module.exports.getOrderDetails = getOrderDetails;
