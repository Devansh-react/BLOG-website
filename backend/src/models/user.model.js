import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userschema = new Schema({
    username: {
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



// if user update anything but password it will run 
userschema.pre("/save", async function (password) {
    if (!this.modified("password")) return next();
})



// creating methods for authetication 
userschema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userschema.methods.gernaterefreshtoken = function () {
    return Jwt.sign(
        {
            id: this.id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expireIN: process.env.REFRESH_TOKEN_EXPIRY

        }


    )
}
userschema.methods.gernateaccesstoken = function () {
    return Jwt.sign(
        {
            id: this.id,
            user: this.user,
            email: this.email

        },
        process.env._ACCESS_TOKEN_SECRET,
        {
            expireIN: process.env.ACCESS_TOKEN_EXPIRY

        }


    )
}

