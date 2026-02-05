import httpx
from uuid import UUID
from typing import List
from datetime import datetime
from fastapi import HTTPException
from src_publicaciones.models.Publicacion import Publicacion
from src_publicaciones.repositories.publicacion_repository import PublicationRepository
from src_publicaciones.services.publicacion_service import PublicationService
from src_publicaciones.dtos.publicacion_dto import PublicacionCreate, PublicacionUpdateStatus, PublicacionResponse
from app_conf import AUTHORS_SERVICE_URL


class PublicationServiceImpl(PublicationService):

    def __init__(self, repository: PublicationRepository):
        self.estados_validos = ["DRAFT", "REVIEW", "APPROVED", "PUBLISHED", "REJECTED"]
        self.repository = repository

    def _get_author_data(self, author_id: str):
        try:
            response = httpx.get(f"{AUTHORS_SERVICE_URL}/{author_id}", timeout=5.0)
            if response.status_code == 404:
                return None
            response.raise_for_status()
            return response.json()
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="Microservicio de Autores no disponible")

    def create_publication(self, dto: PublicacionCreate) -> PublicacionResponse:
        # Primero se valida el autor, sino se lanza una excepcion
        author = self._get_author_data(dto.autor_id)
        if not author:
            raise HTTPException(status_code=400, detail="Autor no existe")

        if dto.estado_editorial not in self.estados_validos:
            raise HTTPException(status_code=400, detail="Estado editorial inválido")

        # Segundo se crea la publicacion con los datos del DTO
        nuevo_modelo = Publicacion()
        
        nuevo_modelo.titulo = dto.titulo
        nuevo_modelo.descripcion = dto.descripcion
        nuevo_modelo.tipoPublicacion = dto.tipoPublicacion
        nuevo_modelo.medioPublicacion = dto.medioPublicacion
        nuevo_modelo.codigoIdentificacion = dto.codigoIdentificacion
        nuevo_modelo.autor_id = dto.autor_id
        nuevo_modelo.estado_editorial = dto.estado_editorial
        nuevo_modelo.fecha_creacion = datetime.now()

        # Tercero se guarda la publicacion utilizando el repositorio
        guardado = self.repository.save(nuevo_modelo)
        # La respuesta se enriquece con los datos del autor
        response = PublicacionResponse.model_validate(guardado)
        response.autor_data = author
        return response

    def get_publication(self, id: UUID) -> PublicacionResponse:
        pub = self.repository.find_by_id(id)
        if not pub:
            raise HTTPException(status_code=404, detail="Publicación no encontrada")
        
        # La respuesta se enriquece con los datos del autor
        author_data = self._get_author_data(pub.autor_id)
        response = PublicacionResponse.model_validate(pub)
        response.autor_data = author_data
        return response 

    def list_publications(self) -> List[PublicacionResponse]:
        lista = self.repository.find_all()
        return [PublicacionResponse.model_validate(p) for p in lista]

    def update_status(self, id: UUID, dto: PublicacionUpdateStatus) -> PublicacionResponse:
        pub = self.repository.find_by_id(id)
        if not pub:
            raise HTTPException(status_code=404, detail="Publicación no encontrada")
        
        validos = ["DRAFT", "REVIEW", "APPROVED", "PUBLISHED", "REJECTED"]
        if dto.estado_editorial not in validos:
             raise HTTPException(status_code=400, detail="Estado inválido")

        pub.estado_editorial = dto.estado_editorial
        guardado = self.repository.save(pub)
        return PublicacionResponse.model_validate(guardado)

    def get_valid_status(self) -> List[str]:
        return self.estados_validos

        