const {logger}=require('../../utils/logger');
const ImageDAO=require('../../DB/imageupload/imageupload');
const {nanoid}=require("nanoid");
const asyncWrapper=require("../../utils/asyncWrapper");
const APIError = require('../../utils/APIError');


//Upload and get functionality

const Imageupload=asyncWrapper(async(req,res,next)=>{
      if(!req.file){
        return next(new APIError({name:"Unknown Error",message:"Image location not found",statusCode:500}));
      }else{
        let payload={
           userid:req.body.userID,
           url:req.file.location,
           shorturl:nanoid()
        };            
      let response = await ImageDAO.InsertData(payload);
      logger.info(response);
      if(response.insertedId){
        return res.status(201).json({
          id:payload.shorturl,
          url:req.file.location
        })
      }   
};
 
});

const ImageGet=asyncWrapper(async(req,res)=>{
const ID=req.params.id;

logger.warn(ID);
let response=await ImageDAO.findId(ID);
if(!response){
 throw new APIError({name:"Invalid Input",message:"Resource with given ID does not exist",statusCode:404});
};
return res.status(200).json({
  id:response.shorturl,
  url:response.url
});
});

module.exports={
Imageupload,
ImageGet
};

