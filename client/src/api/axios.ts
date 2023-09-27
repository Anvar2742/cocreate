import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5050/",
});

export const axiosPrivate = axios.create({
    baseURL: "http://localhost:5050/",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
