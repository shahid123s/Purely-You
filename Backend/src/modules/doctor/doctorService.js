import { appointmentRepository } from "../appoinments/appoinmentRepository.js";
import { chatRepository } from '../chat/chatRepositroy.js'


export const doctorService = {
    getDoctors: async () => {
        // const response = await doctorRepository.getAllDobctors() ;
        // const data = await response.json();
        // return data;
    },
    getAppoinments: async (doctorId) => {
        const response = await appointmentRepository.getAppointmentsByDoctorId(doctorId);

        return response;
    },
    actionAppoinment: async (id, status) => {
        const response = await appointmentRepository.update(id, { status });
        return response;
    },
    updateUIState: async (id, uiState) => {
        console.log(id, uiState, 'in service')
        const response = await appointmentRepository.updateAppointmentUIState(id, uiState);
        return response;

    },
    updateRecords: async (id, notes, status) => {
        console.log(id, notes, 'in service')
        console.log(status, 'status in service')
        const response = await appointmentRepository.updateSumbit(id, { notes, status });
        return response;

    },
    getChats: async (doctorId) => {
        const response = await chatRepository.getChatByDoctorId(doctorId);
        return response;
    },
    getChat: async (doctorId, patientId) => {
        const response = await chatRepository.getChat(doctorId, patientId);
        return response;
    },
    sendMessage: async (chatId, newMessage) => {
        const chat = await chatRepository.getChatByDoctorId(chatId);
        if (!chat) {
            throw new CustomError("Chat not found", 404);
        }
        console.log(chat, 'chat')
        chat.content.push({ msg: newMessage, sender: 'doctor' });
        const response = await chatRepository.updateChat(chat);
        return response;
    }

}