import uuid
from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from src_publicaciones.database.db import Base
from datetime import datetime

class ProduccionIntelectual(Base):
    __abstract__ = True  

    id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    autor_id: Mapped[str] = mapped_column(String(100), nullable=False)
    titulo: Mapped[str] = mapped_column(String(100), nullable=False)
    descripcion: Mapped[str] = mapped_column(String(100), nullable=False)
    fecha_creacion: Mapped[datetime] = mapped_column(DateTime(timezone=True))


