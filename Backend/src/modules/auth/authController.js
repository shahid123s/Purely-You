
import { calculateExperience } from "../../utils/calculateExpirence.js";
import { authServices } from "./authServices.js";



export const authController = {

    // User Login
    userLogin: async (req, res, next) => {
        const { email, password } = req.body;
        console.log(email, password, req.body, 'User Login in Controller')
        try {

            const {accessToken, refreshToken, name} = await authServices.patientAuthServices.userLogin(email, password);

            console.log(accessToken, refreshToken, 'Access Token and Refresh Token in Controller')

            res.cookie('patientRefreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.cookie('patientAccessToken', accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res
                .status(200)
                .json({
                    success: true,
                    message: "User Login Successfully",
                    accessToken,
                    name,
                })

        } catch (error) {
            next(error)
        }
    },

    // User Registration 
    userRegister: async (req, res, next) => {
        const { userDetails } = req.body;


        try {
            if(!userDetails) {
                return res.status(404).json({success: false, message: "Give All Data to Register"})
            }
            const result = await authServices.patientAuthServices.userRegister(userDetails);
            if (result) {
                res.status(200).json({
                    success: true,
                    message: "User Registered Successfully",
                    data: result
                })

            }
        } catch (error) {
            next(error)
        }

    },

    userRefreshToken: async (req, res, next) => {
        try {
            const { patientRefreshToken } = req.cookies;
            if (!patientRefreshToken) {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message: 'Unauthorised',
                    })
            }
            const result = await authServices.patientAuthServices.refreshToken(patientRefreshToken);
            if (!result) {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message: 'Unauthorised',
                    })
            }
            res.cookie('patientAccessToken', result, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return res
                .status(200)
                .json({
                    succes: true,
                    accessToken: result
                })
        } catch (error) {
            next(error)
        }
    },

    userLogout: async (req, res, next) => {
        try {
            res.clearCookie('patientRefreshToken');
            res.clearCookie('patientAccessToken');
            return res
                .status(200)
                .json({
                    success: true,
                    message: "User Logout Successfully",
                })
        } catch (error) {
            next(error)
        }
    },

    doctorRegister: async (req, res, next) => {
        const { doctorData } = req.body;
        doctorData.experince = calculateExperience(doctorData.registerYear)
        try {
            let result = await authServices.doctorAuthServices.doctorRegister(doctorData);
            console.log(result)
            if (result) {
                return res.status(200).json({
                    success: true,
                    message: "Doctor Registered Successfully",
                    data: result
                })
            }
            return res.status(500).json({succes: false})
        } catch (error) {
            next(error)
        }
    },

    doctorLogin: async (req, res, next) => {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Please provide email and password',
                    })
            }
            const {accessToken, refreshToken, doctor} = await authServices.doctorAuthServices.doctorLogin(email, password);



            res.cookie('doctorRefreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.cookie('doctorAccessToken', accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res
                .status(200)
                .json({
                    success: true,
                    message: "Doctor Login Successfully", 
                    doctor
                })

        } catch (error) {
            next(error)
        }
    },

    doctorRefreshToken: async (req, res, next) => {
        try {
            const { doctorRefreshToken } = req.cookies;
            if (!doctorRefreshToken) {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message: 'Unauthorised',
                    })
            }
            const result = await authServices.doctorAuthServices.doctorRefreshToken(doctorRefreshToken);
            if (!result) {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message: 'Unauthorised',
                    })
            }
            res.cookie('doctorAccessToken', result, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return res
                .status(200)
                .json({
                    success: true,
                    accessToken: result
                })
        } catch (error) {
            next(error)
        }
    },

    doctorLogout: async (req, res, next) => {
        try {
            res.clearCookie('doctorRefreshToken');
            res.clearCookie('doctorAccessToken');
            return res
                .status(200)
                .json({
                    success: true,
                    message: "Doctor Logout Successfully",
                })
        } catch (error) {
            next(error)
        }
    },

    // Admin Login
    adminLogin: async (req, res, next) => {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Please provide email and password',
                    })
            }
            const {accessToken, refreshToken} = await authServices.adminAuthServices.adminLogin(email, password);

            res.cookie('adminRefreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.cookie('adminAccessToken', accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res
                .status(200)
                .json({
                    success: true,
                    message: "Admin Login Successfully"
                })

        } catch (error) {
            next(error)
        }
    },

    // Admin Refresh Token
    adminRefreshToken: async (req, res, next) => {
        try {
            const { adminRefreshToken } = req.cookies;
            if (!adminRefreshToken) {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message: 'Unauthorised',
                    })
            }
            const result = await authServices.adminAuthServices.adminRefreshToken(adminRefreshToken);
            if (!result) {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message: 'Unauthorised',
                    })
            }
            return res
                .status(200)
                .json({
                    success: true,
                    accessToken: result
                })
        } catch (error) {
            next(error)
        }
    },

    // Admin Logout
    adminLogout: async (req, res, next) => {
        try {
            res.clearCookie('adminRefreshToken');
            res.clearCookie('adminAccessToken');
            return res
                .status(200)
                .json({
                    success: true,
                    message: "Admin Logout Successfully",
                })
        } catch (error) {
            next(error)
        }
    },

    // Admin Registration
    adminRegister: async (req, res, next) => {
        const { email, password } = req.body;
        console.log(req.body, 'Admin Register in Controller');
        try {
            let result = await authServices.adminAuthServices.adminRegister({email, password});
            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Admin Registered Successfully",
                    data: result
                })
            }
        } catch (error) {
            next(error)
        }
    }
}