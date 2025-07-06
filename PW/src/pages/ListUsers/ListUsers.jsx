import React, { useEffect, useState } from "react";
import UserTable from "./components/TableUser";
import Header from "../../components/DashboardHeader/DashBoardHeader";
import Sidebar from "../../components/SideBar/SideBar";
import { localStorageService, STORAGE_KEYS } from "../../services/localStorage";

const ListUsers = () => {
  const [users, setUsers] = useState(() => {
    return localStorageService.getData(STORAGE_KEYS.USERS);
  });

  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.id.toString().includes(searchLower) ||
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    localStorageService.saveData(STORAGE_KEYS.USERS, users);
  }, [users]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Header title="Lista de Usuarios" />
      
        <div className="mt-10 mr-2 ml-2">
          <div className="relative flex gap-12">
            <input
              type="text"
              placeholder="Buscar por ID, nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {searchTerm && (
            <p className="mt-2 text-sm text-gray-500">
              {filteredUsers.length} {filteredUsers.length === 1 ? 'resultado' : 'resultados'} encontrados
            </p>
          )}
        </div>

        <UserTable users={filteredUsers} setUsers={setUsers} />
      </div>
    </div>
  );
};

export default ListUsers;
