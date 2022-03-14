const config=require("config");
const axios=require("axios");
const { URLSearchParams } = require("url");
const {logger}=require("../../utils/logger");
const { HmacSHA1, enc }=require("crypto-js");
const {v4} = require('uuid');
const Emailcontroller=require('./Emailcontroller');

const googleOauth=async (req,res,next)=>{
    let google_code=req.query.code;
    logger.error(google_code);
    const values={
        code:google_code,
        client_id:config.get('Google.client_id'),
        client_secret:config.get('Google.client_secret'),
        redirect_uri:config.get('Google.redirect_URL'),
        grant_type:"authorization_code",
    };
    
    logger.info(values);

    try{
        const oauth_res=await axios.post("https://oauth2.googleapis.com/token",new URLSearchParams(values),{
        headers:{
                "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(async (x)=>{
           logger.info(x);
           let res_access_token=await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${x.data.access_token}`,{
               headers:{
                Authorization: `Bearer ${x.data.id_token}`
               }
           });
          logger.info(res_access_token);
           if(res_access_token.data.verified_email===false){
            res.status(403).send({Error:"Google account is not verified"});
           }

           if(res_access_token.data.verified_email){
            let payload={
                Name:res_access_token.data.given_name,
                Profileurl:res_access_token.data.picture,
                email:res_access_token.data.email
               };
               Emailcontroller(payload,res);
            } 
        });
    }catch(e){
           logger.error(`Google Oauth - error`,e);
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

        let URL=`https://graph.facebook.com/v13.0/oauth/access_token?${new URLSearchParams(values)}`;
        logger.error(URL);
      let res_access_token=await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token?${new URLSearchParams(values)}`).then(async (x)=>{
            logger.warn(`---------------- Facebook----------------`)
            logger.warn(x.data.access_token);
            
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
          Emailcontroller(payload,res);
 
      });
    }
    catch(e){
             logger.error(e);
    }
};

const twitterOauth=async (req,res,next)=>{
    let twitter_code=req.query.code;
    logger.info(twitter_code);

    const values={
        code:twitter_code,
        client_id:config.get('Twitter.client_id'),
        client_secret:config.get('Twitter.client_secret'),
        redirect_uri:config.get('Twitter.redirect_URL')
    };

};

const githubOauth=async (req,res,next)=>{
    let github_code=req.query.code;
    logger.warn(github_code);

    const values={
        code:github_code,
        client_id:config.get('Github.client_id'),
        client_secret:config.get('Github.client_secret'),
        redirect_uri:config.get('Github.redirect_URL'),
    };

    try{
        const oauth_res=await axios.post("https://github.com/login/oauth/access_token",new URLSearchParams(values),{
            headers:{
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json"
            }
            }).then(async (x)=>{
                      // Access token well get here - logger.info(x.data.access_token);
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
           Emailcontroller(payload,res);
            });
        
    }catch(e){
        logger.error(e);
    }


};



// async function PretwitterOauth(){
//     logger.error("Pre-twitter Auth called");
//     const timestamp = Date.now() / 1000;
//     const nonce=v4();
  
//     try{
//         const url='https://api.twitter.com/oauth/request_token';
//         const params = {
//           oauth_consumer_key:`${config.get("Twitter.REACT_APP_TWITTER_KEY")}`,
//           oauth_nonce: nonce,
//           oauth_signature_method: 'HMAC-SHA1',
//           oauth_timestamp: timestamp,
//           oauth_version: '1.0'
//         };
//         logger.warn(params);
//         let oauth_signature=encodeURIComponent(enc.Base64.stringify(HmacSHA1(`${"POST"}&${encodeURIComponent(url)}&${encodeURIComponent(new URLSearchParams(params).toString())}`,`${encodeURIComponent(`${process.env.REACT_APP_TWITTER_VALUE}`)}&`)));
//         logger.warn(oauth_signature);
//         logger.warn(`Authorization: OAuth oauth_consumer_key=${config.get("Twitter.REACT_APP_TWITTER_KEY")},oauth_signature_method='HMAC-SHA1',oauth_timestamp=${timestamp},oauth_nonce=${nonce},oauth_version='1.0',oauth_signature=${oauth_signature}`);
//         let res_oauth=await axios.post(`https://api.twitter.com/oauth/request_token`,{
//           headers:{
//             Authorization:`OAuth oauth_consumer_key=${config.get("Twitter.REACT_APP_TWITTER_KEY")},oauth_signature_method='HMAC-SHA1',oauth_timestamp=${timestamp},oauth_nonce=${nonce},oauth_version='1.0',oauth_signature=${oauth_signature}`
//           }
//         }).then(x=>{
//            logger.warn(x);
//         });


//         logger.error()

//     }catch(e){
//            logger.error(Object.keys(e));
//            logger.info(e);
//     }
  
  
//   }


const normalauthregister=()=>{
    //Get login forms 
    logger.info(req.body);

};

const normalauthlogin=()=>{
    //Get login forms 
    logger.info(req.body);

};




module.exports={
    googleOauth,
    githubOauth,
    twitterOauth,
    facebookOauth,
    normalauthlogin,
    normalauthregister
}