const config=require("config");
const axios=require("axios");
const { URLSearchParams } = require("url");
const {logger}=require("../../utils/logger");
const {EmailController}=require('./emailcontroller');
const bcrypt=require("bcrypt");
const UserDAO = require("../../DB/user/users");

const googleOauth=async (req,res,next)=>{
    let google_code=req.query.code;
    const values={
        code:google_code,
        client_id:config.get('Google.client_id'),
        client_secret:config.get('Google.client_secret'),
        redirect_uri:config.get('Google.redirect_URL'),
        grant_type:"authorization_code",
    };
    
    try{
        await axios.post("https://oauth2.googleapis.com/token",new URLSearchParams(values),{
        headers:{
                "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(async (x)=>{
           let res_access_token=await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${x.data.access_token}`,{
               headers:{
                Authorization: `Bearer ${x.data.id_token}`
               }
           });
           if(res_access_token.data.verified_email===false){
            next(new APIError({name:"AuthenticationError",message:"Google account is not verified",statusCode:403}));
           }
           if(res_access_token.data.verified_email){
            let payload={
                Name:res_access_token.data.given_name,
                Profileurl:res_access_token.data.picture,
                email:res_access_token.data.email
               };
               EmailController(payload,res,next);
            } 
        });
    }catch(err){
           logger.error(err);
    } 
};

const facebookOauth=async (req,res,next)=>{
    let facebook_code=req.query.code;
    let values={
        code:facebook_code,
        client_id:config.get('Facebook.client_id'),
        client_secret:config.get('Facebook.client_secret'),
        redirect_uri:config.get('Facebook.redirect_URL')
    };
    try{
        await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token?${new URLSearchParams(values)}`).then(async (x)=>{
            let user_value={
                access_token:x.data.access_token,
                fields:"id,name,email,picture.type(large)"
            }
           let user_data=await axios.get(`https://graph.facebook.com/me?${new URLSearchParams(user_value)}`);
           let payload={
            Name:user_data.data.name,
            Profileurl:user_data.data.picture.data.url,
            email:user_data.data.email
           }
           EmailController(payload,res,next);
      });
    }
    catch(e){
        logger.error(e);
    }
};


const githubOauth=async (req,res,next)=>{
    let github_code=req.query.code;
    const values={
        code:github_code,
        client_id:config.get('Github.client_id'),
        client_secret:config.get('Github.client_secret'),
        redirect_uri:config.get('Github.redirect_URL'),
    };
    try{
        await axios.post("https://github.com/login/oauth/access_token",new URLSearchParams(values),{
            headers:{
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json"
            }
            }).then(async (x)=>{
            let res_access_token=await axios.get(`https://api.github.com/user`,{
                     headers:{
                         Authorization: `token  ${x.data.access_token}`
                        }
                    });   
            let res_access_email=await axios.get(`https://api.github.com/user/emails`,{
                    headers:{
                        Authorization: `token  ${x.data.access_token}`
                       }
                    });
           let {name,avatar_url}=res_access_token.data;
           let payload={
               Name:name.split('"').join(''),
               Profileurl:avatar_url.split('"').join(''),
               email:res_access_email.data[0].email.split('"').join('')
           };
           EmailController(payload,res);
            });
    }catch(e){
        logger.error(e);
    }
};


const logOut=async(req,res,next)=>{
    let logout_response=await UserDAO.setlogout(req.body.userID);
    if(logout_response.matchedCount===1&&logout_response.modifiedCount===1){
        res.status(200).json({
            redirect:true
        });
    }else{
        res.status(500).json({
            redirect:false
        });
    }
};

module.exports={
    googleOauth,
    githubOauth,
    facebookOauth,
    logOut
}