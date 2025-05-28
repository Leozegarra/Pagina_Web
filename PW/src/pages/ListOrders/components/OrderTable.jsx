import React from "react";
import OrderRow from "./OrderRow.jsx";

export default function OrderTable({ orders }) {
  return (
    <table className="w-full text-left mt-4">
      <thead>
        <tr className="border-b">
          <th className="p-2">#</th>
          <th className="p-2">ID</th>
          <th className="p-2">Cliente</th>
          <th className="p-2">Email</th>
          <th className="p-2">Producto</th>
          <th className="p-2">Cantidad</th>
          <th className="p-2">Precio</th>
          <th className="p-2">Fecha</th>
          <th className="p-2">Estado</th>

        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <OrderRow key={order.id} order={order} index={index + 1} />
        ))}
      </tbody>
    </table>
  );
}
