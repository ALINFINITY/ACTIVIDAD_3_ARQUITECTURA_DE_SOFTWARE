package edu.espe.ec.autores.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.espe.ec.autores.entities.Autor;

public interface AutorRepository extends JpaRepository<Autor, UUID> {
}
