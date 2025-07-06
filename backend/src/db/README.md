# Base de Datos - Backend

## Estructura de la Base de Datos

Este directorio contiene toda la configuración y estructura de la base de datos PostgreSQL para el backend de la aplicación.

## 📁 Estructura de Carpetas

```
src/db/
├── config/          # Configuración de conexión a la BD
├── migrations/      # Migraciones para crear/modificar tablas
├── models/          # Modelos de Sequelize ORM
└── seeders/         # Datos de prueba para poblar la BD
```

## 🗄️ Tablas de la Base de Datos

### 1. **Users** (Usuarios)
- `id` - Clave primaria (INTEGER, AUTO_INCREMENT)
- `name` - Nombre del usuario (STRING)
- `email` - Email único (STRING)
- `password` - Contraseña hasheada (STRING)
- `role` - Rol del usuario (STRING)
- `created_at` - Fecha de creación (DATE)
- `updated_at` - Fecha de actualización (DATE)

### 2. **Categories** (Categorías)
- `id` - Clave primaria (INTEGER, AUTO_INCREMENT)
- `name` - Nombre de la categoría (STRING)
- `description` - Descripción de la categoría (STRING)
- `created_at` - Fecha de creación (DATE)
- `updated_at` - Fecha de actualización (DATE)

### 3. **Products** (Productos)
- `id` - Clave primaria (INTEGER, AUTO_INCREMENT)
- `name` - Nombre del producto (STRING)
- `price` - Precio del producto (FLOAT)
- `category_id` - Clave foránea a Categories (INTEGER)
- `descripcion` - Descripción del producto (STRING)
- `imagen` - URL de la imagen (STRING)
- `stock` - Cantidad en stock (INTEGER)
- `created_at` - Fecha de creación (DATE)
- `updated_at` - Fecha de actualización (DATE)

### 4. **Orders** (Órdenes)
- `id` - Clave primaria (INTEGER, AUTO_INCREMENT)
- `user_id` - Clave foránea a Users (INTEGER)
- `productos` - Array de productos y cantidades (JSONB)
  ```json
  [
    { "product_id": 1, "cantidad": 2 },
    { "product_id": 2, "cantidad": 1 }
  ]
  ```
- `precio` - Precio total de la orden (FLOAT)
- `fecha` - Fecha de la orden (DATE)
- `status` - Estado de la orden (STRING)
- `created_at` - Fecha de creación (DATE)
- `updated_at` - Fecha de actualización (DATE)

### 5. **Payments** (Pagos)
- `id` - Clave primaria (INTEGER, AUTO_INCREMENT)
- `order_id` - Clave foránea a Orders (INTEGER)
- `amount` - Monto del pago (FLOAT)
- `method` - Método de pago (STRING)
- `status` - Estado del pago (STRING)
- `created_at` - Fecha de creación (DATE)
- `updated_at` - Fecha de actualización (DATE)

## 🔗 Relaciones entre Tablas

- **Users** → **Orders** (1:N) - Un usuario puede tener múltiples órdenes
- **Categories** → **Products** (1:N) - Una categoría puede tener múltiples productos
- **Orders** → **Payments** (1:1) - Una orden tiene un pago
- **Orders** → **Products** (N:M) - Relación muchos a muchos a través del campo `productos` (JSONB)

## 📝 Migraciones

### Archivos de Migración:
- `20250704150418-create-user.js` - Crea tabla Users
- `20250704150439-create-product.js` - Crea tabla Products
- `20250704150446-create-category.js` - Crea tabla Categories
- `20250704150454-create-order.js` - Crea tabla Orders
- `20250704150544-create-payment.js` - Crea tabla Payments
- `20250704152117-add-role-to-users.js` - Agrega campo role a Users

### Comandos de Migración:
```bash
# Aplicar todas las migraciones
npx sequelize-cli db:migrate

# Deshacer la última migración
npx sequelize-cli db:migrate:undo

# Deshacer una migración específica
npx sequelize-cli db:migrate:undo --name nombre-migracion.js

# Deshacer todas las migraciones
npx sequelize-cli db:migrate:undo:all
```

## 🌱 Seeders

### Archivos de Seeder:
- `20250704151159-user.js` - Datos de usuarios de prueba
- `20250704151347-categories.js` - Categorías de productos
- `20250704151355-orders.js` - Órdenes de ejemplo
- `20250704151400-products.js` - Productos de prueba
- `20250704151410-payments.js` - Pagos de ejemplo

### Comandos de Seeder:
```bash
# Ejecutar todos los seeders
npx sequelize-cli db:seed:all

# Ejecutar un seeder específico
npx sequelize-cli db:seed --seed src/db/seeders/nombre-seeder.js

# Deshacer todos los seeders
npx sequelize-cli db:seed:undo:all

# Deshacer un seeder específico
npx sequelize-cli db:seed:undo --seed src/db/seeders/nombre-seeder.js
```

## ⚙️ Configuración

### Archivo de Configuración:
- `config.js` - Configuración de conexión a la base de datos

### Variables de Entorno Requeridas:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nombre_base_datos
DB_USER=usuario
DB_PASSWORD=contraseña
```

## 🚀 Comandos Útiles

### Inicializar Base de Datos desde Cero:
```bash
# 1. Deshacer todas las migraciones
npx sequelize-cli db:migrate:undo:all

# 2. Aplicar todas las migraciones
npx sequelize-cli db:migrate

# 3. Ejecutar todos los seeders
npx sequelize-cli db:seed:all
```

### Recrear una Tabla Específica:
```bash
# 1. Deshacer migración específica
npx sequelize-cli db:migrate:undo --name nombre-migracion.js

# 2. Volver a aplicar la migración
npx sequelize-cli db:migrate --name nombre-migracion.js

# 3. Ejecutar seeder correspondiente
npx sequelize-cli db:seed --seed src/db/seeders/nombre-seeder.js
```

## 📊 Consultas Útiles en PostgreSQL

### Verificar Estructura de Tablas:
```sql
\d "Users"
\d "Products"
\d "Orders"
\d "Categories"
\d "Payments"
```

### Consultar Órdenes con Productos:
```sql
SELECT 
  o.id,
  o.user_id,
  o.productos,
  o.precio,
  o.status
FROM "Orders" o;
```

### Consultar Productos de una Orden Específica:
```sql
SELECT 
  o.id as order_id,
  o.productos,
  p.name as product_name,
  p.price as product_price
FROM "Orders" o
JOIN "Products" p ON p.id = ANY(
  ARRAY(
    SELECT jsonb_array_elements(o.productos)->>'product_id'::int
  )
)
WHERE o.id = 1;
```

## 🔧 Notas Importantes

1. **Campo JSONB en Orders**: El campo `productos` almacena un array de objetos con `product_id` y `cantidad`, permitiendo múltiples productos por orden.

2. **Convención de Nombres**: 
   - Tablas en plural y PascalCase: `Users`, `Products`, `Orders`
   - Campos en snake_case: `user_id`, `product_id`, `created_at`

3. **Claves Foráneas**: Todas las relaciones están configuradas con `onDelete: 'CASCADE'` para mantener integridad referencial.

4. **Timestamps**: Todas las tablas incluyen `created_at` y `updated_at` automáticos.

5. **Configuración Sequelize**: Se usa `underscored: true` para mapear camelCase (JS) a snake_case (BD). 