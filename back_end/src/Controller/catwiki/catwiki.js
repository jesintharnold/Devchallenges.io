const {logger}=require('../../utils/logger');
const APIError = require('../../utils/APIError');
const asyncWrapper=require("../../utils/asyncWrapper");
const  axios  = require('axios');
const config=require("config");


const getCats=asyncWrapper(async (req,res,next)=>{
    let limit=req.params.limit;
    let api_res=await axios.get(`https://api.thecatapi.com/v1/breeds?limit=${limit}`,
    {
      headers:{
        "X-Api-Key": config.get("CAT.key"),
        "content-type":"application/json; charset=utf-8"
      }  
    });
    if(api_res.data.length>0){
        let payload=await api_res.data.map(({name,description,id,image:{url}})=>({name:name,url:url,description:description,id:id}));
        return res.status(200).json(payload);
    }else{
      next(new APIError({name:"Fetch error",message:"unable to fetch items from cat API",statusCode:500}));
    }

});


const getCatbyname=asyncWrapper(async(req,res,next)=>{
    let {name}=req.params;

    let api_res=await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${name}&limit=9`,
    {
      headers:{
        "X-Api-Key": config.get("CAT.key"),
        "content-type":"application/json; charset=utf-8"
      }  
    });

    if(api_res.data.length>0){
      
        let {name,description,temperament,origin,life_span,adaptability,
            affection_level,child_friendly,grooming,intelligence,health_issues,
            social_needs,stranger_friendly,id}=api_res.data[0].breeds[0];
        let url=api_res.data.map(({url})=>(url));

        let payload={
           name:name,
           description:description,
           temperament:temperament,
           origin:origin,
           life_span:life_span,
           adaptability:adaptability,
           affection_level:affection_level,
           child_friendly:child_friendly,
           grooming:grooming,
           intelligence:intelligence,
           health_issues:health_issues,
           social_needs:social_needs,
           stranger_friendly:stranger_friendly,
           id:id,
           url:url  
        };    
        return res.status(200).json(payload);
    }else{
           next(new APIError({name:"Fetch error",message:"unable to fetch items from cat API",statusCode:500}));
    }
});

const getSearch=asyncWrapper(async (req,res,next)=>{
 
  let api_res=await axios.get(`https://api.thecatapi.com/v1/breeds`,
  { headers:{
      "X-Api-Key": config.get("CAT.key"),
      "content-type":"application/json; charset=utf-8"
    }  
  });

  if(api_res.data.length>0){
    let payload=api_res.data.map(({name,id})=>({name:name,id:id}));
    return res.status(200).json(payload);
  }else{
    next(new APIError({name:"Fetch error",message:"unable to fetch items from cat API",statusCode:500}));
  }

});


module.exports={
    getCatbyname,
    getCats,
    getSearch
};