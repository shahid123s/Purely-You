import patientAxiosInstance from '../utils/patientAxios.js';
import doctorAxiosInstance from  '../utils/doctorAxiosInstance.js'


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
        const result = await patientAxiosInstance.get('/doctors')
        return result;
    } catch (error) {
        return error
    }

}