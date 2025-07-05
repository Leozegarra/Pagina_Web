'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Payments', [
      {
        id: 1,
        orderId: 1,
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        address: 'Av. Central 123',
        cardNumber: '4111111111111111',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        orderId: 2,
        name: 'Ana García',
        email: 'ana.garcia@example.com',
        address: 'Calle Sur 456',
        cardNumber: '4222222222222222',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        orderId: 3,
        name: 'Luis Martínez',
        email: 'luis.martinez@example.com',
        address: 'Av. Norte 789',
        cardNumber: '4333333333333333',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        orderId: 4,
        name: 'María López',
        email: 'maria.lopez@example.com',
        address: 'Calle Este 321',
        cardNumber: '4444444444444444',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Payments', null, {});
  }
};
