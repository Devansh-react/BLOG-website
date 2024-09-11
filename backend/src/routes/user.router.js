import { Router } from "express";
import { uploadOncloudinary } from "../../utilities/clouidinary";
import { upload } from "../middleware/multer";
import { RegisterBlog } from "../../controller.js/blog.controller";
import { loginuser, logoutuser, RegisterUser } from "../../controller.js/user.controller";

const route = Router()
route.route("/upload").post(
    upload.fields([
        {
            name: "Coverimage",
            maxCount: 1
        }
    ]),

    RegisterBlog
)
//routing 
route.route("/login", loginuser)
route.route("/logout", logoutuser)
route.route("/signin", RegisterUser)