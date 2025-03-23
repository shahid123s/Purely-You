/**
 * @param {string} message - Error message
 * @param {number}statusCode - HTTP status code
 * @param {string}errorCode - Error code
 */
class CustomError extends Error {
    constructor(message, statusCode, errorCode) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
    }
}

export default CustomError;