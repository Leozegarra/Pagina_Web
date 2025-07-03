import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import DashboardHeader from '../../components/DashboardHeader/DashBoardHeader';

const DetailOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    try {
      const orders = JSON.parse(localStorage.getItem('orders_data'));
      const currentOrder = orders.find(o => o.id === parseInt(id));
      
      if (!currentOrder) {
        navigate('/admin/listOrders');
        return;
      }
      setOrder(currentOrder);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  const handleCancelOrder = () => {
    try {
      const orders = JSON.parse(localStorage.getItem('orders_data'));
      const updatedOrders = orders.map(o => 
        o.id === parseInt(id) ? { ...o, estado: 'Cancelado' } : o
      );
      localStorage.setItem('orders_data', JSON.stringify(updatedOrders));
      setOrder({ ...order, estado: 'Cancelado' });
      setShowCancelModal(false);
    } catch (error) {
      console.error('Error al cancelar la orden:', error);
    }
  };

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
        <DashboardHeader title="Detalle de Orden" />
        
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow">
       
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Orden #{order.id}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Fecha: {order.fecha}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    order.estado === 'Entregado' 
                      ? 'bg-green-100 text-green-800'
                      : order.estado === 'Cancelado'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.estado}
                  </span>
                  {order.estado !== 'Cancelado' && order.estado !== 'Entregado' && (
                    <button
                      onClick={() => setShowCancelModal(true)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Cancelar Orden
                    </button>
                  )}
                </div>
              </div>
            </div>

          
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Información del Cliente
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-600">Nombre</span>
                      <span className="font-medium text-gray-800">{order.cliente}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-600">Email</span>
                      <span className="font-medium text-gray-800">{order.email}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Detalles del Producto
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-600">Producto</span>
                      <span className="font-medium text-gray-800">{order.producto}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-600">Cantidad</span>
                      <span className="font-medium text-gray-800">{order.cantidad}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-600">Precio Unitario</span>
                      <span className="font-medium text-gray-800">${order.precio}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-blue-600 font-medium">Total</span>
                      <span className="text-blue-600 font-bold text-lg">${order.precio * order.cantidad}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  ¿Estás seguro de cancelar esta orden?
                </h3>
                <p className="text-gray-600">
                  Esta acción no se puede deshacer. La orden será marcada como cancelada.
                </p>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Volver
                </button>
                <button
                  onClick={handleCancelOrder}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Confirmar Cancelación
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailOrder; 
