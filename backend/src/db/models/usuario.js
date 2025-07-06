'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.hasMany(models.Orden, { foreignKey: 'usuarioId', as: 'ordenes' });
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    rol: DataTypes.STRING,
    avatar: DataTypes.STRING,
    estado: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
  });
  return Usuario;
};