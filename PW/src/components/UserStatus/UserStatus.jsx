import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const UserStatus = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); //actualiza el contexto
    localStorage.removeItem('loggedUser');
    alert('Sesión cerrada');
    navigate('/');
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontWeight: 'bold'
    }}>
      <span>Cuenta: {user?.name || 'Guest'}</span>
      {user && (
        <button
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            color: '#007bff',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontWeight: 'normal'
          }}
        >
          Cerrar sesión
        </button>
      )}
    </div>
  );
};

export default UserStatus;
