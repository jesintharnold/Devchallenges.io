const { func } = require('joi');
const {logger}=require('../utils/logger');

let channel_collection;
class channelDAO{
    static async injectCol(db){
      if(channel_collection){
          return;
      }

      try{
         channel_collection=await db.collection("channel");
         logger.info('Channel collection is connected');
      }catch(e){
         logger.error('Channel collection error , \n ',e)
      }
   }


   static async createChannel(payload){
       try{      //change payload to array

           
          let res=await channel_collection.insertOne({
            channelName:payload.channelName,
            channelDesc:payload.channelDesc,
            private:payload.private,
            messages:[],
            members:[{
              userID:payload.userID,
              name:payload.userName
            }]
          }).then(async (r)=>{
             let O=await channel_collection.find({_id:r.insertedId},{projection:{"channelName":1,"private":1}}).toArray();
             O=O[0];
             O.insertedCount=1
             return O;
          });

          logger.warn(res);
         return res;

       }catch(err){
         
          if(err.code===11000){
             return err.code;
          };
          return 500;
       }
   }


   static async getAllChannelName(){
      try{
       return await channel_collection.find({},{"name":1,"_id":1}).toArray();
      }catch(e){
         logger.error(e);
         return 500;

      }
   }

   static async getopenchannels(){
      try{
         return await channel_collection.find({private:false},{"_id":1}).toArray();
      }catch(e){
         logger.error(e);
         return 500;
      }
   }

   static async getChannelData(payload){
      try{
       return await channel_collection.find({"name":payload.name,"id":payload.id}).toArray();
      }catch(e){
         logger.error(e);
         return 500;
      }
   }

   static async insertRoomMsg(payload){
      try{
         //Check channel ID and Push a new msg to messages array
         let res=await channel_collection.update({
            _id:payload.channelID
         },{
            $push:{Members:{
               Msg:payload.msg,
               Dat:payload.Dat
            }}
         });

         //return if insertedCount is not 1
         if(res.insertedCount!==1){
            return 500;
         }
         return res;

      }catch(e){
        logger.error(e);
        return 500;
      }
   }

   // User clicks on the invitation sends allows user to join to the channel.
   static async joinChannel(payload){
     try{
         let res=await channel_collection.update({
            _id:payload.channelID
         },{
            $push:{Members:payload}
         })
     }catch(e){
      logger.error(e);
      return 500;
     }
   }

}

module.exports=channelDAO;