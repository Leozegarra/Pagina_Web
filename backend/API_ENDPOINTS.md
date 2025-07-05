# API Endpoints - Backend

## 📋 Información General

- **Base URL:** `http://localhost:3000/api`
- **Content-Type:** `application/json`
- **Autenticación:** No implementada (endpoints públicos)

---

## 👥 USUARIOS (Users)

### **GET - Obtener todos los usuarios**
- **Método:** `GET`
- **URL:** `http://localhost:3000/api/users`
- **Headers:** Ninguno requerido
- **Body:** No aplica
- **Respuesta esperada:**
```json
[
  {
    "id": 49,
    "name": "Usuario Ejemplo",
    "email": "usuario@ejemplo.com",
    "role": "user",
    "createdAt": "2025-07-04T15:00:00.000Z",
    "updatedAt": "2025-07-04T15:00:00.000Z"
  }
]
```

### **GET - Obtener usuario por ID**
- **Método:** `GET`
- **URL:** `http://localhost:3000/api/users/49`
- **Headers:** Ninguno requerido
- **Body:** No aplica
- **Respuesta esperada:**
```json
{
  "id": 49,
  "name": "Usuario Ejemplo",
  "email": "usuario@ejemplo.com",
  "role": "user",
  "createdAt": "2025-07-04T15:00:00.000Z",
  "updatedAt": "2025-07-04T15:00:00.000Z"
}
```

### **POST - Crear usuario**
- **Método:** `POST`
- **URL:** `http://localhost:3000/api/users`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "name": "Nuevo Usuario",
  "email": "nuevo@ejemplo.com",
  "password": "contraseña123",
  "role": "user"
}
```
- **Respuesta esperada:**
```json
{
  "id": 50,
  "name": "Nuevo Usuario",
  "email": "nuevo@ejemplo.com",
  "role": "user",
  "createdAt": "2025-07-04T15:00:00.000Z",
  "updatedAt": "2025-07-04T15:00:00.000Z"
}
```

### **PUT - Actualizar usuario**
- **Método:** `PUT`
- **URL:** `http://localhost:3000/api/users/49`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "name": "Usuario Actualizado",
  "role": "admin"
}
```
- **Respuesta esperada:**
```json
{
  "id": 49,
  "name": "Usuario Actualizado",
  "email": "usuario@ejemplo.com",
  "role": "admin",
  "updatedAt": "2025-07-04T15:00:00.000Z"
}
```

### **DELETE - Eliminar usuario**
- **Método:** `DELETE`
- **URL:** `http://localhost:3000/api/users/49`
- **Headers:** Ninguno requerido
- **Body:** No aplica
- **Respuesta esperada:**
```json
{
  "message": "Usuario eliminado correctamente"
}
```

---

## 📦 PRODUCTOS (Products)

### **GET - Obtener todos los productos**
- **Método:** `GET`
- **URL:** `http://localhost:3000/api/products`
- **Headers:** Ninguno requerido
- **Body:** No aplica
- **Respuesta esperada:**
```json
[
  {
    "id": 1,
    "name": "Producto Ejemplo",
    "price": 99.99,
    "categoryId": 1,
    "descripcion": "Descripción del producto",
    "imagen": "url-imagen.jpg",
    "stock": 10,
    "categoryName": "Electrónicos",
    "createdAt": "2025-07-04T15:00:00.000Z",
    "updatedAt": "2025-07-04T15:00:00.000Z"
  }
]
```

### **GET - Obtener producto por ID**
- **Método:** `GET`
- **URL:** `http://localhost:3000/api/products/1`
- **Headers:** Ninguno requerido
- **Body:** No aplica
- **Respuesta esperada:**
```json
{
  "id": 1,
  "name": "Producto Ejemplo",
  "price": 99.99,
  "categoryId": 1,
  "descripcion": "Descripción del producto",
  "imagen": "url-imagen.jpg",
  "stock": 10,
  "categoryName": "Electrónicos",
  "createdAt": "2025-07-04T15:00:00.000Z",
  "updatedAt": "2025-07-04T15:00:00.000Z"
}
```

### **POST - Crear producto**
- **Método:** `POST`
- **URL:** `http://localhost:3000/api/products`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "name": "Nuevo Producto",
  "price": 149.99,
  "categoryId": 1,
  "descripcion": "Descripción del nuevo producto",
  "imagen": "nueva-imagen.jpg",
  "stock": 15
}
```
- **Respuesta esperada:**
```json
{
  "id": 11,
  "name": "Nuevo Producto",
  "price": 149.99,
  "categoryId": 1,
  "descripcion": "Descripción del nuevo producto",
  "imagen": "nueva-imagen.jpg",
  "stock": 15,
  "createdAt": "2025-07-04T15:00:00.000Z",
  "updatedAt": "2025-07-04T15:00:00.000Z"
}
```

### **PUT - Actualizar producto**
- **Método:** `PUT`
- **URL:** `http://localhost:3000/api/products/1`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "name": "Producto Actualizado",
  "price": 129.99,
  "stock": 20
}
```
- **Respuesta esperada:**
```json
{
  "id": 1,
  "name": "Producto Actualizado",
  "price": 129.99,
  "categoryId": 1,
  "descripcion": "Descripción del producto",
  "imagen": "url-imagen.jpg",
  "stock": 20,
  "updatedAt": "2025-07-04T15:00:00.000Z"
}
```

### **DELETE - Eliminar producto**
- **Método:** `DELETE`
- **URL:** `http://localhost:3000/api/products/1`
- **Headers:** Ninguno requerido
- **Body:** No aplica
- **Respuesta esperada:**
```json
{
  "message": "Producto eliminado correctamente"
}
```

---

## 🛒 ÓRDENES (Orders)

### **GET - Obtener todas las órdenes**
- **Método:** `GET`
- **URL:** `http://localhost:3000/api/orders`
- **Headers:** Ninguno requerido
- **Body:** No aplica
- **Respuesta esperada:**
```json
[
  {
    "id": 1,
    "userId": 49,
    "productos": [
      { "product_id": 1, "cantidad": 2 },
      { "product_id": 2, "cantidad": 1 }
    ],
    "precio": 2800,
    "fecha": "2025-07-04T15:00:00.000Z",
    "status": "completado",
    "createdAt": "2025-07-04T15:00:00.000Z",
    "updatedAt": "2025-07-04T15:00:00.000Z"
  }
]
```

### **GET - Obtener orden por ID**
- **Método:** `GET`
- **URL:** `http://localhost:3000/api/orders/1`
- **Headers:** Ninguno requerido
- **Body:** No aplica
- **Respuesta esperada:**
```json
{
  "id": 1,
  "userId": 49,
  "productos": [
    { "product_id": 1, "cantidad": 2 },
    { "product_id": 2, "cantidad": 1 }
  ],
  "precio": 2800,
  "fecha": "2025-07-04T15:00:00.000Z",
  "status": "completado",
  "createdAt": "2025-07-04T15:00:00.000Z",
  "updatedAt": "2025-07-04T15:00:00.000Z"
}
```

### **GET - Obtener orden con detalles completos de productos**
- **Método:** `GET`
- **URL:** `http://localhost:3000/api/orders/1/details`
- **Headers:** Ninguno requerido
- **Body:** No aplica
- **Respuesta esperada:**
```json
{
  "id": 1,
  "userId": 49,
  "productos": [
    { "product_id": 1, "cantidad": 2 },
    { "product_id": 2, "cantidad": 1 }
  ],
  "precio": 2800,
  "fecha": "2025-07-04T15:00:00.000Z",
  "status": "completado",
  "createdAt": "2025-07-04T15:00:00.000Z",
  "updatedAt": "2025-07-04T15:00:00.000Z",
  "productos": [
    {
      "product": {
        "id": 1,
        "name": "Producto 1",
        "price": 99.99,
        "descripcion": "Descripción del producto 1",
        "imagen": "imagen1.jpg",
        "stock": 10
      },
      "cantidad": 2
    },
    {
      "product": {
        "id": 2,
        "name": "Producto 2",
        "price": 149.99,
        "descripcion": "Descripción del producto 2",
        "imagen": "imagen2.jpg",
        "stock": 5
      },
      "cantidad": 1
    }
  ]
}
```

### **POST - Crear orden**
- **Método:** `POST`
- **URL:** `http://localhost:3000/api/orders`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "userId": 49,
  "productos": [
    { "product_id": 1, "cantidad": 2 },
    { "product_id": 3, "cantidad": 1 }
  ],
  "precio": 3500,
  "status": "pendiente"
}
```
- **Respuesta esperada:**
```json
{
  "id": 7,
  "userId": 49,
  "productos": [
    { "product_id": 1, "cantidad": 2 },
    { "product_id": 3, "cantidad": 1 }
  ],
  "precio": 3500,
  "fecha": "2025-07-04T15:00:00.000Z",
  "status": "pendiente",
  "createdAt": "2025-07-04T15:00:00.000Z",
  "updatedAt": "2025-07-04T15:00:00.000Z"
}
```

### **PUT - Actualizar orden**
- **Método:** `PUT`
- **URL:** `http://localhost:3000/api/orders/1`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "status": "enviado",
  "precio": 3000
}
```
- **Respuesta esperada:**
```json
{
  "id": 1,
  "userId": 49,
  "productos": [
    { "product_id": 1, "cantidad": 2 },
    { "product_id": 2, "cantidad": 1 }
  ],
  "precio": 3000,
  "fecha": "2025-07-04T15:00:00.000Z",
  "status": "enviado",
  "updatedAt": "2025-07-04T15:00:00.000Z"
}
```

### **DELETE - Eliminar orden**
- **Método:** `DELETE`
- **URL:** `http://localhost:3000/api/orders/1`
- **Headers:** Ninguno requerido
- **Body:** No aplica
- **Respuesta esperada:**
```json
{
  "message": "Orden eliminada correctamente"
}
```

---

## 🏷️ CATEGORÍAS (Categories)

### **GET - Obtener todas las categorías**
- **Método:** `GET`
- **URL:** `http://localhost:3000/api/categories`
- **Headers:** Ninguno requerido
- **Body:** No aplica
- **Respuesta esperada:**
```json
[
  {
    "id": 1,
    "name": "Electrónicos",
    "description": "Productos electrónicos",
    "createdAt": "2025-07-04T15:00:00.000Z",
    "updatedAt": "2025-07-04T15:00:00.000Z"
  }
]
```

### **GET - Obtener categoría por ID**
- **Método:** `GET`
- **URL:** `http://localhost:3000/api/categories/1`
- **Headers:** Ninguno requerido
- **Body:** No aplica
- **Respuesta esperada:**
```json
{
  "id": 1,
  "name": "Electrónicos",
  "description": "Productos electrónicos",
  "createdAt": "2025-07-04T15:00:00.000Z",
  "updatedAt": "2025-07-04T15:00:00.000Z"
}
```

### **POST - Crear categoría**
- **Método:** `POST`
- **URL:** `http://localhost:3000/api/categories`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "name": "Nueva Categoría",
  "description": "Descripción de la nueva categoría"
}
```
- **Respuesta esperada:**
```json
{
  "id": 5,
  "name": "Nueva Categoría",
  "description": "Descripción de la nueva categoría",
  "createdAt": "2025-07-04T15:00:00.000Z",
  "updatedAt": "2025-07-04T15:00:00.000Z"
}
```

### **PUT - Actualizar categoría**
- **Método:** `PUT`
- **URL:** `http://localhost:3000/api/categories/1`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "name": "Categoría Actualizada",
  "description": "Nueva descripción"
}
```
- **Respuesta esperada:**
```json
{
  "id": 1,
  "name": "Categoría Actualizada",
  "description": "Nueva descripción",
  "updatedAt": "2025-07-04T15:00:00.000Z"
}
```

### **DELETE - Eliminar categoría**
- **Método:** `DELETE`
- **URL:** `http://localhost:3000/api/categories/1`
- **Headers:** Ninguno requerido
- **Body:** No aplica
- **Respuesta esperada:**
```json
{
  "message": "Categoría eliminada correctamente"
}
```

---

## 💳 PAGOS (Payments)

### **GET - Obtener todos los pagos**
- **Método:** `GET`
- **URL:** `http://localhost:3000/api/payments`
- **Headers:** Ninguno requerido
- **Body:** No aplica
- **Respuesta esperada:**
```json
[
  {
    "id": 1,
    "orderId": 1,
    "amount": 2800,
    "method": "tarjeta",
    "status": "pagado",
    "createdAt": "2025-07-04T15:00:00.000Z",
    "updatedAt": "2025-07-04T15:00:00.000Z"
  }
]
```

### **GET - Obtener pago por ID**
- **Método:** `GET`
- **URL:** `http://localhost:3000/api/payments/1`
- **Headers:** Ninguno requerido
- **Body:** No aplica
- **Respuesta esperada:**
```json
{
  "id": 1,
  "orderId": 1,
  "amount": 2800,
  "method": "tarjeta",
  "status": "pagado",
  "createdAt": "2025-07-04T15:00:00.000Z",
  "updatedAt": "2025-07-04T15:00:00.000Z"
}
```

### **POST - Crear pago**
- **Método:** `POST`
- **URL:** `http://localhost:3000/api/payments`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "orderId": 1,
  "amount": 2800,
  "method": "tarjeta",
  "status": "pendiente"
}
```
- **Respuesta esperada:**
```json
{
  "id": 2,
  "orderId": 1,
  "amount": 2800,
  "method": "tarjeta",
  "status": "pendiente",
  "createdAt": "2025-07-04T15:00:00.000Z",
  "updatedAt": "2025-07-04T15:00:00.000Z"
}
```

### **PUT - Actualizar pago**
- **Método:** `PUT`
- **URL:** `http://localhost:3000/api/payments/1`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "status": "completado"
}
```
- **Respuesta esperada:**
```json
{
  "id": 1,
  "orderId": 1,
  "amount": 2800,
  "method": "tarjeta",
  "status": "completado",
  "updatedAt": "2025-07-04T15:00:00.000Z"
}
```

### **DELETE - Eliminar pago**
- **Método:** `DELETE`
- **URL:** `http://localhost:3000/api/payments/1`
- **Headers:** Ninguno requerido
- **Body:** No aplica
- **Respuesta esperada:**
```json
{
  "message": "Pago eliminado correctamente"
}
```

---

## 🚨 Códigos de Error

### **400 - Bad Request**
```json
{
  "error": "Error en la validación",
  "details": "Campo requerido faltante"
}
```

### **404 - Not Found**
```json
{
  "error": "Recurso no encontrado",
  "details": "El ID especificado no existe"
}
```

### **500 - Internal Server Error**
```json
{
  "error": "Error interno del servidor",
  "details": "Descripción del error"
}
```

---

## 🛠️ Herramientas de Prueba

### **Postman Collection**
Puedes importar estos endpoints en Postman creando una colección con los ejemplos proporcionados.

### **cURL Ejemplos**
```bash
# Obtener todas las órdenes
curl -X GET http://localhost:3000/api/orders

# Crear una nueva orden
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 49,
    "productos": [
      { "product_id": 1, "cantidad": 2 }
    ],
    "precio": 2000,
    "status": "pendiente"
  }'
```

---

## 📝 Notas Importantes

1. **Campo productos en Orders**: Es un array de objetos con `product_id` y `cantidad`
2. **IDs de Usuario válidos**: 49, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48
3. **IDs de Producto válidos**: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
4. **Estados de orden**: "pendiente", "enviado", "completado"
5. **Métodos de pago**: "tarjeta", "efectivo", "transferencia"
6. **Estados de pago**: "pendiente", "pagado", "reembolsado" 