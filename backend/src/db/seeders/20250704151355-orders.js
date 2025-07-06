'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [
      { id: 1, user_id: 49, productos: JSON.stringify([ { product_id: 1, cantidad: 2 }, { product_id: 2, cantidad: 1 } ]), precio: 2800, fecha: new Date(), status: 'completado', created_at: new Date(), updated_at: new Date() },
      { id: 2, user_id: 38, productos: JSON.stringify([ { product_id: 4, cantidad: 1 } ]), precio: 3600, fecha: new Date(), status: 'pendiente', created_at: new Date(), updated_at: new Date() },
      { id: 3, user_id: 39, productos: JSON.stringify([ { product_id: 6, cantidad: 3 } ]), precio: 1600, fecha: new Date(), status: 'enviado', created_at: new Date(), updated_at: new Date() },
      { id: 4, user_id: 40, productos: JSON.stringify([ { product_id: 10, cantidad: 1 } ]), precio: 3000, fecha: new Date(), status: 'completado', created_at: new Date(), updated_at: new Date() },
      { id: 5, user_id: 41, productos: JSON.stringify([ { product_id: 2, cantidad: 2 } ]), precio: 2900, fecha: new Date(), status: 'pendiente', created_at: new Date(), updated_at: new Date() },
      { id: 6, user_id: 42, productos: JSON.stringify([ { product_id: 7, cantidad: 1 } ]), precio: 5600, fecha: new Date(), status: 'enviado', created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
