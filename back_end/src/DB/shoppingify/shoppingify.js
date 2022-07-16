const {logger}=require("../../utils/logger");
const {ObjectId}=require("mongodb");
const config=require("config");
const { mode } = require("crypto-js");

let shop_collection;
let list_collection;
//collection name - items

class ItemDAO{
    static async injectCol(db){
      if(shop_collection){
           return;
       }
      shop_collection=await db.collection(config.get("dbConfig.col_items"));
      logger.info("Shop -  collection connected");
    };
    static async getItems(){
      return await shop_collection.find().toArray();
    };
    static async getCategory(){
      return await shop_collection.find({}).project(["category"]).toArray();
    };
    static async addItem(payload){
      let payload_={ 
        item:payload.name,
        itemID:ObjectId(),
        imageurl:payload.imageurl,
        description:payload.description
      };
      let check_category_items=await shop_collection.find({_id:ObjectId(payload.categoryID)}).toArray(); 
      if(check_category_items.length===0||payload.categoryID===null){
        return await shop_collection.insertOne({
          category:payload.categoryname,
          items:[payload_]
        }).then((q)=>{return {...payload_,categoryID:q.insertedId}});  
      }else{
        return await shop_collection.updateOne({_id:ObjectId(payload.categoryID),'items.item':{'$ne':payload.name}},{
          $addToSet:{"items":{...payload_}}
        }).then((q)=>{return {...payload_,categoryID:payload.categoryID}});
      } 

    };
    static async itemOverview(payload){
      return await shop_collection.find({"_id":ObjectId(payload.categoryID),"items.itemID":ObjectId(payload.itemID)}).project(["items.$"]).toArray();
    }
};

class ListDAO{
  static async injectCol(db){
    if(list_collection){
         return;
     }
    list_collection=await db.collection(config.get("dbConfig.col_list"));
    logger.info("List -  collection connected");
  };
  static async getList(payload){
    return await list_collection.find({status:'Active',userID:ObjectId(payload.userID)}).toArray();
  };
  static async postList(payload){
   let q=await list_collection.find({status:'Active',userID:ObjectId(payload.userID)}).toArray();
   if(q.length>=1){
   await list_collection.updateMany(
    {status:'Active',userID:ObjectId(payload.userID)},
    {$set:{'status':'completed'}}
   );
   };
  if(payload.cartID!==null){
    return await list_collection.replaceOne({
      _id:ObjectId(payload.cartID),
      userID:ObjectId(payload.userID)
      },{
       name:payload.listname,
       status:payload.status,
       list:[...payload.list],
       timestamp:Date.now(),
       userID:ObjectId(payload.userID)
      }).then(({modifiedCount})=>{return {update:modifiedCount===1,cartID:payload.cartID}});   //check on return types
  }else{
    return await list_collection.insertOne({
       name:payload.listname,
       status:payload.status,
       list:[...payload.list],
       timestamp:Date.now(),
       userID:ObjectId(payload.userID)
      }).then(({insertedId})=>{return {cartID:insertedId,update:true}}).catch(e=>{throw e});//check on return types
  }
  };
  static async history(payload){
   return await list_collection.aggregate([
    {$match:{status:{$ne:"Active"},userID:ObjectId("622f2294a6a47c987f87ab22")}},
    {$project:{listID:"$_id","timestamp_":{"$toDate":{"$toLong":"$timestamp"}},status:1,name:1,timestamp:1}},
    {$group:{_id:{ 
    $dateToString: { date:"$timestamp_", format: "%m/%Y"}},
    data:{$addToSet:{listID:"$listID",status:"$status",name:"$name",timestamp:"$timestamp"}}}},
    {$project:{data:1,monthyear:"$_id",_id:0}}    
  ]).toArray();
  //return await list_collection.find({status:{$ne:'Active'}},{status:1,name:1,timestamp:1}).toArray();
  };
  static async historyView(payload){
  return await list_collection.find({_id:ObjectId(payload.listID)}).toArray();
  };
  static async analytics(payload){
  };
};

module.exports={
ItemDAO,
ListDAO
};