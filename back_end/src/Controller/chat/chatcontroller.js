const {logger}=require('../../utils/logger');
const {channelSchema,getmessageSchema}=require('../../Schema/chatschemaval');
const channelDAO =require('../../DB/chat/channel');


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
            private: _res.private,
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
        return res.status(500).json({Err:`Internal Server Error`});
      }
      res.status(200).send(_res);
    }
};


const getMembers=async(req,res,next)=>{
let {channel_ID}=req.params;
let {error,value}=getmessageSchema.validate({channelID:channel_ID});
if(error){

}else{
   let res_=await channelDAO.getChannelMembers(value.channelID);
   
}
};




module.exports={
    createChannel,
    joinAllchannels,
    getAllChannels,
    getChatmessages
}