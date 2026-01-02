import api from './axios';

export const postsAPI = {
  // Listar todos os posts
  getAll: async () => {
    const response = await api.get('/posts');
    return response.data;
  },

  // Buscar post por ID
  getById: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  // Buscar posts (com filtro de pesquisa)
  search: async (query) => {
    const response = await api.get(`/posts/search?query=${query}`);
    return response.data;
  },

  // Criar novo post
  create: async (postData) => {
    const response = await api.post('/posts', postData);
    return response.data;
  },

  // Atualizar post
  update: async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },

  // Deletar post
  delete: async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },

  // Adicionar comentário
  addComment: async (id, commentData) => {
    const response = await api.post(`/posts/${id}/comments`, commentData);
    return response.data;
  },

  // Atualizar comentário
  updateComment: async (postId, commentId, commentData) => {
    const response = await api.put(`/posts/${postId}/comments/${commentId}`, commentData);
    return response.data;
  },

  // Deletar comentário
  deleteComment: async (postId, commentId) => {
    const response = await api.delete(`/posts/${postId}/comments/${commentId}`);
    return response.data;
  },
};
