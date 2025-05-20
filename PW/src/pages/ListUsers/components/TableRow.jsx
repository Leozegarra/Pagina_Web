import React from "react";

export default function TableRow({ user, index }) {
  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="p-2">{index}</td>
      <td className="p-2">{user.id}</td>
      <td className="p-2 flex items-center">
        <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
        {user.name}
      </td>
      <td className="p-2">{user.email}</td>
      <td className="p-2 flex items-center justify-start">
        <span className={`px-2 py-1`}>
          {user.active ? 'Activo' : 'Desactivado'}
        </span>
        <div className={`w-5 h-5 rounded-4xl ${user.active ? 'bg-red-500' : 'bg-green-500'}`}>
         </div>
      </td>
      <td className="p-2 rounded-lg">
        <button className={`px-4 py-1  w-40 ${user.active ? 'bg-red-500 text-white' : 'bg-teal-500 text-white'}`}>
          {user.active ? 'Desactivar' : 'Activar'}
        </button>
      </td>
    </tr>
  );
}