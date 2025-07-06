class User {
  constructor({ id, name, sname, email, password, estado, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.sname = sname;
    this.email = email;
    this.password = password;
    this.estado = estado;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = User; 