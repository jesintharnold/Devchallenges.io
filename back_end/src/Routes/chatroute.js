const chatroute=require("express").Router();
const {createChannel,getChatmessages, getAllChannels,getMembers}=require('../Controller/chat/chatcontroller');

chatroute.route('/channel').get(getAllChannels).post(createChannel);
chatroute.route('/getChatmessages').post(getChatmessages);
chatroute.route('/channel/:channel_ID/members').get(getMembers);
module.exports=chatroute;




