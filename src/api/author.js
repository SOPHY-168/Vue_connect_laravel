import apiServices from "@/plugins/axios";
export const index =  () => apiServices.get('/authors')
export const store = (data) => apiServices.post('/authors', data);
export const update = (data) => apiServices.put(`/authors/${data.id}`, data);
export const destroy = (id) => apiServices.delete(`/authors/${id}`);