const OrderRepository = require('../repository/OrderRepository');
const OrderEntity = require('../domain/Order');
const Producto = require('../db/models').Producto;

/**
 * Dado un objeto order, devuelve un array con los detalles completos de cada producto y su cantidad.
 * @param {Order} order Instancia de Order (con campo productos)
 * @returns {Promise<Array<{ producto: Producto, cantidad: number }>>}
 */
async function getOrderWithProductDetails(order) {
  if (!order || !order.productos || !Array.isArray(order.productos)) return [];
  const productosIds = order.productos.map(p => p.productoId);
  const productos = await Producto.findAll({ where: { id: productosIds } });
  // Combina detalles y cantidad
  return order.productos.map(p => ({
    producto: productos.find(prod => prod.id === p.productoId),
    cantidad: p.cantidad
  }));
}

const OrderService = {
  async create(orderData) {
    const order = await OrderRepository.create(orderData);
    return new OrderEntity(order);
  },
  async getById(id) {
    const order = await OrderRepository.findById(id);
    return order ? new OrderEntity(order) : null;
  },
  async getAll() {
    const orders = await OrderRepository.findAll();
    return orders.map(o => new OrderEntity(o));
  },
  async update(id, data) {
    const updated = await OrderRepository.update(id, data);
    return updated ? new OrderEntity(updated) : null;
  },
  async remove(id) {
    return await OrderRepository.remove(id);
  }
};

module.exports = OrderService;
module.exports.getOrderWithProductDetails = getOrderWithProductDetails; 