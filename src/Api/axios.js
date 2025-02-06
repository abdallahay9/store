import axios from "axios";
import { baseURL } from "./api";
import Cookie from "cookie-universal";

const Axios = axios.create({
    baseURL: baseURL,
});

Axios.interceptors.request.use(
    (config) => {
        const token = Cookie().get("Bearer");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { Axios };
