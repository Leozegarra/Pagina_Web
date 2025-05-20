import React from "react";

const OrderRow = ({ order, index }) => {
  const { id, cliente, email, producto, cantidad, precio, fecha, estado } = order;

  return (
    <tr className="border-t">
      <td className="px-4 py-2 text-center">{index}</td>
      <td className="px-4 py-2 text-center">{id}</td>
      <td className="px-4 py-2 text-center">{cliente}</td>
      <td className="px-4 py-2 text-center">{email}</td>
      <td className="px-4 py-2 text-center">{producto}</td>
      <td className="px-4 py-2 text-center">{cantidad}</td>
      <td className="px-4 py-2 text-center">S/. {precio}</td>
      <td className="px-4 py-2 text-center">{fecha}</td>
      <td className="px-4 py-2 text-center">
        <span className={`px-2 py-1 rounded text-white text-xs font-semibold ${
          estado === "Entregado" ? "bg-green-500" : "bg-yellow-500"
        }`}>
          {estado}
        </span>
      </td>
      
    </tr>
  );
};

export default OrderRow;