import mongoose from "mongoose";

export default function connectMongoDb(){
    mongoose.connect(
        process.env.DATABASE_URL,
        {
          dbName: "MyPersonalPortfolio",
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        (err) =>
          err ? console.log(err) : console.log("Connected to  database "+process.env.DATABASE_URL)
      );
      
}