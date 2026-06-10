
// require('dotenv').config({path: './env'});
import dotenv from "dotenv";
import connectdDB from "./db/index.js";

dotenv.config({
    path:"./env"
})
connectdDB();










/*
import mongoose, { connect } from "mongoose";
import {DB_NAME} from "./constants";


const mongoose =require("mongoose");
import {DB_NAME} from "./constants";
const express=require("express");
const app=express();

( async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        app.on("error",(error)=>{//db conncetd ho gaya but express db say connected nhi ho raha hai isliye ye function use kiye
            console.log('ERROR',error);
            throw error;  
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
            
        })
    }
    catch(error){
        console.log("ERROR",error);
        throw error;
    }
})
    */