const {logger}=require('../../utils/logger');
const {ObjectId, MongoAPIError}=require('mongodb');
const {duplicate_error}=require("../../utils/ErrorObject");
const config=require("config");
let imageupload_collection;
class imageuploadDAO{
    static async injectCol(db){
      if(imageupload_collection){
          return;
      };
    imageupload_collection=await db.collection(config.get("dbConfig.col_imageupload")); 
    logger.info('imageuploader collection is connected');
   };
   
   
   
   static async InsertData({userid,url,shorturl}){
        return await imageupload_collection.insertOne({
            userid:ObjectId(userid),
            url:url,
            shorturl:shorturl
        });
   }

   static async findId(payload){
        return await imageupload_collection.findOne({"shorturl":payload});
    }

};

module.exports=imageuploadDAO;