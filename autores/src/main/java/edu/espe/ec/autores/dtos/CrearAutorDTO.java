package edu.espe.ec.autores.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CrearAutorDTO {
	
	@Min(18)
	@Max(100)
	private int edad;
	
	@NotBlank
	@Size(min = 1, max = 30)
	private String nombre;
	
	@NotBlank
	@Size(min = 1, max = 30)
	private String apellido;
	
	@NotBlank
	@Email
	@Size(min = 3, max = 30)
	private String email;
	
	@NotBlank
	@Size(max = 10)
	@NotNull
	private String telefono;
	
	@NotBlank
	private String alias;
	
	@NotBlank
	private String especialidad;
	
	@Min(0)
	private int libros_publicados;
}
