import os

# SERVER - Uvicorn
SERVER_HOST = "0.0.0.0"
SERVER_PORT = 8000

# Services 
ENV_AUTORES_SERVICE_URL = os.getenv("ENV_AUTORES_SERVICE_URL","http://localhost:8090")
ENV_PUBLICACIONES_SERVICE_URL = os.getenv("ENV_PUBLICACIONES_SERVICE_URL","http://localhost:8091")
