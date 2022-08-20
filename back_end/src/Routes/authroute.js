const authroute=require("express").Router();
const {googleOauth,githubOauth,logOut,facebookOauth}=require("../Controller/auth/authcontroller");
const {NormalControllerlogin,NormalControllerregister}=require("../Controller/auth/emailcontroller");
const { Tokencheck } = require("../Middlewares/auth");

authroute.route("/facebook").get(facebookOauth);
authroute.route("/google").get(googleOauth);
authroute.route("/github").get(githubOauth);
authroute.route("/register").post(NormalControllerregister);
authroute.route("/login").post(NormalControllerlogin);
authroute.get("/logout",Tokencheck,logOut);

module.exports=authroute;