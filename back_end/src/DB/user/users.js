const {logger}=require("../../utils/logger");
const {ObjectId}=require("mongodb");
const config=require("config");
let user_collection;

class UserDAO{
    static async injectCol(db){
       if(user_collection){
           return
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

        try{
            let r= await user_collection.insertOne(user_payload);
            logger.info(r);
            return r;
        }
        catch(err){
            logger.error(`Unable to perform Insert operation - ${err}`);
            if(err.code===11000){
                return err.code;
             };
             return 500;
        }
    };

    static async findprotectuser(email){
        try{
            return await user_collection.findOne({"email":email});
        }
        catch(e){
            logger.error(`Unable to find the User - ${e}`);
            return 500;
        }
    };

    static async setlogout(userID){
     return await user_collection.updateOne({"_id":ObjectId(userID)},{$set:{"online":false}});
    };

    static async setOnline(email){
     return await user_collection.updateOne({"email":email},{$set:{online:true}});
    };
}


module.exports=UserDAO;