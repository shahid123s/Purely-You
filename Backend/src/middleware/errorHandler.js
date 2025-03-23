const errorHandler = (err, req, res, next) => {

    // if (!res.headersSent) {
    //     res.status(statusCode).json({
    //         success: false,
    //         message: message,
    //         errorCode: err.errorCode || 'UNKNOWN_ERROR',
    //     });
    // }

    console.log(err.stack)
    // Log the error for debugging
    console.error('Error:', err);

    // Set default status code and message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Send the error response
    res.status(statusCode).json({
        success: false,
        message: message,
        errorCode: err.errorCode || 'UNKNOWN_ERROR',
    });

    // Optionally call next() if needed for further error handling
    // next();
};

export default errorHandler;