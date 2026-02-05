# Sistema de Gestión de Publicaciones - Frontend

Aplicación web moderna desarrollada con React y TypeScript para la gestión integral de autores y publicaciones académicas, conectada a una arquitectura de microservicios a través de un API Gateway.

## 📋 Tabla de Contenidos

- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura del Frontend](#arquitectura-del-frontend)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Servicios](#servicios)
- [Componentes](#componentes)
- [Tipos TypeScript](#tipos-typescript)
- [Páginas](#páginas)
- [Configuración y Ejecución](#configuración-y-ejecución)

---

## 🚀 Stack Tecnológico

### Core
- **React 19.2.0** - Biblioteca para construcción de interfaces de usuario
- **TypeScript 5.9.3** - Superset tipado de JavaScript
- **Vite 7.2.4** - Build tool y servidor de desarrollo
- **React Router DOM 7.13.0** - Enrutamiento declarativo

### UI Framework
- **PrimeReact 10.9.7** - Biblioteca de componentes UI empresariales
- **PrimeIcons 7.0.0** - Iconos vectoriales
- **Tema:** lara-dark-purple (tema oscuro con acentos violeta)

### HTTP Client
- **Axios 1.13.4** - Cliente HTTP para comunicación con API

### Linting & Code Quality
- **ESLint 9.39.1** - Linter para JavaScript/TypeScript
- **TypeScript ESLint 8.46.4** - Plugin ESLint para TypeScript

---

## 🏗️ Arquitectura del Frontend

### Patrón de Diseño
El proyecto sigue una arquitectura **Component-Based** con separación clara de responsabilidades:

```
┌─────────────────────────────────────────┐
│           React Application             │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────┐  ┌──────────┐  ┌───────┐ │
│  │  Pages   │  │Components│  │Routes │ │
│  └────┬─────┘  └──────────┘  └───────┘ │
│       │                                 │
│  ┌────▼──────────────────────────────┐  │
│  │         Services Layer           │  │
│  │  (Axios + API Communication)     │  │
│  └────┬──────────────────────────────┘  │
│       │                                 │
│  ┌────▼──────────────────────────────┐  │
│  │       Types/Interfaces           │  │
│  │    (TypeScript Definitions)      │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
                  │
                  ▼
         ┌────────────────┐
         │  API Gateway   │
         │ localhost:8094 │
         └────────────────┘
                  │
        ┌─────────┴──────────┐
        ▼                    ▼
  ┌──────────┐        ┌──────────────┐
  │ Autores  │        │Publicaciones │
  │   :8090  │        │    :8091     │
  └──────────┘        └──────────────┘
```

### Principios Aplicados
- **Separation of Concerns**: Servicios, componentes y lógica de negocio separados
- **Single Responsibility**: Cada componente/servicio tiene una responsabilidad única
- **DRY (Don't Repeat Yourself)**: Reutilización de componentes y lógica
- **Type Safety**: TypeScript para prevención de errores en tiempo de desarrollo

---

## 📁 Estructura del Proyecto

```
front_end/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   └── MenuBar.tsx      # Barra de navegación principal
│   │
│   ├── pages/               # Páginas/Vistas de la aplicación
│   │   ├── HomePage.tsx     # Página de inicio
│   │   ├── AutoresPage.tsx  # Gestión de autores
│   │   ├── PublicacionesPage.tsx  # Gestión de publicaciones
│   │   └── NotFoundPage.tsx # Página 404
│   │
│   ├── routes/              # Configuración de rutas
│   │   └── MainRoutes.tsx   # Rutas principales de la app
│   │
│   ├── services/            # Servicios de API
│   │   ├── api.ts           # Cliente Axios configurado
│   │   ├── autoresService.ts      # Servicio de autores
│   │   └── publicacionesService.ts # Servicio de publicaciones
│   │
│   ├── types/               # Definiciones TypeScript
│   │   └── index.ts         # Interfaces y tipos
│   │
│   ├── styles/              # Estilos CSS
│   │   ├── index.css        # Estilos globales y tema
│   │   └── App.css          # Estilos de componentes
│   │
│   ├── App.tsx              # Componente raíz
│   └── main.tsx             # Punto de entrada
│
├── .env                     # Variables de entorno
├── .env.example             # Plantilla de variables de entorno
├── vite.config.ts           # Configuración de Vite
├── tsconfig.json            # Configuración de TypeScript
└── package.json             # Dependencias del proyecto
```

---

## 🔌 Servicios

### api.ts
Cliente HTTP configurado con Axios.

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8094";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
```

### autoresService.ts
Servicio para operaciones CRUD de autores.

**Métodos:**
- `getAll()` - Obtiene todos los autores
- `getById(id)` - Obtiene un autor por ID
- `create(autor)` - Crea un nuevo autor

**Endpoints:**
- `GET /autores/api/autores/`
- `GET /autores/api/autores/{id}`
- `POST /autores/api/autores/`

### publicacionesService.ts
Servicio para operaciones CRUD de publicaciones y gestión de estados.

**Métodos:**
- `getAll()` - Obtiene todas las publicaciones
- `getById(id)` - Obtiene una publicación por ID
- `create(publicacion)` - Crea una nueva publicación
- `updateStatus(id, estado)` - Actualiza el estado editorial
- `getEstadosValidos()` - Obtiene estados editoriales válidos

**Endpoints:**
- `GET /publicaciones/api/publicaciones/`
- `GET /publicaciones/api/publicaciones/{id}`
- `POST /publicaciones/api/publicaciones/`
- `PATCH /publicaciones/api/publicaciones/{id}/status`
- `GET /publicaciones/api/publicaciones/estados_validos/all`

---

## 🧩 Componentes

### MenuBar
**Ubicación:** `src/components/MenuBar.tsx`

Barra de navegación principal con PrimeReact Menubar.

**Características:**
- Navegación a Home, Autores y Publicaciones
- Logo y título de la aplicación
- Tema futurista con gradiente violeta
- Integración con React Router

**Props:** Ninguna

---

## 📘 Tipos TypeScript

### Autor
```typescript
interface Autor {
  id?: string;
  edad: number;              // 18-100
  nombre: string;            // max 30 caracteres
  apellido: string;          // max 30 caracteres
  email: string;             // email válido, max 30
  telefono: string;          // 10 dígitos
  alias: string;             // max 30 caracteres
  especialidad: string;      // max 50 caracteres
  libros_publicados: number; // min 0
}
```

### Publicacion
```typescript
interface Publicacion {
  id?: string;
  titulo: string;
  descripcion: string;
  tipoPublicacion: string;
  medioPublicacion: string;
  codigoIdentificacion: string;
  autor_id: string;
  estado_editorial: string;
  fecha_creacion?: string;
  autor_data?: Autor;        // Datos del autor (opcional)
}
```

### EstadoEditorial
```typescript
interface EstadoEditorial {
  label: string;  // Nombre mostrado al usuario
  value: string;  // Valor enviado al backend
}
```

**Estados disponibles:**
- `en_revision` - En Revisión
- `aprobado` - Aprobado
- `rechazado` - Rechazado
- `publicado` - Publicado
- `archivado` - Archivado

---

## 📄 Páginas

### HomePage
**Ruta:** `/`

Página de bienvenida con información general del sistema.

**Características:**
- Cards con navegación rápida a Autores y Publicaciones
- Sección de características del sistema
- Diseño moderno con iconos de PrimeReact
- Tema futurista oscuro con violeta

---

### AutoresPage
**Ruta:** `/autores`

Gestión completa de autores con operaciones CRUD.

**Funcionalidades:**
- **Listar:** DataTable con paginación y ordenamiento
- **Crear:** Formulario modal con validaciones
- **Ver detalles:** Dialog con información completa del autor
- **Validaciones:**
  - Nombre, apellido, email, teléfono, alias y especialidad requeridos
  - Email válido (regex)
  - Teléfono de 10 dígitos
  - Edad entre 18 y 100 años
- **Notificaciones:** Toast para éxito/error

**Componentes PrimeReact utilizados:**
- DataTable, Column
- Dialog
- InputText, InputNumber
- Button, Toast

---

### PublicacionesPage
**Ruta:** `/publicaciones`

Gestión completa de publicaciones con control de estados editoriales.

**Funcionalidades:**
- **Listar:** DataTable con estados coloreados y paginación
- **Crear:** Formulario modal con:
  - Campos de texto para título, descripción, tipo, medio y código
  - Dropdown de autores (con búsqueda)
  - Dropdown de estados editoriales (dinámico desde API)
- **Ver detalles:** Dialog con:
  - Información completa de la publicación
  - Datos del autor asociado (si está disponible)
- **Actualizar estado:** Dialog específico para cambio de estado
- **Validaciones:**
  - Todos los campos requeridos
  - Autor y estado editorial seleccionados
- **Estados dinámicos:** Cargados desde el API
- **Notificaciones:** Toast para éxito/error/advertencia

**Componentes PrimeReact utilizados:**
- DataTable, Column
- Dialog
- InputText, InputTextarea, Dropdown
- Button, Toast

---

### NotFoundPage
**Ruta:** `*` (catch-all)

Página 404 para rutas no encontradas.

---

## ⚙️ Configuración y Ejecución

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:8094
```

### Instalación

```bash
# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173
```

### Compilación

```bash
# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

### Linting

```bash
# Ejecutar linter
npm run lint
```

---

## 🎨 Tema y Estilos

### Paleta de Colores

```css
--bg-primary: #0a0a0f;           /* Fondo principal oscuro */
--bg-secondary: #13131a;         /* Fondo secundario */
--bg-tertiary: #1a1a24;          /* Fondo terciario */
--violet-primary: #8b5cf6;       /* Violeta principal */
--violet-secondary: #a78bfa;     /* Violeta secundario */
--violet-dark: #6d28d9;          /* Violeta oscuro */
--violet-light: #c4b5fd;         /* Violeta claro */
--text-primary: #e5e7eb;         /* Texto principal */
--text-secondary: #9ca3af;       /* Texto secundario */
--border-color: #2d2d3d;         /* Bordes */
--shadow-violet: rgba(139, 92, 246, 0.3); /* Sombras */
```

### Características del Diseño
- **Tema oscuro** con gradientes violeta
- **Tarjetas futuristas** con efectos hover
- **Botones con gradientes** y sombras
- **Tipografía moderna** con sistema de fuentes
- **Efectos de elevación** al interactuar

---

## 🔐 Seguridad

- Validación de formularios en cliente
- Sanitización de inputs
- Manejo de errores HTTP
- Variables de entorno para configuración sensible
- TypeScript para type safety

---

## 📝 Notas de Desarrollo

### Validaciones de Formularios
Todas las validaciones se ejecutan antes de enviar datos al servidor y muestran mensajes específicos mediante Toast con severidad `warn`.

### Gestión de Estados
Los estados editoriales se obtienen dinámicamente del backend al cargar la página de publicaciones, garantizando consistencia con el servidor.

### Manejo de Errores
Todos los servicios tienen manejo de errores con try/catch y notificaciones al usuario mediante Toast con severidad `error`.

---

## 🤝 Contribución

Este proyecto es parte de un sistema académico de gestión de publicaciones desarrollado con arquitectura de microservicios.

---

## 📞 Soporte

Para más información sobre el backend y la arquitectura de microservicios, consultar el archivo `referencia_arquitectura_microservicos.md`.
