import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

authInstance.interceptors.request.use(authInterceptor);
