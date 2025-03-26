import bcrypt from 'bcrypt'

/**
 * Hashes a password using bcrypt
 * @param {string} password - The plain text password
 * @returns {Promise<string>} - The hashed password
 */
 export const hashPassword = async (password) => {
    if(!password) throw new Error('Password is Required for hashing')
    
        const salt  = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
 }

 /**
 * Compares a plain text password with a hashed password
 * @param {string} password - The plain text password
 * @param {string} hashedPassword - The hashed password stored in DB
 * @returns {Promise<boolean>} - True if passwords match, otherwise false
 */
export const comparePassword = async (password, hashedPassword) => {
    if(!password || !hashedPassword) throw new Error('Both password and hashed passwor is required');

    return await bcrypt.compare(password, hashedPassword)
 }
 
