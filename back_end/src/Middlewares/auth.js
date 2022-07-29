const config=require("config");

const Tokencheck=(req,res,next)=>{
req.body.userID="622f2294a6a47c987f87ab22";
next();
};

module.exports={Tokencheck};
