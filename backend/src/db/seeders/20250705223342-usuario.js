'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      {
        nombre: "Juan Pérez",
        correo: "admin@example.com",
        rol: "Usuario",
        estado: "Activo",
        avatar: " ",
        contrasena: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "María Gómez",
        correo: "maria.gomez@example.com",
        rol: "Usuario",
        estado: "Activo",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
        contrasena: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Carlos Ruiz",
        correo: "carlosruiz@example.com",
        rol: "Usuario",
        estado: "Inactivo",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2070&auto=format&fit=crop",
        contrasena: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Ana Torres",
        correo: "ana.torres@example.com",
        rol: "Usuario",
        estado: "Activo",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop",
        contrasena: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Roberto Sánchez",
        correo: "roberto.sanchez@example.com",
        rol: "Usuario",
        estado: "Activo",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
        contrasena: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Laura Martínez",
        correo: "laura.martinez@example.com",
        rol: "Usuario",
        estado: "Activo",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        contrasena: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Miguel Ángel López",
        correo: "miguel.lopez@example.com",
        rol: "Usuario",
        estado: "Inactivo",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
        contrasena: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Sofía Rodríguez",
        correo: "sofia.rodriguez@example.com",
        rol: "Usuario",
        estado: "Activo",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop",
        contrasena: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Diego Hernández",
        correo: "diego.hernandez@example.com",
        rol: "Usuario",
        estado: "Activo",
        avatar: "https://images.unsplash.com/photo-1506795660198-e95c6320213d?q=80&w=1974&auto=format&fit=crop",
        contrasena: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Valentina Castro",
        correo: "valentina.castro@example.com",
        rol: "Usuario",
        estado: "Inactivo",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop",
        contrasena: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};