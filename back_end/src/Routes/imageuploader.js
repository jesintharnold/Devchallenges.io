const imageupload=require("express").Router();

//Uploading image and sending data
imageupload.route('/upload').post();

//Get request with short ID to share redirection URL
imageupload.route('/:id').get();

module.exports=imageupload;