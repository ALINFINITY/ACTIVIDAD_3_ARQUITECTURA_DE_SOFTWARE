from pydantic import BaseModel
from typing import Optional, Dict, Any
from uuid import UUID
from datetime import datetime

class PublicacionBase(BaseModel):
    titulo: str
    descripcion: str
    tipoPublicacion: str
    medioPublicacion: str
    codigoIdentificacion: str
    autor_id: str
    estado_editorial: str

class PublicacionCreate(PublicacionBase):
    pass

class PublicacionUpdateStatus(BaseModel):
    estado_editorial: str

class PublicacionResponse(PublicacionBase):
    id: UUID
    fecha_creacion: datetime
    autor_data: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True