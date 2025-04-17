import CustomError from "../../utils/CustomError.js"
import { userRepository } from "./userRepository.js";

export const userServices = {
    getUserDetails:async (userId) => {
        try {
            const user = await userRepository.getUserById(userId);
            return user;
        } catch (error) {
            throw new CustomError("Error in getting user details" + error.message, 500);
        }
    },
}