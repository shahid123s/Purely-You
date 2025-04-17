import CustomError from "../utils/CustomError.js";

export const autheticateUser = async (req, res, next) => {
    try {
        console.log('Headers:', req.headers); // Debugging
        const authHead = req.headers['authorization'];

        console.log(authHead)

        if (!authHead || !authHead.startsWith('Bearer')) {
            throw new CustomError('Invalid Token', 401)
             
        }

        const token = authHead.split(' ')[1];
        if (!token) {
            throw new CustomError(
               'Invalid Token', 
               401,
            );
        }

        const decode = await decodeAccessToken(token);
        // console.log('Decoded Token:', decode); // Debugging

        if (!decode || decode.role !== USER) {
            throw new CustomError(
                'Invalid Token',
                401,
            );
        }

        req.user = decode;
        next();
    } catch (error) {
        console.error('Authentication Error:', error); // Debugging
        // next(error); // Pass the error to the errorHandler
    }
}