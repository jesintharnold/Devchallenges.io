//Multer file upload then share the link in body response itself
const multer =require('multer');
const aws=require('aws-sdk');
const multer_s3=require('multer-s3');
const config=require("config");
const uuid=require('uuid');
const { logger } = require('../utils/logger');

aws.config.update({
   secretAccessKey:config.get(`AWS.SecretKey`),
   accessKeyId:config.get(`AWS.AccessKey`),
   region: config.get(`AWS.Region`)
});

logger.info(uuid.v4());

const s3_=new aws.S3();
let storage_=multer_s3({
    s3:s3_,
    bucket:`${config.get(`AWS.bucketName`)}/user`,
    metadata:function(req,file,cb){
        cb(null,{fieldName: file.fieldname});
    },
    key:function(req,file,cb){
        logger.info(`${uuid.v4()}.${file.mimetype.split('/')[1]}`);
        cb(null,`${uuid.v4()}.${file.mimetype.split('/')[1]}`);
    }
});

let filefilter_=function(req,file,cb){
  if(file.mimetype.split("/")[0]=='image'){
    cb(null,true);
  }else{
    cb(null,false);
  }
};

let upload=multer({
  storage:storage_,
  fileFilter:filefilter_,
  limits:{
    fileSize:1024*1024*2 // allow limit to 2mb
  }

});


const upload_=upload.single('Image');

module.exports={upload_};