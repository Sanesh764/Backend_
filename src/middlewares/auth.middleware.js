import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import {jwt} from "jsonwebtoken"; 


export const veryfyJwt=asyncHandler(async(req,_,next)=>{//res ke jagah yaha pr hai _ 
   try{
        const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")

        if(!token){
            throw new ApiError(401,"unAuthorized request")
        }
        const decodedToken=jwt.veryfy(token,process.env.ACCESS_TOKEN_SECRET)

        const user= await User.findById(decodedToken?._id).select("-password -refereshToken")
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }

        req.user=user;
        next()
    } catch(error){
        throw new ApiError(401,error?.message || "invalid access token")
    }
})