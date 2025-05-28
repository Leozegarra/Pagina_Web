import React from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "users_data";

export default function TableRow({ user, index, setUsers }) {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/admin/users/${user.id}`);
  };

  const handleUser = (e) => {
    e.stopPropagation();

    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map((u) => {
        if (u.id === user.id) {
          return { ...u, status: u.status === "Activo" ? "Inactivo" : "Activo" };
        }
        return u;
      });
      return updatedUsers;
    });
  };

  return (
    <tr
      className="border-b hover:bg-gray-100 cursor-pointer transition-colors duration-150"
      onClick={handleRowClick}
    >
      <td className="p-2">{index}</td>
      <td className="p-2">{user.id}</td>
      <td className="p-2 flex items-center">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
        {user.name}
      </td>
      <td className="p-2">{user.email}</td>
      <td className="p-2 flex items-center justify-start">
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${
            user.status === "Activo"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {user.status}
        </span>
      </td>
      <td className="p-2">
        <button
          className={`px-4 py-1 rounded-md w-40 ${
            user.status === "Activo"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-teal-500 hover:bg-teal-600"
          } text-white transition-colors duration-150`}
          onClick={handleUser}
        >
          {user.status === "Activo" ? "Desactivar" : "Activar"}
        </button>
      </td>
    </tr>
  );
}
