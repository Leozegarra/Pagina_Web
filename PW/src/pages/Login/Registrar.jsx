import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveUser, getUsers } from '../../services/userService';

function Registrar() {
  const [inputEmail, setEmail] = useState('');
  const [inputPassword, setPassword] = useState('');
  const [inputName, setName] = useState('');
  const [inputSName, setSName] = useState('');
  const [error, setError] = useState('');
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
      setError('Este email ya está registrado');
      return;
    }

    saveUser(newUser);
    localStorage.setItem('loggedUser', JSON.stringify(newUser));
    sessionStorage.setItem('loggedUser', JSON.stringify(newUser));
    setError('');
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    navigate('/Login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-white to-cyan-100">
      <div className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-teal-700 mb-6 tracking-tight">Registrarse</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Nombre</label>
            <input type='text' placeholder='Nombre' required onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 shadow-sm text-gray-800 placeholder-gray-400 bg-white transition-all outline-none" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Apellido</label>
            <input type='text' placeholder='Apellido' required onChange={(e) => setSName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 shadow-sm text-gray-800 placeholder-gray-400 bg-white transition-all outline-none" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input type='email' placeholder='example@gmail.com' required onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 shadow-sm text-gray-800 placeholder-gray-400 bg-white transition-all outline-none" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Contraseña</label>
            <input type='password' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 shadow-sm text-gray-800 placeholder-gray-400 bg-white transition-all outline-none" />
          </div>
          {error && <p className="text-red-500 text-sm text-center font-semibold mt-2">{error}</p>}
          <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl shadow transition-all text-lg active:scale-95 mt-2">Registrarme</button>
        </form>
        <div className="flex flex-col items-center gap-2 mt-6 w-full">
          <Link to="/Login" className="text-teal-600 hover:underline text-sm font-medium">¿Ya tienes una cuenta?</Link>
        </div>
      </div>
    </div>
  );
}

export default Registrar;
