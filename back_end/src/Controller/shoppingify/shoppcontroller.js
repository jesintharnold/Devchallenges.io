const {logger}=require('../../utils/logger');
const asyncWrapper=require("../../utils/asyncWrapper");
const APIError = require('../../utils/APIError');
const {ItemDAO,ListDAO}=require('../../DB/shoppingify/shoppingify');
const {addItemSchema,cartgetSchema,historySchema,postCartSchema,overviewSchema}=require('../../Schema/shopschemaval');


const getAllItems=asyncWrapper(async(req,res,next)=>{
  //logger.warn(req.body);
  let mon_res=await ItemDAO.getItems();
  if(mon_res.length<=0){
    next(new APIError({name:"ItemNotFound",message:"No Items found , Please start by adding",statusCode:400}));
  }else{
    return res.status(200).json({
      data:mon_res
    });
  }
});

const getAllCategory=asyncWrapper(async (req,res,next)=>{
  logger.warn(req.body);
  let mon_res=await ItemDAO.getCategory();
  logger.info(mon_res);
  if(mon_res.length<=0){
    next(new APIError({name:"ItemNotFound",message:"No Items found , Please start by adding",statusCode:400}));
  }else{
    return res.status(200).json({
      data:mon_res
    });
  }
});

const addshopItem=asyncWrapper(async(req,res,next)=>{
  logger.warn(req.body);
  let {error,value}=addItemSchema.validate(req.body);
  if(error){
    next(error); //Pass error to global handler
  }else{
    let resp_=await ItemDAO.addItem({
      categoryID:value.categoryID||null,
      categoryname:value.categoryname,
      name:value.name,
      imageurl:value.imageurl,
      description:value.description
    });
    if(resp_){
      res.status(201).json({
        data:resp_
      });
    };
  }
});

const getshopList=asyncWrapper(async(req,res,next)=>{
 logger.warn(req.body);
 let {error,value}=cartgetSchema.validate(req.body);
 if(error){
  next(error);
 };
 let resp_=await ListDAO.getList({userID:value.userID});
 if(resp_.length<=0){
  next(new APIError({name:"ItemNotFound",message:"No Items found , Please start by adding",statusCode:400}));
 }else{
 res.status(200).json({data:resp_});
 }
});

const postshopList=asyncWrapper(async(req,res,next)=>{
logger.warn(req.body);
let {error,value}=postCartSchema.validate(req.body);
if(error){
 next(error);
};
let resp_=await ListDAO.postList(value);
if(resp_){
res.status(201).json({data:resp_});
}
});

const historyshopList=asyncWrapper(async(req,res,next)=>{
logger.warn(req.body);  
let {error,value}=cartgetSchema.validate(req.body);
logger.info(value);
if(error){
next(error);
};
let resp_=await ListDAO.history({userID:value.userID});
logger.warn(resp_);
if(resp_.length>0){
  res.status(200).json({
    data:resp_
  });
}else{
  next(new APIError({name:"ItemNotFound",message:"No History found , Please start by changing status",statusCode:400}));
}
});

const historyviewshopList=asyncWrapper(async(req,res,next)=>{
logger.warn(req.body);  
let {historyid}=req.params;
logger.warn(historyid);
let {error,value}=historySchema.validate({listID:historyid});
if(error){
next(error);
};
let resp_=await ListDAO.historyView({listID:value.listID});
if(resp_.length>0){
  res.status(200).json({
    data:resp_
   });
}else{
  next(new APIError({name:"ItemNotFound",message:"Unable to Retrive items for the HistoryID mentioned",statusCode:400}));
}
});

const itemOverview=asyncWrapper(async(req,res,next)=>{
logger.warn(req.body);
let {error,value}=overviewSchema.validate({categoryID:req.body.categoryID,itemID:req.body.itemID,userID:req.body.userID});
if(error){
next(error);
};
let resp_=await ItemDAO.itemOverview({categoryID:value.categoryID,itemID:value.itemID});
if(resp_.length>0){
  res.status(200).json({
    data:resp_
   });
}else{
  next(new APIError({name:"ItemNotFound",message:"Unable to Retrive items for the Item and Category mentioned",statusCode:400}));
}
});


module.exports={
historyviewshopList,
historyshopList,
postshopList,
getshopList,
addshopItem,
getAllItems,
getAllCategory,
itemOverview
};
