import { appointmentRepository } from "../appoinments/appoinmentRepository.js";



export const doctorService = {
    getDoctors: async () => {
        // const response = await doctorRepository.getAllDobctors() ;
        // const data = await response.json();
        // return data;
    },
    getAppoinments: async(doctorId) => {
            const response = await appointmentRepository.getAppointmentsByDoctorId(doctorId);
        
            return response;
    },
    actionAppoinment: async (id, status) => {
        const response = await appointmentRepository.update(id, {status});
        return response;
    },
    updateUIState: async(id, uiState) => {
        const response = await appointmentRepository.updateAppointmentUIState(id, {uiState});
        return response;
    
    }
}