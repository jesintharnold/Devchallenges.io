const {logger}=require("../../utils/logger");
const {ObjectId}=require("mongodb");
const config=require("config");

let shop_collection;
let item_collection;
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
      let check_category_items=await shop_collection.find({_id:payload.category_ID}).toArray();
      let payload_={ 
        item:payload.itemname,
        item_ID:ObjectId(),
        imageurl:payload.imageurl,
        description:payload.description
      };
      if(check_category_items.length===0){
        await shop_collection.insert({
          category:payload.name,
          items:[payload_]
        }).then(q=>{return payload_}).catch(e=>{throw e});
      }else{
        //Add Item - update addtoset
        await shop_collection.updateOne({_id:payload.categoryID,'items.item':{'$ne':payload.name}},{
          $addToSet:{"items":{...payload_}}
        }).then(q=>payload_).catch(e=>{throw e});
      } 
    };
};

class ListDAO{
  static async injectCol(db){
    if(item_collection){
         return;
     }
    item_collection=await db.collection(config.get("dbConfig.col_list"));
    logger.info("List -  collection connected");
  };
  static async getList(payload){
    return await item_collection.find({status:'Active'}).toArray();
  };
  static async postList(payload){
   let q=await item_collection.find({status:'Active'}).toArray();
   if(q.length>1){
   await item_collection.findAndModify({
    query:{status:'Active'},
    update:{$set:{'status':'completed'}}
   });
   };
   await item_collection.updateOne({
   _id:payload.cartID,
   userID:payload.userID
   },{
    name:payload.listName,
    status:payload.status,
    items:[...payload.items],
    timestamp:Date.now()
   }).then(q=>{return q}).catch(e=>{throw e});
  };
  static async history(){
   return await item_collection.aggregate([
    {$match:{status:{$ne:"Active"}}},
    {$project:{cat_ID:"$_id",timestamp:1,status:1,name:1}},
    {$group:{
        _id: { $dateToString: { date: "$timestamp", format: "%m/%Y"}},
        data:{$addToSet:{_id:"$cat_ID",status:"$status",name:"$name"}}
    }},
    {$project:{data:1,month_year:"$_id",_id:0}}
  ]);
  //return await item_collection.find({status:{$ne:'Active'}},{status:1,name:1,timestamp:1}).toArray();
  };
  static async historyView(payload){
  return await item_collection.find({_id:payload.listID}).toArray();
  };
  static async analytics(payload){

  };
};

module.exports={
ItemDAO,
ListDAO
};