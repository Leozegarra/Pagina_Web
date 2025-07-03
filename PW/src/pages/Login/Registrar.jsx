import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveUser, getUsers } from '../../services/userService';

function Registrar() {
  const [inputEmail, setEmail] = useState('');
  const [inputPassword, setPassword] = useState('');
  const [inputName, setName] = useState('');
  const [inputSName, setSName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(),
      email: inputEmail,
      password: inputPassword,
      name: inputName,
      sname: inputSName,
      purchases: [],
    };

    const existingUsers = getUsers();

    const userExists = existingUsers.some((u) => u.email === newUser.email);

    if (userExists) {
      alert("Este email ya está registrado");
      return;
    }

    saveUser(newUser);  // Guarda usando el servicio que usa la clave correcta

    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    navigate("/Login");
  };

  return (
    <div className='main'>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className='legend'>Registrarse</legend>

          <label>Nombre</label><br />
          <input type='text' placeholder='Nombre' required onChange={(e) => setName(e.target.value)} /><br />

          <label>Apellido</label><br />
          <input type='text' placeholder='Apellido' required onChange={(e) => setSName(e.target.value)} /><br />

          <label>Email</label><br />
          <input type='email' placeholder='example@gmail.com' required onChange={(e) => setEmail(e.target.value)} /><br />

          <label>Contraseña</label><br />
          <input type='password' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} /><br /><br />

          <button className='bbutton sbutton'>Registrarme</button>
        </fieldset>
      </form>

      <Link to="/Login">¿Ya tienes una cuenta?</Link>
    </div>
  );
}

export default Registrar;
