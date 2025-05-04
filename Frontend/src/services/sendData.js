import doctorAxiosInstance from "../utils/doctorAxiosInstance"
import adminAxiosInstance from "../utils/adminAxiosInstance"
import { v4 as uuidv4 } from 'uuid';
import patientAxiosInstance from "../utils/patientAxios";
// import { data } from "react-router-dom";


export const sendLoginData = async (data ={}) => {
    try {
        const response = await doctorAxiosInstance.post('/auth/login', data);
        console.log(response.data.doctor)
        localStorage.setItem('doctorDetails', JSON.stringify(response.data.doctor));
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



export const sendMessageToDoctor = async (data = {}) => {
    try {
        const response = await patientAxiosInstance.post('/chat', data)
        return response.data;
    } catch (error) {
        return error
    }
}

export const sendMessageToPatient = async (data = {}) => {
    try {
        const response = await doctorAxiosInstance.post('/messages', data)
        return response.data;
    } catch (error) {
        return error
    }

}