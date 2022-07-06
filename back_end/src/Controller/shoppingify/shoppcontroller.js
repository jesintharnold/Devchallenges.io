const {logger}=require('../../utils/logger');
const asyncWrapper=require("../../utils/asyncWrapper");
const APIError = require('../../utils/APIError');
const {ItemDAO,ListDAO}=require('../../DB/shoppingify/shoppingify');
const {addItemSchema,cartgetSchema,historySchema,postCartSchema}=require('../../Schema/shopschemaval');


const getAllItems=asyncWrapper(async(req,res,next)=>{
  let mon_res=await ItemDAO.getItems();
  if(mon_res.length<=0){
    next(new APIError({name:"ItemNotFound",message:"No Items found , Please start by adding",statusCode:200}));
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
 let {error,value}=cartgetSchema.valid(req.body);
 if(error){
  next(error);
 };
 let resp_=ListDAO.getList({userID:value.userID});
 if(resp_.length<=0){
  next(new APIError({name:"ItemNotFound",message:"No Items found , Please start by adding",statusCode:200}));
 }else{
 res.status(200).json({data:resp_});
 }
});

const postshopList=asyncWrapper(async(req,res,next)=>{
let {error,value}=postCartSchema.validate(req.body);
if(error){
 next(error);
};
let resp_=ListDAO.postList({});
if(resp_){
res.status(201).json({data:data});
}
});

const historyshopList=asyncWrapper(async(req,res,next)=>{
let {error,value}=cartgetSchema.validate(req.body);
if(error){
next(error);
};
let resp_=ListDAO.history({userID:value.userID});
if(resp_.length>0){
  res.status(200).json({
    data:data
  });
}else{
  next(new APIError({name:"ItemNotFound",message:"No History found , Please start by changing status",statusCode:200}));
}
});

const historyviewshopList=asyncWrapper(async(req,res,next)=>{
let {historyid}=req.params;
let {error,value}=historySchema.validate({listID:historyid});
if(error){
next(error);
};
let resp_=ListDAO.historyView({listID:value.listID});
if(resp_.length>0){
  res.status(200).json({
    data:resp_
   });
}else{
  next(new APIError({name:"ItemNotFound",message:"Unable to Retrive items for the HistoryID mentioned",statusCode:200}));
}
});


module.exports={
historyviewshopList,
historyshopList,
postshopList,
getshopList,
addshopItem,
getAllItems
};
