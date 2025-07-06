import React from "react";
import { useNavigate } from "react-router-dom";

const OrderRow = ({ order, index }) => {
  const navigate = useNavigate();
  const { id, cliente, email, producto, precio, fecha, status } = order;

  const handleRowClick = () => {
    navigate(`/admin/orders/${id}`);
  };


  const totalCantidad = order.productos ? 
    order.productos.reduce((total, item) => total + item.cantidad, 0) : 0;

  return (
    <tr 
      className="border-t hover:bg-gray-50 cursor-pointer transition-colors duration-150"
      onClick={handleRowClick}
    >
      <td className="px-4 py-2 text-center">{index}</td>
      <td className="px-4 py-2 text-center">{id}</td>
      <td className="px-4 py-2 text-center">{cliente}</td>
      <td className="px-4 py-2 text-center">{email}</td>
      <td className="px-4 py-2 text-center">{producto}</td>
      <td className="px-4 py-2 text-center">{totalCantidad}</td>
      <td className="px-4 py-2 text-center">S/. {precio}</td>
      <td className="px-4 py-2 text-center">{fecha}</td>
      <td className="px-4 py-2 text-center">
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
          status === "completado" 
            ? "bg-green-100 text-green-800" 
            : status === "cancelado"
            ? "bg-red-100 text-red-800"
            : "bg-yellow-100 text-yellow-800"
        }`}>
          {status}
        </span>
      </td>
    </tr>
  );
};

export default OrderRow;