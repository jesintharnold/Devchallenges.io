const chatroute=require("express").Router();
const {createChannel,getChatmessages, getAllChannels,getMembers}=require('../Controller/chat/chatcontroller');

chatroute.route('/channel').get(getAllChannels).post(createChannel);
chatroute.route('/getChatmessages').post(getChatmessages);
chatroute.route('/channel/:channelID/members').get(getMembers);
module.exports=chatroute;




