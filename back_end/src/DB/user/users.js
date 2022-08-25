const {logger}=require("../../utils/logger");
const {ObjectId}=require("mongodb");
const config=require("config");
let user_collection;

class UserDAO{
    static async injectCol(db){
       if(user_collection){
           return;
       }
       try{
           user_collection=await db.collection(config.get("dbConfig.col_user"));
           logger.info("User - collection connected");
       }
       catch(e){
            logger.error(`Error while connecting to User collection \n ${e}`);
       }
    };

    static async insertuser(user_payload){
        return await user_collection.insertOne(user_payload);
    };

    static async findprotectuser(email){
     return await user_collection.findOne({"email":email});
    };

    static async setlogout(userID){
     return await user_collection.updateOne({"_id":ObjectId(userID)},{$set:{"online":false}});
    };

    static async setOnline(email){
     return await user_collection.updateOne({"email":email},{$set:{online:true}});
    };
}


module.exports=UserDAO;