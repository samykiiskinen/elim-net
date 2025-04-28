import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: "https://localhost:44343/api/",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;