import mongoose from 'mongoose';
import validator from 'validator'


let testimonialSchema = new mongoose.Schema({
name :{
    type : String ,
    required:[true , 'Name is Required']
},
message : {
    type : String ,
    required:[true ,'Message is Required']
}
,
image : {
    type :{
        public_id : String ,
        url : String 
    },
    required : true 
}
}
)


export default mongoose.model('Testimonial', testimonialSchema);