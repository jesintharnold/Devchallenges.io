const {logger}=require('../../utils/logger');
const {ObjectId}=require('mongodb');
const config=require("config");
let channel_collection;
class channelDAO{
    static async injectCol(db){
      if(channel_collection){
          return;
      }

      try{
         channel_collection=await db.collection(config.get("dbConfig.col_channel")); 
         logger.info('Channel - collection connected');
      }catch(e){
         logger.error('Channel collection error , \n ',e)
      }
   }


   static async createChannel(payload){
      return await channel_collection.insertOne({
            channelName:payload.channelName.trim(),
            channelDesc:payload.channelDesc.trim(),
            private:payload.private,
            messages:[],
            members:[{
              userID:payload.userID
            }]
          }).then(async (r)=>{
             let O=await channel_collection.find({_id:r.insertedId},{projection:{"channelName":1,"private":1,"channelDesc":1}}).toArray();
             O=O[0];
             O.insertedCount=1
             return O;
          });

      //  }catch(err){
         
      //     if(err.code===11000){
      //        return err.code;
      //     };
      //     return 500;
      //  }
   };


   static async getAllChannelName(){      
      return await channel_collection.find({},{projection:{"channelName":1,"_id":1,"channelDesc":1}}).toArray();
   }

   static async getopenchannels(){
      try{
         return await channel_collection.find({private:false},{projection:{"_id":1}}).toArray();
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
         let res=await channel_collection.updateOne({
            _id:ObjectId(payload.channelID)
         },{
            $push:{"messages":{
               message:payload.message,
               timestamp:payload.timestamp,
               userID:ObjectId(payload.userID)
            }}
         });


         logger.info(res);

         if(res.modifiedCount!==1){
            return 500;
         }
         return res;

      }catch(e){
        logger.error(e);
        return 500;
      }
   }

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

   static async getChannelmessages(payload){
      //META message tags are not added
      let pipeline=[
            {$match:{"_id" : ObjectId(payload.toString())}},
            {$project:{messages:1,_id:0}},
            {$unwind : "$messages"},
            {$lookup:{from:"users",localField:"messages.ID",foreignField:"_id",as:"USD"}},
            {$project:{message:"$messages.message",userID:"$messages.userID",timestamp:"$messages.timestamp",IDNAME:{$first:"$USD.Name"},PROFILEURL:{$first:"$USD.Profileurl"}}}
         ];
    
      return await channel_collection.aggregate(pipeline).toArray();
   };

   static async getChannelMembers(payload){
      let pipeline=[
         {$match:{"_id" : ObjectId(payload.toString())}},
         {$project:{members:1,_id:0}},
         {$unwind : "$members"},
         {$lookup:{from:"users",localField:"members.userID",foreignField:"_id",as:"Channelmember"}},
         {$project:{name:{$first:"$Channelmember.name"},status:{$first:"$Channelmember.online"},profile:{$first:"$Channelmember.profile_url"}}}
         ];
      return await channel_collection.aggregate(pipeline).toArray();
   }
}

module.exports=channelDAO;