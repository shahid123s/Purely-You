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
    }, 
    getChatByDoctorId: async (doctorId) => {
        try {
            return await Chat.find({doctor: doctorId}).populate('patient', '-password').lean();
        } catch (error) {
            throw new CustomError(error.message, 500);
        }
    }, 
    getChatByDoctorId: async( id) => {
        try {
            return await Chat.findById(id)
        } catch (error) {
            throw new CustomError(error.message, 500);
            
        }
    }
    // sendChatToPatient: async (chatId, newMessage) => {
    //     try {
    //         return await Chat.findByIdAndUpdate(chatId, {content:{msg: newMessage, sen} ]})
    //     } catch (error) {
    //         throw new CustomError(error.message, 500);
    //     }
    // }
}