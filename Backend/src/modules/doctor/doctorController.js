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
   
    }
}