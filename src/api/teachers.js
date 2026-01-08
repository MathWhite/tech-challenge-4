import api from './axios';

export const teachersAPI = {
  // Listar todos os professores
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get(`/teachers?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Buscar professor por ID
  getById: async (id) => {
    const response = await api.get(`/teachers/${id}`);
    return response.data;
  },

  // Criar novo professor
  create: async (teacherData) => {
    const response = await api.post('/teachers', teacherData);
    return response.data;
  },

  // Atualizar professor
  update: async (id, teacherData) => {
    const response = await api.put(`/teachers/${id}`, teacherData);
    return response.data;
  },

  // Deletar professor
  delete: async (id) => {
    const response = await api.delete(`/teachers/${id}`);
    return response.data;
  },
};
