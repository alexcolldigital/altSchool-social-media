const cloudinary = require('cloudinary').v2;

console.log(process.env.CLOUDINARY_URL)
cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL
 });
 
 module.exports = cloudinary;