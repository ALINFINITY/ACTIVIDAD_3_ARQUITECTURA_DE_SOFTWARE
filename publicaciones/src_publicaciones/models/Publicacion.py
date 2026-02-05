from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String
from src_publicaciones.models.ProduccionIntelectual import ProduccionIntelectual

class Publicacion(ProduccionIntelectual):
    __tablename__ = "publicaciones"

    tipoPublicacion: Mapped[str] = mapped_column(String(100), nullable=False)
    medioPublicacion: Mapped[str] = mapped_column(String(100), nullable=False)
    codigoIdentificacion: Mapped[str] = mapped_column(String(100), nullable=False)
    estado_editorial: Mapped[str] = mapped_column(String(100), nullable=False)