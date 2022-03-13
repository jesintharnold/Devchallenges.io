import axios from 'axios';
import { HmacSHA1, enc } from "crypto-js";
import { v4 as uuidv4 } from 'uuid';

export function googleOauth(){
    const url="https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
      redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URL,
      client_id: process.env.REACT_APP_GOOGLE_CLIENTID,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
    const qs = new URLSearchParams(options);
    return `${url}?${qs.toString()}`;
  };

export function githubOauth(){
     const url="https://github.com/login/oauth/authorize";
     const options={
        redirect_uri:process.env.REACT_APP_GITHUB_CB,
        client_id:process.env.REACT_APP_GITHUB_ID,
        scope:["read:user","user:email"].join(" ")
     };
     const qs=new URLSearchParams(options);
     console.log(`${url}?${qs.toString()}`);
     return `${url}?${qs.toString()}`;

};

export function facebookOauth(){
  const url="https://www.facebook.com/v13.0/dialog/oauth";
  const options={
    client_id:process.env.REACT_APP_FACEBOOK_ID,
    redirect_uri:process.env.REACT_APP_FACEBOOK_CB,
    response_type:"code",
    scope:"email,public_profile"
  }
  const qs=new URLSearchParams(options);
  console.log(`${url}?${qs.toString()}`);
  return `${url}?${qs.toString()}`;
}

// export function twitterOauth(){
//   const url="https://twitter.com/i/oauth2/authorize";
//   const options={
//     response_type:"code",
//     client_id:process.env.REACT_APP_TWITTER_ID,
//     scope:["users.read","offline.access","tweet.read"].join(" "),
//     state:"state",
//     code_challenge:"challenge",
//     code_challenge_method:"plain"
//   };


//   const qs=new URLSearchParams(options);
//   console.log(`${url}?redirect_uri=${process.env.REACT_APP_TWITTER_CB}&${qs.toString()}`);
//   return `${url}?redirect_uri=${process.env.REACT_APP_TWITTER_CB}&${qs.toString()}`;
// }

// export async function twitterOauth(){

//   const timestamp = Date.now() / 1000;
//   const nonce=uuidv4();

//   const url='https://api.twitter.com/oauth/request_token';
//   const params = {
//     oauth_consumer_key: process.env.REACT_APP_TWITTER_KEY,
//     oauth_nonce: nonce,
//     oauth_signature_method: 'HMAC-SHA1',
//     oauth_timestamp: timestamp,
//     oauth_version: '1.0'
//   };
//   console.log(params);
//   let oauth_signature=encodeURIComponent(enc.Base64.stringify(HmacSHA1(`${"POST"}&${encodeURIComponent(url)}&${encodeURIComponent(new URLSearchParams(params).toString())}`,`${encodeURIComponent(`${process.env.REACT_APP_TWITTER_VALUE}`)}&`)));
//   console.log(oauth_signature);
//   console.log(`Authorization: OAuth oauth_consumer_key=${process.env.REACT_APP_TWITTER_KEY},oauth_signature_method='HMAC-SHA1',oauth_timestamp=${timestamp},oauth_nonce=${nonce},oauth_version='1.0',oauth_signature=${oauth_signature}`);
//   let res_oauth=await axios.post(`https://api.twitter.com/oauth/request_token?oauth_callback=${process.env.REACT_APP_TWITTER_CB}`,{
//     headers:{
//       Authorization: `OAuth oauth_consumer_key=${process.env.REACT_APP_TWITTER_KEY},oauth_signature_method='HMAC-SHA1',oauth_timestamp=${timestamp},oauth_nonce=${nonce},oauth_version='1.0',oauth_signature=${oauth_signature}`
//     }
//   }).then(x=>{
//     console.log(x);
//   });


// }

