const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración SSL para OCI (solo si está habilitado y el servidor lo soporta)
const sslConfig = process.env.DB_SSL === 'true' ? {
  ssl: {
    require: true,
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
  }
} : {};

// Crear instancia de Sequelize con configuración de OCI
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ...sslConfig,
      connectTimeout: 60000,
      acquireTimeout: 60000,
      timeout: 60000,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: console.log
  }
);

async function testConnection() {
  try {
    console.log('🔌 Probando conexión a PostgreSQL en OCI...');
    console.log(`📍 Host: ${process.env.DB_HOST}`);
    console.log(`📊 Base de datos: ${process.env.DB_NAME}`);
    console.log(`👤 Usuario: ${process.env.DB_USER}`);
    console.log(`🔒 SSL: ${process.env.DB_SSL === 'true' ? 'Habilitado' : 'Deshabilitado'}`);
    console.log('⏳ Conectando...\n');

    // Probar conexión
    await sequelize.authenticate();
    
    console.log('✅ ¡Conexión exitosa!');
    console.log('🎉 La base de datos PostgreSQL en OCI está funcionando correctamente.');
    
    // Probar una consulta simple
    const [results] = await sequelize.query('SELECT NOW() as current_time');
    console.log(`⏰ Hora del servidor: ${results[0].current_time}`);
    
    // Verificar tablas existentes
    const tables = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('\n📋 Tablas existentes en la base de datos:');
    if (tables[0].length > 0) {
      tables[0].forEach(table => {
        console.log(`  - ${table.table_name}`);
      });
    } else {
      console.log('  (No hay tablas creadas aún)');
    }
    
  } catch (error) {
    console.error('❌ Error de conexión:');
    console.error(error.message);
    
    // Sugerencias de solución
    console.log('\n🔧 Posibles soluciones:');
    console.log('1. Verifica que las variables de entorno estén configuradas correctamente');
    console.log('2. Asegúrate de que el servidor PostgreSQL esté ejecutándose en OCI');
    console.log('3. Verifica que el firewall permita conexiones al puerto 5432');
    console.log('4. Confirma que las credenciales sean correctas');
    console.log('5. Si usas SSL, verifica la configuración de certificados');
    
  } finally {
    await sequelize.close();
    console.log('\n🔌 Conexión cerrada.');
  }
}

// Ejecutar prueba
testConnection(); 