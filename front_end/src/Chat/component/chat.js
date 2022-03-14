import React from "react";
import {useEffect, useRef, useState } from "react"
import Client from "../socketclient";
import Chatmsg from "./Message"
import FetchData from "../FetchData";
import {ClipLoader} from 'react-spinners';


export function Chat({side,setSide,channel,chats,setChats}){
  const options={year:'numeric',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit',hour12:true}



  const [load,setload]=useState(true);
  useEffect(()=>{
     FetchData.getAllChats(channel.channelId).then((dat)=>{
       console.log(dat);
       setChats({...chats,[channel.channelId.toString()]:dat});
     }).then(()=>{
      setload(false);
     });
  },[channel.channelId]);

const send=useRef(null);

   function sendfunc(e){

     e.preventDefault();
    if(send.current.children[0].value.trim()!==''){
      let payload={
        channelID:channel.channelId,
        Msg:send.current.children[0].value.trim(),
        DAT:Date.now(),
        ID:"6219fd00f897b3d831ba714d",
        PROFILEURL:"https://cdn.pixabay.com/photo/2016/11/22/21/42/woman-1850703_960_720.jpg",
        IDNAME:"Jesinth Arnold"
      };
       Client.sendRoomsg(payload);
       
       setChats({...chats,[channel.channelId.toString()]:[...chats[channel.channelId.toString()],payload]});
       
       send.current.children[0].value='';
    }
    
   }

  return (
     <>
       <div className="flex text-center px-4 py-2 items-center justify-between shadow-ol">
        <span className="material-icons-outlined  p-1 rounded mr-3  cursor-pointer lg:hidden" onClick={()=>setSide(!side)}>menu</span>
        <span className="text-xl font-sans font-bold ml-5">{channel.channelName}</span> 
        {load?<ClipLoader
 color="#38ACC5" size={20}/>:<></>}
        </div> 
        
        <div className="overflow-y-scroll scroll-hide px-4 py-2 h-[85%] z-30">
        {load?(<></>):
         (chats[channel.channelId]&&chats[channel.channelId].length>0)?chats[channel.channelId].map((dat,index)=>
         <Chatmsg msg={dat.Msg} name={dat.IDNAME} key={index} date={new Date(dat.DAT).toLocaleString('en-GB',options)} profileURL={`${dat.PROFILEURL}`}/>):<div className="w-full justify-center items-center flex mt-6 whitespace-nowrap text-caert">
           <hr className="w-3/12 lg:w-1/3 border-search border-t-2"/>
           <span className="mx-3 block">No Chats found</span>
           <hr className="w-3/12 lg:w-1/3 border-search border-t-2"/>
         </div>
        } 
       </div>

      <div className="p-4 lg:p-6 w-full lg:flex-1  absolute bg-main left-0 right-0 bottom-0 z-[999]">
     <div className="bg-search rounded-lg flex box-border  items-center" ref={send}>
     <input type="text" placeholder="Type a message here" className="p-0 flex-1 ml-4 caret-caert overflow-hidden bg-transparent text-white placeholder:text-caert text-sm font-sans outline-none" onKeyUp={(e)=>{
      if(e.key === 'Enter'){
        sendfunc(e);
      }
     }}/>
     <div className="m-1 cursor-pointer" onClick={(e)=>{
       e.preventDefault();
       sendfunc(e);
     }}>
     <span className="material-icons-outlined text-xl bg-sky py-1 px-2 rounded-lg hover:scale-95">send</span>
     </div>
     </div>
    </div>
       </>
    )
}
