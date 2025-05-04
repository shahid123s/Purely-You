import CustomError from '../../utils/CustomError.js';
import User from './userModel.js';
import { ERROR_MESSAGES } from '../../constants/ErrorMessages.js';
import { get } from 'http';
import Doctor from '../doctor/doctorModel.js';
import DoctorAppointment from '../appoinments/appoinmentModel.js';

export const userRepository = {
    
    
    getUserByEmail: async (email) => {
        try {
            return await User.findOne({email});
        } catch (error) {
            throw new CustomError(error.message, 500, ERROR_MESSAGES.DATABASE_ERROR);
        }
    },


    isExistsUser :  async (email) => {
        try {
            return await User.exists({email});
        } catch (error) {
            throw new CustomError(error.message, 500, ERROR_MESSAGES.DATABASE_ERROR);
        }
    },

    createUser: async (userDetails) => {
        try {
            return await User.create(userDetails);
        } catch (error) {
            throw new CustomError(error.message, 500, ERROR_MESSAGES.DATABASE_ERROR);
        }
    },
    getUserById: async (userId) => {
        try {
            return await User.findById(userId, '-password -__v');
        } catch (error) {
            throw new CustomError(error.message, 500, ERROR_MESSAGES.DATABASE_ERROR);
        }
    
    },
    getAllApprovedDoctors: async() => {
        try {
            return await Doctor.find({status: 'approved'}, '-password').lean();
        } catch (error) {
            throw new CustomError(error.message, 500, ERROR_MESSAGES.DATABASE_ERROR);
        }
    },
    getAppointments: async (userId) => {
        try {
            return await DoctorAppointment.find({userId}, 'name email').lean();
        } catch (error) {
            throw new CustomError(error.message, 500, ERROR_MESSAGES.DATABASE_ERROR);
        }
    }
    
}