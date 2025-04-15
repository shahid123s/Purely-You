
import axios from 'axios';
import { toast } from 'sonner';

const doctorAxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api/doctor',
  timeout: 5000,
});

export default doctorAxiosInstance;

let isRefreshing = false;

doctorAxiosInstance.interceptors.response.use(
  (response)=> response,
  async (error)=> {
    const originalRequest = error.config;
    
    if(error.status == 401 && !originalRequest._retry){
      console.log('access token expire trigger for doctor');
        originalRequest._retry = true;

        if(!isRefreshing) {
          isRefreshing = true;
          try {
            await doctorAxiosInstance.post('/doctor/refresh')
            isRefreshing = false;

            return doctorAxiosInstance(originalRequest);
          } catch (error) {
            isRefreshing = false;

            toast.info('please login again');
            localStorage.removeItem('doctorSession');
            window.location.href = '/';
            return Promise.reject(error)
          }
        }
    }
  }
)