const { Usuario } = require('../db/models')

const UserRepository = {
  async create(userData) {
    return await Usuario.create(userData);
  },
  async findByCorreo(correo) {
    return await Usuario.findOne({ where: { correo } });
  },
  async findById(id) {
    return await Usuario.findByPk(id);
  },
  async findAll() {
    return await Usuario.findAll();
  },
  async update(id, data) {
    const user = await Usuario.findByPk(id);
    if (!user) return null;
    await user.update(data);
    return user;
  },
  async remove(id) {
    const user = await Usuario.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return true;
  }
};

module.exports = UserRepository; 