import {useEffect, useState } from "react";
import Namebox from './Namebox';
import {ClipLoader} from 'react-spinners';
import FetchData from "../FetchData";

function Channels({setChannel,getChannels,setgetChannels}){

    const [load,setload]=useState(true);
    const data=async()=>{
      let res=await FetchData.getAllChannels();
            if(res.length>0){
              setgetChannels(res);
              console.log(res);
              setload(false);
            }
      
    }
    useEffect(()=>{
      if(load){
        data();
      }
      return ()=>{
        setload(false);
      }
    },[]);

    return (
      <div className="overflow-y-scroll scroll-hide px-4 py-2 h-[90%]">  
     {load?(
        <div className="w-full h-full flex justify-center items-center">
          <ClipLoader color="#38ACC5" size={30}/>
        </div>):getChannels.map((dat,index)=>(
            <Namebox channel={dat} key={index}  setChannel={setChannel} />
        ))}
      </div>
    )
 
}

export default Channels;