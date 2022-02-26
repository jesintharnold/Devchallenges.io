import { useEffect } from "react";
import axios from 'axios';
import Namebox from '../component/Namebox';


function Channels({setChannel,set,get}){
    const data=async()=>{
        await axios.get('http://localhost:5000/channel').then(({data})=>{
            if(data.length>0){
              set(data);
            }
        })
    }
    useEffect(()=>{
        //Axios fetch        
      data();
    },[]);

    return (
      <div className="overflow-y-scroll scroll-hide px-4 py-2 h-[90%]">  
        {get.map((dat,index)=>(
            <Namebox channel={dat} key={index}  setChannel={setChannel}/>
        ))}
      </div>
    )
 
}

export default Channels;