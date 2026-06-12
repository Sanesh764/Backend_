
import express from "express";
import express from "express";
import cookieParser from "cookie-parser";
const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))
export { app }