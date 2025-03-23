import { authServices } from "./authServices.js";



export const authController = {

    // User Login
    userLogin : async (req, res, next) => {
        const {email, password} = req.body;
        try {
    
            const [accessToken, refreshToken]  = await authServices.patientAuthServices.userLogin(email, password);

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
                    username,
                })

        } catch (error) {
            next(error)
        }
    },

    // User Registration 
    userRegister : async (req, res, next) => {
        const { userDetails } = req.body;

       try {
        const result = authServices.patientAuthServices.userRegister(userDetails);
        if(result){
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

    userRefreshToken : async (req, res, next) => {
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

    userLogout : async (req, res, next) => {
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

    doctorRegister : async (req, res, next) => {
        const {doctorData} =  req.body;
        try {
            let result = await authServices.doctorAuthServices.doctorRegister(doctorData);
            if(result){
                res.status(200).json({
                    success: true,
                    message: "Doctor Registered Successfully",
                    data: result
                })
            }
        } catch (error) {
            next(error)
        }
    },

    doctorLogin: async(req, res, next) => {
        const {email, password} = req.body;
        try {
            if(!email || !password){
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Please provide email and password',
                    })
            }
            const [accessToken, refreshToken] = await authServices.doctorAuthServices.doctorLogin(email, password);

            
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
                    message: "Doctor Login Successfully"
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
    }

}