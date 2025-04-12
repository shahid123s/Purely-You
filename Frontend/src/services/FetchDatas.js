import axiosInstance from "../utils/axios"

export const fetchPatientProfile = async ( userId ) => {  
    try {   

        const result = await axiosInstance.get('/patient/profile', {
            params: userId,
        })
        
    } catch (error) {
        return error
    }
}  



