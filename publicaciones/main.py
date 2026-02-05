from fastapi import FastAPI
from src_publicaciones.database.db import Base, engine
from src_publicaciones.controllers import publicacion_router
from fastapi.middleware.cors import CORSMiddleware
from app_conf import SERVER_PORT, SERVER_HOST

# 1. Crear tablas
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Microservicio de Publicaciones")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Registrar Rutas
app.include_router(publicacion_router.router)

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "publicaciones"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=SERVER_HOST, port=int(SERVER_PORT))



