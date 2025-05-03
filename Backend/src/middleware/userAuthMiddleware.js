import CustomError from "../utils/CustomError.js";
import { decodeAccessToken } from "../utils/jwtUtils.js";

export const autheticateUser = async (req, res, next) => {
    const accessToken = req.cookies?.patientAccessToken;

    // Check if access token is missing
    if (!accessToken) {
        return res.status(401).json({ success: false, message: "Login Only" });
    }

    try {
        const decodedToken = await decodeAccessToken(accessToken);

        if (!decodedToken) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        req.patient = decodedToken.userId; // Attach user ID to request
        next();

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
}



export const autheticateDoctor = async(req, res, next) => {
    const accessToken = req.cookies?.doctorAccessToken;
    

    // Check if access token is missing
    if (!accessToken) {
        return res.status(401).json({ success: false, message: "Login Only" });
    }

    try {
        const decodedToken = await decodeAccessToken(accessToken);

        if (!decodedToken) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        req.doctor = decodedToken.userId; // Attach user ID to request
        next();

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }

}