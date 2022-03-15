const config=require("config");
const route=require("express").Router();
const chatcontroller=require('../Controller/CHAT/op-controller');
const channelDAO = require("../DB/CHAT/channel");
const { logger } = require("../utils/logger");
const {googleOauth,githubOauth,twitterOauth,facebookOauth}=require("../Controller/Auth/Authcontroller");
const {NormalControllerlogin,NormalControllerregister}=require("../Controller/Auth/Emailcontroller");

//CHAT SECTION
route.post('/chat/channel',chatcontroller.createChannel);
route.get('/chat/channel',chatcontroller.getAllChannels);
route.post('/chat/getmessage',chatcontroller.getChatmessages);


//AUTH SECTION
route.get("/api/oauth/facebook",facebookOauth);
route.get("/api/oauth/google",googleOauth);
route.get("/api/oauth/github",githubOauth);
route.get("/api/oauth/twitter",twitterOauth);
route.post("/api/auth/register",NormalControllerregister);
route.post("/api/auth/login",NormalControllerlogin);



module.exports=route;
