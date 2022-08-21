import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import axios from "../../utils/axios";
import { SELCT_CHANNEL_POPUP } from "../context/chatdispatchactions";
import { useSocket } from "../context/socket/socket.context";
import Member from "./Member"


function Channeloverview(){

    const {socketstate,socketdispatch}=useSocket();
    const {selectedchannel}=socketstate;
    const [load,setload]=useState(true);
    const [members,setmembers]=useState([]);
    const getmembers=async ()=>{
        await axios.get(`${process.env.REACT_APP_API_URL}/chat/channel/${selectedchannel.channelID}/members`).then(({data})=>{setmembers(data.members);setload(false);}).catch((e)=>{toast.error(`unable to fetch members`);console.log(e)});
    };

    useEffect(()=>{
       getmembers();
    },[selectedchannel.channelID]);
    
    return (
    <div className={"absolute left-0 top-0 flex h-full lg:h-[90%] w-[16rem] lg:w-72   flex-col z-30 -translate-x-full transition duration-200 ease-in-out bg-side "+(selectedchannel.checked?'-translate-x-0':'')}>
    <div className="flex  text-center items-center px-4 py-2 justify-start shadow-ol box-border  relative">
    <span className="material-icons-outlined bg-transparent cursor-pointer text-xl" onClick={()=>socketdispatch({type:SELCT_CHANNEL_POPUP})}>arrow_back_ios</span>
    <span className="text-xl font-sans font-bold ml-6">Channels</span>  
    </div> 
    <div className="overflow-y-scroll scroll-hide px-4">
    <div className="mt-6">
    <span className="text-txt font-bold text-lg font-sans mb-4 block">{selectedchannel.channelName}</span>
    <p className="text-base leading-5 font-sans font-normal text-txt mb-4">{selectedchannel.channelDesc}</p>
    </div>
    <span className="my-2 uppercase font-bold text-base block text-txt font-sans">Members</span>
    {load?<div className="mt-10 text-center"><ClipLoader color="#38ACC5" size={30}/></div>:
    <div className="my-1">
    {members.map((dat,index)=><Member src={`${dat.profile}`} name={`${dat.name}`} status={dat.status} key={`Member-${index}`}/>)}
    </div>
    }
    </div>
    </div>
    )
}

export default Channeloverview;