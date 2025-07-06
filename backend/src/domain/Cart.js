const { DataTypes } = require('sequelize');
const sequelize = require('../db/config/config');

const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  products: {
    type: DataTypes.JSON, // [{ id, name, price, quantity }]
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  timestamps: true,
});

module.exports = Cart;

const CartItem = require('./CartItem');

Cart.hasMany(CartItem, { foreignKey: 'cartId', onDelete: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });
Cart.sync({ alter: true })
  .then(() => console.log('Cart table created successfully'))
  .catch(err => console.error('Error creating Cart table:', err));

