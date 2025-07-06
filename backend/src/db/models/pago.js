'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pago.init({
    ordenId: DataTypes.INTEGER,
    monto: DataTypes.FLOAT,
    metodo: DataTypes.STRING,
    estado: DataTypes.STRING,
    fecha: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pago',
    tableName: 'pagos',
  });
  return Pago;
};