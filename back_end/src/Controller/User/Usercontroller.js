const UserDAO =require('../../DB/user/users');
const {getprofile,updateProfile}=require('../../Schema/userschemaval');
const { logger } = require('../../utils/logger');
const bcrypt=require("bcrypt");
const config=require("config");
const { upload_ } = require('../../Middlewares/bucket');
const asyncWrapper=require('../../utils/asyncWrapper');
const APIError = require('../../utils/APIError');


const getuserProfile=asyncWrapper(async (req,res,next)=>{
    let email=req.query.email;
    let {value,error}=getprofile.validate({email:email});
    if(error){
        next(error);
    }else{  
    let user_val=await UserDAO.findprotectuser(value.email);
    if(user_val!==null){
        res.status(200).json({
        redirect:false,
        value:{
        ProfileURL:user_val.profile_url,
        Name:user_val.name,
        Email:user_val.email,
        Bio:user_val.hasOwnProperty('bio')?user_val.bio:null,
        Password:user_val.hasOwnProperty('password'),
        Phone:user_val.hasOwnProperty('phone')?user_val.phone:null
        }
    });
    }else{
    next(new APIError({name:"ItemNotFound",message:"No details found for this email",statusCode:400})); 
    }
}
});


const getuserProfileupdate=asyncWrapper(async (req,res,next)=>{

    upload_(req,res,async function(err){
        if(err){
        res.status(200).json({
        redirect:true,
        error:{value:`Error while uploading Avatar`,status:true}
        });
        };
    
        if(!req.file){
          req.body['Image']=null;
        }else{
          req.body['Image']=req.file.location;
        }
    
    let payload={
    email:req.body.Email,
    bio:req.body.Bio||null,
    phone:req.body.Phone==null?null:req.body.Phone.toString(),
    name:req.body.Name,
    password:req.body.Password==null?null:req.body.Password.toString()
    };

    let {error,value}=updateProfile.validate(payload);
    if(error){
        next(error);
    }else{
        let user_val=await UserDAO.findprotectuser(payload.email);
        if((user_val.hasOwnProperty('password'))||(payload.password==null)){
            let val_=await UserDAO.finduser(payload.email,req.body.Image===null?{
                bio:payload.bio,
                phone:payload.phone,
                name:payload.name
            }:{
                bio:payload.bio,
                phone:payload.phone,
                name:payload.name,
                profile_url:req.body.Image
            });
            res.status(200).json({
                redirect:true,
                error:{value:null,status:false}
            });
    
        };
    
        if(!user_val.hasOwnProperty('password')&&(payload.password!==null)&&(payload.password!=='')){
            let hash_=await bcrypt.hash(payload.password,parseInt(`${config.get('Bcrypt.salt')}`));
            let val_=await UserDAO.finduser(payload.email,req.body.Image===null?{
                bio:payload.bio,
                phone:payload.phone,
                name:payload.name,
                password:hash_,
            }:{
                bio:payload.bio,
                phone:payload.phone,
                name:payload.name,
                password:hash_,
                profile_url:req.body.Image
            });
            res.status(200).json({
                redirect:true,
                error:{value:null,status:false}
            });
        }
    }
});
});

module.exports={
    getuserProfile,
    getuserProfileupdate
}
