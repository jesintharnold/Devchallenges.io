const {logger}=require("../../utils/logger");
const {ObjectId}=require("mongodb");
const config=require("config");

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
    static async addItem(payload){
      let payload_={ 
        item:payload.name,
        itemID:ObjectId(),
        imageurl:payload.imageurl,
        description:payload.description
      };
      let check_category_items=await shop_collection.find({_id:payload.categoryID}).toArray(); 
      if(check_category_items.length===0||payload.categoryID===null){
        return await shop_collection.insertOne({
          category:payload.categoryname,
          items:[payload_]
        }).then(res_=>{logger.info(payload_,res_);payload_});   //Items along with payload
      }else{
        //Add Item - update addtoset
        return await shop_collection.updateOne({_id:payload.categoryID,'items.item':{'$ne':payload.name}},{
          $addToSet:{"items":{...payload_}}
        }).then(q=>payload_);
      } 

    };
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
    return await list_collection.find({status:'Active',userID:payload.userID}).toArray();
  };
  static async postList(payload){
   let q=await list_collection.find({status:'Active',userID:payload.userID}).toArray();
   if(q.length>1){
   await list_collection.findAndModify({
    query:{status:'Active',userID:payload.userID},
    update:{$set:{'status':'completed'}}
   });
   };
  if(payload.cartID!==null){
    await list_collection.updateOne({
      _id:payload.cartID,
      userID:payload.userID
      },{
       name:payload.listName,
       status:payload.status,
       items:[...payload.items],
       timestamp:Date.now()
      }).then(q=>{return q}).catch(e=>{throw e});   //check on return types
  }else{
    await list_collection.insertOne({
       name:payload.listName,
       status:payload.status,
       items:[...payload.items],
       timestamp:Date.now(),
       userID:payload.userID
      }).then(q=>{return q}).catch(e=>{throw e});//check on return types
  }
  };
  static async history(payload){
   return await list_collection.aggregate([
    {$match:{status:{$ne:"Active"},userID:payload.userID}},
    {$project:{categoryID:"$_id",timestamp:1,status:1,name:1}},
    {$group:{
        _id: { $dateToString: { date: "$timestamp", format: "%m/%Y"}},
        data:{$addToSet:{_id:"$categoryID",status:"$status",name:"$name"}}
    }},
    {$project:{data:1,month_year:"$_id",_id:0}}
  ]);
  //return await list_collection.find({status:{$ne:'Active'}},{status:1,name:1,timestamp:1}).toArray();
  };
  static async historyView(payload){
  return await list_collection.find({_id:payload.listID}).toArray();
  };
  static async analytics(payload){
  };
};

module.exports={
ItemDAO,
ListDAO
};