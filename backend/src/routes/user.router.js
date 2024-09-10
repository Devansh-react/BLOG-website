import { Router } from "express";
import { uploadOncloudinary } from "../../utilities/clouidinary";
import { upload } from "../middleware/multer";
import { RegisterBlog } from "../../controller.js/blog.controller";

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