const CartService = require('../services/CartService');

const CartController = {
  async create(req, res) {
    try {
      const cart = await CartService.create(req.body);
      res.status(201).json(cart);
    } catch (err) {
      res.status(500).json({ error: 'Error al crear el carrito', details: err.message });
    }
  },
  async getByUserId(req, res) {
    try {
      const cart = await CartService.getByUserId(req.params.userId);
      if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
      res.json(cart);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener el carrito', details: err.message });
    }
  },
  async update(req, res) {
    try {
      const updatedCart = await CartService.update(req.params.userId, req.body);
      if (!updatedCart) return res.status(404).json({ error: 'Carrito no encontrado' });
      res.json(updatedCart);
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar el carrito', details: err.message });
    }
  },
  async remove(req, res) {
    try {
      const removed = await CartService.remove(req.params.userId);
      if (!removed) return res.status(404).json({ error: 'Carrito no encontrado' });
      res.json({ message: 'Carrito eliminado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar el carrito', details: err.message });
    }
  }
};

module.exports = CartController;
