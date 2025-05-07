import { doctorService } from "./doctorService.js";



export const doctorController = {
    getDoctors : async (req, res, next) => {
        try {
            const result = await doctorService.getDoctors();
            if(!result) {
                return res.status(404).json({
                    success: false,
                    message: "No Doctors Found",
                })
            }
            return res.status(200).json({
                success: true,
                message: "Doctors Found",
                data: result
            })
        } catch (error) {
            next(error)
        }
   
    },
    getAppoinments: async (req, res, next) => {
        try {
            const doctorId = req.doctor;
            console.log(doctorId, 'doctorId in doctorController');
            const result = await doctorService.getAppoinments(doctorId);
            if(!result) {
                return res.status(404).json({
                    success: false,
                    message: "No Appoinments Found",
                })
            }
            return res.status(200).json({
                success: true,
                message: "Appoinments Found",
                data: result
            })
        } catch (error) {
            next(error)
        }
    },
    actionAppoinment: async (req,res, next) => {
        try {
            const {appointmentId, action} = req.body;
            console.log(req.body, 'req.body in doctorController');
            console.log(appointmentId, action, 'appoinmentId, action in doctorController');
            const result = await doctorService.actionAppoinment(appointmentId, action);
            console.log(result, 'result in doctorController');  
            if(!result) {
                return res.status(404).json({
                    success: false,
                    message: "No Appoinments Found",
                })
            }
            return res.status(200).json({
                success: true,
                message: "Appoinments Found",
                data: result
            })
        } catch (error) {
            next(error)
        }
    
    },
    updateUIState: async(req, res, next) => {
        try {
            const {appointmentId, buttonState, attended, roomId} = req.body;
            console.log(req.body, 'req.body in doctorController');
            console.log(appointmentId, buttonState, 'appoinmentId, buttonState in doctorController');
            const result = await doctorService.updateUIState(appointmentId, {buttonState, attended, roomId});
            console.log(result, 'result in doctorController');
            if(!result) {
                return res.status(404).json({
                    success: false,
                    message: "No Appoinments Found",
                })
            }
            return res.status(200).json({
                success: true,
                message: "Appoinments Found",
                data: result
            })
        } catch (error) {
            next(error)
        }

    },
    updateRecords: async(req, res, next) => {
        try {
            const {appointmentId, notes, status,} = req.body;
            console.log(req.body, 'req.body in doctorController');  
            const result = await doctorService.updateRecords(appointmentId, notes, status);
            console.log(result, 'result in doctorController');
            if(!result) {
                return res.status(404).json({
                    success: false,
                    message: "No Appoinments Found",
                })
            }
            return res.status(200).json({
                success: true,
                message: "Appoinments Found",
                data: result
            })
        } catch (error) {
            next(error)
        }

    }, 
    getChats: async (req, res, next) => {
        try {
            const doctorId = req.doctor;
            const result = await doctorService.getChats(doctorId);
            if(!result) {
                return res.status(404).json({
                    success: false,
                    message: "No Appoinments Found",
                })
            }
            return res.status(200).json({
                success: true,
                message: "Appoinments Found",
                data: result
            })
        } catch (error) {
            next(error)
        }

    }, 
    getPatientChat: async (req, res, next) => {
        try {
            console.log(req.query, req.params)
            const {patientId} = req.query;
            const doctorId = req.doctor;
            const result = await doctorService.getChat(doctorId, patientId);
            if(!result) {
                return res.status(404).json({
                    success: false,
                    message: "No Appoinments Found",
                })
            }
            return res.status(200).json({
                success: true,
                message: "Appoinments Found",
                data: result
            })
        } catch (error) {
            next(error)
        }

    }, 
    sendMessage: async (req, res, next) => {
        try {
            const {chatId, newMessage} = req.body;

            console.log(req.body, 'req.body in doctorController');
            const result = await doctorService.sendMessage(chatId, newMessage);
            if(!result) {
                return res.status(404).json({
                    success: false,
                    message: "No Appoinments Found",
                })
            }
            return res.status(200).json({
                success: true,
                message: "Appoinments Found",
                data: result
            })
        } catch (error) {
            next(error)
        }

    }   
}