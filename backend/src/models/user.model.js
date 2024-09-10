import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userschema = new Schema({
    user: {
        type: String,
        lowercase: true,
        unique: true,
        index: true,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        lowercase: true,
        require: true,
        index: true
    },
    password: {
        type: String,
        require: [true, "password is require"]
    },
    refreshtoken: {
        type: String,
    }

}, { timestamps: true })

export const newuser = mongoose.model("newuser", userschema)