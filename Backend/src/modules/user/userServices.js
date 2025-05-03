import CustomError from "../../utils/CustomError.js"
import { adminRepository } from "../admin/adminRepository.js";
import { adminServices } from "../admin/adminServices.js";
import { getAllDoctors, getAppointments } from "./userController.js";
import { userRepository } from "./userRepository.js";
import { appointmentRepository } from "../appoinments/appoinmentRepository.js";

export const userServices = {
    getUserDetails:async (userId) => {
        try {
            const user = await userRepository.getUserById(userId);
            return user;
        } catch (error) {
            throw new CustomError("Error in getting user details" + error.message, 500);
        }
    },
     getAllDoctors: async () => {
        try {
            const doctors = await userRepository.getAllApprovedDoctors();
            return doctors;
        } catch (error) {
            throw new CustomError("Error in getting all doctors" + error.message, 500);
        }
    },
    getAppointmentsOfUser: async (userId) => {
        try {
            const appointments = await appointmentRepository.getAppointments(userId);
            return appointments;
        } catch (error) {
            throw new CustomError("Error in getting appointments" + error.message, 500);
        }
    }, 

    bookAppointment: async (data) => {
        try {
            const appointment = await appointmentRepository.createAppointment(data);
            return appointment;
        } catch (error) {
            throw new CustomError("Error in booking appointment" + error.message, 500);
        }
    }
}