const express=require("express")();
const config=require("config");
const cors =require("cors");
const {logger}=require('./utils/logger');
const bodyParser = require('body-parser');
const { Socket } = require("socket.io");
const { appendFile } = require("fs");
const channelDAO=require('./DB/channel');
const http=require('http').createServer(express);
const {Dbconnect,DBclose}=require('./DB/dbcon');
const {joinAllchannels,createChannel} = require('./Controller/op-controller.js');
const route=require('./Routes/route.js');
const { Msgschema,channelSchema} = require('./Schema/schemaval.js');
const { join } = require("path");

Dbconnect().then(con=>{
    channelDAO.injectCol(con);
})

express.use(cors());
express.use(bodyParser.urlencoded({extended:true}));
express.use(bodyParser.json());
express.use(route);

const io=require("socket.io")(http,{
    cors:{
        origin:config.get("clientOrgin")
    }
});

//Initalize Socket.io with http server / express

io.on('connection',(Socket)=>{

    //It will allow us to join - Open Channels
    Socket.on("JOINOPEN",()=>{
        joinAllchannels(Socket);
    })

     
    Socket.on('sendRoomMessage',(roomData)=>{
    logger.info(roomData);
    });

   Socket.on('sendMessage',(msgData)=>{
       Socket.to("PEN").emit("Message",msgData);
       logger.info(msgData);
    });


});



logger.info(process.env.NODE_ENV);
http.listen(config.get('App.PORT'),()=>logger.info(`Server running on ${config.get('App.PORT')}`));






