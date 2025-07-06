import React from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "users_data";

export default function TableRow({ user, index, setUsers }) {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/admin/detailUser/${user.id}`);
  };

  const handleUser = async (e) => {
    e.stopPropagation();

    try {
      const newStatus = user.status === "Activo" ? "Inactivo" : "Activo";
      
      console.log(user.status == "Activo" ? false : true);
      const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: user.status == "Activo" ? false : true }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Error al actualizar el estado del usuario');
      }

  
      setUsers(prevUsers => {
        const updatedUsers = prevUsers.map((u) => {
          if (u.id === user.id) {
            return { ...u, status: newStatus };
          }
          return u;
        });
        return updatedUsers;
      });
    } catch (error) {
      console.error('Error updating user status:', error);

    }
  };

  return (
    <tr
      className="border-b hover:bg-gray-50 cursor-pointer transition-colors duration-150 text-xs h-12 rounded-lg shadow-sm bg-white"
      onClick={handleRowClick}
    >
      <td className="p-1 font-medium text-gray-300">{index}</td>
      <td className="p-1 font-medium text-gray-300">{user.id}</td>
      <td className="p-1 flex items-center gap-2">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-6 h-6 rounded-full border border-gray-200 shadow-sm"
        />
        <span className="text-gray-700 font-medium">{user.name}</span>
      </td>
      <td className="p-1 text-gray-400 font-normal">{user.email}</td>
      <td className="p-1 flex items-center justify-start">
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shadow-sm ${
            user.status === "Activo"
              ? "bg-green-50 text-green-500 border border-green-100"
              : "bg-gray-100 text-gray-400 border border-gray-200"
          }`}
        >
          {user.status}
        </span>
      </td>
      <td className="p-1">
        <button
          className={`px-3 py-0.5 rounded-full text-[11px] font-bold shadow-sm transition-colors duration-150 ${
            user.status === "Activo"
              ? "bg-red-50 hover:bg-red-100 text-red-500"
              : "bg-green-50 hover:bg-green-100 text-green-500"
          }`}
          onClick={handleUser}
        >
          {user.status === "Activo" ? "Desactivar" : "Activar"}
        </button>
      </td>
    </tr>
  );
}
