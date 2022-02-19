const express=require("express")();
const config=require("config");
const cors =require("cors");
const {logger}=require('./utils/logger');
const bodyParser = require('body-parser');
const { Socket } = require("socket.io");
const { appendFile } = require("fs");
const http=require('http').createServer(express);
const io=require("socket.io")(http,{
    cors:{
        origin:"http://localhost:3005"
    }
});
//Initalize Socket.io with http server / express

io.on('connection',(Socket)=>{
    
Socket.on("join",(roomData)=>{
    logger.info(roomData);
});

Socket.on('sendRoomMessage',(roomData)=>{
    logger.info(roomData);
});

Socket.on('sendMessage',(msgData)=>{
logger.info(msgData);
});


});



logger.info(process.env.NODE_ENV);
http.listen(config.get('App.PORT'),()=>logger.info(`Server running on ${config.get('App.PORT')}`));






