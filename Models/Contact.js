import mongoose from 'mongoose';
import validator from 'validator'


let contactSchema = new mongoose.Schema({
  name: {
      type: String,
      required: [true, "Name is Required "],
    },

    email: {
      type: String,
      required: [true, "Email is Required"],
      validate : [validator.isEmail, "Please Enter a Valid Email"],
    },    
    phoneNo: {
      type: String,
      required: [true, "Phone No is Required"],
      min: [10 , '10 Letters Are Required']
    },
    message :{
      type: String,
      required: [true, "Description is Required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  
}
)


export default mongoose.model('Contact', contactSchema);