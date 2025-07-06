'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        id: 1,
        name: "Laptop Samsung",
        price: 2800,
        categoria: "Laptops",
        imagen: "https://images.samsung.com/is/image/samsung/p6pim/uk/np750xqa-kb2uk/gallery/uk-galaxy-book4-edge-15-inch-np750xqaa-526466-np750xqa-kb2uk-thumb-543953953?$UX_EXT2_PNG$",
        descripcion: "Laptop versátil ideal para tareas diarias y trabajo remoto, con pantalla Full HD y procesador eficiente.",
        stock: 15,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: "Laptop HP",
        price: 2900,
        categoria: "Laptops",
        imagen: "https://pe-media.hptiendaenlinea.com/catalog/product/6/K/6K2C8LA-1_T1740503426.png",
        descripcion: "Laptop HP con diseño moderno, adecuada para productividad, estudios y navegación web.",
        stock: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        name: "Macbook",
        price: 4800,
        categoria: "Laptops",
        imagen: "https://images.macrumors.com/t/Au-OUIb73hHvx2w8CirAir5bNbM=/1600x/article-new/2013/09/macbook-air-m2-roundup-header.png",
        descripcion: "MacBook con chip Apple Silicon, pantalla Retina y gran autonomía, ideal para diseño y multimedia.",
        stock: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        name: "Celular Samsung",
        price: 1800,
        categoria: "Celulares",
        imagen: "https://images.samsung.com/is/image/samsung/p6pim/uk/np750xqa-kb2uk/gallery/uk-galaxy-book4-edge-15-inch-np750xqaa-526466-np750xqa-kb2uk-thumb-543953953?$UX_EXT2_PNG$",
        descripcion: "Smartphone Samsung con cámara de alta resolución y rendimiento confiable para el día a día.",
        stock: 20,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        name: "Celular Nokia",
        price: 250,
        categoria: "Celulares",
        imagen: "https://images.samsung.com/is/image/samsung/p6pim/pe/2501/gallery/pe-galaxy-s25-s938-sm-s938bzklltp-thumb-544714481?$216_216_PNG ",
        descripcion: "Clásico celular Nokia resistente, con batería de larga duración y funciones básicas.",
        stock: 30,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 6,
        name: "Celular Huawei",
        price: 1600,
        categoria: "Celulares",
        imagen: "https://img01.huaweifile.com/sg/ms/pe/pms/uomcdn/PE_HW_B2C/pms/202412/gbom/6942103145513/428_428_58B4F5849D6AE2EB891A93B959332718mp.png",
        descripcion: "Smartphone Huawei con pantalla amplia, excelente cámara y buen rendimiento para apps comunes.",
        stock: 12,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 7,
        name: "PC Ryzen",
        price: 2800,
        categoria: "Computadoras",
        imagen: "https://pcya.pe/wp-content/uploads/2024/01/PCRYZENMONI27.png",
        descripcion: "Computadora de escritorio con procesador Ryzen, ideal para trabajo multitarea y ofimática avanzada.",
        stock: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 8,
        name: "PC Gamer Intel",
        price: 4500,
        categoria: "Computadoras",
        imagen: "https://static.vecteezy.com/system/resources/previews/053/348/112/non_2x/gaming-pc-with-rgb-blue-led-lights-isolated-on-transparent-background-png.png",
        descripcion: "PC gamer con procesador Intel de última generación, tarjeta gráfica potente y refrigeración avanzada.",
        stock: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 9,
        name: "PC Básica",
        price: 1900,
        categoria: "Computadoras",
        imagen: "https://infordata.com.pe/wp-content/uploads/2022/01/draco-xd-2.png",
        descripcion: "Computadora básica ideal para tareas escolares, navegación y trabajo en oficina ligera.",
        stock: 18,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 10,
        name: "PlayStation 5",
        price: 3000,
        categoria: "Videojuegos",
        imagen: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-pro-dualsense-image-block-01-en-16aug24?$facebook$",
        descripcion: "Consola de nueva generación con gráficos 4K y alta velocidad de carga.",
        stock: 9,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
