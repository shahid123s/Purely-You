import patientAxiosInstance from '../utils/patientAxios.js';
import doctorAxiosInstance from  '../utils/doctorAxiosInstance.js'
import axios from 'axios';


export const fetchPatientProfile = async ( userId ) => {  
    try {   

        const result = await patientAxiosInstance.get('/profile', {
            params: userId,
        })
        return result;
        
    } catch (error) {
        return error
    }
}  


export const fetchDoctors = async () => {
    try {
        const result = await axios.get('http://localhost:3001/api/get-doctors')
        console.log(result)
        return result;
    } catch (error) {
        return error
    }

}


export const fetchDoctorDetails = async (doctorId) => {
    try {
        console.log(doctorId);
        const result = await patientAxiosInstance.get(`/doctor`, {
            params: {doctorId}
        })
        console.log(result, 'result')
        return result;
    } catch (error) {
        return error
    }
}


export const fetchDoctorChat = async (doctorId) => {
    try {
        const result = await patientAxiosInstance.get(`/chat/${doctorId}`)
        return result;
    } catch (error) {
        return error
    }
}