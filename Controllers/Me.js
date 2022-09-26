import catchAsyncErrors from "../Middlewares/catchAsyncError.js";
import Me from "../Models/Me.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";

export const Login = catchAsyncErrors(async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password)
    next(new ErrorHandler(401, "Email Or Passoword is Invalid"));
  const [me] = await Me.find({ email }).select("password");
  if (!me) next(new ErrorHandler(401, "Email Or Passoword is Invalid"));

  if (me.password === password) {
    let token = await jwt.sign({ _id: me._id }, process.env.PRIVATE_KEY, {
      expiresIn: process.env.JSON_WEB_TOKEN_EXPIRE_TIME,
    });
    res.status(200).cookie("token", token, { httpOnly: true, secure : req.secure ||
      req.headers['x-forwarded-proto'] === 'https' ||
      req.headers['x-forwarded-proto'] === 'http'  }).json({
      success: true,
    });
  } else {
    next(new ErrorHandler(401, "Email Or Passoword is Invalid"));
  }
});

export const getMe = catchAsyncErrors(async function (req, res, next) {
  const me = await Me.find().select("-password");

  res.status(200).json({
    success: true,
    data: me,
  });
});
export const updateMe = catchAsyncErrors(async function (req, res, next) {
  
  
if(req.body.skillCube){


  for (let i = 0; i <= req.body.skillCube.length - 1; i++) { 
    console.log(!req.body.skillCube[i].url.startsWith("http"));
            if (!req.body.skillCube[i].url.startsWith("http")) {
    
          let del = await cloudinary.v2.uploader.destroy(
            req.body.skillCube[i].public_id
          );
          let res = await cloudinary.v2.uploader.upload(req.body.skillCube[i].url, {
            folder: "Portfolio/SkillCube",
          });
          req.body.skillCube[i] = {
            public_id: res.public_id,
            url: res.url,
          };
        }
      }
    
}
if(req.body.aboutImage){
  if(!req.body.aboutImage.url.startsWith('http')){

    let del=  await cloudinary.v2.uploader.destroy(req.body.aboutImage.public_id)

      let res = await cloudinary.v2.uploader.upload(req.body.aboutImage.url , {folder:'Portfolio/MainImages'});
      req.body.aboutImage = {
        public_id:res.public_id,
        url : res.url
      }
    }
}
 if(req.body.mainImage){
  if(!req.body.mainImage.url.startsWith('http')){
    await cloudinary.v2.uploader.destroy(req.body.mainImage.public_id)
    let res = await cloudinary.v2.uploader.upload(req.body.mainImage.url , {folder:'Portfolio/MainImages'});
    req.body.mainImage = {
      public_id:res.public_id,
      url : res.url
    }
  }
 }

  const me =await Me.findOneAndUpdate({_id : req.me._id} , req.body , {new : true})
  res.status(200).json({
    success: true,
    data: me,
  });
});

export const Logout = catchAsyncErrors(async function (req, res, next) {
  const me = await Me.find().select("-password");

  res
    .status(200)
    .cookie("token", null, {
      expiresIn: Date.now(),
    })
    .json({
      success: true,
    });
});
