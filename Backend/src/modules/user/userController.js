import { userServices } from "./userServices.js";

export const getPatientProfile = async (req, res, next) => {
    let {userId} = req.query;
    if(!userId) userId = req.patient;

    try {
        const result = await userServices.getUserDetails(userId);
        console.log(result, 'result in User Controller');
        if(!result) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "User Found",
            data: result
        })
    } catch (error) {
        next(error)
    }

}

export const getAllDoctors = async (req, res, next) => {
    try {
        const result = await userServices.getAllDoctors();
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
} 

export const getAppointments = async (req, res, next) => {
    try {
        const result = await userServices.getAppointmentsOfUser(req.patient);
        if(!result) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "User Found",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const bookAppointment = async (req, res, next) => {
    try {
        const patientId = req.patient;
        console.log({...req.body, patientId}, 'req.body in userController');

        const result = await userServices.bookAppointment({...req.body, patientId});

        if(!result) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "User Found",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const getDoctor = async (req, res, next ) => {
    try {
        const {doctorId} = req.query;
        const result = await userServices.getDoctorDetails(doctorId);
        if(!result) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "User Found",
            data: result
        })
    } catch (error) {
        next(error)
    }
}


export const getDoctorChat = async (req, res, next) =>{
    try {
        console.log(req.query, req.params)
        const {doctorId} = req.params;
        const patientId = req.patient;
        const result = await userServices.getDoctorChat(doctorId, patientId);
        if(!result) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "User Found",
            data: result
        })
    } catch (error) {
        next(error)
    }

}


export const sendMessage = async (req, res, next) => {
    try {
      
        const patientId = req.patient;
        const {doctorId, newMessage} = req.body;
        console.log(newMessage, 'newMessage in userController');
        console.log(req.body, 'req.body in userController')
        const result = await userServices.sendMessage({doctorId, patientId, newMessage});
        // if(!result) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "User Not Found",
        //     })
        // }
        return res.status(200).json({
            success: true,
            message: "User Found",
            // data: result
        })
    } catch (error) {
        next(error)
    }

}