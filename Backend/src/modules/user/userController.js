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