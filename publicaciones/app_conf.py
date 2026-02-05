import os

# DATABASE  - MySQL
DB_USER =  os.getenv("ENV_DB_USER","root")
DB_PASSWORD = os.getenv("ENV_DB_PASSWORD","admin")
DB_HOST = os.getenv("ENV_DB_HOST","localhost")
DB_PORT = os.getenv("ENV_DB_PORT","3306")
DB_NAME = os.getenv("ENV_DB_NAME","db_publicaciones")

# SERVER - Uvicorn
SERVER_HOST = "0.0.0.0"
SERVER_PORT = 8000

# Microservicios - API Gateway
AUTHORS_SERVICE_URL = os.getenv("ENV_AUTHORS_SERVICE_URL","http://localhost:8094/autores/api/autores")

