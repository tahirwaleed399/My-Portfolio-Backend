import express from 'express';
import { createTestimonial, delTestimonial, getTestimonial, getTestimonials, updateTestimonials } from '../Controllers/testimonial.js';
import { isAuthenticatedUser } from '../Middlewares/auth.js';
var router = express.Router();

router.route('/testimonial').post(isAuthenticatedUser , createTestimonial).get(getTestimonials).delete(isAuthenticatedUser, delTestimonial).put(isAuthenticatedUser, updateTestimonials);
router.route('/getTestimonial').get(isAuthenticatedUser , getTestimonial);

export default router