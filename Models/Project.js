import mongoose from "mongoose";

let projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required "],
  },
  projectImage: {
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
    required: [true, "Projcet Image are Required"],
  },
  description: {
    type: String,
    required: [true, "Description is Required"],
  },
  technologies: {
    type: [{
      id : String ,
      tag : String
    }],
    required: [true, "Techs is Required"],
  },
  githubLink: String,
  liveLink: String,
});

export default mongoose.model("Project", projectSchema);
