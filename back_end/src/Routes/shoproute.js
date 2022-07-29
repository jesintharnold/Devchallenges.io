const shoproute=require("express").Router();
const {getAllItems,getshopList,addshopItem,postshopList,historyshopList,historyviewshopList,getAllCategory,itemOverview, listanalytics}=require('../Controller/shoppingify/shoppcontroller');

//Main Page routes
shoproute.route('/items').get(getAllItems).post(addshopItem);              //OPEN TO ALL
shoproute.route('/items/category').get(getAllCategory);
shoproute.route('/list').get(getshopList).put(postshopList); //Make it as put so it can be created if it no exists
shoproute.route('/items/overview').post(itemOverview); 
 
// req.body.userID=userID

//History routes
shoproute.route('/history').get(historyshopList);
shoproute.route('/history/:historyid').get(historyviewshopList);

//Analytics
shoproute.route('/analytics').get(listanalytics);


module.exports=shoproute;