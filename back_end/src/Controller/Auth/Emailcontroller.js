const config=require("config");
const {readFileSync}=require("fs");
const {emailfromauth,normalAuth}=require('../../Schema/authschemaval');
const UserDAO=require("../../DB/user/users");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const {resolve}=require("path");
const {logger}=require("../../utils/logger");
const private_key=readFileSync(resolve("key","private.key"),{encoding:'utf8', flag:'r'});
const public_key=readFileSync(resolve("key","public.key"),{encoding:'utf8', flag:'r'});


class Token{
   static access(payload) {
    return jwt.sign(payload,private_key,config.get('JWT_EXPIRY')); 
   }
   static verify(token){
    try{
     const decode=jwt.verify(token,public_key);
         return {
          expired:false,
          decode
         };
       }
       catch(e){
          logger.warn(e);
          return {
             decode:null,
             expired:e.message==="jwt expired"
          }
       }
   }

}

const EmailController=async (payload,res)=>{
    const {value,error}=emailfromauth.validate(payload);
    if(error){
       res.status(403).send({Error:`Validation Error`});
    }
    try{
       let user=await UserDAO.findprotectuser(value.email);
       if(user==null){
        let user_update=await UserDAO.insertuser({email:payload.email,name:payload.Name,profile_url:payload.Profileurl,Admin:false,online:true});
        let access_token=Token.access({name:payload.Name,email:payload.email,profile_url:payload.Profileurl});
        res.redirect(`${config.get("clientOrgin")}/login/auth/${access_token}/${user_update.insertedId}`);
       }else{
        await UserDAO.setOnline(value.email); // setting user online
        let access_token=Token.access({name:user.Name,email:user.email,profile_url:user.Profileurl});
        res.redirect(`${config.get("clientOrgin")}/login/auth/${access_token}/${user._id}`);
       }
    }catch(e){
        res.redirect(`${config.get("clientOrgin")}/login}`);
    }
}







//Add indexing to MongoDB - unique Email

const NormalControllerregister=async (req,res,next)=>{
   let payload={email:req.body.Email,password:req.body.Password};
   const {value,error}=normalAuth.validate(value);
   if(error){
    res.status(403).send({Error:`Validation Error`});
   }
   try{
       let hash_=await bcrypt.hash(req.body.Password,parseInt(`${config.get('Bcrypt.salt')}`));
       let user_update=await UserDAO.insertuser({email:payload.email,name:payload.email.split('@')[0],
       profile_url:"https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_960_720.png",
       Admin:false,
       password:hash_,
       online:true
    });
    if(user_update===11000){
        res.status(200).json({
        access_token:null,
        _id:null,
        error:{
        status:true,
        password:null,
        email:`Email already exists`
        }});
       }else{
        await UserDAO.setOnline(value.email); // setting user online
        let access_token=Token.access({name:payload.Name,email:payload.email,profile_url:"https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_960_720.png"});
        res.status(201).json({
        access_token:access_token,
        _id:user_update.insertedId,
        error:{
        status:false,
        password:null,
        email:null
        }});
        }
   }catch(e){
       res.status(302).json({});
   }
};


const NormalControllerlogin=async (req,res,next)=>{
   let payload={email:req.body.Email,password:req.body.Password};
   const {value,error}=normalAuth.validate(payload);
   if(error){
       res.status(200).json({
       access_token:null,
       _id:null,
       error:{
       status:true,
       password:`Password didn't match`,
       email:`Provide a valid e-mail`
    }});
   }
   try{
       let user_update=await UserDAO.findprotectuser(value.email);
       if(!user_update.hasOwnProperty("password")&&user_update!==null){
        res.status(200).json({
        access_token:null,
        _id:null,
        error:{
        status:true,
        password:`Password didn't match`,
        email:null
        }});
       }
       if(user_update==null){
        res.status(200).json({
        access_token:null,
        _id:null,
        error:{
        status:true,
        password:null,
        email:`No account found with this e-mail`
        }});
       }else{
         await UserDAO.setOnline(value.email); // setting user online
         let access_token=Token.access({name:user_update.name,email:user_update.email,profile_url:user_update.profile_url});
         let compare_bool=await bcrypt.compare(payload.password,user_update.password);
         if(compare_bool){
            res.status(200).json({
            access_token:access_token,
            _id:user_update._id,
            error:{
            status:false,
            password:null,
            email:null
            }});
         }else{
            res.status(200).json({
            access_token:null,
            _id:null,
            error:{
            status:true,
            password:`Password didn't match`,
            email:null
            }});
         }
        }   
   }catch(e){
       res.status(302).json({});
   }
};


module.exports={EmailController,NormalControllerlogin,NormalControllerregister};