const {logger}=require("../utils/logger");
const {ObjectId}=require("mongodb");
let user_collection;

class UserDAO{
    static async injectCol(db){
       if(user_collection){
           return
       }
       try{
           user_collection=await db.collection("user");
           logger.info("User collection connected");
       }
       catch(e){
            logger.error(`Error while connecting to User collection \n ${e}`);
       }
    }


          
    static async finduser(email,user_payload){
    logger.info(user_payload);
    
        try{
            let r= await user_collection.findOneAndUpdate({"email":email},{$set:user_payload},{upsert:false});
            logger.info(r);
            return r;
        }
        catch(err){
            logger.error(`Unable to find the User - ${err}`);
            if(err.code===11000){
                return err.code;
             };
            return 500;
        }
    }

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
    }

    static async findprotectuser(email){
        try{
            return await user_collection.findOne({"email":email});
        }
        catch(e){
            logger.error(`Unable to find the User - ${e}`);
            return 500;
        }
    }
    
    

}


module.exports=UserDAO;