import React from "react";
import { Suspense, useContext, useEffect, useRef, useState } from "react"
import Client from "../socketclient";
import Chatmsg from "./Message"
import axios from 'axios';
import FetchData from "../FetchData";
import { Conprovider } from "../App";
import Chatmessage from "./chatMessage";

// const CM=React.lazy(()=>{
//   return new Promise(resolve=>{
//     setTimeout(()=>{
//       resolve(import('./chatMessage'))
//     },1000);
//   })
// });


export function Chat({side,setSide,channel,chats,setChats}){

  //{setSide,side,channel,set,get}
 //const {side,setSide,channel,chats,setChats}=useContext(Conprovider);

  const [load,setload]=useState(true);
  useEffect(()=>{
    // //Fetch channel Messages by using ID
    //  console.log(channel.channelId);
    //  FetchData.getAllChats(channel.channelId).then((dat)=>{
    //    console.log(dat);
    //    setChats({...chats,[channel.channelId.toString()]:dat});
    //  }).then(()=>{
    //   setload(false);
    //  });
  },[channel.channelId]);

const send=useRef(null);


  function sendfunc(e){
    if(e.keyCode===13){
      e.preventDefault();
      //Emit the event
       Client.sendMessage({
         channelID:channel.channelId,
         channelName:channel.channelName,
         Msg:e.target.value.trim(),
         Dat:Date.now()
       });
       e.target.value='';
     }
   }

  return (
     <>
       <div className="flex text-center px-4 py-2 justify-start shadow-ol">
        <span className="material-icons-outlined  p-1 rounded mr-3  cursor-pointer lg:hidden" onClick={()=>setSide(!side)}>menu</span>
        <span className="text-xl font-sans font-bold ml-5">{channel.channelName}</span>   
        </div> 
        
        <div className="overflow-y-scroll scroll-hide px-4 py-2 h-[85%] z-30">
          <Suspense fallback={<h2>Loading...</h2>}>
           <Chatmessage channel={channel} chats={chats}/>
          </Suspense>
       </div>

      <div className="p-4 lg:p-6 w-full lg:flex-1  absolute bg-main left-0 right-0 bottom-0 z-[999]">
     <div className="bg-search rounded-lg flex box-border  items-center" ref={send}>
     <input type="text" placeholder="Type a message here" className="p-0 flex-1 ml-4 caret-caert overflow-hidden bg-transparent text-white placeholder:text-caert text-sm font-sans outline-none" onKeyUp={(e)=>sendfunc(e)}/>
     <div className="m-1" onClick={(e)=>{
       e.preventDefault();

       //Emit the event here also
       Client.sendMessage(send.current.children[0].value.trim());
       send.current.children[0].value='';
     }}>
     <span class="material-icons-outlined text-xl bg-sky py-1 px-2 rounded-lg">send</span>
     </div>
     </div>
    </div>
       </>
    )
}
