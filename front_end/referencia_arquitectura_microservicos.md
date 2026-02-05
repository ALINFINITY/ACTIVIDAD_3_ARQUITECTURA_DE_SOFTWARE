## Publicaciones

## Endpoints

### 1. Health Check
**GET** `/health`

Verifica el estado del servicio.

**Respuesta:**
```json
{
  "status": "ok",
  "service": "publicaciones"
}
```

---

### 2. Crear Publicación
**POST** `/api/publicaciones/`

Crea una nueva publicación.

**Body:**
```json
{
  "titulo": "string",
  "descripcion": "string",
  "tipoPublicacion": "string",
  "medioPublicacion": "string",
  "codigoIdentificacion": "string",
  "autor_id": "string",
  "estado_editorial": "string"
}
```

**Respuesta (201 Created):**
```json
{
  "id": "uuid",
  "titulo": "string",
  "descripcion": "string",
  "tipoPublicacion": "string",
  "medioPublicacion": "string",
  "codigoIdentificacion": "string",
  "autor_id": "string",
  "estado_editorial": "string",
  "fecha_creacion": "datetime",
  "autor_data": {
    // Información del autor (opcional)
  }
}
```

---

### 3. Obtener Publicación por ID
**GET** `/api/publicaciones/{id}`

Obtiene una publicación específica por su ID.

**Parámetros de ruta:**
- `id` (UUID): ID de la publicación

**Respuesta (200 OK):**
```json
{
  "id": "uuid",
  "titulo": "string",
  "descripcion": "string",
  "tipoPublicacion": "string",
  "medioPublicacion": "string",
  "codigoIdentificacion": "string",
  "autor_id": "string",
  "estado_editorial": "string",
  "fecha_creacion": "datetime",
  "autor_data": {
    // Información del autor (opcional)
  }
}
```

---

### 4. Listar Todas las Publicaciones
**GET** `/api/publicaciones/`

Obtiene la lista de todas las publicaciones.

**Respuesta (200 OK):**
```json
[
  {
    "id": "uuid",
    "titulo": "string",
    "descripcion": "string",
    "tipoPublicacion": "string",
    "medioPublicacion": "string",
    "codigoIdentificacion": "string",
    "autor_id": "string",
    "estado_editorial": "string",
    "fecha_creacion": "datetime",
    "autor_data": {
      // Información del autor (opcional)
    }
  }
]
```

---

### 5. Actualizar Estado Editorial
**PATCH** `/api/publicaciones/{id}/status`

Actualiza el estado editorial de una publicación.

**Parámetros de ruta:**
- `id` (UUID): ID de la publicación

**Body:**
```json
{
  "estado_editorial": "string"
}
```

**Respuesta (200 OK):**
```json
{
  "id": "uuid",
  "titulo": "string",
  "descripcion": "string",
  "tipoPublicacion": "string",
  "medioPublicacion": "string",
  "codigoIdentificacion": "string",
  "autor_id": "string",
  "estado_editorial": "string",
  "fecha_creacion": "datetime",
  "autor_data": {
    // Información del autor (opcional)
  }
}
```

### 6. Obtener Estados Válidos
**GET** `/api/publicaciones/estados_validos/all`

Obtiene la lista de estados editoriales válidos.

**Respuesta (200 OK):**
```json
[
  "string",
  "string",
  "string"
]
```

---


## Autores

## Endpoints

### 1. Crear Autor
**POST** `/api/autores/`

Crea un nuevo autor.

**Body:**
```json
{
  "edad": "integer (18-100)",
  "nombre": "string (max 30)",
  "apellido": "string (max 30)",
  "email": "string (email válido, max 30)",
  "telefono": "string (max 10)",
  "alias": "string (max 30)",
  "especialidad": "string (max 50)",
  "libros_publicados": "integer (min 0)"
}
```

**Respuesta (200 OK):**
```json
{
  "id": "uuid",
  "edad": 25,
  "nombre": "string",
  "apellido": "string",
  "email": "string",
  "telefono": "string",
  "alias": "string",
  "especialidad": "string",
  "libros_publicados": 0
}
```

---

### 2. Obtener Autor por ID
**GET** `/api/autores/{id}`

Obtiene un autor específico por su ID.

**Parámetros de ruta:**
- `id` (UUID): ID del autor

**Respuesta (200 OK):**
```json
{
  "id": "uuid",
  "edad": 25,
  "nombre": "string",
  "apellido": "string",
  "email": "string",
  "telefono": "string",
  "alias": "string",
  "especialidad": "string",
  "libros_publicados": 0
}
```

---

### 3. Listar Todos los Autores
**GET** `/api/autores/`

Obtiene la lista de todos los autores.

**Respuesta (200 OK):**
```json
[
  {
    "id": "uuid",
    "edad": 25,
    "nombre": "string",
    "apellido": "string",
    "email": "string",
    "telefono": "string",
    "alias": "string",
    "especialidad": "string",
    "libros_publicados": 0
  }
]
```

---

## API GATEWAY

El API Gateway es un punto de entrada unificado para acceder a todos los microservicios. Actúa como intermediario que enruta las peticiones a los servicios correspondientes.

### Configuración

- **Puerto:** 8094
- **Host:** 0.0.0.0
- **Framework:** FastAPI
- **CORS:** Habilitado para todas las origenes

### Servicios Registrados

| Servicio | URL Base | Puerto |
|----------|----------|--------|
| Autores | http://localhost:8090 | 8090 |
| Publicaciones | http://localhost:8091 | 8091 |

---

## Endpoints

### 1. Health Check
**GET** `/health`

Verifica el estado del API Gateway.

**Respuesta (200 OK):**
```json
{
  "status": "ok",
  "gateway": "running"
}
```

---

### 2. Enrutamiento Dinámico
**[GET, POST, PUT, DELETE, PATCH]** `/{service}/{path:path}`

Enruta las peticiones al microservicio correspondiente.

**Parámetros de ruta:**
- `service`: Nombre del servicio (autores | publicaciones)
- `path`: Ruta completa del endpoint en el microservicio

**Ejemplos de uso:**

#### Autores
```bash
# Crear autor
POST http://localhost:8094/autores/api/autores/

# Obtener autor por ID
GET http://localhost:8094/autores/api/autores/{id}

# Listar todos los autores
GET http://localhost:8094/autores/api/autores/
```

#### Publicaciones
```bash
# Crear publicación
POST http://localhost:8094/publicaciones/api/publicaciones/

# Obtener publicación por ID
GET http://localhost:8094/publicaciones/api/publicaciones/{id}

# Listar todas las publicaciones
GET http://localhost:8094/publicaciones/api/publicaciones/

# Actualizar estado editorial
PATCH http://localhost:8094/publicaciones/api/publicaciones/{id}/status
```

**Notas:**
- El gateway reenvía automáticamente headers, body y query parameters
- Soporta todos los métodos HTTP (GET, POST, PUT, DELETE, PATCH)
- Las respuestas son devueltas en formato JSON
- Si el servicio no existe, retorna error 404
- Si hay un error de conexión, retorna error 500

---

## Flujo de Petición

1. Cliente envía petición al gateway → `http://localhost:8094/{service}/{path}`
2. Gateway valida que el servicio existe
3. Gateway construye la URL del microservicio → `http://localhost:{puerto}/{path}`
4. Gateway reenvía la petición con headers, body y parámetros
5. Gateway recibe la respuesta del microservicio
6. Gateway retorna la respuesta al cliente

---