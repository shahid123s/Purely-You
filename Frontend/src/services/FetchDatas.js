import patientAxiosInstance from '../utils/patientAxios.js';

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
