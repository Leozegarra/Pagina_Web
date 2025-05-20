import React from 'react'
import SideBar from '../../components/SideBar/SideBar';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import OrderTable from './components/OrderTable';

const orders = [
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

export default function ListOrders() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title={"Lista de Órdenes"}/>
        <div className="p-4">
          <OrderTable orders={orders}/>
        </div>
      </div>
    </div>
  );
}
