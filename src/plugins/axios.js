import axios  from "axios";
 const apiServices = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Origin": "*",
    }
 });
 export default apiServices;





// const api = axios.create({
//     baseURL: "http://127.0.0.1:8000/api/v1",
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//     },
//     withCredentials: false,
// })

// export default api;