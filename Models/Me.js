import mongoose from "mongoose";
import validator from "validator";

let meSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required "],
  },

  email: {
    type: String,
    required: [true, "Email is Required"],
    validate: [validator.isEmail, "Please Enter a Valid Email"],
    unique:[true , 'Email Already in use']
  },

  tagLines: {
    type: [String],
    required: [true, "Taglines are Required"],
  },
  homeAbout: {
    type: String,
    required: [true, "Home About is Required"],
  },
  mainImage: {
    type: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    required: [true, "Main Image are Required"],
  },
  about: {
    type: String,
    required: [true, "About is Required"],
    min: [100, "100 Letters Are Required "],
  },  resume: {
    type: String,
    required: [true, "resume is Required"],
    default:'i am resume',
  },
  aboutImage: {
    type: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    required: [true, "About Image are Required"],
  },
  skills: {
    type: [
      {
        name: String,
        color: String,
        percentage:Number,
      },
    ],
    required: [true, "Skills Are Required"],
  },
  skillCube: {
    type: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      }
    ],
    required: [true, "Skill Cube Images Are Required"],
  },
  timeLine: {
    type: [
      {
        title: String,
        year: String,
      },
    ],
    required: [true, "TimeLine Is Required"],
  },

  password: {
    type: String,
    required: [true, "Password Cannot be Empty "],
    select : false
  },
});
export default mongoose.model("Me", meSchema);

