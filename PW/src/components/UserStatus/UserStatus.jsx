import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const UserStatus = ({ guestClassName = '' }) => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  // Leer usuario de sessionStorage si no hay en contexto
  let displayUser = user;
  if (!displayUser) {
    const sessionUser = sessionStorage.getItem('loggedUser');
    if (sessionUser) {
      try {
        displayUser = JSON.parse(sessionUser);
      } catch {
        // Si hay error, no hacer nada
      }
    }
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedUser');
    sessionStorage.removeItem('loggedUser');
    alert('Sesión cerrada');
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center gap-3 font-semibold">
      <span className={`px-3 py-1 rounded-xl border border-gray-300 shadow-sm bg-gray-100 text-gray-700 text-sm ${!displayUser ? 'font-bold' : 'bg-teal-100 text-teal-700'} ${guestClassName}`}>
        {displayUser?.name || 'Guest'}
      </span>
      {displayUser ? (
        <button
          onClick={handleLogout}
          className="text-teal-600 hover:underline hover:text-teal-800 text-sm font-normal px-2 py-1 rounded transition"
        >
          Cerrar sesión
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="text-teal-600 hover:underline hover:text-teal-800 text-sm font-normal px-2 py-1 rounded transition"
        >
          Iniciar sesión
        </button>
      )}
    </div>
  );
};

export default UserStatus;
