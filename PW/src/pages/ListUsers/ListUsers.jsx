import React, { useEffect, useState } from "react";
import UserTable from "./components/TableUser";
import Header from "../../components/DashboardHeader/DashBoardHeader";
import Sidebar from "../../components/SideBar/SideBar";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users');
        if (!response.ok) {
          throw new Error('Error al obtener usuarios');
        }
        const usersData = await response.json();
        

        const transformedUsers = usersData.map(user => ({
          ...user,
          status: user.estado ? 'Activo' : 'Desactivado',
          avatar: `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`
        }));
        console.log
        setUsers(transformedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.id.toString().includes(searchLower) ||
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1">
          <Header title="Lista de Usuarios" />
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

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
