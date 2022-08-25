import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from '../utils/axios';

export const Imageredirect=()=>{
   let {id}=useParams();
   const [data,setdata]=useState(null);
   async function get_redirect(){
    await axios.get(`${process.env.REACT_APP_API_URL}/image/${id}`).then(data=>{
         if(data.status===200){
             setdata(data.data.url); 
             setTimeout(()=>{
               window.location.replace(data.data.url);
       },3000);
         };
  }).catch(err=>{
     let {data}=err.response;
     toast.error(data.message);
     setTimeout(()=>{
          window.location.href="/"
     },3000);
     });
};

    useEffect(()=>{
         get_redirect();
    },[]);
    return (
    <>
     <div className="w-full h-screen flex items-center flex-col text-white">
     <span className="material-icons block mt-40 text-5xl leading-none">whatshot</span>
     <div  className="mt-4 text-lg text-center">
          <div>Redirecting to {data?" ":"homepage"}</div>
          {data?<a href={data}   className="text-xs text-blue-800">{data}</a>:""}
     </div>
    </div>
    </>);
}