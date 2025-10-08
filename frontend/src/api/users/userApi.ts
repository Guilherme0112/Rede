import type { User } from '../../types/User';
import { api } from '../http';

export const userApi = {
  getAll: (): Promise<User[]> => api.get('/api/users'),
  getById: (id: string) => api.get(`/api/users/${id}`),
  create: (data: any) => api.post('/api/users', data),
  delete: (id: string) => api.delete(`/api/users/${id}`),
};
