const express=require('express');
const app=express();
const cors=require("cors");
require("dotenv").config();
const cookieParser=require("cookie-parser");

//handle krenge cors policy wala policy

app.use(cookieParser());
const corsOptions={
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE",
    credentials:true,
}
app.use(cors(corsOptions));

app.use(express.json());

const fileUpload=require("express-fileupload");
// app.use(fileUpload());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/temp/',
   
}))

const db=require("./config/dataBase.jsx");
db.connect();

const cloudinary=require("./config/cloudinary.jsx")
cloudinary.cloudinaryConnect();

const Upload=require("./Routes/imageUpload.jsx");
app.use('/blinkit',Upload);

PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})
