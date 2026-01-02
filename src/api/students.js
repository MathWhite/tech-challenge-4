import api from './axios';

export const studentsAPI = {
  // Listar todos os alunos
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get(`/students?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Buscar aluno por ID
  getById: async (id) => {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },

  // Criar novo aluno
  create: async (studentData) => {
    const response = await api.post('/students', studentData);
    return response.data;
  },

  // Atualizar aluno
  update: async (id, studentData) => {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  },

  // Deletar aluno
  delete: async (id) => {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  },
};
