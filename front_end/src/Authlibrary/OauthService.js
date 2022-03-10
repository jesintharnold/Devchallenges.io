
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


export function twitterOauth(){
  const url="https://twitter.com/i/oauth2/authorize";
  const options={
    client_id:process.env.REACT_APP_TWITTER_ID,
    redirect_uri:process.env.REACT_APP_TWITTER_CB,
    response_type:"code",
    scope:["users.read","offline.access"].join(" ")
  };

  const qs=new URLSearchParams(options);
  console.log(`${url}?${qs.toString()}`);
  return `${url}?${qs.toString()}`;
}


export function facebookOauth(){
  const url="https://www.facebook.com/v13.0/dialog/oauth";
  const options={
    client_id:process.env.REACT_APP_FACEBOOK_ID,
    redirect_uri:process.env.REACT_APP_FACEBOOK_CB,
    response_type:"code",
    scope:["email","public_profile"].join(" ")
  }
  const qs=new URLSearchParams(options);
  console.log(`${url}?${qs.toString()}`);
  return `${url}?${qs.toString()}`;
}