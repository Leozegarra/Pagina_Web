'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categorias', [
      { nombre: "Laptops", descripcion: "Computadoras portátiles de alta calidad", imagen: "", createdAt: new Date(), updatedAt: new Date() },                // id: 1
      { nombre: "Computadoras de Escritorio", descripcion: "PCs de escritorio para hogar y oficina", imagen: "", createdAt: new Date(), updatedAt: new Date() }, // id: 2
      { nombre: "Celulares y Smartphones", descripcion: "Teléfonos móviles y smartphones", imagen: "", createdAt: new Date(), updatedAt: new Date() },           // id: 3
      { nombre: "Videojuegos y Consolas", descripcion: "Consolas y videojuegos", imagen: "", createdAt: new Date(), updatedAt: new Date() },                     // id: 4
      { nombre: "Laptops Gamers", descripcion: "Laptops de alto rendimiento para gaming", imagen: "", createdAt: new Date(), updatedAt: new Date() },             // id: 5
      { nombre: "Televisores", descripcion: "Smart TVs y televisores 4K", imagen: "", createdAt: new Date(), updatedAt: new Date() },                             // id: 6
      { nombre: "Audio y Sonido", descripcion: "Audífonos, parlantes y equipos de sonido", imagen: "", createdAt: new Date(), updatedAt: new Date() },            // id: 7
      { nombre: "Periféricos", descripcion: "Mouse, teclados, cámaras, etc.", imagen: "", createdAt: new Date(), updatedAt: new Date() },                         // id: 8
      { nombre: "Almacenamiento", descripcion: "SSDs, HDDs, memorias y almacenamiento externo", imagen: "", createdAt: new Date(), updatedAt: new Date() },       // id: 9
      { nombre: "Accesorios", descripcion: "Cables, adaptadores, fundas y más", imagen: "", createdAt: new Date(), updatedAt: new Date() }                        // id: 10
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
