import Admin from "./adminModel.js";
import User from '../user/userModel.js'
import Doctor from "../doctor/doctorModel.js";
import CustomError from "../../utils/CustomError.js";



export const adminRepository = {
    // Get admin by email for login
    getAdmin: async (email) => {
        try {
            const admin = await Admin.findOne({ email });
        return admin;
        } catch (error) {
            throw CustomError(error.message, 500);
        }
    },

    // Register new admin
    createAdmin: async (adminData) => {
        try {
            const admin = new Admin(adminData);
            await admin.save();
            return admin; 
        } catch (error) {
            throw new CustomError(error.message, 500)
        }
    },

    getAllUsers: async () => {
        try {
            const users = await User.find({}, '-password -__v').lean();
            return users;
        } catch (error) {
            throw new CustomError(error.message, 500);
        }
    },

    getAllApprovedDoctors: async () => {
        try {
            const doctors = await Doctor.find({status: 'approved'}, '-password -__v').lean();
            return doctors;
        } catch (error) {
            throw new CustomError(error.message, 500);
        }
    }

}