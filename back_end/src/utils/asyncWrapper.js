const { logger }=require("./logger");

const asyncWrapper=(fn)=>(req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
//https://gist.github.com/Hiswe/fe83c97d1c7c8eee9557939d1b9bc086
//take a function // their arguments and bind the function with the arguments
module.exports=asyncWrapper;