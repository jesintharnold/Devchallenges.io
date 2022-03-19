const chatroute=require("express").Router();
const {createChannel,getChatmessages, getAllChannels}=require('../Controller/CHAT/op-controller');

chatroute.route('/channel').get(getAllChannels).post(createChannel);
chatroute.route('/getChatmessages').post(getChatmessages);

module.exports=chatroute;




