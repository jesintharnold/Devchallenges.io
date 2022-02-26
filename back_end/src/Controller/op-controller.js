const {logger}=require('../utils/logger');
const {channelSchema,getmessageSchema}=require('../Schema/schemaval');
const channelDAO =require('../DB/channel');

const createChannel=async (req,res,next)=>{
    let {error,value}=channelSchema.validate(req.body);
    if(error){
        res.status(500).json({Err:`Missing Input (or) Validation Error \n`,error});
    }else{
      let _res=await channelDAO.createChannel(req.body);
      if(_res.insertedCount===1){
          res.status(201).send(_res);
      }
      if(_res===11000){
        return res.status(404).json({Err:`Channel name already exists`})
      }
      return res.status(500).json({Err:`Internal Server Error`});
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
  let {error,value}=getmessageSchema.validate(req.body);
   if(error){
        res.status(500).json({Err:`Missing Input (or) Validation Error \n`,error});
    }else{
      let _res=await channelDAO.getChannelmessages(value.channelID);
      res.status(200).send(_res);
    }
}

module.exports={
    createChannel,
    joinAllchannels,
    getAllChannels,
    getChatmessages
}