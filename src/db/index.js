
import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";
const connectdDB=async ()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`\n mongoDB connected !! DB HOS |:${connectionInstance.connection.host}`);
        
    }
    catch(err){
        console.log('mongoose connection faild',err);
        process.exit(1);
        
    }
}
export default connectdDB;