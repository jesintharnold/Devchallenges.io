import { socket } from "../context/socket/socket.context";
import SocketEvents from "../events/socketevents.json";

export const sendMessage=(payload)=>{
socket.emit(SocketEvents.sendmessage,payload);
};


// channelID:payload.channelID,
// message:payload.message,
// timestamp:payload.timestamp,
// userID:payload.userID