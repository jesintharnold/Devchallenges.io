const shoproute=require("express").Router();
const {}=require('../Controller');

//Main Page routes
shoproute.route('/items').get();
shoproute.route('/items/add').post();
shoproute.route('/list').patch().post();

//History routes
shoproute.route('/history').get();
shoproute.route('/history/:historyid').get();
//Analytics
shoproute.route('/analytics').get();


module.exports=shoproute;