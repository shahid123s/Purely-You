// The code has a few spelling mistakes in variable and function names:
// - 'appoinment' should be 'appointment'
// - 'createAppoinment' should be 'createAppointment'
// - 'updateAppoinment' should be 'updateAppointment'

import DoctorAppointment from './appoinmentModel.js'
import CustomError from '../../utils/CustomError.js'

export const appointmentRepository = {
    createAppointment: async (data) => {
        try {
            const appointment = await DoctorAppointment.create(data);
            return appointment;
        } catch (error) {
            throw new CustomError(error.message, 500);
        }
    },

    updateRoomIdInAppointment: async (roomId, doctorId, date) => {
        try {
            const updatedAppointment = await DoctorAppointment.findOneAndUpdate(
                {
                    doctorId: doctorId,
                    date: date
                },
                {
                    roomId: roomId
                },
                { new: true }
            );

            if (!updatedAppointment) {
                throw new CustomError('Appointment not found', 404);
            }

            return updatedAppointment;
        } catch (error) {
            throw new CustomError(error.message, 500);
        }
    },
    update: async (id, appoinment) => {
        console.log(appoinment, 'in repo')
        const updatedAppoinment = await DoctorAppointment.findByIdAndUpdate(id, appoinment);
        return updatedAppoinment;
    },

    getAppointments: async (userId) => {
        try {
            return await DoctorAppointment.find({ patientId: userId })
        } catch (error) {
            throw new CustomError(error.message, 500)
        }
    }
    , getAppointmentsByDoctorId: async (doctorId) => {
        try {
            return await DoctorAppointment.find({ doctorId: doctorId })
        } catch (error) {
            throw new CustomError(error.message, 500)
        }
    },
    updateAppointmentUIState: async (id, data) => {
        try {
            const updatedAppointment = await DoctorAppointment.findByIdAndUpdate(
                id,
                {
                    $set: {
                        "uiState.buttonState": data.buttonState,
                        "uiState.attended": data.attended,
                        roomId: data?.roomId,
                    }
                },
                { new: true }
            );

            console.log(updatedAppointment, 'updatedAppointment in repo')
            return updatedAppointment;
        } catch (error) {
            throw new CustomError(error.message, 500)
        }
    },
    updateSumbit: async (id, data) => {
        try {
            const updatedAppointment = await DoctorAppointment.findByIdAndUpdate(
                id,
                {
                    $set: {
                        notes : data.notes,
                        "uiState.buttonState": data.status,
                        status: data.status,
                    }
                },
                { new: true }
            );

            console.log(updatedAppointment, 'updatedAppointment in repo')
            return updatedAppointment;
        } catch (error) {
            throw new CustomError(error.message, 500)
        }
    }
}

