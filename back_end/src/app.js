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
const { insertRoomMsg } = require("./DB/channel");
const { LoggerLevel } = require("mongodb");


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
    Socket.on("joinopenchannel",(payload)=>{
        
            logger.info(`------------------------`);
            joinAllchannels(Socket);
      
    })

    Socket.on('joinchannel',(payload)=>{
              Socket.join(payload.channelID);
              logger.warn(`${Socket.id}-Joined-${payload.channelID}`);
    })

    //channel section
    Socket.on('channel',payload=>{
        Socket.broadcast.emit('channel',payload);
    });
     
    Socket.on('roommessage',(roomData)=>{

    logger.info(roomData);
    const {error,value}=Msgschema.validate(roomData);
    if(value.channelID && value.Msg && value.ID){
        let res=insertRoomMsg(roomData);
        if(res==500){
          logger.error(res);
        }else{
             logger.warn(res); 
        }

        Socket.broadcast.emit(roomData);

    }
    else{
        logger.error(error);
    }

    });
    

});







logger.info(process.env.NODE_ENV);
http.listen(config.get('App.PORT'),()=>logger.info(`Server running on ${config.get('App.PORT')}`));






