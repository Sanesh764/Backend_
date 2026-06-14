import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Controller function jo registration request handle karta hai.
const registerUser = asyncHandler(async(req,res)=>{
    //get user details from frontend
    //validation-not empty
    //cheak if user already exists:username,email
    //cheak for image ,cheak for avatar
    //uploade them to cloudinary,avatar
    //create user object-create entry in db
    //remove password and refresh token filed from response
    //cheak for user creation
    //return response

    //Frontend se user details receive hoti hain.
    const {fullName,email,username,password}=req.body;
    console.log("email :",email);
    
//Check karega ki koi field empty to nahi hai.
// Example:
// email=""
// Result:
// throw new ApiError(400,"All fields are required")
    if(
        [fullName,email,username,password].some((field)=>
        field?.trim()==="")
    ){
        throw new ApiError(400, "All fields are required");
    }
    /**
     Purpose

Check karo:
Username already exist?
Email already exist?
MongoDB Operator:
$or
Means:
username OR email
     */
    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"user with email or username is already exist");
    }

    // Extract local file paths with safety checks
    let avatarLocalPath;
    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path;
    }

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if(!avatarLocalPath){//Avatar mandatory hai.
        throw new ApiError(400,"vatar file is required");
    }

    //Local image ko Cloudinary par upload karna.
    const avatar= await uploadOnCloudinary(avatarLocalPath);
    const coverImage=await uploadOnCloudinary(coverImageLocalPath);
    if(!avatar){
        throw new ApiError(400,"vatar file is required");    
    }

    /*
    MongoDB me user document create karna.
    Why username.toLowerCase()?
    Sanesh7644
    Store:
    sanesh7644
Consistency maintain hoti hai.
    */ 
    const user= await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

//     Client ko password aur refreshToken nahi bhejna.

// Security Best Practice.
    const createdUser= await User.findById(user._id).select(
        "-password -refereshToken"
        //ye oo chij hai jo hamko nhi chahiye
    )
    //check karo user successfully create hua ya nahi.
    if(!createdUser){
        throw new ApiError(500,"something want wrong while registering the user");
    }

    //send response
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Successfully")
    )
})

export {registerUser};