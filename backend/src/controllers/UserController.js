const UserService = require('../services/UserService');

const UserController = {
  // Listar todos los usuarios
  async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener usuario por ID
  async getById(req, res) {
    try {
      const user = await UserService.getById(req.params.id);
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Crear usuario
  async create(req, res) {
    try {
      const user = await UserService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Actualizar usuario (parcial o total)
  async update(req, res) {
    try {
      const updated = await UserService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Eliminar usuario
  async remove(req, res) {
    try {
      const deleted = await UserService.remove(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json({ message: 'Usuario eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const user = await UserService.login(email, password);
      if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Recuperar contraseña
  async recoverPassword(req, res) {
    try {
      const { email, newPassword } = req.body;
      const ok = await UserService.recoverPassword(email, newPassword);
      if (!ok) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json({ message: 'Contraseña actualizada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = UserController; 