const shoproute=require("express").Router();
const {}=require('../Controller');

//Main Page routes
shoproute.route('/items').get();       //OPEN TO ALL
shoproute.route('/items/add').post();  // OPEN TO ALL
shoproute.route('/list').patch().post(); //Make it as put so it can be created if it no exists


//History routes
shoproute.route('/history').get();
shoproute.route('/history/:historyid').get();
//Analytics
shoproute.route('/analytics').get();


module.exports=shoproute;