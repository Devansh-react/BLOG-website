import express from "express"
import cors from "cors"
import connectDatabase from "./Db/DbConnect.js";
const app =express();
app.use(cors())
app.use(express.json())

connectDatabase();
const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=>{
    console.log(`the server is running on port ${PORT}`)
})