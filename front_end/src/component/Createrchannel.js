import {useContext, useEffect, useRef, useState } from "react";
import  ReactDOM  from "react-dom";
import {ClipLoader} from 'react-spinners';
import FetchData from "../FetchData";
import axios from "axios";
import Client from "../socketclient";


export function Modal({setModal,getChannels,setgetChannels}){

    const [err,setErr]=useState({
        Name:'',
        Description:''
    });
    const [load,setLoad]=useState(false);
    
    let cancelToken=axios.CancelToken.source();
    
    useEffect(()=>{

        return ()=>{
            console.log(load);
            setLoad(false);
            console.log(`Unmounting happened`);
            if(cancelToken){
                cancelToken.cancel();
            }
        }
    },[])


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

         // Send an API request - if fails show an error
         if(!error.Name&&!error.Description){
                console.log(`API request - sent`);
                setLoad(true);
                FetchData.createChannel({
                        channelName:obj.Name.toString(),
                        channelDesc:obj.Description.toString(),
                        private: obj.bool=='on'?true:false,
                        userID: "619a5bd0a01ef280b3b92bd5"
                },cancelToken.token).then(data=>{
                   if(data.status===400 && data.data.Errcode===11000){
                       console.log(`Duplicate is called`);
                       setErr({...error,Name:data.data.Err});
                       //Join the channel through Socket IO
                       
                   }
                   
                   if(data.status===500){
                      console.log(`Internal ServerError`);
                   }

                   if(data.status===201){

                   Client.sendchannel(data.data);
                     
                   setgetChannels([...getChannels,data.data]);  
                    //I think Memory leak is happening here , after closing unMounting component only 
                    // setLoad is called , in side a .then  , so axios cancel menthod is called ,which will clear everything while unMounting is going -on
                    //can be also resolved by calling setLoad function before setModal inside 201 status function , but what is the fun in that ./ 
                    setModal(false);
                   }    
                    setLoad(false); // Issue Memeory Leak
                });

                
                
         }

    }



    
    return ReactDOM.createPortal(
        <div className="fixed z-[100] min-h-screen w-full justify-center flex items-center text-txt top-0 left-0 right-0 bottom-0 bg-sideopacity">
            <div className="flex flex-col bg-side h-auto rounded-2xl pt-4 px-2 w-[90%] md:w-1/2  xl:w-1/3">
                <div className="flex justify-between">
                <span className="ml-4 font-bold text-txt text-lg font-sans uppercase block">New Channel</span>
                <span className="material-icons-outlined bg-main p-1 rounded hover:bg-gray-500 cursor-pointer" onClick={()=>setModal(false)}>close</span>
                </div>
                  
                {console.log(`RE-RENDER`)}
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


