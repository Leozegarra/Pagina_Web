class User {
  constructor({ id, nombre, correo, contrasena, rol, avatar, estado, createdAt, updatedAt }) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.contrasena = contrasena;
    this.rol = rol;
    this.avatar = avatar;
    this.estado = estado;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = User; 