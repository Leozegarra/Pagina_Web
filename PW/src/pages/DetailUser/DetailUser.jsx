import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import DashboardHeader from '../../components/DashboardHeader/DashBoardHeader';

const DetailUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
  
      const users = JSON.parse(localStorage.getItem('users_data'));
      const currentUser = users.find(u => u.id === parseInt(id));
      
      if (!currentUser) {
        navigate('/admin/listUsers');
        return;
      }
      setUser(currentUser);

      const orders = JSON.parse(localStorage.getItem('orders_data'));
      console.log("orders",orders)
      console.log("currentUser",currentUser)
      const filteredOrders = orders
        .filter(order => order.email === currentUser.email)
        .slice(0, 10);
      console.log("filteredOrders",filteredOrders)
      setUserOrders(filteredOrders);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SideBar />
        <div className="flex-1 p-6">
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 p-6">
        <DashboardHeader title="Detalle de Usuario" />
        
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* User Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-center">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-32 h-32 rounded-full mx-auto border-4 border-blue-100"
                  />
                  <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
                  <p className="text-gray-600 mt-1">{user.email}</p>
                  <div className="mt-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      user.status === 'Activo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Rol</span>
                      <span className="font-medium text-gray-800">{user.role}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Total Órdenes</span>
                      <span className="font-medium text-gray-800">{userOrders.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800">Órdenes Recientes</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Producto
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Fecha
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userOrders.map((order) => (
                        <tr 
                          key={order.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => navigate(`/admin/orders/${order.id}`)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            #{order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.producto}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.fecha}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.estado === 'Entregado' 
                                ? 'bg-green-100 text-green-800' 
                                : order.estado === 'Cancelado'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${order.precio}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {userOrders.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No hay órdenes para mostrar</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailUser; 