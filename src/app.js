import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" })) 
// JSON data ko request body se parse karta hai (API se aane wala JSON data read karne ke liye)

app.use(express.urlencoded({ extended: true, limit: "16kb" })) 
// Form data (application/x-www-form-urlencoded) ko parse karta hai, extended:true nested objects allow karta hai

app.use(express.static("public")) 
// Public folder ki files (images, CSS, PDFs, etc.) ko directly browser me access karne deta hai

app.use(cookieParser()) 
// Browser se aane wali cookies ko parse karke req.cookies me available kar deta hai


//routes import
import userRouter from './routes/user.routes.js'
import healthcheckRouter from "./routes/healthcheak.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comment.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"

//routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/dashboard", dashboardRouter)

// http://localhost:8000/api/v1/users/register

export { app }