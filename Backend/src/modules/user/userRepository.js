import CustomError from '../../utils/CustomError.js';
import User from './userModel.js';
import { ERROR_MESSAGES } from '../../constants/ErrorMessages.js';
import { get } from 'http';

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
    
    }
    
}