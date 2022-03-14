const config=require("config");
const route=require("express").Router();
const chatcontroller=require('../Controller/CHAT/op-controller');
const channelDAO = require("../DB/CHAT/channel");
const { logger } = require("../utils/logger");
const {googleOauth,githubOauth,twitterOauth,facebookOauth,normalauthregister,normalauthlogin}=require("../Controller/Auth/Authcontroller");

//CHAT SECTION
route.post('/chat/channel',chatcontroller.createChannel);
route.get('/chat/channel',chatcontroller.getAllChannels);
route.post('/chat/getmessage',chatcontroller.getChatmessages);


//AUTH SECTION
route.get("/api/oauth/facebook",facebookOauth);
route.get("/api/oauth/google",googleOauth);
route.get("/api/oauth/github",githubOauth);
route.get("/api/auth/register",normalauthregister);
route.get("/api/auth/register",normalauthlogin);
route.get("/api/oauth/twitter",twitterOauth);




module.exports=route;
