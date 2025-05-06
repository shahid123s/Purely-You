import { adminRepository } from "./adminRepository.js"
import CustomError from "../../utils/CustomError.js";
import { doctorRepository } from "../doctor/doctorRepository.js";


export const adminServices = {
    getAllUsers: async () => {
        try {
            const users = await adminRepository.getAllUsers();
            return users;
        } catch (error) {
            throw CustomError(error.message, 500);
        }
    },
    getAllApprovedDoctors: async () => {
        try {
            const doctors = await adminRepository.getAllApprovedDoctors();
            return doctors;
        } catch (error) {
            throw CustomError(error.message, 500);
        }
    },
    getAllPendingDoctors: async () => {
        try {
            const doctors = await adminRepository.getAllPendingDoctors();
            return doctors;
        } catch (error) {
            throw CustomError(error.message, 500);
        }
    },
    toogelDoctorStatus: async (doctorId) => {
        try {
            console.log(doctorId)
            const doctor = await doctorRepository.getDoctorById(doctorId);
            console.log(doctor, ' in adminService')
            let updateion = {status: doctor.status === 'approved' ? 'pending' : 'approved'}

            const updateddoctor = await doctorRepository.updateDoctor(doctorId,updateion )
            if(!updateddoctor) {
                throw new CustomError("Doctor not found", 404);
            }
            console.log(updateddoctor, ' in adminService updatedDoctor'   )
            // doctor.status = doctor.status === 'approved' ? 'pending' : 'approved';
            // await doctor.save();
            return updateddoctor;
        } catch (error) {
            throw new CustomError(error.message, 500);
        }
    }
}