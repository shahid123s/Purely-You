import doctorAxiosInstance from "../utils/doctorAxiosInstance"
import adminAxiosInstance from "../utils/adminAxiosInstance"
export const sendLoginData = async (data ={}) => {
    try {
        const response = await doctorAxiosInstance.post('/auth/login', data)
        return response.data;
    } catch (error) {
        return error
    }
}

export const doctorSignupRequest = async (doctorData = {}) => {
    try {
        const response = await doctorAxiosInstance.post('/auth/register', {doctorData})
        return response.data;
    } catch (error) {
        return error
    }
}

export const adminLoginRequest = async (data = {}) => {
    try {
        const response = await adminAxiosInstance.post('/auth/login', data)
        return response.data;
    } catch (error) {
        return error
    }
}