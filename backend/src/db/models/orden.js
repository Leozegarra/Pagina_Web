'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orden extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orden.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
    }
  }
  Orden.init({
    usuarioId: DataTypes.INTEGER,
    productos: DataTypes.JSONB,
    precio: DataTypes.FLOAT,
    fecha: DataTypes.DATE,
    estado: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Orden',
    tableName: 'ordenes',
  });
  return Orden;
};