const {logger}=require('../../utils/logger');
const {channelSchema,getmessageSchema,messageSchema}=require('../../Schema/chatschemaval');
const channelDAO =require('../../DB/chat/channel');
const Events = require('./chat.Events');


const createChannel=async (req,res,next)=>{
    let {error,value}=channelSchema.validate(req.body);
    if(error){
        res.status(500).send({Err:`Missing Input (or) Validation Error \n`,error});
    }else{
      let _res=await channelDAO.createChannel(req.body);
      if(_res.insertedCount===1){
        res.status(201).send({
            channelDesc: _res.channelDesc,
            channelName: _res.channelName,
            _id:_res._id
          });
      }
      if(_res===11000){
        return res.status(400).send({Err:`Channel name already exists`,Errcode:11000})
      }
      if(_res===500){
        return res.status(500).send({Err:`Internal Server Error`});
      }
    }
};

const getAllChannels=async(req,res,next)=>{
  let _res=await channelDAO.getAllChannelName();
  res.status(200).send(_res);
}

const joinAllchannels=async (socket)=>{
 let res=await channelDAO.getopenchannels();
 if(res.length>0){
   res.forEach(element => {
     socket.join(element._id);
     logger.warn(`${socket.id}-Joined-${element._id}`);
   });
 }else{
   logger.warn(`No channels found to Join`);
 }
}

const getChatmessages=async (req,res,next)=>{
  logger.info(`Get Messages - CHAT -`,req.body);
  let {error,value}=getmessageSchema.validate(req.body);
   if(error){
        res.status(500).json({Err:`Missing Input (or) Validation Error \n`,error});
    }else{
      let _res=await channelDAO.getChannelmessages(value.channelID);
      if(_res===500){
        res.status(500).json({Err:`Internal Server Error`});
      }
      res.status(200).send(_res);
  }
};

const getMembers=async(req,res,next)=>{
let {channelID}=req.params;
let {error,value}=getmessageSchema.validate({channelID:channelID});
if(error){
  res.status(500).json({Err:`Missing Input (or) Validation Error \n`,error});
}else{
   let res_=await channelDAO.getChannelMembers(value.channelID);
   if(res_.length>0){
    res.status(200).json({members:res_});
   }else{
    res.status(500).json({Err:`Internal Server Error`});
   }
}
};

const sendMessages=async (socket,payload)=>{
let {error,value}=messageSchema.validate({
  channelID:payload.channelID,
  message:payload.message,
  timestamp:payload.timestamp,
  userID:payload.userID
});

if(error){
logger.info(socket.id);
socket.broadcast.to(socket.id).emit(Events.toast,{status:0,toast:"Message not delivarable"});
}else{
let res_=await channelDAO.insertRoomMsg(value);
if(res_.modifiedCount===1){
  socket.to(payload.channelID).emit(Events.recievemessage,
  {
  message:payload.message,
  timestamp:payload.timestamp,
  channelID:payload.channelID
  }
);
return;
};
socket.broadcast.to(socket.id).emit(Events.toast,{status:0,toast:"Message not delivarable"});
}};

module.exports={
    createChannel,
    joinAllchannels,
    getAllChannels,
    getChatmessages,
    getMembers,
    sendMessages
};