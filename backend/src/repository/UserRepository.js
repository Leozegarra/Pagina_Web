const { User } = require('../db/models /')

const UserRepository = {
  async create(userData) {
    return await User.create(userData);
  },
  async findByEmail(email) {
    console.log("repository");
    return await User.findOne({ where: { email } });
  },
  async findById(id) {
    return await User.findByPk(id);
  },
  async findAll() {
    console.log('findAll');
    return await User.findAll();
  },
  async update(id, data) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update(data);
    return user;
  },
  async remove(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return true;
  }
};

module.exports = UserRepository; 