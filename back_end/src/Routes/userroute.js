const userroute=require("express").Router();
const {getuserProfile,getuserProfileupdate}=require('../Controller/User/Usercontroller');
//const {bucketupload} = require("../Middlewares/bucket");

userroute.route('/').get(getuserProfile);
userroute.route('/update').patch(getuserProfileupdate);


module.exports=userroute;