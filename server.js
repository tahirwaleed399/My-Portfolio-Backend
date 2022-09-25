import connectMongoDb from "./database.js";
import dotenv from 'dotenv';
dotenv.config({path : './Config/config.env'});
import cloudinary from 'cloudinary';
import app from "./app.js";

connectMongoDb();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});



app.listen(process.env.PORT , ()=>{
    console.log('Successfully listening at ' + process.env.PORT)
})