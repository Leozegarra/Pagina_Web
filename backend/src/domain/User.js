class User {
  constructor({
    id,
    name,
    sname,
    email,
    password,
    role,
    avatar,
    status,
    createdAt,
    updatedAt
  }) {
    this.id = id;
    this.name = name;
    this.sname = sname;           // Segundo nombre o apellido
    this.email = email;
    this.password = password;
    this.role = role;
    this.avatar = avatar;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = User;
