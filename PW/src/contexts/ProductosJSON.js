const productos = [
  {  
    id: 1,
    name: "Laptop Samsung",
    price: 2800,
    categoria: "Laptops",
    imagen: "https://images.samsung.com/is/image/samsung/p6pim/uk/np750xqa-kb2uk/gallery/uk-galaxy-book4-edge-15-inch-np750xqaa-526466-np750xqa-kb2uk-thumb-543953953?$UX_EXT2_PNG$",
    descripcion: "Laptop versátil ideal para tareas diarias y trabajo remoto, con pantalla Full HD y procesador eficiente.",
    stock: 100
  },
  {
    id: 2,
    name: "Laptop HP",
    price: 2900,
    categoria: "Laptops",
    imagen: "https://pe-media.hptiendaenlinea.com/catalog/product/6/K/6K2C8LA-1_T1740503426.png",
    descripcion: "Laptop HP con diseño moderno, adecuada para productividad, estudios y navegación web.",
    stock: 100
  },
  {
    id: 3,
    name: "Macbook",
    price: 4800,    
    categoria: "Laptops",
    imagen: "https://images.macrumors.com/t/Au-OUIb73hHvx2w8CirAir5bNbM=/1600x/article-new/2013/09/macbook-air-m2-roundup-header.png",
    descripcion: "MacBook con chip Apple Silicon, pantalla Retina y gran autonomía, ideal para diseño y multimedia.",
    stock: 100
  },
  {
    id: 4,
    name: "Celular Samsung",
    price: 1800,
    categoria: "Celulares",
    imagen: "https://images.samsung.com/is/image/samsung/p6pim/uk/np750xqa-kb2uk/gallery/uk-galaxy-book4-edge-15-inch-np750xqaa-526466-np750xqa-kb2uk-thumb-543953953?$UX_EXT2_PNG$",
    descripcion: "Smartphone Samsung con cámara de alta resolución y rendimiento confiable para el día a día.",
    stock: 100
  },
  {
    id: 5,
    name: "Celular Nokia",
    price: 250,
    categoria: "Celulares",
    imagen: "https://images.samsung.com/is/image/samsung/p6pim/pe/2501/gallery/pe-galaxy-s25-s938-sm-s938bzklltp-thumb-544714481?$216_216_PNG ",
    descripcion: "Clásico celular Nokia resistente, con batería de larga duración y funciones básicas.",
    stock: 100
  },
  {
    id: 6,
    name: "Celular Huawei",
    price: 1600,
    categoria: "Celulares",
    imagen: "https://img01.huaweifile.com/sg/ms/pe/pms/uomcdn/PE_HW_B2C/pms/202412/gbom/6942103145513/428_428_58B4F5849D6AE2EB891A93B959332718mp.png",
    descripcion: "Smartphone Huawei con pantalla amplia, excelente cámara y buen rendimiento para apps comunes.",
    stock: 100
  },
  {
    id: 7,
    name: "PC Ryzen",
    price: 2800,
    categoria: "Computadoras",
    imagen: "https://pcya.pe/wp-content/uploads/2024/01/PCRYZENMONI27.png",
    descripcion: "Computadora de escritorio con procesador Ryzen, ideal para trabajo multitarea y ofimática avanzada.", 
    stock: 100
  },
  {
    id: 8,
    name: "PC Gamer Intel",
    price: 4500,
    categoria: "Computadoras",
    imagen: "https://static.vecteezy.com/system/resources/previews/053/348/112/non_2x/gaming-pc-with-rgb-blue-led-lights-isolated-on-transparent-background-png.png",
    descripcion: "PC gamer con procesador Intel de última generación, tarjeta gráfica potente y refrigeración avanzada.",
    stock: 100
  },
  {
    id: 9,
    name: "PC Básica",
    price: 1900,
    categoria: "Computadoras",
    imagen: "https://infordata.com.pe/wp-content/uploads/2022/01/draco-xd-2.png",
    descripcion: "Computadora básica ideal para tareas escolares, navegación y trabajo en oficina ligera.",
    stock: 100
  },

  // Nuevas categorías

  // Videojuegos
  {
    id: 10,
    name: "PlayStation 5",
    price: 3000,
    categoria: "Videojuegos",
    imagen: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-pro-dualsense-image-block-01-en-16aug24?$facebook$",
    descripcion: "Consola de nueva generación con gráficos 4K y alta velocidad de carga.",
    stock: 100
  },
  {
    id: 11,
    name: "Xbox Series X",
    price: 2900,
    categoria: "Videojuegos",
    imagen: "https://imagedelivery.net/JAV112JY973Crznn4xb8Sg/2cc5cb81-61a0-42d9-322b-de11c9b8c000/mobile",
    descripcion: "Consola potente de Microsoft ideal para jugadores hardcore.",
    stock: 100
  },
  {
    id: 12,
    name: "Nintendo Switch",
    price: 1800,
    categoria: "Videojuegos",
    imagen: "https://assets.nintendo.com/image/upload/v1743547392/ccb3e8ca3c296e21a8c933e8369031511589d0ef6b079cf5bb3667b09893482c/Global%20Nav/Explore/Nintendo-Switch-2.png",
    descripcion: "Consola híbrida para jugar en casa o en movimiento con amigos.",    
    stock: 100
  },

  // Laptops Gamers
  {
    id: 13,
    name: "Asus ROG Strix",
    price: 5000,
    categoria: "Laptops gamers",
    imagen: "https://dlcdnwebimgs.asus.com/files/media/8B74E7EE-B66A-4420-894E-3C3B980312EE/v1/img/design/color/strix-g-2022-pink.png",
    descripcion: "Laptop gamer de alto rendimiento con gráfica NVIDIA RTX.",
    stock: 100
  },
  {
    id: 14,
    name: "MSI Raider GE66",
    price: 5200,
    categoria: "Laptops gamers",
    imagen: "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_85686036/fee_786_587_png",
    descripcion: "Rendimiento de nivel profesional para gaming y streaming.",
    stock: 100
  },
  {
    id: 15,
    name: "Acer Predator Helios",
    price: 4800,
    categoria: "Laptops gamers",
    imagen: "https://media.croma.com/image/upload/v1721988892/Croma%20Assets/Computers%20Peripherals/Laptop/Images/305888_0_ppkjvd.png",
    descripcion: "Laptop ideal para juegos exigentes y multitarea intensiva.",
    stock: 100
  },

  // Televisores
  {
    id: 16,
    name: "Smart TV LG 55\" 4K",
    price: 2500,
    categoria: "Televisores",
    imagen: "https://marcimex.vtexassets.com/arquivos/ids/214479-800-auto?v=638615146594100000&width=800&height=auto&aspect=true",
    descripcion: "Televisor con resolución 4K UHD y conectividad inteligente.",
    stock: 100
  },
  {
    id: 17,
    name: "Samsung QLED 65\"",
    price: 3500,
    categoria: "Televisores",
    imagen: "https://images.samsung.com/is/image/samsung/p6pim/mx/qn65q60bafxzx/gallery/mx-qled-q60b-qn65q60bafxzx-531541565?$684_547_PNG$",
    descripcion: "Calidad de imagen superior con tecnología QLED.",
    stock: 100
  },
  {
    id: 18,
    name: "Sony Bravia 50\"",
    price: 2700,
    categoria: "Televisores",
    imagen: "https://images-ext-1.discordapp.net/external/FqBbc1Mzwq9eWcp_46xXZIoEYjaXrCeQ4fTZBL4ST28/https/d1ncau8tqf99kp.cloudfront.net/converted/119453_original_local_1200x1050_v3_converted.webp?format=webp&width=723&height=633",
    descripcion: "Smart TV con Android y calidad de imagen realista.",  
    stock: 100
  },

  // Audio
  {
    id: 19,
    name: "Sony WH-1000XM4",
    price: 1200,
    categoria: "Audio",
    imagen: "https://mercury.vtexassets.com/arquivos/ids/12646810/image-f85afa055b8d411bbe7570d07c1c19b4.jpg?v=638197848942330000",
    descripcion: "Audífonos inalámbricos con cancelación de ruido líder en la industria.",
    stock: 100
  },
  {
    id: 20,
    name: "JBL Flip 6",
    price: 400,
    categoria: "Audio",
    imagen: "https://www.jbl.com.pe/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw9d226ea7/2_JBL_FLIP6_3_4_RIGHT_BLUE_30192_x1.png?sw=537&sfrm=png",
    descripcion: "Parlante portátil con sonido potente y resistente al agua.",
    stock: 100
  },
  {
    id: 21,
    name: "Bose Home Speaker 500",
    price: 1500,
    categoria: "Audio",
    imagen: "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/speakers/bose_home_speaker_500/product_silo_images/bose_home_speaker_500_triple_black_EC_hero.psd/jcr:content/renditions/cq5dam.web.1920.1920.png",
    descripcion: "Altavoz inteligente con Alexa integrada y sonido envolvente.",
    stock: 100
  }
];

export default productos;
