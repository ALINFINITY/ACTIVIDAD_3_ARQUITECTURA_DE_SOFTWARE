from abc import ABC, abstractmethod
from typing import List
from uuid import UUID
from src_publicaciones.dtos.publicacion_dto import PublicacionCreate, PublicacionUpdateStatus, PublicacionResponse

class PublicationService(ABC):
    @abstractmethod
    def create_publication(self, dto: PublicacionCreate) -> PublicacionResponse:
        pass

    @abstractmethod
    def get_publication(self, id: UUID) -> PublicacionResponse:
        pass

    @abstractmethod
    def list_publications(self) -> List[PublicacionResponse]:
        pass

    @abstractmethod
    def update_status(self, id: UUID, dto: PublicacionUpdateStatus) -> PublicacionResponse:
        pass

    @abstractmethod
    def get_valid_status(self) -> List[str]:
        pass
    