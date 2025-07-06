# 🚀 Configuración para PostgreSQL en Oracle Cloud Infrastructure (OCI)

## 📋 Requisitos Previos

- Instancia de PostgreSQL ejecutándose en OCI
- Credenciales de acceso a la base de datos
- IP pública de la instancia OCI
- Puerto 5432 abierto en el firewall

---

## ⚙️ Configuración Paso a Paso

### 1. **Crear archivo `.env`**

Copia el archivo `env.example` y renómbralo a `.env`:

```bash
cp env.example .env
```

### 2. **Configurar variables de entorno**

Edita el archivo `.env` con tus datos de OCI:

```env
# Configuración de Base de Datos PostgreSQL en OCI
DB_HOST=your-oci-instance-ip.oraclecloud.com
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password

# Configuración del Servidor
PORT=3000
NODE_ENV=development

# Configuraciones adicionales para OCI
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

### 3. **Obtener información de tu instancia OCI**

#### **IP Pública:**
- Ve a la consola de OCI
- Navega a **Compute** → **Instances**
- Selecciona tu instancia
- Copia la **IP pública**

#### **Credenciales de PostgreSQL:**
- Usuario: `postgres` (por defecto)
- Contraseña: La que configuraste al crear la instancia
- Base de datos: `postgres` (por defecto) o la que hayas creado

---

## 🔧 Configuraciones Específicas de OCI

### **Configuración de Firewall (Security Lists)**

En la consola de OCI, asegúrate de que el puerto 5432 esté abierto:

1. Ve a **Networking** → **Virtual Cloud Networks**
2. Selecciona tu VCN
3. Ve a **Security Lists**
4. Agrega una regla de entrada:
   - **Source:** `0.0.0.0/0` (o tu IP específica)
   - **Port:** `5432`
   - **Protocol:** `TCP`

### **Configuración de PostgreSQL**

En tu instancia OCI, edita el archivo `postgresql.conf`:

```bash
# Conectarse a tu instancia OCI
ssh ubuntu@your-oci-ip

# Editar configuración
sudo nano /etc/postgresql/14/main/postgresql.conf
```

Agregar/modificar estas líneas:

```conf
listen_addresses = '*'
port = 5432
```

Editar `pg_hba.conf`:

```bash
sudo nano /etc/postgresql/14/main/pg_hba.conf
```

Agregar esta línea para permitir conexiones externas:

```conf
host    all             all             0.0.0.0/0               md5
```

Reiniciar PostgreSQL:

```bash
sudo systemctl restart postgresql
```

---

## 🧪 Probar la Conexión

### **1. Probar con el script incluido:**

```bash
npm run test-connection
```

### **2. Probar manualmente con psql:**

```bash
psql -h your-oci-ip -p 5432 -U your_username -d your_database
```

---

## 🚀 Ejecutar el Backend

### **1. Instalar dependencias:**

```bash
npm install
```

### **2. Ejecutar migraciones:**

```bash
npm run migrate
```

### **3. Poblar con datos de prueba:**

```bash
npm run seed
```

### **4. Iniciar el servidor:**

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

---

## 🔍 Solución de Problemas

### **Error: "Connection refused"**

**Causa:** Firewall bloqueando conexiones
**Solución:**
1. Verificar Security Lists en OCI
2. Asegurar que PostgreSQL esté escuchando en todas las interfaces
3. Verificar que el puerto 5432 esté abierto

### **Error: "Authentication failed"**

**Causa:** Credenciales incorrectas
**Solución:**
1. Verificar usuario y contraseña
2. Confirmar que el usuario tenga permisos en la base de datos

### **Error: "SSL connection required"**

**Causa:** OCI requiere conexiones SSL
**Solución:**
1. Habilitar SSL en el archivo `.env`:
   ```env
   DB_SSL=true
   DB_SSL_REJECT_UNAUTHORIZED=false
   ```

### **Error: "Connection timeout"**

**Causa:** Latencia de red o configuración de timeouts
**Solución:**
1. Los timeouts ya están configurados en `config.js`
2. Verificar conectividad de red
3. Considerar usar una región OCI más cercana

---

## 📊 Monitoreo y Logs

### **Ver logs de PostgreSQL:**

```bash
# En tu instancia OCI
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

### **Ver logs del backend:**

```bash
# En tu máquina local
npm run dev
```

---

## 🔒 Seguridad

### **Recomendaciones:**

1. **Usar IPs específicas** en lugar de `0.0.0.0/0`
2. **Habilitar SSL** para conexiones encriptadas
3. **Usar contraseñas fuertes**
4. **Mantener PostgreSQL actualizado**
5. **Hacer backups regulares**

### **Variables de entorno sensibles:**

Nunca subas el archivo `.env` a Git. Asegúrate de que esté en `.gitignore`:

```gitignore
.env
*.env
```

---

## 📞 Comandos Útiles

```bash
# Probar conexión
npm run test-connection

# Ejecutar migraciones
npm run migrate

# Deshacer última migración
npm run migrate:undo

# Deshacer todas las migraciones
npm run migrate:undo:all

# Poblar con datos de prueba
npm run seed

# Resetear base de datos completa
npm run db:reset

# Iniciar en modo desarrollo
npm run dev
```

---

## ✅ Checklist de Configuración

- [ ] Archivo `.env` creado y configurado
- [ ] IP pública de OCI obtenida
- [ ] Credenciales de PostgreSQL configuradas
- [ ] Firewall configurado (puerto 5432)
- [ ] PostgreSQL configurado para conexiones externas
- [ ] Conexión probada exitosamente
- [ ] Migraciones ejecutadas
- [ ] Datos de prueba cargados
- [ ] Servidor iniciado correctamente

¡Tu backend ya está listo para usar con PostgreSQL en OCI! 🎉 