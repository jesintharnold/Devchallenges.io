import {useEffect, useState } from "react";
import  ReactDOM  from "react-dom";
import toast from "react-hot-toast";
import {ClipLoader} from 'react-spinners';
import { useUser } from "../../Authlibrary/context/user.context";
import axios from "../../utils/axios";
import { ADD_CHANNEL } from "../context/chatdispatchactions";
import { useSocket } from "../context/socket/socket.context";
import { newchannel } from "../events/socket.functions";



export function Modal({setmodal,getChannels,setgetChannels}){

    const [err,setErr]=useState({Name:'',Description:''});
    const [load,setLoad]=useState(false);
    const {_,socketdispatch}=useSocket();
    const {user,setauth,Logout}=useUser();

    let cancelToken=axios.CancelToken.source();
    useEffect(()=>{
        return ()=>{
            setLoad(false);
            if(cancelToken){
                cancelToken.cancel();
            }
        }
    },[]);

    const createChannel=async(payload,error)=>{
        await axios.post(`${process.env.REACT_APP_API_URL}/chat/channel`,payload,cancelToken.token).then(({data})=>{
        console.log(data);
        let payload={
          channelDesc: data.channelDesc,
          channelName: data.channelName,
          _id:data._id
          };
          socketdispatch({
            type:ADD_CHANNEL,
            payload:payload
          });
          newchannel(payload); //we can also sent from backend - but i used this ,so we can implement Private channel option in future upgrade
          }).then(()=>{ 
            setLoad(false);
            setmodal(false);
          }).catch(({response})=>{
            if(response.status===400&&response.data.Errcode===11000){
            setErr({...error,Name:response.data.Err});
            };
            toast.error("Internal server Error");
          });
    };



    function handleSubmit(e){
         let error={Name:'',Description:''};
         e.preventDefault();
         const data=new FormData(e.target);
         let obj=Object.fromEntries(data.entries());
         if(!obj.Name){
             error.Name="Provide Channel Name";
         }
         if(!obj.Description){
             error.Description="Provide Channel Description"
         }
         setErr({...error});
         if(!error.Name&&!error.Description){
                setLoad(true);
            let payload={
                channelName:obj.Name.toString(),
                channelDesc:obj.Description.toString(),
                // private: obj.bool=='on'?true:false,
                userID: user.userID
            }    
            createChannel(payload);
            return;
         }
    }



    
    return ReactDOM.createPortal(
        <div className="fixed z-[100] min-h-screen w-full justify-center flex items-center text-txt top-0 left-0 right-0 bottom-0 bg-sideopacity">
            <div className="flex flex-col bg-side h-auto rounded-2xl pt-4 px-2 w-[90%] md:w-1/2  xl:w-1/3">
                <div className="flex justify-between">
                <span className="ml-4 font-bold text-txt text-lg font-sans uppercase block">New Channel</span>
                <span className="material-icons-outlined bg-main p-1 rounded hover:bg-gray-500 cursor-pointer" onClick={()=>setmodal(prev=>!prev)}>close</span>
                </div>
                <div className="m-4">
                <form noValidate className="flex flex-col flex-1" onSubmit={handleSubmit}>
                    <div className="bg-search rounded-lg mb-5 p-2">
                    <input type="text" name="Name"  placeholder="Channel name" className="bg-transparent w-full outline-none m-0 p-0 text-txt block"/>
                    </div>
                    <span className="text-sm text-red-700 ml-2 -mt-3 mb-2">{err.Name}</span>
                   <div className="bg-search rounded-lg mb-5 p-2">
                    <textarea name="Description" placeholder="Channel Description" className="bg-transparent  outline-none w-full m-0 resize-none p-0 text-txt block scroll-hide " maxLength="125" rows="3"/>
                   </div>
                    <span className="text-sm text-red-700 ml-2 -mt-3 mb-2">{err.Description}</span>
                   <div className="flex justify-between items-center">
                  <div className="text-txt text-base ml-2 flex justify-center items-center self-start">
                  <input type="checkbox" className="outline-none" name="bool"/>
                  <span className="ml-2 text-base">Private</span>
                  </div>
                   <button disabled={load} className="w-20 h-8 self-end font-bold flex justify-center items-center text-base p-1 rounded-lg bg-sky" type="submit">{load?<ClipLoader color="#fffff" size={25}/>:`Save`}</button>
                   </div> 
                </form>
                </div>
            </div> 
        </div>,
        document.getElementById("modal")
    )
}


