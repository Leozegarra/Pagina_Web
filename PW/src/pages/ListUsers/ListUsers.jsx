import React, { useEffect, useState } from "react";
import UserTable from "./components/TableUser";
import Header from "../../components/DashboardHeader/DashBoardHeader";
import Sidebar from "../../components/SideBar/SideBar";

const initialUsers = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    role: "Admin",
    status: "Activo",
    avatar:"https://images.unsplash.com/photo-1747285726356-535557675eda?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    name: "María García",
    email: "maria.garcia@example.com",
    role: "Usuario",
    status: "Activo",
    avatar:"https://images.unsplash.com/photo-1747285726356-535557675eda?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    name: "Carlos López",
    email: "carlos.lopez@example.com",
    role: "Usuario",
    status: "Inactivo",
    avatar:"https://images.unsplash.com/photo-1747285726356-535557675eda?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
      <div className="flex-1 p-6">
        <Header title="Lista de Usuarios" />
        <UserTable users={users} setUsers={setUsers} />
      </div>
    </div>
  );
};

export default ListUsers;
