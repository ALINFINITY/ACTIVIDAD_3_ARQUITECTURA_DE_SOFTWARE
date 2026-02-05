import { apiClient } from "./api";
import type{ Autor } from "../types";

export const autoresService = {
  getAll: async () => {
    const response = await apiClient.get<Autor[]>("/autores/api/autores/");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<Autor>(`/autores/api/autores/${id}`);
    return response.data;
  },

  create: async (autor: Autor) => {
    const response = await apiClient.post<Autor>("/autores/api/autores/", autor);
    return response.data;
  },
};
