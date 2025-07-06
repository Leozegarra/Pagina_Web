class Payment {
  constructor({ id, orderId, amount, method, createdAt, updatedAt }) {
    this.id = id;
    this.orderId = orderId;
    this.amount = amount;
    this.method = method;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Payment; 