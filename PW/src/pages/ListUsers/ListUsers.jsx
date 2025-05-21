import React, { useEffect, useState } from "react";
import UserTable from "./components/TableUser";
import Header from "../../components/DashboardHeader/DashBoardHeader";
import Sidebar from "../../components/SideBar/SideBar";

const initialUsers = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juanperez@example.com",
    role: "Admin",
    status: "Activo",
    avatar: "https://images.unsplash.com/photo-1747285726356-535557675eda?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    name: "María Gómez",
    email: "maria.gomez@example.com",
    role: "Usuario",
    status: "Activo",
    avatar: "https://images.unsplash.com/photo-1747285726356-535557675eda?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    name: "Carlos Ruiz",
    email: "carlosruiz@example.com",
    role: "Usuario",
    status: "Inactivo",
    avatar: "https://images.unsplash.com/photo-1747285726356-535557675eda?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    name: "Ana Torres",
    email: "ana.torres@example.com",
    role: "Usuario",
    status: "Activo",
    avatar: "https://images.unsplash.com/photo-1747285726356-535557675eda?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const STORAGE_KEY = 'users_data';

const ListUsers = () => {
  const [users, setUsers] = useState(() => {
    try {
      const savedUsers = localStorage.getItem(STORAGE_KEY);
      return savedUsers ? JSON.parse(savedUsers) : initialUsers;
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
      return initialUsers;
    }
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
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error guardando usuarios en localStorage:', error);
    }
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
