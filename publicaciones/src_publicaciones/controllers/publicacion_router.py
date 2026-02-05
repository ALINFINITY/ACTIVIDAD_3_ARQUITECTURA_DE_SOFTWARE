from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from src_publicaciones.database.db import get_db
from src_publicaciones.repositories.publicacion_repository import PublicationRepository
from src_publicaciones.services.publicacion_service import PublicationService
from src_publicaciones.services.publicacion_service_impl import PublicationServiceImpl
from src_publicaciones.dtos.publicacion_dto import PublicacionCreate, PublicacionResponse, PublicacionUpdateStatus

router = APIRouter(prefix="/api/publicaciones", tags=["publicaciones"])

# Se define el servicio a utilizar
def get_service(db: Session = Depends(get_db)) -> PublicationService:
    repository = PublicationRepository(db)
    return PublicationServiceImpl(repository)

@router.post("/", response_model=PublicacionResponse, status_code=status.HTTP_201_CREATED)
def create(dto: PublicacionCreate, service: PublicationService = Depends(get_service)):
    return service.create_publication(dto)

@router.get("/{id}", response_model=PublicacionResponse)
def get_one(id: UUID, service: PublicationService = Depends(get_service)):
    return service.get_publication(id)

@router.get("/", response_model=List[PublicacionResponse])
def get_all(service: PublicationService = Depends(get_service)):
    return service.list_publications()

@router.patch("/{id}/status", response_model=PublicacionResponse)
def update_status(id: UUID, dto: PublicacionUpdateStatus, service: PublicationService = Depends(get_service)):
    return service.update_status(id, dto)

@router.get("/estados_validos/all", response_model=List[str])
def get_valid_status(service: PublicationService = Depends(get_service)):
    return service.get_valid_status()

