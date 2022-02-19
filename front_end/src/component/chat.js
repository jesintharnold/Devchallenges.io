import { useRef, useState } from "react"
import Client from "../socketclient";
import Chatmsg from "./Message"

export function Chat({setSide,side,channelID,channelName,chats}){

   const send=useRef(null);

   function sendfunc(e){
     
     if(e.keyCode===13){
      e.preventDefault();
      //Emit the event
       Client.sendMessage(e.target.value.trim());
       e.target.value='';
     }

   }

    return (
     <>
       <div className="flex text-center px-4 py-2 justify-start shadow-ol">
        <span className="material-icons-outlined  p-1 rounded mr-3  cursor-pointer lg:hidden" onClick={()=>setSide(!side)}>menu</span>
        <span className="text-xl font-sans font-bold ml-5">Front-end developers</span>   
        </div> 
        
        <div className="overflow-y-scroll scroll-hide px-4 py-2 h-[85%] z-30">
        <Chatmsg msg="Morbi eget turpis 🤣" name={"Jesinth Arnold"} date={"Yesterday 20:16"} profileURL="https://unsplash.com/photos/2LowviVHZ-E/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHx8fDE2NDQ0MTg1MzI&force=true&w=640" />
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
