const express=require("express")();
const config=require("config");
const cors =require("cors");
const {logger}=require('./utils/logger'); 
const bodyParser = require('body-parser');
const channelDAO=require('./DB/chat/channel');
const {Dbconnect}=require('./DB/dbcon');
const {Server}=require("socket.io");
const route=require('./Routes/route.js');
const userDAO=require("./DB/user/users");
const imageuploadDAO=require("./DB/imageupload/imageupload");
const { globalHandle } = require("./utils/ErrorObject");
const { ListDAO,ItemDAO } = require("./DB/shoppingify/shoppingify");
const SocketInit=require('../src/Controller/chat/chat.socket');


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


//Http server
const http=require('http').createServer(express);

//Socket IO server
const io=new Server(http,{
    cors:{
        origin:config.get("clientOrgin"),
        credentials:true
    }}
);


http.listen(config.get('App.PORT'),()=>{
    logger.info(`Server running on ${config.get('App.PORT')}`);
    
    //Initate io server here
    SocketInit({io:io});
});


module.exports=http;





