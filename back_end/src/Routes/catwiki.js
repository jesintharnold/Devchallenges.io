const catroute=require("express").Router();
const {getCatbyname,getCats,getSearch}=require("../Controller/catwiki/catwiki");

catroute.route('/cats/:limit').get(getCats);
catroute.route('/search/:name').get(getCatbyname);
catroute.route('/recommend').get(getSearch);


module.exports=catroute;