import { adminServices } from "./adminServices.js";


export const adminController = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await adminServices.getAllUsers();
            if(!users) {
                return res.status(404).json({ message: "No users found" });
            }   
            return res
            .status(200)
            .json({
                success: true,
                message: "Users found",
                data: users
            })
        } catch (error) {
            next(error);
        }
    },
    getAllApprovedDoctors: async (req, res, next) => {
        try {
            const doctors = await adminServices.getAllApprovedDoctors();
            if(!doctors) {
                return res.status(404).json({ message: "No doctors found" });
            }   
            return res
            .status(200)
            .json({
                success: true,
                message: "Doctors found",
                data: doctors
            })
        } catch (error) {
            next(error);
        }
    },
    getAllPendingDoctors: async (req, res, next) => {
        try {
            const doctors  = await adminServices.getAllPendingDoctors();
            if(!doctors) {
                return res.status(404).json({ message: "No doctors found" });
            }
            return res
            .status(200)
            .json({
                success: true,
                message: "Doctors found",
                doctors,
            })
        } catch (error) {
            next(error)
        }
    },
    toogelDoctorStatus: async (req, res, next) => {
        try {
            const {doctorId} = req.body;
            console.log(doctorId, 'doctorId in adminController', req.body);
            const result = await adminServices.toogelDoctorStatus(doctorId);
            if(!result) {
                return res.status(404).json({ message: "No doctors found" });
            }
            return res
            .status(200)
            .json({
                success: true,
                message: "Doctors found",
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}