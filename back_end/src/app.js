const express=require("express")();
const config=require("config");
const cors=require("cors");
const {logger}=require('./utils/logger');
const bodyParser = require('body-parser');
const http=require('http').createServer(express);
const io=require("socket.io")(http);
//Initalize Socket.io with http server / express





logger.info(process.env.NODE_ENV);
http.listen(config.get('App.PORT'),()=>logger.info(`Server running on ${config.get('App.PORT')}`));






