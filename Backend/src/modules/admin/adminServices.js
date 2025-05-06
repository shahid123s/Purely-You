import { adminRepository } from "./adminRepository.js"
import CustomError from "../../utils/CustomError.js";


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
    }
}