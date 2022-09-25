import catchAsyncErrors from "../Middlewares/catchAsyncError.js";
import Testimonial from "../Models/Testimonial.js";
import cloudinary from "cloudinary";

export const createTestimonial = catchAsyncErrors(async function (
  req,
  res,
  next
) {
  let { name, message, image } = req.body;

  if (image.url.length > 50) {
    const { url, public_id } = await cloudinary.v2.uploader.upload(image.url, {
      folder: "Portfolio/testimonials",
    });
    image = {
      url,
      public_id,
    };
  }

  let testimonial = await Testimonial.create({ name, message, image });

  res.status(200).json({
    success: true,
    data: testimonial,
  });
});

export const getTestimonials = catchAsyncErrors(async function (
  req,
  res,
  next
) {



  let testimonials = await Testimonial.find();

  res.status(200).json({
    success: true,
    data: testimonials,
  });
});
export const getTestimonial = catchAsyncErrors(async function (
  req,
  res,
  next
) {

const id = req.query.id ;

  let testimonial = await Testimonial.findOne({_id :id});

  res.status(200).json({
    success: true,
    data: testimonial,
  });
});

export const delTestimonial = catchAsyncErrors(async function (
  req,
  res,
  next
) {


const {_id ,image} = req.body ;

await cloudinary.v2.uploader.destroy(image.public_id);
  let testimonial = await Testimonial.findByIdAndDelete({_id});

  res.status(200).json({
    success: true,
    data: testimonial,
  });
});


export const updateTestimonials = catchAsyncErrors(async function (
  req,
  res,
  next
) {


let {name , message , image , _id} = req.body ;


    if(!image.url.startsWith('http')){
      let reso=   await cloudinary.v2.uploader.destroy(image.public_id);
        const {url , public_id} =  await cloudinary.v2.uploader.upload(image.url , {folder:'Portfolio/testimonials'});
        image = {url ,public_id};
    }


const testimonial = await Testimonial.findByIdAndUpdate({_id},  {name , message , image} , { new:true})

  res.status(200).json({
    success: true,
    data: testimonial,
  });
});
