"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      { id: 1, name: 'Laptops', created_at: new Date(), updated_at: new Date() },
      { id: 2, name: 'Celulares', created_at: new Date(), updated_at: new Date() },
      { id: 3, name: 'Computadoras', created_at: new Date(), updated_at: new Date() },
      { id: 4, name: 'Videojuegos', created_at: new Date(), updated_at: new Date() },
      { id: 5, name: 'Laptops gamers', created_at: new Date(), updated_at: new Date() },
      { id: 6, name: 'Televisores', created_at: new Date(), updated_at: new Date() },
      { id: 7, name: 'Audio', created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
