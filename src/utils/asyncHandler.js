// asyncHandler ek Higher Order Function (HOF) hai.
// Ye ek async controller function ko argument me leta hai
// aur ek naya function return karta hai jo errors ko automatically handle karta hai.
//
// Problem:
// Agar async function ke andar error aa jaye to Express khud us error ko catch nahi karta.
// Isliye hame har controller me try/catch likhna padta hai.
//
// Example without asyncHandler:
//
// const getUser = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         res.json(user);
//     } catch (error) {
//         next(error);
//     }
// }
//
// Har controller me same try/catch repeat hoga.
//
// Solution:
// asyncHandler controller ko wrap karta hai aur error ko automatically
// Express ke error middleware tak bhej deta hai.
//
// Usage:
//
// router.get(
//     "/users/:id",
//     asyncHandler(getUser)
// );
//
// Ya direct:
//
// router.get("/users/:id", asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id);
//     res.json(user);
// }));
//
// Kaam kaise karta hai?
//
// 1. requestHandler = actual controller function
// 2. requestHandler execute hota hai
// 3. Promise.resolve() usse promise bana deta hai
// 4. Agar promise reject ho jaye (error aaye)
// 5. .catch() error ko pakad leta hai
// 6. next(error) Express error middleware ko call karta hai
//
// Flow:
//
// Request
//    ↓
// asyncHandler
//    ↓
// Controller Execute
//    ↓
// Success ----------→ Response Send
//    ↓
// Error
//    ↓
// next(error)
//    ↓
// Error Middleware
//    ↓
// Client Response


const asyncHandler =(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).
        catch((err)=>next(err))
    }
}


export {asyncHandler};

// const asyncHandler=()=>{};
// const asyncHandler=(fun)=>{()=>{}};
// const asyncHandler=(fun)=>()=>{};
// const asyncHandler=(fun)=> async ()=>{};


// using try and catch
// const asyncHandler=(fn)=> async (req,res,next)=>{
//     try{
//         await fn(req,res,next)
//     } catch(error){
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }