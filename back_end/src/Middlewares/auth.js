const config=require("config");
const { logger } = require("../utils/logger");

const Tokencheck=(req,res,next)=>{
req.body.userID="622f2294a6a47c987f87ab22";
logger.error("Reached Middleware");
next();
};

module.exports={Tokencheck};
