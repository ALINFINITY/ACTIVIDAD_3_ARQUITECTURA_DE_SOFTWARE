# Microservicio de Publicaciones

API REST para la gestión de publicaciones académicas y científicas.

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

---

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

## Ejecución

Para ejecutar el microservicio:

```bash
python main.py
```

O usando uvicorn directamente:

```bash
uvicorn main:app --host <SERVER_HOST> --port <SERVER_PORT>
```

## Configuración

La configuración del servidor se encuentra en [app_conf.py](app_conf.py), donde se definen:
- `SERVER_HOST`: Host del servidor
- `SERVER_PORT`: Puerto del servidor

## Documentación Interactiva

Una vez iniciado el servicio, la documentación interactiva está disponible en:
- Swagger UI: `http://<host>:<port>/docs`
- ReDoc: `http://<host>:<port>/redoc`
