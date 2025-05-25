import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import DashboardHeader from "../../components/DashboardHeader/DashBoardHeader";
import OrderTable from "./components/OrderTable";
import { localStorageService, STORAGE_KEYS } from "../../services/localStorage";

export default function ListOrders() {
  const [orders, setOrders] = useState(() => {
    return localStorageService.getData(STORAGE_KEYS.ORDERS);
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
    localStorageService.saveData(STORAGE_KEYS.ORDERS, orders);
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
