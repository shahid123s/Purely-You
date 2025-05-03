import CustomError from "../../utils/CustomError.js";
import { decodeRefreshToken, generateAccessToken, generateRefreshToken } from "../../utils/jwtUtils.js";
import { doctorRepository } from "../doctor/doctorRepository.js";
import { userRepository } from "../user/userRepository.js"
import { comparePassword, hashPassword } from "./utils/bcryptUtils.js";
import { adminRepository } from "../admin/adminRepository.js";

export const authServices = {
    patientAuthServices: {
        userLogin: async (email, password) => {
            try {
                const user = await userRepository.getUserByEmail(email);

                if (!user) {
                    throw new CustomError("User not found", 404);
                }

                let isMatch = await comparePassword(password, user.password);
                if (!isMatch) {
                    throw new CustomError('Invalid Crendentails', 406)
                }

                const [accessToken, refreshToken] = await Promise.all([
                    generateAccessToken(user._id, user.role),
                    generateRefreshToken(user._id, user.role)
                ]);

                return { accessToken, refreshToken };


            } catch (error) {
                throw new CustomError(error.message, 500);
            }
        },

        userRegister: async (userDetails = {}) => {

            try { 
                const isExist = await userRepository.isExistsUser(userDetails.email);
                if (isExist) {
                    throw new CustomError('User Arleady Exists', 409);
                }

                userDetails.password = await hashPassword(userDetails.password);

                await userRepository.createUser(userDetails);
                return userDetails;
            } catch (error) {
                throw new CustomError(error.message, 500);
            }

        },

        refreshToken: async (refreshToken) => {
            try {
                const decoded = await decodeRefreshToken(refreshToken);
                const accessToken = await generateAccessToken(decoded.userId, decoded.role);
                
                return accessToken;
            } catch (error) {
                throw new CustomError(
                    error.message,
                    500,
                )
            }
        }
    },

    doctorAuthServices: {
        doctorRegister: async (doctorData) => {
            try {
                console.log(doctorData, 'Doctor Register in Service');
                let doctor = await doctorRepository.createDoctor(doctorData);
                return doctor;
            } catch (error) {
                throw new CustomError(error.message, 500);
            }
        },

        doctorLogin: async (email, password) => {
            try {
                const doctor = await doctorRepository.getDoctorByEmail(email);

                if (!doctor) {
                    throw new CustomError("Doctor not found", 404);
                }
                
                let isMatch = await comparePassword(password, doctor.password);
                if (isMatch) {
                    throw new CustomError('Invalid Crendentails', 406)
                }

                const [accessToken, refreshToken] = await Promise.all([
                    generateAccessToken(doctor._id, doctor.role),
                    generateRefreshToken(doctor._id, doctor.role),
                ]);
                const roomId = crypto.randomUUID();
                // await
            return { accessToken, refreshToken, doctor:  { ...doctor, password: undefined, roomId } };


            } catch (error) {
                throw new CustomError(error.message, 500);
            }
        },

        doctorRefreshToken: async (refreshToken) => {
            try {
                const decoded = await decodeRefreshToken(refreshToken);
                const accessToken = await generateAccessToken(decoded.userId, decoded.role);
                return accessToken;
            } catch (error) {
                throw new CustomError(
                    error.message,
                    500,
                )
            }
        }

    },

    medicalAuthServices: {

    },
    adminAuthServices: {
        adminLogin: async (email, password) => {
            try {
                const admin = await adminRepository.getAdmin(email);

                if (!admin) {
                    throw new CustomError("Admin not found", 404);
                }

                let isMatch = await comparePassword(password, admin.password);
                if (!isMatch) {
                    throw new CustomError('Invalid Credentials', 406)
                }

                const {accessToken, refreshToken} = await Promise.all([
                    generateAccessToken(admin._id, admin.role),
                    generateRefreshToken(admin._id, admin.role)
                ]);

                return { accessToken, refreshToken };

            } catch (error) {
                throw new CustomError(error.message, 500);
            }
        },

        adminRegister: async (adminData) => {
            try {

                adminData.password = await hashPassword(adminData.password);

                let admin = await adminRepository.createAdmin(adminData);
                return admin;
            } catch (error) {
                throw new CustomError(error.message, 500);
            }
        },

        adminRefreshToken: async (refreshToken) => {
            try {
                const decoded = await decodeRefreshToken(refreshToken);
                const accessToken = await generateAccessToken(decoded.userId, decoded.role);
                return accessToken;
            } catch (error) {
                throw new CustomError(
                    error.message,
                    500,
                )
            }
        }
    }
}