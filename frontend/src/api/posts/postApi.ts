import type { Post } from '../../types/post';
import { api } from '../http';

export const postApi = {
  getAll: (): Promise<Post[]> => api.get('/api/posts'),
  getById: (id: string) => api.get(`/api/posts/${id}`),
  create: (data: any) => api.post('/api/posts', data),
  delete: (id: string) => api.delete(`/api/posts/${id}`),
};
