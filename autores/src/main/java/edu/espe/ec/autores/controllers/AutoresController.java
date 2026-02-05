package edu.espe.ec.autores.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.espe.ec.autores.dtos.CrearAutorDTO;
import edu.espe.ec.autores.entities.Autor;
import edu.espe.ec.autores.services.AutorService;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(originPatterns = "*")
@RequestMapping("/api/autores")
public class AutoresController {

	@Autowired
	private AutorService service;
	
	@PostMapping("/")
	public Autor create(@Valid @RequestBody CrearAutorDTO dto) {
		return service.create(dto);
	}
	
	@GetMapping("/{id}")
	public Autor getById(@PathVariable UUID id) {
		return service.getById(id);
	}
	
	@GetMapping("/")
	public List<Autor> getAll(){
		return service.getAll();
	}
	
}
