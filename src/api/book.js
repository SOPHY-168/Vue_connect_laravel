// src/api/book.js
import api from '@/plugins/axios';

export const index = () => api.get('/books');
export const store = (data) => api.post('/books', data);
export const update = (data) => api.put(`/books/${data.id}`, data);
export const destroy = (id) => api.delete(`/books/${id}`);
