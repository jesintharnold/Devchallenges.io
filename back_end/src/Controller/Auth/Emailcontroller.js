const jwt=require("jsonwebtoken");
const config=require("config");
const {readFileSync}=require("fs");
const {resolve}=require("path");
const {logger}=require("../../utils/logger");
const private_key=readFileSync(resolve("key","private.key"),{encoding:'utf8', flag:'r'});
const public_key=readFileSync(resolve("key","public.key"),{encoding:'utf8', flag:'r'});
const {emailfromauth}=require('../../Schema/schemaval');
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
    let user_find=await UserDAO.finduser({email:payload.email,user_payload:{name:payload.Name,email:payload.email,profile_url:payload.Profileurl,Admin:false}});
    let access_token=Token.access({name:payload.Name,email:payload.email,profile_url:payload.Profileurl});
    if(user_find.value===null){ 
        let refresh_token=Token.access({name:payload.Name,email:payload.email,profile_url:payload.Profileurl,admin:false});   
        let updateRefreshToken=await UserDAO.finduser({email:payload.email,user_payload:{
            "refresh_token":refresh_token
        }});
        logger.warn(user_find);
        res.redirect(`${config.get("clientOrgin")}/login/auth/${access_token}/${user_find.lastErrorObject.upserted}`);
    }else{
        let decoded_val=Token.verify(user_find.value.refresh_token);
        
        //If Token is expired ,we may need to build the Logic bro
        if(decoded_val.expired){
                let refresh_token=Token.access({name:payload.Name,email:payload.email,admin:false});
                let updateRefreshToken=await UserDAO.finduser({email:payload.Name,user_payload:{refresh_token:refresh_token}});
            }
        res.redirect(`${config.get("clientOrgin")}/login/auth/${access_token}/${user_find.value._id}`);
    }
    }catch(e){
        res.redirect(`${config.get("clientOrgin")}/login}`);
    }
}


module.exports=EmailController;