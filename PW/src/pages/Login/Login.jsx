import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

function Login() {
  const [inputEmail, setEmail] = useState('');
  const [inputPassword, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: inputEmail, contrasena: inputPassword })
      });
      if (!response.ok) {
        setError('Email o contraseña incorrectos');
        return;
      }
      const user = await response.json();
      localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      setError('');
      if (user.rol && user.rol.toLowerCase() === 'admin') {
        alert('Bienvenido administrador');
        navigate('/admin/listOrders');
      } else {
        alert('Iniciando sesión...');
        navigate('/SCategorias');
      }
    } catch (err) {
      setError('Error de conexión o credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-white to-cyan-100">
      <div className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-teal-700 mb-6 tracking-tight">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              value={inputEmail}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 shadow-sm text-gray-800 placeholder-gray-400 bg-white transition-all outline-none"
              placeholder="ejemplo@email.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Contraseña</label>
            <input
              type="password"
              value={inputPassword}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 shadow-sm text-gray-800 placeholder-gray-400 bg-white transition-all outline-none"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center font-semibold mt-2">{error}</p>}
          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl shadow transition-all text-lg active:scale-95 mt-2">Entrar</button>
        </form>
        <div className="flex flex-col items-center gap-2 mt-6 w-full">
          <Link to="/register" className="text-teal-600 hover:underline text-sm font-medium">¿No tienes cuenta? Regístrate</Link>
          <Link to="/recover" className="text-gray-500 hover:text-teal-600 hover:underline text-xs">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
