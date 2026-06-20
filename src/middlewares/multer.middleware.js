import multer from "multer";

// Multer middleware file upload handle karne ke liye use hota hai.
// Ye uploaded files ko server ke local storage me save karta hai.

const storage = multer.diskStorage({

    // Uploaded file kis folder me save hogi
    destination: function (req, file, cb) {

        // cb(null, path)
        // null = koi error nahi
        // "./public/temp" = temporary upload folder

        cb(null, "./public/temp");
    },

    // Uploaded file ka naam kya hoga
    filename: function (req, file, cb) {

        // original file name preserve karta hai
        // Example:
        // profile.jpg -> profile.jpg

        cb(null, file.originalname);
    }
});

// Upload middleware create kar rahe hain
// Is middleware ko routes me use karke files upload kar sakte hain

export const upload = multer({
    storage: storage,
});