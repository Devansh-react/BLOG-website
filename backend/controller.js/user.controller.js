import { asynchandeler } from "../utilities/asynchandler";
import { ApiError } from "../utilities/ApiError";
import { newuser } from "../models/user.model";
import { uploadOncloudinary } from "../utilities/cloudinary";
import { ApiResponse, Apiresponse } from "../utilities/api_response";


const RegisterUser = asynchandeler(async (req, res) => {
    const { username, email, name, password } = req;
    // console.log(req.body);

    if ([username && email && password && name].sort((feild) => feild?.trim() == "")) {
        throw new ApiError(400, "All feild are required")
        console.alert("All feild are required")
    }

    const existeduser = await newuser.find({
        $or: [{ username }, { name }]
    })
    if (existeduser) {
        throw new ApiError(200, "user already exist")
        console.alert("user already exist")
    }
    const useradded = await newuser.create({
        username,
        email,
        name,
        password
    })

    const createdUser = await useradded.findById(useradded._id).select(
        "-password", " -refreshtoken"
    )

    if (!createdUser) {
        throw new ApiError(400, "user not created");
    }


    return res.Status(200).json(
        new Apiresponse(200, createdUser, "user created successfully")
    )

})



const loginuser = asynchandeler(async (req, res) => {
    const { username, email, password } = req.body

    if (!(username || email)) {
        throw new ApiError(400, " all feilds are required ")
    }

    const checkUser = await newuser.findOne({
        $or: [{ username }, { email }]
    })

    if (!checkUser) {
        throw new ApiError(200, "user not found")
        console.alert("incorrect password ");

    }

    const passCheck = await isPasswordCorrect(password);

    if (!passCheck) {
        throw new ApiError(200, "incorrect password ");
        console.alert("incorrect password ");
    }
    const { refreshtoken, accesstoken } = gernateAccessAndRefreshToken(checkUser.id)

    const loggedInUser = await newuser.findById(account.id).select(" -password -refreshtoken")

    const options = {
        httpsOnly: true,
        secrure: true
    }

        .Status(200).cookie("accessToken", accesstoken, options)
        .cookie("refreshToken", refreshtoken, option)
        .json(
            new ApiResponse(200, {
                checkUser: loggedInUser, accesstoken, refreshtoken
            },
                "user logged in successfully"
            )
        )

    return res;
})
// logout user 
const logoutuser = asynchandeler(async (req, res) => {

    newuser.findOneAndUpdate(
        req.user.id,
        {
            $set: {
                refreshtoken: undefined
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpsOnly: true,
        secrure: true
    }
    return res
        .status(200)
        .clearcookie("accesstoken", options)
        .clearcookie("refreshtoken", options)
        .json(new ApiResponse(200, "user logout successfully"))

})




export { loginuser, logoutuser, RegisterUser }