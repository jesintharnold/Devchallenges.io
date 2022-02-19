import { useEffect, useState } from "react";
import Namebox from "./component/Namebox";
import Modal from "./component/Createrchannel";
import Chatmsg from "./component/Message";
import Member from "./component/Member";
import { Chat } from "./component/chat";
import {io} from 'socket.io-client';
import Client from './socketclient';

function App() {
  const [drop,setDrop]=useState(false);
  const [side,setSide]=useState(false);
  const [channel,setChannel]=useState({
    channelName:"Welcome",
    channelId:"000000001",
    checked:false
  });
  const [modal,setModal]=useState(false);





  //Fetch Data will present here
  const [members,setMember]=useState({
    members:[],
    name:'',
    description:''
  });  
  const [getChannels,setgetChannels]=useState([]);
  const [chats,setChats]=useState([]);





  useEffect(()=>{
    const sock=io("http://localhost:5000/");
     Client.setSocket(sock);
     




    

    return ()=>sock.close();
  },[])



  return (
    <div className="min-w-full min-h-screen h-0 relative lg:flex">
    
    <div className={"fixed left-0 top-0 bottom-0 z-50 min-h-full w-[16rem] lg:relative bg-side text-white lg:w-72 transition duration-200 ease-in-out lg:translate-x-0 "+(side?'':'-translate-x-full')}>
   
    {/* Front-Page-Channels-List */}
    <div className="z-20 lg:flex flex-col h-[90%]">
    
     <div className="flex text-center items-center px-4 py-2 justify-between shadow-ol relative">
     <span className="text-xl font-sans font-bold">Channels</span>  
     <span className="material-icons-outlined bg-main p-1 rounded hover:bg-gray-500 cursor-pointer" onClick={()=>setModal(!modal)}>add</span>  
     {side?<span onClick={()=>{setSide(!side);setChannel({...channel,checked:false})}} className="material-icons-outlined absolute font-thin  -right-12 p-2 bg-side rounded lg:hidden" >close</span>:''}
     </div> 
 
     <div className="mx-4 my-4 bg-search rounded-lg flex items-center p-2">
     <span class="material-icons-outlined ml-1 mr-4">search</span>
     <input type="text" placeholder="Search" className="flex-1 w-0 caret-caert overflow-hidden bg-transparent text-caert text-lg font-sans outline-none"/>
     </div>

     <div className="overflow-y-scroll scroll-hide px-4 py-2 h-[90%]">  
       <Namebox channelName="Front-end developers" channelID="00000001" setChannel={setChannel}/>
     </div>
     

    </div>

    <div className={"absolute left-0 top-0 flex h-full lg:h-[90%]  flex-col z-30 -translate-x-full transition duration-200 ease-in-out bg-side "+(channel.checked?'-translate-x-0':'')}>
    <div className="flex  text-center items-center px-4 py-2 justify-start shadow-ol box-border  relative">
       <span className="material-icons-outlined bg-transparent cursor-pointer text-xl" onClick={()=>setChannel({...channel,checked:!channel.checked})}>arrow_back_ios</span>
       <span className="text-xl font-sans font-bold ml-6">Channels</span>  
    </div> 

    <div className="overflow-y-scroll scroll-hide px-4">
    <div className="mt-6">
      <span className="text-txt font-bold text-lg font-sans mb-4 block">Front-end developers</span>
      <p className="text-base leading-5 font-sans font-normal text-txt mb-4">Pellentesque sagittis elit enim, sit amet ultrices tellus accumsan quis. In gravida mollis purus, at interdum arcu tempor non</p>
    </div>
    <span className="my-2 uppercase font-bold text-base block text-txt font-sans">Members</span>
    <div className="my-1">
    <Member src="https://unsplash.com/photos/2LowviVHZ-E/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHx8fDE2NDQ0MTg1MzI&force=true&w=640" name="Xanthe Neal" status="Online"/>
    <Member src="https://unsplash.com/photos/2LowviVHZ-E/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHx8fDE2NDQ0MTg1MzI&force=true&w=640" name="Annaliese Huynh" status="Off"/>
    </div>
    </div>
    </div>


   {/* Logout options */}
    <div className="flex z-50 items-center pb-2 pt-3 px-4 justify-between absolute min-w-full bottom-0 bg-blk">
    <div className="flex items-center">
    <img src="https://unsplash.com/photos/v26vu43kZkw/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTR8fHBvdHJhaXR8fDB8fHx8MTY0NDEyNjU1Mg&force=true&w=640" className="h-10 w-10  rounded object-cover" alt="not found" loading="lazy"/>
    <span className="text-lg font-sans font-txt ml-6">Xanthe Neal</span>
    </div>
    <span className="material-icons-outlined cursor-pointer  rounded hover:bg-gray-500" onClick={()=>setDrop(!drop)}>{drop?`expand_less`:`expand_more`}</span>
    </div>

    {drop?
       <div className="bottom-11 z-[55] absolute right-8  rounded-2xl bg-main p-4 animate-popup">
       <div className="flex hover:bg-search px-3 py-2 rounded cursor-pointer">
       <span className="material-icons-outlined">account_circle</span>
       <span className="ml-4 font-sans font-medium">My Profile</span>
       </div>
       <div className="flex hover:bg-search px-3 py-2 rounded cursor-pointer">
       <span className="material-icons-outlined">terrain</span>
       <span className="ml-4 font-sans font-medium">Tweeter</span>
       </div>
       <div className="flex hover:bg-search px-3 py-2 rounded text-redlog cursor-pointer">
       <span className="material-icons-outlined">logout</span>
       <span className="ml-4 font-sans font-medium">Logout</span>
       </div>
     </div>
    :''}
</div>




 <div className="h-full relative bg-main text-white z-10  lg:flex-1">
   
    
     {/* Chats */}
    <Chat channelID={channel.channelID} channelName={channel.channelName} setSide={setSide} side={side}/>

  
    
    
 </div>

{modal?<Modal modal={setModal}/>:''}
</div>
  );
}

export default App;
