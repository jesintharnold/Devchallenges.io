const userroute=require("express").Router();
const {getuserProfile,getuserProfileupdate}=require('../Controller/User/Usercontroller');

userroute.route('/:email').get(getuserProfile);
userroute.route('/update').patch(getuserProfileupdate);


module.exports=userroute;