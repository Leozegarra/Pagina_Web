const ProductService = require('../services/ProductService');

const ProductController = {
  async create(req, res) {
    try {
      const product = await ProductService.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el producto', details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const product = await ProductService.getById(req.params.id);
      if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto', details: error.message });
    }
  },
  async getAll(req, res) {
    try {
      const products = await ProductService.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos', details: error.message });
    }
  },
  async update(req, res) {
    try {
      const updated = await ProductService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto', details: error.message });
    }
  },
  async remove(req, res) {
    try {
      const removed = await ProductService.remove(req.params.id);
      if (!removed) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json({ message: 'Producto eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto', details: error.message });
    }
  }
};

module.exports = ProductController; 