import apiServices from "@/plugins/axios";
export const index = () => apiServices.get('/borrowing')
export const store = (data) => apiServices.post('/borrowing', data);
export const update = (data) => apiServices.put(`/borrowing/${data.id}`, data);
export const destroy = (id) => apiServices.delete(`/borrowing/${id}`);