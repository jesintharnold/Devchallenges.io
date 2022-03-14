const jwt=require("jsonwebtoken");
const config=require("config");
const {readFileSync}=require("fs");
const {resolve}=require("path");
const {logger}=require("../../utils/logger");
const private_key=readFileSync(resolve("key","private.key"),{encoding:'utf8', flag:'r'});
const public_key=readFileSync(resolve("key","public.key"),{encoding:'utf8', flag:'r'});
const {emailfromauth,normalAuth}=require('../../Schema/CHAT/schemaval');
const UserDAO=require("../../DB/users");


class Token{
   static access(payload) {
      logger.warn('Sign - - Method')
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
    if(error){
        return res.status(403).send({Error:`Validation Error`});
    }
    try{
       let user=await UserDAO.findprotectuser(payload.email);
       if(user==null){
           logger.warn(`Executing this area...`);
        let user_update=await UserDAO.finduser({email:payload.email,user_payload:{name:payload.Name,email:payload.email,profile_url:payload.Profileurl,Admin:false}});
        let access_token=Token.access({name:payload.Name,email:payload.email,profile_url:payload.Profileurl});
        res.redirect(`${config.get("clientOrgin")}/login/auth/${access_token}/${user_update.lastErrorObject.upserted}`);
       }else{
        logger.warn(`Executing this area...BEAST`);   
        let access_token=Token.access({name:user.Name,email:user.email,profile_url:user.Profileurl});
        res.redirect(`${config.get("clientOrgin")}/login/auth/${access_token}/${user._id}`);
       }
    }catch(e){
        res.redirect(`${config.get("clientOrgin")}/login}`);
    }
}

//---------------------------Normal controller login and Register ------------------------------------------


//Add indexing to MongoDB - unique Email

const NormalControllerregister=async (payload,res)=>{
   const {value,error}=normalAuth.validate(payload);
   if(error){
       return res.status(403).send({Error:`Validation Error`});
   }
   try{
    
       logger.warn(`Executing this area...Normal Controller`);
       let name=payload.Name.split('@')[0];
       let user_update=await UserDAO.finduser({email:payload.email,user_payload:{name:payload.Name,email:payload.email,profile_url:"https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_960_720.png",Admin:false}});
       let access_token=Token.access({name:payload.Name,email:payload.email,profile_url:payload.Profileurl});
       res.redirect(`${config.get("clientOrgin")}/login/auth/${access_token}/${user_update.lastErrorObject.upserted}`);
   
   }catch(e){

      //If error  - send validation Error
       res.redirect(`${config.get("clientOrgin")}/login}`);
   }
};


const NormalControllerlogin=async (payload,res)=>{
   const {value,error}=normalAuth.validate(payload);
   if(error){
       return res.status(403).send({Error:`Validation Error`});
   }
   try{
    
       logger.warn(`Executing this area...Normal Controller`);
       let name=payload.Name.split('@')[0];
       let user_update=await UserDAO.finduser({email:payload.email,user_payload:{name:payload.Name,email:payload.email,profile_url:"https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_960_720.png",Admin:false}});
       let access_token=Token.access({name:payload.Name,email:payload.email,profile_url:payload.Profileurl});
       res.redirect(`${config.get("clientOrgin")}/login/auth/${access_token}/${user_update.lastErrorObject.upserted}`);
   
   }catch(e){
       res.redirect(`${config.get("clientOrgin")}/login}`);
   }
};


module.exports=EmailController;