import express from 'express';
import { contact, getContacts } from '../Controllers/Contact.js';
import { isAuthenticatedUser } from '../Middlewares/auth.js';
var router = express.Router();


router.route('/contact').post(contact).get(isAuthenticatedUser,getContacts)


export default router
