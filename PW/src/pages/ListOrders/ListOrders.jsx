import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import DashboardHeader from "../../components/DashboardHeader/DashBoardHeader";
import OrderTable from "./components/OrderTable";

export default function ListOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/orders');
        if (!response.ok) {
          throw new Error('Error al obtener órdenes');
        }
        const ordersData = await response.json();
        
      
        const usersResponse = await fetch('http://localhost:3000/api/users');
        const users = usersResponse.ok ? await usersResponse.json() : [];
        
      
        const transformedOrders = ordersData.map(order => {
          const user = users.find(u => u.id === order.usuarioId);
          return {
            ...order,
            cliente: user ? user.nombre : 'Usuario no encontrado',
            email: user ? user.correo : 'N/A',
            producto: `${order.productos ? order.productos.length : 0} producto(s)`,
            fecha: new Date(order.fecha || order.createdAt).toLocaleDateString(),
            status: order.estado
          };
        });
        
        setOrders(transformedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.id.toString().includes(searchLower) ||
      order.cliente.toLowerCase().includes(searchLower) ||
      order.email.toLowerCase().includes(searchLower) ||
      order.producto.toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex">
        <SideBar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader title={"Lista de Órdenes"} />
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title={"Lista de Órdenes"} />

        <div className="mt-10 mr-2 ml-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por ID, cliente, email, producto o estado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {searchTerm && (
            <p className="mt-2 text-sm text-gray-500">
              {filteredOrders.length}{" "}
              {filteredOrders.length === 1 ? "resultado" : "resultados"}{" "}
              encontrados
            </p>
          )}
        </div>

        <OrderTable orders={filteredOrders} setOrders={setOrders} />
      </div>
    </div>
  );
}
