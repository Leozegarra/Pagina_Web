import React, { useEffect, useState } from 'react'
import SideBar from '../../components/SideBar/SideBar';
import DashboardHeader from '../../components/DashboardHeader/DashBoardHeader';
import OrderTable from './components/OrderTable';

const initialOrders = [
  {
    id: 1001,
    cliente: "Juan Pérez",
    email: "juanperez@example.com",
    producto: "Laptop HP Pavilion",
    cantidad: 1,
    precio: 3500,
    fecha: "2025-05-18",
    estado: "Pendiente"
  },
  {
    id: 1002,
    cliente: "María Gómez",
    email: "maria.gomez@example.com",
    producto: "Mouse Logitech",
    cantidad: 2,
    precio: 120,
    fecha: "2025-05-17",
    estado: "Entregado"
  },
  {
    id: 1003,
    cliente: "Carlos Ruiz",
    email: "carlosruiz@example.com",
    producto: "Monitor Samsung 24\"",
    cantidad: 1,
    precio: 750,
    fecha: "2025-05-19",
    estado: "Pendiente"
  },
  {
    id: 1004,
    cliente: "Ana Torres",
    email: "ana.torres@example.com",
    producto: "Teclado Mecánico",
    cantidad: 1,
    precio: 290,
    fecha: "2025-05-16",
    estado: "Entregado"
  }
];

const STORAGE_KEY = 'orders_data';

export default function ListOrders() {
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem(STORAGE_KEY);
      return savedOrders ? JSON.parse(savedOrders) : initialOrders;
    } catch (error) {
      console.error('Error al cargar las órdenes:', error);
      return initialOrders;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error('Error al guardar las órdenes en localStorage:', error);
    }
  }, [orders]);

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title={"Lista de Órdenes"}/>
        <div className="p-4">
          <OrderTable orders={orders} setOrders={setOrders}/>
        </div>
      </div>
    </div>
  );
}
