const Events=require("./chat.Events");
const {joinAllchannels,sendMessages}=require("./chatcontroller");


const SocketInit=({io})=>{

    io.on(Events.connection,(socket)=>{

    socket.on(Events.joinopenchannel,()=>{
    joinAllchannels(socket);
    });

    socket.on(Events.joinchannel,(payload)=>{
    socket.join(payload.channelID);
    logger.info(`${socket.id}-Joined-${payload.channelID}`);
    });

    socket.on(Events.newchannel,(payload)=>{
    socket.broadcast.emit(Events.newchannel,payload); // Broadcast to all users
    });

    socket.on(Events.channelmessage,(payload)=>{
    sendMessages(socket,payload);
    });


    });
};


module.exports=SocketInit;