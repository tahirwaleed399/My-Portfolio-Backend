import express from 'express';
import cookieParser from 'cookie-parser';
import MeRoutes from './Routes/Me.js';
import ProjectsRoutes from './Routes/Project.js';
import ContactRoutes from './Routes/Contact.js';
import TestimonialRoutes from './Routes/testimonial.js';
import ErrorMiddleware from './Middlewares/ErrorMiddleware.js';
import  bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
const app = express();
// app.enable("trust proxy");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:3000' , 'https://waleed-tahir.netlify.app'],
    
    credentials: true,
}))

app.use(MeRoutes)
app.use(ProjectsRoutes)
app.use(ContactRoutes)
app.use(TestimonialRoutes)
app.use(ErrorMiddleware)

app.use(express.static(path.resolve("./public")));
// app.get('*' , (req,res)=>{
//     res.sendFile(path.resolve("../myportfolio/build/index.html"))
//     console.log(path.resolve("../myportfolio/build/index.html"))
// })

export default app ;
