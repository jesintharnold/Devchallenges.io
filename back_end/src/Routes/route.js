const config=require("config");
const route=require("express").Router();
const chatcontroller=require('../Controller/op-controller');

route.post('/channel',chatcontroller.createChannel);




module.exports=route;
