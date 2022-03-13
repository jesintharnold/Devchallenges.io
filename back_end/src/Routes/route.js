const config=require("config");
const route=require("express").Router();
const chatcontroller=require('../Controller/op-controller');
const channelDAO = require("../DB/channel");
const { logger } = require("../utils/logger");
const {googleOauth,githubOauth,twitterOauth,facebookOauth,PretwitterOauth}=require("../Controller/Auth/Authcontroller");

route.post('/channel',chatcontroller.createChannel);
route.get('/channel',chatcontroller.getAllChannels);
route.post('/getmessage',chatcontroller.getChatmessages);

//Auth sections
route.get("/api/oauth/facebook",facebookOauth);
route.get("/api/oauth/google",googleOauth);
route.get("/api/oauth/github",githubOauth);
//route.get("/api/twitter",PretwitterOauth);
route.get("/api/oauth/twitter",twitterOauth);


module.exports=route;
