from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app_conf import SERVER_HOST, SERVER_PORT, ENV_AUTORES_SERVICE_URL, ENV_PUBLICACIONES_SERVICE_URL
import httpx

app = FastAPI(title="API Gateway")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mapeo de servicios
SERVICES = {
    "autores": ENV_AUTORES_SERVICE_URL,
    "publicaciones": ENV_PUBLICACIONES_SERVICE_URL,
}

@app.api_route("/{service}/{path:path}", methods=["GET", "POST", "PUT", "DELETE","PATCH"])
async def gateway(service: str, path: str, request: Request):
    if service not in SERVICES:
        raise HTTPException(status_code=404, detail="Service not found")
    
    if path.startswith("/"):
        path = path[1:]
    
    url = f"{SERVICES[service]}/{path}"
    print(url)
    headers = dict(request.headers)
    body = await request.body()
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.request(
                method=request.method,
                url=url,
                headers=headers,
                content=body,
                params=request.query_params
            )
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "ok", "gateway": "running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=SERVER_HOST, port=int(SERVER_PORT))