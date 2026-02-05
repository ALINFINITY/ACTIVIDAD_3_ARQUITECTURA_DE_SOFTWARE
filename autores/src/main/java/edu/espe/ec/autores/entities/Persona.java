package edu.espe.ec.autores.entities;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor
@Data //Getters y seters
public abstract class Persona {
	@Id
	@GeneratedValue
	@UuidGenerator
	private UUID id;
	
	@Min(18)
	@Max(100)
	@Column(nullable = false)
	private int edad;
	
	@Column(nullable = false, length = 30)
	private String nombre;
	
	@Column(nullable = false, length = 30)
	private String apellido;
	
	@Column(nullable = false, unique = true,length = 50)
	private String email;
	
	@Column(nullable = false, unique = true, length = 10)
	private String telefono;
}
