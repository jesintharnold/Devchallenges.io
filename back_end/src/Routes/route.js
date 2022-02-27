const config=require("config");
const route=require("express").Router();
const chatcontroller=require('../Controller/op-controller');
const channelDAO = require("../DB/channel");
const { logger } = require("../utils/logger");


route.post('/channel',chatcontroller.createChannel);
route.get('/channel',chatcontroller.getAllChannels);
route.post('/getmessage',chatcontroller.getChatmessages);



module.exports=route;
