package edu.espe.ec.autores.servicesImpl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.espe.ec.autores.dtos.CrearAutorDTO;
import edu.espe.ec.autores.entities.Autor;
import edu.espe.ec.autores.repositories.AutorRepository;
import edu.espe.ec.autores.services.AutorService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AutorServiceImpl implements AutorService {
	
	@Autowired
	private AutorRepository repository;

	@Override
	public Autor create(CrearAutorDTO autor) {
		Autor new_autor = new Autor();
		new_autor.setAlias(autor.getAlias());
		new_autor.setApellido(autor.getApellido());
		new_autor.setEdad(autor.getEdad());
		new_autor.setEmail(autor.getEmail());
		new_autor.setEspecialidad(autor.getEspecialidad());
		new_autor.setLibros_publicados(autor.getLibros_publicados());
		new_autor.setNombre(autor.getNombre());
		new_autor.setTelefono(autor.getTelefono());
					
		return repository.save(new_autor);
	}

	@Override
	public Autor getById(UUID id) {
		return repository.findById(id).orElseThrow(() ->
		new ResponseStatusException(HttpStatus.NOT_FOUND, "Autor no encontrado con id: " + id)
		);
	}

	@Override
	public List<Autor> getAll() {
		return repository.findAll();
	}

}
