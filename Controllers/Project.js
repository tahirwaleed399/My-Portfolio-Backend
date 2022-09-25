import catchAsyncErrors from "../Middlewares/catchAsyncError.js";
import Project from "../Models/Project.js";
import cloudinary from "cloudinary";

export const createProject = catchAsyncErrors(async function (req, res, next) {
  const resultUpload = await cloudinary.v2.uploader.upload(
    req.body.projectImage,
    { folder: "Portfolio/Projects" }
  );
  req.body.projectImage = {
    public_id: resultUpload.public_id,
    url: resultUpload.url,
  };
  let project = await Project.create(req.body);
  res.status(201).json({
    success: true,
    data: project,
  });
});

export const getProjects = catchAsyncErrors(async function (req, res, next) {
  // Add Image To Cloudinary
  let projects = await Project.find();
  res.status(201).json({
    success: true,
    data: projects,
  });
});

export const deleteProject = catchAsyncErrors(async function (req, res, next) {
  await cloudinary.v2.uploader.destroy(req.body.public_id);
  await Project.findOneAndDelete({ _id: req.body._id });
  res.status(200).json({
    success: true,
  });
});
export const getSingleProject = catchAsyncErrors(async function (
  req,
  res,
  next
) {
  let project = await Project.findById(req.body._id);
  res.status(200).json({
    success: true,
    data: project,
  });
});

export const updateProject = catchAsyncErrors(async function (req, res, next) {
  let {
    name,
    description,
    technologies,
    projectImage,
    githubLink,
    liveLink,
    _id,
    lastPublicId,
  } = req.body;
  if (!projectImage.startsWith("http")) {
    await cloudinary.v2.uploader.destroy(lastPublicId);
    let res = await cloudinary.v2.uploader.upload(projectImage, {
      folder: "Portfolio/Projects",
    });
    projectImage = {
      public_id: res.public_id,
      url: res.url,
    };
  } else {
    projectImage = {
      public_id: lastPublicId,
      url: projectImage,
    };
  }
  let updatedProject = await Project.findOneAndUpdate(
    { _id },
    { name, description, technologies, projectImage, githubLink, liveLink },
    {
      new: true,
    }
  );
  res.status(201).json({
    success: true,
    data: updatedProject,
  });
});

export const reorderProjects = catchAsyncErrors(async function (
  req,
  res,
  next
) {

let orderedProjects =  req.body ;
orderedProjects.forEach((project)=>delete project._id);
await Project.deleteMany({});
let projects = await Project.insertMany(orderedProjects);
res.status(200).json({
  success: true,
  data: projects,
});
});
