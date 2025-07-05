import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Recover() {
  const [inputEmail, setEmail] = useState('');
  const [inputName, setName] = useState('');
  const [inputSName, setSName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const Email = sessionStorage.getItem('useremail');
    const name = sessionStorage.getItem('name');
    const sname = sessionStorage.getItem('sname');

    if (inputEmail === Email && inputName === name && inputSName === sname) {
      const newPass = window.prompt('Establece tu nueva contraseña: ');
      if (newPass) {
        sessionStorage.setItem('userpass', newPass);
        setSuccess('Contraseña actualizada correctamente.');
        setError('');
        setTimeout(() => navigate('/Login'), 1500);
      }
    } else {
      setError('Datos incorrectos. Verifica tu información.');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-white to-cyan-100">
      <div className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-teal-700 mb-6 tracking-tight">Recuperar Contraseña</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Nombre</label>
            <input className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 shadow-sm text-gray-800 placeholder-gray-400 bg-white transition-all outline-none" type='text' value={inputName} placeholder='Nombre' onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Apellido</label>
            <input className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 shadow-sm text-gray-800 placeholder-gray-400 bg-white transition-all outline-none" type='text' value={inputSName} placeholder='Apellido' onChange={(e) => setSName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 shadow-sm text-gray-800 placeholder-gray-400 bg-white transition-all outline-none" type="email" value={inputEmail} placeholder='example@gmail.com' onChange={(e) => setEmail(e.target.value)} required />
          </div>
          {error && <p className="text-red-500 text-sm text-center font-semibold mt-2">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center font-semibold mt-2">{success}</p>}
          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl shadow transition-all text-lg active:scale-95 mt-2">Enviar</button>
        </form>
        <div className="flex flex-col items-center gap-2 mt-6 w-full">
          <Link to="/Login" className="text-teal-600 hover:underline text-sm font-medium">¿Ya tienes una cuenta? Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}

export default Recover;