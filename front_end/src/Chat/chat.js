import {Modal} from "./component/Createrchannel";
import { Chatview } from "./component/chatview";
import { SocketProvider } from "./context/socket/socket.context";
import { Chatsidebar } from "./component/chat.sidebar";
import { useState } from "react";
import jwt_decode from 'jwt-decode';


export const Chat=()=>{
    const [modal,setmodal]=useState(false);
    const [menu,setmenu]=useState(false);
return (
<SocketProvider>
<div className="min-w-full min-h-screen h-0 relative lg:flex">
<Chatsidebar setmodal={setmodal} setmenu={setmenu} menu={menu}/>
<Chatview setmenu={setmenu}/>
{modal?<Modal setmodal={setmodal}/>:<></>}
</div>
</SocketProvider>
)
};