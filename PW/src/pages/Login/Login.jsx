<<<<<<< HEAD
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [inputEmail, setEmail] = useState();
  const [inputPassword, setPassword] = useState();
  const [inputname, setname] = useState();
  const [inputsname, setsname] = useState();
  const [error, setError] = useState('');
  const navigate = useNavigate();

=======
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

function Login() {
  const [inputEmail, setEmail] = useState('');
  const [inputPassword, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();
>>>>>>> 098cf79 (Cambios en el carrito)

  const handleSubmit = (e) => {
    e.preventDefault();

<<<<<<< HEAD
    const Email = sessionStorage.getItem('useremail');
    const password = sessionStorage.getItem('userpass');
    const name = sessionStorage.getItem('name');
    const sname = sessionStorage.getItem('sname');

    if (inputEmail === Email && inputPassword === password) {
      // Autenticación exitosa
      setError('');
      alert('Iniciando Sesión...');
      navigate('/Register.jsx'); // redirige a una página protegida
    } else {
      setError('Email o contraseña incorrectos');
    }

  };

  return (
    <>

      <div >
        <div className='main'>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend className='legend'>Login</legend>
              <div>
                <label htmlFor="email">Email</label><br />
                <input
                  type="email"
                  value={inputEmail}
                  placeholder='example@gmail.com'
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  required
                /><br />

                <label htmlFor="Password">Password</label><br />
                <input
                  type="password"
                  value={inputPassword}
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div><br />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <button type="submit" className='bbutton sbutton'>Login</button>
            </fieldset>
          </form>
          <Link to="./Login/Registrar">Registrarse</Link><br />
          <Link to="./Login/Recover">¿Olvidaste tu contraseña?</Link><br />
        </div>
      </div>
    </>
  );
}


export default Login;
=======
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      u => u.email === inputEmail && u.password === inputPassword
    );

    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user); //actualiza el contexto
      setError('');
      alert('Iniciando sesión...');

      // Redirige según tipo de usuario
      if (user.email === "admin@example.com") {
        navigate('/admin/listOrders');
      } else {
        navigate('/SCategorias');
      }
    } else {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div className='main'>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className='legend'>Login</legend>

          <label>Email</label><br />
          <input
            type="email"
            value={inputEmail}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />

          <label>Contraseña</label><br />
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />

          {error && <p style={{ color: 'red' }}>{error}</p>}
          <br />
          <button type="submit" className='bbutton sbutton'>Login</button>
        </fieldset>
      </form>

      <Link to="/register">Registrarse</Link><br />
      <Link to="/recover">¿Olvidaste tu contraseña?</Link>
    </div>
  );
}

export default Login;
>>>>>>> 098cf79 (Cambios en el carrito)
