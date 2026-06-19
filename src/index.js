 
 //method 2 
//  require('dotenv').config({path: './env'});//method1

import dotenv from "dotenv";
import mongoose from "mongoose";
import {DB_NAME} from "./constants.js";
import connectDB from "./db/index.js";
import dns from "dns";
import { app } from "./app.js";

const port=process.env.PORT || 8000;

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);

dotenv.config({
    path:'./.env'
})

//method 2 to connected datbase
connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`⚙️   server is running at port :${port}`);
        
    })
})
.catch((err)=>{
    console.log("mongodb connection faild !!! ",err);
})




//method 1

// import express from "express";


// ( async ()=>{
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("error:",error);
//             throw error;
            
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on port ${process.env.PORT}`);
            
//         })
//     }
//     catch(error){
//         console.error("Error ",error);
        
//     }
// })