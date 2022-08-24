import {useContext,useEffect, createContext, useReducer} from "react";
import toast from "react-hot-toast";
import {io} from 'socket.io-client';
import constants from '../../../Config/dev.json';
import { ADD_CHANNEL, ADD_CHAT } from "../chatdispatchactions";
import socketevents from '../../events/socketevents.json';
import {chatreducer} from './socket.reducer';

const socket=io(constants.SOCKETURL);
// console.log(constants.SOCKETURL);

const socketcontext=createContext(null);
const useSocket=()=>useContext(socketcontext);



const SocketProvider=({children})=>{

const Initalstate={
selectedchannel:{
    channelName:"Welcome",
    channelID:"6213eac541c3990a4479d153",
    channelDesc:"just a good channel",
    checked:false
},
channellist:[],
chats:{}
};

const [socketstate,socketdispatch]=useReducer(chatreducer,Initalstate);

useEffect(()=>{
socket.emit(socketevents.joinopenchannel);

socket.on(socketevents.newchannel,(payload)=>{
        socketdispatch({
          type:ADD_CHANNEL,
          payload:{channelDesc: payload.channelDesc,channelName: payload.channelName,_id:payload._id}
        });
socket.emit(socketevents.joinchannel,{channelID:payload._id});    
});

socket.on(socketevents.recievemessage,(payload)=>{
    socketdispatch({
        type:ADD_CHAT,
        payload:payload
    });
});

socket.on(socketevents.toast,(payload)=>{
if(payload.status===1){
 toast.success(payload.toast);
}else{
 toast.error(payload.toast);
}
});

return ()=>{
    socket.close();
}
},[]);

return (
<socketcontext.Provider value={{socketstate,socketdispatch}}>
    {children}
</socketcontext.Provider>
)
};

export {useSocket,SocketProvider,socket};

