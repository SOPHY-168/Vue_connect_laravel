import apiServices from "@/plugins/axios";
export const index = () => apiServices.get('/members')
export const store = (data) => apiServices.post('/members', data);
export const update = (data) => apiServices.put(`/members/${data.id}`, data);
export const destroy = (id) => apiServices.delete(`/members/${id}`);