import {useEffect, useState } from "react";
import Namebox from './Namebox';
import {ClipLoader} from 'react-spinners';
import axios from "../../utils/axios";
import toast from "react-hot-toast";
import { useSocket } from "../context/socket/socket.context";
import { GET_CHANNELS } from "../context/chatdispatchactions";

function Channels(){

    const [load,setload]=useState(true);
    const {socketstate,socketdispatch}=useSocket();
    const {channellist}=socketstate;

    const getAllChannels=async ()=>{
     await axios.get(`${process.env.REACT_APP_API_URL}/chat/channel`).then(({data})=>{
      if(data.length>0){
        socketdispatch({
          type:GET_CHANNELS,
          payload:data
        })
        return;
      }
      toast.error(`No Channels found`);
     }).then(()=>setload(false)).catch(({response})=>{
      if(response.data.name.trim().includes("ItemNotFound")){
        toast.error(response.data.message);
      }
    });
    };

    useEffect(()=>{
        getAllChannels();
    },[]);

    return (
      <div className="overflow-y-scroll scroll-hide px-4 py-2 h-[90%]">  
     {load?(
        <div className="w-full h-full flex justify-center items-center">
          <ClipLoader color="#38ACC5" size={30}/>
        </div>):channellist.map((dat,index)=>(
            <Namebox channel={dat} key={index}  dispatch={socketdispatch} />
        ))}
      </div>
    )
 
}

export default Channels;