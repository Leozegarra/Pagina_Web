'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [
      { id: 1, userId: 1, productId: 1, cantidad: 1, precio: 2800, fecha: new Date(), status: 'completado', created_at: new Date(), updated_at: new Date() },
      { id: 2, userId: 2, productId: 4, cantidad: 2, precio: 3600, fecha: new Date(), status: 'pendiente', created_at: new Date(), updated_at: new Date() },
      { id: 3, userId: 3, productId: 6, cantidad: 1, precio: 1600, fecha: new Date(), status: 'enviado', created_at: new Date(), updated_at: new Date() },
      { id: 4, userId: 4, productId: 10, cantidad: 1, precio: 3000, fecha: new Date(), status: 'completado', created_at: new Date(), updated_at: new Date() },
      { id: 5, userId: 5, productId: 2, cantidad: 1, precio: 2900, fecha: new Date(), status: 'pendiente', created_at: new Date(), updated_at: new Date() },
      { id: 6, userId: 6, productId: 7, cantidad: 2, precio: 5600, fecha: new Date(), status: 'enviado', created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
