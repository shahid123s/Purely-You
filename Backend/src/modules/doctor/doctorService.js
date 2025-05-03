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
        }

}