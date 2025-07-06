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
    const fetchUserData = async () => {
      try {
 
        const response = await fetch(`http://localhost:3000/api/users/${id}`);
        console.log(response)
        if (!response.ok) {
          throw new Error('Usuario no encontrado');
        }
        const userData = await response.json();
        

        const transformedUser = {
          ...userData,
          status: userData.estado ? 'Activo' : 'Inactivo',
          avatar: userData.avatar && userData.avatar.trim() !== ""
            ? userData.avatar
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        };
        
        setUser(transformedUser);
        console.log(userData)

        const ordersResponse = await fetch('http://localhost:3000/api/orders');
        if (ordersResponse.ok) {
          const allOrders = await ordersResponse.json();

          const filteredOrders = allOrders
            .filter(order => order.usuarioId === userData.id)
            .slice(0, 10);
          setUserOrders(filteredOrders);
        } else {
          console.error('Error al obtener órdenes');
          setUserOrders([]);
        }
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        navigate('/admin/listUsers');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
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
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <SideBar />
      <div className="flex-1 p-8 md:p-12">
        <DashboardHeader title="Detalle de Usuario" />
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* User Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
                <div className="text-center w-full flex flex-col items-center">
                  <div className="w-36 h-36 rounded-full border-4 border-teal-200 shadow-lg overflow-hidden mb-4 flex items-center justify-center bg-gray-50">
                    <img
                      src={user.avatar && user.avatar.trim() !== "" ? user.avatar : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                      alt={user.nombre}
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                  <h2 className="mt-2 text-3xl font-extrabold text-gray-800 tracking-tight">{user.nombre}</h2>
                  <p className="text-teal-600 text-lg font-semibold mt-1">{user.correo}</p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    {user.status === 'Activo' ? (
                      <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-700 border border-green-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        Activo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold bg-red-100 text-red-700 border border-red-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        Inactivo
                      </span>
                    )}
                  </div>
                  <div className="mt-8 space-y-3 w-full">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-500 font-medium">Rol</span>
                      <span className="font-bold text-gray-800">{user.role}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-500 font-medium">Total Órdenes</span>
                      <span className="font-bold text-gray-800">{userOrders.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Orders List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl">
                <div className="p-8 border-b border-gray-100 flex items-center gap-3">
                  <svg className="w-7 h-7 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /></svg>
                  <h3 className="text-2xl font-extrabold text-gray-800">Órdenes Recientes</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-teal-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Producto</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Fecha</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Estado</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {userOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-teal-50/60 cursor-pointer transition-all h-16"
                          onClick={() => navigate(`/admin/orders/${order.id}`)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-blue-600">#{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">
                            {order.productos ? `${order.productos.length} producto(s)` : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                            {new Date(order.fecha || order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              order.estado === 'completado'
                                ? 'bg-green-100 text-green-700 border border-green-200'
                                : order.estado === 'cancelado'
                                ? 'bg-red-100 text-red-700 border border-red-200'
                                : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                            }`}>
                              {order.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-base font-extrabold text-teal-700">S/ {order.precio}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {userOrders.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" /></svg>
                    <p className="text-gray-400 text-lg font-semibold">No hay órdenes para mostrar</p>
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