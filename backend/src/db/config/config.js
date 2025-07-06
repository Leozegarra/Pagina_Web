require('dotenv').config();

function buildConfig(env) {
  const base = {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'project',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    pool: {
      max: env === 'production' ? 10 : 5,
      min: env === 'production' ? 2 : 0,
      acquire: 30000,
      idle: 10000
    },
    logging: env === 'production' ? false : console.log,
  };
  if (process.env.DB_SSL === 'true') {
    base.dialectOptions = {
      ssl: {
        require: true,
        rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
      },
      connectTimeout: 60000,
      acquireTimeout: 60000,
      timeout: 60000,
    };
  }
  return base;
}

module.exports = {
  development: buildConfig('development'),
  test: buildConfig('test'),
  production: buildConfig('production'),
};
