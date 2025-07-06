import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import DashboardHeader from '../../components/DashboardHeader/DashBoardHeader';

const DetailOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
    
        const orderResponse = await fetch(`http://localhost:3000/api/orders/${id}`);
        if (!orderResponse.ok) {
          throw new Error('Orden no encontrada');
        }
        const orderData = await orderResponse.json();
        setOrder(orderData);

        // Obtener información del usuario
        const userResponse = await fetch(`http://localhost:3000/api/users/${orderData.userId}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        }


        const productsResponse = await fetch('http://localhost:3000/api/products');
        if (productsResponse.ok) {
          const allProducts = await productsResponse.json();
          const orderProducts = orderData.productos.map(item => {
            const product = allProducts.find(p => p.id === item.product_id);
            return {
              ...item,
              product: product || { name: 'Producto no encontrado', price: 0 }
            };
          });
          setProducts(orderProducts);
        }
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        navigate('/admin/listOrders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [id, navigate]);

  const handleCancelOrder = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelado' }),
      });

      if (!response.ok) {
        throw new Error('Error al cancelar la orden');
      }

      const updatedOrder = await response.json();
      setOrder(updatedOrder);
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

  if (!order) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SideBar />
        <div className="flex-1 p-6">
          <DashboardHeader title="Detalle de Orden" />
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">Orden no encontrada</p>
          </div>
        </div>
      </div>
    );
  }

  const totalAmount = products.reduce((total, item) => {
    return total + (item.product.price * item.cantidad);
  }, 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 p-6">
        <DashboardHeader title="Detalle de Orden" />
        
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow">
       
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Orden #{order.id}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Fecha: {new Date(order.fecha || order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    order.status === 'completado' 
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'cancelado'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                  {order.status !== 'cancelado' && order.status !== 'completado' && (
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
                      <span className="font-medium text-gray-800">{user ? user.name : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-600">Email</span>
                      <span className="font-medium text-gray-800">{user ? user.email : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-600">ID Usuario</span>
                      <span className="font-medium text-gray-800">{order.userId}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Resumen de la Orden
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-600">Total Productos</span>
                      <span className="font-medium text-gray-800">{products.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-600">Cantidad Total</span>
                      <span className="font-medium text-gray-800">
                        {products.reduce((total, item) => total + item.cantidad, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-blue-600 font-medium">Total</span>
                      <span className="text-blue-600 font-bold text-lg">S/. {totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Products List */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Productos de la Orden
                </h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    {products.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{item.product.name}</h4>
                          <p className="text-sm text-gray-600">ID: {item.product_id}</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <span className="text-sm text-gray-600">Cantidad</span>
                            <p className="font-medium text-gray-800">{item.cantidad}</p>
                          </div>
                          <div className="text-center">
                            <span className="text-sm text-gray-600">Precio Unit.</span>
                            <p className="font-medium text-gray-800">S/. {item.product.price}</p>
                          </div>
                          <div className="text-center">
                            <span className="text-sm text-gray-600">Subtotal</span>
                            <p className="font-bold text-gray-800">S/. {item.product.price * item.cantidad}</p>
                          </div>
                        </div>
                      </div>
                    ))}
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
