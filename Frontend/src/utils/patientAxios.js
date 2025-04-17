import axios from 'axios';
import { toast } from 'sonner';

const patientAxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api/patient',
  timeout: 5000,
  withCredentials: true,
});

let isRefreshing = false;

// Request interceptor to add auth token
patientAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('patientToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
patientAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshResponse = await patientAxiosInstance.post('/auth/refresh-token');
          localStorage.setItem('patientToken', refreshResponse.data.token);
          isRefreshing = false;
          return patientAxiosInstance(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          localStorage.removeItem('patientToken');
          window.location.href = '/patient/login';
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default patientAxiosInstance;