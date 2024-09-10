import { asynchandeler } from "../utilities/asynchandler";
import { ApiError } from "../utilities/ApiError";
import { newuser } from "../models/user.model";
import { uploadOncloudinary } from "../utilities/cloudinary";
import { Apiresponse } from "../utilities/api_response";


const RegisterBlog = asynchandeler(async (req, res) => {

    const { Name, Role, title, catagory, intro } = req.body;
    console.log(req.body);
    // to check if user has filled all the feild 

    if ([Name && Role && title && catagory && intro && coverimage].some((feild) => feild?.trim() == "")) {
        throw new ApiError(400, " All feild are required ")
    }

    const checkUser = await newuser.find({
        $or: [{ Name }]
    })
    // to check if user is loged in or not 
    if (!checkuser) {
        throw new ApiError(200, "user not found")
    }

    const Coverimage = req.feilds?.Coverimage[0].path;

    if (Coverimage.lengt == 0) {
        throw new ApiError(400, "cover image not found ");
    }

    //uploading image to cloudinary 
    const coverimageCloud = await uploadOncloudinary(Coverimage);

    // adding blog to the databse 
    const NewBlog = await newuser.create({
        Name,
        Role,
        title,
        intro,
        coverimage: coverimageCloud.url
    });


    const blogdata = NewBlog.findById(coverimageCloud._id)

    if (!blogdata) {
        throw new ApiError(200, "Error while creating blog")
    }
    return res.status().json(
        new Apiresponse(200, blogdata, "blog created successfully")
    )
});
export { RegisterBlog }


