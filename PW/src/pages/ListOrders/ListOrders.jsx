import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import DashboardHeader from "../../components/DashboardHeader/DashBoardHeader";
import OrderTable from "./components/OrderTable";

const initialOrders = [
  {
    id: 1001,
    cliente: "Juan Pérez",
    email: "juanperez@example.com",
    producto: "Laptop HP Pavilion",
    cantidad: 1,
    precio: 3500,
    fecha: "2024-03-18",
    estado: "Pendiente",
  },
  {
    id: 1002,
    cliente: "María Gómez",
    email: "maria.gomez@example.com",
    producto: "Mouse Logitech",
    cantidad: 2,
    precio: 120,
    fecha: "2024-03-17",
    estado: "Entregado",
  },
  {
    id: 1003,
    cliente: "Carlos Ruiz",
    email: "carlosruiz@example.com",
    producto: 'Monitor Samsung 24"',
    cantidad: 1,
    precio: 750,
    fecha: "2024-03-19",
    estado: "Pendiente",
  },
  {
    id: 1004,
    cliente: "Ana Torres",
    email: "ana.torres@example.com",
    producto: "Teclado Mecánico",
    cantidad: 1,
    precio: 290,
    fecha: "2024-03-16",
    estado: "Entregado",
  },
  {
    id: 1005,
    cliente: "Juan Pérez",
    email: "juanperez@example.com",
    producto: "Auriculares Sony",
    cantidad: 1,
    precio: 150,
    fecha: "2024-03-15",
    estado: "Entregado",
  },
  {
    id: 1006,
    cliente: "María Gómez",
    email: "maria.gomez@example.com",
    producto: "Webcam HD",
    cantidad: 1,
    precio: 200,
    fecha: "2024-03-14",
    estado: "Cancelado",
  },
];

const STORAGE_KEY = "orders_data";

export default function ListOrders() {
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem(STORAGE_KEY);
      return savedOrders ? JSON.parse(savedOrders) : initialOrders;
    } catch (error) {
      console.error("Error al cargar las órdenes:", error);
      return initialOrders;
    }
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.id.toString().includes(searchLower) ||
      order.cliente.toLowerCase().includes(searchLower) ||
      order.email.toLowerCase().includes(searchLower) ||
      order.producto.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error("Error al guardar las órdenes en localStorage:", error);
    }
  }, [orders]);

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title={"Lista de Órdenes"} />

        <div className="mt-10 mr-2 ml-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por ID, cliente, email o producto..."
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
