const app = require('./app');
const sequelize = require('./db/config/config');

require('./domain/User');
require('./domain/Category');
require('./domain/Product');
require('./domain/Order');
require('./domain/Payment');
require('./domain/Cart');
require('./domain/CartItem');

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
