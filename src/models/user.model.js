import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
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
        refreshToken:{
            type:String
        }
},
{
    timestamps:true
}
);

// Mongoose 9+ pre-save hook (no next callback needed for async function)
//password ko encryption kar rahe hai
userSchema.pre("save", async function () {//yaha pr arrow function ka use mat karna bez arrow function ke pass this ka context nhi hota hai
    if (!this.isModified("password")) return;//jab password modify hua hai tb hi change karna h otherwise return kar do simple no need to change again
    this.password = await bcrypt.hash(this.password, 10);
});

//ye code compare karega user ne jo password enter kiya h or jo batabase me password encrypt hai kya dono same hai using bcrypt
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);//ye true or false me return karta hai 
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};


export const User=mongoose.model("User",userSchema); //ye User mongodb say direct connect kar sakta hai