import patientAxiosInstance from '../utils/patientAxios.js';

export const fetchPatientProfile = async ( userId ) => {  
    try {   

        const result = await patientAxiosInstance.get('/profile', {
            params: userId,
        })
        
    } catch (error) {
        return error
    }
}  
