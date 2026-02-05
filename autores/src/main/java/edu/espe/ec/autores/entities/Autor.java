package edu.espe.ec.autores.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data //Getters y seters
@Entity
@Table(name = "autores")
public class Autor extends Persona {
	
	@Column(length = 30)
	private String alias;
	
	@Column(length = 50, nullable = false)
	private String especialidad;
	
	@Column(nullable = false)
	private int libros_publicados;
}
