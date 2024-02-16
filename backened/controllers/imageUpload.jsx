const cloudinary = require("cloudinary").v2;
const Image = require("../models/Images.jsx");
const User = require("../models/user.jsx");

async function uploadFileToCloudinary(file, folder) {
  const options = {
    folder,
    public_id: file.name,
    resource_type: "auto",
  };

  console.log(file.tempFilePath);
  console.log("folder maiinn jayga", folder);
  // Use await when calling cloudinary.uploader.upload
  const response = await cloudinary.uploader.upload(file.tempFilePath, options);
  return response;
}

// image upload handler
exports.imageUpload = async (req, res) => {
  try {
    console.log("imageUpload me 21", req.User);
    const name = req.User.firstName;
    const email = req.User.email;
    // console.log("name is", name);

    const image = req.files.Image;
    //console.log(image);

    // file format match
    const response = await uploadFileToCloudinary(image, "imageUpload");
    //console.log(response);

    //  db main entry save
    const fileData = await Image.create({
      user: req.User.userId,
      name,

      imageURL: response.secure_url,
    });

    const updatedUser = await User.findOneAndUpdate(
      { email: email }, // Replace with the correct email
      { $push: { Images: fileData } }, // Assuming fileData._id is the image ID
      { new: true }
    );

    console.log("User with updated Images array:", updatedUser);

    res.json({
      success: true,
      image_Url: response.secure_url,
      message: "Image Uploaded Successfully",
    });
  } catch (error) {
    console.error("Hello", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get all the images
exports.getImages = async (req, res) => {
  try {
    const ImagesData = await Image.find();

    res.status(200).json({
      success: true,
      Images: ImagesData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error.message,
    });
  }
};
