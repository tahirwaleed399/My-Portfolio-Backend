import catchAsyncErrors from '../Middlewares/catchAsyncError.js'
import nodemailer from "nodemailer";
import Contact from '../Models/Contact.js';


export const contact = catchAsyncErrors(async function(req , res , next){
   
    const {name , email , phoneNo , message }= req.body ;
  
      const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        secure:false,
        service: 'gmail',
        port:587,
        auth: {
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions={
        from: `Waleed Codez`, // sender address
        to: 'tahirwaleed399@gmail.com', // List of recipients
        subject: 'Contact Form', // Subject line
        text: `Hi my name is ${name} and my Email is ${email} and My Phone No is ${phoneNo} and I want to Say ${message}`
      }
      transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
    });
    let form = await Contact.create({name , email , phoneNo , message })

res.status(200).json({
    success : true , 
    data : form
})
})


export const getContacts = catchAsyncErrors(async function(req,res,next){
const contacts = await Contact.find();
res.status(200).json({
  success : true ,
  data : contacts
})
})