
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