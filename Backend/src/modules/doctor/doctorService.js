import { doctorRepository } from "./doctorRepository";


export const doctorService = {
    getDoctors: async () => {
        const response = await doctorRepository.getAllDobctors() ;
        const data = await response.json();
        return data;
    },
    getAppoinments: async(doctorId) => {
            const response = await doctorRepository.getAppointmentsByDoctorId(doctorId);
            const data = await response.json();
            return data;
        }

}