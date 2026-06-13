import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrpyt from "bcrypt";
const userSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String,//clodninary url
            required:true,
        },
        coverImage:{
            type:String,//cloudinary url
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"video"
            }
        ],
        password:{
            type:String,
            required:[true,"password is required"]
        },
        refereshToken:{
            type:String
        }
},
{
    timestamps:true
}
);

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password=bcrpyt.hash(this.password,10);
    next();
});

userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrpyt.compare(password,this.password)
}
userSchema.methods.generateAccessToekn=function (){
    jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env. ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToekn=function (){
    jwt.sign(
        {
            _id:this._id,
        },
        process.env. REFERESH_TOKEN-SECRET,
        {
            expiresIn:process.env.REFERESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model("User",userSchema); 