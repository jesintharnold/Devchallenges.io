const mongoDB=require('mongodb');
const config=require('config');
const {logger}=require('../utils/logger');

let db;
let mongoClient;

const Dbconnect=async ()=>{
    return new Promise((resolve,reject)=>{
    try{
        if(db){
            logger.info(`Using existing connection...`);
            resolve(db);
        }
        mongoDB.MongoClient.connect(config.get('dbConfig.conn_string'),{useNewUrlParser: true},function(err,client){
            if(err){
                logger.error(`DB connection fails \n`,err);
                reject(err);
            }
            mongoClient=client;           
            db=mongoClient.db(config.get('dbConfig.db_name'));
            logger.info(`Established new connection...`);
            logger.info(`Initating Connection .... ${mongoClient.topology.isConnected()?'Established':'Revoked'}`);
            resolve(db);
            process.on('exit',()=>{
              DBclose();
            });
        });
    }catch(e){
          logger.error(`Error during DB connection establishment \n`,e);
    }
    });
}

const DBclose=()=>{
    if(mongoClient && mongoClient.topology.isConnected()){
        logger.info(`MongoDB connection Closed...`);
        mongoClient.close();
    }
}

module.exports={
    Dbconnect,
    DBclose
}