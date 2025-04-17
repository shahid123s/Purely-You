import jwt from 'jsonwebtoken';
import CustomError from './CustomError.js';
import { appConfig } from '../config/appConfig.js';

const {accessExpiry, accessSecret, refreshExpiry, refreshSecret} = appConfig.jwt


/**
 * Generate Access Token using jsonwebtoken
 * @param {string} userId -- Mongodb user objectId
 * @param {string} role -- The user role to be assigned for user
 * @returns {Promise<string>} -- Access Token 
 */

export const generateAccessToken = async (userId, role) => {
    return jwt.sign(
        {userId, role},
        accessSecret,
        {expiresIn: accessExpiry}
    );
};

/**
 * Generate Refresh Token using jsonwebtoken
 * @param {string} userId -- Mongodb user objectId
 * @param {string} role -- The user role to be assigned for user
 * @returns {Promise<string>} -- Access Token 
 */

 export const generateRefreshToken = async (userId, role) => {
    return jwt.sign(
        {userId, role},
        refreshSecret,
        {expiresIn :refreshExpiry},
    );
};

/**
 * Decode Access Token using jsonwebtoken
 * @param {string} accessToken -- The valuating accessToken
 * @returns {Promise<object>} -- Decoded Object
 */

export const decodeAccessToken = async (accessToken) => {
    try {
        return jwt.verify(accessToken, accessSecret);
    } catch (error) {
        console.error(error)
        throw new CustomError('Invalid or Expired Access Token', 401, );
    }
}


/**
 * Decode Refresh Token using jsonwebtoken
 * @param {string} refreshToken -- The valuating accessToken
 * @returns {Promise<object>} -- Decoded object
 */

export const decodeRefreshToken = async (refreshToken) => {
    try {
        return jwt.verify(refreshToken, refreshSecret);
    } catch (error) {
        console.error(error)
        throw new CustomError('Invalid or Expired Access Token', 401, );
    }
}

