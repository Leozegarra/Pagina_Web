class User {
  constructor({ id, email, password, name, sname }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.sname = sname;
  }
}

module.exports = User; 