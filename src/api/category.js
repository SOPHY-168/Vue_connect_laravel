import apiServices from "@/plugins/axios";
export const index = () => apiServices.get('/category')