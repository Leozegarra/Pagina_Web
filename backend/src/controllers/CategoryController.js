const CategoryService = require("../services/CategoryService");

const CategoryController = {
  async create(req, res) {
    try {
      const category = await CategoryService.create(req.body);

      res.status(201).json(category);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al crear la categoría", details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const category = await CategoryService.getById(req.params.id);
      if (!category)
        return res.status(404).json({ error: "Categoría no encontrada" });
      res.json(category);
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Error al obtener la categoría",
          details: error.message,
        });
    }
  },
  async getAll(req, res) {
    try {
      const categories = await CategoryService.getAll();
      res.json(categories);
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Error al obtener las categorías",
          details: error.message,
        });
    }
  },
  async update(req, res) {
    try {
      const updated = await CategoryService.update(req.params.id, req.body);
      if (!updated)
        return res.status(404).json({ error: "Categoría no encontrada" });
      res.json(updated);
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Error al actualizar la categoría",
          details: error.message,
        });
    }
  },
  async updateMultiple(req, res) {
    try {
      const { categories } = req.body;
      
      if (!Array.isArray(categories)) {
        return res.status(400).json({ error: 'El campo categories debe ser un array' });
      }
      
      const results = [];
      for (const categoryUpdate of categories) {
        const { id, ...updateData } = categoryUpdate;
        if (!id) {
          results.push({ id, error: 'ID es requerido' });
          continue;
        }
        
        try {
          const updated = await CategoryService.update(id, updateData);
          if (updated) {
            results.push({ id, success: true, data: updated });
          } else {
            results.push({ id, error: 'Categoría no encontrada' });
          }
        } catch (error) {
          results.push({ id, error: error.message });
        }
      }
      
      res.json({ 
        message: 'Actualización múltiple completada', 
        results 
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar categorías', details: error.message });
    }
  },
  async remove(req, res) {
    try {
      const removed = await CategoryService.remove(req.params.id);
      if (!removed)
        return res.status(404).json({ error: "Categoría no encontrada" });
      res.json({ message: "Categoría eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Error al eliminar la categoría",
          details: error.message,
        });
    }
  },
};

module.exports = CategoryController;
