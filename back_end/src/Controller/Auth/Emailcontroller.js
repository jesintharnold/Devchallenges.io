const config=require("config");
const {readFileSync}=require("fs");
const {emailfromauth,normalAuth}=require('../../Schema/authschemaval');
const UserDAO=require("../../DB/user/users");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const {resolve}=require("path");
const {logger}=require("../../utils/logger");
const { info } = require("console");
const private_key=readFileSync(resolve("key","private.key"),{encoding:'utf8', flag:'r'});
const public_key=readFileSync(resolve("key","public.key"),{encoding:'utf8', flag:'r'});

// TokenCreate .access .verfiy
class Token{
   static access(payload) {
      logger.warn('Sign - - Method');
      return jwt.sign(payload,private_key,config.get('Salt.access')); 
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
    logger.info(`reached - Email auth controller` , payload )
    if(error){
        return res.status(403).send({Error:`Validation Error`});
    }
    try{
       let user=await UserDAO.findprotectuser(payload.email);
       if(user==null){
        logger.warn(`Executing this area...`);
        let user_update=await UserDAO.insertuser({email:payload.email,name:payload.Name,profile_url:payload.Profileurl,Admin:false});
        let access_token=Token.access({name:payload.Name,email:payload.email,profile_url:payload.Profileurl});
        res.redirect(`${config.get("clientOrgin")}/login/auth/${access_token}/${user_update.insertedId}`);
        
       }else{
        logger.warn(`Executing this area...existing email..`);   
        let access_token=Token.access({name:user.Name,email:user.email,profile_url:user.Profileurl});
        res.redirect(`${config.get("clientOrgin")}/login/auth/${access_token}/${user._id}`);
       }
    }catch(e){
        res.redirect(`${config.get("clientOrgin")}/login}`);
    }
}

//---------------------------Normal controller login and Register ------------------------------------------






//Add indexing to MongoDB - unique Email

const NormalControllerregister=async (req,res,next)=>{
    logger.info(req.body);
   let payload={email:req.body.Email,password:req.body.Password};
   const {value,error}=normalAuth.validate(payload);
   if(error){
       return res.status(403).send({Error:`Validation Error`});
   }
   try{
       let hash_=await bcrypt.hash(req.body.Password,parseInt(`${config.get('Bcrypt.salt')}`));
       let user_update=await UserDAO.insertuser({email:payload.email,name:payload.email.split('@')[0],profile_url:"https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_960_720.png",Admin:false,password:hash_});
       if(user_update===11000){
        return res.status(200).json({
            access_token:null,
            _id:null,
            error:{
                status:true,
                password:null,
                email:`Email already exists`
            }
           });
       }else{
          let access_token=Token.access({name:payload.Name,email:payload.email,profile_url:"https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_960_720.png"});
          res.status(201).json({
            access_token:access_token,
            _id:user_update.insertedId,
            error:{
                status:false,
                password:null,
                email:null
            }
           });
        }
   }catch(e){
       //If error  - send validation Error
       res.status(302).json({});
   }
};


const NormalControllerlogin=async (req,res,next)=>{
    logger.info(req.body);
   let payload={email:req.body.Email,password:req.body.Password};
   const {value,error}=normalAuth.validate(payload);
   if(error){
       logger.info(error);
       res.status(200).json({
        access_token:null,
        _id:null,
        error:{
            status:true,
            password:`Password didn't match`,
            email:`Provide a valid e-mail`
        }
       });
   }
   try{
       let user_update=await UserDAO.findprotectuser(payload.email);
       logger.info(user_update);
       if(!user_update.hasOwnProperty("password")&&user_update!==null){
        res.status(200).json({
            access_token:null,
            _id:null,
            error:{
                status:true,
                password:`Password didn't match`,
                email:null
            }
           });
       }
       if(user_update==null){
        res.status(200).json({
            access_token:null,
            _id:null,
            error:{
                status:true,
                password:null,
                email:`No account found with this e-mail`
            }
           });
       }else{
          let access_token=Token.access({name:user_update.name,email:user_update.email,profile_url:user_update.profile_url});
          logger.warn(access_token);
          let compare_bool=await bcrypt.compare(payload.password,user_update.password);
          logger.info(compare_bool);
          if(compare_bool){
            res.status(200).json({
                access_token:access_token,
                _id:user_update._id,
                error:{
                    status:false,
                    password:null,
                    email:null
                }
               });
          }else{
            res.status(200).json({
                access_token:null,
                _id:null,
                error:{
                    status:true,
                    password:`Password didn't match`,
                    email:null
                }
               });
          }
        }   
   }catch(e){
       logger.info(e,'Error - here')
       res.status(302).json({});
   }
};


module.exports={EmailController,NormalControllerlogin,NormalControllerregister};