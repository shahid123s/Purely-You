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
            const {appointmentId, buttonState, attended} = req.body;
            console.log(req.body, 'req.body in doctorController');
            console.log(appointmentId, buttonState, 'appoinmentId, buttonState in doctorController');
            const result = await doctorService.updateUIState(appointmentId, {buttonState, attended});
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

    }
}