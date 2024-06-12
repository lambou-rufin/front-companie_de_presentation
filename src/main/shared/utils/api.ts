import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: 'http://localhost:5000', // URL de base de votre API
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default api;
