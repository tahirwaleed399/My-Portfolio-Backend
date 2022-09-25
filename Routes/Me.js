import express from 'express';
import { getMe, Login ,Logout, updateMe} from '../Controllers/Me.js';
import { isAuthenticatedUser } from '../Middlewares/auth.js';
var router = express.Router();


router.route('/me').get(getMe)
router.route('/login').post(Login)
router.route('/logout').get(Logout)
router.route('/updateMe').put(isAuthenticatedUser, updateMe)
router.route('/isAuthenticated').get(isAuthenticatedUser, (req ,res , next)=>{
    console.log( req.me)
    res.status(200).json({
        success : true ,
        data : req.me
    })
} )
export default router