class Payment {
  constructor({ id, orderId, amount, method, status, date, createdAt, updatedAt }) {
    this.id = id;
    this.orderId = orderId;
    this.amount = amount;
    this.method = method;
    this.status = status;
    this.date = date;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Payment;
