import { appointmentRepository } from "./appoinmentRepository.js"
import CustomError from "../../utils/CustomError.js"


export const appoinmentService = {
    async create(appointment) {
        if (!appointment.date || !appointment.patientId || !appointment.doctorId) {
            throw new CustomError("Missing required fields", 400);
        }
        return await appointmentRepository.create(appointment);
    },

    async findAll() {
        return await appointmentRepository.findAll();
    },

    async findById(id) {
        const appointment = await appointmentRepository.findById(id);
        if (!appointment) {
            throw new CustomError("Appointment not found", 404);
        }
        return appointment;
    },

    async update(id, appointment) {
        const existingAppointment = await appointmentRepository.findById(id);
        if (!existingAppointment) {
            throw new CustomError("Appointment not found", 404);
        }
        return await appointmentRepository.update(id, appointment);
    },

    async delete(id) {
        const appointment = await appointmentRepository.findById(id);
        if (!appointment) {
            throw new CustomError("Appointment not found", 404);
        }
        return await appointmentRepository.delete(id);
    },
    async updateRoomId() {
        const currDate = new Date().toISOString().split('T')[0];
        const appoinment = await appointmentRepository.updateRoomIdInAppointment(roomId, doctorId,)
    }
}
