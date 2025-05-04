import CustomError from "../../utils/CustomError.js"
import { userRepository } from "./userRepository.js";
import { appointmentRepository } from "../appoinments/appoinmentRepository.js";
import { doctorRepository } from "../doctor/doctorRepository.js";
import {chatRepository} from '../chat/chatRepositroy.js'

export const userServices = {
    getUserDetails:async (userId) => {
        try {
            const user = await userRepository.getUserById(userId);
            return user;
        } catch (error) {
            throw new CustomError("Error in getting user details" + error.message, 500);
        }
    },
    getDoctorDetails:async (doctorId) => {
        try {
            const doctor = await doctorRepository.getDoctorById(doctorId);
            return doctor;
        } catch (error) {
            throw new CustomError("Error in getting doctor details" + error.message, 500);
        }
    },
     getAllDoctors: async () => {
        try {
            const doctors = await userRepository.getAllApprovedDoctors();
            return doctors;
        } catch (error) {
            throw new CustomError("Error in getting all doctors" + error.message, 500);
        }
    },
    getAppointmentsOfUser: async (userId) => {
        try {
            const appointments = await appointmentRepository.getAppointments(userId);
            return appointments;
        } catch (error) {
            throw new CustomError("Error in getting appointments" + error.message, 500);
        }
    }, 

    bookAppointment: async (data) => {
        try {
            const appointment = await appointmentRepository.createAppointment(data);
            return appointment;
        } catch (error) {
            throw new CustomError("Error in booking appointment" + error.message, 500);
        }
    }
    ,
    getDoctorChat: async (doctorId, patientId) => {
        try {
            console.log(doctorId)
            let chat = await chatRepository.getChat(doctorId, patientId);
            if(!chat )
                chat = await chatRepository.createChat({doctor: doctorId, patient: patientId});
            return chat;
        } catch (error) {
            throw new CustomError("Error in getting doctor chat" + error.message, 500);
        }
    },
    sendMessage: async (data) => {
        try {
            const chat = await chatRepository.getChat(data.doctorId, data.patientId);
            if(!chat){
                throw new CustomError("Chat not found", 404);
            }
            console.log(chat, 'chat')
            chat.content.push({ msg: data.newMessage, sender: 'patient'});
            await chatRepository.updateChat(chat);
        } catch (error) {
            throw new CustomError("Error in sending message" + error.message, 500);
        }
    }
}