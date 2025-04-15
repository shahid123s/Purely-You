import axios from 'axios';
import { toast } from 'sonner';

const patientAxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api/patient',
  timeout: 5000,
});

export default patientAxiosInstance;

let isRefreshing = false;

patientAxiosInstance.interceptors.response.use(
  (response)=> response,
  async (error)=> {
    const originalRequest = error.config;
    if(error.status == 401 && !originalRequest._retry){
      console.log('access token expire trigger');
        originalRequest._retry = true;

        if(!isRefreshing) {
          isRefreshing = true;
          try {
            await patientAxiosInstance.post('/patient/refresh')
            isRefreshing = false;

            return patientAxiosInstance(originalRequest);
          } catch (error) {
            isRefreshing = false;

            toast.info('please login again');
            localStorage.removeItem('patientSession');
            window.location.href = '/';
            return Promise.reject(error)
          }
        }
    }
  }
)