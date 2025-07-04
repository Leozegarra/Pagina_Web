const UserRepository = require('../repository/UserRepository');
const UserEntity = require('../domain/User');
const bcrypt = require('bcrypt');

const UserService = {
  async register(userData) {
    // Hash de password antes de guardar
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
    console.log("service");
    const user = await UserRepository.findByEmail(email);
    console.log(password,user.password);
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password);
    console.log(match);
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