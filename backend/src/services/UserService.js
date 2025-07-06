const UserRepository = require('../repository/UserRepository');
const UserEntity = require('../domain/User');
const bcrypt = require('bcrypt');

const UserService = {
  async register(userData) {
    // Hash de contrasena antes de guardar
    if (userData.contrasena) {
      userData.contrasena = await bcrypt.hash(userData.contrasena, 10);
    }
    const user = await UserRepository.create(userData);
    return new UserEntity(user);
  },
  async getByCorreo(correo) {
    const user = await UserRepository.findByCorreo(correo);
    return user ? new UserEntity(user) : null;
  },
  async getById(id) {
    const user = await UserRepository.findById(id);
    return user ? new UserEntity(user) : null;
  },
  async getAll() {
    const users = await UserRepository.findAll();
    return users.map(u => new UserEntity(u));
  },
  async update(id, data) {
    if (data.contrasena) {
      data.contrasena = await bcrypt.hash(data.contrasena, 10);
    }
    const updated = await UserRepository.update(id, data);
    return updated ? new UserEntity(updated) : null;
  },
  async remove(id) {
    return await UserRepository.remove(id);
  },
  async login(correo, contrasena) {
    const user = await UserRepository.findByCorreo(correo);
    if (!user) return null;
    const match = await bcrypt.compare(contrasena, user.contrasena);
    if (!match) return null;
    return new UserEntity(user);
  },
  async recoverPassword(correo, newPassword) {
    const user = await UserRepository.findByCorreo(correo);
    if (!user) return null;
    const hashed = await bcrypt.hash(newPassword, 10);
    await UserRepository.update(user.id, { contrasena: hashed });
    return true;
  }
};

module.exports = UserService; 