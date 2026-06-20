
// import dotenv from "dotenv";
// dotenv.config();
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const API_KEY = process.env.YOUR_GEMINI_API_KEY;

// async function checkApiKey() {
//   try {
//     const genAI = new GoogleGenerativeAI(API_KEY);

//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash",
//     });

//     const result = await model.generateContent("Hello");

//     console.log("✅ API Key is valid");
//     console.log(result.response.text());

//   } catch (error) {
//     console.log("❌ API Key is invalid or has an issue");
//     console.log(error.message);
//   }
// }

// checkApiKey();

import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY=process.env.YOUR_GEMINI_API_KEY;
async function cheakApiKey() {
  try{
    const genAi=new GoogleGenerativeAI(API_KEY);
    const model=genAi.getGenerativeModel({
      model:"gemini-2.5-flash",
    })
    const result=await model.generateContent("hello sanesh");
    console.log("APi key is valid");
    console.log(result.response.text());
  }
  catch(error){
    console.log("APi key is invalid or has an issue");
    console.log(error.message);
    
    
  }
}
cheakApiKey();