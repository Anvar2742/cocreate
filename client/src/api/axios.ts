import axios from "axios";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_API_URL;

export const axiosInstance = axios.create({
    baseURL: SERVER_BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: SERVER_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
