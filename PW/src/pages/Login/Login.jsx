import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

function Login() {
  const [inputEmail, setEmail] = useState('');
  const [inputPassword, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();

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
