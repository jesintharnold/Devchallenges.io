import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import Namebox from '../component/Namebox';
import { Conprovider } from "../App";
import {MoonLoader,ClipLoader} from 'react-spinners';

function Channels({setChannel,getChannels,setgetChannels}){
  //const {setChannel,getChannels,setgetChannels}=useContext(Conprovider);
    const [load,setload]=useState(true);
    const data=async()=>{
        await axios.get('http://localhost:5000/channel').then(({data})=>{
            if(data.length>0){
              setgetChannels(data);
              setload(false);
            }
        })
    }
    useEffect(()=>{
        //Axios fetch        
      data();
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