import {useEffect, useState } from "react";
import {Modal} from "./component/Createrchannel";
import { Chat } from "./component/chat";
import Client from './socketclient';
import Channels from "./component/channels";
import Logout from "./component/logout";
import Channeloverview from './component/channeloverview';
import {io} from 'socket.io-client';
import Logoutchat from "./component/logout";


export const  Chatapp=({props})=>{
  const [drop,setDrop]=useState(false);
  const [side,setSide]=useState(false);
  const [channel,setChannel]=useState({
    channelName:"Welcome",
    channelId:"6213eac541c3990a4479d153",
    channelDesc:"just a good channel",
    checked:false
  });
  const [modal,setModal]=useState(false);
  const [getChannels,setgetChannels]=useState([]);
  const [chats,setChats]=useState({});


  useEffect(()=>{
    const socket=io("http://localhost:5000");
    Client.setSocket(socket);
  
    
    // Event to join - Open channels
    socket.emit("joinopenchannel");

    socket.on('channel',(payload)=>{ 
      setgetChannels(prevstate=>[...prevstate,payload]); 
      socket.emit('joinchannel',{channelID:payload._id});
      console.log(payload);
    });

    socket.on('roommessage',(payload)=>{
      
      setChats(prevstate=>(
        // {...prevstate,[payload.channelID.toString()]:[...prevstate[payload.channelID.toString()],payload]}      
        (
        prevstate[payload.channelID.toString()]?{...prevstate,[payload.channelID.toString()]:[...prevstate[payload.channelID.toString()],payload]}:
        {...prevstate,[payload.channelID.toString()]:[payload]}
        )
      ));
    });
    
    // Listen to Events Here
    return ()=>socket.close();
  },[]);
  
  return (
    <div className="min-w-full min-h-screen h-0 relative lg:flex">
    <div className={"fixed left-0 top-0 bottom-0 z-50 min-h-full w-[16rem] lg:relative bg-side text-white lg:w-72 transition duration-200 ease-in-out lg:translate-x-0 "+(side?'':'-translate-x-full')}>
    <div className="z-20 lg:flex flex-col h-[90%]"> 
     <div className="flex text-center items-center px-4 py-2 justify-between shadow-ol relative">
     <span className="text-xl font-sans font-bold">Channels</span>  
     <span className="material-icons-outlined bg-main p-1 rounded hover:bg-gray-500 cursor-pointer" onClick={()=>setModal(!modal)}>add</span>  
     {side?<span onClick={()=>{setSide(!side);setChannel({...channel,checked:false})}} className="material-icons-outlined absolute font-thin  -right-12 p-2 bg-side rounded lg:hidden" >close</span>:''}
     </div> 
     <div className="mx-4 my-4 bg-search rounded-lg flex items-center p-2">
     <span className="material-icons-outlined ml-1 mr-4">search</span>
     <input type="text" placeholder="Search" className="flex-1 w-0 caret-caert overflow-hidden bg-transparent text-caert text-lg font-sans outline-none"/>
     </div>
     <Channels setChannel={setChannel} getChannels={getChannels} setgetChannels={setgetChannels} />
    </div>
    <Channeloverview setChannel={setChannel} channel={channel}/>
   <Logoutchat drop={drop} setDrop={setDrop}/> 
</div>
<div className="h-full relative bg-main text-white z-10  lg:flex-1">
<Chat side={side} setSide={setSide} channel={channel} chats={chats} setChats={setChats}/>
</div>

{modal?<Modal setModal={setModal} getChannels={getChannels} setgetChannels={setgetChannels}/>:''}
</div>
  );
}

