const {logger}=require('../../utils/logger');
const {ObjectId}=require('mongodb');


let imageupload_collection;
class imageuploadDAO{
    static async injectCol(db){
      if(imageupload_collection){
          return;
      }

      try{
        imageupload_collection=await db.collection("imageuploader"); 
         logger.info('imageuploader collection is connected');
      }catch(e){
         logger.error('imageuploader collection error , \n ',e);
      }
   };

   static async InsertData(payload){
    try{
        let r= await imageupload_collection.insertOne(payload);
        logger.info(r);
        return r;
    }
    catch(err){
        logger.error(`Unable to perform Insert operation Image Upload - ${err}`);
        if(err.code===11000){
            return err.code;
         };
         return 500;
    }
   }

   static async findId(payload){
    try{
        return await user_collection.findOne({"ItemID":payload});
    }
    catch(e){
        logger.error(`Unable to find the ItemID - ${e}`);
        return 500;
    }
}

};

module.exports=imageuploadDAO;