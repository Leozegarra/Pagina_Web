class Payment {
  constructor({ id, ordenId, monto, metodo, estado, fecha, createdAt, updatedAt }) {
    this.id = id;
    this.ordenId = ordenId;
    this.monto = monto;
    this.metodo = metodo;
    this.estado = estado;
    this.fecha = fecha;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Payment;