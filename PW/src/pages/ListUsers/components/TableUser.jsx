import React from 'react'
import TableRow from './TableRow.jsx';

export default function TableUser({ users, setUsers }) {
  return (
    <table className="w-full text-left mt-4">
      <thead>
        <tr className="border-b">
          <th className="p-2">#</th>
          <th className="p-2">ID</th>
          <th className="p-2">Nombre</th>
          <th className="p-2">Email</th>
          <th className="p-2">Estado</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <TableRow 
            key={user.id} 
            user={user} 
            index={index + 1} 
            setUsers={setUsers}
          />
        ))}
      </tbody>
    </table>
  );
}
