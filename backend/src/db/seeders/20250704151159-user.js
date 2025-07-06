'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Juan',
        sname: 'Pérez',
        email: 'juan.perez@example.com',
        password: '123456',
        estado: true,
        role: 'user',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Ana',
        sname: 'García',
        email: 'ana.garcia@example.com',
        password: '123456',
        estado: true,
        role: 'user',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Luis',
        sname: 'Martínez',
        email: 'luis.martinez@example.com',
        password: '123456',
        estado: true,
        role: 'user',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'María',
        sname: 'López',
        email: 'maria.lopez@example.com',
        password: '123456',
        estado: true,
        role: 'user',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Carlos',
        sname: 'Sánchez',
        email: 'carlos.sanchez@example.com',
        password: '123456',
        estado: true,
        role: 'user',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Lucía',
        sname: 'Ramírez',
        email: 'lucia.ramirez@example.com',
        password: '123456',
        estado: true,
        role: 'user',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Pedro',
        sname: 'Torres',
        email: 'pedro.torres@example.com',
        password: '123456',
        estado: true,
        role: 'user',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sofía',
        sname: 'Flores',
        email: 'sofia.flores@example.com',
        password: '123456',
        estado: true,
        role: 'user',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Diego',
        sname: 'Vargas',
        email: 'diego.vargas@example.com',
        password: '123456',
        estado: true,
        role: 'user',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Valentina',
        sname: 'Castro',
        email: 'valentina.castro@example.com',
        password: '123456',
        estado: true,
        role: 'user',
        created_at: new Date(),
        updated_at: new Date()
      },
      // 2 administradores
      {
        name: 'Admin',
        sname: 'Principal',
        email: 'admin1@example.com',
        password: 'admin123',
        estado: true,
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Super',
        sname: 'Administrador',
        email: 'admin2@example.com',
        password: 'admin123',
        estado: true,
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
