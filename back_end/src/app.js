const express=require("express")();
const config=require("config");
const cors =require("cors");
const {logger}=require('./utils/logger'); 
const bodyParser = require('body-parser');
const channelDAO=require('./DB/chat/channel');
const http=require('http').createServer(express);
const {Dbconnect}=require('./DB/dbcon');
const route=require('./Routes/route.js');
const userDAO=require("./DB/user/users");
const imageuploadDAO=require("./DB/imageupload/imageupload");
const { globalHandle } = require("./utils/ErrorObject");
const { ListDAO,ItemDAO } = require("./DB/shoppingify/shoppingify");

express.use(cors());
express.use(bodyParser.urlencoded({extended:true}));
express.use(bodyParser.json());
express.use(route);
express.use(globalHandle);

Dbconnect().then(con=>{
    channelDAO.injectCol(con);
    userDAO.injectCol(con);
    imageuploadDAO.injectCol(con);
    ListDAO.injectCol(con);
    ItemDAO.injectCol(con);
});

http.listen(config.get('App.PORT'),()=>logger.info(`Server running on ${config.get('App.PORT')}`));


module.exports=http;





