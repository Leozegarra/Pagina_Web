<<<<<<< HEAD
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Login from './Login';

function Register() {
  const [inputEmail, setEmail] = useState(() => {
    // Obtener el valor guardado en sessionStorage o iniciar en 0
    const saved = sessionStorage.getItem('sessionCount');
  });

  const [inputpassword, setpassword] = useState(() => {
    // Obtener el valor guardado en sessionStorage o iniciar en 0
    const saved = sessionStorage.getItem('sessionCount');
  });

  const [inputname, setname] = useState(() => {
    // Obtener el valor guardado en sessionStorage o iniciar en 0
    const saved = sessionStorage.getItem('sessionCount');
  });
  const [inputsname, setsname] = useState(() => {
    // Obtener el valor guardado en sessionStorage o iniciar en 0
    const saved = sessionStorage.getItem('sessionCount');
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene la navegación a la URL del enlace
    sessionStorage.setItem('useremail', inputEmail);
    sessionStorage.setItem('userpass', inputpassword);
    sessionStorage.setItem('name', inputname);
    sessionStorage.setItem('sname', inputsname);


  };

  return (
    <>

      <div className='main'>
        <div>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend className='legend'>Registrarse</legend>
              <div>
                <label htmlFor="username">Nombre</label><br />
                <input className='minput' type='text' placeholder='Nombre de Usuario' autoFocus
                  onChange={(e) => setname(e.target.value)}
                  required
                />
                <input type="text" placeholder='Apellido'
                  onChange={(e) => setsname(e.target.value)}
                  required
                /> <br />

                <label htmlFor="email">Email</label><br />
                <input type="email" placeholder='example@gmail.com'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                /><br />

              </div><br />
              <div>
                <label htmlFor="Password">Contraseña</label><br />
                <input type="password" placeholder='Password'
                  onChange={(e) => setpassword(e.target.value)}
                  required
                /><br />

              </div><br />
              <button className='bbutton sbutton'>Registrarme</button>

            </fieldset>
          </form>
          <Link to="/Login">¿Ya tienes una cuenta?</Link><br />

        </div>
      </div>
    </>
  )
}

export default Register
=======
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
>>>>>>> 098cf79 (Cambios en el carrito)
