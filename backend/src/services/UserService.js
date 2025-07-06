const UserRepository = require('../repository/UserRepository');
const UserEntity = require('../domain/User');
const bcrypt = require('bcrypt');

const UserService = {
  async register(userData) {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    const user = await UserRepository.create(userData);
    return new UserEntity(user);
  },

  async getByEmail(email) {
    const user = await UserRepository.findByEmail(email);
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
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const updated = await UserRepository.update(id, data);
    return updated ? new UserEntity(updated) : null;
  },

  async remove(id) {
    return await UserRepository.remove(id);
  },

  async login(email, password) {
    const user = await UserRepository.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;
    return new UserEntity(user);
  },

  async recoverPassword(email, newPassword) {
    const user = await UserRepository.findByEmail(email);
    if (!user) return null;
    const hashed = await bcrypt.hash(newPassword, 10);
    await UserRepository.update(user.id, { password: hashed });
    return true;
  }
};

module.exports = UserService;
