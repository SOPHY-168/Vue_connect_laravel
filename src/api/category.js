import apiServices from "@/plugins/axios";
export const index = () => apiServices.get('/category')
export const store = (data) => apiServices.post('/category', data);
export const update = (data) => apiServices.put(`/category/${data.id}`, data);
export const destroy = (id) => apiServices.delete(`/category/${id}`);