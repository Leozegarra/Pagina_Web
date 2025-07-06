'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ordenes', [
      {
        usuarioId: 1,
        productos: JSON.stringify([{ productoId: 1, cantidad: 1 }]),
        precio: 2800,
        fecha: "2024-03-18",
        estado: "Pendiente",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usuarioId: 2,
        productos: JSON.stringify([
          { productoId: 2, cantidad: 2 },
          { productoId: 3, cantidad: 1 }
        ]),
        precio: 2900 * 2 + 4800, // 10600
        fecha: "2024-03-17",
        estado: "Entregado",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usuarioId: 3,
        productos: JSON.stringify([{ productoId: 4, cantidad: 1 }]),
        precio: 1800,
        fecha: "2024-03-19",
        estado: "Pendiente",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usuarioId: 4,
        productos: JSON.stringify([{ productoId: 5, cantidad: 1 }]),
        precio: 250,
        fecha: "2024-03-16",
        estado: "Entregado",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usuarioId: 5,
        productos: JSON.stringify([{ productoId: 6, cantidad: 1 }]),
        precio: 1600,
        fecha: "2024-03-15",
        estado: "Entregado",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usuarioId: 6,
        productos: JSON.stringify([{ productoId: 7, cantidad: 2 }]),
        precio: 2800 * 2, // 5600
        fecha: "2024-03-14",
        estado: "Cancelado",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usuarioId: 7,
        productos: JSON.stringify([{ productoId: 8, cantidad: 1 }]),
        precio: 4500,
        fecha: "2024-03-13",
        estado: "Entregado",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usuarioId: 8,
        productos: JSON.stringify([{ productoId: 9, cantidad: 1 }]),
        precio: 1900,
        fecha: "2024-03-12",
        estado: "Pendiente",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usuarioId: 9,
        productos: JSON.stringify([{ productoId: 10, cantidad: 1 }]),
        precio: 3000,
        fecha: "2024-03-11",
        estado: "Entregado",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usuarioId: 10,
        productos: JSON.stringify([
          { productoId: 11, cantidad: 1 },
          { productoId: 12, cantidad: 1 }
        ]),
        precio: 2900 + 1800, // 4700
        fecha: "2024-03-10",
        estado: "Cancelado",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ordenes', null, {});
  }
};
