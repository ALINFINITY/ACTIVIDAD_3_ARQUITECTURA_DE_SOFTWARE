export interface Autor {
  id?: string;
  edad: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  alias: string;
  especialidad: string;
  libros_publicados: number;
}

export interface Publicacion {
  id?: string;
  titulo: string;
  descripcion: string;
  tipoPublicacion: string;
  medioPublicacion: string;
  codigoIdentificacion: string;
  autor_id: string;
  estado_editorial: string;
  fecha_creacion?: string;
  autor_data?: Autor;
}

export interface EstadoEditorial {
  label: string;
  value: string;
}
