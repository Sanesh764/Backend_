// ApiError ek custom error class hai.
// Ye normal Error class ko extend (inherit) karta hai.
//
// Iska use API me standard error response bhejne ke liye hota hai.
// Taaki har jagah same format me error return ho.
//
// Example:
//
// throw new ApiError(404, "User not found")
//
// Response:
//
// {
//   "statusCode": 404,
//   "message": "User not found",
//   "success": false,
//   "errors": []
// }
//
// Benefits:
// 1. Har error ka same structure rahega.
// 2. Status code easily manage hoga.
// 3. Error details bhej sakte hain.
// 4. Debugging ke liye stack trace milega.

class ApiError extends Error {
    constructor(
        statusCode,                  // HTTP status code (404, 401, 500, etc.)
        message = "Something went wrong", // Default error message
        errors = [],                 // Detailed validation errors
        stack = ""                   // Custom stack trace (optional)
    ) {

        // Parent Error class constructor call
        super(message)

        // HTTP status code store karte hain
        this.statusCode = statusCode

        // Error response me data nahi hota
        this.data = null

        // Error message
        this.message = message

        // API request failed
        this.success = false

        // Additional errors array
        this.errors = errors

        // Agar custom stack diya gaya hai to use karo
        if (stack) {
            this.stack = stack
        } else {

            // Current error ki exact location capture karta hai
            // File name, line number, function name etc.
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }