const authroute=require("express").Router();
const {googleOauth,githubOauth,twitterOauth,facebookOauth}=require("../Controller/auth/authcontroller");
const {NormalControllerlogin,NormalControllerregister}=require("../Controller/auth/emailcontroller");

authroute.route("/facebook").get(facebookOauth);
authroute.route("/google").get(googleOauth);
authroute.route("/github").get(githubOauth);
authroute.route("/twitter").get(twitterOauth);
authroute.route("/register").post(NormalControllerregister);
authroute.route("/login").post(NormalControllerlogin);


module.exports=authroute;