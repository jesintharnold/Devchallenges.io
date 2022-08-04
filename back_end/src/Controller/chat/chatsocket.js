
const io=require("socket.io")(http,{
    cors:{
        origin:config.get("clientOrgin")
    }
});

io.on('connection',(Socket)=>{

    Socket.on("joinopenchannel",(payload)=>{
        joinAllchannels(Socket);  
    })

    Socket.on('joinchannel',(payload)=>{
        Socket.join(payload.channelID);
        logger.warn(`${Socket.id}-Joined-${payload.channelID}`);
    })

    Socket.on('channel',payload=>{
        Socket.broadcast.emit('channel',payload);
    });
     
    Socket.on('roommessage',(roomData)=>{

    const {error,value}=Msgschema.validate(roomData);
    if(value.channelID && value.Msg && value.ID){
        let res=insertRoomMsg(roomData);
        if(res==500){
          logger.error(res);
        }else{
          logger.warn(res); 
        }
        Socket.broadcast.emit('roommessage',roomData);
    }
    else{
        logger.error(error);
    }
    });
});