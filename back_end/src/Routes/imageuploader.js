const imageupload=require("express").Router();
const { Imageupload,ImageGet } = require("../Controller/imageupload/imageuploadcontroller");
const { upload_Image } = require("../Middlewares/bucket");

//Uploading image and sending data
imageupload.route('/upload').post(upload_Image,Imageupload);

//Get request with short ID to share redirection URL
imageupload.route('/:id').get(ImageGet);

module.exports=imageupload;
