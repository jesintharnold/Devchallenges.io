const {logger}=require('../../utils/logger');
const {channelSchema,getmessageSchema,messageSchema}=require('../../Schema/chatschemaval');
const channelDAO =require('../../DB/chat/channel');
const Events = require('./chat.Events');
const APIError = require('../../utils/APIError');
const asyncWrapper=require("../../utils/asyncWrapper");


const createChannel=asyncWrapper(async (req,res,next)=>{
    let {error,value}=channelSchema.validate(req.body);
    if(error){
      next(error);
    }else{
      let _res=await channelDAO.createChannel(value);
      if(_res.insertedCount===1){
        res.status(201).send({
            channelDesc: _res.channelDesc,
            channelName: _res.channelName,
            _id:_res._id
          });
      };
    }
});

const getAllChannels=asyncWrapper(async(req,res,next)=>{
  let _res=await channelDAO.getAllChannelName();
  if(_res.length>0){
    res.status(200).send(_res);
  }else{
    next(new APIError({name:"ItemNotFound",message:"No channels found , please start adding",statusCode:400}));
  }
})

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

const getChatmessages=asyncWrapper(async (req,res,next)=>{
  let {error,value}=getmessageSchema.validate(req.body);
   if(error){
      next(error);
    }else{
      let _res=await channelDAO.getChannelmessages(value.channelID);
      if(_res.length>0){
        res.status(200).send(_res);
      }else{
      next(new APIError({name:"ItemNotFound",message:"No Messages found",statusCode:400}));
      }
  }
});

const getMembers=async(req,res,next)=>{
let {channelID}=req.params;
let {error,value}=getmessageSchema.validate({channelID:channelID});
if(error){
  next(error);
}else{
   let res_=await channelDAO.getChannelMembers(value.channelID);
   if(res_.length>0){
    res.status(200).json({members:res_});
   }else{
    next(new APIError({name:"ItemNotFound",message:"No Members found",statusCode:400}));
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