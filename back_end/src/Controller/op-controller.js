const {logger}=require('../utils/logger');
const {channelSchema}=require('../Schema/schemaval');
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



const joinAllchannels=async (socket)=>{
 let res=await channelDAO.joinChannel();
 logger.info(res);

 if(res.length>0){
   
 }

}




module.exports={
    createChannel,
    joinAllchannels
}