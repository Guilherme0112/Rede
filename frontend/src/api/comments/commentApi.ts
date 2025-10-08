import { api } from '../http';

export const commentApi = {
  getById: (id: string) => api.get(`/api/comments/${id}`),
  create: (data: any) => api.post('/api/comments', data),
  delete: (id: string) => api.delete(`/api/comments/${id}`),
};
