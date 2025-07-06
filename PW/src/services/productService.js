const API_BASE_URL = 'http://localhost:3000/api';

export const productService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Error al obtener productos');
    return await response.json();
  },
  // Puedes agregar más métodos si necesitas (getById, create, etc)
}; 