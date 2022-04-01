const { MulterError } = require('multer');
const APIError=require('./APIError');
const {logger}=require('./logger');


const duplicate_error=(err)=>{
     let value =err.errmsg.split('key:').pop();
     let message=`Duplicate field value: ${value}.Please try again`;
     logger.warn(new APIError({name:`Duplicate Error`,message:message,statusCode:400}));
     return new APIError({name:`Duplicate Error`,message:message,statusCode:400});
};

const Image_upload_drag=(err)=>{
    return new APIError({name:`Image Upload Error`,message:err.message,statusCode:400});
}

//Error - const {error,value}=Joi.validate();
const joi_validation_error=(err)=>{
    return new APIError({name:`ValidationError`,message:err.message,statusCode:400});
};

const jwt_invalid_token=()=>new APIError({name:"InvalidToken",message:"Invalid Token, Please Login Again",statusCode:401});
const jwt_permission_error=()=>new APIError({name:"PermissionError",message:"You don't have permission to access to content",statusCode:401});                                        
const jwt_token_expired=()=>new APIError({name:"TokenExpired",message:"Your Token has expired, Please Login Again",statusCode:401});
    

//Development - function 
const devfunc=(err,req,res)=>{
logger.error(err);
return res.status(err.statusCode).json({
    error:err,
    message:err.message,
    name:err.name,
    isOperational:err.isOperational
});
};


//Production  - object
const prodfunc=(err,req,res)=>{
    if(err.isOperational){
        return res.status(err.statusCode).json({
            name:err.name,
            message:err.message
        });
    };


    return res.status(500).json({
        status: 'unknown-error',
        message: 'Something went very wrong'
    })
};

//global handler for centralized error handling

const globalHandle=(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    if(process.env.NODE_ENV==='development'){
       devfunc(err,req,res);

       //development
       //production
    }
    else if(process.env.NODE_ENV==='production'){
        if(err.name===`ValidationError`) err=joi_validation_error(err);
        if(err.code===11000) err=duplicate_error(err);
        if(err.name===`InvalidToken`) err=jwt_invalid_token();
        if(err.name===`PermissionError`) err=jwt_permission_error();
        if(err.name===`TokenExpired`) err=jwt_token_expired();   
        if(err.code===`LIMIT_FILE_SIZE`) err=Image_upload_drag(err);
        prodfunc(err,req,res);
    };
};

module.exports={globalHandle,duplicate_error};
