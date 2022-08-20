const route=require("express").Router();
const chatroute=require('./chatroute');
const authroute=require('./authroute');
const userroute=require('./userroute');
const imageuploadroute=require('./imageuploader');
const catroute=require('./catwiki');
const shoproute=require('./shoproute');
const {Tokencheck}=require('../Middlewares/auth');
const { logOut } = require("../Controller/auth/authcontroller");
// user - section routes
route.use('/user/profile',userroute);

// chat - section routes
route.use('/chat',chatroute);

// auth - section routes
route.use('/api/oauth',authroute);

// Image upload route
route.use('/image',imageuploadroute);

// Catwiki - section route
route.use('/catwiki',catroute);

//Shoppingify route
route.use('/shoppingify',Tokencheck,shoproute);

module.exports=route;
