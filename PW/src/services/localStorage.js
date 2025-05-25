export const STORAGE_KEYS = {
  USERS: 'users_data',
  ORDERS: 'orders_data',
  CART: 'cart_data',
  CATEGORIES: 'categories_data'
};


export const initialData = {
  users: [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juanperez@example.com",
      role: "Usuario",
      status: "Activo",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "María Gómez",
      email: "maria.gomez@example.com",
      role: "Usuario",
      status: "Activo",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Carlos Ruiz",
      email: "carlosruiz@example.com",
      role: "Usuario",
      status: "Inactivo",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Ana Torres",
      email: "ana.torres@example.com",
      role: "Usuario",
      status: "Activo",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Roberto Sánchez",
      email: "roberto.sanchez@example.com",
      role: "Usuario",
      status: "Activo",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Laura Martínez",
      email: "laura.martinez@example.com",
      role: "Usuario",
      status: "Activo",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"
    },
    {
      id: 7,
      name: "Miguel Ángel López",
      email: "miguel.lopez@example.com",
      role: "Usuario",
      status: "Inactivo",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 8,
      name: "Sofía Rodríguez",
      email: "sofia.rodriguez@example.com",
      role: "Usuario",
      status: "Activo",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 9,
      name: "Diego Hernández",
      email: "diego.hernandez@example.com",
      role: "Usuario",
      status: "Activo",
      avatar: "https://images.unsplash.com/photo-1506795660198-e95c6320213d?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 10,
      name: "Valentina Castro",
      email: "valentina.castro@example.com",
      role: "Usuario",
      status: "Inactivo",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop"
    }
  ],
  orders: [
    {
      id: 1001,
      cliente: "Juan Pérez",
      email: "juanperez@example.com",
      producto: "Laptop HP Pavilion",
      cantidad: 1,
      precio: 3500,
      fecha: "2024-03-18",
      estado: "Pendiente",
      imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop"
    },
    {
      id: 1002,
      cliente: "María Gómez",
      email: "maria.gomez@example.com",
      producto: "Mouse Logitech",
      cantidad: 2,
      precio: 120,
      fecha: "2024-03-17",
      estado: "Entregado",
      imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 1003,
      cliente: "Carlos Ruiz",
      email: "carlosruiz@example.com",
      producto: 'Monitor Samsung 24"',
      cantidad: 1,
      precio: 750,
      fecha: "2024-03-19",
      estado: "Pendiente",
      imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 1004,
      cliente: "Ana Torres",
      email: "ana.torres@example.com",
      producto: "Teclado Mecánico RGB",
      cantidad: 1,
      precio: 290,
      fecha: "2024-03-16",
      estado: "Entregado",
      imagen: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=2080&auto=format&fit=crop"
    },
    {
      id: 1005,
      cliente: "Roberto Sánchez",
      email: "roberto.sanchez@example.com",
      producto: "Auriculares Sony WH-1000XM4",
      cantidad: 1,
      precio: 1500,
      fecha: "2024-03-15",
      estado: "Entregado",
      imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 1006,
      cliente: "Laura Martínez",
      email: "laura.martinez@example.com",
      producto: "Webcam Logitech C920",
      cantidad: 1,
      precio: 200,
      fecha: "2024-03-14",
      estado: "Cancelado",
      imagen: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1958&auto=format&fit=crop"
    },
    {
      id: 1007,
      cliente: "Miguel Ángel López",
      email: "miguel.lopez@example.com",
      producto: "SSD Samsung 1TB",
      cantidad: 2,
      precio: 450,
      fecha: "2024-03-13",
      estado: "Entregado",
      imagen: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 1008,
      cliente: "Sofía Rodríguez",
      email: "sofia.rodriguez@example.com",
      producto: "Laptop Dell XPS 13",
      cantidad: 1,
      precio: 4200,
      fecha: "2024-03-12",
      estado: "Pendiente",
      imagen: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2029&auto=format&fit=crop"
    },
    {
      id: 1009,
      cliente: "Diego Hernández",
      email: "diego.hernandez@example.com",
      producto: "Monitor LG UltraWide 34\"",
      cantidad: 1,
      precio: 1200,
      fecha: "2024-03-11",
      estado: "Entregado",
      imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 1010,
      cliente: "Valentina Castro",
      email: "valentina.castro@example.com",
      producto: "Teclado Apple Magic Keyboard",
      cantidad: 1,
      precio: 350,
      fecha: "2024-03-10",
      estado: "Cancelado",
      imagen: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=2080&auto=format&fit=crop"
    }
  ],
  categories: [
    {
      id: 1,
      name: "Laptops",
      description: "Computadoras portátiles de alta calidad",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Periféricos",
      description: "Mouse, teclados y otros accesorios",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Monitores",
      description: "Pantallas de alta resolución",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Audio",
      description: "Auriculares y altavoces",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Almacenamiento",
      description: "SSDs, HDDs y unidades externas",
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Cámaras",
      description: "Webcams y cámaras de seguridad",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1958&auto=format&fit=crop"
    },
    {
      id: 7,
      name: "Redes",
      description: "Routers y equipos de red",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 8,
      name: "Gaming",
      description: "Equipos y accesorios para gaming",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 9,
      name: "Impresión",
      description: "Impresoras y escáneres",
      image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 10,
      name: "Accesorios",
      description: "Cables, adaptadores y más",
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1974&auto=format&fit=crop"
    }
  ]
};


export const localStorageService = {
 
  getData: (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : initialData[key.split('_')[0]];
    } catch (error) {
      console.error(`Error al cargar datos de ${key}:`, error);
      return initialData[key.split('_')[0]];
    }
  },

  saveData: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error al guardar datos en ${key}:`, error);
    }
  },

  initializeData: () => {
    try {
      Object.entries(initialData).forEach(([key, data]) => {
        const storageKey = STORAGE_KEYS[key.toUpperCase()];
        if (!localStorage.getItem(storageKey)) {
          localStorage.setItem(storageKey, JSON.stringify(data));
        }
      });
    } catch (error) {
      console.error('Error al inicializar los datos:', error);
    }
  }
};

localStorageService.initializeData(); 