import CustomError from "../../utils/CustomError.js";
import Chat from "./chatModel.js";


export const chatRepository = {
    getChat: async (doctorId, patientId) => {
        try {
            return await Chat.findOne({patient: patientId, doctor: doctorId}).lean();
        } catch (error) {
            throw new CustomError(error.message, 500)
        }
    }
    ,

    createChat: async (data) => {
        try {
            return await Chat.create(data);
        } catch (error) {
            throw new CustomError(error.message, 500)
        }
    },
    updateChat : async(chat) => {
        try {
            return await Chat.findByIdAndUpdate(chat._id, chat);
        } catch (error) {
            throw new CustomError(error.message, 500);
        }
    }
}