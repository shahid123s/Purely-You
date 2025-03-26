import Admin from "./adminModel.js";
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
    }

}