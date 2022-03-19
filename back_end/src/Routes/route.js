const route=require("express").Router();
const chatRoute=require('./chatroute');
const authroute=require('./authroute');
const userroute=require('./userroute');

// user - section routes
route.use('/user/profile',userroute);

// chat - section routes
route.use('/chat',chatRoute);

// auth - section routes
route.use('/api/auth',authroute);

module.exports=route;
