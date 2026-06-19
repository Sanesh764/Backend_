// ApiResponse ek custom response class hai.
//
// Iska use API se successful response ko standard format me bhejne ke liye hota hai.
//
// Problem:
// Agar har controller me alag-alag response bhejoge to response structure inconsistent ho jayega.
//
// Example:
//
// Controller 1:
// res.json(user)
//
// Controller 2:
// res.json({data:user})
//
// Controller 3:
// res.json({success:true,data:user})
//
// Sabka format alag hoga.
//
// Solution:
// ApiResponse class har successful response ko same structure me convert karti hai.
//
// Example:
//
// return res.status(200).json(
//     new ApiResponse(
//         200,
//         user,
//         "User fetched successfully"
//     )
// )
//
// Response:
//
// {
//   "statusCode": 200,
//   "data": {
//      "_id": "...",
//      "name": "Sanesh"
//   },
//   "message": "User fetched successfully",
//   "success": true
// }

class ApiResponse {

    constructor(
        statusCode,      // HTTP status code (200, 201, etc.)
        data,            // Actual response data
        message = "success" // Success message
    ) {

        // HTTP status code store karta hai
        this.statusCode = statusCode

        // Actual data jo client ko bhejna hai
        this.data = data

        // Success message
        this.message = message

        // Agar status code 400 se chota hai to success=true
        // 200, 201, 204 => true
        // 400, 404, 500 => false
        this.success = statusCode < 400
    }
}

export { ApiResponse }





// class ApiResponse{
//     constructor(statusCode,data,message="success"){
//         this.statusCode=statusCode
//         this.data=data
//         this.message=message
//         this.success=statusCode<400
//     }
// }
// export {ApiResponse};