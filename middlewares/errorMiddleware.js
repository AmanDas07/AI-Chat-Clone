import errorResponse from "../utils/errorResponse.js";

const errorHandler = (err, req, res, next) => {

    let error = [...err];
    err.message = err.message;


    //mongoose cast error
    if (err.name === 'castError') {
        const message = "Reference Error";
        error = new errorResponse(message, 404);
    }

    //Duplicate Key error
    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new errorResponse(message, 400);
    }

    //Mongoose VAlidation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message)
        error = new errorResponse(message, 400);
        res.status(error.stausCode || 500).json({
            success: false,
            error: error.message || "Server Error"
        })
    }


}

export default errorHandler;