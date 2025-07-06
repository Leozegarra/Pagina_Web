'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pagos', [
      {
        ordenId: 1,
        monto: 2800,
        metodo: "Tarjeta de crédito",
        estado: "Completado",
        fecha: "2024-03-18",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ordenId: 2,
        monto: 5800, // 2 x 2900
        metodo: "Transferencia bancaria",
        estado: "Completado",
        fecha: "2024-03-17",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ordenId: 3,
        monto: 4800,
        metodo: "Tarjeta de débito",
        estado: "Pendiente",
        fecha: "2024-03-19",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ordenId: 4,
        monto: 1800,
        metodo: "Efectivo",
        estado: "Completado",
        fecha: "2024-03-16",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ordenId: 5,
        monto: 250,
        metodo: "Tarjeta de crédito",
        estado: "Completado",
        fecha: "2024-03-15",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ordenId: 6,
        monto: 1600,
        metodo: "Transferencia bancaria",
        estado: "Cancelado",
        fecha: "2024-03-14",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ordenId: 7,
        monto: 5600, // 2 x 2800
        metodo: "Tarjeta de débito",
        estado: "Completado",
        fecha: "2024-03-13",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ordenId: 8,
        monto: 4500,
        metodo: "Efectivo",
        estado: "Pendiente",
        fecha: "2024-03-12",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ordenId: 9,
        monto: 1900,
        metodo: "Tarjeta de crédito",
        estado: "Completado",
        fecha: "2024-03-11",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ordenId: 10,
        monto: 3000,
        metodo: "Transferencia bancaria",
        estado: "Cancelado",
        fecha: "2024-03-10",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
