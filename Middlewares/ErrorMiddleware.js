import ErrorHandler from '../Utils/ErrorHandler.js';

export default function (err, req, res, next){

err.message = err.message || 'Internal Server Error'
err.statusCode = err.statusCode || 500


if (err.message === 'jwt malformed') {
    const message = `Login To Access This `;
    err = new ErrorHandler(401 , message);
  }

res.status(err.statusCode).json(
    {
        success:false ,
        message:err.message
    }
)
}