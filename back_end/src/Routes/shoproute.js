const shoproute=require("express").Router();
const {getAllItems,getshopList,addshopItem,postshopList,historyshopList,historyviewshopList}=require('../Controller/shoppingify/shoppcontroller');

//Main Page routes
shoproute.route('/items').get(getAllItems);                   //OPEN TO ALL
shoproute.route('/items/add').post(addshopItem);              //OPEN TO ALL
shoproute.route('/list').get(getshopList).post(postshopList); //Make it as put so it can be created if it no exists
 
// req.body.userID=userID

//History routes
shoproute.route('/history').get(historyshopList);
shoproute.route('/history/:historyid').get(historyviewshopList);

//Analytics
shoproute.route('/analytics').get();


module.exports=shoproute;