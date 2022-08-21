import {useContext,useState,useEffect, createContext, useReducer} from "react";
import toast from "react-hot-toast";
import {io} from 'socket.io-client';
import constants from '../../../Config/dev.json';
import socketevents from '../events/socketevents.json';

const socketcontext=createContext(null);
const useSocket=()=>useContext(socketcontext);
const socket=io(constants.SOCKETURL);


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

const [socketstate,socketdispatch]=useReducer("Reducer",Initalstate);

useEffect(()=>{
socket.emit(socketevents.joinopenchannel);

socket.on(socketevents.newchannel,(payload)=>{

socket.emit(socketevents.joinchannel,{channelID:payload._id});    
});

socket.on(socketevents.channelmessage,(payload)=>{

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

