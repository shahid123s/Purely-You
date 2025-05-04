import CustomError from "../../utils/CustomError.js";
import Doctor from "./doctorModel.js";

 export const doctorRepository = {
    getDoctorByEmail: async (email) => {
        try {
            return await Doctor.findOne({ email }).lean();
        } catch (error) {
            throw new CustomError(error.message, 500)
        }
    },

    createDoctor: async(doctorData) => {
        try {
            return await Doctor.create(doctorData);
        } catch (error) {
            throw new CustomError(error.message, 500)
        }
    },
    getDoctorById: async (doctorId) => {
        try {
            return await Doctor.findById(doctorId, '-password').lean();
        } catch (error) {
            throw new CustomError(error.message, 500)
        }
    },
    updateDoctor: async (doctorId, doctorData) => {
        try {
            return await Doctor.findByIdAndUpdate(doctorId, doctorData, { new: true });
        } catch (error) {
            throw new CustomError(error.message, 500)
        }
    },
    getAllDoctors: async () => {
        try {
            return await Doctor.find().lean();
        } catch (error) {
            throw new CustomError(error.message, 500)
        }
    },
    deleteDoctor: async (doctorId) => {
        try {
            return await Doctor.findByIdAndDelete(doctorId);
        } catch (error) {
            throw new CustomError(error.message, 500)
        }
    }
}