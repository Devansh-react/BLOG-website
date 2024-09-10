import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({

    Name: {
        type: string,
        require: true,
        trime: true
    },
    Role: {
        type: string,
        require: true,
        trime: true
    },
    title: {
        type: string,
        // lowercase: true,
        require: true,
    },
    catagory: {
        type: string,
        lowercase: true,
        require: true
    },
    intro: {
        type: string,
        lowercase: true,
        require: true
    },
    coverimage: {
        type: String,// cloudinary url
        default: null,

    },




}, { timestamps: true })


export const blog = mongoose.model("blog", BlogSchema);

