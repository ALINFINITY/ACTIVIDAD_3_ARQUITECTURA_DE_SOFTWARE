package edu.espe.ec.autores.services;

import java.util.List;
import java.util.UUID;

import edu.espe.ec.autores.dtos.CrearAutorDTO;
import edu.espe.ec.autores.entities.Autor;

public interface AutorService {
	Autor create(CrearAutorDTO autor);
	Autor getById(UUID id);
	List<Autor> getAll();
}

