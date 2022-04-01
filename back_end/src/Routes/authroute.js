const authroute=require("express").Router();
const {googleOauth,githubOauth,twitterOauth,facebookOauth}=require("../Controller/Auth/Authcontroller");
const {NormalControllerlogin,NormalControllerregister}=require("../Controller/Auth/Emailcontroller");

authroute.route("/facebook").get(facebookOauth);
authroute.route("/google").get(googleOauth);
authroute.route("/github").get(githubOauth);
authroute.route("/twitter").get(twitterOauth);
authroute.route("/register").post(NormalControllerregister);
authroute.route("/login").post(NormalControllerlogin);


module.exports=authroute;