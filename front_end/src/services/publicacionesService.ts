import type { Publicacion } from "../types";
import { apiClient } from "./api";


export const publicacionesService = {
  getAll: async () => {
    const response = await apiClient.get<Publicacion[]>(
      "/publicaciones/api/publicaciones/"
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<Publicacion>(
      `/publicaciones/api/publicaciones/${id}`
    );
    return response.data;
  },

  create: async (publicacion: Publicacion) => {
    const response = await apiClient.post<Publicacion>(
      "/publicaciones/api/publicaciones/",
      publicacion
    );
    return response.data;
  },

  updateStatus: async (id: string, estado_editorial: string) => {
    const response = await apiClient.patch<Publicacion>(
      `/publicaciones/api/publicaciones/${id}/status`,
      { estado_editorial }
    );
    return response.data;
  },

  getEstadosValidos: async () => {
    const response = await apiClient.get<string[]>(
      "/publicaciones/api/publicaciones/estados_validos/all"
    );
    return response.data;
  },
};
