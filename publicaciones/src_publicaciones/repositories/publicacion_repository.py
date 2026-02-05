from sqlalchemy.orm import Session
from src_publicaciones.models.Publicacion import Publicacion
from typing import List, Optional
from uuid import UUID

class PublicationRepository:
    def __init__(self, db: Session):
        self.db = db

    def save(self, publicacion: Publicacion) -> Publicacion:
        self.db.add(publicacion)
        self.db.commit()
        self.db.refresh(publicacion)
        return publicacion

    def find_by_id(self, id: UUID) -> Optional[Publicacion]:
        return self.db.query(Publicacion).filter(Publicacion.id == id).first()

    def find_all(self) -> List[Publicacion]:
        return self.db.query(Publicacion).all()

        