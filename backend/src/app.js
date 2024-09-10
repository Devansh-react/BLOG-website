import express from "express"
import cors from "cors"
impor


const app =express();




app.use(cors())
app.use(express.json())



const PORT = procress.env.PORT || 3000;

app.listen(PORT , ()=>{
    console.log(`the server is running on port ${PORT}`)
})