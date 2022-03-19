const { func, exist } = require('joi');
const UserDAO =require('../../DB/users');
const {getprofile,updateProfile}=require('../../Schema/userschemaval');
const { logger } = require('../../utils/logger');
const bcrypt=require("bcrypt");
const config=require("config");

const getuserProfile=async (req,res,next)=>{
    let email=req.params['email'];
    let {value,error}=getprofile.validate({email:email});
    
    try{
        if(error){
         res.status(200).json({
                redirect:true,
                value:null
            });
        }else{  
        let user_val=await UserDAO.findprotectuser(email);
     
        res.status(200).json({
            redirect:false,
            value:{
                ProfileURL:user_val.profile_url,
                Name:user_val.name,
                Email:user_val.email,
                Bio:user_val.hasOwnProperty('bio')?user_val.bio:null,
                Password:user_val.hasOwnProperty('password')
            }
        });
    }}catch(err){
        res.status(200).json({
            redirect:true,
            value:null
        });
    }
};

// Photo upload function

// Profile update function
const getuserProfileupdate=async (req,res,next)=>{
    

    logger.info(`User Update -- needed`);

    let payload={
    email:req.body.Email,
    bio:req.body.Bio||null,
    phone:req.body.Phone==null?null:req.body.Phone.toString(),
    name:req.body.Name,
    password:req.body.Password==null?null:req.body.Password.toString()
    };

    

    try{ 
    let {value,error}=updateProfile.validate(payload);
    logger.info(error);
    if(error){
        res.status(200).json({
            redirect:true,
            error:{
                status:true,
                value:`validation error`,
            }
        });
    }else{
        let user_val=await UserDAO.findprotectuser(payload.email);

        if((user_val.hasOwnProperty('password'))||(payload.password==null)){
            let val_=await UserDAO.finduser(payload.email,{
                bio:payload.bio,
                phone:payload.phone,
                name:payload.name
            });
            res.status(200).json({
                redirect:true,
                error:{value:null,status:false}
            });
    
        };
    
        if(!user_val.hasOwnProperty('password')&&(payload.password!==null)&&(payload.password!=='')){
            let hash_=await bcrypt.hash(payload.password,parseInt(`${config.get('Bcrypt.salt')}`));
            let val_=await UserDAO.finduser(payload.email,{
                bio:payload.bio,
                phone:payload.phone,
                name:payload.name,
                password:hash_,
            });
            res.status(200).json({
                redirect:true,
                error:{value:null,status:false}
            });
        }
    }
    }catch(err){
        res.status(200).json({
            redirect:true,
            error:{value:`Internal server error`,status:true}
        });
    }
};

module.exports={
    getuserProfile,
    getuserProfileupdate
}
