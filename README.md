# Sistema de Gestión de Autores y Publicaciones

Sistema de microservicios para la gestión de autores y sus publicaciones académicas, implementado con arquitectura de microservicios utilizando Docker Compose.

## Arquitectura

El sistema está compuesto por los siguientes servicios:

```
┌─────────────┐
│   Frontend  │ (React + Vite)
│  Port: 8075 │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ API Gateway │ (FastAPI)
│  Port: 8070 │
└──────┬──────┘
       │
       ├──────────────────┬─────────────────┐
       ▼                  ▼                 ▼
┌─────────────┐    ┌─────────────┐  ┌─────────────┐
│   Autores   │    │Publicaciones│  │   Bases de  │
│  Port: 8050 │    │  Port: 8060 │  │    Datos    │
│ (Spring)    │    │  (FastAPI)  │  │             │
└──────┬──────┘    └──────┬──────┘  │ PostgreSQL  │
       │                  │          │  Port: 5432 │
       ▼                  ▼          │             │
┌─────────────┐    ┌─────────────┐  │  MariaDB    │
│ PostgreSQL  │    │   MariaDB   │  │  Port: 3306 │
│db_autores   │    │db_publicac. │  └─────────────┘
└─────────────┘    └─────────────┘
```

## Requisitos Previos

- Docker Desktop instalado y en ejecución
- Docker Compose v2.0 o superior
- Puertos disponibles: 5432, 3306, 8050, 8060, 8070, 8075

## Estructura del Proyecto

```
Actividad3/
├── docker-compose.yaml          # Configuración de orquestación
├── .env.autores                 # Variables de entorno - Servicio Autores
├── .env.publicaciones           # Variables de entorno - Servicio Publicaciones
├── .env.api_gateway             # Variables de entorno - API Gateway
├── .env.frontend                # Variables de entorno - Frontend
├── autores/                     # Microservicio de Autores (Spring Boot)
│   ├── Dockerfile
│   └── ...
├── publicaciones/               # Microservicio de Publicaciones (FastAPI)
│   ├── Dockerfile
│   └── ...
├── api_gateway/                 # API Gateway (FastAPI)
│   ├── Dockerfile
│   └── ...
├── front_end/                   # Frontend (React + Vite)
│   ├── Dockerfile
│   └── ...
├── db_postgres/                 # Volumen de datos PostgreSQL (generado automáticamente)
└── db_mariadb/                  # Volumen de datos MariaDB (generado automáticamente)
```

## Servicios y Puertos

| Servicio | Puerto Host | Puerto Interno | Tecnología | Base de Datos |
|----------|------------|----------------|------------|---------------|
| Frontend | 8075 | 5173 | React + Vite | - |
| API Gateway | 8070 | 8000 | FastAPI | - |
| Autores | 8050 | 8000 | Spring Boot | PostgreSQL |
| Publicaciones | 8060 | 8000 | FastAPI | MariaDB |
| PostgreSQL | 5432 | 5432 | PostgreSQL 18 | db_autores |
| MariaDB | 3306 | 3306 | MariaDB 12 | db_publicaciones |

## Configuración de Variables de Entorno

### `.env.autores`
```env
ENV_DATABASE_URL=jdbc:postgresql://db_postgres:5432/db_autores
ENV_DATABASE_USERNAME=postgres
ENV_DATABASE_PASSWORD=postgres
```

### `.env.publicaciones`
```env
ENV_DB_USER=root
ENV_DB_PASSWORD=admin
ENV_DB_HOST=db_mariadb
ENV_DB_PORT=3306
ENV_DB_NAME=db_publicaciones
ENV_AUTHORS_SERVICE_URL=http://autores:8000/autores/api/autores
```

### `.env.api_gateway`
```env
ENV_AUTORES_SERVICE_URL=http://autores:8000
ENV_PUBLICACIONES_SERVICE_URL=http://publicaciones:8000
```

### `.env.frontend`
```env
VITE_API_BASE_URL=http://localhost:8070
```

## Instrucciones de Ejecución

### 1. Clonar o descargar el proyecto

```bash
cd "d:\IngenieriaTI-ESPE\8vo Semestre ESPE Alan\Arquitectura de software\P2\Actividad3"
```

### 2. Verificar que Docker Desktop está en ejecución

Asegúrate de que Docker Desktop esté iniciado y funcionando correctamente.

### 3. Construir e iniciar todos los servicios

```bash
docker-compose up --build
```

Este comando:
- Construye las imágenes Docker de todos los servicios
- Inicia los contenedores en el orden correcto usando `depends_on`
- Muestra los logs de todos los servicios en tiempo real

**Orden de inicio:**
1. `db_postgres` y `db_mariadb` (con healthchecks)
2. `autores-service` y `publicaciones-service` (esperan a que las DB estén healthy)
3. `api-gateway` (espera a que los microservicios estén iniciados)
4. `frontend` (espera a que el API Gateway esté iniciado)

### 4. Iniciar en modo detached (segundo plano)

```bash
docker-compose up -d
```

### 5. Verificar que todos los servicios estén funcionando

```bash
docker-compose ps
```

Deberías ver todos los servicios con estado `Up` y las bases de datos con estado `healthy`.

## Acceso a los Servicios

Una vez que todos los contenedores estén en ejecución:

- **Frontend**: http://localhost:8075
- **API Gateway**: http://localhost:8070
- **Servicio de Autores**: http://localhost:8050
- **Servicio de Publicaciones**: http://localhost:8060
- **PostgreSQL**: localhost:5432
- **MariaDB**: localhost:3306

## Comandos Útiles

### Ver logs de todos los servicios
```bash
docker-compose logs -f
```

### Ver logs de un servicio específico
```bash
docker-compose logs -f autores
docker-compose logs -f publicaciones
docker-compose logs -f api-gateway
docker-compose logs -f frontend
```

### Detener todos los servicios
```bash
docker-compose down
```

### Detener y eliminar volúmenes (CUIDADO: elimina los datos de las bases de datos)
```bash
docker-compose down -v
```

### Reconstruir un servicio específico
```bash
docker-compose up -d --build autores
```

### Reiniciar un servicio específico
```bash
docker-compose restart autores
```

### Ver estado de los contenedores
```bash
docker-compose ps
```

### Ver estadísticas de uso de recursos
```bash
docker stats
```

### Ejecutar comandos dentro de un contenedor
```bash
# PostgreSQL
docker exec -it db-postgres psql -U postgres -d db_autores

# MariaDB
docker exec -it db-mariadb mysql -u root -padmin db_publicaciones
```

## Healthchecks

El sistema implementa healthchecks para asegurar que los servicios se inicien en el orden correcto:

### PostgreSQL
- **Test**: `pg_isready -U postgres`
- **Intervalo**: 5 segundos
- **Reintentos**: 5

### MariaDB
- **Test**: `healthcheck.sh --connect --innodb_initialized`
- **Intervalo**: 5 segundos
- **Reintentos**: 10
- **Período de inicio**: 30 segundos

Los microservicios de `autores` y `publicaciones` solo se inician cuando sus respectivas bases de datos están en estado `healthy`.

## Reinicio Automático

Todos los servicios de aplicación tienen configurado `restart: on-failure`, lo que significa que se reiniciarán automáticamente si fallan durante la ejecución.

## Solución de Problemas

### Problema: Puerto ya en uso
```
Error: bind: address already in use
```
**Solución**: Verifica que los puertos 5432, 3306, 8050, 8060, 8070 y 8075 no estén siendo usados por otros servicios.

```bash
# Windows
netstat -ano | findstr "8070"

# Detener el proceso si es necesario
taskkill /PID <PID> /F
```

### Problema: Base de datos no se conecta
```
Connection refused
```
**Solución**: Los servicios intentan conectarse antes de que las bases de datos estén listas. Los healthchecks deben resolver esto automáticamente. Si persiste:

```bash
docker-compose down
docker-compose up
```

### Problema: Error de volumen de PostgreSQL
```
Error: in 18+, these Docker images are configured to store database data...
```
**Solución**: Elimina los datos antiguos de PostgreSQL:

```bash
docker-compose down -v
rm -rf db_postgres
docker-compose up
```

### Problema: Cambios en el código no se reflejan
**Solución**: Reconstruye la imagen del servicio:

```bash
docker-compose up -d --build <nombre-servicio>
```

### Problema: Contenedor se reinicia constantemente
**Solución**: Revisa los logs para identificar el error:

```bash
docker-compose logs <nombre-servicio>
```

## Red de Docker

Todos los servicios están conectados a una red bridge personalizada llamada `microservices-network`, que permite:
- Comunicación entre contenedores usando nombres de servicio
- Aislamiento de la red del host
- Resolución DNS automática

## Limpieza Completa del Sistema

Para eliminar completamente todos los contenedores, volúmenes, redes e imágenes relacionadas:

```bash
# Detener y eliminar contenedores y volúmenes
docker-compose down -v

# Eliminar imágenes construidas
docker-compose down --rmi all -v

# Eliminar directorios de datos (opcional)
rm -rf db_postgres db_mariadb
```

## Desarrollo

### Agregar un nuevo microservicio

1. Crea el directorio del servicio con su `Dockerfile`
2. Crea el archivo `.env.<nombre-servicio>`
3. Agrega el servicio en `docker-compose.yaml`:
```yaml
nuevo_servicio:
  container_name: nuevo-servicio
  build:
    context: ./nuevo_servicio
    dockerfile: Dockerfile
  env_file:
    - .env.nuevo_servicio
  ports:
    - "XXXX:YYYY"
  depends_on:
    otro_servicio:
      condition: service_started
  networks:
    - microservices-network
  restart: on-failure
```

## Notas Importantes

- Las bases de datos crean automáticamente sus esquemas al iniciar por primera vez
- Los datos persisten en los directorios `db_postgres/` y `db_mariadb/`
- Los archivos `.env.*` contienen configuraciones sensibles y NO deben versionarse en producción
- La comunicación entre contenedores usa los nombres de servicio definidos en `docker-compose.yaml`
- El frontend se comunica con el backend usando `localhost` porque se ejecuta en el navegador del usuario

## Tecnologías Utilizadas

- **Frontend**: React 18, Vite 7, TypeScript
- **API Gateway**: Python 3.12, FastAPI, Uvicorn
- **Servicio Autores**: Java 17, Spring Boot 3, Hibernate
- **Servicio Publicaciones**: Python 3.12, FastAPI, SQLAlchemy
- **Bases de Datos**: PostgreSQL 18, MariaDB 12
- **Contenedorización**: Docker, Docker Compose
- **Red**: Docker Bridge Network

## Contacto y Soporte

Para reportar problemas o contribuir al proyecto, contacta al equipo de desarrollo.

---

**Última actualización**: 2026-02-05
