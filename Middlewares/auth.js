import jwt from "jsonwebtoken";
import Me from "../Models/Me.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import catchAsyncErrors from "./catchAsyncError.js";

export const isAuthenticatedUser = catchAsyncErrors(async function(req , res, next){
    const {token} = await req.cookies;
    if(!token){
        next(new ErrorHandler( 401,"You Are Not Logged In"));
    }
    let data = await jwt.verify(token , process.env.PRIVATE_KEY);
    req.me = await Me.findById(data._id);

    next();
})